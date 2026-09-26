# Behavioral evals

These cases test whether a Skill produces a measurable improvement over the same model without the Skill. Structural validation and a good standalone score are not enough.

## Case schema

Each line in `cases.jsonl` contains:

- `id` and target `skill`.
- `prompt` and an optional synthetic `fixture`.
- `tool_policy`, such as `fixture_only` or `no_tools`.
- `must_pass`: case-specific behaviors; any miss fails the case.
- `critical_failures`: any occurrence fails the case.
- `applicable_dimensions`: rubric dimensions that should be scored; all others are `N/A`.
- Optional `pair`: a counterfactual case that should apply the same rule to changed labels or facts.
- Optional `execution_budget`: a case-level maximum such as `max_external_page_or_data_views`. Count each distinct query inside a batch as one SERP observation, then count opened source pages, provider reports, product workflows, and material records separately; navigation and local Skill/reference reads do not consume a view.

`routing.jsonl` is separate. It tests metadata-only selection from the eight frontmatter descriptions and includes prompts that should select no Skill. For a combined discovery-to-X request, select `x-post-writer` as the entrypoint; its permitted internal use of the scout is not a routing collision.

## Run protocol

### X writer maintenance acceptance

After every change to `x-post-writer` or its supporting workflow, proactively run a fresh independent subagent trial before reporting the revision ready. Do not wait for the user to request the test. Start without inherited conversation history; provide only the realistic task, Skill/dependency entrypoints, necessary raw inputs and tool/output permissions. Do not provide the diagnosis, proposed fix, previous drafts, desired answer or evaluation criteria to the writer. An open-action test must not prescribe a new post or a reply.

Preserve and show the first completed output, including the media decision and any actual selected or requested imagery. A justified text-only result is complete. Do not coach the running writer or silently replace its result with a parent rewrite. Report defects separately; after any further Skill change, use another fresh agent. If execution is blocked, name the concrete blocker instead of claiming a completed behavioral test. This maintenance trial complements the paired evaluations below; a parser pass alone is not writing-quality acceptance.

Match trial permissions to the real task. Read-only inspection of an existing signed-in Chrome X session is allowed when authorized; prohibit posting, replying, liking, following and other writes explicitly rather than ambiguously banning all “account use”. Do not count a test that artificially removed the available reading surface as validation of live reply selection. Use a separate clean reader to assess the finished text without the author's reasoning or revision history, and record its concrete criticisms separately from the raw output.

For conversational Chinese, inspect the exact wording rather than treating a reader model's “natural, 4/4” as acceptance. Keep user-rejected runs rejected even if a model approved them. Report what remains awkward without rewriting the preserved writer output or declaring it publishable solely from model agreement.

The writer's built-in single language-editing delegation is part of its original run, before the first completed output. Humanizer belongs inside that edit, not in a separate preceding rewrite. Keep the editor's task and result in the trace, including the selected contextual voice examples and any relevant parent text; it must receive no evaluation feedback or inherited conversation. The external evaluator must not become that editor, coach it, or request another pass. If delegation is unavailable, record the local fallback without claiming an isolated editor was tested.

When introducing voice examples and changing the editing workflow together, compare the previous Skill, previous Skill plus examples only, and the revised workflow on the same held-out tasks, model and permissions. For a narrower follow-up change, compare the previous and revised Skill on fresh tasks that exercise the change and its boundaries. Do not give the writing agents variant labels, expected wording or the scoring rubric. Blind and vary candidate order for the reader. Allow ties and “none”; compare naturalness, substance and fit to the actual conversation separately, with exact wording as evidence. Shorter is not automatically better. Check first-person ownership, factual scope and sample leakage before accepting a preference. Treat a small comparison as preliminary, not proof of stable quality or user acceptance. Supplied user voice and English/explicit-instruction tasks should still override the Chinese sample defaults.

For each behavior case:

1. Start two fresh sessions with the same model, reasoning setting, tool permissions, and prompt.
2. Run one without the target Skill and one with the target Skill. Do not disclose which output is which to the reviewer.
3. For fixture cases, provide only the named fixture and prohibit external lookup. State clearly that the fixture is synthetic.
   Do not coach the running writer, send reviewer corrections back, or replace its first completed output with a guided revision. Preserve the original output and record defects separately. If the Skill changes afterward, start a fresh run and identify the new version. The writer's own editing inside its original run remains part of the behavior under test.
