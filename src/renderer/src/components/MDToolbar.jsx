import React from 'react';

import { Toolbar } from 'primereact/toolbar';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';



function MDToolbar({ mode, setMode, sintaxTheme, setSintaxTheme, appTheme, setAppTheme }) {
    const viewModeOptions = [
        { icon: 'pi pi-code', value: 'code' },
        { icon: 'pi pi-pause', value: 'split' },
        { icon: 'pi pi-align-justify', value: 'preview' }
    ];

    const sintaxThemeGroups = [
        {
            label: 'Dark',
            code: 'dark',
            items: [
                { label: 'abyss', value: "abyss" },
                { label: 'andromeda', value: "andromeda" },
                { label: 'copilot', value: "copilot" },
                { label: 'atomone', value: "atomone" },
                { label: 'aura', value: "aura" },
                { label: 'dracula', value: "dracula" },
                { label: 'monokai', value: "monokai" },
                { label: 'nord', value: "nord" },
                { label: 'tokyoNightStorm', value: "tokyoNightStorm" },
                { label: 'duotoneDark', value: "duotoneDark" },
                { label: 'materialDark', value: "materialDark" },
                { label: 'vscodeDark', value: "vscodeDark" },
                { label: 'xcodeDark', value: "xcodeDark" },
                { label: 'basicDark', value: "basicDark" },
                { label: 'gruvboxDark', value: "gruvboxDark" },
                { label: 'tokyoNight', value: "tokyoNight" }
            ]
        },
        {
            label: 'Light',
            code: 'light',
            items: [
                { label: 'tokyoNightDay', value: "tokyoNightDay" },
                { label: 'duotoneLight', value: "duotoneLight" },
                { label: 'materialLight', value: "materialLight" },
                { label: 'vscodeLight', value: "vscodeLight" },
                { label: 'xcodeLight', value: "xcodeLight" },
                { label: 'basicLight', value: "basicLight" },
                { label: 'gruvboxLight', value: "gruvboxLight" }
            ]
        }
    ];

    const appThemeOptions = [
        { label: 'Arya Azul', value: 'arya-blue.css' },
        { label: 'Arya Verde', value: 'arya-green.css' },
        { label: 'Arya Naranja', value: 'arya-orange.css' },
        { label: 'Arya Púrpura', value: 'arya-purple.css' },

        { label: 'Bootstrap4 Azul Oscuro', value: 'bootstrap4-dark-blue.css' },
        { label: 'Bootstrap4 Púrpura Oscuro', value: 'bootstrap4-dark-purple.css' },
        { label: 'Bootstrap4 Azul Claro', value: 'bootstrap4-light-blue.css' },
        { label: 'Bootstrap4 Púrpura Claro', value: 'bootstrap4-light-purple.css' },

        { label: 'Fluent Claro', value: 'fluent-light.css' },

        { label: 'Luna Ámbar', value: 'luna-amber.css' },
        { label: 'Luna Azul', value: 'luna-blue.css' },
        { label: 'Luna Verde', value: 'luna-green.css' },
        { label: 'Luna Rosado', value: 'luna-pink.css' },

        { label: 'Nano', value: 'nano.css' },
        { label: 'Nova', value: 'nova.css' },
        { label: 'Nova Accent', value: 'nova-accent.css' },
        { label: 'Nova Alt', value: 'nova-alt.css' },

        { label: 'Rhea', value: 'rhea.css' },

        { label: 'Saga Azul', value: 'saga-blue.css' },
        { label: 'Saga Verde', value: 'saga-green.css' },
        { label: 'Saga Naranja', value: 'saga-orange.css' },
        { label: 'Saga Púrpura', value: 'saga-purple.css' },

        { label: 'Vela Azul', value: 'vela-blue.css' },
        { label: 'Vela Verde', value: 'vela-green.css' },
        { label: 'Vela Naranja', value: 'vela-orange.css' },
        { label: 'Vela Púrpura', value: 'vela-purple.css' }
    ];



    // Theme Changers
    const leftToolbar = (
        <React.Fragment>
            <Dropdown
                value={sintaxTheme}
                options={sintaxThemeGroups}
                onChange={(e) => {
                    setSintaxTheme(e.value);
                }}
                optionLabel="label"
                optionValue="value"
                optionGroupLabel="label"
                optionGroupChildren="items"
                placeholder="Selecciona un tema"
                style={{ minWidth: '10rem', maxHeight: '10rem' }}
            />
            {/* <Dropdown
                value={appTheme}
                options={appThemeOptions}
                onChange={(e) => { setAppTheme(e.value) }}
                placeholder="Selecciona un tema"
                className="w-full md:w-14rem"
            /> */}
        </React.Fragment>
    )

    // Markdown Elements
    const centerToolbar = (
        <div className="flex justify-around gap-4">
            {/* TEXTO */}
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <b>B</b>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i>I</i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <u>U</u>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <s>S</s>
            </button>


            {/* ESTRUCTURA */}
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <b>H</b>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-align-justify"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-list"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-list-check text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-minus text-2xl"></i>
            </button>

            {/* Elementos */}
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-image text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-table text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-code text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-qrcode text-2xl"></i>
            </button>

            {/* Archivo */}
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-save text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-print text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-file-pdf text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-replay text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-refresh text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-clone text-2xl"></i>
            </button>

            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-chevron-left text-2xl"></i>
            </button>
            <button style={{ margin: "0.5rem" }} className="p-link inline-flex justify-around align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-chevron-right text-2xl"></i>
            </button>
        </div>
    )


    // View Type Changer
    const viewModeTemplate = (option) => {
        return <i style={{ height: "0.5rem", width: "0.5rem", fontSize: "8pt", marginTop: "0px" }} className={option.icon}></i>;
    }

    const rightToolbar = (
        <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
            <div className="card flex justify-content-center">
                <SelectButton value={mode} onChange={(e) => setMode(e.value)} itemTemplate={viewModeTemplate} optionLabel="value" options={viewModeOptions} />
            </div>
        </div>
    )

    return (
        <Toolbar start={leftToolbar} end={rightToolbar} center={centerToolbar} style={{ width: "100%", height: "100%" }} />
    )
}

export default MDToolbar
