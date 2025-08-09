import { getDegrees, getNeighbors } from './helpers.jsx';

export const dsatur = (nodes, edges) => {
    const steps = [];
    const localNodes = JSON.parse(JSON.stringify(nodes));
    let numColors = 0;
    const degrees = getDegrees(localNodes, edges);
    const saturation = new Map(localNodes.map(node => [node.id, 0]));
    let uncoloredNodes = [...localNodes];
    for (let i = 0; i < localNodes.length; i++) {
        uncoloredNodes.sort((a, b) => {
            const satA = saturation.get(a.id);
            const satB = saturation.get(b.id);
            if (satA !== satB) return satB - satA;
            return degrees.get(b.id) - degrees.get(a.id);
        });
        const nodeToColor = uncoloredNodes[0];
        const adjacentColors = new Set();
        const neighbors = getNeighbors(nodeToColor.id, edges);
        neighbors.forEach(neighborId => {
            const neighborNode = localNodes.find(n => n.id === neighborId);
            if (neighborNode && neighborNode.color !== null) {
                adjacentColors.add(neighborNode.color);
            }
        });
        steps.push({ type: 'focus', nodeId: nodeToColor.id, message: `Highest saturation: Node ${nodeToColor.id} (Sat: ${saturation.get(nodeToColor.id)}).` });
        steps.push({ type: 'highlight_neighbors', nodeId: nodeToColor.id, message: `Forbidden colors: {${[...adjacentColors].join(', ')}}` });
        let color = 1;
        while (adjacentColors.has(color)) { color++; }
        nodeToColor.color = color;
        if (color > numColors) numColors = color;
        steps.push({ type: 'color', nodeId: nodeToColor.id, color: color, message: `Node ${nodeToColor.id} assigned Color ${color}.` });
        neighbors.forEach(neighborId => {
            const neighborNode = localNodes.find(n => n.id === neighborId);
            if (neighborNode && neighborNode.color === null) {
                const neighborColors = new Set();
                getNeighbors(neighborId, edges).forEach(nnId => {
                    const nnNode = localNodes.find(n => n.id === nnId);
                    if (nnNode && nnNode.color !== null) neighborColors.add(nnNode.color);
                });
                saturation.set(neighborId, neighborColors.size);
            }
        });
        uncoloredNodes = uncoloredNodes.filter(n => n.id !== nodeToColor.id);
    }
    steps.push({ type: 'done', message: `Finished! Used ${numColors} colors.` });
    return steps;
};