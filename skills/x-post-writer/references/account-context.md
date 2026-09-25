# Account context and successive drafts

Use this reference for ongoing-account work, cold start, or supplied account/history/feedback records. The caller supplies context and stores any results it wants to reuse. This Skill makes one editorial decision per invocation; it does not provide a scheduler, database or publishing client.

## Accept useful context without requiring a form

Plain text or structured records are both acceptable. Use the parts supplied:

| Input | What changes the decision |
| --- | --- |
| Account brief | Intended readers, recurring themes, language, boundaries, current objective and the owner's stated priorities, preferences or convictions |
| Approved writing samples and corrections | Desired vocabulary, rhythm, openings and tone; prefer the user's approved final edits over previous model drafts |
| Material | Source text/URLs, dates, claims, limitations and whether it is public or explicitly approved for public use |
| Content history | Stable IDs where available, exact text, topic/angle, draft/queued/published/rejected state, rejection reason and confirmed public URLs |
| Reader questions | Exact question and necessary parent context; preserve source IDs and public/private status |
| Feedback | Observation time, time since publication, available metrics, substantive responses and any attribution limits |

Current instructions take precedence over the saved brief, which takes precedence over defaults. Prefer approved user edits over rejected model drafts. Distinguish the owner's supplied experience and convictions, their preferred expression, and third-party facts. Preserve relevant user-supplied positions; a creator's opinions and biography do not become the user's. A proposed present judgment can be drafted from the brief and evidence without claiming the user has acted on it. An explicit correction takes precedence over a conflicting sample; one edited sentence does not establish a permanent universal preference.

Use only caller-supplied or explicitly authorized records. Internal notes or private messages can suggest a topic, but access alone does not authorize publishing their contents or identifying their authors. Use public evidence for the answer, anonymize only when that use is authorized, or identify the missing permission/material. Never mine unrelated local projects to make a personal story.

When context is missing, still complete an ordinary draft from the account direction. Autonomous opinions, authorized first-person fiction and evergreen commentary do not require an owner diary, prior experiment, supplied stance or news link. A lack of owner biography is not a blocker. State a material limit such as "post history not supplied; cross-run duplication not checked" outside the copy. Follow the account's creative permission in [editorial.md](editorial.md#创作与事实任务); invented narrative events must not become factual owner biography or published history. Do not assume zero prior posts or ask a long onboarding questionnaire. If a brief-dependent choice is essential, ask one focused question or return the specific gap to an unattended caller.

## Choose what this account should say next

For cold start, use a stable editorial direction: which readers should recognize the account, and what recurring questions will it help them think through? Use the supplied positioning; if none exists, make a provisional choice from the current brief without inventing a biography or claiming a permanent strategy. A sequence of unrelated hot names gives readers little reason to return. Consistency means returning to useful questions with new substance, not posting the same judgment repeatedly.

