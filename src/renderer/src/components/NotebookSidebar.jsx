import React, { useState, useRef } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';

import { Tag } from 'primereact/tag';

import { Dropdown } from 'primereact/dropdown';
import { ListBox } from 'primereact/listbox';


export default function NotebookSidebar() {
    const [visible, setVisible] = useState(true);
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);


    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];


    const countryTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${option.code.toLowerCase()}`} style={{ width: '1.25rem', marginRight: '.5rem' }} />
                <div>{option.name}</div>
            </div>
        );
    };


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
        <Splitter style={{ height: '100vh' }} layout="vertical" size={100}>
            <SplitterPanel className="flex align-items-center justify-content-center" size={5}>
                Noteblocks
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center" size={20}>


                <div className="card flex justify-content-center">
                    <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                        placeholder="Select a City" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />
                </div>

                <div className="card flex justify-content-center">
                    <ListBox value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name"
                        itemTemplate={countryTemplate} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
                </div>


            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center" size={50}>
                Notebooks
                <div className="card flex justify-content-center">
                    <ListBox value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name"
                        itemTemplate={countryTemplate} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
                </div>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center" size={20}>
                <div className="card flex flex-wrap justify-content-center gap-2">
                    <p>
                        Tagas
                    </p>
                </div>
                <div className="card flex flex-wrap justify-content-center gap-2">
                    <Tag value="Primary"></Tag>
                    <Tag severity="success" value="Success"></Tag>
                    <Tag severity="info" value="Info"></Tag>
                    <Tag severity="warning" value="Warning"></Tag>
                    <Tag severity="danger" value="Danger"></Tag>
                    <Tag severity="secondary" value="Secondary"></Tag>
                    <Tag severity="contrast" value="Contrast"></Tag>
                </div>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center" size={5}>
                Toolbar
            </SplitterPanel>
        </Splitter>
    )
}
