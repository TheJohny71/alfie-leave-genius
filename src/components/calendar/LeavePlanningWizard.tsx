import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { WizardStepIndicator } from "./WizardStepIndicator";
import { WizardStep } from "./WizardStep";
import { useStore } from "@/store/useStore";
import { useLeaveRequest } from "@/hooks/useLeaveRequest";

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
  const { mutate: submitLeaveRequest, isLoading } = useLeaveRequest();
  const { calendar } = useStore((state) => state.user);

  console.log("[LeavePlanningWizard] Rendering wizard at step:", currentStep);

  const handleExport = () => {
    console.log("[LeavePlanningWizard] Exporting leave schedule");
    submitLeaveRequest({
      type: 'annual',
      startDate: calendar.selectedDates[0],
      endDate: calendar.selectedDates[calendar.selectedDates.length - 1],
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      console.log("[LeavePlanningWizard] Moving to next step:", currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      console.log("[LeavePlanningWizard] Moving to previous step:", currentStep - 1);
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

          <WizardStep
            step={currentStep}
            totalDays={totalDays}
            setTotalDays={setTotalDays}
            plannedDays={plannedDays}
            setPlannedDays={setPlannedDays}
            handleExport={handleExport}
          />

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
              disabled={currentStep === steps.length - 1 || isLoading}
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