import React, { useState } from 'react';

export default function BuildSequence({ target, onComplete, hook }) {
  const [sequence, setSequence] = useState([]);
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  
  const addStep = (step) => {
    hook.recordAttempt();
    const newSeq = [...sequence, step];
    setSequence(newSeq);
    
    if (newSeq.length === steps.length) {
      hook.markSolved();
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div>
      <p className="text-center mb-4">Build the sequence: {target}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {steps.map((step, i) => (
          <button 
            key={i} 
            onClick={() => addStep(step)}
            disabled={sequence.includes(step)}
            className="px-4 py-2 bg-white border rounded-xl disabled:opacity-40 min-tap"
          >
            {step}
          </button>
        ))}
      </div>
      <div className="text-sm text-center">Current: {sequence.join(' → ')}</div>
    </div>
  );
}
