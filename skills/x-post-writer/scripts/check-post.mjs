#!/usr/bin/env node
/** Read-only standard-X-post validation using the official parser. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const isHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
};

export function extractPosts(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Expected a JSON object containing posts or an opc-x-drafts/v1 envelope.');
  }
  if (Object.hasOwn(input, 'schema_version')) {
    if (input.schema_version !== 'opc-x-drafts/v1' || typeof input.run_id !== 'string' || !input.run_id.trim()) {
      throw new Error('Unsupported draft version or missing run_id.');
    }
    if (!Array.isArray(input.drafts) || !input.drafts.length) {
      throw new Error('drafts must be a nonempty array.');
    }
    return input.drafts.flatMap((draft, index) => {
      if (!draft || typeof draft !== 'object' || typeof draft.topic_id !== 'string' || !draft.topic_id.trim() || draft.status !== 'draft') {
        throw new Error(`Draft ${index + 1} needs topic_id and status=draft.`);
      }
      if (!['single', 'reply', 'quote', 'thread'].includes(draft.format) || !Array.isArray(draft.posts) || !draft.posts.length) {
        throw new Error(`Draft ${index + 1} has an invalid format/posts array.`);
      }
      if ((draft.format === 'thread' && draft.posts.length < 2) || (draft.format !== 'thread' && draft.posts.length !== 1)) {
        throw new Error(`Draft ${index + 1} has the wrong post count for its format.`);
      }
      if (!Array.isArray(draft.source_urls) || !draft.source_urls.every(isHttpUrl)) {
        throw new Error(`Draft ${index + 1} needs a source_urls array of valid HTTP(S) URLs; it may be empty.`);
      }
      if (draft.format === 'quote' && (typeof draft.quote_url !== 'string' || !/^https:\/\/(?:www\.)?(?:x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+(?:\?.*)?$/.test(draft.quote_url))) {
        throw new Error(`Draft ${index + 1} needs an original X status quote_url.`);
      }
      if (draft.format === 'reply' && (typeof draft.reply_url !== 'string' || !/^https:\/\/(?:www\.)?(?:x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+(?:\?.*)?$/.test(draft.reply_url))) {
        throw new Error(`Draft ${index + 1} needs an original X status reply_url.`);
      }
      return draft.posts.map((text, postIndex) => ({ text, draft: index + 1, post: postIndex + 1, topic_id: draft.topic_id }));
    });
  }
  if (!Array.isArray(input.posts) || !input.posts.length) {
    throw new Error('posts must be a nonempty array.');
  }
  return input.posts.map((text, index) => ({ text, post: index + 1 }));
}

export async function checkPosts(records) {
  let parser;
  try {
    const module = await import('twitter-text');
    parser = module.default?.parseTweet ?? module.parseTweet;
  } catch {
    throw new Error('twitter-text is unavailable. Install the pinned Skill-local dependencies with npm ci; no approximate result was substituted.');
  }
  return records.map(({ text, ...identity }) => {
    if (typeof text !== 'string') throw new Error('Every post must be a string.');
    const parsed = parser(text);
    return {
      ...identity,
      weighted_length: parsed.weightedLength,
      limit: 280,
      valid: text.trim().length > 0 && parsed.valid,
      parser: 'twitter-text@3.1.0',
    };
  });
}

export async function readJsonStdin(stream = process.stdin) {
  if (stream.isTTY) throw new Error('--stdin requires a JSON input stream ending at EOF, not an interactive terminal.');
  stream.setEncoding('utf8');
  let input = '';
  for await (const chunk of stream) input += chunk;
  if (!input.trim()) throw new Error('--stdin received empty input; expected a JSON object containing posts.');
  return JSON.parse(input);
}

async function main() {
  try {
    const { values } = parseArgs({
      options: { text: { type: 'string' }, file: { type: 'string' }, stdin: { type: 'boolean' } },
      allowPositionals: false,
    });
    const modeCount = [values.text !== undefined, values.file !== undefined, values.stdin === true].filter(Boolean).length;
    if (modeCount !== 1) throw new Error('Use exactly one of --text, --file, or --stdin.');
    let input;
    if (values.stdin) input = await readJsonStdin();
    else if (values.file !== undefined) input = JSON.parse(await readFile(values.file, 'utf8'));
    else input = { posts: [values.text] };
    const posts = await checkPosts(extractPosts(input));
    const valid = posts.every((post) => post.valid);
    console.log(JSON.stringify({ valid, scope: 'standard_post_text_only', posts }, null, 2));
    return valid ? 0 : 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 2;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exitCode = await main();
}