Compare the usable thoughts and material against the audience and what the account has already covered. Prioritize a sharp judgment, informative fact or worthwhile discovery under [the editorial selection criteria](editorial.md#内容从哪里来); the forms below are ways to carry that contribution, not substitutes for it. Verify external factual premises when present. It need not start from a news item. High engagement alone does not establish fit; a popular consumer story may be irrelevant to a specialist account. An explicit request to rewrite one source should be honored without silently replacing it.

Unless the user specifies the action, choose among a new post, reply and quote by where the contribution is most useful. Content history includes previous replies and their targets, not just the standalone feed. Do not treat every scheduled invocation as a new-post slot or fabricate a rotation between formats. A useful reply can satisfy the run on its own.

Consider the following without fixed quotas or a mandatory rotation:

- A supplied position, observation or experience with a specific reason or detail worth sharing.
- A topical idea, prediction or genuine question, with assumptions distinguished from established capabilities.
- A timely development with a practical consequence for these readers.
- A sourced explanation or case answering a recurring question, even if it is not news.
- A defensible contrarian position that challenges a specific claim or default practice with evidence; use [editorial.md](editorial.md#contrarian-angles), and do not fabricate either public consensus or the user's convictions.
- A follow-up that adds a method, result, correction, limitation or answer missing from an earlier post.
- A reply or quote that contributes to an exact inspected or supplied X post.
- An introduction grounded in user-approved facts, when requested or clearly useful for a new account with no introduction yet.

Cold start does not require a founder diary, a personal experiment, or replying to strangers. Public research and attributed cases can support a consistent account. Do not imitate a successful creator's identity or convert their self-reported outcome into a growth promise.

When real experience is available, connect useful follow-ups to the questions it prompts rather than continually switching topics. When it is not, a recurring point of view, well-chosen explanation or contribution to relevant discussions can still establish an account. Do not demand private business data, an impressive origin story or a successful product as an admission ticket. Only propose an introduction/pinned post when the needed account facts are supplied and that action fits the request.

The 48-hour news window belongs to fresh discovery. For an ongoing brief that allows explainers or cases, older evidence may remain useful if its date and scope are preserved and volatile claims are checked. If the user asks exclusively for current news, do not fill an empty scan with evergreen content. A new reader question may justify a new answer; it does not make the underlying event newly released.

## Continue a topic without repeating it

Compare meaning, not just wording or URLs. Match the event/case, central claim, intended reader and takeaway against published and queued material. A translation, new headline, new source URL or Humanizer rewrite is not a new contribution.

Before drafting a follow-up, identify the earlier content and the actual addition. It should answer a different concrete question or incorporate new evidence. Make it understandable on its own; link the earlier post only when the caller provides or verifies a published URL. A draft ID is not a public link. Never promise an unrequested next installment.

Queued drafts reserve their angle. Reuse or revise the existing draft if explicitly asked; otherwise avoid producing another queue item with the same payoff. Rejected drafts stay rejected unless their reason has been addressed or the caller requests reconsideration. An intentional rewrite is allowed, but label it as a replacement/alternative, not a fresh recommendation to publish both.

For replies, check both the parent post and prior interactions supplied by the caller. If the account already answered the same question and no new context changes the answer, skip. When there is a genuine follow-up question, answer that question without repeating the original comment or forcing a promotional link. A private question can support an authorized standalone answer, but is not a public X reply target.

## Learn from feedback without inventing a formula

Use recurring, specific reader questions as evidence of what those readers want explained. Feedback can justify expanding a topic, clarifying a confusing passage or trying a different opening. Preserve the account's chosen audience and objective unless the user changes them.

Compare metrics only when their definitions and observation windows are compatible. Separate original posts from replies when their exposure differs. A year-old cumulative view count and a two-hour count cannot establish which topic performs better. Missing metrics are unknown, not zero; account-level follower changes do not establish per-post attribution.

Treat a small sample as a hypothesis for the next draft, not proof of an algorithm rule. Do not prescribe numerical scores, ideal times, fixed posting ratios or guaranteed growth. Recommend only the relevant small adjustment; no unsolicited analytics report or calendar.

## Return a result the caller can use

In chat, deliver the final draft(s), or a concise reason why none should be produced. For an ongoing run, keep these facts available outside the copy:

- `decision`: `draft` if there is usable copy, `skip` if the scoped material was assessed and nothing merits another draft, or `blocked` if required evidence/access is missing and no usable draft remains.
- `reason`: a short explanation of audience value, new contribution, duplication, poor fit or missing evidence.
- References to the supplied material, earlier content or reader question used. Preserve IDs; do not invent public URLs.
- Material gaps, including incomplete history or unavailable length checking. A usable subset can be `draft` with gaps; it does not change an upstream `partial` into `complete`.

When structured output is requested, return an object with `decision`, `reason`, `draft_batch`, `context_refs` and `gaps`. `draft_batch` is the existing `opc-x-drafts/v1` envelope for a draft result, and `null` for skip/blocked. `context_refs` and `gaps` are arrays; use empty arrays when appropriate. Pass only the non-null `draft_batch` to the length helper. That helper checks text formatting, not the surrounding editorial decision. Preserve a supplied run ID or create a run-local ID; never fabricate an upstream scout run.

Include each structured draft's `media` status and any actual image references as described in [images.md](images.md). Use `not_needed` when text carries the contribution without an additional image, or `waived` for an explicit text-only instruction; neither is a gap. A usable text draft may keep `decision: draft` while requested or selected image work is `blocked`; list that unresolved work without claiming the requested package complete. Image generation, source access, text length and publication are separate results.

For original opinions, authorized narrative fiction or supplied material with no public source URL, use `source_urls: []` in the draft envelope and retain relevant supplied record IDs/provenance in `context_refs`. Do not invent a link, topic pack or acquisition run. No-public-URL material still requires permission for public use, and external factual premises still need support.

Return a proposed preference change only when an explicit correction or consistent evidence warrants it. The caller decides what to retain. Only an actual publication receipt supplied by the caller can update publication history. Scheduling, sending, retries, account permissions and durable state are outside this reference's responsibility.
