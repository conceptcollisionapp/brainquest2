import React from 'react';
import useQuizEngine from '../hooks/useQuizEngine';
import AnswerOption from './components/AnswerOption.jsx';
import FeedbackBubble from './components/FeedbackBubble.jsx';
import HintButton from '../components/HintButton.jsx';
import Button from '../components/Button.jsx';

export default function Quiz({ questions, difficultyTier, onComplete, quizOptions }) {
  const engine = useQuizEngine(questions, difficultyTier, quizOptions);

  const handleNext = () => {
    const result = engine.nextQuestion();
    if (result.finished) {
      onComplete({ rawScore: result.rawScore, starsEarned: result.starsEarned });
    }
  };

  if (!engine.currentQuestion) return null;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-[var(--color-muted)]">
          Question {engine.currentQ + 1} / {engine.totalQuestions}
        </div>
        <div className="text-sm font-semibold">Score: {engine.score}</div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <div className="text-xl font-semibold mb-6">{engine.currentQuestion.question}</div>

        <div className="space-y-3 mb-6">
          {engine.currentQuestion.options.map((option, idx) => (
            <AnswerOption
              key={idx}
              option={option}
              index={idx}
              onSelect={engine.selectAnswer}
              disabled={!!engine.feedback && engine.feedback.correct !== null || engine.locked}
              isCorrect={idx === engine.currentQuestion.correct}
              showFeedback={!!engine.feedback}
            />
          ))}
        </div>

        {engine.feedback && (
          <FeedbackBubble feedback={engine.feedback} onRetry={engine.retryQuestion} />
        )}

        <div className="flex justify-between mt-6">
          {!quizOptions?.noRetry && (
            <HintButton 
              onClick={engine.useHint} 
              disabled={engine.feedback !== null || (engine.hintPolicy === 'one' && engine.hintsUsed >= 1)} 
              used={engine.hintsUsed > 0} 
            />
          )}
          
          {engine.feedback && (
            <Button onClick={handleNext}>
              {engine.currentQ < engine.totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
