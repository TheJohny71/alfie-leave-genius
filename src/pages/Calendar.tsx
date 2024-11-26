import React, { useState } from 'react';
import { 
  Bell, 
  Search,
  User,
  Settings,
  CalendarIcon,
  Home,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useRegion } from "@/contexts/RegionContext";
import { Button } from "@/components/ui/button";
import { LeavePlanningWizard } from '@/components/calendar/LeavePlanningWizard';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { TeamMemberCard } from '@/components/calendar/TeamMemberCard';
import { LeaveStats } from '@/components/calendar/LeaveStats';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const Calendar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { region, setRegion } = useRegion();
  const [view, setView] = useState<'month' | 'week' | 'agenda'>('month');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleViewChange = (newView: 'month' | 'week' | 'agenda') => {
    setView(newView);
    console.log('[Calendar] View changed to:', newView);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#279989]/5 to-[#34a899]/10 text-neutral-900 p-4">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur-xl rounded-xl p-3 border border-[#279989]/20 shadow-lg sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#279989] to-[#34a899] rounded-xl flex items-center justify-center shadow-inner">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#279989]" />
            <input 
              type="text" 
              placeholder="Search leaves..." 
              className="bg-white/5 border border-[#279989]/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#279989]/50 transition-all duration-200 hover:bg-white/10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-[#279989] hover:text-[#34a899] transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          
          {/* Location Toggle */}
          <div className="flex rounded-xl bg-neutral-100 p-1">
            <button 
              className={`px-4 py-2 rounded-xl transition-all duration-150 ${
                region === 'UK' ? 'bg-[#279989] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setRegion('UK')}
            >
              UK
            </button>
            <button 
              className={`px-4 py-2 rounded-xl transition-all duration-150 ${
                region === 'US' ? 'bg-[#279989] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setRegion('US')}
            >
              US
            </button>
          </div>

          <div className="w-8 h-8 bg-[#279989]/20 rounded-lg flex items-center justify-center hover:bg-[#279989]/30 transition-all duration-200 cursor-pointer">
            <User className="w-5 h-5 text-[#279989]" />
          </div>
        </div>
      </nav>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className={`transition-all duration-200 ${
              view === 'month' ? 'bg-[#279989] text-white' : 'bg-white/50'
            }`}
            onClick={() => handleViewChange('month')}
          >
            Month
          </Button>
          <Button
            variant="outline"
            className={`transition-all duration-200 ${
              view === 'week' ? 'bg-[#279989] text-white' : 'bg-white/50'
            }`}
            onClick={() => handleViewChange('week')}
          >
            Week
          </Button>
          <Button
            variant="outline"
            className={`transition-all duration-200 ${
              view === 'agenda' ? 'bg-[#279989] text-white' : 'bg-white/50'
            }`}
            onClick={() => handleViewChange('agenda')}
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

          {/* Upcoming Leaves */}
          <Card className="bg-white/20 border-[#279989]/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-lg text-[#279989]">Upcoming Leaves</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-all duration-200">
                  <div className="w-10 h-10 bg-[#279989]/20 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-[#279989]" />
                  </div>
                  <div>
                    <div className="font-medium">Christmas Break</div>
                    <div className="text-sm text-[#279989]">Dec 24 - Jan 2</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-all duration-200">
                  <div className="w-10 h-10 bg-[#279989]/20 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-[#279989]" />
                  </div>
                  <div>
                    <div className="font-medium">Team Off-site</div>
                    <div className="text-sm text-[#279989]">Dec 15</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;