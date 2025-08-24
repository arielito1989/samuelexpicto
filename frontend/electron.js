const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  console.log('Creando la ventana del navegador...');
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  console.log(`Intentando cargar la URL: ${startUrl}`);

  win.loadURL(startUrl);

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Error al cargar la URL: ${errorDescription} (Código: ${errorCode})`);
  });

  console.log('Abriendo las Herramientas de Desarrollo (DevTools)...');
  win.webContents.openDevTools();
}

console.log('Iniciando script de Electron...');

app.whenReady().then(() => {
  console.log('La aplicación está lista.');
  createWindow();
});

app.on('window-all-closed', () => {
  console.log('Todas las ventanas se han cerrado.');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  console.log('Aplicación activada.');
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
