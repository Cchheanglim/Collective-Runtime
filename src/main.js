const { app, BrowserWindow, Menu, ipcMain, nativeTheme, screen } = require('electron');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { parseEvent } = require('./events');
const claudeHooks = require('./claude-hooks');

const PORT = 47321;
const PET_WINDOW = { width: 480, height: 150 }; // at 100% pet size
const FINISHED_PET_DELAY = 30_000;
const CLAUDE_SETTINGS = path.join(os.homedir(), '.claude', 'settings.json');
// shortcut: runs the hook from the source tree with `node` on PATH; packaging (asar) needs the script unpacked.
const HOOK_COMMAND = `node "${path.join(__dirname, '..', 'hooks', claudeHooks.SCRIPT).replace(/\\/g, '/')}" claude`;
const DEFAULTS = { petSize: 100, showLabels: true, removeFinished: true };

let petWin;
let settingsWin;
let settings;
let server = { ok: false, port: PORT, message: 'Starting…' };
let claude = { connected: false };
const pets = new Map(); // "agent:session" -> { agent, session, state }

// --- settings ---------------------------------------------------------------

const settingsFile = () => path.join(app.getPath('userData'), 'settings.json');

function loadSettings() {
  let saved = {};
  try {
    saved = JSON.parse(fs.readFileSync(settingsFile(), 'utf8'));
  } catch {} // first run or unreadable: fall back to defaults
  settings = { ...DEFAULTS };
  for (const key of Object.keys(DEFAULTS)) {
    if (validSetting(key, saved[key])) settings[key] = saved[key];
  }
}

function validSetting(key, value) {
  if (key === 'petSize') return Number.isInteger(value) && value >= 50 && value <= 150;
  return (key in DEFAULTS || key === 'startWithWindows') && typeof value === 'boolean';
}

// In development the login item must launch electron.exe with this project as its argument.
const loginItem = () => (app.isPackaged ? {} : { path: process.execPath, args: [app.getAppPath()] });

function setSetting(key, value) {
  if (!validSetting(key, value)) throw new Error(`Invalid setting: ${key}`);
  if (key === 'startWithWindows') {
    app.setLoginItemSettings({ ...loginItem(), openAtLogin: value });
  } else {
    settings[key] = value;
    fs.mkdirSync(path.dirname(settingsFile()), { recursive: true });
    fs.writeFileSync(settingsFile(), JSON.stringify(settings, null, 2));
    if (key === 'petSize') resizePetWindow();
    if (key === 'removeFinished') for (const pet of pets.values()) if (pet.state === 'gone') scheduleRemoval(pet);
  }
  broadcast();
}

// --- shared state -------------------------------------------------------------

function snapshot() {
  return {
    pets: [...pets.values()].map(({ agent, session, state }) => ({ agent, session, state })),
    settings: { ...settings, startWithWindows: app.getLoginItemSettings(loginItem()).openAtLogin },
    server,
    agents: { claude },
  };
}

function broadcast() {
  const state = snapshot();
  for (const win of [petWin, settingsWin]) if (win && !win.isDestroyed()) win.webContents.send('state', state);
}

function scheduleRemoval(pet) {
  clearTimeout(pet.timer);
  if (!settings.removeFinished) return;
  pet.timer = setTimeout(() => {
    pets.delete(`${pet.agent}:${pet.session}`);
    broadcast();
  }, FINISHED_PET_DELAY);
}

function onAgentEvent(event) {
  const key = `${event.agent}:${event.session}`;
  const pet = pets.get(key) ?? { agent: event.agent, session: event.session };
  clearTimeout(pet.timer);
  pet.state = event.state;
  pets.set(key, pet);
  if (pet.state === 'gone') scheduleRemoval(pet);
  broadcast();
}

// --- windows -----------------------------------------------------------------

const webPreferences = {
  preload: path.join(__dirname, 'preload.js'),
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true,
};

