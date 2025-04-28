import 'primeicons/primeicons.css';
import "primereact/resources/themes/soho-dark/theme.css";

import React, { useState, useEffect } from 'react';

import { Splitter, SplitterPanel } from 'primereact/splitter';

import NotebookSidebar from './components/NotebookSidebar';
import NoteSidebar from './components/NoteSidebar';
import EditorMarkdown from './components/EditorView';
import MDToolbar from './components/MDToolbar';


function App() {
  return (
    <Splitter style={{ height: '100vh' }}>
      {/* Notebooks */}
      <SplitterPanel className="flex align-items-center justify-content-center" size={17} minSize={10}>
        <NotebookSidebar />
      </SplitterPanel>
      {/* Notes and Files */}
      <SplitterPanel className="flex align-items-center justify-content-center" size={18} minSize={10}>
        <NoteSidebar />
      </SplitterPanel>
      {/* Editor */}
      <SplitterPanel size={65}>
        <EditorMarkdown/>
      </SplitterPanel>
    </Splitter>
  );
}

export default App
