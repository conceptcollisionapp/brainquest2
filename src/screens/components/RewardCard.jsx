import React from 'react';
import Button from '../../components/Button.jsx';
import Confetti from '../../components/Confetti.jsx';

export default function RewardCard({ result, dayId, onContinue, passed = true, totalQuestions }) {
  const { rawScore, starsEarned } = result;
  const percentage = Math.round((rawScore / totalQuestions) * 100);

  if (!passed) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-xl mx-auto">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-3xl font-bold mb-2">Not quite there yet</h2>
        <p className="text-xl text-[var(--color-muted)] mb-6">
          You need at least 2 out of 3 correct to pass. Score: {rawScore}/{totalQuestions}
        </p>
        <Button onClick={onContinue}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-xl mx-auto">
      <Confetti active={starsEarned >= 2} />
      
      <div className="text-6xl mb-4">
        {starsEarned === 3 ? '🏆' : starsEarned === 2 ? '⭐⭐' : '⭐'}
      </div>
      
      <h2 className="text-3xl font-bold mb-2">Day {dayId} Complete!</h2>
      <p className="text-xl text-[var(--color-muted)] mb-6">
        Score: {rawScore}/{totalQuestions} ({percentage}%)
      </p>
      
      <div className="flex justify-center gap-1 mb-8">
        {[1,2,3].map(i => (
          <span key={i} className="text-4xl">{i <= starsEarned ? '⭐' : '☆'}</span>
        ))}
      </div>

      <Button onClick={onContinue}>
        {dayId < 30 ? 'Next Day' : 'Back to Calendar'}
      </Button>
    </div>
  );
}
