const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const setupDatabase = require(path.join(__dirname, 'src', 'database', 'knex'));

// Keep a global reference to the window object and the database connection
let win;
let db;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  win.loadURL(startUrl);
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

async function setupDatabaseAndIpc() {
  const userDataPath = app.getPath('userData');
  
  const dbInstance = setupDatabase(userDataPath);
  db = dbInstance.db;

  const initResult = await dbInstance.initialize();
  dialog.showMessageBox({
    type: initResult.success ? 'info' : 'error',
    title: 'Database Initialization',
    message: initResult.message
  });

  if (!initResult.success) {
    // Handle DB initialization failure
  }

  // --- IPC Handlers ---
  ipcMain.handle('db:get-pictograms', async () => {
    try {
      return await db('pictograms').select('*');
    } catch (error) {
      console.error('Error fetching pictograms:', error);
      return [];
    }
  });

  ipcMain.handle('db:create-pictogram', async (event, pictogram) => {
    try {
      const [id] = await db('pictograms').insert(pictogram);
      return { id, ...pictogram };
    } catch (error) {
      console.error('Error creating pictogram:', error);
      return null;
    }
  });

  ipcMain.handle('db:update-pictogram', async (event, id, pictogram) => {
    try {
      await db('pictograms').where('id', id).update(pictogram);
      return { id, ...pictogram };
    } catch (error) {
      console.error('Error updating pictogram:', error);
      return null;
    }
  });

  ipcMain.handle('db:delete-pictogram', async (event, id) => {
    try {
      await db('pictograms').where('id', id).del();
      return id;
    } catch (error) {
      console.error('Error deleting pictogram:', error);
      return null;
    }
  });

  // --- IPC Handlers for Phrases ---
  ipcMain.handle('db:get-phrases', async () => {
    try {
      return await db('phrases').select('*');
    } catch (error) {
      console.error('Error fetching phrases:', error);
      return [];
    }
  });

  ipcMain.handle('db:create-phrase', async (event, phrase) => {
    try {
      const [id] = await db('phrases').insert(phrase);
      return { id, ...phrase };
    } catch (error) {
      console.error('Error creating phrase:', error);
      return null;
    }
  });

  ipcMain.handle('db:update-phrase', async (event, id, phrase) => {
    try {
      await db('phrases').where('id', id).update(phrase);
      return { id, ...phrase };
    } catch (error) {
      console.error('Error updating phrase:', error);
      return null;
    }
  });

  ipcMain.handle('db:delete-phrase', async (event, id) => {
    try {
      await db('phrases').where('id', id).del();
      return id;
    } catch (error) {
      console.error('Error deleting phrase:', error);
      return null;
    }
  });

  // ... (rest of the IPC handlers are okay)
}

app.on('ready', async () => {
  await setupDatabaseAndIpc();
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
