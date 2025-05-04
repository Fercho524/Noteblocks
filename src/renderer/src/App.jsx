import { useState, useEffect, useRef } from 'react'
import { PrimeReactContext } from 'primereact/api';

import 'primeicons/primeicons.css';
import "primereact/resources/themes/viva-dark/theme.css"

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import NotebookSidebar from './components/NotebookSidebar';
import NoteSidebar from './components/NoteSidebar';
import EditorMarkdown from './components/EditorView';

// Dark only
import { abyss } from '@uiw/codemirror-theme-abyss';
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { copilot} from '@uiw/codemirror-theme-copilot'
import { atomone } from '@uiw/codemirror-theme-atomone';
import { aura} from '@uiw/codemirror-theme-aura'
import { dracula} from '@uiw/codemirror-theme-dracula'
import {monokai} from '@uiw/codemirror-theme-monokai'
import { nord} from '@uiw/codemirror-theme-nord'
import { tokyoNightStorm} from '@uiw/codemirror-theme-tokyo-night-storm'

// light
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';

// Both
import { duotoneLight,duotoneDark} from '@uiw/codemirror-theme-duotone'
import { materialLight,materialDark} from '@uiw/codemirror-theme-material'
import { vscodeLight,vscodeDark} from '@uiw/codemirror-theme-vscode'
import { xcodeLight,xcodeDark} from '@uiw/codemirror-theme-xcode'
import { basicDark,basicLight} from '@uiw/codemirror-theme-basic'
import { gruvboxLight,gruvboxDark} from '@uiw/codemirror-theme-gruvbox-dark'
import { tokyoNight} from '@uiw/codemirror-theme-tokyo-night'


function App() {
  // Tabs
  const [tabs, setTabs] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);

  const [appTheme, setAppTheme] = useState()
  const [sintaxTheme,setSintaxTheme] = useState(andromeda)

  // const { changeTheme } = useContext(PrimeReactContext);



  // Avoid Default Keybindings
  useEffect(() => {
    const closeTabDefault = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'w') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', closeTabDefault);
    return () => document.removeEventListener('keydown', closeTabDefault);
  });

  return (
    <>
      <Splitter style={{ height: '100vh' }}>
        {/* Notebooks */}
        <SplitterPanel className="flex align-items-center justify-content-center" size={17} minSize={10}>
          <NotebookSidebar setTabs={setTabs} />
        </SplitterPanel>
        {/* Notes and Files */}
        <SplitterPanel className="flex align-items-center justify-content-center" size={18} minSize={10}>
          <NoteSidebar tabs={tabs} setTabs={setTabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </SplitterPanel>
        {/* Editor */}
        <SplitterPanel size={65}>
          <EditorMarkdown tabs={tabs} setTabs={setTabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex} sintaxTheme={sintaxTheme} setSintaxTheme={setSintaxTheme} appTheme={appTheme} setAppTheme={setAppTheme} />
        </SplitterPanel>
      </Splitter>
      <ConfirmDialog />
    </>
  );
}

export default App