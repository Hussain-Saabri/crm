import React from 'react';
import MuiStep from '@mui/material/Step';

export const Step = React.forwardRef((props, ref) => {
  return <MuiStep ref={ref} {...props} />;
});
Step.displayName = 'Step';
