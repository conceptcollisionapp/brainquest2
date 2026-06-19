import React, { useState } from 'react';

export default function SortBuckets({ target, onComplete, hook }) {
  const [buckets, setBuckets] = useState({ living: [], nonliving: [] });
  const items = [
    { id: 1, label: '🐱 Cat', type: 'living' },
    { id: 2, label: '🪑 Chair', type: 'nonliving' },
    { id: 3, label: '🌳 Tree', type: 'living' },
    { id: 4, label: '🚗 Car', type: 'nonliving' }
  ];

  const moveToBucket = (item, bucket) => {
    hook.recordAttempt();
    
    setBuckets(prev => {
      const newBuckets = { ...prev };
      Object.keys(newBuckets).forEach(key => {
        newBuckets[key] = newBuckets[key].filter(i => i.id !== item.id);
      });
      newBuckets[bucket] = [...newBuckets[bucket], item];
      
      const allSorted = items.every(i => 
        (i.type === 'living' && newBuckets.living.some(b => b.id === i.id)) ||
        (i.type === 'nonliving' && newBuckets.nonliving.some(b => b.id === i.id))
      );
      
      if (allSorted) {
        hook.markSolved();
        setTimeout(onComplete, 500);
      }
      
      return newBuckets;
    });
  };

  return (
    <div>
      <p className="text-center mb-4">Sort items into the correct buckets</p>
      
      <div className="flex gap-4 mb-6">
        {items.filter(i => !Object.values(buckets).flat().some(b => b.id === i.id)).map(item => (
          <div key={item.id} className="px-4 py-2 bg-white border rounded-xl text-sm">
            {item.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {['living', 'nonliving'].map(bucket => (
          <div key={bucket} className="border-2 border-dashed rounded-2xl p-4 min-h-[140px]">
            <div className="font-semibold mb-2 capitalize">{bucket} Things</div>
            <div className="space-y-2">
              {buckets[bucket].map(item => (
                <div key={item.id} className="bg-white px-3 py-1.5 rounded-lg border text-sm">{item.label}</div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              {items.filter(i => !buckets[bucket].some(b => b.id === i.id) && 
                Object.values(buckets).flat().every(b => b.id !== i.id)).map(item => (
                <button key={item.id} onClick={() => moveToBucket(item, bucket)} className="text-xs px-2 py-1 bg-indigo-100 rounded">
                  → {bucket}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
