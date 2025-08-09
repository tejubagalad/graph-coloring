import { getAdjacentColors } from './helpers.jsx';

export const greedyColoring = (nodes, edges) => {
    const steps = [];
    const localNodes = JSON.parse(JSON.stringify(nodes));
    let numColors = 0;
    const sortedNodes = localNodes.sort((a, b) => a.id - b.id);
    sortedNodes.forEach(node => {
        const adjacentColors = getAdjacentColors(node.id, edges, localNodes);
        steps.push({ type: 'focus', nodeId: node.id, message: `Focusing on Node ${node.id}.` });
        steps.push({ type: 'highlight_neighbors', nodeId: node.id, message: `Forbidden colors: {${[...adjacentColors].join(', ')}}` });
        let color = 1;
        while (adjacentColors.has(color)) { color++; }
        node.color = color;
        if (color > numColors) numColors = color;
        steps.push({ type: 'color', nodeId: node.id, color: color, message: `Node ${node.id} assigned Color ${color}.` });
    });
    steps.push({ type: 'done', message: `Finished! Used ${numColors} colors.` });
    return steps;
};