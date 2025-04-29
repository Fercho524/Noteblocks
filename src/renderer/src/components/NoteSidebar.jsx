import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { VirtualScroller } from 'primereact/virtualscroller';

import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ContextMenu } from 'primereact/contextmenu';


function NoteSidebar({ tabs, setTabs, activeIndex, setActiveIndex }) {
    const [files, setFiles] = useState([]);
    const [fileFilter, setFileFilter] = useState("")

    const [selectedFilePath, setSelectedFilePath] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("")
    const [newFilename, setNewFilename] = useState("")


    // Confirm Post message
    const toast = useRef(null);
    const newFilenameRef = useRef("");

    // Utils
    const getFullPath = async (fileName) => {
        const currentDir = await window.api.getCurrentDir();
        const filePath = `${currentDir}/${fileName}`;

        return { currentDir, filePath }
    }

    // File Loading and Filtering
    const loadFiles = async () => {
        const { files } = await window.api.getDirectoryData();

        if (fileFilter != "") {
            const filtered = files.filter(f => f.toLowerCase().includes(fileFilter.toLowerCase()));
            setFiles(filtered)
        } else {
            setFiles(files);
        }
    };

    // Open File and pin in tabs
    const onFileClick = async (fileName) => {
        const { currentDir, filePath } = await getFullPath(fileName)
        const content = await window.api.readFile(filePath);

        const newTab = {
            key: uuidv4(),
            filePath: filePath,
            fileDir: currentDir,
            title: fileName,
            content: content
        };

        setTabs(prevTabs => {
            // Verifica si ya existe una pestaña con ese archivo (por filePath, o por título si prefieres)
            const existingIndex = prevTabs.findIndex(tab => tab.filePath === newTab.filePath);

            if (existingIndex !== -1) {
                // Ya existe, enfoca esa
                setActiveIndex(existingIndex);
                return prevTabs;
            }

            const updatedTabs = [...prevTabs, newTab];

            // Enfoca la nueva pestaña al final
            setActiveIndex(updatedTabs.length - 1);

            return updatedTabs;
        });
    };

    // Open Context menu
    const onRightClick = async (event, file) => {
        if (cm.current) {
            const { currentDir, filePath } = await getFullPath(file)
            setSelectedFilePath(filePath);
            setSelectedFileName(file)
            console.log(filePath)
            console.log(file)
            cm.current.show(event);
        }
    };

    // Context Menu Actions
    const showRenameConfirm = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Rename file',
            defaultFocus: 'accept',
            accept: async () => {
                const oldPath = selectedFilePath;
                const newName = newFilenameRef.current;
                const { currentDir, filePath: newPath } = await getFullPath(newName);
                // Rename on disk
                await window.api.renameItem(oldPath, newPath);
                // Update file list
                await loadFiles();
                // Update tabs state: rename in open tabs
                setTabs(prev => {
                    const idx = prev.findIndex(tab => tab.filePath === oldPath);
                    const updated = prev.map(tab =>
                        tab.filePath === oldPath
                            ? { ...tab, filePath: newPath, fileDir: currentDir, title: newName }
                            : tab
                    );
                    // If the renamed tab was active, keep focus
                    if (idx !== -1) {
                        setActiveIndex(idx);
                    }
                    return updated;
                });
                toast.current && toast.current.show({ severity: 'success', summary: 'Renamed', detail: `"${selectedFileName}" → "${newName}"` });
            },
            reject: () => { },
            icon: 'pi pi-pencil',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <InputText
                        defaultValue={selectedFileName}
                        placeholder="Nuevo nombre"
                        disabled={false}
                        onChange={(e) => {
                            setNewFilename(e.target.value);
                            newFilenameRef.current = e.target.value;
                        }}
                    />
                </div>
            )
        });
    };

    const showDeleteConfirm = () => {
        confirmDialog({
            message: 'Do you want to delete this note?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                const pathToDelete = selectedFilePath;
                await window.api.deleteItem(pathToDelete);
                await loadFiles();
                // Remove from tabs
                setTabs(prev => {
                    const idx = prev.findIndex(tab => tab.filePath === pathToDelete);
                    const updated = prev.filter(tab => tab.filePath !== pathToDelete);
                    // Adjust activeIndex
                    if (idx !== -1) {
                        if (updated.length === 0) {
                            setActiveIndex(-1);
                        } else if (activeIndex >= updated.length) {
                            setActiveIndex(updated.length - 1);
                        } else if (activeIndex > idx) {
                            setActiveIndex(activeIndex - 1);
                        }
                    }
                    return updated;
                });
                toast.current && toast.current.show({ severity: 'info', summary: 'Deleted', detail: selectedFileName });
            },
            reject: () => { },
        });
    };

    const showCreateConfirm = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Create file',
            defaultFocus: 'accept',
            accept: async () => {
                const newName = newFilenameRef.current;
                const { currentDir, filePath: newPath } = await getFullPath(newName);
                console.log(newPath)
                // Create directory
                await window.api.createFile(newPath)
                // Update file list
                await loadFiles();


                // Open File in new tab
                const newTab = {
                    key: uuidv4(),
                    filePath: newPath,
                    fileDir: currentDir,
                    title: newName,
                    content: ""
                };
        
                setTabs(prevTabs => {
                    // Verifica si ya existe una pestaña con ese archivo (por filePath, o por título si prefieres)
                    const existingIndex = prevTabs.findIndex(tab => tab.filePath === newTab.filePath);
        
                    if (existingIndex !== -1) {
                        // Ya existe, enfoca esa
                        setActiveIndex(existingIndex);
                        return prevTabs;
                    }
        
                    const updatedTabs = [...prevTabs, newTab];
        
                    // Enfoca la nueva pestaña al final
                    setActiveIndex(updatedTabs.length - 1);
        
                    return updatedTabs;
                });


                toast.current && toast.current.show({ severity: 'success', summary: 'Create', detail: newName });
            },
            reject: () => { },
            icon: 'pi pi-pencil',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <InputText
                        placeholder="Nuevo archivo"
                        disabled={false}
                        onChange={(e) => {
                            setNewFilename(e.target.value);
                            newFilenameRef.current = e.target.value;
                        }}
                    />
                </div>
            )
        });
    };

    // Context Menu
    const cm = useRef(null);
    const items = [
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: showDeleteConfirm
        },
        {
            label: 'Rename',
            icon: 'pi pi-file-edit',
            command: showRenameConfirm
        }
    ];


    // When Current Dir changes files update
    useEffect(() => {
        loadFiles();
        const listener = () => loadFiles();
        window.addEventListener('directory-changed', listener);
        return () => window.removeEventListener('directory-changed', listener);
    }, []);

    // File update when filter change
    useEffect(() => {
        loadFiles();
    }, [fileFilter]);

    // Renamed File value
    useEffect(() => {
        // Solo inicializar si aún está vacío
        if (newFilename === "") {
            setNewFilename(selectedFileName);
        }
    }, [selectedFileName]);

    // useEffect(() => {
    //     console.log('Valor actualizado:', newFilename);
    // }, [newFilename]);


    return (
        <div className="card flex justify-content-center" style={{ height: '98%', width: '90%', position: 'relative' }}>
            <div style={{ margin: '1rem', width: '100%' }} className="p-inputgroup flex-1">
                <InputText placeholder="Search a note"
                    onChange={(e) => setFileFilter(e.target.value)}
                />
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
                            onContextMenu={(event) => onRightClick(event, item)}
                        >
                            <i className="pi pi-file" style={{ fontSize: '1rem', margin: '0 0.5rem' }} />
                            <span>{item}</span>
                        </div>
                    );
                }}
            />

            <Button
                icon="pi pi-file-edit"
                className="p-button-rounded p-button-primary"
                style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    zIndex: 10
                }}
                onClick={showCreateConfirm}
                tooltip="Nuevo archivo"
                tooltipOptions={{ position: 'left' }}
            />

            <Toast ref={toast} />
            <ContextMenu model={items} ref={cm} breakpoint="767px" />
        </div>

    );
}

export default NoteSidebar;