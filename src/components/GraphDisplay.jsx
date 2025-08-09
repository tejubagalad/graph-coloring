import React, { useCallback } from 'react';
import { getNeighbors } from '../algorithms/helpers.jsx';

const PALETTE = ['#377eb8', '#ff7f00', '#4daf4a', '#f781bf', '#a65628', '#984ea3', '#999999', '#e41a1c', '#dede00'];

const GraphDisplay = ({ nodes, edges, currentStep, nodeLayout }) => {
    const getLinkColor = useCallback((link) => {
        const sourceNode = nodes.find(n => n.id === (link.source.id || link.source));
        const targetNode = nodes.find(n => n.id === (link.target.id || link.target));
        if (sourceNode?.color && sourceNode.color === targetNode?.color) return 'rgba(255, 0, 0, 1)';
        if (currentStep?.type === 'highlight_neighbors' && sourceNode?.id !== currentStep.nodeId && targetNode?.id !== currentStep.nodeId) return 'rgba(0, 0, 0, 0.05)';
        return 'rgba(0, 0, 0, 0.25)';
    }, [nodes, currentStep]);

    if (!nodeLayout || Object.keys(nodeLayout).length === 0) return null;

    return (
        <div className="graph-container">
            <svg width="100%" height="100%" viewBox="0 0 440 320">
                {edges.map((edge, i) => {
                    const sourcePos = nodeLayout[edge.source.id || edge.source];
                    const targetPos = nodeLayout[edge.target.id || edge.target];
                    if (!sourcePos || !targetPos) return null;
                    return <line key={i} x1={sourcePos.x} y1={sourcePos.y} x2={targetPos.x} y2={targetPos.y} stroke={getLinkColor(edge)} strokeWidth="2.5" />;
                })}
                {nodes.map(node => {
                    const pos = nodeLayout[node.id];
                    if (!pos) return null;
                    let isNeighborHighlight = false;
                    let opacity = 1.0;
                    if (currentStep?.type === 'highlight_neighbors') {
                        const neighborsOfFocused = getNeighbors(currentStep.nodeId, edges);
                        if (neighborsOfFocused.includes(node.id)) {
                            isNeighborHighlight = true;
                        } else if (node.id !== currentStep.nodeId) {
                            opacity = 0.3;
                        }
                    }
                    return (
                        <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`} className="graph-node" style={{ opacity }}>
                            <circle r="14" fill={node.color ? PALETTE[node.color - 1] || '#CCCCCC' : '#DDDDDD'} stroke={currentStep?.nodeId === node.id ? '#FDB813' : isNeighborHighlight ? '#ff5722' : 'none'} strokeWidth={currentStep?.nodeId === node.id ? 4 : 2.5} />
                            <text textAnchor="middle" dy=".3em" fill="white" fontSize="14px" fontWeight="bold">{node.id}</text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
export default GraphDisplay;