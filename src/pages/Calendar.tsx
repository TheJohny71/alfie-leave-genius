import * as React from "react";
import { Calendar as CalendarIcon, BellRing, Brain, Building2, FileDown, Laptop } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log("[Calendar] Rendering calendar page with date:", date);

  // Mock integration functions
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
    <div className="min-h-screen bg-[#4B0082] p-6 relative">
      {/* Background effect similar to Index page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986')] bg-cover opacity-[0.02]" />
      </div>

      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/20 to-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/10">
            a
          </div>
          <span className="text-white text-xl font-light tracking-wide">alfie</span>
        </div>
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/10"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Main Calendar Section */}
        <Card className="glass lg:col-span-2 p-6">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Leave Calendar</h2>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-white/10 bg-white/5 p-4"
          />
        </Card>

        {/* Integrations Panel */}
        <div className="space-y-4">
          {/* AI Integration */}
          <Card className="glass p-4 hover:bg-white/[0.12] transition-all duration-300">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-between"
                onClick={handleAIRecommendation}
              >
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5" />
                  <span>AI Recommendations</span>
                </div>
                <span className="text-xs text-white/60">Available</span>
              </Button>
            </CardContent>
          </Card>

          {/* Data Export */}
          <Card className="glass p-4 hover:bg-white/[0.12] transition-all duration-300">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-between"
                onClick={handleExport}
              >
                <div className="flex items-center gap-3">
                  <FileDown className="w-5 h-5" />
                  <span>Export Calendar</span>
                </div>
                <span className="text-xs text-white/60">iCal, PDF</span>
              </Button>
            </CardContent>
          </Card>

          {/* Wellness Integration */}
          <Card className="glass p-4 hover:bg-white/[0.12] transition-all duration-300">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-between"
                onClick={handleWellnessCheck}
              >
                <div className="flex items-center gap-3">
                  <BellRing className="w-5 h-5" />
                  <span>Wellness Check</span>
                </div>
                <span className="text-xs text-white/60">92/100</span>
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Integration */}
          <Card className="glass p-4 hover:bg-white/[0.12] transition-all duration-300">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-between"
                onClick={handleEnterpriseSync}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5" />
                  <span>Enterprise Sync</span>
                </div>
                <span className="text-xs text-white/60">Connected</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;