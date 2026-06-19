import React from 'react';
import { useProgress } from '../context/ProgressContext.jsx';

export default function Confetti({ active }) {
  const { progress } = useProgress();
  
  if (!active || progress.settings.reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EC4899'][i % 4],
            animation: `confetti ${800 + Math.random() * 600}ms linear forwards`,
            animationDelay: `${Math.random() * 200}ms`
          }}
        />
      ))}
    </div>
  );
}
