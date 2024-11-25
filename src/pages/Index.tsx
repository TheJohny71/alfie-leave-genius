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
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/20 to-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/10">
          a
        </div>
        <span className="text-white text-xl font-light tracking-wide">alfie</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-6xl font-bold mb-8 leading-tight tracking-[-0.02em] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
            Create moments for what matters...
          </h1>
          <p className="text-2xl text-white/85 mb-6 font-light">
            Life's best stories happen off the clock.
          </p>
          <p className="text-xl text-white/70 mb-10 font-light">
            Plan smarter. Live fuller.
          </p>
          <Button 
            onClick={handleNavigateToCalendar}
            className="bg-white/10 hover:bg-white/15 text-white px-8 py-6 text-lg rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
          >
            Plan Smarter Today →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4 mt-8">
          <div className="glass p-10 text-center group hover:bg-white/[0.12] transition-all duration-500">
            <Calendar className="w-12 h-12 mx-auto mb-6 text-white/80 group-hover:text-white transition-colors duration-500" />
            <h3 className="text-xl font-semibold mb-4 tracking-tight">Smart Calendar</h3>
            <p className="text-white/70 group-hover:text-white/80 transition-colors duration-500">
              Plan your time off with our intelligent calendar system
            </p>
          </div>
          <div className="glass p-10 text-center group hover:bg-white/[0.12] transition-all duration-500">
            <Globe className="w-12 h-12 mx-auto mb-6 text-white/80 group-hover:text-white transition-colors duration-500" />
            <h3 className="text-xl font-semibold mb-4 tracking-tight">Region Aware</h3>
            <p className="text-white/70 group-hover:text-white/80 transition-colors duration-500">
              Seamlessly handles UK and US holiday systems
            </p>
          </div>
          <div className="glass p-10 text-center group hover:bg-white/[0.12] transition-all duration-500">
            <Users className="w-12 h-12 mx-auto mb-6 text-white/80 group-hover:text-white transition-colors duration-500" />
            <h3 className="text-xl font-semibold mb-4 tracking-tight">Team Sync</h3>
            <p className="text-white/70 group-hover:text-white/80 transition-colors duration-500">
              Coordinate leave with your team effortlessly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;