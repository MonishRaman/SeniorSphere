import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { Volume2, VolumeX } from 'lucide-react';

type HistoryLevelProps = {
  placeName: string;
  onComplete: () => void;
};

function HistoryLevel({ placeName, onComplete }: HistoryLevelProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const storyText = `Welcome to ${placeName}! This historic place has been a witness to centuries of rich cultural heritage...`;

  useEffect(() => {
    if (displayText.length < storyText.length) {
      const timer = setTimeout(() => {
        setDisplayText(storyText.slice(0, displayText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayText, storyText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[500px] relative bg-cover bg-center p-8 rounded-xl overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000&h=1000)',
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">The Story of {placeName}</h3>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isPlaying ? (
                <VolumeX className="w-6 h-6 text-gray-600" />
              ) : (
                <Volume2 className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
          
          <div className="prose prose-lg">
            <p className="text-gray-700 leading-relaxed">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {displayText.length === storyText.length && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={onComplete}
              className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continue to Cultural Activities
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}