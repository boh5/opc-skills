# Accompanying images

The default deliverable is copy plus at least one actual image per drafted topic. For a thread, one image on the first post is enough unless more images serve the content or the user asks for them. Replies and quote posts follow the same default. Follow an explicit text-only instruction; never generate filler for a skipped topic.

## Select or create

First decide what the image should help the reader see about the author's point: an observed result, a comparison, a workflow or a visual interpretation. It can carry the specific detail so the text can express the judgment; do not automatically turn every opinion into a news infographic. Prefer useful imagery over a generic robot, stock AI glow or a poster repeating the whole tweet. Choose a legible composition for a phone; square and landscape are reasonable creative defaults, not claims about platform requirements.

1. **An appropriate image is supplied for this use:** inspect it and reuse it if its content, quality and provenance fit the post. Do not replace a good user-supplied asset merely to invoke generation.
2. **A suitable source image is available for reuse:** inspect it, retain credit and use the host's supported media delivery. An article's public accessibility, a thumbnail, or `usage: link_only` does not establish that its image can be attached. If reuse is unknown, keep the source link for attribution and create an original visual instead. Do not download remote media to bypass host display restrictions.
3. **No suitable reusable image is available:** discover and use the running Agent's image capability. Load the available `$imagegen` Skill through the host's Skill mechanism, or use a documented native equivalent. Prefer the built-in generator when available; do not require another API key, invent a tool call, install a plugin or switch to a paid API by default. Creating the normal accompanying image is already part of this brief and needs no additional per-image confirmation.

For generated illustrations, give the tool the post's specific point, intended visual idea, composition, relevant supplied style, exact short labels if any, and factual constraints. Use little text and verify every displayed word or number. Default to one final image, not an unsolicited set of variants. If a precise data chart is the useful image, render the verified data with an appropriate plotting tool; if an illustration or edited bitmap is needed, use the actual image-generation/editing capability rather than a placeholder diagram. Follow the active image tool's workflow, including inspecting a local edit target first.

Let the content determine the visual form: a visual joke, a single telling contrast, an annotated real asset or a small explanation may each fit. Do not repeatedly default to a beige desk, plants, trays and a large slogan merely because the preceding image used them. Preserve a supplied visual identity, but do not let a decorative house style replace the actual point. Complete the text's editorial check before spending an image call on a weak angle.

## Keep the visual truthful

Distinguish an original illustration from source evidence. Do not generate a fake product screenshot, benchmark, quotation, conversation, analytics panel or photo of an event and present it as something that actually happened. A conceptual illustration or clearly labeled mockup may explain the idea, but cannot establish the factual claim.

For a chart or factual graphic, preserve dates, units, denominators, sample scope, attribution and uncertainty that affect its meaning. Different quantities, such as perceived speedup and measured time increase, must not silently become one comparable metric. A generated image is not a new factual source. If the image cannot express the caveat legibly, simplify the visual or use a conceptual illustration; do not strengthen the claim to suit the picture.

Inspect the actual result for factual consistency, readable text, misleading logos/UI, cropping and correspondence with the final copy. Prefer a focused correction when there is a visible defect. Stop on an access/permission denial or a persistent capability failure; do not loop or bypass the host. If the image leads to a text edit, run the text's final evidence and length checks again.

## Deliver the asset, not just a plan

Display the real image through the host's native image output or supported embed, next to the copy-ready text. Supply a brief alt text and provenance: supplied image, credited source image, original generated illustration or rendered chart. Keep these notes outside the post text. Preserve any necessary source credit in the intended publishing package.

Use only a local path, image URL or artifact handle actually returned by a tool or supplied by the caller. On hosts that support local file embeds, use an absolute path. A prompt, unresolved path, article link or automatic link-preview card is not a completed image. Respect the image tool's native output storage; copy a selected file only to a caller-authorized destination and do not overwrite existing assets. Do not claim durable availability or an X upload from an inline preview alone.

If generation is unavailable or fails and no reusable asset remains, deliver the usable text with `media.status: blocked` and the concrete gap. A generation prompt may be included to help recovery, but must not be described as an image. If the caller explicitly requests text only, use `media.status: waived` with that reason. Do not silently waive the default because an image seems inconvenient.

## Structured handoff

Keep `opc-x-drafts/v1` text fields unchanged. Add a `media` object to each draft:

- `status`: `ready` after at least one suitable image has actually been produced or supplied, inspected and delivered; `blocked` if required image work is unfinished; `waived` only for an explicit text-only instruction.
- `images`: an array of actual assets. Each entry has `post_index` (one-based), `origin` (`supplied`, `source`, `generated` or `rendered`), `asset_ref` (an actual host-returned reference or accessible path/URL), `alt_text` and `credit`. Include `source_url` when the image or its factual content has one. Never serialize image bytes into the post body.
- `reason`: a short blocker or explicit-waiver reason when applicable.

Use an empty `images` array when blocked or waived. If the host can display an image but exposes no reusable reference, state that handoff limitation rather than fabricating `asset_ref`; the display alone does not complete the caller's structured asset handoff. The existing length helper validates only the text and ignores this additional metadata. It does not inspect images, validate rights or confirm upload compatibility.

Keep editorial selection separate from media work: an ongoing run can return `decision: draft` with usable copy and blocked media, but the overall copy-and-image package remains incomplete and its `gaps` must say so. A blocked image does not change an upstream source scan into an outage. A `skip` or text-evidence `blocked` result with no draft needs no media object. Publishing and scheduling remain the caller's responsibility.
