import { useState, useEffect, useRef, useContext } from 'react'
import { PrimeReactContext } from 'primereact/api';

import 'primeicons/primeicons.css';

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import NotebookSidebar from './components/NotebookSidebar';
import NoteSidebar from './components/NoteSidebar';
import EditorMarkdown from './components/EditorView';

import 'primereact/resources/themes/soho-dark/theme.css'

function App() {
  // Tabs
  const [tabs, setTabs] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);

  const [appTheme, setAppTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'lara-dark-blue.css';
  });

  const [sintaxTheme, setSintaxTheme] = useState(() => {
    return localStorage.getItem('sintaxTheme') || "andromeda";
  });

  const { changeTheme } = useContext(PrimeReactContext);


  // const getCurrentThemeFromHref = () => {
  //   const themeLink = document.getElementById('theme-link');
  //   const href = themeLink?.getAttribute('href');
  //   if (!href) return '';
  //   const parts = href.split('/');
  //   console.log(parts[parts.length - 1])
  //   return parts[parts.length - 1];
  // };


  // useEffect(() => {
  //   const ensureThemeLinkExists = () => {
  //     let themeLink = document.getElementById('theme-link');
  //     if (!themeLink) {
  //       themeLink = document.createElement('link');
  //       themeLink.id = 'theme-link';
  //       themeLink.rel = 'stylesheet';
  //       // Establece un tema inicial provisional para evitar carga en blanco
  //       themeLink.href = `styles/${appTheme}`;
  //       document.head.appendChild(themeLink);
  //     }
  //     return themeLink;
  //   };

  //   const currentTheme = getCurrentThemeFromHref() || 'lara-dark-blue.css';
  //   ensureThemeLinkExists(); // Asegura que el link exista antes de cambiar el tema

  //   changeTheme(currentTheme, appTheme, 'theme-link', () => {
  //     localStorage.setItem('appTheme', appTheme);
  //   });
  // }, [appTheme]);


  useEffect(() => {
    localStorage.setItem('sintaxTheme', sintaxTheme);
  }, [sintaxTheme]);

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