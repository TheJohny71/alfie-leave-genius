import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className="text-center py-2 text-sm font-medium text-purple-300">
            {day}
          </div>
        ))}
        {currentMonthDays.map(date => {
          const isSelected = selectedDates.includes(date);
          const isToday = date === new Date().getDate();
          
          return (
            <motion.div
              key={date}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDateSelect(date)}
              className={cn(
                "relative min-h-[80px] p-2 rounded-lg cursor-pointer transition-all duration-200",
                isSelected ? "bg-purple-500 shadow-lg" : "hover:bg-white/10",
                isToday ? "ring-2 ring-purple-400" : ""
              )}
            >
              <span className={cn("text-sm", isSelected && "font-bold")}>
                {date}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};