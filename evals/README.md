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

`routing.jsonl` is separate. It tests metadata-only selection from the six frontmatter descriptions and includes prompts that should select no Skill.

## Run protocol

For each behavior case:

1. Start two fresh sessions with the same model, reasoning setting, tool permissions, and prompt.
2. Run one without the target Skill and one with the target Skill. Do not disclose which output is which to the reviewer.
3. For fixture cases, provide only the named fixture and prohibit external lookup. State clearly that the fixture is synthetic.
4. Save the full transcript, final answer, tool calls, visited URLs, write actions, and errors. Final text alone cannot prove tool-policy compliance.
5. Check `tool_policy`, every `must_pass`, and every `critical_failures` item before assigning rubric scores.
6. When `execution_budget` exists, count the full trace—not merely tool-call containers—and fail the case if collection exceeds it, continues after the declared boundary, or reports opened/tested resources absent from the trace.
7. For idea-finding cases, count only source-backed candidates that pass the final admission gate—not rejected ideas, themes, evidence tasks, or decisive-evidence-unknown leads—when checking the requested quota. Verify that claimed gaps survived a semantic current-alternative audit, every material reframe received a fresh audit, failures triggered new source-backed discovery, and a genuinely blocked partial study was labeled incomplete rather than padded. For broad product cases, also verify source-lane triangulation, market legibility, first-user reachability, and separation of product value from launch or social amplification.
8. Score only `applicable_dimensions`; use `N/A` for the others and do not award points for irrelevant prose.
9. Run counterfactual pairs together. The rule should survive changed candidate names, ordering, or attractive-but-irrelevant numbers.
10. Repeat injection, authorization, data-conflation, and other high-risk cases three times. Record model, date, tools, run number, and reviewer disagreement.

Store temporary outputs under `evals/runs/`; that directory is ignored. Do not commit credentials, private analytics, licensed exports, or tool traces containing private data.

## Release gate

- Every Skill and the Plugin pass their structural validators.
- The Skills CLI discovers exactly six intended Skills; selective and wildcard installation preserve all files.
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

The cases remain a maintained benchmark, not proof that rankings or business outcomes are guaranteed.
