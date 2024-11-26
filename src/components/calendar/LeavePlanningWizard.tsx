// src/components/calendar/LeavePlanningWizard.tsx
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
import { LoadingWrapper, LoadingButton } from "@/components/ui/loading-state";
import { handleError } from "@/utils/errorHandler";

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
  const { mutate: submitLeaveRequest, isPending } = useLeaveRequest();
  const { calendar } = useStore((state) => state.user);
  const setLoadingState = useStore((state) => state.setLoadingState);
  const loadingState = useStore((state) => state.ui.loading.leaves);

  const handleExport = async () => {
    try {
      setLoadingState('leaves', 'loading');
      await submitLeaveRequest({
        type: 'annual',
        startDate: calendar.selectedDates[0],
        endDate: calendar.selectedDates[calendar.selectedDates.length - 1],
      });
      setLoadingState('leaves', 'idle');
      toast({
        title: "Success",
        description: "Leave request submitted successfully"
      });
    } catch (error) {
      handleError(error);
    }
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
    <LoadingWrapper
      loading={loadingState === 'loading'}
      loadingMessage="Processing leave request..."
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
              disabled={currentStep === 0 || loadingState === 'loading'}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <LoadingButton
              onClick={currentStep === steps.length - 1 ? handleExport : handleNext}
              loading={loadingState === 'loading'}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              disabled={currentStep === steps.length - 1 && isPending}
            >
              <span>{currentStep === steps.length - 1 ? 'Submit' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </LoadingButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </LoadingWrapper>
  );
};
