import React, { useState } from 'react';
import { curriculum } from '../data/curriculum.js';
import { useProgress } from '../context/ProgressContext.jsx';
import LessonCard from './LessonCard.jsx';
import Interactive from './Interactive.jsx';
import Quiz from './Quiz.jsx';
import RewardCard from './components/RewardCard.jsx';
import Button from '../components/Button.jsx';

export default function DayScreen({ dayId, goTo }) {
  const { progress, completeDay } = useProgress();
  const [step, setStep] = useState('lesson');
  const [quizResult, setQuizResult] = useState(null);

  const dayData = curriculum.find(d => d.id === dayId);
  if (!dayData) return <div>Day not found</div>;

  const handleInteractiveComplete = () => {
    setStep('quiz');
  };

  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setStep('reward');
    
    const alreadyDone = progress.completedDays.includes(dayId);
    const passed = result.rawScore >= Math.ceil(dayData.quiz.length * 2 / 3);
    
    if (!alreadyDone && passed) {
      completeDay(dayId, result.rawScore, result.starsEarned);
    }
  };

  const handleContinue = () => {
    if (dayId < 30) {
      goTo('day', dayId + 1);
    } else {
      goTo('calendar');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-[var(--color-muted)]">Day {dayId}</div>
          <div className="text-2xl font-bold capitalize">{dayData.category}</div>
        </div>
        <Button variant="secondary" onClick={() => goTo('calendar')}>Back to Calendar</Button>
      </div>

      {step === 'lesson' && (
        <LessonCard 
          lesson={dayData.lesson} 
          onNext={() => setStep('interactive')} 
        />
      )}

      {step === 'interactive' && (
        <Interactive 
          interactive={dayData.interactive} 
          onComplete={handleInteractiveComplete} 
        />
      )}

      {step === 'quiz' && (
        <Quiz 
          questions={dayData.quiz} 
          difficultyTier={dayData.difficultyTier}
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'reward' && quizResult && (
        <RewardCard 
          result={quizResult} 
          dayId={dayId}
          onContinue={handleContinue}
          passed={quizResult.rawScore >= Math.ceil(dayData.quiz.length * 2 / 3)}
          totalQuestions={dayData.quiz.length}
        />
      )}
    </div>
  );
}
