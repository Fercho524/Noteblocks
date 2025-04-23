import React, { useState, useEffect } from 'react';
import ConfigToolbar from './components/ConfigToolbar';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';



function App() {
  const [files, setFiles] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    window.api.getFiles('/home/darkplayer/Documentos/Notas').then(setFiles);
  }, []);

  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <Button label="Click" icon="pi pi-plus" onClick={e => setCount(count + 1)}></Button>
      <div className="text-2xl text-900 mt-3">{count}</div>
      <Calendar value={date} onChange={(e) => setDate(e.value)} />
    </div>
  );
}

export default App
