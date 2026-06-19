import React, { useState } from 'react';

export default function SortBuckets({ target, onComplete, hook }) {
  const [buckets, setBuckets] = useState({ living: [], nonliving: [] });
  const items = [
    { id: 1, label: '🐱 Cat', type: 'living' },
    { id: 2, label: '🪑 Chair', type: 'nonliving' },
    { id: 3, label: '🌳 Tree', type: 'living' },
    { id: 4, label: '🚗 Car', type: 'nonliving' }
  ];

  const move = (item, bucket) => {
    hook.recordAttempt();
    setBuckets(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        next[k] = next[k].filter(x => x.id !== item.id);
      });
      next[bucket] = [...next[bucket], item];
      const done = items.every(i =>
        (i.type === 'living' && next.living.some(x => x.id === i.id)) ||
        (i.type === 'nonliving' && next.nonliving.some(x => x.id === i.id))
      );
      if (done) {
        hook.markSolved();
        setTimeout(onComplete, 400);
      }
      return next;
    });
  };

  const unplaced = items.filter(i => 
    !Object.values(buckets).flat().some(x => x.id === i.id)
  );

  return (
    <div>
      <p className="text-center mb-4">Sort items: {target}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {unplaced.map(item => (
          <div key={item.id} className="px-4 py-2 bg-white border rounded-xl text-sm">{item.label}</div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {['living', 'nonliving'].map(b => (
          <div key={b} className="border-2 border-dashed rounded-2xl p-4 min-h-[140px]">
            <div className="font-semibold mb-2 capitalize">{b}</div>
            <div className="space-y-2">
              {buckets[b].map(item => <div key={item.id} className="bg-white px-3 py-1.5 rounded-lg border text-sm">{item.label}</div>)}
            </div>
            <div className="flex gap-2 mt-3">
              {unplaced.map(item => (
                <button key={item.id} onClick={() => move(item, b)} className="text-xs px-2 py-1 bg-indigo-100 rounded">→ {b}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
