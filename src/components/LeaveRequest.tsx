import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegion } from '@/contexts/RegionContext';
import { useToast } from "@/components/ui/use-toast";

export const LeaveRequest = () => {
  const { region, getTerminology } = useRegion();
  const { toast } = useToast();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [leaveType, setLeaveType] = useState('');

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
      region
    });

    toast({
      title: getTerminology('request'),
      description: `Your ${getTerminology('leave')} request has been submitted for review.`,
    });
  };

  return (
    <div className="glass p-6 rounded-lg space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{getTerminology('request')}</h3>
        <p className="text-sm text-white/70">
          Select your dates and {getTerminology('leave')} type below
        </p>
      </div>

      <Select value={leaveType} onValueChange={setLeaveType}>
        <SelectTrigger>
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

      <Calendar
        mode="multiple"
        selected={selectedDates}
        onSelect={setSelectedDates as any}
        className="rounded-md border"
      />

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!leaveType || selectedDates.length === 0}>
          {getTerminology('submit')}
        </Button>
      </div>
    </div>
  );
};