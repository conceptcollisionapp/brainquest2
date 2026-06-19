import React, { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--color-text)] text-white px-5 py-3 rounded-2xl shadow-xl text-sm flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