function petBounds() {
  const scale = settings.petSize / 100;
  return { width: Math.round(PET_WINDOW.width * scale), height: Math.round(PET_WINDOW.height * scale) };
}

function createPetWindow() {
  const { width, height } = petBounds();
  const area = screen.getPrimaryDisplay().workArea;
  petWin = new BrowserWindow({
    width,
    height,
    x: area.x + area.width - width - 20,
    y: area.y + area.height - height - 20,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: true,
    webPreferences,
  });
  petWin.loadFile(path.join(__dirname, 'index.html'));

  const menu = Menu.buildFromTemplate([
    { label: 'Settings…', click: openSettings },
    { type: 'separator' },
    { label: 'Quit Collective Runtime', click: () => app.quit() },
  ]);
  const popup = (e) => {
    e.preventDefault?.();
    menu.popup({ window: petWin });
  };
  petWin.on('system-context-menu', popup); // Windows: right-click on the draggable area
  petWin.webContents.on('context-menu', popup);
}

// Grow/shrink around the bottom-right corner so the pets stay where the user put them.
function resizePetWindow() {
  if (!petWin || petWin.isDestroyed()) return;
  const old = petWin.getBounds();
  const { width, height } = petBounds();
  petWin.setBounds({ x: old.x + old.width - width, y: old.y + old.height - height, width, height });
}

function openSettings() {
  if (settingsWin && !settingsWin.isDestroyed()) return settingsWin.focus();
  claude = claudeHooks.status(CLAUDE_SETTINGS);
  settingsWin = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 820,
    minHeight: 560,
    title: 'Collective Runtime Settings',
    backgroundColor: '#18191c',
    show: false,
    webPreferences,
  });
  settingsWin.setMenu(null);
  settingsWin.loadFile(path.join(__dirname, 'settings.html'));
  settingsWin.once('ready-to-show', () => settingsWin.show());
}

// --- IPC ---------------------------------------------------------------------

ipcMain.handle('get-state', () => snapshot());
ipcMain.handle('set-setting', (_e, key, value) => setSetting(key, value));
ipcMain.handle('set-agent-connected', (_e, agent, connected) => {
  if (agent !== 'claude' || typeof connected !== 'boolean') throw new Error('Unsupported agent');
  try {
    if (connected) claudeHooks.install(CLAUDE_SETTINGS, HOOK_COMMAND);
    else claudeHooks.uninstall(CLAUDE_SETTINGS);
    claude = claudeHooks.status(CLAUDE_SETTINGS);
  } catch (err) {
    claude = { connected: claude.connected, error: err.message };
  }
  broadcast();
});

// --- event server --------------------------------------------------------------

// Agents report their state here. Only reachable from this computer.
function startServer() {
  const httpServer = http.createServer((req, res) => {
    if (req.method !== 'POST' || req.url !== '/event') return res.writeHead(404).end();
    // Requiring JSON makes browsers send a CORS preflight we never answer, so web pages can't post fake events.
    if (req.headers['content-type'] !== 'application/json') return res.writeHead(415).end();
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 4096) req.destroy(); // real events are tiny
    });
    req.on('end', () => {
      const event = parseEvent(body);
      if (!event) return res.writeHead(400).end();
      onAgentEvent(event);
      res.writeHead(204).end();
    });
  });
  httpServer.on('listening', () => {
    server = { ok: true, port: PORT, message: `Listening on 127.0.0.1:${PORT}` };
    broadcast();
  });
  httpServer.on('error', (err) => {
    server = { ok: false, port: PORT, message: err.code === 'EADDRINUSE' ? `Port ${PORT} is already in use` : err.message };
    console.error('Event server failed:', server.message);
    broadcast();
  });
  httpServer.listen(PORT, '127.0.0.1');
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', openSettings);
  app.whenReady().then(() => {
    nativeTheme.themeSource = 'dark';
    loadSettings();
    createPetWindow();
    startServer();
    if (process.argv.includes('--settings')) openSettings();
  });
}
