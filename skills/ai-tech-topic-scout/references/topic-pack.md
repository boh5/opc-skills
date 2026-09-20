# Topic pack v1

The portable handoff is a JSON-compatible object identified by `schema_version: "opc-topic-pack/v1"`. The [local schema](topic-pack.schema.json) defines its fields. Use this object between acquisition and editing, whether inline in the task or saved at an explicitly authorized path.

## Pack-level fields

- `run_id`: a caller-provided ID or a run-specific identifier; not a secret.
- `generated_at`: actual run timestamp with UTC offset.
- `mode`: `live`, `supplied`, or `fixture`. Synthetic fixtures must remain visibly synthetic.
- Optional `selection_mode`: `standard` or `conversation_first`. Omitted means the ordinary news/editorial workflow. Set `conversation_first` when the brief requires live discussion/reply discovery.
- `window.start` / `window.end`: absolute requested period with offsets; start must not exceed end.
- `language` / `audience`: editorial brief, not inferred personal demographics.
- `status`: `complete`, `partial`, `blocked`, or `no_update`.
- `coverage`: what source lanes were checked, limited, unavailable or deliberately not used.
- `topics`: distinct event records, including ready topics and optional clearly separated watch items.
- `gaps`: coverage, access, provenance or verification limitations. An empty result caused by inaccessible sources is not `no_update`.

Status describes the acquisition stage and its declared obligations, not downstream length validation or publication:

| Status | When to use it | Successful-scan checkpoint |
| --- | --- | --- |
| `complete` | The bounded required scope and decisive checks are finished; at least one topic passes both evidence and audience-fit gates | May advance only when state writes are authorized |
| `no_update` | The same scoped work is finished, but no suitable new topic remains; requires at least one checked lane | May advance, with no invented drafted/published events |
| `partial` | Useful inspection occurred, but a mandatory lane or decisive check remains unfinished because of access, evidence, time, or budget; zero or more individually ready topics may remain | Do not advance |
| `blocked` | Required acquisition cannot meaningfully proceed and there is no usable ready topic, for example all available sources failed before inspection | Do not advance |

`complete` is not exhaustive internet coverage. Optional inaccessible lanes may be disclosed without making a finished scoped scan partial; an explicitly required lane cannot be reclassified as optional after failure. `blocked` and `no_update` contain no ready topics. A rejected candidate with a settled reason need not make the run partial; unresolved verification that prevents fulfilling a required check does.

Use `coverage.note` to describe each lane's required/optional role, actual inspected scope and limitations. Record the stop reason and observation usage when budgeted; use `gaps` for unfinished obligations and other limits. No new fields are needed in v1. One checked source, a small request count, or reaching the maximum output count does not by itself determine status. The validator checks only observable structural invariants, not whether the declared scope was honestly completed.

## Each topic

`id` identifies the record in this pack. `event_key` identifies the underlying entity/change/version or dated event across runs. Keep the same key when only coverage or the writing angle changes. Give a material new development a new key with an explicit relationship in `why_now`.

Required editorial fields are `title`, `category`, `decision`, `event_date`, `latest_development_at`, `freshness`, `why_now`, `audience_value`, `angle`, `sources`, `claims`, `discussion`, and `caveats`.

- `decision`: `ready` means there is a supportable editorial nucleus and a concrete payoff for the declared audience, not posting approval. `audience_value` names that payoff and `angle` explains the supported point of interest. `watch` and `skip` must not become finished factual posts.
- `category`: `news`, `demo`, `discussion`, or `analysis`.
- Dates preserve evidence precision: date-only or an offset timestamp; use `null` when unknown.
- A date-only value overlapping the edge of an hourly window does not prove exact-hour freshness. Preserve that uncertainty in the caveat; the validator checks calendar-day overlap, not a time the source never supplied.
- `freshness`: `in_window`, `new_development`, `old`, or `unknown`. Ready latest-news topics need one of the first two.
- `discussion.status`: `observed`, `potential`, or `unknown`, with a bounded `summary`, source IDs and optional measured metrics. Only `observed` permits claims of observed discussion.
- `recommended_action`: optional `reply`, `quote`, or `standalone`. In `conversation_first`, every `ready` topic must include it and must have `discussion.status: observed`.
- `conversation_target_source_id`: required when `recommended_action` is `reply` or `quote`. It must reference readable `community` discussion evidence whose URL is the exact original X status URL. Keep the target out of this field for `standalone`; the observed discussion can still remain in `discussion.source_ids`.

## Sources and claims

Each source has an ID, real URL, publisher/author, kind (`primary`, `reporting`, `community`), `published_at`, `observed_at`, access level, a locator (section, timestamp or post ID), and a brief paraphrased evidence note. Do not embed full copyrighted articles or authentication data.

For an X reply/quote target, the `community` source is also the action anchor: preserve its exact status URL, author/publisher, post time when available, observation time, and a bounded paraphrase of what is actually being discussed. A profile URL, search snippet, or reconstructed post is not a valid target.

Access is `full`, `partial`, `snippet`, `unavailable`, or `supplied`. `partial` is usable only for the specific visible statement. `supplied` means the source text was provided by the user/fixture, not that a live page was visited. Every unavailable/snippet-only central claim remains unverified.

Each claim has an ID, text, kind (`fact`, `attributed`, `inference`, `unverified`), source IDs, `publishable`, and `caveat`. A source announcing a benchmark supports an attributed result, not the claim that it independently achieves that performance. Inference must be explicitly presented as inference even when it is usable in a post.

`publishable: true` needs a source actually read/supplied and enough context for that exact statement. `unverified` cannot be publishable. A ready topic needs at least one publishable fact or attributed claim; an unsupported editorial guess is not enough. List conditions that cannot be dropped, such as preview status, geographic restrictions or benchmark setup, in `caveats` as well as on the relevant claim.

Optional `media` entries contain URL, credit, rights (`own`, `licensed`, `permission`, `unknown`) and usage (`link_only`, `attach_allowed`). Unknown rights force link-only use. Optional discussion metrics contain a source ID, metric name, nonnegative measured value, observation time and scope; no inferred or invented numbers.

## Example and verification

The repository's `evals/fixtures/ai-tech-topic-pack.json` is a synthetic interoperability example, not a dependency required by an installed Skill. A live pack must never inherit its products, dates or measurements.

Run `uv run <skill-directory>/scripts/validate_pack.py <pack.json>` for structural, reference and state checks. It reads only the supplied local JSON and local schema, performs no web request, and does not save or post anything. Exit `0` means those checks passed; `1` means invalid data; `2` means a read/usage/dependency error. An offline validation cannot prove source authenticity, actual tool access, fresh coverage, media rights or a sound editorial choice.

## Safe periodic handoff

Prefer passing the object directly in one sequential task: acquire, validate, then edit. To persist it, the caller must authorize a workspace output directory. Use a run-specific name, preserve prior completed packs, and only advertise a final pack after acquisition and validation finish. Never overwrite the last usable pack with a partial write.

If a separate writer reads a file, pass the exact run ID/path and validate its period/status. Do not blindly use an arbitrary `latest.json`. A partial or blocked run does not advance a successful-scan checkpoint, even if its verified subset produces drafts. State may track seen, drafted and published event keys separately; neither a topic pack nor a draft is a publication receipt.
