import React, { useState } from 'react';

export default function NumberLine({ target, onComplete, hook }) {
  const [placed, setPlaced] = useState([]);
  const numbers = [1, 3, 5, 7, 9];

  const placeNumber = (num) => {
    hook.recordAttempt();
    const newPlaced = [...placed, num].sort((a, b) => a - b);
    setPlaced(newPlaced);

    if (newPlaced.length === numbers.length) {
      hook.markSolved();
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div>
      <p className="text-center mb-4">Place numbers on the line: {target}</p>
      <div className="flex gap-2 justify-center mb-4">
        {numbers.filter(n => !placed.includes(n)).map(n => (
          <button key={n} onClick={() => placeNumber(n)} className="px-4 py-2 border rounded-xl min-tap">{n}</button>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full relative mx-8">
        {placed.map((n, i) => {
          const pos = placed.length <= 1 ? 0 : (i / (placed.length - 1)) * 100;
          return (
            <div key={i} className="absolute -top-1 text-xs" style={{ left: `${pos}%` }}>{n}</div>
          );
        })}
      </div>
    </div>
  );
}
