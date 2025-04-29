import React from 'react';


function RenderedView({ renderedRef }) {
    return (
        <div
            id="rendered"
            ref={renderedRef}
            style={{
                width: '100%',
                padding: '1rem',
                height: '85vh',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
                overflowY: 'auto'
            }}
        />
    );
}

export default RenderedView;
