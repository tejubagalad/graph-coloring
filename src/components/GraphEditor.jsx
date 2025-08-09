import React, { useState, useRef, useCallback } from 'react';

export const GraphEditor = ({ nodes, setNodes, edges, setEdges }) => {
    const [addingEdges, setAddingEdges] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const svgRef = useRef();

    const handleBackgroundClick = useCallback((event) => {
        if (!addingEdges && svgRef.current) {
            const svgPoint = svgRef.current.createSVGPoint();
            const CTM = svgRef.current.getScreenCTM();
            if (CTM) {
                svgPoint.x = event.clientX;
                svgPoint.y = event.clientY;
                const { x, y } = svgPoint.matrixTransform(CTM.inverse());
                const newNode = { id: nodes.length > 0 ? Math.max(...nodes.map(n => n.id)) + 1 : 1, x, y, color: null };
                setNodes([...nodes, newNode]);
            }
        }
    }, [nodes, addingEdges, setNodes]);

    const handleNodeClick = useCallback((node) => {
        if (addingEdges) {
            if (selectedNode) {
                if (selectedNode.id !== node.id && !edges.some(e => (e.source === selectedNode.id && e.target === node.id) || (e.source.id === node.id && e.target.id === selectedNode.id))) {
                    setEdges([...edges, { source: selectedNode.id, target: node.id }]);
                }
                setSelectedNode(null);
            } else {
                setSelectedNode(node);
            }
        }
    }, [addingEdges, selectedNode, edges, setEdges]);

    const handleClear = () => { setNodes([]); setEdges([]); setSelectedNode(null); };

    return (
        <div className="graph-editor-card">
            <h3>Graph Editor</h3>
            <p>Click background to add a node. Toggle "Add Edges" to connect them.</p>
            <div className="editor-controls">
                <button onClick={() => { setAddingEdges(!addingEdges); setSelectedNode(null); }} className={addingEdges ? 'active' : ''}>
                    {addingEdges ? 'Adding Edges...' : 'Add Edges'}
                </button>
                <button onClick={handleClear}>Clear Graph</button>
            </div>
            <div className="graph-container editor-container" onClick={handleBackgroundClick}>
                <svg ref={svgRef} width="100%" height="100%">
                    {edges.map((edge, i) => {
                        const sourceNode = nodes.find(n => n.id === (edge.source.id || edge.source));
                        const targetNode = nodes.find(n => n.id === (edge.target.id || edge.target));
                        if (!sourceNode || !targetNode) return null;
                        return <line key={i} x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y} stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />;
                    })}
                    {nodes.map(node => (
                        <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="graph-node" onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}>
                            <circle r="12" fill={node.id === selectedNode?.id ? '#ff5722' : '#666'} />
                            <text textAnchor="middle" dy=".3em" fill="white" fontSize="12px" fontWeight="bold">{node.id}</text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};
