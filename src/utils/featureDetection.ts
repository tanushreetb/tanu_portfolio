/**
 * Feature Detection Utilities Module
 * 
 * This module provides utilities for detecting browser feature support and
 * providing appropriate fallbacks for unsupported features. It helps ensure
 * the website works across different browsers and devices.
 * 
 * Key features:
 * - CSS feature detection using @supports
 * - JavaScript API availability checks
 * - Graceful degradation for unsupported features
 * - Server-side rendering compatibility
 * 
 * @module featureDetection
 */

/**
 * Check if CSS Grid is supported
 * 
 * CSS Grid is widely supported in modern browsers but may not be available
 * in older browsers. This function checks for grid support and can be used
 * to provide flexbox fallbacks.
 * 
 * Implementation approach:
 * 1. Check if running in browser environment
 * 2. Use CSS.supports API to check for grid support
 * 3. Return false if API is unavailable (assume no support)
 * 
 * @returns {boolean} True if CSS Grid is supported, false otherwise
 * 
 * @example
 * ```typescript
 * if (!supportsGrid()) {
 *   // Use flexbox fallback layout
 * }
 * ```
 */
export function supportsGrid(): boolean {
  // Server-side rendering check
  if (typeof window === 'undefined') return false;
  
  try {
    // Check if CSS.supports API is available
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      // Check for grid support using CSS.supports
      return CSS.supports('display', 'grid');
    }
    
    // Fallback: assume no support if API unavailable
    return false;
  } catch (error) {
    console.warn('Error checking CSS Grid support:', error);
    return false;
  }
}

/**
 * Check if CSS Custom Properties (CSS Variables) are supported
 * 
 * CSS Custom Properties are used for theming in this application.
 * This function checks for support and can be used to provide
 * fallback color schemes.
 * 
 * Implementation approach:
 * 1. Check if running in browser environment
 * 2. Use CSS.supports API to check for custom property support
 * 3. Return false if API is unavailable
 * 
 * @returns {boolean} True if CSS Custom Properties are supported, false otherwise
 * 
 * @example
 * ```typescript
 * if (!supportsCustomProperties()) {
 *   // Use hardcoded color values instead of CSS variables
 * }
 * ```
 */
export function supportsCustomProperties(): boolean {
  // Server-side rendering check
  if (typeof window === 'undefined') return false;
  
  try {
    // Check if CSS.supports API is available
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      // Check for custom property support
      return CSS.supports('--test', '0');
    }
    
    // Fallback: assume no support if API unavailable
    return false;
  } catch (error) {
    console.warn('Error checking CSS Custom Properties support:', error);
    return false;
  }
}

/**
 * Check if Intersection Observer API is supported
 * 
 * Intersection Observer is used for viewport-based animation triggering.
 * This function checks for support and can be used to provide fallbacks
 * like immediate animation or scroll event listeners.
 * 
 * Implementation approach:
 * 1. Check if running in browser environment
 * 2. Check if IntersectionObserver constructor exists
 * 3. Return false if unavailable
 * 
 * @returns {boolean} True if Intersection Observer is supported, false otherwise
 * 
 * @example
 * ```typescript
 * if (!supportsIntersectionObserver()) {
 *   // Animate immediately instead of waiting for viewport entry
 * }
 * ```
 */
export function supportsIntersectionObserver(): boolean {
  // Server-side rendering check
  if (typeof window === 'undefined') return false;
  
  try {
    // Check if IntersectionObserver is available
    return 'IntersectionObserver' in window;
  } catch (error) {
    console.warn('Error checking Intersection Observer support:', error);
    return false;
  }
}

/**
 * Check if localStorage is available and accessible
 * 
 * localStorage may be unavailable in private browsing mode or due to
 * browser settings. This function checks for availability and can be
 * used to provide in-memory storage fallbacks.
 * 
 * Implementation approach:
 * 1. Check if running in browser environment
 * 2. Check if localStorage exists
 * 3. Attempt to write and read a test value
 * 4. Clean up test value
 * 5. Return false if any step fails
 * 
 * @returns {boolean} True if localStorage is available, false otherwise
 * 
 * @example
 * ```typescript
 * if (!supportsLocalStorage()) {
 *   // Use in-memory storage or session storage fallback
 * }
 * ```
 */
