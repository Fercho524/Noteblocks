import { useState, useEffect, useRef, Fragment } from 'react'

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';

import GraphView from './GraphView';
import RepoSelector from './RepoSelector'
import ConfigUI from './ConfigUI';


export default function NotebookSidebar({setTabs}) {
    // Directorios
    const [dirs, setDirs] = useState([])

    const loadDirectoryData = async () => {
        const { dirs: newDirs } = await window.api.getDirectoryData()
        setDirs(newDirs)
    }

    const handleDirClick = async (name) => {
        await window.api.changeDirectory(name)
        await loadDirectoryData()
        window.dispatchEvent(new CustomEvent('directory-changed'))
    }

    useEffect(() => {
        loadDirectoryData()
        const listener = () => loadDirectoryData()
        window.addEventListener('directory-changed', listener)
        return () => window.removeEventListener('directory-changed', listener)
    }, [])

    // Repo Sidebar 
    const [repoSelectVisible, setRepoSelectVisible] = useState(false)

    // Graph Screen
    const [graphScreenVisible, setGraphScreenVisible] = useState(false);

    // Config Screen
    const [configVisible, setConfigVisible] = useState(false);

    // Etiquetas
    const [tags, setTags] = useState(["comida", "tareas", "peliculas"])
    const tagsColors = ["success", "info", "warning", "danger", "primary", "secondary", "contrast"]

    return (
        <Splitter style={{ height: '100vh' }} layout="vertical">
            {/* Places */}
            <SplitterPanel style={{ overflowY: "scroll" }} className="flex align-items-center justify-content-center" size={25}>
                <Card style={{ padding: "0px" }} subTitle="Noteblocks">
                    <div style={{ cursor: "pointer" }} >
                        <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-file'></i>Home
                    </div>
                    <div style={{ cursor: "pointer" }} >
                        <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-search'></i>All notes
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => setGraphScreenVisible(true)} >
                        <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-sitemap'></i>Graph View
                        <GraphView visible={graphScreenVisible} setVisible={setGraphScreenVisible} />
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => setRepoSelectVisible(true)}>
                        <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-folder'></i>Repositories
                        <RepoSelector visible={repoSelectVisible} setVisible={setRepoSelectVisible} setTabs={setTabs}/>
                    </div>
                </Card>
            </SplitterPanel>
            {/* Notebooks */}
            <SplitterPanel
                style={{ overflowY: 'scroll' }}
                className="flex align-items-center justify-content-center"
                size={35}
            >
                <Card style={{ padding: '0px', width: '100%' }} subTitle="Notebooks">
                    <Fragment>
                        <div onClick={() => handleDirClick('..')} style={{ cursor: 'pointer' }}>
                            <i className="pi pi-arrow-up" style={{
                                paddingLeft: '0.9rem', fontSize: '0.7rem',
                                marginRight: '0.5rem', marginBottom: '0.2rem'
                            }} />
                            ..
                        </div>
                        <hr />
                    </Fragment>
                    {dirs.map(name => (
                        <Fragment key={name}>
                            <div onClick={() => handleDirClick(name)} style={{ cursor: 'pointer' }}>
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
            <SplitterPanel style={{ overflowY: "scroll" }} className="flex align-items-center justify-content-center" size={24}>
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
            </SplitterPanel>
            {/* Config Toolbar */}
            <SplitterPanel style={{ overflowY: "scroll" }} className="flex align-items-center justify-content-center" size={6}>
                <center>
                    <div>
                        <button onClick={() => setConfigVisible(true)} style={{ fontSize: '2rem', margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                            <i className="pi pi-cog text-2xl"></i>
                            <ConfigUI visible={configVisible} setVisible={setConfigVisible} />
                        </button>
                        <button style={{ fontSize: '2rem', margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                            <i className="pi pi-question-circle text-2xl"></i>
                        </button>
                        <button style={{ fontSize: '2rem', margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                            <i className="pi pi-folder text-2xl"></i>
                        </button>
                        <button style={{ fontSize: '2rem', margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                            <i className="pi pi-home text-2xl"></i>
                        </button>
                    </div>
                </center>
            </SplitterPanel>
        </Splitter>
    )
}