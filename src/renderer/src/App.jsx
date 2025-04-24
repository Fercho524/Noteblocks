import React, { useState, useEffect } from 'react';
import ConfigToolbar from './components/ConfigToolbar';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ScrollPanel } from 'primereact/scrollpanel';
import EditorView from './components/EditorView';


import "primereact/resources/themes/soho-dark/theme.css";
import 'primeicons/primeicons.css';

import { Button } from 'primereact/button';

import { Toolbar } from 'primereact/toolbar';

import mainIcon from './images/logo.svg'
import NotebookSidebar from './components/NotebookSidebar';


function App() {
  const [files, setFiles] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    window.api.getFiles('/home/darkplayer/Documentos/Notas').then(setFiles);
  }, []);



  return (
    <Splitter style={{ height: '100vh' }}>
      <SplitterPanel className="flex align-items-center justify-content-center" size={15} minSize={10}>
        <NotebookSidebar />
      </SplitterPanel>

      <SplitterPanel className="flex align-items-center justify-content-center" size={15} minSize={10}>
        Notes
      </SplitterPanel>

      <SplitterPanel size={70}>

        <Splitter layout="vertical">



          <SplitterPanel size={93}>
            <EditorView />
          </SplitterPanel>

          <SplitterPanel className="flex align-items-center justify-content-center" size={7}>
            <Toolbar start={"fd"} end={"endContent"} center={"Center"} style={{ width: "100%" }} />

          </SplitterPanel>

        </Splitter>

      </SplitterPanel>

    </Splitter>
  );
}

export default App
