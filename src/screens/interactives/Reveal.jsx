import React, { useState } from 'react';

export default function Reveal({ target, onComplete, hook }) {
  const [revealed, setRevealed] = useState(0);
  const facts = ['Fact A', 'Fact B', 'Fact C'];

  const next = () => {
    hook.recordAttempt();
    const r = revealed + 1;
    setRevealed(r);
    if (r === facts.length) {
      hook.markSolved();
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div className="text-center">
      <p className="mb-4">Reveal facts about: {target}</p>
      <div className="space-y-2 mb-4">
        {facts.slice(0, revealed).map((f, i) => <div key={i} className="p-3 bg-gray-100 rounded-xl">{f}</div>)}
      </div>
      {revealed < facts.length && (
        <button onClick={next} className="px-6 py-2 bg-indigo-100 rounded-xl min-tap">Reveal Next</button>
      )}
    </div>
  );
}
