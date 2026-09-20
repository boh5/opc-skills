# Release checklist

This checklist separates three different release targets: a valid Skill tree, installation through the Skills CLI, and optional submission to OpenAI's public Plugins Directory.

## 1. Repository and Skill tree

- Exactly eight intended directories exist under `skills/`, each with a valid `SKILL.md`.
- Every frontmatter `name` matches its directory.
- Every Skill has a valid `metadata.version`, and the published suite version in `.codex-plugin/plugin.json` matches the intended release in `VERSIONS.md`.
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
npx skills add . --skill ai-tech-topic-scout x-post-writer --agent codex --yes --copy
npx skills add . --skill '*' --agent codex --yes --copy
```

Run installation checks in separate temporary target directories, pointing each command at the source checkout; do not overwrite a user's global Skills. Confirm that listing discovers eight Skills, selective installation copies one, the editorial pair copies two, and wildcard installation copies eight. Copied Skills must retain `agents/`, `references/`, and any `scripts/` and lockfiles; generated `node_modules` must not be distributed. Run the editorial helpers from an isolated installed pair as well as the source checkout.

Check the installed tree **before** installing helper dependencies. In the locally inspected Skills CLI `1.5.26`, local-path `--copy` also copies `node_modules`; `.gitignore` does not filter that copy. Use a clean clone or a separate staging copy that explicitly excludes `node_modules`, `__pycache__`, and unrelated local outputs. Preserve the development checkout and its caches. A helper passing with dependencies copied from the checkout is not proof of a clean install; install the pinned dependencies in the isolated target with lifecycle scripts disabled, then rerun it.

For a GitHub release, confirm the README install examples and the manifest's `repository` and `homepage` fields point to the actual public repository.

## 3. Behavioral release gate

- Capture the final answer and full tool trace for baseline and Skill-enabled runs.
- Enforce every case-level `must_pass` and `critical_failures` item before scoring.
- Blind the reviewer to answer identity.
- Require each Skill to win at least two of its targeted cases by at least one relevant rubric point, with no overall regression.
- Require every applicable rubric dimension to score at least 3/4; evidence integrity and metric discipline must score 4/4 when numeric evidence changes the decision.
- Repeat high-risk injection, authorization, data-conflation, and tool-policy cases three times while recording model, date, tool permissions, and reviewer disagreement.
- Verify primary discovery-mode and data-spine selection, user-supplied budget adherence when present, optional-context authority boundaries, source-record admission, feature-parity handling, competitor-not-veto behavior, evidence replayability, and numerical stop-threshold basis.
- Run `evals/routing.jsonl` against metadata-only discovery to check that the eight descriptions select the correct Skill—or none.
- For editorial cases, verify upstream reuse versus focused refresh, event deduplication, actual discussion evidence, zero-result versus outage handling, source attribution, same-post caveats, and draft-only authority. Do not impose product-building or SEO gates.
- Include the audience-fit/order/professional-audience counterfactuals, webinar versus release clocks, mandatory versus optional coverage, and tiny-budget completion cases. Inspect source mode separately from run status and verify that the exact final copy matches the successful parser input; do not infer this from a number in the final answer.
- Run the deterministic editorial checks in `evals/README.md`. Passing parser/fixture tests does not substitute for fresh-session, blinded model evaluation or prove live account acceptance.

## 4. Optional public Plugins Directory submission

The local Plugin manifest and Skills CLI path do not by themselves make a public-directory release. Before submission:

- Set the actual verified `author.name` and `interface.developerName`.
- For this skills-only Plugin, `repository`, `homepage`, and the four listing URLs are optional. Add them only when real; any website, support, privacy-policy, or terms URL must be public HTTPS and match the verified publisher. The four listing URLs become required if the Plugin later adds MCP.
- Confirm `interface.displayName` and `interface.shortDescription` are at most 30 characters.
- Keep `interface.defaultPrompt` to at most three unique one-line starter prompts, each at most 128 characters and without app mentions.
- Use a supported category and production-ready square logo/composer icon.
- Prepare at least five positive and three negative test cases, availability, release notes, and required attestations.
- Run the final portal scan; its public-directory rules are stricter than local package validation.

Current official requirements: [Submit plugins](https://developers.openai.com/plugins/deploy/submission) and [Plugin submission errors](https://developers.openai.com/plugins/deploy/submission-errors).
