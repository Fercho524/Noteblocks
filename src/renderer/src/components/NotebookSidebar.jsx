import React, { useState, useRef } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { VirtualScroller } from 'primereact/virtualscroller';

import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';

import GraphView from './GraphView';
import RepoSelector from './RepoSelector'


export default function NotebookSidebar() {
    const [visible, setVisible] = useState(true);
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);


    const [items] = useState(Array.from({ length: 100000 }).map((_, i) => `Archivo-${i}.md`));

    const itemTemplate = (item, options) => {
        const className = classNames('flex align-items-center p-2', {
            'surface-hover': options.odd
        });

        return (
            <div className={className} style={{ height: options.props.itemSize + 'px' }}>
                <i className="pi pi-file" style={{ fontSize: '1rem', marginRight: "0.5rem" }}></i>
                <span>
                    {item}
                </span>
            </div>
        );
    };



    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [repoSelectVisible, setRepoSelectVisible] = useState(false)



    const [selectedCountry, setSelectedCountry] = useState(null);
    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];



    return (
        <Splitter style={{ height: '100vh' }} layout="vertical">

            <SplitterPanel className="flex align-items-center justify-content-center" size={5}>
                <Card style={{ padding: "0px" }} subTitle="Noteblocks">
                    <div style={{cursor: "pointer"}} >
                        <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-file'></i>Home
                    </div>
                    <div style={{cursor: "pointer"}} >
                        <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-search'></i>All notes
                    </div>
                    <div  style={{cursor: "pointer"}} onClick={() => setSidebarVisible(true)} >
                        <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-sitemap'></i>Graph View
                        <GraphView visible={sidebarVisible} setVisible={setSidebarVisible} />
                    </div>
                    <div style={{cursor: "pointer"}}  onClick={() => setRepoSelectVisible(true)}>
                        <i style={{ paddingLeft: "0.9rem", marginRight: "0.5rem", marginBottom: "0.5rem" }} className='pi pi-folder'></i>Repositories
                        <RepoSelector visible={repoSelectVisible} setVisible={setRepoSelectVisible} />
                    </div>

                </Card>
            </SplitterPanel>

            <SplitterPanel style={{ overflowY: "scroll" }} className="flex align-items-center justify-content-center" size={70}>
                <Card style={{ padding: "0px", width: "100%" }} subTitle="Notebooks">
                    <div>
                        <i style={{ paddingLeft: "0.9rem", fontSize: '0.7rem', marginRight: "0.5rem", marginBottom: "0.2rem" }} className='pi pi-book'></i>
                        Agenda
                    </div>
                    <hr />
                    <div>
                        <i style={{ paddingLeft: "0.9rem", fontSize: '0.7rem', marginRight: "0.5rem", marginBottom: "0.2rem" }} className='pi pi-book'></i>
                        Browser
                    </div>
                    <hr />
                    <div>
                        <i style={{ paddingLeft: "0.9rem", fontSize: '0.7rem', marginRight: "0.5rem", marginBottom: "0.2rem" }} className='pi pi-book'></i>
                        Diario
                    </div>
                    <hr />
                    <div>
                        <i style={{ paddingLeft: "0.9rem", fontSize: '0.7rem', marginRight: "0.5rem", marginBottom: "0.2rem" }} className='pi pi-book'></i>
                        Inbox
                    </div>
                    <hr />
                    <div>
                        <i style={{ paddingLeft: "0.9rem", fontSize: '0.7rem', marginRight: "0.5rem", marginBottom: "0.2rem" }} className='pi pi-book'></i>
                        Recomendaciones
                    </div>
                    <hr />
                </Card>
            </SplitterPanel>

            <SplitterPanel className="flex align-items-center justify-content-center" size={25}>
                <Card style={{ width: "100%", overflowY: "scroll", height: "25vh" }} subTitle="Etiquetas">
                    <div className="card flex flex-wrap justify-content-center gap-2">
                        <Tag style={{ margin: "0.2rem" }} value="Primary"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="success" value="Success"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="info" value="Info"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="warning" value="Warning"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="danger" value="Danger"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="secondary" value="Secondary"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="contrast" value="Contrast"></Tag>
                        <Tag style={{ margin: "0.2rem" }} value="Primary"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="success" value="Success"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="info" value="Info"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="warning" value="Warning"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="danger" value="Danger"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="secondary" value="Secondary"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="contrast" value="Contrast"></Tag>
                        <Tag style={{ margin: "0.2rem" }} value="Primary"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="success" value="Success"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="info" value="Info"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="warning" value="Warning"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="danger" value="Danger"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="secondary" value="Secondary"></Tag>
                        <Tag style={{ margin: "0.2rem" }} severity="contrast" value="Contrast"></Tag>
                    </div>
                </Card>
            </SplitterPanel>

            <SplitterPanel className="flex align-items-center justify-content-center" size={10}>
                <center>
                    <div>
                        <button style={{ fontSize: '2rem', margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                            <i className="pi pi-cog text-2xl"></i>
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
