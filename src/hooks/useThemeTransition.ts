/**
 * useThemeTransition Hook
 * 
 * Custom hook to detect and track theme transition state.
 * Useful for components that need to coordinate animations during theme changes.
 * 
 * Requirements: 9.1, 9.3 - Coordinated transitions and animation continuity
 * 
 * @module useThemeTransition
 */

'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Hook to track theme transition state
 * 
 * Returns true when a theme transition is in progress, false otherwise.
 * This allows components to coordinate their animations with theme changes.
 * 
 * Implementation:
 * - Watches for changes to the theme value
 * - Sets isTransitioning to true when theme changes
 * - Automatically resets to false after transition duration
 * - Matches the --theme-transition-duration in globals.css (400ms)
 * 
 * @returns {boolean} isTransitioning - True during theme transition, false otherwise
 * 
 * @example
 * ```typescript
 * function MyComponent() {
 *   const isTransitioning = useThemeTransition();
 *   
 *   return (
 *     <div className={isTransitioning ? 'transitioning' : ''}>
 *       Content that responds to theme transitions
 *     </div>
 *   );
 * }
 * ```
 */
export function useThemeTransition(): boolean {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Set transitioning state when theme changes
    setIsTransitioning(true);

    // Reset transitioning state after transition completes
    // Duration matches --theme-transition-duration in globals.css (400ms)
    const timeoutId = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);

    // Cleanup timeout on unmount or theme change
    return () => clearTimeout(timeoutId);
  }, [theme]);

  return isTransitioning;
}

/**
 * Hook to get theme transition CSS class
 * 
 * Returns a CSS class name that can be applied to elements during theme transitions.
 * Useful for applying specific styles during the transition period.
 * 
 * @returns {string} className - 'theme-transitioning' during transition, empty string otherwise
 * 
 * @example
 * ```typescript
 * function MyComponent() {
 *   const transitionClass = useThemeTransitionClass();
 *   
 *   return (
 *     <div className={`my-component ${transitionClass}`}>
 *       Content with transition-specific styling
 *     </div>
 *   );
 * }
 * ```
 */
export function useThemeTransitionClass(): string {
  const isTransitioning = useThemeTransition();
  return isTransitioning ? 'theme-transitioning' : '';
}
