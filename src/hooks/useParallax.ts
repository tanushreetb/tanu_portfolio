/**
 * useParallax Hook
 * 
 * Custom hook for creating parallax scroll effects.
 * Transforms elements based on scroll position for depth perception.
 * Optimized with RAF throttling for 60fps performance.
 * 
 * Requirements: 2.1, 2.2, 2.5, 8.2, 8.5
 */

import { useEffect, useState } from 'react';
import { rafThrottle } from '@/utils/debounce';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
}

/**
 * Hook to create parallax scroll effects
 * 
 * @param options - Configuration options for parallax effect
 * @param options.speed - Multiplier for scroll speed (0.5 = half speed, 2 = double speed)
 * @param options.direction - Direction of parallax movement ('up' or 'down')
 * 
 * @returns Offset value to apply as transform
 * 
 * @example
 * const offset = useParallax({ speed: 0.5, direction: 'up' });
 * 
 * <div style={{ transform: `translateY(${offset}px)` }}>
 *   Parallax content
 * </div>
 */
export const useParallax = ({
  speed = 0.5,
  direction = 'up'
}: UseParallaxOptions = {}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Don't apply parallax if user prefers reduced motion
    }

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const multiplier = direction === 'up' ? -1 : 1;
      setOffset(scrollY * speed * multiplier);
    };

    // Use RAF throttle for optimal performance (60fps)
    const throttledScroll = rafThrottle(handleScroll);

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Set initial offset
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed, direction]);

  return offset;
};
