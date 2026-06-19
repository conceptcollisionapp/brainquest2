import React from 'react';
import Button from '../../components/Button.jsx';

export default function FeedbackBubble({ feedback, onRetry }) {
  if (!feedback) return null;

  const isCorrect = feedback.correct === true;
  const isWrong = feedback.correct === false;

  return (
    <div className={`p-4 rounded-2xl ${isCorrect ? 'bg-emerald-50' : isWrong ? 'bg-amber-50' : 'bg-blue-50'}`}>
      <div className="flex items-center justify-between">
        <div className={`font-medium ${isCorrect ? 'text-emerald-700' : isWrong ? 'text-amber-700' : 'text-blue-700'}`}>
          {feedback.message}
        </div>
        
        {isWrong && onRetry && (
          <Button variant="secondary" onClick={onRetry} className="text-sm px-4 py-1.5">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
