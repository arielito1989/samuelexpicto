// This file adapts the Electron API to a format similar to the old apiClient,
// making it easier to refactor the components that use it.

const localApiClient = {
  pictograms: {
    getAll: () => window.electronAPI.getPictograms(),
    create: (data) => window.electronAPI.createPictogram(data),
    update: (id, data) => window.electronAPI.updatePictogram(id, data),
    delete: (id) => window.electronAPI.deletePictogram(id),
  },
  phrases: {
    getAll: () => window.electronAPI.getPhrases(),
    create: (data) => window.electronAPI.createPhrase(data),
    update: (id, data) => window.electronAPI.updatePhrase(id, data),
    delete: (id) => window.electronAPI.deletePhrase(id),
  },
  files: {
    saveAudio: (base64Data) => window.electronAPI.saveAudio(base64Data),
    readAudio: (filePath) => window.electronAPI.readAudio(filePath),
  },
};

export default localApiClient;
