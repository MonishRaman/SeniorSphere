import React from 'react';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { UserProfile } from '../App';
import LanguageSelector from './LanguageSelector';

type HeaderProps = {
  userProfile: UserProfile | null;
};

function Header({ userProfile }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">{t('header.title')}</h1>
          </div>
          <div className="flex items-center gap-6">
            <LanguageSelector />
            {userProfile && (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                  {t('header.welcome', { name: userProfile.name })}
                </span>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
                  {userProfile.profilePicture ? (
                    <img
                      src={userProfile.profilePicture}
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-lg">
                        {userProfile.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;