const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const setupDatabase = require('./src/database/knex');

// Keep a global reference to the window object and the database connection
let win;
let db;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Attach the preload script
      preload: path.join(__dirname, 'preload.js'),
      // It's recommended to keep contextIsolation true for security
      contextIsolation: true,
      // nodeIntegration should be false
      nodeIntegration: false,
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  win.loadURL(startUrl);

  // Open DevTools automatically for debugging
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

// --- Database and IPC Handlers ---

function setupDatabaseAndIpc() {
  const userDataPath = app.getPath('userData');
  const dbInstance = setupDatabase(userDataPath);
  db = dbInstance.db;

  // Run migrations to set up the database schema
  dbInstance.initialize();

  // --- IPC Handlers ---
  // This is our new "local API"
  ipcMain.handle('db:get-pictograms', async () => {
    try {
      const pictograms = await db('pictograms').select('*');
      return pictograms;
    } catch (error) {
      console.error('Error fetching pictograms:', error);
      return []; // Return empty array on error
    }
  });

  ipcMain.handle('db:create-pictogram', async (event, data) => {
    try {
      const [id] = await db('pictograms').insert(data);
      const newPictogram = await db('pictograms').where({ id }).first();
      return newPictogram;
    } catch (error) {
      console.error('Error creating pictogram:', error);
      return null;
    }
  });

  ipcMain.handle('db:update-pictogram', async (event, id, data) => {
    try {
      await db('pictograms').where({ id }).update(data);
      const updatedPictogram = await db('pictograms').where({ id }).first();
      return updatedPictogram;
    } catch (error) {
      console.error('Error updating pictogram:', error);
      return null;
    }
  });

  ipcMain.handle('db:delete-pictogram', async (event, id) => {
    try {
      await db('pictograms').where({ id }).del();
      return true;
    } catch (error) {
      console.error('Error deleting pictogram:', error);
      return false;
    }
  });

  // --- Phrase Handlers ---
  ipcMain.handle('db:get-phrases', async () => {
    try {
      const phrases = await db('phrases').select('*');
      return phrases;
    } catch (error) {
      console.error('Error fetching phrases:', error);
      return [];
    }
  });

  ipcMain.handle('db:create-phrase', async (event, data) => {
    try {
      const [id] = await db('phrases').insert(data);
      const newPhrase = await db('phrases').where({ id }).first();
      return newPhrase;
    } catch (error) {
      console.error('Error creating phrase:', error);
      return null;
    }
  });

  ipcMain.handle('db:update-phrase', async (event, id, data) => {
    try {
      await db('phrases').where({ id }).update(data);
      const updatedPhrase = await db('phrases').where({ id }).first();
      return updatedPhrase;
    } catch (error) {
      console.error('Error updating phrase:', error);
      return null;
    }
  });

  ipcMain.handle('db:delete-phrase', async (event, id) => {
    try {
      // TODO: Also delete the associated audio file from the filesystem
      await db('phrases').where({ id }).del();
      return true;
    } catch (error) {
      console.error('Error deleting phrase:', error);
      return false;
    }
  });

  // --- File System Handlers ---
  ipcMain.handle('fs:save-audio', async (event, base64Data) => {
    try {
      const userDataPath = app.getPath('userData');
      const audioFolderPath = path.join(userDataPath, 'audio');

      if (!fs.existsSync(audioFolderPath)) {
        fs.mkdirSync(audioFolderPath, { recursive: true });
      }

      const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
      const fileName = `audio_${Date.now()}.wav`;
      const filePath = path.join(audioFolderPath, fileName);

      fs.writeFileSync(filePath, buffer);

      return filePath;
    } catch (error) {
      console.error('Error saving audio file:', error);
      return null;
    }
  });

  ipcMain.handle('fs:read-audio', async (event, filePath) => {
    try {
      const data = fs.readFileSync(filePath);
      const base64Data = `data:audio/wav;base64,${data.toString('base64')}`;
      return base64Data;
    } catch (error) {
      console.error('Error reading audio file:', error);
      return null;
    }
  });
}


// --- App Lifecycle ---

app.on('ready', () => {
  setupDatabaseAndIpc();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});