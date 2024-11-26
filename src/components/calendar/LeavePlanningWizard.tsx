import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Calendar as CalendarIcon, Download } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";

interface WizardStep {
  title: string;
  description: string;
}

const steps: WizardStep[] = [
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
  const { region, getTerminology } = useRegion();

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
      className="glass p-6 max-w-2xl mx-auto"
    >
      {/* Progress Indicator */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${index <= currentStep ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/50'}
              transition-colors duration-300
            `}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                w-full h-0.5 mx-2
                ${index < currentStep ? 'bg-purple-500' : 'bg-white/10'}
                transition-colors duration-300
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
          <p className="text-white/70">{steps[currentStep].description}</p>
        </div>

        {currentStep === 0 && (
          <div className="space-y-4">
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
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Days to Plan: {plannedDays}</Label>
              <Slider
                value={[plannedDays]}
                onValueChange={([value]) => setPlannedDays(value)}
                max={totalDays}
                step={1}
              />
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-white/70">
                You'll still have {totalDays - plannedDays} days remaining after this plan
              </p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-purple-300">
              <CalendarIcon className="w-5 h-5" />
              <span>Select {plannedDays} days on the calendar</span>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg space-y-3">
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
              className="w-full flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Schedule</span>
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};