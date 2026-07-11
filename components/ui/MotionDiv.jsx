import React from 'react';
import { motion } from 'framer-motion';

export const MotionDiv = React.forwardRef((props, ref) => {
  return <motion.div ref={ref} {...props} />;
});
MotionDiv.displayName = 'MotionDiv';
