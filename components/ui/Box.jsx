import React from 'react';
import MuiBox from '@mui/material/Box';

export const Box = React.forwardRef((props, ref) => {
  return <MuiBox ref={ref} {...props} />;
});
Box.displayName = 'Box';
