/**
 * Responsive Utilities Module
 * 
 * Provides utilities for responsive design adaptations including:
 * - Device detection
 * - Breakpoint helpers
 * - Touch interaction optimization
 * - Animation simplification for mobile
 * 
 * Requirements: 8.3, 2.1, 7.1
 */

/**
 * Breakpoint values matching Tailwind CSS defaults
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Check if the current viewport width matches or exceeds a breakpoint
 * 
 * @param breakpoint - The breakpoint to check against
 * @returns True if viewport is at or above the breakpoint
 */
export const isBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
};

/**
 * Check if the device is mobile (< 768px)
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
};

/**
 * Check if the device is tablet (768px - 1023px)
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
};

/**
 * Check if the device is desktop (>= 1024px)
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.lg;
};

/**
 * Check if the device supports touch
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get simplified animation duration for mobile devices
 * Mobile animations should be faster to feel more responsive
 * 
 * @param baseDuration - Base animation duration in seconds
 * @returns Adjusted duration for current device
 */
export const getResponsiveAnimationDuration = (baseDuration: number): number => {
  if (isMobile()) {
    return baseDuration * 0.7; // 30% faster on mobile
  }
  return baseDuration;
};

/**
 * Get animation variants optimized for current device
 * Simplifies animations on mobile for better performance
 * 
 * @param mobileVariant - Simplified variant for mobile
 * @param desktopVariant - Full variant for desktop
 * @returns Appropriate variant for current device
 */
export const getResponsiveVariant = <T>(mobileVariant: T, desktopVariant: T): T => {
  return isMobile() ? mobileVariant : desktopVariant;
};

/**
 * Check if parallax effects should be enabled
 * Disabled on mobile for better performance
 */
export const shouldEnableParallax = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Disable on mobile devices
  if (isMobile()) return false;
  
  // Disable if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  
  return true;
};

/**
 * Check if 3D transforms should be enabled
 * Disabled on mobile for better performance
 */
export const shouldEnable3DTransforms = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Disable on mobile devices
  if (isMobile()) return false;
  
  // Disable if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  
  return true;
};

/**
 * Get grid columns based on viewport width
 * 
 * @param mobile - Columns for mobile
 * @param tablet - Columns for tablet
 * @param desktop - Columns for desktop
 * @returns Number of columns for current viewport
 */
export const getResponsiveColumns = (
  mobile: number = 1,
  tablet: number = 2,
  desktop: number = 3
): number => {
  if (isMobile()) return mobile;
  if (isTablet()) return tablet;
  return desktop;
};

/**
 * Get responsive spacing value
 * 
 * @param mobile - Spacing for mobile (in rem)
 * @param desktop - Spacing for desktop (in rem)
 * @returns Spacing value for current viewport
 */
export const getResponsiveSpacing = (mobile: number, desktop: number): string => {
  return isMobile() ? `${mobile}rem` : `${desktop}rem`;
};

/**
 * Debounce function for scroll and resize events
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for high-frequency events
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Hook to track viewport size changes
 * Returns current viewport dimensions
 */
export const useViewportSize = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

/**
 * Get touch-friendly minimum size for interactive elements
 * WCAG recommends 44x44px minimum for touch targets
 */
export const TOUCH_TARGET_MIN_SIZE = 44; // pixels

/**
 * Check if an element meets touch target size requirements
 * 
 * @param element - HTML element to check
 * @returns True if element meets minimum size requirements
 */
export const meetsTouchTargetSize = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.width >= TOUCH_TARGET_MIN_SIZE && rect.height >= TOUCH_TARGET_MIN_SIZE;
};
