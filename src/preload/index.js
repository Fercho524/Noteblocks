import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  // Configuración
  getConfig: () => ipcRenderer.invoke('get-config'),
  updateConfig: (updates) => ipcRenderer.invoke('update-config', updates),
  changeRepo: (repo) => ipcRenderer.invoke('change-repo', repo),

  // Navegación de directorios
  getDirectoryData: () => ipcRenderer.invoke('get-directory-data'),
  changeDirectory: (name) => ipcRenderer.invoke('change-directory', name),
  getCurrentDir: () => ipcRenderer.invoke('get-current-dir'),

  // Archivos
  readFile: (fileName) => ipcRenderer.invoke('read-file', fileName),
  saveFile: (fileName, content) => ipcRenderer.invoke('save-file', fileName, content),
  createFile: (name) => ipcRenderer.invoke('create-file', name),
  renameItem: (oldName, newName) => ipcRenderer.invoke('rename-item', oldName, newName),
  createDirectory: (name) => ipcRenderer.invoke('create-directory', name),
  deleteItem: (name) => ipcRenderer.invoke('delete-item', name),

  // Markdown & recursos
  saveClipboardImage: (base64Data) => ipcRenderer.invoke('save-clipboard-image', base64Data),
  markdownCompile: (html) => ipcRenderer.invoke('markdown-compile', html),

  // Context menus
  showDirContextMenu: (name) => ipcRenderer.invoke('show-dir-context-menu', name),
  showFileContextMenu: (name) => ipcRenderer.invoke('show-file-context-menu', name),

  // Enlaces externos
  openExternalLink: (url) => ipcRenderer.invoke('open-external-link', url),
  openDirectoryDialog: () => ipcRenderer.invoke('open-directory-dialog')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('Error al exponer la API en preload:', error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
