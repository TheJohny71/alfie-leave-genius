import React from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  Globe, 
  MoreHorizontal,
  Brain,
  ChevronRight,
  CalendarIcon,
  Home,
  RotateCcw
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

const Calendar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { region, setRegion } = useRegion();

  const handleAIRecommendation = () => {
    toast({
      title: "AI Recommendation",
      description: "This feature will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 text-purple-900 p-4">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-6 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-inner">
            <span className="text-lg font-bold text-white">a</span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-purple-400" />
            <input 
              type="text" 
              placeholder="Search leaves..." 
              className="bg-white/5 border border-purple-500/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 hover:bg-white/10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-purple-400 hover:text-purple-600 transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            onClick={() => setRegion(region === 'UK' ? 'US' : 'UK')}
          >
            <Globe className="w-4 h-4" />
            <span>{region}</span>
          </button>
          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-all duration-200 cursor-pointer">
            <User className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </nav>

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-6">
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2 space-y-6">
          <LeavePlanningWizard />

          <Card className="bg-white/20 border-purple-500/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <CalendarGrid
                selectedDates={[]}
                onDateSelect={() => {}}
                currentMonth="November"
                currentYear="2024"
              />
            </CardContent>
          </Card>

          {/* Team Schedule */}
          <Card className="bg-white/20 border-purple-500/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-purple-800">Team Schedule</h3>
                <button className="text-purple-400 hover:text-purple-600 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
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
          <Card className="bg-white/20 border-purple-500/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-lg text-purple-800">Upcoming Leaves</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-all duration-200">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">Christmas Break</div>
                    <div className="text-sm text-purple-600">Dec 24 - Jan 2</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-all duration-200">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium">Team Off-site</div>
                    <div className="text-sm text-purple-600">Dec 15</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card 
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/20 backdrop-blur-sm cursor-pointer hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 shadow-xl hover:shadow-2xl"
            onClick={handleAIRecommendation}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-lg text-purple-800">Smart Suggestions</h3>
              </div>
              <p className="text-sm text-purple-700 mb-4">
                Best time for your next vacation: First week of December
              </p>
              <button className="text-sm text-purple-600 hover:text-purple-800 flex items-center space-x-2 group">
                <span>View analysis</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;