export const getDegrees = (nodes, edges) => {
    const degrees = new Map(nodes.map(node => [node.id, 0]));
    edges.forEach(({ source, target }) => {
        const sourceId = typeof source === 'object' ? source.id : source;
        const targetId = typeof target === 'object' ? target.id : target;
        degrees.set(sourceId, (degrees.get(sourceId) || 0) + 1);
        degrees.set(targetId, (degrees.get(targetId) || 0) + 1);
    });
    return degrees;
};

export const getNeighbors = (nodeId, edges) => {
    const neighbors = [];
    edges.forEach(({ source, target }) => {
        const sourceId = typeof source === 'object' ? source.id : source;
        const targetId = typeof target === 'object' ? target.id : target;
        if (sourceId === nodeId) neighbors.push(targetId);
        if (targetId === nodeId) neighbors.push(sourceId);
    });
    return Array.from(new Set(neighbors));
};

export const getAdjacentColors = (nodeId, edges, allNodes) => {
    const adjacentColors = new Set();
    const neighborIds = getNeighbors(nodeId, edges);
    neighborIds.forEach(neighborId => {
        const neighbor = allNodes.find(n => n.id === neighborId);
        if (neighbor && neighbor.color !== null) {
            adjacentColors.add(neighbor.color);
        }
    });
    return adjacentColors;
};