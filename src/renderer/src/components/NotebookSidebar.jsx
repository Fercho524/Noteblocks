import { useState, useEffect, useRef, Fragment } from 'react'

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';

import GraphView from './GraphView';
import RepoSelector from './RepoSelector'
import ConfigUI from './ConfigUI';

import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ContextMenu } from 'primereact/contextmenu';

import { getFullPath } from '../utils/getFullPath';

import { Button } from 'primereact/button';


export default function NotebookSidebar({ setTabs }) {
    // Directorios
    const [dirs, setDirs] = useState([])

    // Selecction
    const [selectedFilePath, setSelectedFilePath] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("")

    // Rename or create
    const [newFilename, setNewFilename] = useState("")

    // Confirm Post message
    const toast = useRef(null);
    const newFilenameRef = useRef("");

    // Repo Sidebar 
    const [repoSelectVisible, setRepoSelectVisible] = useState(false)

    // Graph Screen
    const [graphScreenVisible, setGraphScreenVisible] = useState(false);

    // Config Screen
    const [configVisible, setConfigVisible] = useState(false);

    // Etiquetas
    const [tags, setTags] = useState(["comida", "tareas", "peliculas"])
    const tagsColors = ["success", "info", "warning", "danger", "primary", "secondary", "contrast"]


    // Context Menu Actions 
    const showDeleteConfirm = () => {
        confirmDialog({
            message: 'Do you want to delete this notebook?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                const pathToDelete = selectedFilePath;
                console.log(selectedFilePath)
                await window.api.deleteItem(pathToDelete);
                await loadDirectoryData()
                toast.current && toast.current.show({ severity: 'info', summary: 'Deleted', detail: selectedFileName });
            },
            reject: () => { },
        });
    };

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
                await loadDirectoryData()
                toast.current && toast.current.show({ severity: 'info', summary: 'Renamed', detail: selectedFileName });
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
                await window.api.createDirectory(newPath)
                // Update file list
                await loadDirectoryData()
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


    // Directory Selection
    const loadDirectoryData = async () => {
        const { dirs: newDirs } = await window.api.getDirectoryData()
        setDirs(newDirs)
    }

    const handleDirClick = async (name) => {
        await window.api.changeDirectory(name)
        await loadDirectoryData()
        window.dispatchEvent(new CustomEvent('directory-changed'))
    }

    const onRightClick = async (event, file) => {
        if (cm.current) {
            const { currentDir, filePath } = await getFullPath(file)
            setSelectedFilePath(filePath);
            setSelectedFileName(file)
            cm.current.show(event);
        }
    };

    // On Directory Change
    useEffect(() => {
        loadDirectoryData()
        const listener = () => loadDirectoryData()
        window.addEventListener('directory-changed', listener)
        return () => window.removeEventListener('directory-changed', listener)
    }, [])


    return (
        <>
            <Splitter style={{ height: '100vh' }} layout="vertical">
                {/* Places */}
                <SplitterPanel
                    style={{
                        overflowY: "scroll",
                        width: "100%",
                        padding: "0px"
                    }}
                    className="flex align-items-center justify-content-center"
                    size={25}
                >
                    <Card
                        style={{
                            padding: "0px",
                            width: "100%"
                        }}
                        subTitle="Noteblocks"
                    >
                        {/* Home Dir Reset */}
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={
                                async () => {
                                    await window.api.resetCurrentDir();
                                    loadDirectoryData()
                                    window.dispatchEvent(new CustomEvent('directory-changed'))
                                }
                            }
                        >
                            <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-home'></i>Home

                        </div>
                        {/* List All Notes */}
                        {/* <div style={{ cursor: "pointer" }} >
                            <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-search'></i>All notes
                        </div> */}
                        {/* Graph View */}
                        {/* <div style={{ cursor: "pointer" }} onClick={() => setGraphScreenVisible(true)} >
                            <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-sitemap'></i>Graph View
                            <GraphView visible={graphScreenVisible} setVisible={setGraphScreenVisible} />
                        </div> */}
                        {/* Change Vault */}
                        <div style={{ cursor: "pointer" }} onClick={() => setRepoSelectVisible(true)}>
                            <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-folder'></i>Repositories
                            <RepoSelector visible={repoSelectVisible} setVisible={setRepoSelectVisible} setTabs={setTabs} />
                        </div>
                    </Card>
                </SplitterPanel>
                {/* Notebooks */}
                <SplitterPanel
                    style={{ overflowY: 'scroll' }}
                    className="flex align-items-center justify-content-center"
                    size={65}
                >
                    <Card style={{ padding: '0px', width: '100%', margin: "0px" }}>
                        {/* Create Dir Button */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Notebooks</span>
                            <Button
                                icon="pi pi-folder-plus"
                                className="p-button-rounded p-button-primary p-button-sm"
                                onClick={showCreateConfirm}
                                tooltip="Nuevo directorio"
                                tooltipOptions={{ position: 'top' }}
                            />
                        </div>
                        {/* Up Directory .. */}
                        <Fragment>
                            <div onClick={() => handleDirClick('..')} style={{ cursor: 'pointer' }}>
                                <i className="pi pi-arrow-up" style={{
                                    paddingLeft: '0.9rem', fontSize: '0.7rem',
                                    marginRight: '0.5rem', marginBottom: '0.2rem'
                                }} />
                                ..
                            </div>
                        </Fragment>
                        {/* Directories */}
                        {dirs.map(name => (
                            <Fragment key={name}>
                                <div
                                    onClick={() => handleDirClick(name)}
                                    style={{ cursor: 'pointer' }}
                                    onContextMenu={(event) => onRightClick(event, name)}
                                >
                                    <i className="pi pi-folder" style={{
                                        paddingLeft: '0.9rem', fontSize: '0.7rem',
                                        marginRight: '0.5rem', marginBottom: '0.2rem'
                                    }} />
                                    {name}
                                </div>
                                <hr />
                            </Fragment>
                        ))}
                    </Card>
                </SplitterPanel>
                {/* Tags */}
                {/* <SplitterPanel style={{ overflowY: "scroll" }} className="flex align-items-center justify-content-center" size={25}>
                    <Card style={{ width: "100%", overflowY: "scroll" }} subTitle="Etiquetas">
                        <div className="card flex flex-wrap justify-content-center gap-2">
                            {tags.map(tag => {
                                const randomSeverity = tagsColors[Math.floor(Math.random() * tagsColors.length)];
                                return (
                                    <Tag
                                        key={tag}
                                        style={{ margin: "0.2rem" }}
                                        severity={randomSeverity}
                                        value={tag}
                                    />
                                );
                            })}
                        </div>
                    </Card>
                </SplitterPanel> */}
                {/* Config Toolbar */}
                <SplitterPanel style={{ overflowY: "scroll" }} className="flex align-items-center justify-content-center" size={10}>
                    <center>
                        <div>
                            {/* Show Config */}
                            <button onClick={() => setConfigVisible(true)} style={{ fontSize: '2rem', margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                                <i className="pi pi-cog text-2xl"></i>
                                <ConfigUI visible={configVisible} setVisible={setConfigVisible} />
                            </button>
                            {/* Show Documentation Online */}
                            <button
                                style={{ fontSize: '2rem', margin: "0.5rem" }}
                                onClick={() => {
                                    window.api.openExternalLink('https://es.wikipedia.org');
                                }}
                                className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200"
                            >
                                <i className="pi pi-question-circle text-2xl"></i>
                            </button>
                            {/* Open Current Directory */}
                            <button
                                onClick={async () => {
                                    const currentDir = await window.api.getCurrentDir();
                                    await window.api.openDirectory(currentDir);
                                }}
                                style={{ fontSize: '2rem', margin: "0.5rem" }}
                                className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200"
                            >
                                <i className="pi pi-folder text-2xl"></i>
                            </button>
                        </div>
                    </center>
                </SplitterPanel>
            </Splitter>

            {/* Alert Components */}
            <Toast ref={toast} />
            <ContextMenu model={items} ref={cm} breakpoint="767px" />
        </>
    )
}