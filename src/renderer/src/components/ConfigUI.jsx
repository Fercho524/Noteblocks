import React from 'react';
import { Sidebar } from 'primereact/sidebar';

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ScrollPanel } from 'primereact/scrollpanel';


function ConfigUI({ visible, setVisible }) {
    return (
        <div className="card flex justify-content-center">
            <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
                <h1>Configuración</h1>
                <Splitter style={{ height: '75vh' }}>
                    <SplitterPanel size={40} className="flex align-items-center justify-content-center">Panel 1</SplitterPanel>
                    <SplitterPanel size={60} className="flex align-items-center justify-content-center">Panel 2</SplitterPanel>
                </Splitter>
            </Sidebar>
        </div>
    );
}

export default ConfigUI;
