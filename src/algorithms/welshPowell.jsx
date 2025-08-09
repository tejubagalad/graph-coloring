import { getDegrees, getAdjacentColors } from './helpers.jsx';

export const welshPowell = (nodes, edges) => {
    const steps = [];
    const localNodes = JSON.parse(JSON.stringify(nodes));
    let numColors = 0;
    const degrees = getDegrees(localNodes, edges);
    const sortedNodes = localNodes.sort((a, b) => degrees.get(b.id) - degrees.get(a.id));
    steps.push({ type: 'info', message: 'Nodes sorted by degree (desc).' });
    sortedNodes.forEach(node => {
        if (node.color === null) {
            const adjacentColors = getAdjacentColors(node.id, edges, sortedNodes);
            steps.push({ type: 'focus', nodeId: node.id, message: `Focusing on Node ${node.id} (Degree: ${degrees.get(node.id)}).` });
            steps.push({ type: 'highlight_neighbors', nodeId: node.id, message: `Forbidden colors: {${[...adjacentColors].join(', ')}}` });
            let color = 1;
            while (adjacentColors.has(color)) { color++; }
            node.color = color;
            if (color > numColors) numColors = color;
            steps.push({ type: 'color', nodeId: node.id, color: color, message: `Node ${node.id} assigned Color ${color}.` });
        }
    });
    steps.push({ type: 'done', message: `Finished! Used ${numColors} colors.` });
    return steps;
};