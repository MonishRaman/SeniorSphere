import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Play, X, Sparkles } from 'lucide-react';
import useSound from 'use-sound';
import StateDetails from './StateDetails';
import GameLevels from './GameLevels';
import IndiaMapImage from '../Image/Update India Map.png';
import './IndiaMap.css';

const STATES = [
  { 
    id: 'maharashtra',
    name: 'Maharashtra',
    x: 150,
    y: 450,
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
    x: 185,
    y: 650,
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
    x: 140,
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
    x: 240,
    y: 670,
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
    x: 100,
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
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    x: 240,
    y: 550,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456794',
    places: [
      'Tirupati', 'Visakhapatnam', 'Araku Valley', 'Srikalahasti', 'Vijayawada',
      'Lepakshi', 'Horsley Hills', 'Rajahmundry', 'Papikondalu', 'Gandikota'
    ]
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    x: 180,
    y: 560,
    color: '#4ECDC4',
    video: 'https://player.vimeo.com/video/123456795',
    places: [
      'Bangalore', 'Mysore Palace', 'Hampi', 'Coorg', 'Chikmagalur',
      'Gokarna', 'Jog Falls', 'Belur & Halebidu', 'Bijapur', 'Murudeshwar'
    ]
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    x: 270,
    y: 250,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456796',
    places: [
      'Taj Mahal', 'Varanasi', 'Lucknow', 'Prayagraj', 'Mathura',
      'Vrindavan', 'Jhansi', 'Fatehpur Sikri', 'Dudhwa National Park', 'Agra Fort'
    ]
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    x: 450,
    y: 340,
    color: '#4ECDC4',
    video: 'https://player.vimeo.com/video/123456797',
    places: [
      'Kolkata', 'Darjeeling', 'Sundarbans', 'Digha', 'Murshidabad',
      'Shantiniketan', 'Kalimpong', 'Bishnupur', 'Jaldapara Wildlife Sanctuary', 'Victoria Memorial'
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi',
    x: 220,
    y: 235,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456798',
    places: [
      'Red Fort', 'India Gate', 'Qutub Minar', 'Lotus Temple', 'Humayun’s Tomb',
      'Akshardham', 'Jama Masjid', 'Raj Ghat', 'Hauz Khas Village', 'Chandni Chowk'
    ]
  },
  { 
    id: 'andaman_nicobar',
    name: 'Andaman & Nicobar',
    x: 570,
    y: 650,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456794',
    places: [
      'Radhanagar Beach',
      'Cellular Jail',
      'Havelock Island',
      'Ross Island',
      'Neil Island',
      'Baratang Island',
      'Viper Island',
      'North Bay Island',
      'Chidiya Tapu',
      'Mahatma Gandhi Marine National Park'
    ]
  },
  { 
    id: 'arunachal_pradesh',
    name: 'Arunachal Pradesh',
    x: 550,
    y: 240,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456796',
    places: [
      'Tawang',
      'Ziro Valley',
      'Bomdila',
      'Itanagar',
      'Sela Pass',
      'Namdapha National Park',
      'Mechuka',
      'Dirang',
      'Pasighat',
      'Roing'
    ]
  },
  { 
    id: 'assam',
    name: 'Assam',
    x: 550,
    y: 290,
    color: '#4ECDC4',
    video: 'https://player.vimeo.com/video/123456797',
    places: [
      'Kaziranga National Park',
      'Majuli Island',
      'Kamakhya Temple',
      'Manas National Park',
      'Sivasagar',
      'Tezpur',
      'Haflong',
      'Jorhat',
      'Dibrugarh',
      'Umananda Island'
    ]
  },
  { 
    id: 'bihar',
    name: 'Bihar',
    x: 380,
    y: 310,
    color: '#FF6B6B',
    video: 'https://player.vimeo.com/video/123456798',
    places: [
      'Bodh Gaya',
      'Nalanda University',
      'Rajgir',
      'Vaishali',
      'Patna',
      'Madhubani',
      'Kesaria Stupa',
      'Bhagalpur',
      'Sasaram',
      'Gaya'
    ]
  },
  { 
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    x: 350,
    y: 380,
    color: '#4ECDC4',
    video: 'https://player.vimeo.com/video/123456799',
    places: [
      'Chitrakote Falls',
      'Barnawapara Wildlife Sanctuary',
      'Bastar',
      'Raipur',
      'Bhoramdeo Temple',
      'Mainpat',
      'Kanger Valley National Park',
      'Sirpur',
      'Mahant Ghasidas Museum',
      'Tirathgarh Falls'
    ]
  },{
    id: 'ladakh',
    name: 'Ladakh',
    x: 240,
    y: 100,
    color: '#FFD700',
    video: 'https://player.vimeo.com/video/123456801',
    places: [
      'Pangong Lake',
      'Nubra Valley',
      'Magnetic Hill',
      'Zanskar Valley',
      'Hemis Monastery',
      'Tso Moriri',
      'Leh Palace',
      'Khardung La Pass',
      'Shanti Stupa',
      'Lamayuru Monastery'
    ]
  },
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    x: 150,
    y: 110,
    color: '#008000',
    video: 'https://player.vimeo.com/video/123456802',
    places: [
      'Srinagar',
      'Gulmarg',
      'Pahalgam',
      'Sonamarg',
      'Vaishno Devi',
      'Dal Lake',
      'Aru Valley',
      'Betaab Valley',
      'Jammu City',
      'Doodhpathri'
    ]
  },
  {
    id: 'punjab',
    name: 'Punjab',
    x: 180,
    y: 160,
    color: '#FF4500',
    video: 'https://player.vimeo.com/video/123456803',
    places: [
      'Golden Temple',
      'Jallianwala Bagh',
      'Wagah Border',
      'Chandigarh Rock Garden',
      'Anandpur Sahib',
      'Sheesh Mahal',
      'Harike Wetland',
      'Ropar Wetlands',
      'Qila Mubarak',
      'Ludhiana War Museum'
    ]
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    x: 220,
    y: 160,
    color: '#1E90FF',
    video: 'https://player.vimeo.com/video/123456804',
    places: [
      'Shimla',
      'Manali',
      'Dalhousie',
      'Dharamshala',
      'Kullu',
      'Spiti Valley',
      'Kasol',
      'Kinnaur',
      'McLeod Ganj',
      'Khajjiar'
    ]
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    x: 250,
    y: 200,
    color: '#FF1493',
    video: 'https://player.vimeo.com/video/123456805',
    places: [
      'Rishikesh',
      'Haridwar',
      'Mussoorie',
      'Nainital',
      'Jim Corbett National Park',
      'Badrinath',
      'Kedarnath',
      'Valley of Flowers',
      'Auli',
      'Chopta'
    ]
  },
  {
    id: 'haryana',
    name: 'Haryana',
    x: 200,
    y: 230,
    color: '#800080',
    video: 'https://player.vimeo.com/video/123456806',
    places: [
      'Kurukshetra',
      'Sultanpur National Park',
      'Pinjore Gardens',
      'Damdama Lake',
      'Surajkund',
      'Brahma Sarovar',
      'Morni Hills',
      'Farrukhnagar Fort',
      'Rock Garden Chandigarh',
      'Tilyar Lake'
    ]
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    x: 250,
    y: 350,
    color: '#A52A2A',
    video: 'https://player.vimeo.com/video/123456807',
    places: [
      'Khajuraho Temples',
      'Kanha National Park',
      'Pachmarhi',
      'Bhimbetka Caves',
      'Sanchi Stupa',
      'Gwalior Fort',
      'Ujjain Mahakaleshwar',
      'Bhopal Upper Lake',
      'Orchha Fort',
      'Bandhavgarh National Park'
    ]
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    x: 450,
    y: 250,
    color: '#008B8B',
    video: 'https://player.vimeo.com/video/123456808',
    places: [
      'Tsomgo Lake',
      'Nathula Pass',
      'Yumthang Valley',
      'Lachung',
      'Pelling',
      'Ravangla',
      'Gurudongmar Lake',
      'Zuluk',
      'Gangtok',
      'Rumtek Monastery'
    ]
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    x: 580,
    y: 280,
    color: '#4682B4',
    video: 'https://player.vimeo.com/video/123456809',
    places: [
      'Kohima',
      'Dzukou Valley',
      'Mokokchung',
      'Japfu Peak',
      'Khonoma Village',
      'Tuophema Village',
      'Mon Town',
      'Dimapur',
      'Shilloi Lake',
      'Nagaland State Museum'
    ]
  },
  {
    id: 'manipur',
    name: 'Manipur',
    x: 570,
    y: 310,
    color: '#32CD32',
    video: 'https://player.vimeo.com/video/123456810',
    places: [
      'Loktak Lake',
      'Imphal',
      'Kangla Fort',
      'Sendra Island',
      'Thoubal',
      'Keibul Lamjao National Park',
      'Khongjom War Memorial',
      'Andro Village',
      'Ukhrul',
      'Moirang'
    ]
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    x: 550,
    y: 350,
    color: '#FF69B4',
    video: 'https://player.vimeo.com/video/123456811',
    places: [
      'Aizawl',
      'Reiek',
      'Vantawng Falls',
      'Murlen National Park',
      'Phawngpui Peak',
      'Dampa Tiger Reserve',
      'Lunglei',
      'Hmuifang',
      'Saiha',
      'Champhai'
    ]
  },
  {
    id: 'tripura',
    name: 'Tripura',
    x: 530,
    y: 340,
    color: '#DC143C',
    video: 'https://player.vimeo.com/video/123456812',
    places: [
      'Ujjayanta Palace',
      'Neermahal',
      'Sepahijala Wildlife Sanctuary',
      'Jampui Hills',
      'Unakoti',
      'Pilak',
      'Bhuvaneswari Temple',
      'Tripura Sundari Temple',
      'Dumboor Lake',
      'Kamalasagar Lake'
    ]
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    x: 400,
    y: 360,
    color: '#9932CC',
    video: 'https://player.vimeo.com/video/123456813',
    places: [
      'Betla National Park',
      'Dassam Falls',
      'Hundru Falls',
      'Jagannath Temple Ranchi',
      'Netarhat',
      'Parasnath Hills',
      'Deoghar',
      'Patratu Valley',
      'Jubilee Park',
      'Baidyanath Temple'
    ]
  },
  {
    id: 'odisha',
    name: 'Odisha',
    x: 400,
    y: 410,
    color: '#FF4500',
    video: 'https://player.vimeo.com/video/123456814',
    places: [
      'Puri',
      'Konark Sun Temple',
      'Chilika Lake',
      'Bhubaneswar',
      'Simlipal National Park',
      'Dhauli Hills',
      'Hirakud Dam',
      'Gopalpur Beach',
      'Raghurajpur',
      'Cuttack'
    ]
  },
  {
    id: 'telangana',
    name: 'Telangana',
    x: 240,
    y: 500,
    color: '#FF8C00',
    video: 'https://player.vimeo.com/video/123456815',
    places: [
      'Charminar',
      'Golconda Fort',
      'Ramoji Film City',
      'Hussain Sagar Lake',
      'Birla Mandir',
      'Nagarjuna Sagar Dam',
      'Chowmahalla Palace',
      'Medak Fort',
      'Warangal Fort',
      'KBR National Park'
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    x: 135,
    y: 550,
    color: '#FF4500',
    video: 'https://player.vimeo.com/video/123456816',
    places: [
      'Baga Beach',
      'Calangute Beach',
      'Dudhsagar Falls',
      'Basilica of Bom Jesus',
      'Aguada Fort',
      'Palolem Beach',
      'Chapora Fort',
      'Anjuna Beach',
      'Dona Paula',
      'Reis Magos Fort'
    ]
  },
  {
    id: 'lakshadweep',
    name: 'Lakshadweep',
    x: 90,
    y: 670,
    color: '#20B2AA',
    video: 'https://player.vimeo.com/video/123456817',
    places: [
      'Bangaram Island',
      'Minicoy Island',
      'Agatti Island',
      'Kavaratti Island',
      'Kalpeni Island',
      'Thinnakara Island',
      'Kadmat Island',
      'Andretti Island',
      'Pitti Bird Sanctuary',
      'Marine Museum Kavaratti'
    ]
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    x: 500,
    y: 300,
    color: '#6A5ACD',
    video: 'https://player.vimeo.com/video/123456818',
    places: [
      'Cherrapunji',
      'Shillong',
      'Mawsynram',
      'Dawki River',
      'Umiam Lake',
      'Living Root Bridges',
      'Laitlum Canyons',
      'Nohkalikai Falls',
      'Mawlynnong Village',
      'Elephant Falls'
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
    <div className="min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&q=80&w=2000')] bg-contain md:bg-cover bg-center bg-fixed p-4 relative pt-20">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-sm" /> */}
      
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
                className="text-5xl font-bold text-center mb-4 text-white"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Explore Incredible India
              </motion.h2>

              <div className=" mx-auto">
                {/* India Map */}
                <div className="map-container">
                  <img src={IndiaMapImage} alt="India Map" className="map-image" />
                  {STATES.map((state) => (
                    <motion.div
                      key={state.id}
                      className="dot"
                      style={{ top: `${state.y}px`, left: `${state.x}px` }}
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