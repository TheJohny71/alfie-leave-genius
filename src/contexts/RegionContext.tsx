import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

type Region = 'UK' | 'US';

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  preferences: {
    dateFormat: string;
    weekStart: number;
    terminology: string;
  };
  formatDate: (date: Date) => string;
  getTerminology: (key: string) => string;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [region, setRegion] = useState<Region>('UK');
  const [preferences, setPreferences] = useState({
    dateFormat: 'dd/MM/yyyy',
    weekStart: 1,
    terminology: 'UK'
  });

  useEffect(() => {
    setPreferences({
      dateFormat: region === 'UK' ? 'dd/MM/yyyy' : 'MM/dd/yyyy',
      weekStart: region === 'UK' ? 1 : 0,
      terminology: region
    });
  }, [region]);

  const formatDate = (date: Date) => {
    return format(date, preferences.dateFormat);
  };

  const terminology = {
    UK: {
      leave: 'Annual Leave',
      holiday: 'Bank Holiday',
      sick: 'Sick Leave'
    },
    US: {
      leave: 'PTO',
      holiday: 'Federal Holiday',
      sick: 'Sick Time'
    }
  };

  const getTerminology = (key: string) => {
    return terminology[region][key as keyof typeof terminology['UK']];
  };

  return (
    <RegionContext.Provider value={{
      region,
      setRegion,
      preferences,
      formatDate,
      getTerminology
    }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};