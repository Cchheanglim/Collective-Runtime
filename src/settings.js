const $ = (id) => document.getElementById(id);
const api = window.collective;
let claudeBusy = false;

// --- navigation ---

const navItems = [...document.querySelectorAll('.nav-item')];
function showPage(page) {
  for (const item of navItems) {
    if (item.dataset.page === page) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  }
  for (const section of document.querySelectorAll('.page')) section.hidden = section.id !== `page-${page}`;
}
for (const item of navItems) item.addEventListener('click', () => showPage(item.dataset.page));
showPage('agents');

// --- controls ---

function showSaveError(err) {
  $('save-error').textContent = `Couldn't save that change: ${err.message}`;
  $('save-error').hidden = false;
}

async function save(key, value) {
  $('save-error').hidden = true;
  try {
    await api.setSetting(key, value);
  } catch (err) {
    showSaveError(err);
    render(await api.getState()); // put the control back to what is really saved
  }
}

for (const sw of document.querySelectorAll('.switch[data-setting]')) {
  sw.addEventListener('change', () => save(sw.dataset.setting, sw.checked));
}

const size = $('pet-size');
function showSize() {
  $('pet-size-value').textContent = `${size.value}%`;
  size.style.setProperty('--fill', `${((size.value - size.min) / (size.max - size.min)) * 100}%`);
}
size.addEventListener('input', showSize);
size.addEventListener('change', () => save('petSize', Number(size.value)));

$('claude-toggle').addEventListener('click', async () => {
  const connect = $('claude-toggle').dataset.connected !== 'true';
  claudeBusy = true;
  $('claude-toggle').disabled = true;
  $('claude-toggle').textContent = connect ? 'Connecting…' : 'Disconnecting…';
  await api.setAgentConnected('claude', connect);
  claudeBusy = false;
  render(await api.getState());
});

// --- render ---

function liveSummary(pets, agent) {
  const active = pets.filter((p) => p.agent === agent && p.state !== 'gone');
  if (!active.length) return 'No active sessions';
  const waiting = active.filter((p) => p.state === 'waiting').length;
  const text = `${active.length} active session${active.length === 1 ? '' : 's'}`;
  return waiting ? `${text} · ${waiting} need${waiting === 1 ? 's' : ''} you` : text;
}

function render({ pets, settings, server, agents }) {
  $('health').className = `health ${server.ok ? 'is-ok' : 'is-error'}`;
  $('health-status').textContent = server.ok ? 'OK' : 'Error';
  $('health').title = server.message;
  $('health-msg').hidden = server.ok;
  if (!server.ok) {
    $('health-msg').replaceChildren(
      Object.assign(document.createElement('strong'), { textContent: server.message }),
      "Pets can't hear your agents. Close any other copy of Collective Runtime, then restart this one.",
    );
  }

  syncPets($('live-pets'), pets);
  $('live-empty').hidden = pets.length > 0;

  const claude = agents.claude;
  const badge = $('claude-badge');
  badge.textContent = claude.connected ? 'Connected' : 'Not connected';
  badge.className = `badge${claude.connected ? ' is-ok' : ''}`;
  badge.hidden = false;
  $('claude-live').textContent = liveSummary(pets, 'claude');
  if (!claudeBusy) {
    const btn = $('claude-toggle');
    btn.dataset.connected = claude.connected;
    btn.disabled = false;
    btn.textContent = claude.connected ? 'Disconnect' : 'Connect';
    btn.className = `btn${claude.connected ? '' : ' btn-primary'}`;
  }
  $('claude-error').hidden = !claude.error;
  $('claude-error-text').textContent = claude.error
    ? `Couldn't update ~/.claude/settings.json (${claude.error}). Nothing was changed. Fix the file, then try again.`
    : '';

  for (const sw of document.querySelectorAll('.switch[data-setting]')) sw.checked = settings[sw.dataset.setting];
  if (document.activeElement !== size) {
    size.value = settings.petSize;
    showSize();
  }
}

// Sample pets so the theme card shows the character in a few states.
syncPets($('theme-preview'), [
  { agent: 'claude', session: 'a', state: 'idle' },
  { agent: 'gemini', session: 'b', state: 'working' },
  { agent: 'codex', session: 'c', state: 'waiting' },
]);

api.getState().then(render);
api.onState(render);
