import React from 'react';
import { Heart, Calendar, Users, Brain, Globe, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const features = [
    {
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      title: "AI-Powered Planning",
      description: "Smart suggestions for optimal leave scheduling based on team patterns and company calendar."
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-600" />,
      title: "Global-First",
      description: "Seamlessly handles multiple holiday systems and time zones across UK and US regions."
    },
    {
      icon: <Users className="w-5 h-5 text-green-600" />,
      title: "Team Sync",
      description: "Real-time team availability and intelligent conflict prevention."
    },
    {
      icon: <Calendar className="w-5 h-5 text-orange-600" />,
      title: "Smart Calendar",
      description: "Intuitive interface for leave management with enterprise calendar integration."
    }
  ];

  return (
    <Card className="bg-white max-w-2xl mx-auto">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-purple-900">About Alfie</h2>
          <Heart className="w-5 h-5 text-purple-600" />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Intro */}
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Making Time Off Management Human-Centric
            </p>
            <p className="text-base text-gray-600">
              Alfie is more than just a leave management tool - it's your intelligent companion for creating meaningful moments outside work. We believe that well-planned time off leads to better work-life harmony and more productive teams.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {feature.icon}
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Updates Section */}
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Latest Updates</h3>
              </div>
              <p className="text-sm text-gray-600">
                Version 2.3 brings enhanced AI recommendations, improved team scheduling, and seamless calendar integrations. We're constantly evolving to make your leave management experience better.
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;