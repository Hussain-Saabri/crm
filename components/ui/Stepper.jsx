import React from 'react';
import MuiStepper from '@mui/material/Stepper';

export const Stepper = React.forwardRef((props, ref) => {
  return <MuiStepper ref={ref} {...props} />;
});
Stepper.displayName = 'Stepper';
