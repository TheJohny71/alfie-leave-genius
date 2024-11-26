import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRegion } from "@/contexts/RegionContext";
import { format, addHours, startOfWeek, addDays } from "date-fns";

interface CalendarGridProps {
  selectedDates: Date[];
  onDateSelect: (dates: Date[]) => void;
  currentMonth: string;
  currentYear: string;
  view: 'month' | 'week' | 'agenda';
}

export const CalendarGrid = ({
  selectedDates,
  onDateSelect,
  currentMonth,
  currentYear,
  view
}: CalendarGridProps) => {
  const { getHolidays, region } = useRegion();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const holidays = getHolidays();

  const isHoliday = (date: number) => {
    const dateStr = `${currentYear}-${currentMonth.padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return holidays.some(holiday => holiday.date === dateStr);
  };

  const getHolidayName = (date: number) => {
    const dateStr = `${currentYear}-${currentMonth.padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return holidays.find(holiday => holiday.date === dateStr)?.name;
  };

  const handleDateSelection = (date: number, event: React.MouseEvent) => {
    const newDate = new Date(Number(currentYear), new Date().getMonth(), date);
    
    if (event.shiftKey) {
      // Multiple date selection
      onDateSelect([...selectedDates, newDate]);
    } else {
      // Single date selection
      onDateSelect([newDate]);
    }
  };

  const renderMonthView = () => (
    <div className="grid grid-cols-7 gap-2">
      {days.map(day => (
        <div key={day} className="text-center py-2 text-sm font-medium text-[#279989]">
          {day}
        </div>
      ))}
      {currentMonthDays.map(date => {
        const isSelected = selectedDates.some(d => d.getDate() === date);
        const isToday = date === new Date().getDate();
        const holiday = isHoliday(date);
        
        return (
          <motion.div
            key={date}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => handleDateSelection(date, e)}
            className={cn(
              "relative min-h-[80px] p-2 rounded-lg cursor-pointer transition-all duration-200",
              isSelected ? "bg-[#279989]/10 border border-[#279989]/20" : "hover:bg-white/20",
              isToday ? "ring-2 ring-[#279989]" : "",
              holiday ? "bg-purple-50 hover:bg-purple-100/30" : "",
              "backdrop-blur-sm"
            )}
          >
            <span className={cn(
              "text-sm",
              isSelected ? "font-bold" : "",
              holiday ? "text-purple-700" : ""
            )}>
              {date}
            </span>
            {holiday && (
              <div className="absolute bottom-1 left-1 right-1 text-xs text-purple-600 truncate bg-white/40 rounded px-1">
                {getHolidayName(date)}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );

  const renderWeekView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const startDate = startOfWeek(new Date());
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-2">
          <div className="w-20" /> {/* Time column */}
          {weekDays.map(day => (
            <div key={day.toString()} className="text-center py-2 text-sm font-medium text-[#279989]">
              {format(day, 'EEE dd')}
            </div>
          ))}
          
          {hours.map(hour => (
            <React.Fragment key={hour}>
              <div className="text-right pr-2 text-sm text-gray-500">
                {format(addHours(new Date().setHours(0, 0, 0, 0), hour), 'HH:mm')}
              </div>
              {weekDays.map(day => (
                <div
                  key={`${day}-${hour}`}
                  className="h-12 border-t border-gray-100 hover:bg-[#279989]/5 transition-colors"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderAgendaView = () => (
    <div className="space-y-2">
      {selectedDates.map(date => (
        <motion.div
          key={date.toString()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{format(date, 'EEEE, MMMM d')}</span>
            <span className="text-sm text-[#279989]">{isHoliday(date.getDate()) ? getHolidayName(date.getDate()) : 'No events'}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'agenda' && renderAgendaView()}
    </div>
  );
};