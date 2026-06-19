import { useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';

let audioContext;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1200;
  
  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  oscillator.start();
  
  setTimeout(() => {
    try {
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      setTimeout(() => {
        try { oscillator.stop(); } catch {}
      }, 60);
    } catch {}
  }, duration);
}

const soundGenerators = {
  click: () => playTone(880, 80, 'square', 0.2),
  correct: () => {
    playTone(660, 120, 'sine', 0.35);
    setTimeout(() => playTone(880, 140, 'sine', 0.35), 90);
  },
  wrong: () => playTone(220, 220, 'sawtooth', 0.25),
  levelup: () => {
    playTone(523, 100, 'sine', 0.3);
    setTimeout(() => playTone(659, 100, 'sine', 0.3), 80);
    setTimeout(() => playTone(784, 180, 'sine', 0.3), 160);
  }
};

export default function useSound() {
  const { progress } = useProgress();
  
  const play = useCallback((type) => {
    if (!progress.settings.sound) return;
    const generator = soundGenerators[type];
    if (generator) {
      try {
        generator();
      } catch (e) {
        // Fail silently if audio context blocked
      }
    }
  }, [progress.settings.sound]);

  return { play };
}
