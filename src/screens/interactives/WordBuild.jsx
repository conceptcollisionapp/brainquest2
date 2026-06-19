import React, { useState } from 'react';

export default function WordBuild({ target, onComplete, hook }) {
  const [built, setBuilt] = useState('');
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const targetWord = 'ABCD';

  const add = (l) => {
    hook.recordAttempt();
    const next = built + l;
    setBuilt(next);
    if (next === targetWord) {
      hook.markSolved();
      setTimeout(onComplete, 400);
    }
  };

  const backspace = () => {
    hook.recordAttempt();
    setBuilt(built.slice(0, -1));
  };

  return (
    <div>
      <p className="text-center mb-4">Build the word: {target}</p>
      <div className="flex gap-2 justify-center mb-4">
        {letters.map((l, i) => (
          <button key={i} onClick={() => add(l)} className="w-12 h-12 text-2xl border rounded-xl min-tap">{l}</button>
        ))}
        <button onClick={backspace} className="w-12 h-12 text-xl border rounded-xl min-tap">⌫</button>
      </div>
      <div className="text-center text-xl tracking-widest">{built}</div>
    </div>
  );
}
