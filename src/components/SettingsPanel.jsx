import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext.jsx';
import Button from './Button.jsx';

export default function SettingsPanel({ onClose, goTo }) {
  const { progress, toggleSound, toggleReducedMotion, resetProgress } = useProgress();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetProgress();
    setShowConfirm(false);
    onClose();
    goTo('home');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-md" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-labelledby="settings-title"
      >
        <h2 id="settings-title" className="text-2xl font-bold mb-6">Settings</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="font-medium">Sound Effects</span>
            <button 
              onClick={toggleSound}
              className="min-tap px-4 py-2 rounded-xl border"
            >
              {progress.settings.sound ? 'On' : 'Off'}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Reduced Motion</span>
            <button 
              onClick={toggleReducedMotion}
              className="min-tap px-4 py-2 rounded-xl border"
            >
              {progress.settings.reducedMotion ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="secondary" onClick={() => setShowConfirm(true)}>
            Reset All Progress
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-2xl p-6 max-w-xs text-center" role="dialog">
              <p className="mb-6">Reset all progress? This cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
                <Button onClick={handleReset}>Yes, Reset</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
