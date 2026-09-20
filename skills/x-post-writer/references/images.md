# Accompanying images

Images are optional editorial choices for posts, replies, quotes and threads. Follow an explicit image or text-only request. Otherwise ask what the image adds: visible evidence, a revealing detail, a feeling, a contrast or a joke that makes this particular contribution better. If it merely repeats the copy or fills a slot, deliver the text alone. No permission or missing-image warning is needed for that choice. An existing parent-post visual may already do the work; do not duplicate it automatically. Never generate filler for a skipped topic.

## Select or create

Once an image is useful or requested, choose the form that expresses the author's point. A personal X image can be an expressive scene, visual joke, telling contrast or real detail. It does not need to explain the topic like a lesson. Use diagrams, annotated workflows or news cards when that is the actual content, not merely because the topic is technical. Choose a legible composition for a phone; square and landscape are reasonable creative defaults, not claims about platform requirements.

1. **An appropriate image is supplied for this use:** inspect it and reuse it if its content, quality and provenance fit the post. Do not replace a good user-supplied asset merely to invoke generation.
2. **A suitable source image is available for reuse:** inspect it, retain credit and use the host's supported media delivery. An article's public accessibility, a thumbnail, or `usage: link_only` does not establish that its image can be attached. If reuse is unknown, keep the source link for attribution and create an original visual instead. Do not download remote media to bypass host display restrictions.
3. **No suitable reusable image is available:** discover and use the running Agent's image capability. Load the available `$imagegen` Skill through the host's Skill mechanism, or use a documented native equivalent. Prefer the built-in generator when available; do not require another API key, invent a tool call, install a plugin or switch to a paid API by default. Creating the selected accompanying image is already part of this brief and needs no additional per-image confirmation.

For generation, give a concrete brief: the final post and its point; what the viewer should notice or feel; the subject, action and composition that convey it; relevant style and factual boundaries; and the exact text allowed in the picture, or explicitly no text. Describing the topic as "an illustration of handoff" is not enough art direction. Decide the visual idea before the call instead of asking the generator to invent a headline and caption.

Words inside the picture are part of the content: a character's line, a punchline, an essential label or an accurate chart annotation. Do not automatically print production notes such as “交接示意”, “概念图”, “原创插画” or “仅供参考”, or add an explanatory title/footer merely to label what the picture depicts. Keep provenance, alt text and the creative rationale outside the artwork. A visibly drawn metaphor needs no disclaimer stamped across it. This is not a ban on meaningful text or required credit: when a realistic mockup could otherwise be mistaken for evidence, preserve necessary disclosure or choose an unmistakably illustrative form.

Default to one final image, not an unsolicited set of variants. If a precise data chart is the useful image, render verified data with an appropriate plotting tool; for an illustration or edited bitmap, use the actual image-generation/editing capability rather than a placeholder diagram. Follow the active image tool's workflow, including inspecting a local edit target first.

Let the content determine the visual form: a visual joke, a single telling contrast, an annotated real asset or a small explanation may each fit. Do not repeatedly default to a beige desk, plants, trays and a large slogan merely because the preceding image used them. Preserve a supplied visual identity, but do not let a decorative house style replace the actual point. Complete the text's editorial check before spending an image call on a weak angle.

## Default illustration style

For an original opinion illustration without a different user-specified style, use **正常彩色的抽象简笔画，带戏剧感和荒诞幽默**. Here “abstract” means simplified, expressive drawing; the scene must still communicate something recognizable.

Inspect the bundled [style reference](../assets/illustration-style-reference.png) before generating. This image was generated during this Skill's style development; it is a drawing reference, not factual evidence or a composition template. When the native generator accepts reference images, supply it explicitly as a **style-only reference** and ask for a new scene for the current post. Use the installed Skill's relative asset path, never a developer's temporary or generated-image directory. If image references are unsupported, use the concrete style brief below and do not claim visual conditioning occurred.

- **Drawing:** loose, clear hand-drawn contours. People normally have large round heads, dot/curve facial features and thin line or narrow ribbon-like bodies and limbs, as in the reference. Keep that construction in the tool prompt; merely saying “simplified person” often produces an ordinary fully drawn cartoon with hair, clothes and anatomical detail. Objects also use a few telling shapes. Faces, gestures and relationships remain readable; a few meaningless curves or an almost empty canvas do not satisfy this style.
- **Color:** normal, coherent full color on characters, props and the relevant setting. Use simple flat fills and modest shadows. Do not default to monochrome with tiny color accents. A light background can fit a scene; a fixed palette or mandatory colored backdrop is unnecessary.
- **Drama:** let exaggerated expression, body language, surprising scale or an absurd situation carry the point. Enough happens in the picture to reward looking. Keep one clear visual idea instead of decorating a literal explanation.
- **Scene detail:** richness comes from the interaction and a few relevant props. Use broad flat color areas and a few setting lines; do not fill a room with incidental furniture, plants, rugs or intricate machinery. Keep only enough object detail to understand the joke.
- **Restraint:** retain the doodle-like construction even when fully colored. Avoid realistic rendering, 3D clay, elaborate anatomy and polished corporate infographics unless requested. Meaningful dialogue or labels may help, but there is no compulsory caption; production notes stay outside the artwork.

