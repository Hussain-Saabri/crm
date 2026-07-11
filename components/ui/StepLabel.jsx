import React from 'react';
import MuiStepLabel from '@mui/material/StepLabel';

export const StepLabel = React.forwardRef((props, ref) => {
  return <MuiStepLabel ref={ref} {...props} />;
});
StepLabel.displayName = 'StepLabel';
