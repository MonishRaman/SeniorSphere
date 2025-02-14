import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import ProfileSetup from './components/ProfileSetup';
import AvatarSelection from './components/AvatarSelection';
import Introduction from './components/Introduction';
import GameMap from './components/GameMap';
import PageTransition from './components/PageTransition';
import Header from './components/Header';

export type UserProfile = {
  name: string;
  age: number;
  profilePicture?: string;
  selectedAvatar?: 'grandfather' | 'grandmother';
};

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    handleNext();
  };

  const handleAvatarSelect = (avatar: 'grandfather' | 'grandmother') => {
    setUserProfile(prev => prev ? { ...prev, selectedAvatar: avatar } : null);
    handleNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 overflow-hidden">
      {userProfile && currentPage > 0 && <Header userProfile={userProfile} />}
      
      <AnimatePresence mode="wait">
        {currentPage === 0 && (
          <PageTransition key="splash">
            <SplashScreen onComplete={handleNext} />
          </PageTransition>
        )}

        {currentPage === 1 && (
          <PageTransition key="profile">
            <ProfileSetup onSubmit={handleProfileSubmit} onBack={handleBack} />
          </PageTransition>
        )}

        {currentPage === 2 && (
          <PageTransition key="avatar">
            <AvatarSelection onSelect={handleAvatarSelect} onBack={handleBack} />
          </PageTransition>
        )}

        {currentPage === 3 && userProfile?.selectedAvatar && (
          <PageTransition key="intro">
            <Introduction 
              avatarType={userProfile.selectedAvatar}
              userName={userProfile.name}
              onNext={handleNext}
              onBack={handleBack}
            />
          </PageTransition>
        )}

        {currentPage === 4 && (
          <PageTransition key="map">
            <GameMap onBack={handleBack} />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;