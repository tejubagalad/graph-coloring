import React, { useState, useEffect, useCallback } from 'react';
import { useGraph } from '../hooks/useGraph.jsx';
import GraphDisplay from './GraphDisplay.jsx';
import Controls from './Controls.jsx';
import Stats from './Stats.jsx';

const AlgorithmCard = ({ algorithmName, algorithmFunc, description, runtime, runtimeFormula, initialNodes, initialEdges, onClose }) => {
    const { nodes, edges, history, applyAlgorithm, updateNodesForStep } = useGraph(initialNodes, initialEdges);
    const [step, setStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [nodeLayout, setNodeLayout] = useState({});
    const [calculatedRuntime, setCalculatedRuntime] = useState('');

    useEffect(() => {
        const layout = {};
        initialNodes.forEach(node => {
            layout[node.id] = { x: node.x, y: node.y };
        });
        setNodeLayout(layout);
        if (runtimeFormula) {
            const V = initialNodes.length;
            const E = initialEdges.length;
            setCalculatedRuntime(runtimeFormula(V, E));
        }
    }, [initialNodes, initialEdges, runtimeFormula]);

    useEffect(() => {
        const steps = algorithmFunc(initialNodes, initialEdges);
        applyAlgorithm(steps);
    }, [algorithmFunc, initialNodes, initialEdges, applyAlgorithm]);

    useEffect(() => {
        if (isRunning && step < history.length) {
            const timer = setTimeout(() => setStep(prev => prev + 1), 600);
            return () => clearTimeout(timer);
        } else if (isRunning) {
            setIsRunning(false);
        }
    }, [isRunning, step, history.length]);
    
    useEffect(() => {
        updateNodesForStep(step - 1);
    }, [step, updateNodesForStep]);

    const handlePlay = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleNext = useCallback(() => setStep(s => Math.min(s + 1, history.length)), [history.length]);
    const handlePrev = useCallback(() => setStep(s => Math.max(s - 1, 0)), []);
    const handleReset = useCallback(() => { setIsRunning(false); setStep(0); }, []);

    const currentMessage = step === 0 ? "Ready to start." : history[step - 1]?.message || "Algorithm finished.";

    return (
        <div className="algorithm-card">
            <button className="close-button" onClick={() => onClose(algorithmName)}>×</button>
            <h3>{algorithmName}</h3>
            <div className="algo-description">
                <p>{description}</p>
                <p><strong>Theoretical Complexity:</strong> {runtime}</p>
                <p><strong>Calculated for this graph:</strong> {calculatedRuntime}</p>
            </div>
            <GraphDisplay nodes={nodes} edges={edges} currentStep={history[step - 1]} nodeLayout={nodeLayout} />
            <Controls onPlay={handlePlay} onPause={handlePause} onNext={handleNext} onPrev={handlePrev} onReset={handleReset} isRunning={isRunning} step={step} maxSteps={history.length} />
            <Stats nodes={nodes} />
            <p className="status-message">{currentMessage}</p>
        </div>
    );
};
export default AlgorithmCard;