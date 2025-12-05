/**
 * useResponsive Hook
 * 
 * Custom hook for responsive design that tracks viewport changes
 * and provides device-specific utilities.
 * 
 * Requirements: 8.3, 2.1
 */

import { useState, useEffect } from 'react';
import { 
  isMobile, 
  isTablet, 
  isDesktop, 
  isTouchDevice,
  shouldEnableParallax,
  shouldEnable3DTransforms,
  debounce,
  Breakpoint,
  isBreakpoint
} from '@/utils/responsive';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  shouldEnableParallax: boolean;
  shouldEnable3DTransforms: boolean;
  width: number;
  height: number;
}

/**
 * Hook to track responsive state and viewport changes
 * 
 * @returns Responsive state object with device detection and viewport dimensions
 * 
 * @example
 * const { isMobile, shouldEnable3DTransforms } = useResponsive();
 * 
 * return (
 *   <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
 *     {shouldEnable3DTransforms && <3DCard />}
 *   </div>
 * );
 */
export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    shouldEnableParallax: true,
    shouldEnable3DTransforms: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    // Initial state
    const updateState = () => {
      setState({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop(),
        isTouchDevice: isTouchDevice(),
        shouldEnableParallax: shouldEnableParallax(),
        shouldEnable3DTransforms: shouldEnable3DTransforms(),
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Update on mount
    updateState();

    // Debounced resize handler
    const handleResize = debounce(updateState, 150);

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return state;
};

/**
 * Hook to check if viewport matches a specific breakpoint
 * 
 * @param breakpoint - Breakpoint to check
 * @returns True if viewport matches or exceeds breakpoint
 * 
 * @example
 * const isLargeScreen = useBreakpoint('lg');
 * 
 * return (
 *   <div className={isLargeScreen ? 'grid-cols-3' : 'grid-cols-1'}>
 *     {content}
 *   </div>
 * );
 */
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const updateMatch = () => {
      setMatches(isBreakpoint(breakpoint));
    };

    updateMatch();

    const handleResize = debounce(updateMatch, 150);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return matches;
};

/**
 * Hook to get responsive animation configuration
 * Simplifies animations on mobile devices
 * 
 * @returns Animation configuration object
 * 
 * @example
 * const { duration, shouldAnimate } = useResponsiveAnimation();
 * 
 * return (
 *   <motion.div
 *     animate={shouldAnimate ? { opacity: 1 } : {}}
 *     transition={{ duration }}
 *   >
 *     {content}
 *   </motion.div>
 * );
 */
export const useResponsiveAnimation = () => {
  const { isMobile: mobile } = useResponsive();
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return {
    shouldAnimate: !prefersReducedMotion,
    duration: mobile ? 0.3 : 0.5, // Faster animations on mobile
    staggerDelay: mobile ? 0.05 : 0.1, // Shorter stagger on mobile
    shouldUseParallax: !mobile && !prefersReducedMotion,
    shouldUse3D: !mobile && !prefersReducedMotion,
  };
};
