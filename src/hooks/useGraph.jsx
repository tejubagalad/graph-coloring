import { useState, useCallback, useMemo } from 'react';

export const useGraph = (initialNodes, initialEdges) => {
    const memoizedInitialState = useMemo(() => ({
        nodes: initialNodes.map(n => ({ ...n, color: null })),
        edges: initialEdges
    }), [initialNodes, initialEdges]);

    const [nodes, setNodes] = useState(memoizedInitialState.nodes);
    const [history, setHistory] = useState([]);

    const applyAlgorithm = useCallback((steps) => {
        setHistory(steps);
    }, []);

    const updateNodesForStep = useCallback((stepIndex) => {
        const newNodes = JSON.parse(JSON.stringify(memoizedInitialState.nodes));
        for (let i = 0; i <= stepIndex; i++) {
            const currentStep = history[i];
            if (currentStep && currentStep.type === 'color') {
                const nodeToUpdate = newNodes.find(n => n.id === currentStep.nodeId);
                if (nodeToUpdate) nodeToUpdate.color = currentStep.color;
            }
        }
        setNodes(newNodes);
    }, [history, memoizedInitialState.nodes]);

    return { nodes, edges: memoizedInitialState.edges, history, applyAlgorithm, updateNodesForStep };
};