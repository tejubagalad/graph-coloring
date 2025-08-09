import React from 'react';

const Stats = ({ nodes }) => {
    const colorsUsed = new Set(nodes.map(n => n.color).filter(c => c !== null));
    return (
        <div className="stats">
            <p><strong>Colors Used (k):</strong> {colorsUsed.size}</p>
            <p><strong>Theoretical Lower Bound:</strong> ω(G) ≤ χ(G)</p>
        </div>
    );
};
export default Stats;