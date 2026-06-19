import React from 'react';

export default function Mascot({ line, mood = 'happy' }) {
  const moods = {
    happy: '🦉',
    thinking: '🦉',
    excited: '🦉',
    proud: '🦉'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-6xl animate-[bounce_2s_ease-in-out_infinite]">
        {moods[mood]}
      </div>
      {line && (
        <div className="max-w-xs bg-white px-4 py-2 rounded-2xl shadow text-center text-sm border border-gray-200">
          {line}
        </div>
      )}
    </div>
  );
}
