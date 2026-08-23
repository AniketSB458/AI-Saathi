import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Persona = 'Farmer' | 'Fisherman' | 'Artisan' | 'Street Vendor' | 'Person with Disability' | 'Citizen';
export type Language = 'English' | 'Hindi' | 'Marathi' | 'Bengali' | 'Tamil' | 'Telugu' | 'Kannada';

interface UserProfile {
  persona: Persona | null;
  location: string;
  language: Language;
}

interface AppContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  isAccessibilityMode: boolean;
  setAccessibilityMode: (val: boolean) => void;
  isDemoMode: boolean;
  setDemoMode: (val: boolean) => void;
  loadDemoProfile: (persona: Persona) => void;
}

const defaultContext: AppContextType = {
  profile: {
    persona: null,
    location: '',
    language: 'English',
  },
  setProfile: () => {},
  isAccessibilityMode: false,
  setAccessibilityMode: () => {},
  isDemoMode: false,
  setDemoMode: () => {},
  loadDemoProfile: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>({
    persona: null,
    location: '',
    language: 'English',
  });
  const [isAccessibilityMode, setAccessibilityMode] = useState(false);
  const [isDemoMode, setDemoMode] = useState(false);

  const loadDemoProfile = (persona: Persona) => {
    setDemoMode(true);
    let demoProfile: UserProfile = { persona: 'Farmer', location: 'Maharashtra', language: 'Marathi' };
    switch (persona) {
      case 'Farmer':
        demoProfile = { persona: 'Farmer', location: 'Maharashtra', language: 'Marathi' };
        break;
      case 'Fisherman':
        demoProfile = { persona: 'Fisherman', location: 'Maharashtra Coast', language: 'Marathi' };
        break;
      case 'Artisan':
        demoProfile = { persona: 'Artisan', location: 'Rajasthan', language: 'Hindi' };
        break;
      case 'Street Vendor':
        demoProfile = { persona: 'Street Vendor', location: 'Karnataka', language: 'Kannada' };
        break;
      default:
        demoProfile = { persona, location: 'Delhi', language: 'English' };
    }
    setProfile(demoProfile);
  };

  return (
    <AppContext.Provider value={{ profile, setProfile, isAccessibilityMode, setAccessibilityMode, isDemoMode, setDemoMode, loadDemoProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);