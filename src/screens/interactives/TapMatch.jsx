import React, { useState } from 'react';

export default function TapMatch({ target, onComplete, hook }) {
  const [selected, setSelected] = useState([]);
  const items = ['🍎', '🍌', '🥕', '🍇', '🥦', '🍓'];
  const correct = [0, 3, 5];

  const toggle = (i) => {
    hook.recordAttempt();
    const next = selected.includes(i) 
      ? selected.filter(x => x !== i) 
      : [...selected, i];
    setSelected(next);
    if (next.length === correct.length && next.every(x => correct.includes(x))) {
      hook.markSolved();
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div>
      <p className="text-center mb-4 text-[var(--color-muted)]">Tap the matching items for: {target}</p>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`aspect-square text-5xl rounded-2xl border-4 transition-all min-tap flex items-center justify-center
              ${selected.includes(i) ? 'border-indigo-500 bg-indigo-50 scale-105' : 'border-gray-200 hover:border-gray-300'}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="text-center mt-4 text-sm text-[var(--color-muted)]">
        {selected.length} / {correct.length} selected
      </div>
    </div>
  );
}
