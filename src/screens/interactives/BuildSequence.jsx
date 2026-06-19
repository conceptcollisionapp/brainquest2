import React, { useState } from 'react';

export default function BuildSequence({ target, onComplete, hook }) {
  const [seq, setSeq] = useState([]);
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  const add = (step) => {
    hook.recordAttempt();
    const next = [...seq, step];
    setSeq(next);
    if (next.length === steps.length && next.every((s, i) => s === steps[i])) {
      hook.markSolved();
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div>
      <p className="text-center mb-4">Build the sequence: {target}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {steps.map((s, i) => (
          <button key={i} onClick={() => add(s)} disabled={seq.includes(s)} className="px-4 py-2 bg-white border rounded-xl disabled:opacity-40 min-tap">
            {s}
          </button>
        ))}
      </div>
      <div className="text-sm text-center">Current: {seq.join(' → ')}</div>
    </div>
  );
}
