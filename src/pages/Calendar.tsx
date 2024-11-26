import * as React from "react";
import { Calendar as CalendarIcon, BellRing, Brain, Building2, FileDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { LeaveRequest } from "@/components/LeaveRequest";
import { RegionProvider, useRegion } from "@/contexts/RegionContext";

const CalendarContent = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const navigate = useNavigate();
  const { region, setRegion } = useRegion();

  console.log("[Calendar] Rendering calendar page with date:", date);

  const handleExport = () => {
    console.log("[Calendar] Exporting calendar data");
    toast({
      title: "Calendar Exported",
      description: "Your calendar has been exported to iCal format.",
    });
  };

  const handleAIRecommendation = () => {
    console.log("[Calendar] Requesting AI recommendations");
    toast({
      title: "AI Recommendation",
      description: "Based on your team's schedule, May 15-22 would be an optimal time for your vacation.",
    });
  };

  const handleWellnessCheck = () => {
    console.log("[Calendar] Checking wellness metrics");
    toast({
      title: "Wellness Check",
      description: "Your team's wellness score is 92/100. Great job maintaining work-life balance!",
    });
  };

  const handleEnterpriseSync = () => {
    console.log("[Calendar] Syncing with enterprise systems");
    toast({
      title: "Enterprise Sync Complete",
      description: "Calendar synchronized with HR management system.",
    });
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-b from-[#1E1E1E] to-[#2D2D2D]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986')] bg-cover opacity-[0.02]" />
      </div>

      {/* Header with improved Apple-style spacing and animations */}
      <header className="flex items-center justify-between mb-8 relative z-10 animate-fade-in backdrop-blur-lg bg-white/[0.02] p-4 rounded-2xl border border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/20 to-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/10 hover:scale-105 transition-transform">
            a
          </div>
          <span className="text-white text-xl font-light tracking-wide">alfie</span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 transition-all duration-300 rounded-full px-6"
            onClick={() => setRegion(region === 'UK' ? 'US' : 'UK')}
          >
            {region === 'UK' ? 'Switch to US' : 'Switch to UK'}
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 transition-all duration-300 rounded-full px-6"
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          {/* Calendar Card with improved visual hierarchy */}
          <Card className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05] transition-all duration-300 hover:bg-white/[0.04] animate-scale-in rounded-3xl shadow-2xl">
            <div className="flex items-center gap-2 p-6 border-b border-white/[0.05]">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Leave Calendar</h2>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md p-4"
            />
          </Card>

          <LeaveRequest />
        </div>

        {/* Side panel with improved visual hierarchy and animations */}
        <div className="space-y-4">
          {[
            { title: "AI Recommendations", icon: Brain, handler: handleAIRecommendation, status: "Available" },
            { title: "Export Calendar", icon: FileDown, handler: handleExport, status: "iCal, PDF" },
            { title: "Wellness Check", icon: BellRing, handler: handleWellnessCheck, status: "92/100" },
            { title: "Enterprise Sync", icon: Building2, handler: handleEnterpriseSync, status: "Connected" }
          ].map((action, index) => (
            <Card 
              key={action.title}
              className="glass backdrop-blur-xl bg-white/[0.03] border-white/[0.05] transition-all duration-300 hover:bg-white/[0.08] animate-scale-in rounded-2xl shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-between p-4 group rounded-2xl"
                  onClick={action.handler}
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <span className="text-xs text-white/60 transition-opacity duration-300 group-hover:text-white/80">
                    {action.status}
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const CalendarPage = () => {
  return (
    <RegionProvider>
      <CalendarContent />
    </RegionProvider>
  );
};

export default CalendarPage;