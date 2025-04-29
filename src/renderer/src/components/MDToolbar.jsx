import React from 'react';

import { Toolbar } from 'primereact/toolbar';
import { SelectButton } from 'primereact/selectbutton';


function MDToolbar({ mode, setMode }) {
    const viewModeOptions = [
        { icon: 'pi pi-code', value: 'code' },
        { icon: 'pi pi-pause', value: 'split' },
        { icon: 'pi pi-align-justify', value: 'preview' }
    ];

    const viewModeTemplate = (option) => {
        return <i style={{ height: "0.5rem", width: "0.5rem", fontSize: "8pt", marginTop: "0px" }} className={option.icon}></i>;
    }

    const leftToolbar = (
        <React.Fragment>
            <div className="card flex justify-content-center">
                <SelectButton value={mode} onChange={(e) => setMode(e.value)} itemTemplate={viewModeTemplate} optionLabel="value" options={viewModeOptions} />
            </div>
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
        <div>

        </div>
    )

    return (
        <Toolbar start={leftToolbar} end={rightToolbar} center={centerToolbar} style={{ width: "100%", height: "100%" }} />
    )
}

export default MDToolbar
