import React from 'react';
import TapMatch from './interactives/TapMatch.jsx';
import SortBuckets from './interactives/SortBuckets.jsx';
import BuildSequence from './interactives/BuildSequence.jsx';
import NumberLine from './interactives/NumberLine.jsx';
import Reveal from './interactives/Reveal.jsx';
import WordBuild from './interactives/WordBuild.jsx';
import useInteractive from '../hooks/useInteractive.js';
import Button from '../components/Button.jsx';

export default function Interactive({ interactive, onComplete }) {
  const hook = useInteractive();

  const renderInteractive = () => {
    const props = { ...interactive, onComplete, hook };
    
    switch (interactive.type) {
      case 'tapmatch': return <TapMatch {...props} />;
      case 'sortbuckets': return <SortBuckets {...props} />;
      case 'buildsequence': return <BuildSequence {...props} />;
      case 'numberline': return <NumberLine {...props} />;
      case 'reveal': return <Reveal {...props} />;
      case 'wordbuild': return <WordBuild {...props} />;
      default: return <div>Unknown interactive type</div>;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl max-w-xl mx-auto">
      <div className="mb-6 text-center">
        <div className="text-2xl font-bold mb-2">Practice Time!</div>
        <div className="text-[var(--color-muted)]">Try the activity below</div>
      </div>
      
      {renderInteractive()}
      
      <div className="mt-8 flex justify-center gap-3">
        <Button variant="secondary" onClick={hook.reset}>Reset</Button>
        <Button 
          onClick={() => {
            if (!hook.solved) hook.markSolved(80);
            onComplete();
          }} 
          disabled={false}
        >
          {hook.solved ? 'Continue to Quiz' : 'Skip to Quiz'}
        </Button>
      </div>
    </div>
  );
}
