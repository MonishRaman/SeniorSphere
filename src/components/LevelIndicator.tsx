import React from 'react';
import { Book, MapPin, Utensils, PartyPopper } from 'lucide-react';

function LevelIndicator() {
  const levels = [
    { icon: Book, label: 'History', active: true },
    { icon: MapPin, label: 'Culture', active: false },
    { icon: Utensils, label: 'Cuisine', active: false },
    { icon: PartyPopper, label: 'Festivals', active: false },
  ];

  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto mb-8">
      {levels.map((level, index) => (
        <div key={level.label} className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
              level.active
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <level.icon className="w-6 h-6" />
          </div>
          <span className={`text-sm ${level.active ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
            {level.label}
          </span>
          {index < levels.length - 1 && (
            <div className="absolute w-16 h-0.5 bg-gray-200 -z-10"
                 style={{ left: `calc(${(index + 1) * 25}% - 2rem)` }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default LevelIndicator;