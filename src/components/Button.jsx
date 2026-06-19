import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = '' 
}) {
  const base = "min-tap px-6 py-3 rounded-xl font-semibold transition-all active:scale-[0.985] disabled:opacity-50";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-indigo-700",
    secondary: "bg-white border border-gray-300 hover:bg-gray-50",
    answer: "bg-white border-2 border-gray-200 hover:border-[var(--color-primary)] text-left px-4 py-3",
    hint: "bg-amber-100 text-amber-800 px-4 py-2 text-sm"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
