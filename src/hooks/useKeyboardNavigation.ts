/**
 * useKeyboardNavigation Hook
 * 
 * Custom hook for implementing keyboard navigation in components.
 * Supports arrow keys, Home, End, and roving tabindex pattern.
 * 
 * Requirements: 10.1, 10.2
 * 
 * @module hooks/useKeyboardNavigation
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { handleArrowKeyNavigation, setRovingTabIndex, KeyboardKeys } from '@/utils/accessibility';

interface UseKeyboardNavigationOptions {
  /**
   * Whether keyboard navigation is enabled
   */
  enabled?: boolean;
  
  /**
   * Initial focused index
   */
  initialIndex?: number;
  
  /**
   * Whether to loop navigation (wrap around at ends)
   */
  loop?: boolean;
  
  /**
   * Callback when active index changes
   */
  onIndexChange?: (index: number) => void;
  
  /**
   * Callback when Enter or Space is pressed on active element
   */
  onActivate?: (index: number) => void;
}

/**
 * Hook for keyboard navigation with roving tabindex
 * 
 * @param {UseKeyboardNavigationOptions} options - Configuration options
 * @returns Object with navigation state and handlers
 * 
 * @example
 * ```tsx
 * const { activeIndex, containerRef, itemRefs } = useKeyboardNavigation({
 *   enabled: true,
 *   onActivate: (index) => handleItemClick(items[index])
 * });
 * 
 * return (
 *   <div ref={containerRef}>
 *     {items.map((item, i) => (
 *       <button ref={el => itemRefs.current[i] = el}>
 *         {item.label}
 *       </button>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useKeyboardNavigation = (options: UseKeyboardNavigationOptions = {}) => {
  const {
    enabled = true,
    initialIndex = 0,
    loop = true,
    onIndexChange,
    onActivate
  } = options;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  /**
   * Update active index and notify callback
   */
  const updateActiveIndex = useCallback((newIndex: number) => {
    setActiveIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [onIndexChange]);

  /**
   * Handle keyboard events for navigation
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (items.length === 0) return;

    let newIndex = activeIndex;

    switch (event.key) {
      case KeyboardKeys.ARROW_RIGHT:
      case KeyboardKeys.ARROW_DOWN:
        event.preventDefault();
        newIndex = loop 
          ? (activeIndex + 1) % items.length
          : Math.min(activeIndex + 1, items.length - 1);
        break;

      case KeyboardKeys.ARROW_LEFT:
      case KeyboardKeys.ARROW_UP:
        event.preventDefault();
        newIndex = loop
          ? (activeIndex - 1 + items.length) % items.length
          : Math.max(activeIndex - 1, 0);
        break;

      case KeyboardKeys.HOME:
        event.preventDefault();
        newIndex = 0;
        break;

      case KeyboardKeys.END:
        event.preventDefault();
        newIndex = items.length - 1;
        break;

      case KeyboardKeys.ENTER:
      case KeyboardKeys.SPACE:
        event.preventDefault();
        onActivate?.(activeIndex);
        return;

      default:
        return;
    }

    if (newIndex !== activeIndex) {
      updateActiveIndex(newIndex);
      setRovingTabIndex(items, newIndex);
    }
  }, [enabled, activeIndex, loop, onActivate, updateActiveIndex]);

  /**
   * Set up keyboard event listeners
   */
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    container.addEventListener('keydown', handleKeyDown as any);

    return () => {
      container.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [enabled, handleKeyDown]);

  /**
   * Initialize roving tabindex on mount and when items change
   */
  useEffect(() => {
    if (!enabled) return;

    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (items.length > 0) {
      setRovingTabIndex(items, activeIndex);
    }
  }, [enabled, activeIndex, itemRefs.current.length]);

  /**
   * Focus active item when index changes
   */
  const focusActiveItem = useCallback(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      activeItem.focus();
    }
  }, [activeIndex]);

  return {
    activeIndex,
    setActiveIndex: updateActiveIndex,
    containerRef,
    itemRefs,
    focusActiveItem
  };
};
