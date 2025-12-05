/**
 * SectionDivider Component
 * 
 * Visual separator between portfolio sections with animated transitions.
 * Provides smooth visual breaks and enhances the flow between different
 * content areas.
 * 
 * Requirements: 2.1, 2.2, 2.6
 */

'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeIn, slideInLeft, slideInRight } from '@/components/animations/animationVariants';

export type DividerVariant = 'line' | 'wave' | 'gradient' | 'dots' | 'zigzag';

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
  animate?: boolean;
}

/**
 * SectionDivider - Animated visual separator between sections
 * 
 * @param variant - Style of divider (line, wave, gradient, dots, zigzag)
 * @param className - Additional CSS classes
 * @param animate - Whether to animate the divider on scroll
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'line',
  className = '',
  animate = true
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5, triggerOnce: true });

  const renderDivider = () => {
    switch (variant) {
      case 'line':
        return (
          <motion.div
            className="relative h-px w-full overflow-hidden"
            initial={animate ? "hidden" : "visible"}
            animate={animate && isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent dark:via-primary/50"
              initial={animate ? { scaleX: 0 } : { scaleX: 1 }}
              animate={animate && isVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        );

      case 'wave':
        return (
          <motion.svg
            className="w-full h-8"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            initial={animate ? "hidden" : "visible"}
            animate={animate && isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <motion.path
              d="M0,20 Q300,0 600,20 T1200,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/30 dark:text-primary/50"
              initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
              animate={animate && isVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.svg>
        );

      case 'gradient':
        return (
          <motion.div
            className="relative h-24 w-full overflow-hidden"
            initial={animate ? "hidden" : "visible"}
            animate={animate && isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent dark:via-primary/20" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent dark:via-accent/20"
              initial={animate ? { x: '-100%' } : { x: 0 }}
              animate={animate && isVisible ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        );

      case 'dots':
        return (
          <div className="flex justify-center items-center gap-2 py-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-primary/30 dark:bg-primary/50"
                initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={animate && isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: animate ? index * 0.1 : 0,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
            ))}
          </div>
        );

      case 'zigzag':
        return (
          <motion.svg
            className="w-full h-8"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            initial={animate ? "hidden" : "visible"}
            animate={animate && isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <motion.path
              d="M0,20 L100,5 L200,20 L300,5 L400,20 L500,5 L600,20 L700,5 L800,20 L900,5 L1000,20 L1100,5 L1200,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/30 dark:text-primary/50"
              initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
              animate={animate && isVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.svg>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden="true">
      {renderDivider()}
    </div>
  );
};

/**
 * AnimatedSectionDivider - Divider with left-right animation
 * 
 * Creates a divider that animates from both sides meeting in the middle
 */
export const AnimatedSectionDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className={`relative w-full h-px overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent to-primary/30 dark:to-primary/50"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={slideInLeft}
      />
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-transparent to-primary/30 dark:to-primary/50"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={slideInRight}
      />
    </div>
  );
};

export default SectionDivider;
