/** Offline parser/CLI checks, not permission to publish or a live account test. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { checkPosts, extractPosts, readJsonStdin } from '../skills/x-post-writer/scripts/check-post.mjs';

const helper = fileURLToPath(new URL('../skills/x-post-writer/scripts/check-post.mjs', import.meta.url));
const fixturePath = fileURLToPath(new URL('./fixtures/x-drafts.json', import.meta.url));
const fixture = JSON.parse(await readFile(fixturePath, 'utf8'));
const check = async (text) => (await checkPosts(extractPosts({ posts: [text] })))[0];
const cli = (...args) => spawnSync(process.execPath, [helper, ...args], { encoding: 'utf8', timeout: 15000 });
const stdinCli = (input, ...args) => spawnSync(process.execPath, [helper, '--stdin', ...args], {
  input, encoding: 'utf8', timeout: 15000,
});

test('280 Latin characters pass; 281 fail', async () => {
  assert.equal((await check('a'.repeat(280))).valid, true);
  assert.equal((await check('a'.repeat(281))).valid, false);
});

test('140 CJK characters pass; 141 fail', async () => {
  assert.equal((await check('中'.repeat(140))).weighted_length, 280);
  assert.equal((await check('中'.repeat(140))).valid, true);
  assert.equal((await check('中'.repeat(141))).valid, false);
});

test('URLs count as 23 including long URLs', async () => {
  assert.equal((await check('中 https://example.com')).weighted_length, 26);
  assert.equal((await check(`中 https://example.com/${'long'.repeat(100)}`)).weighted_length, 26);
});

test('recognized family and skin-tone emoji sequences count as two', async () => {
  assert.equal((await check('👨‍👩‍👧‍👦')).weighted_length, 2);
  assert.equal((await check('🙋🏽')).weighted_length, 2);
});

test('Unicode NFC normalization is applied', async () => {
  assert.equal((await check('cafe\u0301')).weighted_length, 4);
  assert.equal((await check('café')).weighted_length, 4);
});

test('spaces, newlines and thread labels count', async () => {
  assert.equal((await check(`1/2\n${'中'.repeat(138)}`)).weighted_length, 280);
  assert.equal((await check(`1/2\n${'中'.repeat(139)}`)).valid, false);
});

test('a passing result cannot be reused after delivery text or link formatting changes', async () => {
  const url = 'https://example.com/source';
  const text = `${'中'.repeat(128)}\n${url}`;
  const checked = await check(text);
  assert.equal(checked.weighted_length, 280);
  assert.equal(checked.valid, true);
  assert.equal((await check(`1/1\n${text}`)).valid, false);
  assert.equal((await check(`${'中'.repeat(128)}\n[${url}](${url})`)).valid, false);
  assert.deepEqual(await check(text), checked);
});

test('empty and whitespace-only texts fail', async () => {
  assert.equal((await check('')).valid, false);
  assert.equal((await check(' \n\t')).valid, false);
});

test('non-string posts are malformed input', async () => {
  await assert.rejects(() => checkPosts(extractPosts({ posts: [42] })), /string/);
});

test('malformed simple envelopes fail', () => {
  for (const input of [null, [], {}, { posts: [] }, { posts: 'text' }]) {
    assert.throws(() => extractPosts(input));
  }
});

test('version, status and topic IDs are required', () => {
  const version = structuredClone(fixture);
  version.schema_version = 'opc-x-drafts/v2';
  assert.throws(() => extractPosts(version));
  const published = structuredClone(fixture);
  published.drafts[0].status = 'published';
  assert.throws(() => extractPosts(published));
  const missingId = structuredClone(fixture);
  delete missingId.drafts[0].topic_id;
  assert.throws(() => extractPosts(missingId));
});

test('single posts and threads enforce their cardinality', () => {
  const input = structuredClone(fixture);
  input.drafts[0].format = 'thread';
  assert.throws(() => extractPosts(input));
  input.drafts[0].posts.push('Second post https://example.invalid/source');
  assert.equal(extractPosts(input).length, 3);
  input.drafts[0].format = 'single';
  assert.throws(() => extractPosts(input));
});

test('quote drafts need an original X status URL', () => {
  const input = structuredClone(fixture);
  input.drafts[0].format = 'quote';
  assert.throws(() => extractPosts(input));
  input.drafts[0].quote_url = 'https://example.com/status/123';
  assert.throws(() => extractPosts(input));
  input.drafts[0].quote_url = 'https://x.com/example/status/123';
  assert.equal(extractPosts(input).length, 2);
});

test('reply drafts need an original X status URL', () => {
  const input = structuredClone(fixture);
  delete input.drafts[0].reply_url;
  assert.throws(() => extractPosts(input));
  input.drafts[0].reply_url = 'https://example.com/status/123';
  assert.throws(() => extractPosts(input));
  input.drafts[0].reply_url = 'https://x.com/example/status/123';
  assert.equal(extractPosts(input).length, 2);
});

test('source URLs require an array and reject credentials and non-web paths', () => {
  const input = structuredClone(fixture);
  for (const urls of [undefined, null, 'https://example.com', ['file:///private/test'], ['https://user:secret@example.com']]) {
    input.drafts[0].source_urls = urls;
    assert.throws(() => extractPosts(input));
  }
});

test('an original opinion without external URLs passes the batch CLI unchanged', async () => {
  const input = {
    schema_version: 'opc-x-drafts/v1', run_id: 'opinion-test',
    drafts: [{ topic_id: 'defaults', format: 'single', posts: ['我更愿意先把默认选项想清楚。'], source_urls: [], status: 'draft' }],
  };
  const original = JSON.stringify(input);
  const checked = await checkPosts(extractPosts(input));
  const result = stdinCli(original);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).posts, checked);
  assert.ok(checked[0].valid);
  assert.equal(JSON.stringify(input), original);
  for (const format of ['reply', 'quote']) {
    input.drafts[0].format = format;
    assert.throws(() => extractPosts(input), /original X status/);
  }
});

test('the synthetic Chinese reply and standalone draft fit without mutation', async () => {
  const original = JSON.stringify(fixture);
  const checked = await checkPosts(extractPosts(fixture));
  assert.equal(checked.length, 2);
  assert.ok(checked.every((post) => post.valid));
  assert.equal(JSON.stringify(fixture), original);
  assert.deepEqual(checked.map((post) => post.topic_id), ['cedar-preview', 'lumen-demo']);
  assert.equal(fixture.drafts[0].format, 'reply');
  assert.ok(!fixture.drafts[0].posts[0].includes(fixture.drafts[0].reply_url));
});

test('CLI text mode returns the measured result', () => {
  const result = cli('--text', '中 https://example.com');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).posts[0].weighted_length, 26);
});

test('CLI file mode checks the end-to-end fixture', () => {
  const result = cli('--file', fixturePath);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).posts.length, 2);
});

test('CLI overflow is status 1 and not silent truncation', () => {
  const result = cli('--text', '中'.repeat(141));
  assert.equal(result.status, 1);
  assert.equal(JSON.parse(result.stdout).posts[0].weighted_length, 282);
});

test('CLI usage and missing files are status 2', () => {
  assert.equal(cli().status, 2);
  assert.equal(cli('--file', `${fixturePath}.missing`).status, 2);
  assert.equal(cli('--text', 'text', '--file', fixturePath).status, 2);
});

test('CLI stdin accepts the simple JSON object without a draft file', () => {
  const result = stdinCli(JSON.stringify({ posts: ['中 https://example.com'] }));
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).posts[0].weighted_length, 26);
});

test('CLI stdin and file modes return identical draft-envelope results', () => {
  const result = stdinCli(JSON.stringify(fixture));
  const fileResult = cli('--file', fixturePath);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, fileResult.stdout);
  assert.deepEqual(JSON.parse(result.stdout).posts.map((post) => post.topic_id), ['cedar-preview', 'lumen-demo']);
});

test('CLI stdin transports multiline quotes and shell-sensitive text as data', async () => {
  const text = '1/2\n"quoted" \'single\' `literal` $literal \\ 中 👨‍👩‍👧‍👦 https://example.com';
  const result = stdinCli(JSON.stringify({ posts: [text] }));
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).posts, await checkPosts(extractPosts({ posts: [text] })));
});

test('CLI stdin enforces the exact weighted boundary without truncation', () => {
  for (const [count, status] of [[140, 0], [141, 1]]) {
    const result = stdinCli(JSON.stringify({ posts: ['中'.repeat(count)] }));
    assert.equal(result.status, status, result.stderr);
    assert.equal(JSON.parse(result.stdout).posts[0].weighted_length, count * 2);
  }
});

test('CLI stdin returns all results when only one post overflows', () => {
  const result = stdinCli(JSON.stringify({ posts: ['short', '中'.repeat(141)] }));
  assert.equal(result.status, 1, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).posts.map((post) => post.valid), [true, false]);
});

test('CLI stdin rejects empty input and malformed JSON with status 2', () => {
  for (const input of ['', ' \n\t', '{', 'plain text', '{"posts":["ok"]}\n{"posts":["second"]}']) {
    const result = stdinCli(input);
    assert.equal(result.status, 2, result.stderr);
    assert.equal(result.stdout, '');
    assert.ok(result.stderr.trim());
  }
});

test('CLI stdin distinguishes empty post content from missing JSON', () => {
  for (const text of ['', ' \n\t']) {
    const result = stdinCli(JSON.stringify({ posts: [text] }));
    assert.equal(result.status, 1, result.stderr);
    assert.equal(JSON.parse(result.stdout).valid, false);
  }
});

test('CLI stdin applies the existing envelope and post-type validation', () => {
  const published = structuredClone(fixture);
  published.drafts[0].status = 'published';
  const version = structuredClone(fixture);
  version.schema_version = 'opc-x-drafts/v2';
  for (const input of [null, [], {}, { posts: [] }, { posts: [42] }, published, version]) {
    const result = stdinCli(JSON.stringify(input));
    assert.equal(result.status, 2, result.stderr);
    assert.equal(result.stdout, '');
  }
});

test('CLI stdin rejects conflicting input modes before reading input', () => {
  for (const args of [['--text', 'text'], ['--text', ''], ['--file', fixturePath], ['--text', 'text', '--file', fixturePath]]) {
    const result = stdinCli('', ...args);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /exactly one/);
    assert.equal(result.stdout, '');
  }
});

test('CLI stdin rejects positional text and unknown flags', () => {
  for (const args of [['unexpected'], ['--unknown']]) {
    const result = stdinCli(JSON.stringify({ posts: ['ok'] }), ...args);
    assert.equal(result.status, 2);
  }
});

test('stdin decodes split UTF-8 and waits for the complete JSON stream', async () => {
  const expected = { posts: ['中 👨‍👩‍👧‍👦\nhttps://example.com'] };
  const bytes = Buffer.from(JSON.stringify(expected));
  const stream = Readable.from(Array.from(bytes, (byte) => Buffer.from([byte])));
  assert.deepEqual(await readJsonStdin(stream), expected);
});

test('stdin read errors propagate instead of producing a valid result', async () => {
  const stream = new Readable({ read() { this.destroy(new Error('synthetic input failure')); } });
  await assert.rejects(() => readJsonStdin(stream), /synthetic input failure/);
});

test('stdin rejects an interactive terminal without waiting', async () => {
  await assert.rejects(() => readJsonStdin({ isTTY: true }), /interactive terminal/);
});
