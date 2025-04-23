import { useState } from 'react'

function ConfigToolbar() {
  return (
    <div className="toolbar">
      <button className="btn btn-default" id="openSettingsBtn">
        <span className="icon icon-cog"></span>
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
