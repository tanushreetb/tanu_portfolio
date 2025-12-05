'use client';

import { motion } from 'framer-motion';
import { prefersReducedMotion } from '@/utils/animations';

/**
 * Template component provides page transition animations.
 * Wraps page content with fade and slide animations during navigation.
 * Respects user's reduced motion preferences.
 */

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = prefersReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
