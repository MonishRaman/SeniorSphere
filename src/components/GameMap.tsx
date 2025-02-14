import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Play, X, Sparkles } from 'lucide-react';
import useSound from 'use-sound';
import StateDetails from './StateDetails';
import GameLevels from './GameLevels';

const STATES = [
  { 
    id: 'maharashtra',
    name: 'Maharashtra',
    x: 300,
    y: 400,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456789',
    places: [
      'Gateway of India',
      'Ajanta Caves',
      'Ellora Caves',
      'Shirdi',
      'Mahabaleshwar',
      'Lonavala',
      'Pune',
      'Kolhapur',
      'Nashik',
      'Aurangabad'
    ]
  },
  { 
    id: 'kerala',
    name: 'Kerala',
    x: 280,
    y: 600,
    color: '#4ECDC4',
    video: 'https://player.vimeo.com/video/123456790',
    places: [
      'Alleppey Backwaters',
      'Munnar',
      'Wayanad',
      'Kovalam Beach',
      'Fort Kochi',
      'Thekkady',
      'Varkala',
      'Kumarakom',
      'Bekal Fort',
      'Athirapally Falls'
    ]
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    x: 200,
    y: 300,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456791',
    places: [
      'Jaipur',
      'Udaipur',
      'Jodhpur',
      'Jaisalmer',
      'Pushkar',
      'Mount Abu',
      'Bikaner',
      'Chittorgarh',
      'Ranthambore',
      'Ajmer'
    ]
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    x: 320,
    y: 580,
    color: '#4ECDC4',
    video: 'https://player.vimeo.com/video/123456792',
    places: [
      'Marina Beach',
      'Meenakshi Temple',
      'Ooty',
      'Kodaikanal',
      'Mahabalipuram',
      'Kanyakumari',
      'Rameshwaram',
      'Thanjavur',
      'Yelagiri',
      'Coonoor'
    ]
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    x: 150,
    y: 350,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456793',
    places: [
      'Rann of Kutch',
      'Gir Forest',
      'Somnath Temple',
      'Sabarmati Ashram',
      'Dwarka',
      'Statue of Unity',
      'Akshardham',
      'Laxmi Vilas Palace',
      'Saputara',
      'Porbandar'
    ]
  }
];

function GameMap({ onBack }: { onBack: () => void }) {
  const [selectedState, setSelectedState] = useState<typeof STATES[0] | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const handleStateClick = (state: typeof STATES[0]) => {
    setSelectedState(state);
    setShowVideo(true);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-fixed p-4 relative pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-sm" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="mb-6 text-white hover:text-indigo-200 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <AnimatePresence mode="wait">
          {!selectedPlace && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8"
            >
              <motion.h2 
                className="text-5xl font-bold text-center mb-8 text-white"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Explore Incredible India
              </motion.h2>

              <div className="relative w-[800px] h-[600px] mx-auto">
                {/* Background map pattern */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000&h=1000')] bg-cover bg-center opacity-20"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                  />
                </div>

                {/* India Map */}
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full relative z-10"
                >
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <linearGradient id="mapStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M400,100 C500,150 600,200 650,300 C700,400 600,500 500,550 C400,600 300,550 200,500 C100,450 50,350 100,250 C150,150 300,50 400,100"
                    fill="none"
                    stroke="url(#mapStroke)"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />
                  
                  {/* Interactive State Markers */}
                  {STATES.map((state) => (
                    <g key={state.id}>
                      <motion.circle
                        cx={state.x}
                        cy={state.y}
                        r="12"
                        fill={state.color}
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: hoveredState === state.id ? 1.2 : 1,
                          filter: hoveredState === state.id ? 'url(#glow)' : 'none'
                        }}
                        whileHover={{ scale: 1.2 }}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleStateClick(state)}
                        onMouseEnter={() => setHoveredState(state.id)}
                        onMouseLeave={() => setHoveredState(null)}
                      />
                      <motion.text
                        x={state.x}
                        y={state.y + 25}
                        textAnchor="middle"
                        fill="#fff"
                        className="text-sm font-medium pointer-events-none drop-shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {state.name}
                      </motion.text>
                      {hoveredState === state.id && (
                        <motion.circle
                          cx={state.x}
                          cy={state.y}
                          r="20"
                          fill={state.color}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 1.5
                          }}
                        />
                      )}
                    </g>
                  ))}
                </svg>

                {/* Floating Markers */}
                {STATES.map((state) => (
                  <motion.div
                    key={state.id}
                    className="absolute"
                    style={{ left: state.x - 16, top: state.y - 16 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleStateClick(state)}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative"
                    >
                      <MapPin className="w-8 h-8 text-white filter drop-shadow-lg" />
                      {hoveredState === state.id && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedState && showVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
            >
              <motion.div 
                className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-md rounded-2xl p-6 max-w-4xl w-full mx-4 relative border border-white/20"
                layoutId={`state-${selectedState.id}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <motion.h3 
                    className="text-2xl font-bold text-white"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                  >
                    Discovering {selectedState.name}
                  </motion.h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowVideo(false)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <motion.div 
                  className="aspect-video bg-black rounded-lg overflow-hidden"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <iframe
                    src={selectedState.video}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {selectedState && !showVideo && !selectedPlace && (
            <StateDetails
              state={selectedState}
              onPlaceSelect={setSelectedPlace}
            />
          )}

          {selectedPlace && (
            <GameLevels
              stateName={selectedState?.name || ''}
              placeName={selectedPlace}
              onBack={() => setSelectedPlace(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GameMap;