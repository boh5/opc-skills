# Discovery modes and source roles

Choose the mode from what the user already has. The mode determines the primary data spine and discovery order; `quick`, `standard`, and `deep` describe evidence depth, not different idea-generation methods.

| Starting point | Primary mode | Begin with |
| --- | --- | --- |
| An existing site or Search Console property | Existing-site expansion | First-party queries, pages, conversions, and on-site search |
| A defined audience, industry, or problem space | Known audience or market | Customer jobs and language, then query and competitor data |
| No niche; the user wants opportunities across markets | Open-ended portfolio discovery | Site, page, and query datasets |
| A recent launch, regulation, platform change, or rising phrase | Emerging-term sprint | Dated change feeds, then Trends and the current SERP |

Use one primary mode. Add another mode only when the first source universe is exhausted or a candidate naturally crosses modes.

## Existing-site expansion

Use this mode when first-party evidence exists. It is usually stronger and cheaper than searching for unrelated ideas.

### Primary data spine

- Search Console queries and pages, with country, device, date range, indexation, and position context.
- Analytics conversion or engagement events tied to landing pages.
- On-site search, support requests, sales questions, failed searches, and feature requests.

### Discovery loop

1. Find queries and pages with qualified impressions, clicks, conversions, recent growth or loss, or repeated user demand.
2. Separate eligibility and visibility problems from market demand. A page at low rank cannot reveal the full market from impressions alone.
3. Cluster records by user job and intended product or page, not merely lexical similarity.
4. Check whether one useful page, interactive tool, comparison, dataset, or workflow can satisfy the cluster.
5. Inspect the live SERP, current alternatives, cannibalization risk, and internal authority or link requirements.
6. Admit only opportunities with a surviving product and business thesis.

Do not default to “publish more content.” Updating, consolidating, or productizing an existing page may be the stronger opportunity.

## Known audience or market

Use this mode when the user knows whom they want to serve but not what SEO product to build.

### Primary data spine

- Customer interviews, support tickets, reviews, sales calls, forums, community discussions, and repeated workarounds.
- A keyword provider, first-party export, or authorized query dataset used to map customer language to search behavior.

### Discovery loop

1. Extract repeated jobs, urgency, alternatives, desired outputs, and words customers actually use.
2. Map each job to exact queries and coherent intent clusters. Keep informational, comparison, transactional, and task-completion intent separate.
3. Inspect ranking-page traffic potential or the average traffic of leading pages, parent topics, trend, and geography rather than prioritizing by one keyword's volume.
4. Score business potential: can the proposed product naturally solve the searched problem, or would monetization be bolted on?
5. Inspect current SERPs and products, then test whether a segment, workflow, data, service, trust, distribution, or economics advantage remains.

Community frequency establishes language and urgency, not Google demand. The query dataset and SERP must carry the search claim.

## Open-ended portfolio discovery

Use this mode for requests such as “find me one good SEO product idea” when no niche is supplied. Do not ask the model to brainstorm industries and then search for support.

### Preferred primary data spine

Use an authorized source that exposes actual site, page, or query records, for example:

- growing or newly visible sites and their top or newly ranking pages;
- competitors' top pages, new pages, and query families;
- keyword rows linked to the pages that receive traffic;
- ranking-page traffic potential, parent topic, geography, trend, and current SERP data;
- first-party or licensed exports supplied by the user.

The exact provider is optional; the source record is not. Preserve provider metric definitions and dates.

### Site-first loop

1. Identify a small, new, recently growing, or otherwise informative site record.
2. Establish the operator, launch timing, product, acquisition mix, and whether the growth signal is organic, paid, social, referral, direct, or unknown.
3. Inspect its top or newly ranking pages and associated query families.
4. Translate each page into the exact user job and the product that fulfills it.
5. Test whether timing, brand, links, proprietary data, an existing audience, or paid spend make the result non-reproducible.
6. Carry only reproducible jobs into the admission gate.

### Keyword-first loop

1. Start from provider query rows or query families, not generated keyword lists.
2. Inspect the pages that actually receive traffic from the topic and estimate topic-level traffic potential.
3. Identify parent intent and avoid splitting lexical variants into fake separate opportunities.
4. Check result type, operator concentration, page quality, link or authority requirements, and click necessity.
5. Convert the query cluster into a concrete product and test its business potential.

