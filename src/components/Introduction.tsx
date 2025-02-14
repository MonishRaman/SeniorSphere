import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const AVATARS = {
  grandfather: 'https://img.freepik.com/free-photo/view-3d-man-working-justice-law-field_23-2151228049.jpg',
  grandmother: 'https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034081.jpg'
};

function Introduction({ 
  avatarType,
  userName,
  onNext,
  onBack
}: { 
  avatarType: 'grandfather' | 'grandmother';
  userName: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const messages = [
    `Welcome to Senior Sphere, ${userName}! I'll be your guide on this wonderful journey through India's rich culture and heritage.`,
    "Get ready to explore famous landmarks, delicious cuisines, and fascinating traditions!",
    "Through fun and interactive games, you'll uncover the stories that shaped India's history.",
    "Complete challenges, unlock new states, and embark on a learning adventure like never before!",
    "Let's begin this exciting journey together!"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayText(''); // Reset text when switching to a new message
    setIsTyping(true);
  }, [currentMessageIndex]);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];

    if (displayText.length < currentMessage.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentMessage.slice(0, displayText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [displayText, currentMessageIndex, messages]);

  const handleNext = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      onNext(); // Move to the next screen when all messages are done
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between mb-8">
          <button
            onClick={onBack}
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={isTyping}
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 disabled:opacity-50"
          >
            {currentMessageIndex < messages.length - 1 ? "Next" : "Start"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0"
          >
            <img
              src={AVATARS[avatarType]}
              alt={avatarType}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-grow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-50 rounded-2xl p-6 relative"
            >
              <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 bg-indigo-50 rotate-45" />
              <p className="text-xl text-gray-800 font-medium" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
                {displayText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Introduction;
