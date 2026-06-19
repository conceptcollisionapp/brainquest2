import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext.jsx';
import { finalTest } from '../data/finalTest.js';
import Button from '../components/Button.jsx';
import Mascot from '../components/Mascot.jsx';

export default function CertificateScreen({ goTo }) {
  const { progress, setChildName } = useProgress();
  const [inputName, setInputName] = useState('');
  const [showInput, setShowInput] = useState(!progress.childName);

  const name = progress.childName || 'Brainiac!';
  const score = progress.finalTestScore || 0;
  const total = finalTest.length;
  const percentage = Math.round((score / total) * 100);

  const handleNameSubmit = () => {
    if (inputName.trim()) {
      setChildName(inputName.trim());
      setShowInput(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {showInput && (
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8 text-center">
          <Mascot line="What's your name for the certificate?" mood="happy" />
          <div className="mt-6 flex gap-3 justify-center">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter your name"
              className="px-4 py-3 border-2 rounded-xl text-lg min-tap"
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
            />
            <Button onClick={handleNameSubmit} disabled={!inputName.trim()}>
              Save Name
            </Button>
          </div>
          <p className="text-sm text-[var(--color-muted)] mt-3">This will be saved for your certificate.</p>
        </div>
      )}

      <div className="bg-white rounded-3xl p-12 shadow-2xl border-8 border-[var(--color-primary)] text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-5xl font-bold text-[var(--color-primary)] mb-2">Certificate of Achievement</h1>
          <p className="text-xl text-[var(--color-muted)]">BrainQuest 30-Day Challenge</p>
        </div>

        <div className="my-10">
          <p className="text-lg mb-2">This certifies that</p>
          <p className="text-4xl font-bold text-[var(--color-primary)] my-4">{name}</p>
          <p className="text-lg">has successfully completed the BrainQuest challenge</p>
          <p className="text-2xl font-semibold mt-4">with a final score of {score}/{total} ({percentage}%)</p>
        </div>

        <div className="flex justify-center gap-8 text-sm text-[var(--color-muted)] mt-8">
          <div>30 Days Completed</div>
          <div>{progress.streak} Day Streak</div>
          <div>{progress.stars} Stars Earned</div>
        </div>

        <div className="mt-10 text-xs text-[var(--color-muted)]">
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-8 no-print">
        <Button variant="secondary" onClick={() => goTo('home')}>Back to Home</Button>
        <Button onClick={handlePrint}>Print Certificate</Button>
      </div>
    </div>
  );
}
