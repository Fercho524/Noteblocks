import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import ForceGraph2D from 'react-force-graph-2d';


const sampleData = {
    nodes: [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' }
    ],
    links: [
        { source: 'A', target: 'B', target: 'D' },
        { source: 'A', target: 'C' },
        { source: 'B', target: 'D' },
        { source: 'C', target: 'D' }
    ]
};

function GraphView({ visible, setVisible }) {
    return (
        <div className="card flex justify-content-center">
            <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
                <ForceGraph2D
                    graphData={sampleData}
                    nodeLabel="id"
                    nodeAutoColorBy="id"
                />
            </Sidebar>
        </div>
    );
}

export default GraphView;
