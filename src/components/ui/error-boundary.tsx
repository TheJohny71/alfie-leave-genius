// src/components/ErrorBoundary.tsx
import React from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to your error reporting service
    // reportError(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 p-4"
        >
          <div className="max-w-md w-full">
            <div className="glass p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white">
                  Something went wrong
                </h2>
                <p className="text-purple-200 text-sm">
                  We apologize for the inconvenience. Please try refreshing the page.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="text-left p-4 bg-red-500/10 rounded-lg">
                  <p className="text-red-300 text-sm font-mono">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <Button
                onClick={this.handleReset}
                className="bg-white/10 hover:bg-white/20 text-white space-x-2 flex items-center justify-center w-full"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Page</span>
              </Button>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}
