# Metric boundaries

Re-check provider documentation when the interface or methodology may have changed. Record the metric name exactly as displayed.

| Metric or source | Supports | Does not support by itself |
| --- | --- | --- |
| Search Console impressions | How often an owned property was shown under the selected filters, rankings, index coverage, and aggregation | Total market search volume; low impressions do not prove low demand when the page lacks visibility |
| Search Console clicks | Clicks attributed to the owned property | Total searches, total visits, or conversions |
| Search Console average position | Average topmost property/page position across recorded impressions | The rank seen in one manual search |
| Google Trends 0–100 | Normalized relative interest, direction, seasonality, and comparison inside one compatible request | Absolute volume; cross-chart comparison; comparison across different term/topic, search type, category, geography, time range, or comparison set; proof that a low-volume spike is real |
| Semrush volume | Modeled average monthly searches in the selected database/location | A direct Google count; guaranteed traffic |
| Semrush competitive density | Paid-search advertiser competition | Organic ranking difficulty |
| Semrush KD or PKD | Vendor-estimated organic difficulty; PKD is domain-specific | A Google metric; proof that a page can or cannot rank |
| Ahrefs KD | Backlink-related difficulty inferred from referring domains to current top-ten pages | On-page quality, intent fit, product quality, or a complete ranking forecast |
| Google Ads Keyword Planner | Advertising-oriented ranges or forecasts under account and campaign settings | Organic difficulty or exact universal volume |
| Similarweb total visits | Modeled website sessions under provider scope | Organic traffic, unique users, or direct analytics |
| Similarweb search clicks | Modeled clicks from search under provider scope | Website sessions or Search Console clicks |
| Authority/Domain Rating | Vendor-specific link profile proxy | Query difficulty, page quality, revenue, or traffic |
| Referring domains | Distinct linking domains under a provider's index | Link quality, causality, or the total work required to rank |
| Autocomplete/PAA/related searches | Query language and intent-discovery clues | Search volume, trend magnitude, or difficulty |
| Reddit/X/YouTube/forum activity | Problem language, urgency, community context | Search volume, organic traffic, or willingness to pay |
| Owner revenue or traffic post | A claim worth investigating | Independently verified performance or reproducibility |

## Comparison rules

- Compare values only when source, metric definition, geography, date, and device scope are compatible.
- For Trends, compare values only within the same normalized request and record term/topic, search type, category, geography, time range, and comparison set.
- Keep national, local, and global values separate.
- Keep current and historical snapshots separate.
- Keep total visits, organic visits, clicks, users, sessions, impressions, and searches separate.
- Keep keyword-level and site-level values separate.
- Report ranges as ranges; do not replace them with a midpoint unless the calculation is explicitly requested and labeled.
- Do not infer missing precision from chart pixels, snippets, cached cards, or rounded UI values.
- Record collection time, underlying data period, and provider refresh time as different fields. When a decisive volatile value cannot be refreshed, classify it as historical or unknown rather than current.

## Replayability rules

For every decisive numeric observation, preserve:

- source URL or record identifier;
- metric name and evidence class;
- `observed_at`, provider `data_period`, and refresh time when available;
- geography, language, device, database, and match scope;
- extraction method, including export, API field, UI transcription, or first-party report;
- exact claim the observation supports and its limitation.

A bare live URL is a navigation pointer, not a preserved measurement. In particular, a Google Trends URL alone does not preserve the extracted values or guarantee that a later viewer receives the same sample. Record the term/topic choice, search type, category, geography, time range, comparison set, values used, and collection time in the answer or in an explicitly authorized dated artifact.

## Primary methodology references

- [Google Trends data FAQ](https://support.google.com/trends/answer/4365533?hl=en)
- [Google Search Console performance metrics](https://support.google.com/webmasters/answer/7576553?hl=en)
- [Semrush search volume](https://www.semrush.com/kb/683-what-is-search-volume-in-semrush)
- [Semrush personal keyword difficulty](https://www.semrush.com/kb/1434-how-is-personal-keyword-difficulty-calculated)
- [Ahrefs Keyword Difficulty](https://help.ahrefs.com/en/articles/72265-what-does-kd-stand-for-in-keywords-explorer)
- [Similarweb data accuracy](https://support.similarweb.com/hc/en-us/articles/32914267250077-Similarweb-s-Data-Accuracy)
- [Similarweb Search 3.0 definitions](https://support.similarweb.com/hc/en-us/articles/17226327062429-Search-3-0-Data)
