import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download, Calendar as CalendarIcon } from "lucide-react";

interface WizardStepProps {
  step: number;
  totalDays: number;
  setTotalDays: (days: number) => void;
  plannedDays: number;
  setPlannedDays: (days: number) => void;
  handleExport: () => void;
}

export const WizardStep: React.FC<WizardStepProps> = ({
  step,
  totalDays,
  setTotalDays,
  plannedDays,
  setPlannedDays,
  handleExport
}) => {
  switch (step) {
    case 0:
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="totalDays">Total Leave Days</Label>
            <Input
              id="totalDays"
              type="number"
              value={totalDays}
              onChange={(e) => setTotalDays(Number(e.target.value))}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </motion.div>
      );

    case 1:
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label>Days to Plan: {plannedDays}</Label>
            <Slider
              value={[plannedDays]}
              onValueChange={([value]) => setPlannedDays(value)}
              max={totalDays}
              step={1}
              className="py-4"
            />
          </div>
          <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-white/70">
              You'll still have {totalDays - plannedDays} days remaining after this plan
            </p>
          </div>
        </motion.div>
      );

    case 2:
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 text-purple-300">
            <CalendarIcon className="w-5 h-5" />
            <span>Select {plannedDays} days on the calendar</span>
          </div>
        </motion.div>
      );

    case 3:
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-white/5 rounded-lg space-y-3 backdrop-blur-sm">
            <div className="flex justify-between text-sm">
              <span>Total Days Available</span>
              <span>{totalDays}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Days Planned</span>
              <span>{plannedDays}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining Balance</span>
              <span>{totalDays - plannedDays}</span>
            </div>
          </div>
          <Button
            onClick={handleExport}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            <Download className="w-4 h-4" />
            <span>Export Schedule</span>
          </Button>
        </motion.div>
      );

    default:
      return null;
  }
};