export function supportsLocalStorage(): boolean {
  // Server-side rendering check
  if (typeof window === 'undefined') return false;
  
  try {
    // Check if localStorage exists
    if (!window.localStorage) return false;
    
    // Test write and read operations
    const testKey = '__localStorage_test__';
    const testValue = 'test';
    
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    
    return retrieved === testValue;
  } catch (error) {
    // localStorage may throw in private browsing mode
    console.warn('localStorage is not available:', error);
    return false;
  }
}

/**
 * Check if CSS backdrop-filter is supported
 * 
 * backdrop-filter is used for glassmorphism effects and may not be
 * supported in all browsers. This function checks for support and can
 * be used to provide solid background fallbacks.
 * 
 * Implementation approach:
 * 1. Check if running in browser environment
 * 2. Use CSS.supports API to check for backdrop-filter support
 * 3. Check both standard and webkit-prefixed versions
 * 4. Return false if API is unavailable
 * 
 * @returns {boolean} True if backdrop-filter is supported, false otherwise
 * 
 * @example
 * ```typescript
 * if (!supportsBackdropFilter()) {
 *   // Use solid background instead of blur effect
 * }
 * ```
 */
export function supportsBackdropFilter(): boolean {
  // Server-side rendering check
  if (typeof window === 'undefined') return false;
  
  try {
    // Check if CSS.supports API is available
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      // Check for standard and webkit-prefixed versions
      return (
        CSS.supports('backdrop-filter', 'blur(10px)') ||
        CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
      );
    }
    
    // Fallback: assume no support if API unavailable
    return false;
  } catch (error) {
    console.warn('Error checking backdrop-filter support:', error);
    return false;
  }
}

/**
 * Check if touch events are supported
 * 
 * Touch event support indicates a touch-capable device. This can be used
 * to adjust UI elements for better touch interaction (larger tap targets,
 * different hover behaviors, etc.).
 * 
 * Implementation approach:
 * 1. Check if running in browser environment
 * 2. Check for touch event support in multiple ways
 * 3. Check for pointer:coarse media query (indicates touch device)
 * 
 * @returns {boolean} True if touch events are supported, false otherwise
 * 
 * @example
 * ```typescript
 * if (supportsTouchEvents()) {
 *   // Increase button sizes for better touch targets
 * }
 * ```
 */
export function supportsTouchEvents(): boolean {
  // Server-side rendering check
  if (typeof window === 'undefined') return false;
  
  try {
    // Check multiple indicators of touch support
    const hasTouchEvents = 'ontouchstart' in window;
    const hasMaxTouchPoints = navigator.maxTouchPoints > 0;
    const hasPointerCoarse = window.matchMedia?.('(pointer: coarse)').matches;
    
    return hasTouchEvents || hasMaxTouchPoints || hasPointerCoarse;
  } catch (error) {
    console.warn('Error checking touch event support:', error);
    return false;
  }
}

/**
 * Get a comprehensive feature support report
 * 
 * This function runs all feature detection checks and returns a complete
 * report of browser capabilities. Useful for debugging and analytics.
 * 
 * @returns {Object} Object containing support status for all features
 * 
 * @example
 * ```typescript
 * const features = getFeatureSupport();
 * console.log('Browser capabilities:', features);
 * ```
 */
export function getFeatureSupport() {
  return {
    grid: supportsGrid(),
    customProperties: supportsCustomProperties(),
    intersectionObserver: supportsIntersectionObserver(),
    localStorage: supportsLocalStorage(),
    backdropFilter: supportsBackdropFilter(),
    touchEvents: supportsTouchEvents(),
  };
}
