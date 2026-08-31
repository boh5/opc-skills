# Synthetic product-opportunity records

Everything in this file is fictional and exists only for fixture-based evaluation. No URL, company, metric, product, or permission is real. The observation cutoff is 2026-08-25.

## Candidate Harbor — generic AI intake extraction

### H1 — community conversation

- Source lane: fictional hospital-operations forum.
- Observed 2026-08-12 through 2026-08-20 by reading six supplied public threads.
- Supported claim: intake coordinators describe repeated work assembling approval history and evidence for procurement review.
- Does not support: representative frequency, budget, willingness to pay, or permission to access patient data.
- Limitation: self-selected forum sample; thread authors and hospitals are not independently verified.

### H2 — launch post

- Source lane: fictional X launch post, observed 2026-08-18 in a normal public page view.
- Claimed product: Harbor extracts fields from uploaded forms automatically.
- Visible engagement: 4,200 likes.
- Supported claim: the demo received attention and automatic extraction is understandable.
- Does not support: customers, active use, retention, revenue, hospital suitability, or reproducibility.
- Limitation: one launch event and a dynamic engagement count.

### H3 — current primary alternative

- Source lane: supplied fictional FormPilot Enterprise documentation, version dated 2026-08-21.
- Observed by reading the provided documentation snapshot.
- Current claimed capabilities: automatic form extraction, SSO, approval history, configurable audit export, and hospital procurement package.
- Supported claim: Harbor's extraction feature and the proposed hospital audit reframe both have current functional parity in this fixture.
- Limitation: documentation claims were not tested; product quality, price, and customer adoption are unknown.

### Harbor status

- The original automatic-extraction edge fails on H3.
- Changing the buyer to hospitals and output to an audit package creates a new fingerprint, but H3 also invalidates that reframe inside this fixture.
- No other material segment, workflow, distribution, trust, data, service, speed, or economics edge is supplied.

## Candidate Relay — preflight and rollback receipts for agent changes

### R1 — Hacker News discussion

- Source lane: supplied fictional Hacker News thread, observed 2026-08-14 by reading the thread snapshot.
- Supported claim: agent-platform operators describe fear of approving configuration-changing actions because they cannot see the exact downstream diff or obtain a rollback receipt.
- Repetition: the supplied snapshot contains comments from seven distinct accounts describing the same approval job in different systems.
- Does not support: representative market size, willingness to pay, or enterprise procurement.
- Limitation: technical audience and self-selected discussion.

### R2 — GitHub issue cluster

- Source lane: supplied fictional OpenAgentHub issue export, covering 2026-07-01 through 2026-08-22.
- Extraction: grouped 14 open issues by the shared job “preview exact change, approve it, and prove rollback state.”
- Supported claim: the workflow recurs in one active open-source ecosystem and existing maintainers have not closed it as implemented.
- Does not support: usage outside OpenAgentHub, payment, or future roadmap.
- Limitation: issue reporters may overlap with the Hacker News audience; repository activity is not customer demand.

### R3 — current primary alternatives

- AgentFlow documentation snapshot, dated 2026-08-23: supports human approval and an action log, but the supplied page has no preflight state diff or rollback receipt.
- RunSure documentation snapshot, dated 2026-08-23: supports sandbox simulation and rollback, but the supplied page has no human approval workflow or OpenAgentHub integration.
- AuditDesk documentation snapshot, dated 2026-08-23: stores audit events after execution but does not simulate a change or perform rollback.
- Extraction: direct reading of supplied primary documentation snapshots, not snippets.
- Supported claim: no single checked fixture product combines preflight state diff, human approval, and rollback receipt for OpenAgentHub as of the cutoff.
- Limitation: absence is bounded to the supplied pages; unobserved products, private features, roadmap items, and product quality remain unknown.

### R4 — first-user and execution record

- Source lane: supplied fictional OpenAgentHub extension guide and marketplace policy, dated 2026-08-24.
- Supported claim: a third-party extension may use the documented dry-run, approval hook, and rollback APIs and can be listed in the ecosystem marketplace after review.
- First wedge: OpenAgentHub configuration changes only; no general computer-use agent support.
- First-user channel: maintainers and operators already browsing the OpenAgentHub marketplace and issue tracker.
- Execution limits: policy review, version compatibility, security review, and ongoing integration maintenance are required.
- Unknown: willingness to pay and the share of operators who need all three steps in one product.

### Relay status

- Functional fingerprint: OpenAgentHub operator approves an agent-proposed configuration change; input is proposed state; transformation is dry-run diff plus approval; output is executed change plus rollback receipt; adoption unit is an ecosystem extension.
- Surviving thesis in this fixture: one installed workflow combines three currently split jobs and has an ecosystem-native first-user channel.
- Cheapest falsification test: a working extension for one configuration type shown to qualified issue participants; measure whether they complete an approval and request a second supported change type.
- Stop-line basis: the fixture supplies no historical conversion baseline or experiment budget, so calibrate from the first qualified cohort rather than inventing a universal number.

## Tool Cedar success path

### C1 — product engine

- 2026-04-10: Cedar's fictional first release compared deployment manifests and generated a reversible patch for one deployment system.
- 2026-04-10 through 2026-05-01: supplied issue records show repeated requests for additional manifest types and reports that the reversible patch prevented manual recovery work.
- Supported claim: a narrow deployment-drift job and reversible output were understandable and repeated among supplied users.
- Unknown: active-user count, retention, customers, revenue, and outcome frequency outside the issue sample.

### C2 — amplification engine

- 2026-05-03: Cedar appeared in a fictional Hacker News launch thread.
- 2026-05-03 through 2026-05-05: the supplied repository snapshot shows stars increasing from 180 to 4,900.
- Supported claim: the attention event preceded a large star increase.
- Does not support: Hacker News caused durable adoption, stars became active users, or Cedar became a business.

### C3 — transfer boundary

- Replicable method: enter through one concrete deployment job, make the output reversible, demonstrate it where the technical audience already gathers, and use issues to expose adjacent workflow demand.
- Conditional factors: access to the deployment ecosystem, security credibility, and integration maintenance.
- Timing, founder audience, capital, proprietary data, and luck are not supplied.
- No adjacent opportunity is validated merely by this success path. Every derived idea needs its own source record, functional fingerprint, alternatives audit, execution check, and first-user path.
