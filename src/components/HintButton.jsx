import React from 'react';
import Button from './Button.jsx';

export default function HintButton({ onClick, disabled, used }) {
  return (
    <Button 
      variant="hint" 
      onClick={onClick} 
      disabled={disabled}
      className="flex items-center gap-2"
    >
      💡 Hint {used ? '(used)' : ''}
    </Button>
  );
}
