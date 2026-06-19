import React from 'react';

export default function AnswerOption({ option, index, onSelect, disabled, isCorrect, showFeedback }) {
  const getClassName = () => {
    let base = "w-full p-4 rounded-2xl border-2 text-left transition-all min-tap ";
    
    if (showFeedback) {
      if (isCorrect) {
        base += "bg-emerald-100 border-emerald-500 text-emerald-800";
      } else {
        base += "bg-gray-100 border-gray-300 text-gray-500";
      }
    } else {
      base += disabled 
        ? "bg-gray-100 border-gray-200" 
        : "bg-white border-gray-200 hover:border-indigo-400 active:bg-indigo-50";
    }
    
    return base;
  };

  return (
    <button
      onClick={() => onSelect(index)}
      disabled={disabled}
      className={getClassName()}
    >
      {option}
    </button>
  );
}
