import React from 'react';
import { Calendar, Globe, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  console.log("[Index] Rendering welcome page");
  const navigate = useNavigate();

  const handleNavigateToCalendar = () => {
    console.log("[Index] Navigating to calendar");
    navigate('/calendar');
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-base font-medium text-white">a</span>
          </div>
          <span className="text-lg text-white font-semibold">alfie</span>
        </div>
        <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300">
          Sign In
        </button>
      </nav>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl"></div>

        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-bold text-white">
            Create moments for what{' '}
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 text-transparent bg-clip-text">
              matters...
            </span>
          </h1>
          <p className="text-lg text-purple-200">Life's best stories happen off the clock</p>
          <p className="text-base text-purple-300">Plan smarter. Live fuller.</p>
          
          <button 
            onClick={handleNavigateToCalendar}
            className="mt-6 group px-6 py-2.5 bg-white text-purple-900 rounded-full font-semibold hover:bg-purple-100 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Plan Smarter Today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            {
              icon: <Calendar className="w-5 h-5" />,
              title: "Smart Calendar",
              description: "Plan your time off with our intelligent calendar system"
            },
            {
              icon: <Globe className="w-5 h-5" />,
              title: "Region Aware",
              description: "Seamlessly handles UK and US holiday systems"
            },
            {
              icon: <Users className="w-5 h-5" />,
              title: "Team Sync",
              description: "Coordinate leave with your team effortlessly"
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/10 border-purple-500/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group"
            >
              <CardContent className="p-4 space-y-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-purple-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-purple-200">
                  {feature.description}
                </p>
                <div className="flex items-center text-purple-300 group-hover:text-white transition-colors duration-300">
                  <span className="text-xs">Learn more</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;