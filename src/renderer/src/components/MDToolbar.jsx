import React from 'react';

import { Toolbar } from 'primereact/toolbar';
import { SelectButton } from 'primereact/selectbutton';

// Dark only
import { abyss } from '@uiw/codemirror-theme-abyss';
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { copilot } from '@uiw/codemirror-theme-copilot'
import { atomone } from '@uiw/codemirror-theme-atomone';
import { aura } from '@uiw/codemirror-theme-aura'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { monokai } from '@uiw/codemirror-theme-monokai'
import { nord } from '@uiw/codemirror-theme-nord'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'

// light
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';

// Both
import { duotoneLight, duotoneDark } from '@uiw/codemirror-theme-duotone'
import { materialLight, materialDark } from '@uiw/codemirror-theme-material'
import { vscodeLight, vscodeDark } from '@uiw/codemirror-theme-vscode'
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode'
import { basicDark, basicLight } from '@uiw/codemirror-theme-basic'
import { gruvboxLight, gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'

import { Dropdown } from 'primereact/dropdown';





function MDToolbar({ mode, setMode, sintaxTheme, setSintaxTheme }) {
    const viewModeOptions = [
        { icon: 'pi pi-code', value: 'code' },
        { icon: 'pi pi-pause', value: 'split' },
        { icon: 'pi pi-align-justify', value: 'preview' }
    ];

    const themeGroups = [
        {
            label: 'Oscuros',
            code: 'dark',
            items: [
                { label: 'abyss', value: abyss },
                { label: 'andromeda', value: andromeda },
                { label: 'copilot', value: copilot },
                { label: 'atomone', value: atomone },
                { label: 'aura', value: aura },
                { label: 'dracula', value: dracula },
                { label: 'monokai', value: monokai },
                { label: 'nord', value: nord },
                { label: 'tokyoNightStorm', value: tokyoNightStorm },
                { label: 'duotoneDark', value: duotoneDark },
                { label: 'materialDark', value: materialDark },
                { label: 'vscodeDark', value: vscodeDark },
                { label: 'xcodeDark', value: xcodeDark },
                { label: 'basicDark', value: basicDark },
                { label: 'gruvboxDark', value: gruvboxDark },
                { label: 'tokyoNight', value: tokyoNight }
            ]
        },
        {
            label: 'Claros',
            code: 'light',
            items: [
                { label: 'tokyoNightDay', value: tokyoNightDay },
                { label: 'duotoneLight', value: duotoneLight },
                { label: 'materialLight', value: materialLight },
                { label: 'vscodeLight', value: vscodeLight },
                { label: 'xcodeLight', value: xcodeLight },
                { label: 'basicLight', value: basicLight },
                { label: 'gruvboxLight', value: gruvboxLight }
            ]
        }
    ];

    const viewModeTemplate = (option) => {
        return <i style={{ height: "0.5rem", width: "0.5rem", fontSize: "8pt", marginTop: "0px" }} className={option.icon}></i>;
    }

    const leftToolbar = (
        <React.Fragment>
            <Dropdown
                value={sintaxTheme}
                options={themeGroups}
                onChange={(e) => {
                    setSintaxTheme(e.value);
                }}
                optionLabel="label"
                optionValue="value"
                optionGroupLabel="label"
                optionGroupChildren="items"
                placeholder="Selecciona un tema"
                style={{ minWidth: '10rem',maxHeight:'10rem' }}
                // panelStyle={{
                //     minHeight: '500px',    // Controla la altura máxima del panel desplegable
                    
                // }}
            />

        </React.Fragment>
    )

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
