import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegion } from '@/contexts/RegionContext';
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LeaveRequest = () => {
  const { region, getTerminology } = useRegion();
  const { toast } = useToast();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [leaveType, setLeaveType] = useState('');
  const [duration, setDuration] = useState('full');

  const leaveTypes = {
    UK: [
      { id: 'annual', label: 'Annual Leave' },
      { id: 'sick', label: 'Sick Leave' },
      { id: 'bank', label: 'Bank Holiday' }
    ],
    US: [
      { id: 'pto', label: 'PTO' },
      { id: 'sick', label: 'Sick Time' },
      { id: 'federal', label: 'Federal Holiday' }
    ]
  };

  const handleSubmit = () => {
    console.log('[LeaveRequest] Submitting leave request:', {
      dates: selectedDates,
      type: leaveType,
      duration,
      region
    });

    toast({
      title: getTerminology('request'),
      description: `Your ${getTerminology('leave')} request has been submitted for review.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-[#279989]/20 shadow-lg space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[#279989]">{getTerminology('request')}</h3>
        <p className="text-sm text-gray-600">
          Select your dates and {getTerminology('leave')} type below
        </p>
      </div>

      <Select value={leaveType} onValueChange={setLeaveType}>
        <SelectTrigger className="border-[#279989]/20 focus:ring-[#279989]/20">
          <SelectValue placeholder={`Select ${getTerminology('leave')} type`} />
        </SelectTrigger>
        <SelectContent>
          {leaveTypes[region].map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">Duration</label>
        <div className="flex space-x-2">
          {['full', 'half-am', 'half-pm'].map((type) => (
            <Button
              key={type}
              variant={duration === type ? 'default' : 'outline'}
              onClick={() => setDuration(type)}
              className={cn(
                'flex-1',
                duration === type ? 'bg-[#279989] text-white' : 'border-[#279989]/20'
              )}
            >
              {type === 'full' ? 'Full Day' : type === 'half-am' ? 'Half Day (AM)' : 'Half Day (PM)'}
            </Button>
          ))}
        </div>
      </div>

      <Calendar
        mode="multiple"
        selected={selectedDates}
        onSelect={setSelectedDates as any}
        className="rounded-md border border-[#279989]/20"
      />

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!leaveType || selectedDates.length === 0}
          className="bg-[#279989] hover:bg-[#279989]/90 text-white"
        >
          {getTerminology('submit')}
        </Button>
      </div>
    </motion.div>
  );
};
