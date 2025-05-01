import fs from 'fs';
import os from 'os';
import path from 'path';

const appName = 'Noteblocks';
const userDataPath = path.join(os.homedir(), '.noteblocks');
const configPath = path.join(userDataPath, 'config.json');



export function getUserCSS() {
    const editorCSSPath = path.join(userDataPath, 'editor.css');
    const indexCSSPath = path.join(userDataPath, 'index.css');

    return {
        indexCSSPath : fs.existsSync(indexCSSPath) ? indexCSSPath : null,
        editorCSS : fs.existsSync(editorCSSPath) ? indexCSSPath : null
    }
}

export function getUserDocumentsDir() {
    const homeDir = os.homedir();

    if (process.platform === 'win32') {
        return path.join(homeDir, 'Documents');
    } else {
        const docsLinux = path.join(homeDir, 'Documentos');
        return fs.existsSync(docsLinux)
            ? docsLinux
            : path.join(homeDir, 'Documents');
    }
}

export function loadConfig() {
    console.log(configPath)
    try {
        if (fs.existsSync(configPath)) {

            return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        }
    } catch (e) {
        console.error('Config inválido, recreando...', e);
    }

    const defaultDir = getUserDocumentsDir();

    const defaultConfig = {
        appname: appName,
        version: "0.0.0",
        state: {
            fixedTabs: [],
            currentFile: "",
            repositories: [],
            selectedRepo: "",
            currentDir: defaultDir,
            fileHistory: [],
            editorView: "split"
        },
        interface: {
            themeAutoDetect: true,
            themeVariant: "",
            themeAccent: "",
            language: "",
            autosave: true
        },
        editor: {
            dateFormat: "",
            pdfExportFormat: "",
            editorFontSize: "",
            monoSpaceFont: "",
            editorSintaxTheme: "",
            renderedMarkdownCustomCSS: "",
            spellChecker: ""
        },
        keybindings: [
            { keys: ["ctrl", "s"], action: "save-file" },
            { keys: ["ctrl", "v"], action: "paste-image" }
        ]
    };

    fs.mkdirSync(userDataPath, { recursive: true });
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
    return defaultConfig;
}

export function saveConfig(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}
