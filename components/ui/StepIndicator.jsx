import React from "react";
import { Box } from "@/components/ui/Box";
import { Stepper } from "@/components/ui/Stepper";
import { Step } from "@/components/ui/Step";
import { StepLabel } from "@/components/ui/StepLabel";

export function StepIndicator({ currentStep }) {
  const steps = ["Upload CSV", "Preview Data", "Import"];

  return (
    <Box sx={{ width: '100%', maxWidth: '42rem', mx: 'auto', mb: 5 }}>
      <Stepper 
        activeStep={currentStep - 1} 
        alternativeLabel
        sx={{
          '& .MuiStepIcon-root.Mui-active': {
            color: '#25B990',
          },
          '& .MuiStepIcon-root.Mui-completed': {
            color: '#25B990',
          },'.dark & .MuiStepLabel-label': {
            color: 'white',
          },'.dark & .MuiStepIcon-text': {
            fill: 'white', 
          }
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className="dark:text-white">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}