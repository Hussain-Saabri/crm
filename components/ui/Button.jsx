import React from 'react';
import MuiButton from '@mui/material/Button';

export const Button = React.forwardRef((props, ref) => {
  return <MuiButton ref={ref} {...props} />;
});
Button.displayName = 'Button';
