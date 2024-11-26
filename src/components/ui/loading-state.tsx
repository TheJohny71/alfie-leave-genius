// src/components/ui/loading-state.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  fullscreen?: boolean;
  message?: string;
  className?: string;
  variant?: 'default' | 'overlay';
}

export const Loading: React.FC<LoadingProps> = ({ 
  fullscreen = false, 
  message,
  className,
  variant = 'default'
}) => {
  if (fullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-purple-900/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-[#279989]" />
          </motion.div>
          {message && (
            <p className="text-white/80 text-sm">{message}</p>
          )}
        </div>
      </motion.div>
    );
  }

  if (variant === 'overlay') {
    return (
      <div className={cn(
        "absolute inset-0 bg-purple-900/20 backdrop-blur-sm",
        "flex items-center justify-center z-10",
        className
      )}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-6 h-6 text-[#279989]" />
        </motion.div>
        {message && (
          <span className="ml-3 text-sm text-white/80">{message}</span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-6 h-6 text-[#279989]" />
      </motion.div>
      {message && (
        <span className="ml-3 text-sm text-purple-300">{message}</span>
      )}
    </div>
  );
};

// LoadingButton component for actions
export const LoadingButton: React.FC<{
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}> = ({ loading, children, className, ...props }) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center",
        loading && "cursor-not-allowed",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader2 className="w-4 h-4 text-[#279989]" />
        </motion.div>
      )}
      <span className={cn(loading && "opacity-0")}>
        {children}
      </span>
    </button>
  );
};

// LoadingWrapper for content areas
export const LoadingWrapper: React.FC<{
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  loadingMessage?: string;
}> = ({ loading, children, className, loadingMessage }) => {
  return (
    <div className={cn("relative", className)}>
      {loading && (
        <Loading variant="overlay" message={loadingMessage} />
      )}
      <div className={cn(loading && "opacity-50 pointer-events-none")}>
        {children}
      </div>
    </div>
  );
};
