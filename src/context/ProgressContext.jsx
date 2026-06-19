import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useLocalStorage('brainquest_v2', {
    completedDays: [],
    currentDay: 1,
    stars: 0,
    streak: 0,
    lastPlayedDate: null,
    finalTestScore: null,
    childName: null,
    bestScores: {},
    settings: { sound: false, reducedMotion: false }
  });

  useEffect(() => {
    if (window.matchMedia && !progress.settings.reducedMotion) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setProgress(p => ({...p, settings: {...p.settings, reducedMotion: true}}));
      }
    }
  }, []);

  const updateStreak = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    if (!dateStr) return { streak: 1, lastPlayedDate: today };
    if (dateStr === today) return { streak: progress.streak, lastPlayedDate: today };
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (dateStr === yesterday) return { streak: progress.streak + 1, lastPlayedDate: today };
    return { streak: 1, lastPlayedDate: today };
  };

  const completeDay = (dayId, rawScore, earnedStars) => {
    setProgress(p => {
      const alreadyCompleted = p.completedDays.includes(dayId);
      const newBest = Math.max(p.bestScores[dayId] || 0, rawScore);
      const newStars = alreadyCompleted ? p.stars : p.stars + earnedStars;
      const streakUpdate = alreadyCompleted 
        ? { streak: p.streak, lastPlayedDate: p.lastPlayedDate }
        : updateStreak(p.lastPlayedDate);
      
      return {
        ...p,
        completedDays: alreadyCompleted ? p.completedDays : [...p.completedDays, dayId].sort((a,b)=>a-b),
        currentDay: Math.max(p.currentDay, dayId + 1),
        stars: newStars,
        bestScores: {...p.bestScores, [dayId]: newBest},
        streak: streakUpdate.streak,
        lastPlayedDate: streakUpdate.lastPlayedDate
      };
    });
  };

  const recordFinalScore = (score) => setProgress(p => ({...p, finalTestScore: score}));
  const setChildName = (name) => setProgress(p => ({...p, childName: name}));
  const resetProgress = () => setProgress({
    completedDays: [], currentDay: 1, stars: 0, streak: 0, lastPlayedDate: null,
    finalTestScore: null, childName: null, bestScores: {}, settings: progress.settings
  });
  const toggleSound = () => setProgress(p => ({...p, settings: {...p.settings, sound: !p.settings.sound}}));
  const toggleReducedMotion = () => setProgress(p => ({...p, settings: {...p.settings, reducedMotion: !p.settings.reducedMotion}}));

  return (
    <ProgressContext.Provider value={{ progress, completeDay, recordFinalScore, setChildName, resetProgress, toggleSound, toggleReducedMotion }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
