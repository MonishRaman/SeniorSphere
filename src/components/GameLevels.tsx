import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Book, MapPin, Utensils, PartyPopper, Play } from 'lucide-react';
import LevelIndicator from './LevelIndicator';

type GameLevelsProps = {
  stateName: string;
  placeName: string;
  onBack: () => void;
};

const LEVELS = [
  {
    id: 'history',
    title: 'History & Storytelling',
    icon: Book,
    description: 'Learn about the rich history and fascinating stories behind this place.',
  },
  {
    id: 'culture',
    title: 'Cultural Activities',
    icon: MapPin,
    description: 'Explore the vibrant cultural heritage through interactive challenges.',
  },
  {
    id: 'cuisine',
    title: 'Local Cuisine',
    icon: Utensils,
    description: 'Discover the delicious local delicacies and culinary traditions.',
  },
  {
    id: 'festivities',
    title: 'Festivities & GK',
    icon: PartyPopper,
    description: 'Test your knowledge about local celebrations and traditions.',
  },
];

function GameLevels({ stateName, placeName, onBack }: GameLevelsProps) {
  const [currentLevel, setCurrentLevel] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <button
        onClick={onBack}
        className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {stateName}
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {placeName}
        </h2>
        <p className="text-gray-600">Complete all levels to master this destination!</p>
      </div>

      <LevelIndicator currentLevel={currentLevel} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {LEVELS.map((level, index) => {
          const isLocked = index > currentLevel;
          return (
            <motion.div
              key={level.id}
              whileHover={!isLocked ? { scale: 1.02 } : {}}
              className={`relative rounded-xl p-6 ${
                isLocked ? 'bg-gray-100' : 'bg-indigo-50 cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isLocked ? 'bg-gray-200' : 'bg-indigo-100'
                }`}>
                  <level.icon className={`w-6 h-6 ${
                    isLocked ? 'text-gray-400' : 'text-indigo-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isLocked ? 'text-gray-400' : 'text-gray-800'
                  }`}>
                    {level.title}
                  </h3>
                  <p className={isLocked ? 'text-gray-400' : 'text-gray-600'}>
                    {level.description}
                  </p>
                </div>
              </div>
              {!isLocked && (
                <button className="absolute bottom-6 right-6 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                  <Play className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default GameLevels;
