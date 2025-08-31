const { contextBridge, ipcRenderer } = require('electron');

// Expone de forma segura funciones del proceso principal al proceso de renderizado (la app de React)
contextBridge.exposeInMainWorld('electronAPI', {
  // --- Pictograms ---
  getPictograms: () => ipcRenderer.invoke('db:get-pictograms'),
  createPictogram: (data) => ipcRenderer.invoke('db:create-pictogram', data),
  updatePictogram: (id, data) => ipcRenderer.invoke('db:update-pictogram', id, data),
  deletePictogram: (id) => ipcRenderer.invoke('db:delete-pictogram', id),

  // --- Phrases ---
  getPhrases: () => ipcRenderer.invoke('db:get-phrases'),
  createPhrase: (data) => ipcRenderer.invoke('db:create-phrase', data),
  updatePhrase: (id, data) => ipcRenderer.invoke('db:update-phrase', id, data),
  deletePhrase: (id) => ipcRenderer.invoke('db:delete-phrase', id),

  // --- File System ---
  saveAudio: (base64Data) => ipcRenderer.invoke('fs:save-audio', base64Data),
  readAudio: (filePath) => ipcRenderer.invoke('fs:read-audio', filePath),
});