Carry these directions into the actual generation prompt, alongside the new visual idea and exact allowed text. A reusable style clause is:

> 正常彩色的抽象简笔画：人物采用大圆头、简化五官和细长线条身体、四肢，道具用少量关键形状概括；保留随手画的线条感。人物、道具和环境正常上色，以平涂为主。用夸张表情、动作或比例反差表现这次内容的戏剧性和荒诞感，丰富的是情境与互动，背景用大色块和少量线条，避免画成细节繁密的普通卡通插画。参考图只用于画法与用色，另构本帖的场景。图内文字仅使用本次明确指定的内容。

Choose the situation from the current post before applying the style. “Theatrical” describes tension and performance; it does not require curtains or a literal stage. Do not keep reusing the reference's bug, handoff, paper tower, two-person layout or colors. Useful screenshots, verified charts and explicit alternative art directions keep their own form; this illustration default never makes imagery mandatory.

## Keep the visual truthful

Distinguish an original illustration from source evidence. Do not generate a fake product screenshot, benchmark, quotation, conversation, analytics panel or photo of an event and present it as something that actually happened. A conceptual illustration or clearly labeled mockup may explain the idea, but cannot establish the factual claim.

For a chart or factual graphic, preserve dates, units, denominators, sample scope, attribution and uncertainty that affect its meaning. Different quantities, such as perceived speedup and measured time increase, must not silently become one comparable metric. A generated image is not a new factual source. If the image cannot express the caveat legibly, simplify the visual or use a conceptual illustration; do not strengthen the claim to suit the picture.

Inspect the actual result beside the final copy: does it add the intended detail, feeling or joke, or just explain the caption? For the default illustration style, check that it is recognizably drawn in simple lines, normally colored, expressive and specific to this post rather than a replay of the reference scene. Check every visible word, including unrequested headings and footers, as well as factual consistency, readable gestures, disconnected or extra limbs, misleading logos/UI and cropping. Correct a visible defect with a focused edit. If an optional image adds nothing, omit it rather than forcing the asset into delivery; do not relabel a technical failure as an editorial success. Stop on an access/permission denial or a persistent capability failure. If the image leads to a text edit, run the text's final evidence and length checks again.

## Deliver the asset, not just a plan

Display the real image through the host's native image output or supported embed, next to the copy-ready text. Supply a brief alt text and provenance: supplied image, credited source image, original generated illustration or rendered chart. Keep these notes outside the post text. Preserve any necessary source credit in the intended publishing package.

Use only a local path, image URL or artifact handle actually returned by a tool or supplied by the caller. On hosts that support local file embeds, use an absolute path. A prompt, unresolved path, article link or automatic link-preview card is not a completed image. Respect the image tool's native output storage; copy a selected file only to a caller-authorized destination and do not overwrite existing assets. Do not claim durable availability or an X upload from an inline preview alone.

If requested or selected image work remains unfinished, deliver usable text with `media.status: blocked` and the concrete gap. A recovery prompt is not an image. If an image adds no editorial value, use `media.status: not_needed`; if the caller explicitly requests text only, use `media.status: waived`. Neither intentional text-only outcome is incomplete. A missing tool alone is not an editorial reason, and an explicit image request cannot be silently dropped.

## Structured handoff

Keep `opc-x-drafts/v1` text fields unchanged. Add a `media` object to each draft:

- `status`: `ready` after at least one suitable image has actually been produced or supplied, inspected and delivered; `not_needed` when no additional image serves the content; `blocked` if requested or selected image work is unfinished; `waived` for an explicit text-only instruction.
- `images`: an array of actual assets. Each entry has `post_index` (one-based), `origin` (`supplied`, `source`, `generated` or `rendered`), `asset_ref` (an actual host-returned reference or accessible path/URL), `alt_text` and `credit`. Include `source_url` when the image or its factual content has one. Never serialize image bytes into the post body.
- `reason`: a short editorial reason for `not_needed`, or the concrete blocker or explicit text-only instruction when applicable.

Use an empty `images` array for `not_needed`, `blocked` or `waived`. If the host can display an image but exposes no reusable reference, state that handoff limitation rather than fabricating `asset_ref`; the display alone does not complete the caller's structured asset handoff. The existing length helper validates only the text and ignores this additional metadata. It does not inspect images, validate rights or confirm upload compatibility.

Keep editorial selection separate from media work: an ongoing run can return `decision: draft` with usable copy and blocked media, but the overall copy-and-image package remains incomplete and its `gaps` must say so. A blocked image does not change an upstream source scan into an outage. A `skip` or text-evidence `blocked` result with no draft needs no media object. Publishing and scheduling remain the caller's responsibility.
