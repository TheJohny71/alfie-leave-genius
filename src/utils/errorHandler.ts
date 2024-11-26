// src/utils/errorHandler.ts
import { useStore } from '@/store/useStore';
import { ErrorType } from '@/types/state';
import { toast } from '@/components/ui/use-toast';

export class AppError extends Error {
  constructor(
    message: string,
    public type: ErrorType = 'unknown',
    public field?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown) => {
  console.error('[ErrorHandler]', error);

  const store = useStore.getState();
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  const errorType = error instanceof AppError ? error.type : 'unknown';

  // Add error to store
  store.addError({
    type: errorType,
    message: errorMessage,
    field: error instanceof AppError ? error.field : undefined,
  });

  // Show toast notification
  toast({
    title: 'Error Occurred',
    description: errorMessage,
    variant: 'destructive',
  });

  return error;
};

export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  loadingKey?: keyof GlobalState['ui']['loading']
) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const store = useStore.getState();
    
    try {
      if (loadingKey) {
        store.setLoadingState(loadingKey, 'loading');
      }
      
      const result = await fn(...args);
      
      if (loadingKey) {
        store.setLoadingState(loadingKey, 'idle');
      }
      
      return result;
    } catch (error) {
      if (loadingKey) {
        store.setLoadingState(loadingKey, 'error');
      }
      
      handleError(error);
      throw error;
    }
  };
};
