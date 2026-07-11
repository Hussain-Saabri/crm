import React from 'react';
import { AnimatePresence as FramerAnimatePresence } from 'framer-motion';

export const AnimatePresence = ({ children, ...props }) => {
  return <FramerAnimatePresence {...props}>{children}</FramerAnimatePresence>;
};
