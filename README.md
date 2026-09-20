# OPC Skills

OPC Skills is an open-source collection of agent Skills for one-person companies and small teams. It combines product-opportunity and SEO research with source-backed AI/technology topic discovery and X writing. A promising signal is not proof of a profitable market, and a popular headline is not proof of its claims.

[简体中文](README.zh-CN.md)

## Included skills

| Skill | Role |
| --- | --- |
| `product-opportunity-finder` | Broad entry point. Finds understandable differentiated products from current social, developer, community, launch, and product signals, then audits alternatives, success paths, execution, and distribution. |
| `seo-idea-finder` | Self-contained end-to-end entry point. Mines observed site, page, query, customer-job, or change records until the requested number of opportunities passes a practical admission gate. |
| `site-opportunity-scout` | Reverse-engineers small or growing sites without confusing estimated traffic, owner claims, and verified facts. |
| `keyword-demand-validator` | Validates keyword demand, trend, intent, and click potential while preserving metric boundaries. |
| `serp-competition-auditor` | Audits a live SERP at page and operator level instead of declaring a niche easy from a single score. |
| `solo-business-evaluator` | Tests whether an opportunity is realistic, defensible, and monetizable for a solo builder. |
| `ai-tech-topic-scout` | Finds current AI/technology news and discussion-worthy developments; verifies sources, dates, and useful editorial angles. |
| `x-post-writer` | Writes X opinions, topical ideas, experiences, replies and follow-ups from account context; checks missing factual premises through the topic scout. |

The eight directories under `skills/` are separately installable Skills. Files under a Skill's `references/` directory are supporting material loaded only when needed; they are not additional Skills. The writer depends on sourced information: it can edit supplied evidence alone, while an end-to-end discovery-to-draft run uses both editorial Skills.

The suite has no runtime dependency on Marketing Skills or another Skill collection. Its methodology can learn from public projects, but every installed Skill carries the instructions it needs to perform its own task.

## Install with the Skills CLI

