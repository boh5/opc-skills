# Component versions

OPC Skills uses semantic versions for the published suite and for each independently installable Skill. A suite release bumps `.codex-plugin/plugin.json`; each changed Skill bumps `metadata.version` in its own `SKILL.md`.

| Component | Version | Notes |
| --- | --- | --- |
| Plugin suite | `0.5.0` | Adds a source-backed AI/tech discovery-to-X-draft workflow; version metadata is not a published release |
| `ai-tech-topic-scout` | `0.7.0` | Prioritizes material for sharp judgments, informative facts and worthwhile discoveries, preserving support and inference boundaries |
| `x-post-writer` | `0.16.0` | Adds a portable full-color expressive doodle reference and concrete art direction while keeping images optional and scenes topic-specific |
| `product-opportunity-finder` | `0.1.0` | Discovers understandable product opportunities from current social, community, product, and market signals, audits alternatives and success paths, and returns a ranked entry decision |
| `seo-idea-finder` | `0.3.0` | Adds source-record discovery, semantic current-alternative audits, fresh reframe checks, evidence-led replenishment, and product-first delivery without quota filler |
| `site-opportunity-scout` | `0.2.0` | Site, operator, acquisition, and reproducibility audit |
| `keyword-demand-validator` | `0.2.0` | Demand, intent, trend, and metric-boundary validation |
| `serp-competition-auditor` | `0.2.0` | Query-level SERP, operator, page, and entry-thesis audit |
| `solo-business-evaluator` | `0.2.0` | Solo-founder feasibility, economics, risk, and stop decision |

## Version policy

- Patch: wording, examples, or fixes that do not intentionally change the decision contract.
- Minor: new behavior, reference material, output fields, or compatible guardrails.
- Major: renamed Skills, removed behavior, incompatible inputs/outputs, or materially different decision semantics.

The Skills CLI can install from a branch or repository state without a GitHub tag. These versions document component behavior; release tags are still useful when users need a reproducible source revision.
