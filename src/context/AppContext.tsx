import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Persona = 'Farmer' | 'Fisherman' | 'Artisan' | 'Street Vendor' | 'Person with Disability' | 'Citizen';
export type Language = 'English' | 'Hindi' | 'Marathi' | 'Bengali' | 'Tamil' | 'Telugu' | 'Kannada';

interface UserProfile {
  firstName: string;
  phoneNo: string;
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
    firstName: '',
    phoneNo: '',
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
    firstName: '',
    phoneNo: '',
    persona: null,
    location: '',
    language: 'English',
  });
  const [isAccessibilityMode, setAccessibilityMode] = useState(false);
  const [isDemoMode, setDemoMode] = useState(false);

  useEffect(() => {
    let theme = 'primary';
    switch (profile.language) {
      case 'Hindi': theme = 'orange'; break;
      case 'Marathi': theme = 'amber'; break;
      case 'Bengali': theme = 'rose'; break;
      case 'Tamil': theme = 'blue'; break;
      case 'Telugu': theme = 'violet'; break;
      case 'Kannada': theme = 'amber'; break;
      case 'English':
      default: theme = 'primary'; break;
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [profile.language]);

  const loadDemoProfile = (persona: Persona) => {
    setDemoMode(true);
    let demoProfile: UserProfile = { firstName: 'Ramesh', phoneNo: '9876543210', persona: 'Farmer', location: 'Maharashtra', language: 'Marathi' };
    switch (persona) {
      case 'Farmer':
        demoProfile = { firstName: 'Ramesh', phoneNo: '9876543210', persona: 'Farmer', location: 'Maharashtra', language: 'Marathi' };
        break;
      case 'Fisherman':
        demoProfile = { firstName: 'Suresh', phoneNo: '9876543210', persona: 'Fisherman', location: 'Maharashtra Coast', language: 'Marathi' };
        break;
      case 'Artisan':
        demoProfile = { firstName: 'Kavita', phoneNo: '9876543210', persona: 'Artisan', location: 'Rajasthan', language: 'Hindi' };
        break;
      case 'Street Vendor':
        demoProfile = { firstName: 'Ganesh', phoneNo: '9876543210', persona: 'Street Vendor', location: 'Karnataka', language: 'Kannada' };
        break;
      default:
        demoProfile = { firstName: 'Aarav', phoneNo: '9876543210', persona, location: 'Delhi', language: 'English' };
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