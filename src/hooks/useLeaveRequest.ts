import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/store/useStore';
import { AppError } from '@/utils/errorHandler';
import { CalendarEvent, LeaveType } from '@/types/state';

interface LeaveRequestInput {
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  notes?: string;
}

export const useLeaveRequest = () => {
  const queryClient = useQueryClient();
  const store = useStore();

  const submitLeaveRequest = async (input: LeaveRequestInput): Promise<CalendarEvent> => {
    console.log('[LeaveRequest] Submitting request:', input);

    // Validate dates
    if (input.startDate > input.endDate) {
      throw new AppError('Start date must be before end date', 'validation', 'dates');
    }

    // Check leave balance
    const { balances } = store.user.leaves;
    if (balances[input.type] <= 0) {
      throw new AppError('Insufficient leave balance', 'validation', 'balance');
    }

    // Mock API call - replace with actual API call when ready
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: `${input.type} Leave`,
      start: input.startDate,
      end: input.endDate,
      type: input.type,
      status: 'pending',
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return newEvent;
  };

  return useMutation({
    mutationFn: submitLeaveRequest,
    onSuccess: (newEvent) => {
      // Update cache
      queryClient.setQueryData(['leaveRequests'], (old: CalendarEvent[] = []) => [...old, newEvent]);
      
      // Show success message
      store.ui.notifications.push({
        id: Math.random().toString(),
        type: 'success',
        message: 'Leave request submitted successfully',
        timestamp: new Date(),
      });
    },
    onError: (error) => {
      console.error('[LeaveRequest] Error:', error);
      if (error instanceof AppError) {
        store.ui.errors.push({
          type: error.type,
          message: error.message,
          field: error.field,
        });
      }
    },
  });
};