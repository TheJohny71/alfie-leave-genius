import React, { useState } from 'react';
import { Calendar, Globe, Users, ArrowRight, LogIn } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AboutSection from '@/components/AboutSection';

const Index = () => {
  console.log("[Index] Rendering welcome page");
  const navigate = useNavigate();

  const handleNavigateToCalendar = () => {
    console.log("[Index] Navigating to calendar");
    navigate('/calendar');
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 flex flex-col">
      {/* Enhanced Navigation */}
      <nav className="flex justify-between items-center p-4 backdrop-blur-sm bg-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">a</span>
          </div>
          <span className="text-xl text-white font-bold tracking-tight">alfie</span>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-purple-200 hover:text-white transition-all duration-300">
                About
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-transparent border-0 p-0">
              <AboutSection />
            </DialogContent>
          </Dialog>
          <button className="px-5 py-2 bg-white text-purple-900 rounded-lg font-medium hover:bg-purple-100 transition-all duration-300 flex items-center space-x-2">
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </div>
      </nav>

      {/* Main Content Container with Enhanced Visual Flow */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        {/* Improved Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Enhanced Hero Section */}
        <div className="text-center space-y-6 mb-16 relative">
          <h1 className="text-6xl font-bold text-white leading-tight">
            Create moments for
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 text-transparent bg-clip-text">
              what matters
            </span>
          </h1>
          <div className="space-y-3">
            <p className="text-xl text-purple-200 font-medium">Life's best stories happen off the clock</p>
            <p className="text-lg text-purple-300">Plan smarter. Live fuller.</p>
          </div>
          
          <button 
            onClick={handleNavigateToCalendar}
            className="mt-8 group px-8 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
          >
            <span>Plan Smarter Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[
            {
              icon: <Calendar className="w-6 h-6" />,
              title: "Smart Calendar",
              description: "Plan your time off with our intelligent calendar system",
              highlight: "AI-Powered"
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: "Region Aware",
              description: "Seamlessly handles UK and US holiday systems",
              highlight: "Global Ready"
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Team Sync",
              description: "Coordinate leave with your team effortlessly",
              highlight: "Real-time"
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/10 border-purple-500/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-bl-lg">
                {feature.highlight}
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-purple-300 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="flex items-center text-purple-300 group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
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