import fs from 'fs';
import os from 'os';

import { join } from 'path';


function getUserDocumentsDir() {
    const homeDir = os.homedir();

    // En Windows típicamente: C:\Users\<user>\Documents
    // En Linux: /home/<user>/Documentos o /Documents
    if (process.platform === 'win32') {
        return path.join(homeDir, 'Documents');
    } else {
        const docsLinux = path.join(homeDir, 'Documentos');
        return fs.existsSync(docsLinux)
            ? docsLinux
            : path.join(homeDir, 'Documents'); // fallback si no existe
    }
}

function loadConfig() {
    try {
        if (fs.existsSync(configPath)) {
            return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        }
    } catch (e) {
        console.error('Config inválido, recreando...', e);
    }

    const defaultDir = getUserDocumentsDir();

    const defaultConfig = {
        currentOpenedFiles: [],
        currentFile: '',
        favoriteDirs: [defaultDir],
        currentBaseDir: defaultDir,
        currentDir: defaultDir,
        fileHistory: [],
        globalThemeCSSPath: '',
        editorThemeCSSPath: '',
        editorMonospaceFont: '',
        editorLanguage: '',
        dateFormat: '',
        sintaxTheme: '',
        pdfSize: 'A4',
        editorFontSize: '',
        autosave: true,
        keybindings: [
            { keys: ['ctrl', 's'], action: 'save-file' },
            { keys: ['ctrl', 'v'], action: 'paste-image' }
        ]
    };

    fs.mkdirSync(userDataPath, { recursive: true });
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
    return defaultConfig;
}

function saveConfig(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}