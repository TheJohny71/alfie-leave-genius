import * as React from "react";
import { Calendar as CalendarIcon, Globe, Users, Brain, FileText, Bell, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useRegion } from "@/contexts/RegionContext";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(25);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { region, setRegion } = useRegion();
  
  // Calendar data
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const currentMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  
  const stats = [
    { label: 'Wellness Score', value: '92/100' },
    { label: 'Pending Requests', value: '3' },
    { label: 'Team Members', value: '8' }
  ];

  const handleAIRecommendation = () => {
    console.log("[Calendar] Requesting AI recommendations");
    toast({
      title: "AI Recommendation",
      description: "Based on your team's schedule, May 15-22 would be an optimal time for your vacation.",
    });
  };

  const handleExport = () => {
    console.log("[Calendar] Exporting calendar");
    toast({
      title: "Calendar Exported",
      description: "Your calendar has been exported to iCal format.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E2C] via-[#2D1F3D] to-[#1A1A2E] text-white p-6">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center mb-8 animate-fade-in">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
            <span className="text-lg font-medium">a</span>
          </div>
          <h1 className="text-2xl font-semibold">alfie</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="px-4 py-2 bg-white/10 hover:bg-white/20 transition rounded-full"
            onClick={() => setRegion(region === 'UK' ? 'US' : 'UK')}
          >
            Switch to {region === 'UK' ? 'US' : 'UK'}
          </Button>
          <Bell className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-colors" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Calendar */}
        <div className="lg:col-span-2">
          <Card className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05] transition-all duration-300 hover:bg-white/[0.04] animate-scale-in">
            <div className="flex justify-between items-center p-6 border-b border-white/[0.05]">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Leave Calendar
              </h2>
              <Button 
                className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
                onClick={() => navigate('/calendar/request')}
              >
                <Plus className="w-4 h-4" />
                <span>Request Leave</span>
              </Button>
            </div>
            
            {/* Calendar Grid */}
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {days.map(day => (
                  <div key={day} className="text-center text-sm text-white/60 py-2">{day}</div>
                ))}
                {currentMonth.map(date => (
                  <div
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center cursor-pointer
                      transition-all duration-200 text-sm
                      ${date === selectedDate 
                        ? 'bg-primary shadow-lg shadow-primary/20' 
                        : 'hover:bg-white/10'}
                    `}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Stats Cards */}
          {stats.map(stat => (
            <Card key={stat.label} className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05]">
              <CardContent className="p-4">
                <div className="text-sm text-white/60">{stat.label}</div>
                <div className="text-2xl font-semibold mt-1">{stat.value}</div>
              </CardContent>
            </Card>
          ))}

          {/* Feature Cards */}
          <div className="grid gap-4">
            <Card 
              className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05] p-4 hover:bg-white/[0.08] transition cursor-pointer"
              onClick={handleAIRecommendation}
            >
              <div className="flex items-center space-x-3">
                <Brain className="w-5 h-5 text-white/70" />
                <div>
                  <div className="font-medium">AI Recommendations</div>
                  <div className="text-sm text-white/60">Get smart insights</div>
                </div>
              </div>
            </Card>
            
            <Card 
              className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05] p-4 hover:bg-white/[0.08] transition cursor-pointer"
              onClick={handleExport}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-white/70" />
                <div>
                  <div className="font-medium">Export Calendar</div>
                  <div className="text-sm text-white/60">iCal, PDF formats</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05] p-6 hover:bg-white/[0.08] transition cursor-pointer">
          <CalendarIcon className="w-8 h-8 text-white/70 mb-4" />
          <h3 className="font-semibold mb-2">Smart Calendar</h3>
          <p className="text-sm text-white/60">Plan your time off with our intelligent calendar system</p>
        </Card>

        <Card className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05] p-6 hover:bg-white/[0.08] transition cursor-pointer">
          <Globe className="w-8 h-8 text-white/70 mb-4" />
          <h3 className="font-semibold mb-2">Region Aware</h3>
          <p className="text-sm text-white/60">Seamlessly handles UK and US holiday systems</p>
        </Card>

        <Card className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05] p-6 hover:bg-white/[0.08] transition cursor-pointer">
          <Users className="w-8 h-8 text-white/70 mb-4" />
          <h3 className="font-semibold mb-2">Team Sync</h3>
          <p className="text-sm text-white/60">Coordinate leave with your team effortlessly</p>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;