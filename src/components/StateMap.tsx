import React from 'react';

// This is a simplified version - we'll need to add the actual SVG map of India
function StateMap({ onStateSelect }: { onStateSelect: (state: string) => void }) {
  const demoStates = [
    "Maharashtra", "Kerala", "Gujarat", "Punjab",
    "Tamil Nadu", "Karnataka", "West Bengal", "Rajasthan"
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {demoStates.map((state) => (
        <button
          key={state}
          onClick={() => onStateSelect(state)}
          className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
        >
          <h4 className="font-medium text-gray-800">{state}</h4>
          <p className="text-sm text-gray-500">Click to explore</p>
        </button>
      ))}
    </div>
  );
}

export default StateMap;