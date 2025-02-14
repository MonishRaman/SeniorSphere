import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Landmark } from 'lucide-react';

type Question = {
  type: 'mcq' | 'dragDrop' | 'match';
  question: string;
  options: string[];
  correct: string | string[];
};

const QUESTIONS: Question[] = [
  {
    type: 'mcq',
    question: 'Which dance form originated from this region?',
    options: ['Bharatanatyam', 'Kathak', 'Odissi', 'Kuchipudi'],
    correct: 'Bharatanatyam'
  },
  // Add more questions...
];

function CultureLevel({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[500px] relative bg-cover bg-center p-8 rounded-xl overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=2000&h=1000)',
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <Music className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-sm font-medium">Dance & Music</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-sm font-medium">Famous People</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <Landmark className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-sm font-medium">Landmarks</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {QUESTIONS[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
              {QUESTIONS[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    if (option === QUESTIONS[currentQuestion].correct) {
                      setScore(score + 1);
                    }
                    if (currentQuestion < QUESTIONS.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    } else {
                      onComplete();
                    }
                  }}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}