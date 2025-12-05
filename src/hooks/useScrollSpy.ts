/**
 * useScrollSpy Hook
 * 
 * Custom hook for tracking which section is currently active based on scroll position.
 * Used for highlighting navigation items as user scrolls through the page.
 * 
 * Requirements: 7.1, 7.3
 */

import { useEffect, useState } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  rootMargin?: string;
}

/**
 * Hook to track the currently active section based on scroll position
 * 
 * @param options - Configuration options for scroll spy
 * @param options.sectionIds - Array of section IDs to track
 * @param options.offset - Offset from top of viewport for activation (in pixels)
 * @param options.rootMargin - Margin for intersection observer
 * 
 * @returns The ID of the currently active section
 * 
 * @example
 * const activeSection = useScrollSpy({
 *   sectionIds: ['hero', 'about', 'projects', 'contact'],
 *   offset: 100
 * });
 * 
 * <nav>
 *   {sections.map(section => (
 *     <a 
 *       key={section.id}
 *       className={activeSection === section.id ? 'active' : ''}
 *     >
 *       {section.label}
 *     </a>
 *   ))}
 * </nav>
 */
export const useScrollSpy = ({
  sectionIds,
  offset = 100,
  rootMargin = '0px'
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    // Create a map to store intersection ratios for each section
    const sectionRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update the intersection ratio for this section
          sectionRatios.set(entry.target.id, entry.intersectionRatio);
        });

        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let mostVisibleSection = activeSection;

        sectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = id;
          }
        });

        // Update active section if we found a more visible one
        if (maxRatio > 0) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: `${-offset}px 0px ${-offset}px 0px`
      }
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        sectionRatios.set(id, 0);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offset, activeSection]);

  return activeSection;
};
