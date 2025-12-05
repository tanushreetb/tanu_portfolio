'use client';

import { motion } from 'framer-motion';
import { prefersReducedMotion } from '@/utils/animations';

/**
 * Blog template component provides page transition animations for blog pages.
 * Uses a different animation style (slide from right) to distinguish blog navigation.
 */

export default function BlogTemplate({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = prefersReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
