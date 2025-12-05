/**
 * LiveRegion Component
 * 
 * ARIA live region for announcing dynamic content changes to screen readers.
 * Useful for status updates, notifications, and dynamic content.
 * 
 * Requirements: 10.3, 10.4
 * 
 * @component
 */

'use client';

import React, { useEffect, useState } from 'react';

interface LiveRegionProps {
  /**
   * Message to announce
   */
  message: string;
  
  /**
   * Priority of announcement
   * - 'polite': Wait for user to finish current task
   * - 'assertive': Interrupt immediately
   */
  priority?: 'polite' | 'assertive';
  
  /**
   * Whether to clear message after announcement
   */
  clearAfter?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveRegion component for screen reader announcements
 * 
 * Renders an ARIA live region that announces messages to screen readers.
 * The region is visually hidden but accessible to assistive technologies.
 */
export const LiveRegion: React.FC<LiveRegionProps> = ({
  message,
  priority = 'polite',
  clearAfter = 5000,
  className = ''
}) => {
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    setCurrentMessage(message);

    if (clearAfter > 0 && message) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);

      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className={`sr-only ${className}`}
    >
      {currentMessage}
    </div>
  );
};

/**
 * Hook for managing live region announcements
 * 
 * @returns Object with announce function and LiveRegion component
 * 
 * @example
 * ```tsx
 * const { announce, LiveRegionComponent } = useLiveRegion();
 * 
 * const handleAction = () => {
 *   // Do something
 *   announce('Action completed successfully');
 * };
 * 
 * return (
 *   <>
 *     <button onClick={handleAction}>Do Action</button>
 *     <LiveRegionComponent />
 *   </>
 * );
 * ```
 */
export const useLiveRegion = () => {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announce = (
    newMessage: string,
    newPriority: 'polite' | 'assertive' = 'polite'
  ) => {
    setMessage(newMessage);
    setPriority(newPriority);
  };

  const LiveRegionComponent = () => (
    <LiveRegion message={message} priority={priority} />
  );

  return {
    announce,
    LiveRegionComponent
  };
};
