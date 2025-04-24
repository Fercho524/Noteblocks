import fs from 'fs';
import os from 'os';

import crypto from 'crypto';
import { join } from 'path';

import { app, shell, BrowserWindow, Menu, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '..','rendered','index.html')}`);

  }
}


app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.fercho524.noteblocks')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('ping', () => console.log('pong'))


let currentDir = ""

// File Functions
ipcMain.handle('read-file', (ev, fileName) => {
  return fs.readFileSync(path.join(currentDir, fileName), 'utf-8');
});

ipcMain.handle('save-file', (ev, fileName, content) => {
  fs.writeFileSync(path.join(currentDir, fileName), content, 'utf-8');
  return { success: true };
});

ipcMain.handle('create-file', (ev, name) => {
  fs.writeFileSync(path.join(currentDir, name), '', 'utf-8');
});

ipcMain.handle('rename-item', (ev, oldName, newName) => {
  fs.renameSync(path.join(currentDir, oldName), path.join(currentDir, newName));
});


// Directory Management
ipcMain.handle('create-directory', (ev, name) => {
  fs.mkdirSync(path.join(currentDir, name));
});

ipcMain.handle('delete-item', (ev, name) => {
  const p = path.join(currentDir, name);
  if (fs.lstatSync(p).isDirectory()) fs.rmdirSync(p, { recursive: true });
  else fs.unlinkSync(p);
});

ipcMain.handle('get-directory-data', () => {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  const dirs = entries.filter(e => e.isDirectory()).map(e => e.name);
  const files = entries.filter(e => e.isFile() && /\.(txt|md)$/i.test(e.name)).map(e => e.name);
  return { dirs, files, currentDir };
});

ipcMain.handle('change-directory', (ev, name) => {
  const target = name === '..' ? path.dirname(currentDir) : path.join(currentDir, name);
  if (!ensureInsideBase(target)) return;
  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    currentDir = target;
    config.currentDir = currentDir;
    saveConfig();
  }
});