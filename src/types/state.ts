export type UserRole = 'admin' | 'manager' | 'employee';
export type ViewType = 'calendar' | 'requests' | 'team' | 'settings';
export type ModalType = 'leaveRequest' | 'confirmation' | 'error';
export type ErrorType = 'validation' | 'network' | 'integration' | 'auth' | 'unknown';
export type CalendarView = 'month' | 'week' | 'agenda';
export type LeaveType = 'annual' | 'sick' | 'unpaid' | 'other';
export type AvailabilityStatus = 'available' | 'unavailable' | 'leave' | 'holiday';

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface LeaveBalances {
  annual: number;
  sick: number;
  unpaid: number;
}

export interface Holiday {
  date: string;
  name: string;
  type: 'federal' | 'bank' | 'public';
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: LeaveType;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TeamMember {
  id: string;
  name: string;
  role: UserRole;
  department: string;
  availability: AvailabilityStatus;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

export interface GlobalState {
  user: {
    profile: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      department: string;
      location: 'UK' | 'US';
      preferences: UserPreferences;
    };
    leaves: {
      balances: LeaveBalances;
      requests: CalendarEvent[];
    };
    calendar: {
      view: CalendarView;
      selectedDates: Date[];
      events: CalendarEvent[];
      holidays: Holiday[];
    };
    team: {
      members: TeamMember[];
    };
  };
  ui: {
    currentView: ViewType;
    modals: {
      active: ModalType | null;
      props: Record<string, any>;
    };
    notifications: Notification[];
    loading: {
      status: boolean;
      message?: string;
    };
    errors: {
      type: ErrorType;
      message: string;
      field?: string;
    }[];
  };
}