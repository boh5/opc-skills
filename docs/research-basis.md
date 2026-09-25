# Research basis

Product/SEO material last reviewed: 2026-08-30. Editorial additions and X rules reviewed: 2026-09-16. Component versions are in `VERSIONS.md`; a review date is not a release receipt.

This document records why the Skills contain particular guardrails. It is not a frozen SEO playbook: search behavior, product metrics, policies, and SERPs are time-sensitive and should be checked again during each live study.

## Packaging and repository structure

- [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills) defines a Skill as a directory containing `SKILL.md`, with optional `scripts/`, `references/`, `assets/`, and `agents/`. It also recommends Plugins when bundling multiple Skills for reusable distribution.
- [OpenAI: Build plugins](https://developers.openai.com/plugins/build/plugins) requires `.codex-plugin/plugin.json` and supports a `skills/` component directory.
- [Vercel Labs Skills CLI](https://github.com/vercel-labs/skills) discovers the flat `skills/<name>/SKILL.md` layout and supports listing or selectively installing several Skills from one repository.
- Popular public collections—including [Anthropic Skills](https://github.com/anthropics/skills), [OpenAI Plugins](https://github.com/openai/plugins), and [Superpowers](https://github.com/obra/superpowers)—use independent Skill directories and reserve supporting files for material that belongs to one Skill.

The v0.5 layout has eight sibling Skills inside one skill-only Plugin, with no fake wrapper Skill or root npm application. The optional X text validator has Skill-local locked npm dependencies.

## AI/technology discovery and X editing

- Public Skill source review on 2026-09-24 informed open-ended angle selection: [Publora Post Ideas](https://github.com/publora-team/publora-post-ideas/blob/main/skills/publora-post-ideas/SKILL.md) compares distinct angles before drafting; [BlackTwist content strategy](https://github.com/blacktwist/social-media-skills/blob/main/skills/content-strategy-sms/SKILL.md) distinguishes a subject from a specific point of view; [Corey Haines social listening](https://github.com/coreyhaines31/marketingskills/blob/main/skills/social/references/listening.md) examines actual questions and opportunities to add a useful reply. OPC adapts these ideas in its own instructions and synthetic examples, without bundling their text, requiring their services, adding mandatory user checkpoints or importing their timing, engagement-weight or growth claims. The writer selects internally for ordinary runs and preserves explicitly supplied tasks. These methods motivate behavioral comparisons, not a claim of proven virality.
- A second Chrome read on 2026-09-24 covered 29 distinct post cards from six Chinese AI/developer creators and six complete posts with selected replies. The maintained [observation reference](../skills/x-post-writer/references/chinese-x-patterns.md) records direct status URLs, sampling limits and the distinction between author reports and verified facts. It informed concrete-occasion selection and purpose-matched voice examples after the user rejected the prior synthetic preferences. Neither popularity nor an evaluator's favorable score overrides that rejection; held-out first completions are assessed separately for substance, language and conversation fit.
- [Humanizer 3.0.0 by Siqi Chen](https://github.com/blader/humanizer/blob/9862685f575c65a8247f90369951df1b3416e3d6/SKILL.md), reviewed 2026-09-19, supplies the writer's post-draft editing pass. Its original Skill is bundled unchanged as `x-post-writer/references/humanizer.md`, with its MIT copyright and license alongside it. OPC uses embedded mode, applies language-appropriate patterns to Chinese, and retains the writer's source, attribution, caveat and final-length requirements. No separate Humanizer installation is required. Pattern cleanup is not evidence of detector evasion or improved engagement.
- [X AI Topic Selector](https://github.com/vigorX777/x-ai-topic-selector/blob/main/SKILL.md) separates finding posts from recommending topics. Its inspected entrypoint uses interactive parameter collection, Chrome login, persisted settings, and optional model-provider credentials. OPC adopts the discovery/editorial separation, not its scripts, login workflow, mandatory questionnaire, or credential storage.
- [AI Daily Digest](https://github.com/vigorX777/ai-daily-digest/blob/main/README.md) documents feed collection, time filtering, ranking, and synthesis. OPC uses complementary source lanes and preserves source dates; the collection's source count, scores, and trend summaries are not evidence of completeness, popularity, or growth.
- [X character-counting documentation](https://docs.x.com/fundamentals/counting-characters) recommends [twitter-text](https://github.com/twitter/twitter-text) for weighted counting, including CJK, recognized emoji sequences, URL transformation, and NFC normalization. The local helper pins `twitter-text@3.1.0`; it validates standard post text, not account access, facts, media, new emoji, or eventual platform acceptance.
- [X automation rules](https://help.x.com/en/rules-and-policies/x-automation), updated April 2026, distinguish permitted information broadcasts from prohibited website scripting, automated trending-topic posting, and unsolicited automated interaction. [Authenticity rules](https://help.x.com/en/rules-and-policies/authenticity) also constrain spam and inauthentic amplification. OPC's workflow ends at drafts; research, writing, and a recurring invocation do not grant account-action permission.

The resulting contract is `ai-tech-topic-scout` → `opc-topic-pack/v1` → `x-post-writer`. The scout is independently useful. The writer can edit sufficient supplied evidence alone and loads the scout for missing current material when both are available. This is an explicit workflow dependency, not an assumed CLI dependency resolver or a fake MCP dependency. It introduces no paid data provider, background service, global installation, or posting client.

Editorial choices are separate from product/SEO research: novelty, practical impact, a meaningful demonstration, or a sourced disagreement can justify a topic without proving paying demand. Popularity and evidence quality are separate. The scan is bounded, counts are maxima, duplicated events are merged, old reposts do not become news, and unknown engagement stays unknown. A source-backed interesting angle does not require the account owner to build or test a product.

The caller-supplied cold-start case review on 2026-09-19 informed account continuity: existing material, substantive follow-ups and reader questions can guide the next draft. Its cited [introductory case](https://x.com/gkxspace/status/1968183340026237285) and [answer to a reader's acquisition question](https://x.com/gkxspace/status/1970140112265818310) motivate testable editorial choices, not causal claims about growth. Self-reported follower gains and later cumulative views do not establish an optimal cadence. The writer therefore accepts optional account context, compares covered angles, and keeps feedback interpretation separate from publication or scheduling.

The repository includes synthetic source records, a portable topic pack, two Chinese draft examples, deterministic helper tests, and behavior/routing cases. These support reproducibility but do not establish baseline improvement, platform acceptance, follower growth, or successful live publication. No growth statistic from a reference project is imported as a promise.

## Operational design influences

- An audit of [Marketing Skills at commit `e55de886`](https://github.com/coreyhaines31/marketingskills/tree/e55de886) informed several operational patterns: explicit fast/deep research paths, optional project context, dated working artifacts, and concrete decision deliverables.
- OPC Skills re-expresses those useful patterns under its own evidence contract. It does not depend on Marketing Skills at installation or runtime, does not invoke those Skills implicitly, and does not import their benchmark values as universal rules.
- The workload budgets in OPC Skills are effort controls, not claims about statistical sufficiency. Evidence strength still depends on source quality, compatibility, repetition, and the decision being made.
- Idea-finding now chooses a primary discovery mode from the user's starting point: an existing property, a known audience, an open-ended portfolio search, or an emerging term. Each mode begins from observed first-party, site, page, query, customer-job, or change records rather than a model-generated cross-industry idea list.
- The requested count is a completion target, not a reason to preserve failed slots. Rejected, duplicate, demand-and-SERP-unknown, and vague research-only candidates do not count. Discovery continues in source-backed batches until the requested number passes or a genuine workload, access, authorization, or source-exhaustion blocker is reached.
- SEO platforms and first-party exports are useful primary data spines when authorized and accessible, but they are not installation dependencies. Public-web research can still qualify a candidate when it supplies traceable source records, directional demand, a current SERP, product comparison, and a viable entry thesis. It remains weaker evidence and cannot be reported as platform-backed or comprehensive keyword research.
- Deep site, demand, SERP, product, and business checks are applied only after a cheap admission gate. Comparable-site evidence is conditional: it matters for site-first and reproducibility theses but is not mandatory for a genuinely new change-driven query.
- Competitor research is split into two questions: whether the market/job exists, and whether the entrant still has a material entry thesis. Current feature parity invalidates the claimed edge, but competitor existence alone does not invalidate the market.
- Durable screenshots, exports, and notes are optional. Skills default to read-only chat output and write artifacts only after explicit user authorization.

## Broad product-opportunity discovery

- `product-opportunity-finder` is the non-SEO entry point. It starts from current pain, workaround, change, launch, issue, and adoption records rather than treating a model brainstorm as market evidence.
- X, Hacker News, GitHub, Reddit, Product Hunt, Indie Hackers, V2EX, Linux.do, and relevant user communities are prioritized for discovery because they expose current language, workflows, dissatisfaction, and newly possible behavior. Their engagement metrics remain lead signals, not proof of representative demand, retention, revenue, or a defensible opportunity.
- Current primary product pages, documentation, pricing, changelogs, issues, reviews, and other independent source lanes are used to test whether the observed job is real, what alternatives already do, and which entry thesis survives.
- The workflow deliberately avoids novelty fetishism. A familiar or competitive market remains eligible when a material product, segment, workflow, data, integration, distribution, trust, service, speed, or economics advantage survives; an obscure category is not attractive merely because it appears empty.
- Success cases are analyzed as dated paths: problem discovery, entry wedge, product engine, amplification engine, distribution, outcomes, and operating burden. Reusable mechanisms are separated from timing, audience, capital, proprietary data, and luck. The resulting opportunity must be newly audited and must not copy the source product.
- Each standard broad-product finalist requires independent problem or behavior evidence, a separate market, spend, change, launch, or technical lane, and current primary-product checks; repeated posts from one community do not become independent corroboration.
- Product documentation is treated as a current vendor claim unless the workflow is directly observed or tested. Externally acting Agent ideas additionally require authority, disclosure or consent, human confirmation, policy, auditability, reversibility, data-minimization, and fallback boundaries before recommendation.

## Practitioner-method review

A direct X review on 2026-08-30 informed the discovery rewrite. These posts are evidence of practitioner methods and opinions, not independently audited proof of outcomes:

- [Ross Hudgens](https://x.com/RossHudgens/status/1465926865927999489) argues for starting with audience research rather than letting a keyword tool define the opportunity universe.
- [Tim Soulo](https://x.com/timsoulo/status/1458975097067229191) describes page-level traffic potential because pages rank for many query variants, and separately emphasizes [business potential](https://x.com/timsoulo/status/1673607354695430145).
- [Aleyda Solis](https://x.com/aleyda/status/1354507737368031246) emphasizes aligning pages with the user's search journey and intent.
- [Glen Allsopp](https://x.com/ViperChill/status/1757765490473042003) demonstrates large-sample SERP and operator analysis rather than treating one difficulty score as the market.
- [Jake Ward](https://x.com/jakezward/status/1815370189560561981) frames SEO as customer, market, competitor, SERP, UX, brand, distribution, and data work rather than keyword and blog production alone.
- Chinese independent-builder workflows add two specialized discovery loops: [site-to-keyword reverse engineering](https://x.com/blankwebdev/status/1940955317195702364) and [dated launch-feed plus Trends validation for emerging terms](https://x.com/gefei55/status/2067637722966380891).

Across these approaches, the shared sequence is customer or source record, query and topic evidence, current SERP, product and business fit, and distribution. X and communities are useful method, vocabulary, case, and change feeds; they are not substitutes for query demand or current SERP evidence.

## Search and measurement boundaries

- [Google Trends FAQ](https://support.google.com/trends/answer/4365533?hl=en) says Trends uses sampled, normalized data scaled from 0 to 100. It is relative interest, not absolute search volume; low-volume terms can show zero or statistical noise.
- [Google Search Console performance report](https://support.google.com/webmasters/answer/7576553?hl=en) defines clicks, impressions, CTR, and average position for an owned property. These are first-party site measurements, not estimates of total market demand.
- [Semrush search volume methodology](https://www.semrush.com/kb/683-what-is-search-volume-in-semrush) describes modeled volume and distinguishes ad competition from SEO keyword difficulty.
- [Ahrefs Keyword Difficulty](https://help.ahrefs.com/en/articles/72265-what-does-kd-stand-for-in-keywords-explorer) is a vendor estimate based on referring domains to current top-ten pages and explicitly excludes on-page factors.
- [Similarweb data accuracy](https://support.similarweb.com/hc/en-us/articles/32914267250077-Similarweb-s-Data-Accuracy) describes its traffic figures as estimates that should not be expected to match direct analytics, especially for small sites.
- [Similarweb Search 3.0](https://support.similarweb.com/hc/en-us/articles/17226327062429-Search-3-0-Data) distinguishes estimated search clicks from website visits.

The Skills therefore prohibit substituting one of these measures for another and require source, geography, and date labels for volatile metrics.

## SERP, AI, and content risk

- [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies) prohibit unauthorized automated Google queries and identify doorway pages, keyword stuffing, misleading functionality, and scaled low-value content as spam practices.
- [Google guidance for AI features](https://developers.google.com/search/docs/appearance/ai-features) says ordinary technical eligibility and people-first SEO practices apply to AI Overviews and AI Mode; there is no special AI-only markup requirement.
- A [Pew Research Center browsing study](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) observed fewer traditional-result clicks when an AI summary appeared in its March 2025 U.S. sample. The study is useful evidence of click risk, but not a universal CTR forecast.

The Skills assess whether a query still requires a click and whether a real product or primary source can provide value beyond a generated answer. They do not recommend scaled pages whose only distinction is a synonym, city, date, or random seed.

## Community scan

A 30-day scan covered Reddit, Hacker News, YouTube, GitHub, Digg, and web results, followed by the direct X practitioner-method review above. Community discussions were useful for discovering vocabulary, products, changes, and recurring concerns—especially zero-click informational intent and weak evidence behind public revenue claims—but were not treated as proof of volume, difficulty, rankings, or profitability.

The uncurated collection output stays under `research/last30days/` and is ignored from distribution. It may contain noisy or untrusted third-party text; this curated document is the maintained evidence boundary.

The user's 2026-09-25 correction rejects a dependency on founder diaries or real-life activity for autonomous X writing. The writer now distinguishes independently drafted judgments and clearly fictional scenes from assertions of past personal experience. Ownerless/offline opinion tests exercise this directly; missing source access still blocks an exclusive current-news or unreadable-target task, rather than being silently replaced with evergreen copy.

A subsequent 2026-09-25 user correction explicitly authorizes invented first-person everyday stories without a mandatory hypothetical opening or public fiction label. This is an account writing preference, not a claim about research evidence or X performance. Narrative creativity remains optional; factual-only rewrites and execution records retain their source boundaries.

A fresh independent comparison on 2026-09-25 opened seven X posts by five authors after generating an autonomous batch. It distinguished useful detail and meaningful narrative endings from restated benefits, without treating every creator sample as exemplary. The writer's ending edit now asks what the sentence changes, preserves material conditions and reversals, and avoids completing every short post as a miniature essay. Subsequent fresh generation and empirical review, rather than this source comparison alone, are needed to assess the change.
