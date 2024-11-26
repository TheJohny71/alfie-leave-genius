import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

type Region = 'UK' | 'US';

interface Holiday {
  date: string;
  name: string;
}

const US_HOLIDAYS: Holiday[] = [
  { date: '2024-01-01', name: 'New Year\'s Day' },
  { date: '2024-01-15', name: 'Martin Luther King Jr. Day' },
  { date: '2024-02-19', name: 'Presidents\' Day' },
  { date: '2024-05-27', name: 'Memorial Day' },
  { date: '2024-06-19', name: 'Juneteenth' },
  { date: '2024-07-04', name: 'Independence Day' },
  { date: '2024-09-02', name: 'Labor Day' },
  { date: '2024-10-14', name: 'Columbus Day' },
  { date: '2024-11-11', name: 'Veterans Day' },
  { date: '2024-11-28', name: 'Thanksgiving Day' },
  { date: '2024-12-25', name: 'Christmas Day' }
];

const UK_HOLIDAYS: Holiday[] = [
  { date: '2024-01-01', name: 'New Year\'s Day' },
  { date: '2024-03-29', name: 'Good Friday' },
  { date: '2024-04-01', name: 'Easter Monday' },
  { date: '2024-05-06', name: 'Early May Bank Holiday' },
  { date: '2024-05-27', name: 'Spring Bank Holiday' },
  { date: '2024-08-26', name: 'Summer Bank Holiday' },
  { date: '2024-12-25', name: 'Christmas Day' },
  { date: '2024-12-26', name: 'Boxing Day' }
];

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
  getHolidays: () => Holiday[];
}

const terminology = {
  UK: {
    leave: 'Annual Leave',
    holiday: 'Bank Holiday',
    sick: 'Sick Leave',
    balance: 'Leave Balance',
    request: 'Request Leave',
    submit: 'Submit Request',
    calendar: 'Leave Calendar',
    approved: 'Approved',
    pending: 'Pending Review',
    rejected: 'Declined'
  },
  US: {
    leave: 'PTO',
    holiday: 'Federal Holiday',
    sick: 'Sick Time',
    balance: 'PTO Balance',
    request: 'Request Time Off',
    submit: 'Submit PTO Request',
    calendar: 'Time Off Calendar',
    approved: 'Approved',
    pending: 'Under Review',
    rejected: 'Denied'
  }
};

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [region, setRegion] = useState<Region>('UK');
  const [preferences, setPreferences] = useState({
    dateFormat: 'dd/MM/yyyy',
    weekStart: 1,
    terminology: 'UK'
  });

  useEffect(() => {
    console.log('[RegionContext] Region changed:', region);
    setPreferences({
      dateFormat: region === 'UK' ? 'dd/MM/yyyy' : 'MM/dd/yyyy',
      weekStart: region === 'UK' ? 1 : 0,
      terminology: region
    });
  }, [region]);

  const formatDate = (date: Date) => {
    return format(date, preferences.dateFormat);
  };

  const getTerminology = (key: string) => {
    return terminology[region][key as keyof typeof terminology['UK']] || key;
  };

  const getHolidays = () => {
    return region === 'UK' ? UK_HOLIDAYS : US_HOLIDAYS;
  };

  return (
    <RegionContext.Provider value={{
      region,
      setRegion,
      preferences,
      formatDate,
      getTerminology,
      getHolidays
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