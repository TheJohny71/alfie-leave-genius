import React from "react";
import { motion } from "framer-motion";

interface WizardStepIndicatorProps {
  currentStep: number;
  steps: { title: string; description: string }[];
}

export const WizardStepIndicator = ({ currentStep, steps }: WizardStepIndicatorProps) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: index <= currentStep ? 1 : 0.8,
              backgroundColor: index <= currentStep ? "rgb(168, 85, 247)" : "rgba(255, 255, 255, 0.1)"
            }}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${index <= currentStep ? 'text-white' : 'text-white/50'}
              transition-colors duration-300
            `}
          >
            {index + 1}
          </motion.div>
          {index < steps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: 1,
                backgroundColor: index < currentStep ? "rgb(168, 85, 247)" : "rgba(255, 255, 255, 0.1)"
              }}
              className="w-full h-0.5 mx-2 origin-left transition-colors duration-300"
            />
          )}
        </div>
      ))}
    </div>
  );
};