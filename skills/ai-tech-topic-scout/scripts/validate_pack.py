# /// script
# requires-python = ">=3.11"
# dependencies = ["jsonschema==4.25.1", "rfc3339-validator==0.1.4"]
# ///
"""Validate a local editorial handoff. No network, file writes, or publication."""

from __future__ import annotations

import argparse
import json
import math
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit

try:
    from jsonschema import Draft202012Validator, FormatChecker
    # jsonschema silently skips date-time checks without this optional package.
    from rfc3339_validator import validate_rfc3339
except ImportError:
    print("Missing validation dependency. Run this script with uv run.", file=sys.stderr)
    sys.exit(2)

SCHEMA_PATH = Path(__file__).resolve().parents[1] / "references/topic-pack.schema.json"
READABLE = {"full", "partial", "supplied"}
X_STATUS_URL = re.compile(r"^https://(?:www\.)?(?:x|twitter)\.com/[A-Za-z0-9_]+/status/\d+(?:\?.*)?$")


def timestamp(value: str) -> datetime:
    # RFC 3339 permits lowercase t/z as well as the conventional uppercase form.
    return datetime.fromisoformat(value.upper().replace("Z", "+00:00"))


def safe_url(value: str) -> bool:
    try:
        parsed = urlsplit(value)
        port = parsed.port  # Reject invalid/out-of-range ports without a network request.
        return (
            bool(parsed.hostname) and parsed.username is None and parsed.password is None
            and not any(char.isspace() or ord(char) < 32 for char in value)
            and (port is None or 0 <= port <= 65535)
        )
    except ValueError:
        return False


