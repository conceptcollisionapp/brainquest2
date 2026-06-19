import React, { useState } from 'react';

export default function TapMatch({ target, onComplete, hook }) {
  const [selected, setSelected] = useState([]);
  const items = ['🍎', '🍌', '🥕', '🍇', '🥦', '🍓'];
  const correctMatches = [0, 3, 5];

  const toggleItem = (index) => {
    hook.recordAttempt();
    
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else {
      const newSelected = [...selected, index];
      setSelected(newSelected);
      
      if (newSelected.length === correctMatches.length && 
          newSelected.every(i => correctMatches.includes(i))) {
        hook.markSolved();
        setTimeout(onComplete, 600);
      }
    }
  };

  return (
    <div>
      <p className="text-center mb-4 text-[var(--color-muted)]">Tap the matching items for: {target}</p>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleItem(index)}
            className={`aspect-square text-5xl rounded-2xl border-4 transition-all min-tap flex items-center justify-center
              ${selected.includes(index) 
                ? 'border-indigo-500 bg-indigo-50 scale-105' 
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="text-center mt-4 text-sm text-[var(--color-muted)]">
        {selected.length} / {correctMatches.length} selected
      </div>
    </div>
  );
}