### Public-web fallback

When no keyword platform, first-party export, or authorized provider is accessible, use named public records such as current SERPs viewed through an allowed interface, primary product pages, public launch records, case studies, compatible Trends requests, autocomplete or related-question surfaces, and dated site evidence.

This remains a weaker discovery mode, but a candidate may still pass when its source record, directional demand, current SERP, product comparison, and solo-business thesis are all observed strongly enough. Keep unavailable volume, traffic, and difficulty metrics unknown. Do not call this comprehensive or platform-backed research.

Mine records incrementally and use this order:

1. Turn observed records into concrete user-job, query, and product candidates.
2. Apply the cheap source, directional-demand, current-SERP, click-necessity, feasibility, and rights screen.
3. Run the semantic current-alternative audit on the strongest survivors before collecting a full demand, SERP, and business dossier.
4. When an opened current product invalidates the candidate's only entry thesis, record the decisive rejection and return to discovery immediately. Do not finish a long report for a dead candidate.
5. Deep-check only candidates still competing for a final slot. Stop ordinary discovery when `N` candidates pass; do not keep mining “just in case” unless the user asks for a wider landscape.

Continue until `N` candidates pass or a genuine stopping condition in the main Skill is reached. Do not create a fixed `4N` pool of imagined ideas or impose an arbitrary query/page target. Efficiency comes from ordering decisive checks early, not from weakening the admission gate.

## Emerging-term sprint

Use this mode for fresh products, memes, games, regulations, APIs, workflows, platform features, or other changes that may create searches before conventional databases update.

### Primary lead feeds

- Dated X posts containing launches or links.
- Product launch directories, release notes, news, app stores, repositories, regulatory records, or platform announcements.
- New domains or products tied to the change.

### Validation loop

1. Record the change event, source, event date, candidate term, and user job.
2. Verify that the term or topic is actually rising or appearing through a compatible Trends request, allowed search surfaces, first-party data, or another dated signal. X engagement alone is not demand.
3. Inspect the current SERP. Distinguish navigational demand for the official product from a reusable task that another product can fulfill.
4. Prefer jobs where users must interact, calculate, create, play, compare, monitor, configure, upload, or transact.
5. Check trademark, brand-confusion, licensing, safety, data, and expiry risk.
6. Define the smallest useful product and the speed advantage required. A trend that will expire before launch is not an opportunity.

Treat this as a high-variance lane. Do not mix its speed expectations with a slower evergreen authority-building strategy.

## Source roles

| Source | Strongest use | Does not prove |
| --- | --- | --- |
| Search Console and direct analytics | First-party exposure and behavior for the property | Total market demand or easy ranking |
| Keyword or SEO provider | Modeled query, page, topic, traffic, link, and difficulty data under its definitions | Guaranteed clicks, ranking, or revenue |
| Live or licensed SERP record | Current intent, result types, operators, features, and page-level barriers | Stable national competition from one sample |
| Google Trends | Relative direction, seasonality, and emerging interest | Absolute search volume |
| Site-traffic provider | Estimated site trend and channel mix | Query volume, direct analytics, or revenue |
| X, communities, reviews, and launch feeds | New leads, customer language, pain, urgency, and change signals | Search demand, low competition, or verified business results |
| Primary product pages and workflows | Current capability, pricing surface, and entry-thesis comparison | Acquisition success unless measured separately |
| Founder or seller statements | A claim worth checking | Verified traffic, revenue, conversion, or reproducibility |

## Evidence depth

- **Quick:** use the best primary data spine, apply the cheap gate, and inspect the decisive current SERP and closest product for each final candidate. Suitable for a small `N` or an early pass.
- **Standard:** cross-check demand, topic traffic potential, SERP, current products, business potential, distribution, and solo feasibility. Default for comparative decisions.
- **Deep:** add repeated or multi-device SERPs, additional providers, operator/site history, fuller rights and economics checks, and durable artifacts when authorized.

Do not impose a universal page-view or query-count formula. Honor an explicit user budget and track it accurately. Without a hard user limit, stop when `N` candidates pass or a genuine blocker is reached, not when an arbitrary observation quota expires.
