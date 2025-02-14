import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';

type StateDetailsProps = {
  state: {
    name: string;
    places: string[];
  };
  onPlaceSelect: (place: string) => void;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

function StateDetails({ state, onPlaceSelect }: StateDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8"
    >
      <motion.h2 
        className="text-4xl font-bold text-center mb-8 text-white"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Discover {state.name}
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {state.places.map((place, index) => (
          <motion.button
            key={place}
            variants={item}
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl text-left hover:shadow-lg transition-all border border-white/10 hover:border-white/30"
            onClick={() => onPlaceSelect(place)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-start gap-3">
              <div className="relative">
                <MapPin className="w-6 h-6 text-indigo-300" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {place}
                </h3>
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" />
              </div>
            </div>

            <motion.div
              className="absolute bottom-2 right-2"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
            >
              <div className="text-xs font-medium text-white bg-indigo-500/30 px-2 py-1 rounded-full border border-indigo-400/30">
                Explore
              </div>
            </motion.div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default StateDetails;