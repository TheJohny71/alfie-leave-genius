import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { useRegion } from "@/contexts/RegionContext";
import { LeavePlanningWizard } from '@/components/calendar/LeavePlanningWizard';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { TeamMemberCard } from '@/components/calendar/TeamMemberCard';
import { LeaveStats } from '@/components/calendar/LeaveStats';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarViewToggle } from '@/components/calendar/CalendarViewToggle';
import { format } from 'date-fns';

const Calendar = () => {
  const { toast } = useToast();
  const [view, setView] = useState<'month' | 'week' | 'agenda'>('month');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleViewChange = (newView: 'month' | 'week' | 'agenda') => {
    setView(newView);
    console.log('[Calendar] View changed to:', newView);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#279989]/5 to-[#34a899]/10 text-neutral-900 p-4">
      <CalendarHeader />
      <CalendarViewToggle view={view} onViewChange={handleViewChange} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LeavePlanningWizard />

          <Card className="bg-white/20 border-[#279989]/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <CalendarGrid
                view={view}
                selectedDates={selectedDates}
                onDateSelect={setSelectedDates}
                currentMonth={format(new Date(), 'MMMM')}
                currentYear={format(new Date(), 'yyyy')}
              />
            </CardContent>
          </Card>

          {/* Team Schedule */}
          <Card className="bg-white/20 border-[#279989]/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-[#279989]">Team Schedule</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Sarah Chen", status: "On Leave", dates: "Nov 24-26", avatar: "SC" },
                  { name: "Mike Ross", status: "Upcoming", dates: "Nov 28-30", avatar: "MR" },
                  { name: "Anna Smith", status: "Working", dates: "", avatar: "AS" }
                ].map((member, index) => (
                  <TeamMemberCard key={index} member={member} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <LeaveStats />
        </div>
      </div>
    </div>
  );
};

export default Calendar;