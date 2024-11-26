import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRegion } from "@/contexts/RegionContext";
import { format } from "date-fns";

interface CalendarGridProps {
  selectedDates: number[];
  onDateSelect: (date: number) => void;
  currentMonth: string;
  currentYear: string;
}

export const CalendarGrid = ({
  selectedDates,
  onDateSelect,
  currentMonth,
  currentYear
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className="text-center py-2 text-sm font-medium text-purple-700">
            {day}
          </div>
        ))}
        {currentMonthDays.map(date => {
          const isSelected = selectedDates.includes(date);
          const isToday = date === new Date().getDate();
          const holiday = isHoliday(date);
          
          return (
            <motion.div
              key={date}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDateSelect(date)}
              className={cn(
                "relative min-h-[80px] p-2 rounded-lg cursor-pointer transition-all duration-200",
                isSelected ? "bg-purple-500 text-white shadow-lg" : "hover:bg-white/10",
                isToday ? "ring-2 ring-purple-400" : "",
                holiday ? "bg-red-100 hover:bg-red-200" : ""
              )}
            >
              <span className={cn("text-sm", isSelected && "font-bold")}>
                {date}
              </span>
              {holiday && (
                <div className="absolute bottom-1 left-1 right-1 text-xs text-red-600 truncate">
                  {getHolidayName(date)}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};