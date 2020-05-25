import React from 'react';
import { Box } from '@chakra-ui/core';
import { motion } from 'framer-motion';

const MotionBox = motion.custom(Box);

export const AnimatedBox = ({ children }) => (
  <MotionBox animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
    {children}
  </MotionBox>
);
