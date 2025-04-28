import { useState } from 'react'
import ConfigUI from './ConfigUI';

function ConfigToolbar() {
  const [configVisible, setConfigVisible] = useState(false);

  return (
    <div className="toolbar">
      <button className="btn btn-default" id="openSettingsBtn" onClick={() => setConfigVisible(true)}>
        <span className="icon icon-folder"></span>
        
      </button>
      <button className="btn btn-default" id="openAbout">
        <span className="icon icon-help-circled"></span>
      </button>
      <button className="btn btn-default" id="openAbout">
        <span className="icon icon-folder"></span>
      </button>
      <button className="btn btn-default" id="openAbout">
        <span className="icon icon-home"></span>
      </button>
    </div>
  )
}

export default ConfigToolbar