4. Save the full transcript, final answer, tool calls, visited URLs, write actions, and errors. Final text alone cannot prove tool-policy compliance.
5. Check `tool_policy`, every `must_pass`, and every `critical_failures` item before assigning rubric scores.
6. When `execution_budget` exists, count the full trace—not merely tool-call containers—and fail the case if collection exceeds it, continues after the declared boundary, or reports opened/tested resources absent from the trace.
7. For idea-finding cases, count only source-backed candidates that pass the final admission gate—not rejected ideas, themes, evidence tasks, or decisive-evidence-unknown leads—when checking the requested quota. Verify that claimed gaps survived a semantic current-alternative audit, every material reframe received a fresh audit, failures triggered new source-backed discovery, and a genuinely blocked partial study was labeled incomplete rather than padded. For broad product cases, also verify source-lane triangulation, market legibility, first-user reachability, and separation of product value from launch or social amplification.
8. Score only `applicable_dimensions`; use `N/A` for the others and do not award points for irrelevant prose.
9. Run counterfactual pairs together. The rule should survive changed candidate names, ordering, or attractive-but-irrelevant numbers.
10. Repeat injection, authorization, data-conflation, and other high-risk cases three times. Record model, date, tools, run number, and reviewer disagreement.

Store temporary outputs under `evals/runs/`; that directory is ignored. Do not commit credentials, private analytics, licensed exports, or tool traces containing private data.

## Editorial deterministic checks

From the repository root, with local dependency installation permitted:

```bash
uv run evals/test_editorial.py
npm ci --prefix skills/x-post-writer/scripts --ignore-scripts --no-audit --no-fund
node --test evals/x-post-check.test.mjs
uv run skills/ai-tech-topic-scout/scripts/validate_pack.py evals/fixtures/ai-tech-topic-pack.json
node skills/x-post-writer/scripts/check-post.mjs --file evals/fixtures/x-drafts.json
```

The Python runner declares its dependency through inline `uv` metadata. Runtime helpers only read their inputs; initial dependency setup may download packages. Use an authorized temporary cache if the default cache is not writable; do not change ownership of a user's cache as a workaround.

For installation-runtime checks, first inspect a fresh isolated install from a clean source tree and confirm it contains no `node_modules`. Then install its locked dependencies with `npm ci --ignore-scripts --no-audit --no-fund` and run the helpers from that installed location. Do not count dependencies silently copied from a development checkout as an isolated setup; the observed Skills CLI `1.5.26` local-copy path does not honor `.gitignore` for this purpose. See the distribution checks in `docs/release-checklist.md`.

`editorial-source-records.md` is raw synthetic evidence for behavioral evaluation. `ai-tech-topic-pack.json` and `x-drafts.json` are an interoperability example, not blind evaluator answers or actual news. The deterministic tests cover format/schema boundaries, state, references, deduplication, timestamps, media rights flags, and weighted text length. They do not execute a language model, prove source truth, measure routing quality, or replace the paired release protocol above. Do not give the model the sample pack/drafts when evaluating raw discovery quality.

`editorial-audience-records.md` adds raw synthetic sources for audience-fit and event-versus-release-date cases. Its counterfactuals vary record order and audience so the evaluator must not learn a brand/category blacklist. The completion cases distinguish small completed scopes from unfinished required lanes, optional missing metrics, and partial runs with no ready topic. Writer cases also cover explicitly requested source rewrites, supplied/fixture provenance versus completion, and final-text/check-result consistency.

For exact-length claims, compare the complete delivered copy with the successful helper input, including ordinary URLs, line breaks and numbering. Preserve that input and result in the authorized evaluation trace; a final assertion of a number, or a parser result with no input, is insufficient evidence. A blocked replay stays unverified and must not be routed around. Catalog integrity tests check that these cases are wired correctly; they do not execute them or prove a behavioral improvement.

Editorial cases use the shared `evidence_integrity` / `metric_scope` dimensions plus `editorial_workflow` and `editorial_delivery`. Product quotas, demand validation, functional-alternative audits, and build recommendations are not editorial requirements. A bounded successful scan may return zero items; a source outage must instead be disclosed as blocked or partial. Drafting never counts as publishing.

`editorial-account-records.md` supplies fictional account preferences, history, sources, reader questions and feedback for continuity cases. Test a useful follow-up, semantic duplicates, optional-history gaps and unequal metric windows separately. Account context must not turn creative story details into factual owner biography, make cold start require replying, or expand the Skill into scheduling/publishing. Structured ongoing-run results wrap the existing draft batch; only that batch is input to the length helper. Added catalog cases are not evidence of a completed paired behavioral evaluation.

`editorial-voice-records.md` tests peer commentary and an explicit how-to brief using the same fictional product. Judge whether the wording fits each request and preserves the evidence; do not grade by banning individual phrases or claiming an AI-detector score. Commentary should carry a specific judgment without a generic lecture, while requested instructions should remain actionable. A better-looking single sample is not proof of a stable improvement over baseline.

`editorial-owner-records.md` holds one source constant while two cases change the owner's priorities. Judge whether the resulting choices actually follow those priorities, not whether “I” appears or a favorite phrase is repeated. Additional cases distinguish a supplied first-person experience from a proposed preference, and preserve explicitly requested neutral reporting. These text-only cases isolate voice; they do not validate the image workflow. Preserve uncoached outputs, including failures.

