import React from 'react';

const Controls = ({ onPlay, onPause, onNext, onPrev, onReset, isRunning, step, maxSteps }) => (
    <div className="controls">
        <button onClick={onPrev} disabled={step <= 0}>⏮</button>
        {isRunning ? <button onClick={onPause}>⏸</button> : <button onClick={onPlay} disabled={step >= maxSteps}>▶️</button>}
        <button onClick={onNext} disabled={step >= maxSteps}>⏭</button>
        <button onClick={onReset}>🔄</button>
    </div>
);
export default Controls;