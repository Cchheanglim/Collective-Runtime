const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('collective', {
  getState: () => ipcRenderer.invoke('get-state'),
  onState: (callback) => ipcRenderer.on('state', (_e, state) => callback(state)),
  setSetting: (key, value) => ipcRenderer.invoke('set-setting', key, value),
  setAgentConnected: (agent, connected) => ipcRenderer.invoke('set-agent-connected', agent, connected),
});
