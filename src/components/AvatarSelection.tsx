import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const AVATARS = {
  grandfather: 'https://img.freepik.com/free-photo/view-3d-man-working-justice-law-field_23-2151228049.jpg?uid=R131718460&ga=GA1.1.1947381780.1739541550&semt=ais_authors_boost',
  grandmother: 'https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034081.jpg?uid=R131718460&ga=GA1.1.1947381780.1739541550&semt=ais_authors_boost'
};

function AvatarSelection({ 
  onSelect, 
  onBack 
}: { 
  onSelect: (avatar: 'grandfather' | 'grandmother') => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        <button
          onClick={onBack}
          className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Choose Your Avatar
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {(['grandfather', 'grandmother'] as const).map((avatar) => (
            <motion.button
              key={avatar}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(avatar)}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-transparent hover:border-indigo-500 transition-colors">
                <img
                  src={AVATARS[avatar]}
                  alt={avatar}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-medium text-gray-800 capitalize">
                {avatar}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default AvatarSelection