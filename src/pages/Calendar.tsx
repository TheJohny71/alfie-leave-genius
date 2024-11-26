import React, { useState } from 'react';
import { Bell, Search, User, Settings, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useRegion } from "@/contexts/RegionContext";
import { LeavePlanningWizard } from '@/components/calendar/LeavePlanningWizard';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';

const Calendar = () => {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [currentMonth] = useState("November");
  const [currentYear] = useState("2024");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { region, setRegion } = useRegion();
  
  // Team members with leave status
  const teamMembers = [
    { name: "Sarah Chen", status: "On Leave", dates: "Nov 24-26", avatar: "SC" },
    { name: "Mike Ross", status: "Upcoming", dates: "Nov 28-30", avatar: "MR" },
    { name: "Anna Smith", status: "Working", dates: "", avatar: "AS" }
  ];

  const handleDateSelect = (date: number) => {
    setSelectedDates(prev => {
      if (prev.includes(date)) {
        return prev.filter(d => d !== date);
      }
      return [...prev, date];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-950 text-white p-4">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-6 bg-white/5 rounded-xl p-3 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">a</span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-purple-300" />
            <input 
              type="text" 
              placeholder="Search leaves..." 
              className="bg-white/5 border border-purple-500/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
            onClick={() => setRegion(region === 'UK' ? 'US' : 'UK')}
          >
            <Globe className="w-4 h-4" />
            <span>{region}</span>
          </button>
          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <LeavePlanningWizard />
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <CalendarGrid
                selectedDates={selectedDates}
                onDateSelect={handleDateSelect}
                currentMonth={currentMonth}
                currentYear={currentYear}
              />
            </CardContent>
          </Card>

          {/* Team Schedule */}
          <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Team Schedule</h3>
                <button className="text-purple-300 hover:text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-purple-300">{member.dates}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs 
                      ${member.status === "On Leave" ? "bg-blue-500/20 text-blue-300" :
                        member.status === "Upcoming" ? "bg-purple-500/20 text-purple-300" :
                        "bg-green-500/20 text-green-300"}`}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Enhanced Stats */}
          <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Leave Balance</h3>
                <Settings className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer" />
              </div>
              <div className="space-y-4">
                {Object.entries(leaveTypes).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${value.color}`}></div>
                      <span className="text-sm">{value.label}</span>
                    </div>
                    <span className="font-medium">12 days</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Used this year</span>
                    <span className="font-medium">8 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Leaves */}
          <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Upcoming Leaves</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium">Christmas Break</div>
                    <div className="text-sm text-purple-300">Dec 24 - Jan 2</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium">Team Off-site</div>
                    <div className="text-sm text-purple-300">Dec 15</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card 
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/20 backdrop-blur-sm cursor-pointer hover:from-purple-500/30 hover:to-pink-500/30 transition-colors"
            onClick={handleAIRecommendation}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-5 h-5 text-purple-300" />
                <h3 className="font-semibold">Smart Suggestions</h3>
              </div>
              <p className="text-sm text-purple-200 mb-4">
                Best time for your next vacation: First week of December
              </p>
              <button className="text-sm text-purple-300 hover:text-white flex items-center space-x-2">
                <span>View analysis</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
