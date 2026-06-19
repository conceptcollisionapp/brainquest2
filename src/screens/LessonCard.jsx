import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import Mascot from '../components/Mascot.jsx';

export default function LessonCard({ lesson, onNext }) {
  const [revealed, setRevealed] = useState(0);
  const parts = lesson.split('. ').filter(Boolean);

  const handleReveal = () => {
    if (revealed < parts.length - 1) {
      setRevealed(revealed + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl max-w-xl mx-auto">
      <Mascot line="Let's learn something new!" mood="thinking" />
      
      <div className="mt-8 space-y-4">
        {parts.slice(0, revealed + 1).map((part, index) => (
          <div 
            key={index} 
            className="text-xl leading-relaxed animate-[pop_0.3s_ease-out]"
          >
            {part}{index < parts.length - 1 ? '.' : ''}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={handleReveal}>
          {revealed < parts.length - 1 ? 'Next' : 'Start Activity'}
        </Button>
      </div>
    </div>
  );
}
