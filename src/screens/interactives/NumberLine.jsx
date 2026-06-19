import React, { useState } from 'react';

export default function NumberLine({ target, onComplete, hook }) {
  const [placed, setPlaced] = useState([]);
  const nums = [1, 3, 5, 7, 9];

  const place = (n) => {
    hook.recordAttempt();
    const next = [...placed, n].sort((a, b) => a - b);
    setPlaced(next);
    if (next.length === nums.length && next.every((v, i) => v === nums[i])) {
      hook.markSolved();
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div>
      <p className="text-center mb-4">Place numbers on the line: {target}</p>
      <div className="flex gap-2 justify-center mb-4">
        {nums.filter(n => !placed.includes(n)).map(n => (
          <button key={n} onClick={() => place(n)} className="px-4 py-2 border rounded-xl min-tap">{n}</button>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full relative mx-8">
        {placed.map((n, i) => {
          const pos = placed.length <= 1 ? 0 : (i / (placed.length - 1)) * 100;
          return <div key={i} className="absolute -top-1 text-xs" style={{ left: `${pos}%` }}>{n}</div>;
        })}
      </div>
    </div>
  );
}
