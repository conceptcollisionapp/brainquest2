import React from 'react';
import { useProgress } from '../context/ProgressContext.jsx';

export default function ProgressBar() {
  const { progress } = useProgress();
  const percent = (progress.completedDays.length / 30) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>{progress.completedDays.length}/30 days</span>
        <span>⭐ {progress.stars}</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--color-primary)] transition-all duration-500" 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
