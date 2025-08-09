import React, { useState, useMemo, useCallback } from 'react';
import { GraphEditor } from './components/GraphEditor.jsx';
import AlgorithmCard from './components/AlgorithmCard.jsx';
import AlgorithmSelector from './components/AlgorithmSelector.jsx';
import { greedyColoring } from './algorithms/greedy.jsx';
import { welshPowell } from './algorithms/welshPowell.jsx';
import { dsatur } from './algorithms/dsatur.jsx';

const getInitialLayout = (nodes, width, height) => {
    const layout = {};
    const radius = Math.min(width, height) / 2 - 40;
    const centerX = width / 2;
    const centerY = height / 2;
    nodes.forEach((node, i) => {
        const angle = (i / nodes.length) * 2 * Math.PI;
        layout[node.id] = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
        };
    });
    return layout;
};

const initialNodesRaw = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }];
const initialLayout = getInitialLayout(initialNodesRaw, 440, 320);
const initialNodesWithLayout = initialNodesRaw.map(n => ({...n, ...initialLayout[n.id]}));
const initialEdgesRaw = [
    { source: 1, target: 2 }, { source: 1, target: 3 }, { source: 1, target: 4 },
    { source: 2, target: 3 }, { source: 2, target: 4 }, { source: 3, target: 4 },
    { source: 1, target: 5 },
    { source: 5, target: 6 }, { source: 5, target: 7 },
    { source: 6, target: 7 }, { source: 6, target: 8 }, { source: 6, target: 9 },
    { source: 7, target: 8 }, { source: 7, target: 9 }, { source: 8, target: 9 },
];

function App() {
    const [nodes, setNodes] = useState(initialNodesWithLayout);
    const [edges, setEdges] = useState(initialEdgesRaw);
    const [activeAlgos, setActiveAlgos] = useState([]);

    const allAlgorithms = useMemo(() => [
        { name: 'Greedy Coloring (by ID)', func: greedyColoring, description: 'Assigns the first available color to each node in a fixed, arbitrary order.', runtime: 'O(V² + E)', runtimeFormula: (V, E) => `O(${V}² + ${E}) = O(${V*V + E})` },
        { name: 'Welsh-Powell (by Degree)', func: welshPowell, description: 'Sorts nodes by degree (highest first), then applies a greedy coloring procedure.', runtime: 'O(V²)', runtimeFormula: (V, E) => `O(${V}²) = O(${V*V})` },
        { name: 'DSATUR Heuristic', func: dsatur, description: 'Prioritizes the node with the most uniquely colored neighbors (highest saturation).', runtime: 'O(V²)', runtimeFormula: (V, E) => `O(${V}²) = O(${V*V})` },
    ], []);

    const addAlgorithm = useCallback((algoName) => {
        if (!activeAlgos.find(a => a.name === algoName)) {
            const algoToAdd = allAlgorithms.find(a => a.name === algoName);
            if (algoToAdd) {
                setActiveAlgos(prev => [...prev, algoToAdd]);
            }
        }
    }, [activeAlgos, allAlgorithms]);

    const removeAlgorithm = useCallback((algoName) => {
        setActiveAlgos(prev => prev.filter(a => a.name !== algoName));
    }, []);

    const graphKey = nodes.map(n => n.id).join('-') + '_' + edges.map(e => `${e.source.id || e.source}-${e.target.id || e.target}`).join('-');

    return (
        <div className="App">
            <h1>Graph Coloring Algorithm Visualizer 🎨</h1>
            <div className="main-container">
                <div>
                    <GraphEditor nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
                    <AlgorithmSelector algorithms={allAlgorithms} onSelect={addAlgorithm} />
                </div>
                <div className="visualizer-container">
                    {nodes.length > 0 && activeAlgos.map(algo => (
                        <AlgorithmCard 
                            key={algo.name + graphKey} 
                            algorithmName={algo.name} 
                            algorithmFunc={algo.func} 
                            description={algo.description}
                            runtime={algo.runtime}
                            runtimeFormula={algo.runtimeFormula}
                            initialNodes={nodes} 
                            initialEdges={edges}
                            onClose={removeAlgorithm}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;