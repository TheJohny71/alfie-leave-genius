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
    <div className="min-h-screen p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986')] bg-cover opacity-[0.02]" />
      </div>

      {/* Header with improved spacing and animations */}
      <header className="flex items-center justify-between mb-8 relative z-10 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/20 to-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/10">
            a
          </div>
          <span className="text-white text-xl font-light tracking-wide">alfie</span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 transition-all duration-300"
            onClick={() => setRegion(region === 'UK' ? 'US' : 'UK')}
          >
            {region === 'UK' ? 'Switch to US' : 'Switch to UK'}
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 transition-all duration-300"
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          {/* Calendar Card with improved visual hierarchy */}
          <Card className="glass backdrop-blur-md bg-white/[0.08] border-white/10 transition-all duration-300 hover:bg-white/[0.09] animate-scale-in">
            <div className="flex items-center gap-2 p-6 border-b border-white/10">
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
          {["AI Recommendations", "Export Calendar", "Wellness Check", "Enterprise Sync"].map((action, index) => {
            const Icon = [Brain, FileDown, BellRing, Building2][index];
            const handler = [
              handleAIRecommendation,
              handleExport,
              handleWellnessCheck,
              handleEnterpriseSync
            ][index];
            const status = ["Available", "iCal, PDF", "92/100", "Connected"][index];

            return (
              <Card 
                key={action}
                className="glass backdrop-blur-md bg-white/[0.08] border-white/10 transition-all duration-300 hover:bg-white/[0.12] animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center justify-between p-4 group"
                    onClick={handler}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">{action}</span>
                    </div>
                    <span className="text-xs text-white/60 transition-opacity duration-300 group-hover:text-white/80">
                      {status}
                    </span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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