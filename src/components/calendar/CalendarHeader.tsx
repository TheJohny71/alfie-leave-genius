import React from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';

export const CalendarHeader = () => {
  const { region, setRegion } = useRegion();

  return (
    <nav className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur-xl rounded-xl p-3 border border-[#279989]/20 shadow-lg sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-[#279989] to-[#34a899] rounded-xl flex items-center justify-center shadow-inner">
          <span className="text-lg font-bold text-white">A</span>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#279989]" />
          <input 
            type="text" 
            placeholder="Search leaves..." 
            className="bg-white/5 border border-[#279989]/20 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#279989]/50 transition-all duration-200 hover:bg-white/10"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-[#279989] hover:text-[#34a899] transition-colors cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        
        <div className="flex rounded-xl bg-neutral-100 p-1">
          <button 
            className={`px-4 py-2 rounded-xl transition-all duration-150 ${
              region === 'UK' ? 'bg-[#279989] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setRegion('UK')}
          >
            UK
          </button>
          <button 
            className={`px-4 py-2 rounded-xl transition-all duration-150 ${
              region === 'US' ? 'bg-[#279989] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setRegion('US')}
          >
            US
          </button>
        </div>

        <div className="w-8 h-8 bg-[#279989]/20 rounded-lg flex items-center justify-center hover:bg-[#279989]/30 transition-all duration-200 cursor-pointer">
          <User className="w-5 h-5 text-[#279989]" />
        </div>
      </div>
    </nav>
  );
};