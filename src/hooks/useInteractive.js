import { useState, useCallback } from 'react';

export default function useInteractive() {
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [progress, setProgress] = useState(0);

  const recordAttempt = useCallback(() => {
    setAttempts(a => a + 1);
  }, []);

  const markSolved = useCallback((finalProgress = 100) => {
    setSolved(true);
    setProgress(finalProgress);
  }, []);

  const updateProgress = useCallback((newProgress) => {
    setProgress(Math.min(100, Math.max(0, newProgress)));
  }, []);

  const reset = useCallback(() => {
    setAttempts(0);
    setSolved(false);
    setProgress(0);
  }, []);

  return {
    attempts,
    solved,
    progress,
    recordAttempt,
    markSolved,
    updateProgress,
    reset
  };
}
