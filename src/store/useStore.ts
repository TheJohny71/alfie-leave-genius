// src/store/useStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GlobalState, CalendarEvent, TeamMember, LeaveType } from '@/types/state';

interface StoreActions {
  // Calendar Actions
  setCalendarView: (view: GlobalState['user']['calendar']['view']) => void;
  selectDates: (dates: Date[]) => void;
  addEvent: (event: CalendarEvent) => void;
  removeEvent: (eventId: string) => void;
  
  // Leave Management
  updateLeaveBalance: (type: LeaveType, amount: number) => void;
  submitLeaveRequest: (request: Omit<CalendarEvent, 'id'>) => void;
  
  // Team Management
  updateTeamMember: (member: TeamMember) => void;
  updateTeamAvailability: (memberId: string, dates: Date[]) => void;
  
  // UI State
  setLoading: (status: boolean, message?: string) => void;
  showModal: (type: GlobalState['ui']['modals']['active'], props?: Record<string, any>) => void;
  hideModal: () => void;
  addNotification: (notification: GlobalState['ui']['notifications'][0]) => void;
  clearNotifications: () => void;
}

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
      message: undefined,
    },
    errors: [],
  },
};

export const useStore = create<GlobalState & StoreActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Calendar Actions
      setCalendarView: (view) => 
        set((state) => ({
          user: {
            ...state.user,
            calendar: {
              ...state.user.calendar,
              view,
            },
          },
        })),

      selectDates: (dates) =>
        set((state) => ({
          user: {
            ...state.user,
            calendar: {
              ...state.user.calendar,
              selectedDates: dates,
            },
          },
        })),

      addEvent: (event) =>
        set((state) => ({
          user: {
            ...state.user,
            calendar: {
              ...state.user.calendar,
              events: [...state.user.calendar.events, event],
            },
          },
        })),

      removeEvent: (eventId) =>
        set((state) => ({
          user: {
            ...state.user,
            calendar: {
              ...state.user.calendar,
              events: state.user.calendar.events.filter((e) => e.id !== eventId),
            },
          },
        })),

      // Leave Management
      updateLeaveBalance: (type, amount) =>
        set((state) => ({
          user: {
            ...state.user,
            leaves: {
              ...state.user.leaves,
              balances: {
                ...state.user.leaves.balances,
                [type]: amount,
              },
            },
          },
        })),

      submitLeaveRequest: (request) => {
        const newEvent: CalendarEvent = {
          id: crypto.randomUUID(),
          ...request,
        };
        get().addEvent(newEvent);
      },

      // Team Management
      updateTeamMember: (member) =>
        set((state) => ({
          user: {
            ...state.user,
            team: {
              members: state.user.team.members.map((m) =>
                m.id === member.id ? member : m
              ),
            },
          },
        })),

      // UI State Management
      setLoading: (status, message) =>
        set((state) => ({
          ui: {
            ...state.ui,
            loading: { status, message },
          },
        })),

      showModal: (type, props = {}) =>
        set((state) => ({
          ui: {
            ...state.ui,
            modals: {
              active: type,
              props,
            },
          },
        })),

      hideModal: () =>
        set((state) => ({
          ui: {
            ...state.ui,
            modals: {
              active: null,
              props: {},
            },
          },
        })),

      addNotification: (notification) =>
        set((state) => ({
          ui: {
            ...state.ui,
            notifications: [...state.ui.notifications, notification],
          },
        })),

      clearNotifications: () =>
        set((state) => ({
          ui: {
            ...state.ui,
            notifications: [],
          },
        })),
    }),
    {
      name: 'LeaveManagement-Store',
    }
  )
);

// Selector hooks for better performance
export const useCalendarStore = () => useStore((state) => state.user.calendar);
export const useUIStore = () => useStore((state) => state.ui);
export const useUserStore = () => useStore((state) => state.user);
