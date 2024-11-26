// src/store/useStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from '@/components/ui/use-toast';
import { 
  GlobalState, 
  CalendarEvent, 
  TeamMember, 
  LeaveType, 
  LoadingState,
  ErrorType,
  Notification
} from '@/types/state';

interface StoreActions {
  // Loading State Management
  setLoadingState: (key: keyof GlobalState['ui']['loading'], status: LoadingState) => void;
  
  // Error Management
  addError: (error: { type: ErrorType; message: string; field?: string }) => void;
  clearErrors: () => void;
  
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
  showModal: (type: GlobalState['ui']['modals']['active'], props?: Record<string, any>) => void;
  hideModal: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  clearNotifications: () => void;
  
  // Reset
  reset: () => void;
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
      calendar: 'idle',
      leaves: 'idle',
      team: 'idle',
      general: 'idle'
    },
    errors: [],
  },
};

export const useStore = create<GlobalState & StoreActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Loading State Management
        setLoadingState: (key, status) =>
          set((state) => ({
            ui: {
              ...state.ui,
              loading: {
                ...state.ui.loading,
                [key]: status
              }
            }
          })),

        // Error Management
        addError: (error) =>
          set((state) => ({
            ui: {
              ...state.ui,
              errors: [...state.ui.errors, error]
            }
          })),

        clearErrors: () =>
          set((state) => ({
            ui: {
              ...state.ui,
              errors: []
            }
          })),

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

        addEvent: (event) => {
          set((state) => ({
            user: {
              ...state.user,
              calendar: {
                ...state.user.calendar,
                events: [...state.user.calendar.events, event],
              },
            },
          }));
          toast({
            title: "Event Added",
            description: "Calendar event has been successfully added."
          });
        },

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
            status: 'pending'
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

        updateTeamAvailability: (memberId, dates) =>
          set((state) => ({
            user: {
              ...state.user,
              team: {
                members: state.user.team.members.map((member) =>
                  member.id === memberId
                    ? { ...member, availability: 'unavailable' }
                    : member
                ),
              },
            },
          })),

        // UI State Management
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
              notifications: [
                ...state.ui.notifications,
                {
                  id: crypto.randomUUID(),
                  timestamp: new Date(),
                  ...notification
                }
              ],
            },
          })),

        clearNotifications: () =>
          set((state) => ({
            ui: {
              ...state.ui,
              notifications: [],
            },
          })),

        // Reset store
        reset: () => set(initialState),
      }),
      {
        name: 'leave-planner-store',
      }
    )
  )
);

// Selector hooks for better performance
export const useCalendarStore = () => useStore((state) => state.user.calendar);
export const useUIStore = () => useStore((state) => state.ui);
export const useUserStore = () => useStore((state) => state.user);
