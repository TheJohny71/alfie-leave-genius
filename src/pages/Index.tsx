import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold mb-4">Create moments for what matters...</h1>
        <p className="text-xl text-white/80 mb-8">Life's best stories happen off the clock.</p>
        <p className="text-lg text-white/60 mb-8">Plan smarter. Live fuller.</p>
        <Button 
          onClick={() => navigate('/calendar')}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
        >
          Plan Smarter Today →
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        <div className="glass p-8 text-center animate-float">
          <h3 className="text-xl font-semibold mb-4">Smart Calendar</h3>
          <p className="text-white/70">
            Plan your time off with our intelligent calendar system
          </p>
        </div>
        <div className="glass p-8 text-center animate-float [animation-delay:200ms]">
          <h3 className="text-xl font-semibold mb-4">Region Aware</h3>
          <p className="text-white/70">
            Seamlessly handles UK and US holiday systems
          </p>
        </div>
        <div className="glass p-8 text-center animate-float [animation-delay:400ms]">
          <h3 className="text-xl font-semibold mb-4">Team Sync</h3>
          <p className="text-white/70">
            Coordinate leave with your team effortlessly
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;