import React from 'react';

const AlgorithmSelector = ({ algorithms, onSelect }) => (
    <div className="graph-editor-card">
        <h3>Select an Algorithm to View</h3>
        <div className="algo-selector-controls">
            {algorithms.map(algo => (
                <button key={algo.name} onClick={() => onSelect(algo.name)}>
                    {algo.name}
                </button>
            ))}
        </div>
    </div>
);
export default AlgorithmSelector;