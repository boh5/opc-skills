# Release checklist

This checklist separates three different release targets: a valid Skill tree, installation through the Skills CLI, and optional submission to OpenAI's public Plugins Directory.

## 1. Repository and Skill tree

- Exactly five intended directories exist under `skills/`, each with a valid `SKILL.md`.
- Every frontmatter `name` matches its directory.
- Every `agents/openai.yaml` default prompt names the same `$skill-name`.
- Every linked reference exists and is loaded only for its stated condition.
- `evals/cases.jsonl` and `evals/routing.jsonl` parse as JSONL.
- No placeholder, empty resource directory, private export, or raw research collection is included in the release archive.

The OpenAI Skill Creator and Plugin Creator system Skills include `quick_validate.py` and `validate_plugin.py`. Run them from their installed locations with a Python environment that has PyYAML. They are development validators, not repository runtime dependencies; do not add a package or `scripts/` directory only to wrap them.

## 2. Skills CLI distribution

From a clean clone:

```bash
npx skills add . --list
npx skills add . --skill seo-idea-finder --agent codex --yes --copy
npx skills add . --skill '*' --agent codex --yes --copy
```

Confirm that listing discovers exactly five Skills, the selective command installs one, the wildcard command installs five, and every copied Skill retains `agents/` and `references/`.

For a GitHub release, confirm the README install examples and the manifest's `repository` and `homepage` fields point to the actual public repository.

## 3. Behavioral release gate

- Capture the final answer and full tool trace for baseline and Skill-enabled runs.
- Enforce every case-level `must_pass` and `critical_failures` item before scoring.
- Blind the reviewer to answer identity.
- Require each Skill to win at least two of its targeted cases by at least one relevant rubric point, with no overall regression.
- Require every applicable rubric dimension to score at least 3/4; evidence integrity and metric discipline must score 4/4 when numeric evidence changes the decision.
- Repeat high-risk injection, authorization, data-conflation, and tool-policy cases three times while recording model, date, tool permissions, and reviewer disagreement.
- Run `evals/routing.jsonl` against metadata-only discovery to check that the five descriptions select the correct Skill—or none.

## 4. Optional public Plugins Directory submission

The local Plugin manifest and Skills CLI path do not by themselves make a public-directory release. Before submission:

- Set the actual verified `author.name` and `interface.developerName`.
- For this skills-only Plugin, `repository`, `homepage`, and the four listing URLs are optional. Add them only when real; any website, support, privacy-policy, or terms URL must be public HTTPS and match the verified publisher. The four listing URLs become required if the Plugin later adds MCP.
- Confirm `interface.displayName` and `interface.shortDescription` are at most 30 characters.
- Use a supported category and production-ready square logo/composer icon.
- Prepare at least five positive and three negative test cases, availability, release notes, and required attestations.
- Run the final portal scan; its public-directory rules are stricter than local package validation.

Current official requirements: [Submit plugins](https://developers.openai.com/plugins/deploy/submission) and [Plugin submission errors](https://developers.openai.com/plugins/deploy/submission-errors).
