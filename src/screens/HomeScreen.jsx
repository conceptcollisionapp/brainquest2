import React from 'react';
import { useProgress } from '../context/ProgressContext.jsx';
import Button from '../components/Button.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import DifficultyBadge from '../components/DifficultyBadge.jsx';
import Mascot from '../components/Mascot.jsx';

export default function HomeScreen({ goTo }) {
  const { progress } = useProgress();
  const hasProgress = progress.completedDays.length > 0;
  const currentTier = progress.currentDay <= 10 ? 'explorer' : progress.currentDay <= 20 ? 'thinker' : 'master';

  return (
    <div className="flex flex-col items-center text-center py-8">
      <Mascot line="Ready to train your brain today?" mood="excited" />
      
      <h1 className="text-5xl font-bold mt-6 mb-2">BrainQuest</h1>
      <p className="text-xl text-[var(--color-muted)] mb-8">30 days of brain-building challenges</p>

      <div className="w-full max-w-md mb-8">
        <ProgressBar />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white px-4 py-2 rounded-2xl shadow flex items-center gap-2">
          <span>🔥</span>
          <span className="font-semibold">{progress.streak} day streak</span>
        </div>
        <DifficultyBadge tier={currentTier} />
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button onClick={() => goTo('calendar')}>
          {hasProgress ? 'Continue Journey' : 'Start 30-Day Challenge'}
        </Button>
        
        {progress.completedDays.length === 30 && progress.finalTestScore === null && (
          <Button variant="secondary" onClick={() => goTo('finalTest')}>
            Take Final Test
          </Button>
        )}
        
        {progress.finalTestScore !== null && (
          <Button variant="secondary" onClick={() => goTo('certificate')}>
            View Certificate
          </Button>
        )}
      </div>

      <div className="mt-12 text-sm text-[var(--color-muted)] max-w-xs">
        Complete 10 interactive questions each day.<br />
        Difficulty increases every 10 days.
      </div>
    </div>
  );
}
