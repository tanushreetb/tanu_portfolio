/**
 * useScrollAnimation Hook
 * 
 * Custom hook for triggering animations when elements enter the viewport.
 * Uses Intersection Observer API for efficient viewport detection.
 * 
 * Requirements: 2.1, 2.3
 */

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to detect when an element enters the viewport and trigger animations
 * 
 * @param options - Configuration options for the intersection observer
 * @param options.threshold - Percentage of element visibility required to trigger (0-1)
 * @param options.rootMargin - Margin around the root element for early/late triggering
 * @param options.triggerOnce - Whether to trigger animation only once or every time element enters viewport
 * 
 * @returns Object containing ref to attach to element and visibility state
 * 
 * @example
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
 * 
 * <motion.div
 *   ref={ref}
 *   initial="hidden"
 *   animate={isVisible ? "visible" : "hidden"}
 *   variants={fadeIn}
 * >
 *   Content
 * </motion.div>
 */
export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // If triggerOnce is true, disconnect observer after first trigger
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // If triggerOnce is false, reset visibility when element leaves viewport
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};
