import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Globe, Users } from "lucide-react";

const Index = () => {
  console.log("[Index] Rendering welcome page");
  const navigate = useNavigate();

  const handleNavigateToCalendar = () => {
    console.log("[Index] Navigating to calendar");
    navigate('/calendar');
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative z-10">
      {/* Logo Section */}
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
          a
        </div>
        <span className="text-white text-xl">alfie</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Create moments for what matters...
          </h1>
          <p className="text-2xl text-white/90 mb-4">
            Life's best stories happen off the clock.
          </p>
          <p className="text-xl text-white/80 mb-8">
            Plan smarter. Live fuller.
          </p>
          <Button 
            onClick={handleNavigateToCalendar}
            className="bg-[#663399]/50 hover:bg-[#663399]/70 text-white px-8 py-6 text-lg rounded-full border border-white/10 backdrop-blur-sm"
          >
            Plan Smarter Today →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4 mt-16">
          <div className="glass p-12 text-center animate-float">
            <Calendar className="w-12 h-12 mx-auto mb-6 text-white" />
            <h3 className="text-xl font-semibold mb-4">Smart Calendar</h3>
            <p className="text-white/80">
              Plan your time off with our intelligent calendar system
            </p>
          </div>
          <div className="glass p-12 text-center animate-float [animation-delay:200ms]">
            <Globe className="w-12 h-12 mx-auto mb-6 text-white" />
            <h3 className="text-xl font-semibold mb-4">Region Aware</h3>
            <p className="text-white/80">
              Seamlessly handles UK and US holiday systems
            </p>
          </div>
          <div className="glass p-12 text-center animate-float [animation-delay:400ms]">
            <Users className="w-12 h-12 mx-auto mb-6 text-white" />
            <h3 className="text-xl font-semibold mb-4">Team Sync</h3>
            <p className="text-white/80">
              Coordinate leave with your team effortlessly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;