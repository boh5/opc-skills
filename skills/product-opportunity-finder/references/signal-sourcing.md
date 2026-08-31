# Signal sourcing

Use this guide for live opportunity discovery. The objective is not to harvest trends; it is to trace a recognizable user job from a current signal to a product thesis and then test that thesis against alternatives.

## What each source can and cannot support

| Source lane | Useful for | Does not prove by itself |
| --- | --- | --- |
| X and practitioner feeds | New vocabulary, recurring complaints, workflow demonstrations, product launches, distribution patterns, fast-moving changes | Representative demand, retention, revenue, or reproducibility |
| Hacker News | Technical and operator pain, launch discussion, alternatives, implementation constraints, adoption among a technical audience | Mainstream-market demand or willingness to pay outside its audience |
| Reddit, V2EX, Linux.do, and relevant forums | Repeated jobs, current workarounds, dissatisfaction, audience language, support questions | Population size, objective product quality, or low competition |
| GitHub repositories, issues, and discussions | Real implementation activity, missing workflows, integration friction, ecosystem momentum, maintainer burden | Paying demand; stars and forks are adoption proxies, not customers |
| Product Hunt and Indie Hackers | Launch timing, positioning, adjacent products, founder-reported acquisition and economics | Durable usage or independently verified revenue; launch attention is selection-biased |
| Primary product pages, docs, pricing, changelogs, and status pages | Current claimed capability, target segment, packaging, integrations, limits, and dated product changes | User satisfaction, actual usage, retention, or feature quality without testing |
| Reviews, support threads, and issue trackers | Failure modes, dissatisfaction, switching triggers, repeated support burden | Incidence across all customers; dissatisfied users are overrepresented |
| Jobs, tenders, policy notices, and platform changelogs | Budgeted work, compliance needs, newly mandatory tasks, newly possible workflows | A ready-made software market or a solo-buildable product |

Treat search-result snippets and AI summaries only as navigation. Open the underlying source before using it for a material claim.

## Select signal lanes

Choose channels where the target user naturally appears. A developer-tool study may weight Hacker News and GitHub; a consumer workflow may weight Reddit, reviews, app stores, and product communities. Do not force developer channels onto every market.

For a standard study, triangulate across at least:

1. a conversation lane that exposes the user's language and pain;
2. a product or technical lane that exposes current behavior and feasibility;
3. a market, launch, review, or spend lane that tests whether the job extends beyond one post.

Use the same claim in two genuinely independent sources when it decides the recommendation. Cross-posts, syndicated stories, and pages quoting the same founder are one origin, not three.

## Query by the job, not the invented product

Build queries from observed language:

- `"I wish" + workflow`, `"how do you" + task`, `"alternative to" + current tool`;
- `site:news.ycombinator.com task`, `site:reddit.com task`, or the relevant community plus the user's phrase;
- GitHub issue terms such as `manual`, `error`, `missing`, `support`, `integration`, or `export` around the workflow;
- the input and desired output together, such as `invoice email reconcile accounting`;
- category and buyer terms, such as `compliance software for clinics`, not only a coined feature name;
- named alternatives plus `pricing`, `docs`, `changelog`, `reviews`, `limitations`, and `migration`.

In a direction scan, combine the broad direction with concrete trigger moments: onboarding, approval, reconciliation, audit, handoff, incident, renewal, procurement, migration, reporting, or support. This reveals jobs inside a trend instead of generating generic trend wrappers.

## Run the discovery sequence

1. **Scan current conversations and changes.** Capture the exact problem language and date.
2. **Group by job and trigger.** Merge posts that describe the same workflow even when product names differ.
3. **Write a one-sentence product hypothesis.** Name user, trigger, input, and outcome.
4. **Apply the legibility and execution gate.** Drop curiosities that require an archaeology lesson or inaccessible data.
5. **Audit alternatives early.** Search the functional fingerprint and open primary product surfaces before building a dossier.
6. **Triangulate surviving candidates.** Add an independent pain, product, launch, spend, or change lane.
7. **Deep-check only final contenders.** Verify first wedge, acquisition path, execution burden, and falsification test.

When a candidate fails, use the failure to sharpen the next batch. For example, feature parity means search for a different buyer, trigger, workflow boundary, or distribution advantage—not merely rename the same feature.

## Keep a compact internal ledger

For each raw candidate retain:

- source URL or supplied record;
- observation date and source lane;
- observed words or behavior, paraphrased unless a short quote is essential;
- user, trigger, workaround, and desired outcome;
- product hypothesis;
- alternative-audit status;
- admission or rejection reason;
- decisive unknown and next falsification action.

The ledger is an internal research aid. Do not make the user read it unless they request reproducibility or the rejected longlist.

## Avoid false blue oceans

“Blue ocean” should mean a plausible under-served entry thesis, not zero visible competitors. Warning signs include:

- novelty exists only in the name or prompt;
- the market is “empty” because users do not recognize or pay for the job;
- the product depends on private, restricted, unstable, or unlawfully obtained data;
- the first-user channel is unnamed;
- the idea is a report about an opportunity rather than functionality that completes a user workflow;
- evidence comes from one viral post, launch spike, founder claim, or repository star count.

A familiar market with dissatisfied users, a reachable segment, and a material workflow advantage is often stronger than an obscure category with no competitors.
