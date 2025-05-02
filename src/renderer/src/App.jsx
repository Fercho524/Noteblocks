import { useState, useEffect, useRef } from 'react'

import 'primeicons/primeicons.css';
import "primereact/resources/themes/viva-dark/theme.css"

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import NotebookSidebar from './components/NotebookSidebar';
import NoteSidebar from './components/NoteSidebar';
import EditorMarkdown from './components/EditorView';


function App() {
  // Tabs
  const [tabs, setTabs] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);

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
          <EditorMarkdown tabs={tabs} setTabs={setTabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </SplitterPanel>
      </Splitter>
      <ConfirmDialog />
    </>
  );
}

export default App