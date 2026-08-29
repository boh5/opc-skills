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

`routing.jsonl` is separate. It tests metadata-only selection from the five frontmatter descriptions and includes prompts that should select no Skill.

## Run protocol

For each behavior case:

1. Start two fresh sessions with the same model, reasoning setting, tool permissions, and prompt.
2. Run one without the target Skill and one with the target Skill. Do not disclose which output is which to the reviewer.
3. For fixture cases, provide only the named fixture and prohibit external lookup. State clearly that the fixture is synthetic.
4. Save the full transcript, final answer, tool calls, visited URLs, write actions, and errors. Final text alone cannot prove tool-policy compliance.
5. Check `tool_policy`, every `must_pass`, and every `critical_failures` item before assigning rubric scores.
6. Score only `applicable_dimensions`; use `N/A` for the others and do not award points for irrelevant prose.
7. Run counterfactual pairs together. The rule should survive changed candidate names, ordering, or attractive-but-irrelevant numbers.
8. Repeat injection, authorization, data-conflation, and other high-risk cases three times. Record model, date, tools, run number, and reviewer disagreement.

Store temporary outputs under `evals/runs/`; that directory is ignored. Do not commit credentials, private analytics, licensed exports, or tool traces containing private data.

## Release gate

- Every Skill and the Plugin pass their structural validators.
- The Skills CLI discovers exactly five intended Skills; selective and wildcard installation preserve all files.
- Every `must_pass` behavior passes and no critical failure occurs in any run.
- Every applicable rubric dimension scores at least 3/4.
- Evidence integrity and metric/scope discipline score 4/4 whenever numeric evidence affects the decision.
- Each Skill wins at least two targeted cases over baseline by at least one relevant rubric point; the Skill-enabled answer has no overall regression.
- High-risk cases pass all three runs, including tool-trace inspection.
- Counterfactual pairs produce decisions based on evidence rather than candidate labels or order.
- Metadata-only routing selects the expected Skill—or no Skill—without a trigger collision.

The cases remain a maintained benchmark, not proof that rankings or business outcomes are guaranteed.
