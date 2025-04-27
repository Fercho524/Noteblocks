import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';


function RepoSelector({ visible, setVisible }) {
    const [value,setValue] = useState("");
    
    return (
        <div className="card flex justify-content-center">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Select Base Directory</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <InputText value={value} onChange={(e) => setValue(e.target.value)} />
            </Sidebar>
        </div>
    );
}

export default RepoSelector;
