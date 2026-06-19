import React, { useState } from 'react';
import Mascot from './Mascot.jsx';
import SettingsPanel from './SettingsPanel.jsx';
import { useProgress } from '../context/ProgressContext.jsx';

export default function Layout({ children, goTo, currentView }) {
  const { progress, toggleSound } = useProgress();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm no-print">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => goTo('home')} 
            className="flex items-center gap-2 text-xl font-bold text-[var(--color-primary)]"
          >
            🧠 BrainQuest
          </button>
          {progress.currentDay > 1 && (
            <div className="text-sm text-[var(--color-muted)]">
              Day {progress.currentDay} • {progress.streak} day streak
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleSound} 
            className="min-tap p-2 rounded-full hover:bg-gray-100"
            aria-label={progress.settings.sound ? "Mute sound" : "Enable sound"}
          >
            {progress.settings.sound ? '🔊' : '🔇'}
          </button>
          <button 
            onClick={() => setShowSettings(true)} 
            className="min-tap p-2 rounded-full hover:bg-gray-100"
            aria-label="Open settings"
          >
            ⚙️
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>

      {showSettings && (
        <SettingsPanel 
          onClose={() => setShowSettings(false)} 
          goTo={goTo} 
        />
      )}
    </div>
  );
}
