# X formatting and validation

Reviewed 2026-09-16. Recheck official rules when platform capabilities or account entitlements matter.

## Standard posts

Use the standard **280 weighted-unit** limit unless the user explicitly chooses a verified different format. CJK characters normally count as two; recognized URLs count as 23; recognized emoji sequences count as two. Unicode normalization and URL recognition mean ordinary string length is not a valid substitute. Include manually typed mentions, hashtags, numbering, spaces, line breaks and source links in the checked text.

Sources: [X character counting](https://docs.x.com/fundamentals/counting-characters), [official twitter-text implementation](https://github.com/twitter/twitter-text/tree/master/js), and [v3 configuration](https://github.com/twitter/twitter-text/blob/master/config/v3.json).

## Optional local exact check

The helper uses the X-recommended `twitter-text` implementation pinned in the Skill-local package. It does not call X, inspect credentials, publish, or create files. Node 18+ is needed. When local dependency installation is permitted:

```bash
npm ci --prefix <skill-directory>/scripts --ignore-scripts --no-audit --no-fund
node <skill-directory>/scripts/check-post.mjs --text 'The exact text including its source URL'
node <skill-directory>/scripts/check-post.mjs --file <drafts.json>
node <skill-directory>/scripts/check-post.mjs --stdin
```

Choose exactly one input mode. `--stdin` reads one UTF-8 JSON object until EOF, using the same format as `--file`; send the JSON through a supported process-input stream and close that stream. It needs no temporary file and rejects an interactive terminal, empty input, malformed JSON, and conflicting modes. It does not accept raw post text or newline-delimited multiple JSON objects. An empty post inside valid JSON is a content failure (exit `1`), not a missing-input error (`2`).

Prefer a safe stdin stream or an already authorized JSON file for quotes, multiline text and shell-sensitive characters; never interpolate untrusted post text into an executable shell command. Only create a draft file at a user-authorized path. `--stdin` is an input interface, not permission to evade a host security rejection. If the host has no permitted safe input/check path, leave exact length unverified; do not use encoding tricks, permission changes, or a new file to bypass the restriction.

The simple file format is `{"posts": ["first complete post", "second complete post"]}`. The helper also accepts `{"schema_version":"opc-x-drafts/v1","run_id":"...","drafts":[{"topic_id":"...","format":"single","posts":["..."],"source_urls":["https://..."],"status":"draft"}]}`. A `quote` draft also needs `quote_url`; a `reply` draft needs `reply_url`; a `thread` needs at least two posts.

`source_urls` must be an array of HTTP(S) URLs without credentials, and may be `[]` for an original opinion, authorized narrative fiction or approved personal account with no external URLs. Keep provenance in review/context notes. This is an input-format allowance, not a fact-checking exemption; exact reply/quote targets remain required.

It returns weighted length and validity for each post. Exit `0` means all nonempty standard-post texts pass the parser, `1` means a length/content check failed, and `2` means malformed input, unavailable dependencies or a read error. The helper never silently truncates or rewrites the text. Parsing success is not fact-checking, media validation, account entitlement or platform acceptance.

Keep the checked input and returned result together through final delivery. Copy the same `posts[]` strings unchanged into the copy blocks, with labels and review notes outside. Any later text, source-link, whitespace, or numbering edit invalidates the earlier check for that version. In an evaluation, retain the input payload and result in the authorized trace; a success result without its input cannot prove that the delivered text was checked. This does not authorize creating a trace file or retrying a denied check through another transport.

The pinned parser is a reproducible implementation baseline, not a promise to recognize future emoji or platform changes. If the actual composer disagrees, use the current platform result and report the discrepancy. Without the library or composer, keep the text conservative and explicitly label exact length unverified.

The upstream package still brings a deprecated `core-js@2` dependency. Keep this optional helper local and read-only, install with lifecycle scripts disabled as above, and do not blindly override the dependency's major version or treat it as a new production publishing SDK.

## Single, reply, quote, or thread

- **Single:** use after choosing a standalone action, when one understandable thought, experience, question or explanation fits. It is not the default action for an open brief. Personal commentary defaults to no body URL; keep verification URLs in review notes/`source_urls`. Author credit and a clickable link are separate choices under [editorial.md](editorial.md#attribution-and-added-value). Count any deliberately included link in the final text. X does not render Markdown link syntax or bold markers as ordinary Markdown.
- **Reply:** use only with a verified original X status URL. The checked text is the reply body only; `reply_url` stays outside the copy block as the action target. The parent post can anchor context/source attribution, but any new factual claim still needs support. Do not paste the parent URL merely to emulate a native reply.
- **Quote:** use only with a verified original X status URL and actual commentary. Deliver the commentary text plus `quote_url` outside the copy block so the user knows to use the quote action. A pasted URL is not proof a native quote post was created.
- **Thread:** use when multiple facts or conditions need room. Each post must be independently length-checked including any `1/3` labels. Keep the first post accurate without later context, place any reader-useful links near the relevant claims, and give every subsequent post a purpose. Do not pad a single fact into a long thread.

Do not assume that moving external links into replies improves reach. Choose link placement for attribution and readability; any algorithm claim needs current evidence.

## Visuals

Choose imagery by its contribution to the post, following [images.md](images.md). Text alone is a complete deliverable when an image adds nothing useful. When an image is requested or selected, deliver an inspected actual asset, with alt text and provenance outside the post body; a prompt or link-only source does not complete that work. Distinguish an editorial choice to omit imagery from an unresolved image request. Text-length validation does not validate an image or upload it to X.

## Automation is a separate capability

[X automation rules](https://help.x.com/en/rules-and-policies/x-automation) distinguish permitted information broadcasts from prohibited website scripting, automated trend posting and unsolicited automated interaction. [Authenticity rules](https://help.x.com/en/rules-and-policies/authenticity) also constrain repetitive/spammy activity. A scheduled research/drafting run is not authorization to operate an account or proof of compliant publishing. This Skill stops at drafts.
