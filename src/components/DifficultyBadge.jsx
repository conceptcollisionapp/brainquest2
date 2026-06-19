import React from 'react';
import { difficulty } from '../data/difficulty.js';

export default function DifficultyBadge({ tier }) {
  const d = difficulty[tier];
  if (!d) return null;

  return (
    <div 
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: d.color + '20', color: d.color }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
      {d.label}
    </div>
  );
}
