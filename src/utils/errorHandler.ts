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

  store.ui.errors.push({
    type: errorType,
    message: errorMessage,
    field: error instanceof AppError ? error.field : undefined,
  });

  toast({
    title: 'Error',
    description: errorMessage,
    variant: 'destructive',
  });

  return error;
};