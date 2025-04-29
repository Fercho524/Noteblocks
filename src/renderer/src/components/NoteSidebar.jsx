import React, { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { VirtualScroller } from 'primereact/virtualscroller';

import { classNames } from 'primereact/utils';


function NoteSidebar() {
    const [files, setFiles] = useState([]);

    const loadFiles = async () => {
        const { files } = await window.api.getDirectoryData();
        setFiles(files);
    };

    const onFileClick = async (fileName) => {
        const currentDir = await window.api.getCurrentDir();
        const filePath = `${currentDir}/${fileName}`;
        console.log(filePath)

        window.dispatchEvent(
            new CustomEvent('file-selected', { detail: { filePath, fileName } })
        );
    };

    useEffect(() => {
        loadFiles();
        const listener = () => loadFiles();
        window.addEventListener('directory-changed', listener);
        return () => window.removeEventListener('directory-changed', listener);
    }, []);

    return (
        <div className="card flex justify-content-center" style={{ height: '88%', width: '90%' }}>
            <div style={{ margin: '1rem', width: '100%' }} className="p-inputgroup flex-1">
                <InputText placeholder="Search a note" />
                <Button icon="pi pi-search" className="p-button-primary" />
            </div>
            <VirtualScroller
                items={files}
                itemSize={50}
                className="border-1 surface-border border-round"
                style={{ width: '100%', margin: '1rem', marginBottom: '2rem', height: '100%' }}
                itemTemplate={(item, options) => {
                    const cn = classNames('flex align-items-center note-selector', {
                        'surface-hover': options.odd
                    });
                    return (
                        <div
                            className={cn}
                            style={{ height: options.props.itemSize + 'px', cursor: 'pointer' }}
                            onClick={() => onFileClick(item)}
                        >
                            <i className="pi pi-file" style={{ fontSize: '1rem', margin: '0 0.5rem' }} />
                            <span>{item}</span>
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default NoteSidebar;