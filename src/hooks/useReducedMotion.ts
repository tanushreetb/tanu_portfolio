/**
 * useReducedMotion Hook
 * 
 * Custom hook for detecting and responding to user's reduced motion preference.
 * Automatically updates when system preference changes.
 * 
 * Requirements: 10.1, 10.3
 * 
 * @module hooks/useReducedMotion
 */

import { useState, useEffect } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * 
 * Listens to system preference changes and updates automatically.
 * Returns true if user has enabled reduced motion in their system settings.
 * 
 * @returns {boolean} True if user prefers reduced motion
 * 
 * @example
 * ```tsx
 * const shouldReduceMotion = useReducedMotion();
 * 
 * return (
 *   <motion.div
 *     animate={{ opacity: 1 }}
 *     transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    // Create media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Handler for preference changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Listen for changes (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      // @ts-ignore
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // @ts-ignore
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to get accessible animation duration
 * 
 * Returns minimal duration if user prefers reduced motion,
 * otherwise returns the normal duration.
 * 
 * @param {number} normalDuration - Normal animation duration in seconds
 * @returns {number} Adjusted duration in seconds
 * 
 * @example
 * ```tsx
 * const duration = useAccessibleDuration(0.5);
 * 
 * return (
 *   <motion.div
 *     animate={{ x: 100 }}
 *     transition={{ duration }}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export const useAccessibleDuration = (normalDuration: number): number => {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? 0.01 : normalDuration;
};

/**
 * Hook to get accessible animation variants
 * 
 * Returns simplified variants if user prefers reduced motion,
 * otherwise returns the normal variants.
 * 
 * @param {object} normalVariants - Normal Framer Motion variants
 * @returns {object} Adjusted variants
 * 
 * @example
 * ```tsx
 * const variants = useAccessibleVariants({
 *   hidden: { opacity: 0, y: 20 },
 *   visible: { opacity: 1, y: 0 }
 * });
 * 
 * return (
 *   <motion.div variants={variants} initial="hidden" animate="visible">
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export const useAccessibleVariants = (normalVariants: any): any => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    // Return simplified variants with only opacity changes
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } }
    };
  }
  
  return normalVariants;
};
