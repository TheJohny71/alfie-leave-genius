import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { toast } = useToast();

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    toast({
      title: "Date selected",
      description: `You selected ${format(date, 'MMMM d, yyyy')}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <Card className="glass p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Leave Calendar</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePreviousMonth}
              className="hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-lg font-medium">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              className="hover:bg-white/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-white/60 p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day opacity-0"></div>
          ))}
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                "calendar-day",
                !isSameMonth(day, currentDate) && "text-white/40",
                isToday(day) && "today",
                selectedDate && isSameMonth(day, selectedDate) && day.getDate() === selectedDate.getDate() && "selected"
              )}
              onClick={() => handleDateSelect(day)}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </Card>

      {/* Floating cards with features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="glass p-6 animate-float">
          <h3 className="text-lg font-semibold mb-2">Smart Calendar</h3>
          <p className="text-sm text-white/70">
            Plan your time off with our intelligent calendar system
          </p>
        </Card>
        <Card className="glass p-6 animate-float [animation-delay:200ms]">
          <h3 className="text-lg font-semibold mb-2">Region Aware</h3>
          <p className="text-sm text-white/70">
            Seamlessly handles UK and US holiday systems
          </p>
        </Card>
        <Card className="glass p-6 animate-float [animation-delay:400ms]">
          <h3 className="text-lg font-semibold mb-2">Team Sync</h3>
          <p className="text-sm text-white/70">
            Coordinate leave with your team effortlessly
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;