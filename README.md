# OPC Skills

OPC Skills is an evidence-first SEO opportunity research suite for solo founders and small teams. It separates discovery, demand, SERP competition, and business feasibility so that a promising signal is not mistaken for proof that a niche is easy or profitable.

[简体中文](README.zh-CN.md)

## Included skills

| Skill | Role |
| --- | --- |
| `seo-idea-finder` | Self-contained end-to-end entry point. Discovers candidates, covers four evidence lanes, and makes a clear build/no-build recommendation. |
| `site-opportunity-scout` | Reverse-engineers small or growing sites without confusing estimated traffic, owner claims, and verified facts. |
| `keyword-demand-validator` | Validates keyword demand, trend, intent, and click potential while preserving metric boundaries. |
| `serp-competition-auditor` | Audits a live SERP at page and operator level instead of declaring a niche easy from a single score. |
| `solo-business-evaluator` | Tests whether an opportunity is realistic, defensible, and monetizable for a solo builder. |

The five directories under `skills/` are independent Skills. Files under a Skill's `references/` directory are supporting material loaded only when needed; they are not additional Skills.

## Install with the Skills CLI

The repository does not need a `package.json`. `npx` downloads and runs the external [`skills`](https://github.com/vercel-labs/skills) CLI, while this repository remains a standard multi-Skill source.

From a local clone, inspect what the CLI discovers:

```bash
npx skills add . --list
```

Install only the self-contained entry Skill (minimal setup):

```bash
npx skills add . --skill seo-idea-finder --agent codex --global --yes
```

Install all five Skills for the recommended full suite and independent deep audits:

```bash
npx skills add . --skill '*' --agent codex --global --yes
```

Install directly from the public GitHub repository:

```bash
npx skills add boh5/opc-skills --skill seo-idea-finder --agent codex --global --yes
npx skills add boh5/opc-skills --skill '*' --agent codex --global --yes
```

The `.codex-plugin/plugin.json` manifest also makes the whole suite packageable as one skill-only Codex Plugin. Plugin packaging and Skills CLI installation are complementary distribution paths. A public Plugins Directory submission additionally needs a verified developer or business identity, policy attestations, review cases, and successful skill scans. Website, support, privacy, and terms URLs are optional for a skills-only submission; if supplied, they must be real public HTTPS URLs that match the publisher. See the [release checklist](docs/release-checklist.md).

Installing only `seo-idea-finder` does not install or automatically invoke the four specialists. The entry Skill performs a baseline version of all four checks; install the complete suite when you want the specialists available for explicit, deeper audits.

## Use

Invoke the full workflow when you need a decision:

```text
Use $seo-idea-finder to find English-language utility-site ideas I can build alone in four weeks. Prioritize organic traffic, low ongoing operations, and US demand.
```

Invoke a specialist directly for a narrower job:

```text
Use $serp-competition-auditor to audit the US mobile SERP for "free invoice generator" and separate observed results from tool estimates.
```

No Skill guarantees rankings, traffic, or revenue. Volatile claims must carry a source, market, and observation date.

## Repository layout

```text
opc-skills/
├── .codex-plugin/plugin.json
├── assets/
├── skills/
│   ├── seo-idea-finder/
│   ├── site-opportunity-scout/
│   ├── keyword-demand-validator/
│   ├── serp-competition-auditor/
│   └── solo-business-evaluator/
├── evals/
│   ├── cases.jsonl
│   ├── fixtures/
│   └── rubric.md
└── docs/
    ├── release-checklist.md
    └── research-basis.md
```

`evals/` contains real behavioral cases and a scoring rubric used before release. There is intentionally no `scripts/` directory in v0.1: none of the workflows currently needs deterministic repeated code, and empty or decorative directories make Skills harder to maintain.

## Evidence rules

- Separate observed facts, first-party measurements, third-party estimates, owner claims, and inference.
- Keep keyword volume, trend index, SEO difficulty, ad competition, ranking position, site traffic, and revenue as different measures.
- Never add the volumes of synonyms unless the source defines a non-overlapping aggregate.
- Treat a localized SERP as a dated sample, not a stable national ranking.
- Consolidate domains owned by the same operator before judging SERP diversity.
- Treat communities and competitors as discovery evidence, not automatic validation or disqualification.
- Do not automate queries against Google unless Google grants permission or an official/authorized interface provides access; user permission does not waive Google's policy.
- End full research with a first choice, backup, entry plan, investment estimate, risks, and a stop line.

## Development

Run the portable repository checks before release:

```bash
npx skills add . --list
jq -c . evals/cases.jsonl >/dev/null
jq -c . evals/routing.jsonl >/dev/null
```

The OpenAI Skill Creator and Plugin Creator validators are optional development tools supplied with those Codex system Skills, not dependencies in this repository; they require a Python environment with PyYAML. Exact gates, the tested CLI path, and public-directory requirements are in the [release checklist](docs/release-checklist.md).

Then run the cases in `evals/cases.jsonl` with and without the target Skill and score them using `evals/rubric.md`. See [the research basis](docs/research-basis.md) for the source and methodology boundaries behind v0.1.

## License

[MIT](LICENSE)
