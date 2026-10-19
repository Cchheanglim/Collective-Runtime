// Claude Code hook: tells Collective-Runtime what this session is doing.
// Usage: node hooks/collective-notify.js [agent-name]   (Claude Code pipes the hook JSON on stdin)
const STATE_FOR = {
  SessionStart: 'idle',
  UserPromptSubmit: 'working',
  PostToolUse: 'working',
  Notification: 'waiting',
  Stop: 'done',
  SessionEnd: 'gone',
};

let input = '';
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  let hook = {};
  try {
    hook = JSON.parse(input);
  } catch {}
  const state = STATE_FOR[hook.hook_event_name];
  if (!state) return;
  fetch('http://127.0.0.1:47321/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent: process.argv[2] || 'claude', session: hook.session_id, state }),
    signal: AbortSignal.timeout(1000),
  }).catch(() => {}); // pet app not running: never slow down or break the agent
});
