# Contributing

OPC Skills accepts focused changes that improve a repeatable one-person-company workflow and can be evaluated without promising outcomes.

## Design rules

- Keep every `skills/<name>/` directory independently useful. Do not require another Skill, a private path, a paid provider, or a shared root reference to perform the baseline task.
- An explicit multi-stage workflow may consume another Skill's evidence contract: `x-post-writer` edits supplied evidence independently and uses `ai-tech-topic-scout` for missing current material. Document paired installation and missing-dependency behavior; never assume the host auto-installs or invokes a sibling.
- Put task instructions in `SKILL.md`. Add a Skill-local `references/` file only when detailed material should be loaded conditionally.
- Add `scripts/` only for deterministic, repeated logic that is safer or clearer as code. Do not add empty directories or wrappers around external validators.
- Separate observed facts, first-party measurements, third-party estimates, claims, inference, and unknowns.
- Preserve metric, market, date, device, operator, evidence-replayability, authorization, and legal boundaries.
- Treat competitors as evidence to analyze. Feature parity may invalidate an entry claim, but competitor existence alone is not a rejection rule.
- Honor explicit workload budgets, but do not invent a universal observation formula; require an evidence-based threshold or calibration method for numerical stop lines.

## Changing a Skill

1. Keep the directory name and frontmatter `name` identical and use lowercase hyphen-case.
2. Write a natural-language `description` that distinguishes the Skill from its siblings.
3. Bump `metadata.version` according to [VERSIONS.md](VERSIONS.md).
4. Keep `agents/openai.yaml` aligned with the Skill name and default task.
5. Add or update behavior cases in `evals/cases.jsonl` and routing cases when trigger behavior changes.
6. Update the research basis when a new external methodology materially influences the instructions.

Use only synthetic or redistributable fixtures. Never commit credentials, private analytics, licensed exports, copied private conversations, or raw research containing sensitive data.

## Validation

Run the portable checks from a clean clone:

```bash
npx skills add . --list
jq -c . evals/cases.jsonl >/dev/null
jq -c . evals/routing.jsonl >/dev/null
```

Then run Skill Creator validation for each Skill, Plugin Creator validation for the repository, and the targeted behavior cases described in [evals/README.md](evals/README.md). A change is not release-ready if any `must_pass`, critical-failure, tool-policy, or routing gate fails.

The editorial helpers have deterministic tests documented there. These tests check contracts and text formatting, not source truth, model behavior, or audience growth. Keep generated dependencies out of the repository; retain the X helper's lockfile for reproducible installation.
