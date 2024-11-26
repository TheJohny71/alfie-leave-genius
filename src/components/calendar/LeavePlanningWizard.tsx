import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Calendar as CalendarIcon, Download, ChevronLeft } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { WizardStepIndicator } from "./WizardStepIndicator";

const steps = [
  {
    title: "Annual Leave Balance",
    description: "Let's start by confirming your available leave balance"
  },
  {
    title: "Planning Preferences",
    description: "How would you like to distribute your leave days?"
  },
  {
    title: "Date Selection",
    description: "Select your preferred dates on the calendar"
  },
  {
    title: "Review & Export",
    description: "Review your plan and export if ready"
  }
];

export const LeavePlanningWizard = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [totalDays, setTotalDays] = React.useState(20);
  const [plannedDays, setPlannedDays] = React.useState(5);
  const { toast } = useToast();
  const { getTerminology } = useRegion();

  const handleExport = () => {
    console.log("[LeavePlanningWizard] Exporting leave schedule");
    toast({
      title: "Schedule Exported",
      description: "Your leave schedule has been exported successfully.",
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 max-w-2xl mx-auto rounded-2xl shadow-xl"
    >
      <WizardStepIndicator currentStep={currentStep} steps={steps} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-200"
            >
              {steps[currentStep].title}
            </motion.h3>
            <p className="text-white/70">{steps[currentStep].description}</p>
          </div>

          {currentStep === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="totalDays">Total {getTerminology('leave')} Days</Label>
                <Input
                  id="totalDays"
                  type="number"
                  value={totalDays}
                  onChange={(e) => setTotalDays(Number(e.target.value))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
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
          )}

          {currentStep === 2 && (
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
          )}

          {currentStep === 3 && (
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
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};