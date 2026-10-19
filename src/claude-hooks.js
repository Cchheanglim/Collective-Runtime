// Adds/removes our hook in Claude Code's settings.json without touching anything else in it.
const fs = require('node:fs');
const path = require('node:path');

const EVENTS = ['SessionStart', 'UserPromptSubmit', 'PostToolUse', 'Notification', 'Stop', 'SessionEnd'];
const SCRIPT = 'collective-notify.js'; // unique file name = how we recognise our own entries

const isOurs = (group) => Array.isArray(group?.hooks) && group.hooks.some((h) => String(h.command).includes(SCRIPT));

// Throws on unreadable/unexpected files so callers never overwrite something they don't understand.
function read(file) {
  if (!fs.existsSync(file)) return {};
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('settings.json is not a JSON object');
  if (data.hooks !== undefined && (typeof data.hooks !== 'object' || Array.isArray(data.hooks))) {
    throw new Error('"hooks" in settings.json has an unexpected format');
  }
  for (const event of EVENTS) {
    if (data.hooks?.[event] !== undefined && !Array.isArray(data.hooks[event])) {
      throw new Error(`"hooks.${event}" in settings.json has an unexpected format`);
    }
  }
  return data;
}

function write(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file)) fs.copyFileSync(file, `${file}.collective-backup`);
  const tmp = `${file}.collective-tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`);
  fs.renameSync(tmp, file); // atomic swap: a crash never leaves a half-written settings file
}

function status(file) {
  try {
    const data = read(file);
    return { connected: EVENTS.every((e) => data.hooks?.[e]?.some(isOurs)) };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}

function install(file, command) {
  const data = read(file);
  data.hooks ??= {};
  for (const event of EVENTS) {
    const others = (data.hooks[event] ?? []).filter((g) => !isOurs(g));
    data.hooks[event] = [...others, { matcher: '', hooks: [{ type: 'command', command }] }];
  }
  write(file, data);
}

function uninstall(file) {
  const data = read(file);
  if (!data.hooks) return;
  for (const event of EVENTS) {
    const groups = data.hooks[event];
    if (!groups?.some(isOurs)) continue;
    const others = groups.filter((g) => !isOurs(g));
    if (others.length) data.hooks[event] = others;
    else delete data.hooks[event];
  }
  write(file, data);
}

module.exports = { status, install, uninstall, EVENTS, SCRIPT };
