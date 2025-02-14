import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  enter: {
    opacity: 0,
    scale: 0.9,
  },
  center: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1.1,
  },
};

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.5,
        type: "spring",
        damping: 25,
        stiffness: 120,
      }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition