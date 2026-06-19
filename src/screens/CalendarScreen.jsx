import React from 'react';
import { useProgress } from '../context/ProgressContext.jsx';
import { curriculum } from '../data/curriculum.js';
import DifficultyBadge from '../components/DifficultyBadge.jsx';
import Toast from '../components/Toast.jsx';
import { useState } from 'react';

export default function CalendarScreen({ goTo }) {
  const { progress } = useProgress();
  const [toast, setToast] = useState(null);

  const isDayUnlocked = (dayId) => {
    return dayId === 1 || progress.completedDays.includes(dayId - 1);
  };

  const handleDayClick = (dayId) => {
    if (isDayUnlocked(dayId)) {
      goTo('day', dayId);
    } else {
      setToast(`Finish Day ${dayId - 1} first! 🦉`);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">30-Day Challenge</h2>
      
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
        {curriculum.map((day) => {
          const completed = progress.completedDays.includes(day.id);
          const unlocked = isDayUnlocked(day.id);
          const best = progress.bestScores[day.id];
          
          return (
            <button
              key={day.id}
              onClick={() => handleDayClick(day.id)}
              disabled={!unlocked}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all min-tap
                ${completed ? 'bg-emerald-100 border-2 border-emerald-500' : 
                  unlocked ? 'bg-white border-2 border-gray-200 hover:border-[var(--color-primary)]' : 
                  'bg-gray-100 border-2 border-gray-200 opacity-60'}`}
            >
              <div className="text-xs text-[var(--color-muted)]">Day</div>
              <div className="text-2xl font-bold">{day.id}</div>
              <DifficultyBadge tier={day.difficultyTier} />
              {best !== undefined && (
                <div className="text-[10px] mt-1 text-emerald-600">⭐ {best}/10</div>
              )}
            </button>
          );
        })}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
