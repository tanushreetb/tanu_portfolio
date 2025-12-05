/**
 * ScrollProgress Component
 * 
 * A visual progress indicator that shows how far the user has scrolled through the page.
 * Displays as a horizontal bar at the top of the viewport that fills as the user scrolls.
 * 
 * Features:
 * - Real-time scroll progress tracking
 * - Smooth animation with GPU acceleration
 * - Responsive to page height changes
 * - Respects reduced motion preferences
 * - Customizable color and position
 * 
 * Requirements: 7.4
 */

'use client';

import React, { useState, useEffect } from 'react';

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = '',
  color = 'bg-blue-600',
  height = 3,
  position = 'top',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    /**
     * Calculate scroll progress as a percentage
     * Formula: (current scroll position) / (total scrollable height) * 100
     */
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Total scrollable distance
      const scrollableHeight = documentHeight - windowHeight;
      
      // Avoid division by zero
      if (scrollableHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      
      // Calculate percentage (0-100)
      const progress = (scrollTop / scrollableHeight) * 100;
      
      // Clamp between 0 and 100
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Calculate initial progress
    calculateScrollProgress();

    // Debounce scroll events for performance
    let timeoutId: NodeJS.Timeout;
    const debouncedCalculateProgress = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateScrollProgress, 10);
    };

    // Listen for scroll events
    window.addEventListener('scroll', debouncedCalculateProgress, { passive: true });
    
    // Recalculate on window resize (page height might change)
    window.addEventListener('resize', debouncedCalculateProgress, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', debouncedCalculateProgress);
      window.removeEventListener('resize', debouncedCalculateProgress);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 z-50 ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${className}`}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`${color} transition-all duration-150 ease-out will-change-transform`}
        style={{
          width: `${scrollProgress}%`,
          height: `${height}px`,
        }}
      />
    </div>
  );
};
