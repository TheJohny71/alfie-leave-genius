import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CalendarViewToggleProps {
  view: 'month' | 'week' | 'agenda';
  onViewChange: (view: 'month' | 'week' | 'agenda') => void;
}

export const CalendarViewToggle: React.FC<CalendarViewToggleProps> = ({ view, onViewChange }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          className={`transition-all duration-200 ${
            view === 'month' ? 'bg-[#279989] text-white' : 'bg-white/50'
          }`}
          onClick={() => onViewChange('month')}
        >
          Month
        </Button>
        <Button
          variant="outline"
          className={`transition-all duration-200 ${
            view === 'week' ? 'bg-[#279989] text-white' : 'bg-white/50'
          }`}
          onClick={() => onViewChange('week')}
        >
          Week
        </Button>
        <Button
          variant="outline"
          className={`transition-all duration-200 ${
            view === 'agenda' ? 'bg-[#279989] text-white' : 'bg-white/50'
          }`}
          onClick={() => onViewChange('agenda')}
        >
          Agenda
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2 bg-white/50 hover:bg-white/70 transition-all duration-200 shadow-md"
          onClick={() => navigate('/')}
        >
          <Home className="w-4 h-4" />
          <span>Back to Welcome</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center space-x-2 bg-white/50 hover:bg-white/70 transition-all duration-200 shadow-md"
          onClick={() => window.location.reload()}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over</span>
        </Button>
      </div>
    </div>
  );
};