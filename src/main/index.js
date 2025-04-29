import fs from 'fs';
import os from 'os';

import path, { join } from 'path';
import crypto from 'crypto';

import { app, shell, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import { loadConfig, saveConfig } from './config';


// Configuración
let config = loadConfig();

let currentDir = config.state.currentDir || '';
let selectedRepo = config.state.selectedRepo || '';

if (!selectedRepo && config.state.repositories.length > 0) {
  selectedRepo = config.state.repositories[0];
  currentDir = selectedRepo;
  config.state.selectedRepo = selectedRepo;
  config.state.currentDir = currentDir;
  saveConfig(config);
}

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
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow.show());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    // si no es la propia página de la app:
    if (url !== mainWindow.webContents.getURL()) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '..', 'rendered', 'index.html')}`);
  }
}

function ensureInsideRepo(target) {
  return target.startsWith(selectedRepo);
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


// App Config
ipcMain.handle('get-config', () => config);

ipcMain.handle('update-config', (ev, updates) => {
  config = { ...config, ...updates };
  saveConfig(config);
  return config;
});

// Cambiar repositorio (antes change-base-dir)
ipcMain.handle('change-repo', (ev, newRepo) => {
  if (config.state.repositories.includes(newRepo)) {
    selectedRepo = newRepo;
    currentDir = newRepo;
    config.state.selectedRepo = newRepo;
    config.state.currentDir = newRepo;
    saveConfig(config);
  }
  return { selectedRepo, currentDir };
});


// File Functions
ipcMain.handle('read-file', (ev, fileName) =>
  fs.readFileSync(path.join(fileName), 'utf-8')
);

ipcMain.handle('save-file', (ev, fileName, content) => {
  fs.writeFileSync(fileName, content, 'utf-8');
  return { success: true };
});

ipcMain.handle('create-file', (ev, name) => {
  fs.writeFileSync(path.join(name), '', 'utf-8');
});

ipcMain.handle('rename-item', (ev, oldName, newName) => {
  fs.renameSync(
    path.join(oldName),
    path.join(newName)
  );
});

ipcMain.handle('open-directory', async (event, dirPath) => {
  try {
    if (fs.existsSync(dirPath)) {
      await shell.openPath(dirPath); // Funciona tanto en Windows como en Linux
      return true;
    } else {
      throw new Error("Directory does not exist.");
    }
  } catch (err) {
    console.error("Error opening directory:", err);
    return false;
  }
});



// Directory Management
ipcMain.handle('get-current-dir', async () => {
  return currentDir;
});

ipcMain.handle('create-directory', (ev, name) => {
  fs.mkdirSync(path.join(name));
});

ipcMain.handle('delete-item', (ev, name) => {
  const p = path.join(name);
  if (fs.lstatSync(p).isDirectory()) fs.rmdirSync(p, { recursive: true });
  else fs.unlinkSync(p);
});

ipcMain.handle('get-directory-data', () => {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  const dirs = entries.filter(e => e.isDirectory()).map(e => e.name);
  const files = entries
    .filter(e => e.isFile() && /\.(txt|md)$/i.test(e.name))
    .map(e => e.name);
  return { dirs, files, currentDir };
});

ipcMain.handle('change-directory', (ev, name) => {
  const target =
    name === '..' ? path.dirname(currentDir) : path.join(currentDir, name);
  if (!ensureInsideRepo(target)) return;
  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    currentDir = target;
    config.state.currentDir = currentDir;
    saveConfig(config);
  }
  return { currentDir };
});

ipcMain.handle('reset-current-dir', (ev) => {
  currentDir = config.state.selectedRepo;
  config.state.currentDir = currentDir;
  saveConfig(config);
  return { currentDir };
});

// Markdown Functions
ipcMain.handle('save-clipboard-image', async (ev, base64Data) => {
  const resDir = path.join(currentDir, '.resources');
  if (!fs.existsSync(resDir)) fs.mkdirSync(resDir);
  const name = crypto.randomBytes(8).toString('hex') + '.png';
  const filePath = path.join(resDir, name);
  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
  return path.join('.resources', name).replace(/\\\\/g, '/');
});

ipcMain.handle('markdown-compile', (ev, html) => html);


// Context Menus
ipcMain.handle('show-dir-context-menu', (ev, name) => {
  const win = BrowserWindow.fromWebContents(ev.sender);
  const menu = Menu.buildFromTemplate([
    {
      label: 'Renombrar',
      click: () =>
        win.webContents.send('context-menu-action', {
          action: 'rename',
          name
        })
    },
    {
      label: 'Borrar',
      click: () =>
        win.webContents.send('context-menu-action', {
          action: 'delete',
          name
        })
    }
  ]);
  menu.popup({ window: win });
});

ipcMain.handle('show-file-context-menu', (ev, name) => {
  const win = BrowserWindow.fromWebContents(ev.sender);
  const menu = Menu.buildFromTemplate([
    {
      label: 'Renombrar',
      click: () =>
        win.webContents.send('context-menu-action', {
          action: 'rename',
          name
        })
    },
    {
      label: 'Borrar',
      click: () =>
        win.webContents.send('context-menu-action', {
          action: 'delete',
          name
        })
    }
  ]);
  menu.popup({ window: win });
});

// Fixes of Browser
ipcMain.handle('open-external-link', async (ev, url) => {
  await shell.openExternal(url);
});

ipcMain.handle('open-directory-dialog', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (canceled || filePaths.length === 0) {
    return null
  }
  return filePaths[0]
})