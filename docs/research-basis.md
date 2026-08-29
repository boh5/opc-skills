# Research basis for v0.1

Last reviewed: 2026-08-29.

This document records why the Skills contain particular guardrails. It is not a frozen SEO playbook: search behavior, product metrics, policies, and SERPs are time-sensitive and should be checked again during each live study.

## Packaging and repository structure

- [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills) defines a Skill as a directory containing `SKILL.md`, with optional `scripts/`, `references/`, `assets/`, and `agents/`. It also recommends Plugins when bundling multiple Skills for reusable distribution.
- [OpenAI: Build plugins](https://developers.openai.com/plugins/build/plugins) requires `.codex-plugin/plugin.json` and supports a `skills/` component directory.
- [Vercel Labs Skills CLI](https://github.com/vercel-labs/skills) discovers the flat `skills/<name>/SKILL.md` layout and supports listing or selectively installing several Skills from one repository.
- Popular public collections—including [Anthropic Skills](https://github.com/anthropics/skills), [OpenAI Plugins](https://github.com/openai/plugins), and [Superpowers](https://github.com/obra/superpowers)—use independent Skill directories and reserve supporting files for material that belongs to one Skill.

These sources support the v0.1 layout: five sibling Skills inside one skill-only Plugin, with no fake wrapper Skill and no mandatory npm package.

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

A 30-day scan covered Reddit, Hacker News, YouTube, GitHub, Digg, and web results. Native X collection was unavailable because an authenticated X source was not configured; v0.1 makes no X-specific claim. Community discussions were useful for discovering vocabulary and recurring concerns—especially zero-click informational intent and weak evidence behind public revenue claims—but were not treated as proof of volume, difficulty, rankings, or profitability.

The uncurated collection output stays under `research/last30days/` and is ignored from distribution. It may contain noisy or untrusted third-party text; this curated document is the maintained evidence boundary.
