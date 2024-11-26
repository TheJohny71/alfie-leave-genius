import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GlobalState } from '@/types/state';

const initialState: GlobalState = {
  user: {
    profile: {
      id: '',
      name: '',
      email: '',
      role: 'employee',
      department: '',
      location: 'UK',
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en',
      },
    },
    leaves: {
      balances: {
        annual: 25,
        sick: 10,
        unpaid: 0,
      },
      requests: [],
    },
    calendar: {
      view: 'month',
      selectedDates: [],
      events: [],
      holidays: [],
    },
    team: {
      members: [],
    },
  },
  ui: {
    currentView: 'calendar',
    modals: {
      active: null,
      props: {},
    },
    notifications: [],
    loading: {
      status: false,
    },
    errors: [],
  },
};

export const useStore = create<GlobalState>()(
  devtools(
    (set) => ({
      ...initialState,
    }),
    {
      name: 'LeaveManagement-Store',
    }
  )
);

export const useCalendarStore = () => {
  return useStore((state) => state.user.calendar);
};

export const useUIStore = () => {
  return useStore((state) => state.ui);
};

export const useUserStore = () => {
  return useStore((state) => state.user);
};