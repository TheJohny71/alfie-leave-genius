import React from 'react';
import { Settings, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LeaveType {
  label: string;
  color: string;
}

const leaveTypes: Record<string, LeaveType> = {
  annual: { label: 'Annual Leave', color: 'bg-blue-500' },
  sick: { label: 'Sick Leave', color: 'bg-red-500' },
  personal: { label: 'Personal Leave', color: 'bg-green-500' },
  other: { label: 'Other', color: 'bg-purple-500' }
};

export const LeaveStats = () => {
  return (
    <Card className="bg-white/5 border-purple-500/20 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Leave Balance</h3>
          <Settings className="w-5 h-5 text-purple-300 hover:text-white cursor-pointer" />
        </div>
        <div className="space-y-4">
          {Object.entries(leaveTypes).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${value.color}`}></div>
                <span className="text-sm">{value.label}</span>
              </div>
              <span className="font-medium">12 days</span>
            </div>
          ))}
          <div className="pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-purple-300">Used this year</span>
              <span className="font-medium">8 days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};