Image cases distinguish an actual delivered asset from a prompt, an article link or invented completion. `fixture_with_native_image` permits only supplied evidence, local Skill/reference and image reads, the host's native image generator, the existing text checker and authorized temporary artifacts; it does not permit browsing, external API setup or publication. Inspect the returned image and actual tool trace, including whether the brief states the visual idea and intended text and whether the artwork adds content rather than production captions. Open-media cases may choose `not_needed` for an editorial reason; explicit text-only cases use `waived`. No-tools cases that explicitly request imagery should retain usable copy and disclose blocked media. Existing text checks do not establish image readiness, and a visual or length-check success does not prove X upload compatibility.

## Release gate

`editorial-angle-records.md` holds fresh synthetic briefs for open opinion selection, choosing how to join a conversation, a factual discovery and an explicit how-to control. Compare old and revised Skills on identical inputs in clean contexts; keep the first completed copies and exact length inputs. Judge substantive contribution and natural language separately, including whether a reply merely repeats visible comments or an opinion imports a training example's stance. Fixture replies test supplied-conversation fit, not live X discovery. Do not claim a release-wide pass or likely engagement from these bounded comparisons.

- Every Skill and the Plugin pass their structural validators.
- The Skills CLI discovers exactly eight intended Skills; selective, paired, and wildcard installation preserve Skill-local instructions, references, scripts, and lockfiles, without vendoring `node_modules`.
- Every `must_pass` behavior passes and no critical failure occurs in any run.
- Every applicable rubric dimension scores at least 3/4.
- Evidence integrity and metric/scope discipline score 4/4 whenever numeric evidence affects the decision.
- Each Skill wins at least two targeted cases over baseline by at least one relevant rubric point; the Skill-enabled answer has no overall regression.
- High-risk cases pass all three runs, including tool-trace inspection.
- Counterfactual pairs produce decisions based on evidence rather than candidate labels or order.
- Metadata-only routing selects the expected Skill—or no Skill—without a trigger collision.
- Budgeted cases stay within their declared workload, optional context never expands authority, feature parity is distinguished from market rejection, replayability fields support decisive evidence, and numerical stop thresholds state a defensible basis.
- Idea-finding cases choose the correct primary discovery mode and data spine, trace every candidate to an observed source record, apply the cheap gate and semantic current-alternative audit before expensive validation, rerun the audit after a material reframe, replenish rejected finalists from new evidence, stop ordinary discovery once the requested qualifying count passes or explicitly report a genuine blocker, identify whether provider/first-party or public-web data was used, and present products and plain-language actions before internal research mechanics.
- Broad product-opportunity cases use relevant current social, community, product or technical, and market or launch lanes; do not reward obscurity; treat competitors as evidence rather than a veto; and freshly audit any opportunity derived from a success path instead of copying the source product.

The cases remain a maintained benchmark, not proof that rankings, business outcomes, or follower growth are guaranteed. Record explicitly which deterministic, installation, live, and independent behavioral checks actually ran; unrun release gates remain unverified.

`editorial-occasion-records.md` tests a supplied conversation, a personal story, an explicitly small preference and an empty brief with no research access. The open-selection gate must not reject explicit tasks or turn every contribution into a thesis. Pair these controls with held-out live material read by the authorized operator: preserve source scope, visible replies, exact first completions and separate reader criticism. A source pack tests writing from observed material, not the writer's ability to discover live discussions. Do not add held-out source-specific answers to the Skill after inspecting a failure.

`editorial-autonomous-records.md` tests open writing with no owner diary or source pack, contribution to a supplied conversation, and explicitly fictional scene writing. Missing biography is not a blocking fact gap. Keep contemporary factual claims sourced and exclusive unreadable-target tasks blocked. Compare the old and revised open-brief behavior with identical inputs; preserve every first completion and judge naturalness and substance separately.

`editorial-creative-records.md` contrasts authorized unlabelled first-person fiction, a requested opinion without a story, and a factual-only rewrite. Evaluate the intended mode before judging invented narrative details; creative permission does not require choosing a story or loosen actual evidence/tool records. Earlier source-fidelity fixtures are material-bound rewrites, not requests to add fictional plot. Keep first completions intact and give the independent reader the exact task, including creative authorization.

`editorial-ending-records.md` contrasts a repeated benefit with a material scope condition and a narrative turn. Judge what the ending contributes, not its position or length. Preserve first completions and compare previous and revised Skills on the same briefs in separate fresh contexts; do not give writers the expected ending or review feedback. These bounded editing cases do not establish open-topic quality or likely engagement.

`editorial-mechanism-records.md` separates a scene-to-solution claim from a capability-to-use inference. Judge the actual relation and the limits material to the chosen claim, not whether the model repeats a preferred disclaimer. Pair these supplied-material controls with fresh open-topic generation and independent source comparisons; preserving fixture facts alone does not establish worthwhile autonomous topics.