def validate_pack(pack: Any) -> list[str]:
    """Return structural and relational errors, not an editorial truth verdict."""
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    formats = FormatChecker()
    # Register explicitly so supported formats cannot depend on ambient extras.
    formats.checks("date-time")(lambda value: not isinstance(value, str) or validate_rfc3339(value.upper()))
    validator = Draft202012Validator(schema, format_checker=formats)
    errors = [
        f"{'/'.join(map(str, error.absolute_path)) or '$'}: {error.message}"
        for error in validator.iter_errors(pack)
    ]
    if errors:
        return errors

    start, end = timestamp(pack["window"]["start"]), timestamp(pack["window"]["end"])
    generated = timestamp(pack["generated_at"])
    if start > end:
        errors.append("window: start is after end")
    if end > generated:
        errors.append("window: end is after generated_at")
    if pack["status"] in {"partial", "blocked"} and not pack["gaps"]:
        errors.append("gaps: partial/blocked runs must explain the missing evidence")
    if pack["status"] == "no_update" and not any(c["status"] == "checked" for c in pack["coverage"]):
        errors.append("coverage: no_update requires a checked lane")
    if pack["status"] == "complete":
        if not any(c["status"] == "checked" for c in pack["coverage"]):
            errors.append("coverage: complete requires inspected material in a checked lane")
        if not any(topic["decision"] == "ready" for topic in pack["topics"]):
            errors.append("topics: complete requires a ready topic; a finished empty selection is no_update")
    if pack["status"] == "partial" and not any(c["status"] in {"checked", "limited"} for c in pack["coverage"]):
        errors.append("coverage: partial requires inspected material; an acquisition outage is blocked")

    ids: set[str] = set()
    events: set[str] = set()
    selection_mode = pack.get("selection_mode", "standard")
    for topic in pack["topics"]:
        prefix = topic["id"]
        if prefix in ids or topic["event_key"] in events:
            errors.append(f"{prefix}: duplicate topic id or event_key")
        ids.add(prefix)
        events.add(topic["event_key"])
        sources = {s["id"]: s for s in topic["sources"]}
        if len(sources) != len(topic["sources"]):
            errors.append(f"{prefix}: duplicate source id")
        readable = {sid for sid, source in sources.items() if source["access"] in READABLE and source["evidence"].strip()}
        for source in sources.values():
            if not safe_url(source["url"]):
                errors.append(f"{prefix}/{source['id']}: source URL needs a host and must not contain credentials")
            if timestamp(source["observed_at"]) > generated:
                errors.append(f"{prefix}/{source['id']}: observation is after pack generation")

        claim_ids: set[str] = set()
        for claim in topic["claims"]:
            label = f"{prefix}/{claim['id']}"
            if claim["id"] in claim_ids:
                errors.append(f"{label}: duplicate claim id")
            claim_ids.add(claim["id"])
            refs = set(claim["source_ids"])
            if not refs <= sources.keys():
                errors.append(f"{label}: unknown source reference")
            if claim["publishable"] and (claim["kind"] == "unverified" or not refs or not refs <= readable):
                errors.append(f"{label}: publishable claim requires readable evidence and a supported claim kind")

        discussion = topic["discussion"]
        refs = set(discussion["source_ids"])
        if not refs <= sources.keys():
            errors.append(f"{prefix}: discussion references unknown sources")
        if discussion["status"] == "observed" and (not refs or not refs <= readable):
            errors.append(f"{prefix}: observed discussion needs readable source records")
        if discussion["status"] != "observed" and discussion["metrics"]:
            errors.append(f"{prefix}: unobserved discussion cannot carry measured engagement")
        for metric in discussion["metrics"]:
            if not math.isfinite(metric["value"]):
                errors.append(f"{prefix}: metric value must be finite")
            if metric["source_id"] not in readable or metric["source_id"] not in refs:
                errors.append(f"{prefix}: metric must reference readable discussion evidence")
            if timestamp(metric["observed_at"]) > generated:
                errors.append(f"{prefix}: metric observation is after pack generation")

        action = topic.get("recommended_action")
        target_id = topic.get("conversation_target_source_id")
        if selection_mode == "conversation_first" and topic["decision"] == "ready":
            if discussion["status"] != "observed":
                errors.append(f"{prefix}: conversation_first ready topic needs observed discussion")
            if action is None:
                errors.append(f"{prefix}: conversation_first ready topic needs recommended_action")
        if action in {"reply", "quote"} and target_id is None:
            errors.append(f"{prefix}: {action} recommendation needs conversation_target_source_id")
        if action == "standalone" and target_id is not None:
            errors.append(f"{prefix}: standalone recommendation must not declare a conversation target")
        if action is None and target_id is not None:
            errors.append(f"{prefix}: conversation target requires recommended_action")
        if target_id is not None:
            target = sources.get(target_id)
            if target is None:
                errors.append(f"{prefix}: conversation target references an unknown source")
            else:
                if target["kind"] != "community" or target_id not in refs or target_id not in readable:
                    errors.append(f"{prefix}: conversation target must be readable community discussion evidence")
                if not X_STATUS_URL.fullmatch(target["url"]):
                    errors.append(f"{prefix}: reply/quote conversation target must be an original X status URL")

        if topic["decision"] == "ready":
            if pack["status"] in {"blocked", "no_update"}:
                errors.append(f"{prefix}: {pack['status']} cannot contain ready topics")
            if topic["freshness"] not in {"in_window", "new_development"}:
                errors.append(f"{prefix}: ready news needs established freshness")
            development = topic["latest_development_at"]
            if development is None:
                errors.append(f"{prefix}: ready news needs a development date")
            elif len(development) == 10:
                if not start.date() <= datetime.fromisoformat(development).date() <= end.date():
                    errors.append(f"{prefix}: development date lies outside the run window")
            elif not start <= timestamp(development) <= end:
                errors.append(f"{prefix}: development timestamp lies outside the run window")
            if not any(c["publishable"] and c["kind"] in {"fact", "attributed"} for c in topic["claims"]):
                errors.append(f"{prefix}: ready topic has no supported factual nucleus")
        for media in topic.get("media", []):
            if not safe_url(media["url"]):
                errors.append(f"{prefix}: media URL needs a host and must not contain credentials")
            if media["rights"] == "unknown" and media["usage"] == "attach_allowed":
                errors.append(f"{prefix}: unknown media rights require link_only")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pack", type=Path, help="Path to one UTF-8 topic-pack JSON file")
    args = parser.parse_args()
    try:
        pack = json.loads(args.pack.read_text(encoding="utf-8"))
        errors = validate_pack(pack)
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"Cannot validate pack: {exc}", file=sys.stderr)
        return 2
    print(json.dumps({"valid": not errors, "errors": errors, "scope": "structure_and_references_only"}, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