The repository does not need a `package.json`. `npx` downloads and runs the external [`skills`](https://github.com/vercel-labs/skills) CLI, while this repository remains a standard multi-Skill source.

From a local clone, inspect what the CLI discovers:

```bash
npx skills add . --list
```

Install the broad product-opportunity Skill:

```bash
npx skills add . --skill product-opportunity-finder --agent codex --global --yes
```

Install only the self-contained SEO entry Skill:

```bash
npx skills add . --skill seo-idea-finder --agent codex --global --yes
```

Install the two-stage AI/technology-to-X workflow:

```bash
npx skills add . --skill ai-tech-topic-scout x-post-writer --agent codex --global --yes
```

Install all eight Skills:

```bash
npx skills add . --skill '*' --agent codex --global --yes
```

Install directly from the public GitHub repository:

```bash
npx skills add boh5/opc-skills --skill product-opportunity-finder --agent codex --global --yes
npx skills add boh5/opc-skills --skill seo-idea-finder --agent codex --global --yes
npx skills add boh5/opc-skills --skill '*' --agent codex --global --yes
```

The `.codex-plugin/plugin.json` manifest also makes the whole suite packageable as one skill-only Codex Plugin. Plugin packaging and Skills CLI installation are complementary distribution paths. A public Plugins Directory submission additionally needs a verified developer or business identity, policy attestations, review cases, and successful skill scans. Website, support, privacy, and terms URLs are optional for a skills-only submission; if supplied, they must be real public HTTPS URLs that match the publisher. See the [release checklist](docs/release-checklist.md).

Installing `product-opportunity-finder` gives a standalone non-SEO workflow. Installing only `seo-idea-finder` does not install or automatically invoke the four SEO specialists; that entry Skill performs a baseline version of their checks. Install the complete suite when you want both entry workflows and explicit, deeper SEO audits.

Installing only `x-post-writer` does not install the scout. For fresh discovery, install both using the paired command above; the host must make both Skills available. No dependency is encoded as a fake MCP tool, and neither Skill installs itself, creates a schedule, or publishes a post. The public-repository commands only include additions once those changes have been pushed.

## Use

Invoke the broad workflow for differentiation or an under-served direction:

```text
Use $product-opportunity-finder to find 3 understandable AI-agent product opportunities for a small team. Start from current X, Hacker News, GitHub, community, and product evidence; do not reject a market merely because competitors exist.
```

Invoke the full workflow when you need a decision:

```text
Use $seo-idea-finder to find 5 English-language utility-site ideas I can build alone in four weeks. Start from observed site, page, or query data; prioritize organic traffic, low ongoing operations, and US demand.
```

Invoke a specialist directly for a narrower job:

```text
Use $serp-competition-auditor to audit the US mobile SERP for "free invoice generator" and separate observed results from tool estimates.
```

No Skill guarantees rankings, traffic, revenue, or followers. Volatile claims must carry a source, relevant scope, and observation date.

## AI/technology topics to X drafts

The writer bundles Humanizer 3.0.0 as a local reference. Every draft receives an editing pass before final evidence and weighted-length checks; no separate Humanizer installation is needed.

Personal posts start with what the account owner wants to say: an opinion, approved experience, topical idea or real question. News is one option, not the required input for every post. The writer verifies external factual premises without forcing a source recap, launch date or article link into every body; borrowed results and arguments still receive visible credit. Original opinions can use an empty source-URL array in structured output. Proposed ideas remain distinct from invented personal experience, and explicit recaps/tutorials retain their requested mode. See the [inspected Chinese X examples](skills/x-post-writer/references/chinese-x-patterns.md).

When the user leaves the action open, the writer chooses a new post, reply or quote by content and conversation fit. No route or posting ratio is mandatory. Reply/quote delivery includes the exact target and brief parent context outside the copy. Personal commentary defaults to no body URL; research links remain in review material. The prose must make sense without the private prompt or source page before it passes length validation.

Each drafted topic also includes an actual accompanying image by default. The running Agent reuses a suitable supplied or reusable image, or creates one with its available image capability. A prompt or article link is not an image deliverable. Image access or generation failures are reported separately, and explicit text-only requests remain supported. See [image delivery](skills/x-post-writer/references/images.md).

For ongoing writing, supply the account brief, approved voice samples, public-use material, recent drafted/queued/published content and reader feedback. The writer can choose a new post, a substantive follow-up or a reply, or return a reason to skip. Supported contrarian takes can challenge a specific claim or common practice without inventing controversy or personal beliefs. Cases and explainers need not be recent news unless the brief requires it. History and feedback stay caller-managed; the Skill does not schedule runs, store account memory automatically or publish. See its [account-context reference](skills/x-post-writer/references/account-context.md) for the optional structured handoff.

```text
Use $x-post-writer to choose a worthwhile contribution around my AI/technology topic, using my stated interests and views. Decide whether it belongs in a new post or an existing discussion, then deliver Chinese copy and an actual image. Check current discussion or missing facts with $ai-tech-topic-scout when needed. Return drafts only.
```

For topic selection without writing:

```text
Use $ai-tech-topic-scout to select up to five AI/technology topics from the last 48 hours, explaining the best angle, what changed, source dates, and the important caveat. Distinguish observed discussion from discussion potential.
```

The scout supplies an `opc-topic-pack/v1` handoff containing event IDs, source observations, supported claims, caveats, and freshness. The writer reuses a current pack instead of restarting discovery; missing or stale central facts receive a focused recheck. Missing access is reported, not replaced with invented news or engagement numbers. Neither stage needs private project material, a paid model API, or an X login for public-web work; X discussion itself remains unverified when inaccessible.

When discovery is needed, the scout defaults to a bounded 48-hour scan with up to five topics. The writer normally delivers the single best contribution, choosing a new post, reply or quote unless the user specifies the action or requests more drafts. Counts are maxima, not quotas. A successful zero-result scan and an access failure have different statuses. Posts include appropriate attribution, actual imagery and an honest length-check result. The optional X parser counts CJK, emoji, URLs, and thread numbering using `twitter-text`, rather than ordinary string length.

Version 0.2 of these two editorial Skills adds a separate audience-fit gate: official and recent is not enough without a supported reader payoff. Event dates do not establish every listed feature's release date. Completion follows the agreed scope, not a search count; unfinished mandatory work must not advance a successful-scan checkpoint. The optional checker also accepts JSON stdin without a temporary draft file, subject to host permissions, and any checked length must match the final copy exactly.

For a later recurring task, run acquisition and editing sequentially in the same task. Supply the audience, timezone/window, budget, and any explicitly authorized output/state path. A supplied pack can be passed inline without file writes. Persisted runs must retain exact run IDs and distinguish seen, drafted, and actually published events. These Skills define the workflow; they do not install a scheduler, run while the host is unavailable, or grant posting permission.

## Product and SEO research behavior

- `product-opportunity-finder` starts from current pain, workaround, request, change, launch, issue, or adoption records. X, Hacker News, GitHub, Reddit, Product Hunt, Indie Hackers, V2EX, Linux.do, and relevant communities are discovery lanes, not proof of demand or success.
- Broad product candidates must be understandable to their intended users, complete a real workflow, survive a functional-alternative audit, name a first-user channel, and fit the builder's constraints. Obscurity is not treated as opportunity.
- Existing competitors are evidence of a market, not an automatic veto. Feature parity invalidates the claimed feature edge; a material segment, workflow, distribution, trust, data, service, speed, or economics thesis may still survive.
- When learning from a successful project, the Skill separates the product engine from social or platform amplification and distinguishes reusable methods from timing, audience, capital, proprietary resources, and luck. It derives and freshly audits adjacent opportunities instead of copying the product.
- For either entry Skill, the requested count is the delivery target. Rejected, duplicate, vague, and unverified research-only items do not fill slots; discovery continues until `N` pass or a genuine blocker is stated.

- The Skill first chooses one primary discovery mode: existing-site expansion, known-audience research, open-ended portfolio discovery, or an emerging-term sprint.
- Every candidate must trace to an observed first-party, site, page, query, customer-job, SERP, or dated change record. X, communities, reviews, and founder stories can generate leads but do not prove demand or low competition.
- Open-ended discovery uses an authorized site/page/query data source when accessible. Public-web research remains possible, but it must name its records, keep unavailable metrics unknown, and never claim platform-backed or comprehensive keyword research.
- A cheap admission gate removes weak candidates before deep work. Before expensive validation, finalists are fingerprinted by user, input, transformation, output, workflow, ecosystem, and buying unit so equivalent current products with different names can be found on primary product surfaces.
- The requested count is the completion target. Rejected, duplicate, demand-and-SERP-unknown, and vague research-only candidates do not fill slots; the Skill mines another source-backed batch instead.
- If a user-supplied hard limit, exhausted source universe, missing authorization, or inaccessible required data blocks `N / N`, the result is explicitly incomplete rather than padded with weak candidates.
- `quick`, `standard`, and `deep` describe evidence depth. They no longer impose an arbitrary count-scaled candidate pool or external-observation formula. Public-web mode runs decisive parity checks early, abandons a dead framing before building a full dossier, and stops ordinary discovery when `N` candidates pass.
- User-facing results put the concrete products and first choice before evidence mechanics. Ledgers, query tallies, and tool traces are included only for requested diligence or reproducibility.
- Competitors are evidence, not a veto. If an incumbent already has the proposed feature, that feature advantage is invalidated, while the remaining product, segment, data, workflow, distribution, trust, support, speed, or economics thesis is reassessed. A material reframe gets a new functional fingerprint and a fresh alternative audit instead of inheriting the parent idea's result.
- A live URL alone is not a preserved observation. Decisive evidence records observation time, provider period, market/device, extraction method, supported claim, and limitation.
- Numerical stop thresholds require a baseline, statistical/sample goal, cost-and-return basis, or user-defined target. Otherwise the result provides a calibration period or formula.

Projects may optionally provide `.agents/opportunity-research.md` with stable factual constraints such as market, language, builder capacity, exclusions, and approved data sources. The file is never required, does not grant new permissions, and is not created or changed unless the user asks.

## Repository layout

```text
opc-skills/
├── .codex-plugin/plugin.json
├── CONTRIBUTING.md
├── VERSIONS.md
├── assets/
├── skills/
│   ├── seo-idea-finder/
│   ├── product-opportunity-finder/
│   ├── site-opportunity-scout/
│   ├── keyword-demand-validator/
│   ├── serp-competition-auditor/
│   ├── solo-business-evaluator/
│   ├── ai-tech-topic-scout/
│   └── x-post-writer/
├── evals/
│   ├── cases.jsonl
│   ├── fixtures/
│   └── rubric.md
└── docs/
    ├── release-checklist.md
    └── research-basis.md
```

`evals/` contains behavioral cases, synthetic fixtures, routing checks, and deterministic helper tests. The editorial Skills have local `scripts/` for topic-pack validation and weighted X text checking. The latter has its own locked npm dependencies; the repository still has no root npm application or mandatory crawler. Setup and test commands are in [evals/README.md](evals/README.md).

## Evidence rules

- Separate observed facts, first-party measurements, third-party estimates, owner claims, and inference.
- Keep keyword volume, trend index, SEO difficulty, ad competition, ranking position, site traffic, and revenue as different measures.
- Never add the volumes of synonyms unless the source defines a non-overlapping aggregate.
- Treat a localized SERP as a dated sample, not a stable national ranking.
- Consolidate domains owned by the same operator before judging SERP diversity.
- Treat communities and competitors as discovery evidence, not automatic validation or disqualification.
- Treat stars, likes, launch votes, traffic estimates, and founder stories as bounded signals, not substitutes for representative demand, retention, paying use, or reproducibility.
- Check current alternatives by functional fingerprint before calling an entrant differentiated; exact-name absence is not product absence, and parity invalidates the claimed edge rather than automatically rejecting the whole market.
- Preserve decisive observations with enough context to replay or audit the claim.
- Do not automate queries against Google unless Google grants permission or an official/authorized interface provides access; user permission does not waive Google's policy.
- For product/SEO studies, normally finish only when the requested number of source-backed candidates passes the admission gate; if a genuine blocker prevents that, report the partial count as incomplete rather than using rejected or unknown ideas as filler.
- End a completed product/SEO study with ranked products, a first choice, the surviving entry thesis, entry plan, investment and recurring-work assumptions, risks, and a stop line whose threshold has a stated basis. Editorial discovery instead selects up to the requested maximum without padding; it does not require a product thesis or SEO audit.

## Development

Run the portable repository checks before release:

```bash
npx skills add . --list
jq -c . evals/cases.jsonl >/dev/null
jq -c . evals/routing.jsonl >/dev/null
```

The OpenAI Skill Creator and Plugin Creator validators are optional development tools supplied with those Codex system Skills, not dependencies in this repository; they require a Python environment with PyYAML. Exact gates, the tested CLI path, and public-directory requirements are in the [release checklist](docs/release-checklist.md).

Then run the cases in `evals/cases.jsonl` with and without the target Skill and score them using `evals/rubric.md`. See [the research basis](docs/research-basis.md) for source and methodology boundaries, [VERSIONS.md](VERSIONS.md) for component versions, and [CONTRIBUTING.md](CONTRIBUTING.md) for contribution rules.

## License

[MIT](LICENSE)
