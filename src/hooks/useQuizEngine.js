import { useState, useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';
import useSound from './useSound';

export default function useQuizEngine(questions, difficultyTier, options = {}) {
  const { noRetry = false } = options;
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [locked, setLocked] = useState(false);
  const { play } = useSound();
  const { progress } = useProgress();

  const currentQuestion = questions[currentQ];
  const hintPolicy = difficultyTier === 'master' ? 'none' : difficultyTier === 'thinker' ? 'one' : 'free';

  const selectAnswer = useCallback((optionIndex) => {
    if (locked || (feedback && feedback.correct === true) || (noRetry && feedback)) return;

    const isCorrect = optionIndex === currentQuestion.correct;
    
    if (isCorrect) {
      play('correct');
      if (!feedback || feedback.correct === false) {
        setScore(s => s + 1);
      }
      setFeedback({ correct: true, message: "Great job!" });
      setLocked(true);
    } else {
      play('wrong');
      setFeedback({ correct: false, message: "Try again!" });
      if (noRetry) setLocked(true);
    }
  }, [currentQuestion, locked, feedback, play, noRetry]);

  const useHint = useCallback(() => {
    if (hintPolicy === 'none' || (hintPolicy === 'one' && hintsUsed >= 1) || feedback) return;
    
    setHintsUsed(h => h + 1);
    setFeedback({ 
      correct: null, 
      message: `Hint: The answer relates to ${currentQuestion.question.split(' ').slice(-3).join(' ')}` 
    });
  }, [hintPolicy, hintsUsed, currentQuestion, feedback]);

  const nextQuestion = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setFeedback(null);
      setLocked(false);
    } else {
      const rawScore = score;
      const len = questions.length;
      // Contract-locked: 3/3=3★, 2/3=2★ for daily 3-Q quizzes; generalize for any length
      let stars = 0;
      if (rawScore >= len) stars = 3;
      else if (rawScore >= Math.ceil(len * 2 / 3)) stars = 2;
      else if (rawScore >= Math.ceil(len * 1 / 3)) stars = 1;
      
      return { finished: true, rawScore, starsEarned: stars };
    }
    return { finished: false };
  }, [currentQ, questions.length, score]);

  const retryQuestion = useCallback(() => {
    if (noRetry) return;
    setFeedback(null);
    setLocked(false);
  }, [noRetry]);

  const reset = useCallback(() => {
    setCurrentQ(0);
    setScore(0);
    setFeedback(null);
    setHintsUsed(0);
    setLocked(false);
  }, []);

  return {
    currentQ,
    currentQuestion,
    score,
    feedback,
    hintsUsed,
    locked,
    selectAnswer,
    useHint,
    nextQuestion,
    retryQuestion,
    reset,
    totalQuestions: questions.length,
    hintPolicy
  };
}
