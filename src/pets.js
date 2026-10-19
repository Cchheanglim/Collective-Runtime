// Shared by the pet window and the Settings sidebar: keeps a container's pets in sync with main's list.
const STATE_NAMES = { idle: 'idle', working: 'working', waiting: 'needs you', done: 'done', gone: 'finished' };
const AGENT_NAMES = { claude: 'Claude Code', gemini: 'Gemini CLI', antigravity: 'Antigravity', codex: 'Codex CLI' };

function syncPets(container, pets) {
  const keep = new Set();
  for (const { agent, session, state } of pets) {
    const key = `${agent}:${session}`;
    keep.add(key);
    let pet = [...container.children].find((el) => el.dataset.key === key);
    if (!pet) {
      pet = document.createElement('div');
      pet.className = 'pet';
      pet.dataset.key = key;
      pet.dataset.agent = agent;
      pet.setAttribute('role', 'img');
      const body = document.createElement('div');
      body.className = 'pet-body';
      const label = document.createElement('div');
      label.className = 'pet-label';
      label.textContent = agent;
      pet.append(body, label);
      container.append(pet);
    }
    pet.dataset.state = state;
    const name = AGENT_NAMES[agent] ?? agent;
    pet.setAttribute('aria-label', `${name} is ${STATE_NAMES[state]}`);
    pet.title = `${name}: ${STATE_NAMES[state]}`;
  }
  for (const pet of [...container.children]) if (!keep.has(pet.dataset.key)) pet.remove();
}
