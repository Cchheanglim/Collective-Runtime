const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { status, install, uninstall, EVENTS } = require('../src/claude-hooks');

const CMD = 'node "/app/hooks/collective-notify.js" claude';
const FOREIGN = { matcher: '', hooks: [{ type: 'command', command: 'node "C:/x/clawd-hook.js" Stop' }] };

function tempSettings(content) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cr-hooks-'));
  const file = path.join(dir, 'settings.json');
  if (content !== undefined) fs.writeFileSync(file, typeof content === 'string' ? content : JSON.stringify(content));
  return file;
}
const load = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

test('install keeps other settings and other tools\' hooks, and backs up first', () => {
  const file = tempSettings({ model: 'opus', hooks: { Stop: [FOREIGN], PreToolUse: [FOREIGN] } });
  install(file, CMD);
  const data = load(file);
  assert.strictEqual(data.model, 'opus');
  assert.deepStrictEqual(data.hooks.PreToolUse, [FOREIGN]);
  assert.deepStrictEqual(data.hooks.Stop[0], FOREIGN);
  assert.strictEqual(data.hooks.Stop.length, 2);
  assert.ok(fs.existsSync(`${file}.collective-backup`));
  assert.deepStrictEqual(status(file), { connected: true });
});

test('install twice does not duplicate; uninstall removes only ours', () => {
  const file = tempSettings({ hooks: { Stop: [FOREIGN] } });
  install(file, CMD);
  install(file, CMD);
  for (const e of EVENTS) assert.strictEqual(load(file).hooks[e].filter((g) => g !== FOREIGN && JSON.stringify(g).includes('collective-notify')).length, 1);
  uninstall(file);
  assert.deepStrictEqual(load(file).hooks, { Stop: [FOREIGN] });
  assert.deepStrictEqual(status(file), { connected: false });
});

test('works when settings.json does not exist yet', () => {
  const file = tempSettings();
  assert.deepStrictEqual(status(file), { connected: false });
  install(file, CMD);
  assert.strictEqual(status(file).connected, true);
});

test('refuses to touch a file it cannot understand', () => {
  for (const bad of ['{ broken json', '[]', '{"hooks": []}', '{"hooks": {"Stop": {}}}']) {
    const file = tempSettings(bad);
    assert.throws(() => install(file, CMD));
    assert.throws(() => uninstall(file));
    assert.strictEqual(fs.readFileSync(file, 'utf8'), bad);
    assert.ok(status(file).error);
  }
});
