const { app, BrowserWindow } = require('electron');
const { spawn } = require('node:child_process');

const server = spawn('python', ['./producer/server.py']);

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('index.html');
    // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    server.kill('SIGKILL');
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
        createWindow();
    }
})