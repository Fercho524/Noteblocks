import React, { useState } from 'react';
import { VirtualScroller } from 'primereact/virtualscroller';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function NoteSidebar() {
    const [items] = useState(Array.from({ length: 20 }).map((_, i) => `Archivo-${i}.md`));

    const itemTemplate = (item, options) => {
        const className = classNames('flex align-items-center note-selector', {
            'surface-hover': options.odd
        });
        return (
            <div className={className} style={{ height: options.props.itemSize + 'px' }}>
                <i className="pi pi-file" style={{ fontSize: '1rem', marginRight: "0.5rem", marginLeft: "0.5rem" }}></i>
                <span>
                    {item}
                </span>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center" style={{ height:"88%",width: "90%" }}>
            <div style={{ margin: "1rem", width: "100%" }} className="p-inputgroup flex-1">
                <InputText placeholder="Search a note" />
                <Button icon="pi pi-search" className="p-button-primary" />
            </div>
            <VirtualScroller items={items} itemSize={50} itemTemplate={itemTemplate} className="border-1 surface-border border-round" style={{ width: '100%', margin: "1rem", marginBottom: "2rem", height: '100%' }} />
        </div>
    );
}

export default NoteSidebar
