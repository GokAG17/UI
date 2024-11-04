const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, // Keep this true for security
      nodeIntegration: false,  // Set to false for security reasons
      webSecurity: false,      // This disables web security (CORS)
    },
  });

  // Load the index.html file from the dist directory
  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // Open the DevTools for debugging
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// Handle app closing
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
