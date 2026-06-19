import React, { useState } from 'react';
import { finalTest } from '../data/finalTest.js';
import { useProgress } from '../context/ProgressContext.jsx';
import Quiz from './Quiz.jsx';
import Button from '../components/Button.jsx';
import Mascot from '../components/Mascot.jsx';

export default function FinalTestScreen({ goTo }) {
  const { recordFinalScore, progress } = useProgress();
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);

  const handleComplete = (quizResult) => {
    setResult(quizResult);
    setCompleted(true);
    recordFinalScore(quizResult.rawScore);
  };

  if (completed && result) {
    return (
      <div className="max-w-xl mx-auto text-center py-8">
        <Mascot line="You finished the final test!" mood="proud" />
        <h2 className="text-3xl font-bold mt-6 mb-4">Final Test Complete!</h2>
        <div className="text-6xl mb-4">🏆</div>
        <p className="text-xl mb-2">Score: {result.rawScore} / 25</p>
        <p className="text-lg text-[var(--color-muted)] mb-8">
          {result.rawScore >= 20 ? "Amazing work, Master!" : 
           result.rawScore >= 15 ? "Great job!" : "Good effort!"}
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={() => goTo('home')}>Back to Home</Button>
          <Button onClick={() => goTo('certificate')}>View Certificate</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Final Challenge</h2>
        <p className="text-[var(--color-muted)]">25 questions • Show what you've learned!</p>
      </div>
      <Quiz 
        questions={finalTest} 
        difficultyTier="master" 
        onComplete={handleComplete}
        quizOptions={{ noRetry: true }}
      />
    </div>
  );
}
