import React, { useState } from 'react';

export default function WordBuild({ target, onComplete, hook }) {
  const [built, setBuilt] = useState('');
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const addLetter = (l) => {
    hook.recordAttempt();
    const newBuilt = built + l;
    setBuilt(newBuilt);
    if (newBuilt.length === 4) {
      hook.markSolved();
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div>
      <p className="text-center mb-4">Build the word: {target}</p>
      <div className="flex gap-2 justify-center mb-4">
        {letters.map((l, i) => (
          <button key={i} onClick={() => addLetter(l)} className="w-12 h-12 text-2xl border rounded-xl min-tap">{l}</button>
        ))}
      </div>
      <div className="text-center text-xl tracking-widest">{built}</div>
    </div>
  );
}
