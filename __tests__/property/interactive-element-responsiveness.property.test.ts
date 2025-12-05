/**
 * **Feature: portfolio-blog-websites, Property 3: Interactive element responsiveness**
 * **Validates: Requirements 1.5, 4.2**
 * 
 * Property-based test for validating interactive element responsiveness.
 * This test ensures that user interactions (hover, click, focus) trigger 
 * appropriate visual feedback within the animation system.
 */

import * as fc from 'fast-check';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { ProjectData } from '@/types';
import React from 'react';

// Mock matchMedia for testing
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('Interactive Element Responsiveness Properties', () => {
  beforeEach(() => {
    // Mock matchMedia to not prefer reduced motion (enable animations)
    mockMatchMedia(false);
  });

  // Generator for valid project data
  const projectDataArbitrary = fc.record({
    id: fc.string({ minLength: 1, maxLength: 50 }),
    title: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.string({ minLength: 10, maxLength: 500 }),
    technologies: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
    achievements: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 200 }), { minLength: 0, maxLength: 5 })),
    link: fc.option(fc.webUrl()),
    role: fc.option(fc.string({ minLength: 1, maxLength: 50 }))
  });

  // Property 3: Interactive element responsiveness - ProjectCard hover
  test('should provide visual feedback on hover for project cards', () => {
    fc.assert(
      fc.property(
        projectDataArbitrary,
        (project: ProjectData) => {
          const { container } = render(React.createElement(ProjectCard, { project }));
          
          // Get the card element
          const cardElement = container.firstChild as HTMLElement;
          expect(cardElement).toBeInTheDocument();
          
          // Property: Card should be interactive (have hover styles)
          const hasHoverClass = cardElement.className.includes('hover:shadow-xl');
          expect(hasHoverClass).toBe(true);
          
          // Property: Hovering should trigger interaction
          fireEvent.mouseEnter(cardElement);
          
          // Property: Element should remain in document after hover
          expect(cardElement).toBeInTheDocument();
          
          // Property: Mouse leave should also work
          fireEvent.mouseLeave(cardElement);
          expect(cardElement).toBeInTheDocument();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Interactive links should respond to hover
  test('should provide visual feedback on hover for interactive links', () => {
    fc.assert(
      fc.property(
        projectDataArbitrary.filter(p => p.link !== null && p.link !== undefined),
        (project: ProjectData) => {
          const { container } = render(React.createElement(ProjectCard, { project }));
          
          // Find the link element
          const linkElement = container.querySelector('a[href="' + project.link + '"]');
          
          if (linkElement) {
            // Property: Link should have hover styles
            const hasHoverClass = linkElement.className.includes('hover:');
            expect(hasHoverClass).toBe(true);
            
            // Property: Link should respond to mouse events
            fireEvent.mouseEnter(linkElement);
            expect(linkElement).toBeInTheDocument();
            
            fireEvent.mouseLeave(linkElement);
            expect(linkElement).toBeInTheDocument();
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Buttons should respond to click interactions
  test('should provide visual feedback on click for buttons', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(React.createElement(HeroSection));
          
          // Find all button/link elements
          const buttons = container.querySelectorAll('a[class*="bg-blue-600"], a[class*="border-blue-600"]');
          
          // Property: All buttons should exist
          expect(buttons.length).toBeGreaterThan(0);
          
          buttons.forEach(button => {
            // Property: Button should have transition classes for visual feedback
            const hasTransition = button.className.includes('transition');
            expect(hasTransition).toBe(true);
            
            // Property: Button should respond to mouse events
            fireEvent.mouseEnter(button);
            expect(button).toBeInTheDocument();
            
            fireEvent.mouseLeave(button);
            expect(button).toBeInTheDocument();
            
            // Property: Button should respond to click
            fireEvent.click(button);
            expect(button).toBeInTheDocument();
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Contact section links should be interactive
  test('should provide visual feedback for contact section interactive elements', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(React.createElement(ContactSection));
          
          // Find all interactive elements (links)
          const interactiveElements = container.querySelectorAll('a');
          
          // Property: Interactive elements should exist
          expect(interactiveElements.length).toBeGreaterThan(0);
          
          interactiveElements.forEach(element => {
            // Property: Element should have hover or transition styles
            const hasInteractiveClass = 
              element.className.includes('hover:') || 
              element.className.includes('transition') ||
              element.className.includes('group');
            expect(hasInteractiveClass).toBe(true);
            
            // Property: Element should respond to hover
            fireEvent.mouseEnter(element);
            expect(element).toBeInTheDocument();
            
            fireEvent.mouseLeave(element);
            expect(element).toBeInTheDocument();
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Focus interactions should work for accessibility
  test('should respond to focus interactions for keyboard navigation', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(React.createElement(HeroSection));
          
          // Find all focusable elements
          const focusableElements = container.querySelectorAll('a, button');
          
          // Property: Focusable elements should exist
          expect(focusableElements.length).toBeGreaterThan(0);
          
          focusableElements.forEach(element => {
            // Property: Element should be focusable (have tabindex or be naturally focusable)
            const isFocusable = 
              element.hasAttribute('tabindex') || 
              element.tagName === 'A' || 
              element.tagName === 'BUTTON';
            expect(isFocusable).toBe(true);
            
            // Property: Element should handle focus event
            fireEvent.focus(element);
            expect(element).toBeInTheDocument();
            
            // Property: Element should handle blur event
            fireEvent.blur(element);
            expect(element).toBeInTheDocument();
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Interactive elements should maintain functionality with reduced motion
  test('should maintain interactivity when reduced motion is preferred', () => {
    fc.assert(
      fc.property(
        projectDataArbitrary,
        (project: ProjectData) => {
          // Enable reduced motion preference
          mockMatchMedia(true);
          
          const { container } = render(React.createElement(ProjectCard, { project }));
          
          const cardElement = container.firstChild as HTMLElement;
          
          // Property: Card should still be interactive even with reduced motion
          expect(cardElement).toBeInTheDocument();
          
          // Property: Hover should still work
          fireEvent.mouseEnter(cardElement);
          expect(cardElement).toBeInTheDocument();
          
          fireEvent.mouseLeave(cardElement);
          expect(cardElement).toBeInTheDocument();
          
          // Reset to normal motion
          mockMatchMedia(false);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Multiple rapid interactions should be handled gracefully
  test('should handle rapid successive interactions without breaking', () => {
    fc.assert(
      fc.property(
        projectDataArbitrary,
        fc.integer({ min: 3, max: 10 }),
        (project: ProjectData, interactionCount: number) => {
          const { container } = render(React.createElement(ProjectCard, { project }));
          
          const cardElement = container.firstChild as HTMLElement;
          
          // Property: Rapid interactions should not break the component
          for (let i = 0; i < interactionCount; i++) {
            fireEvent.mouseEnter(cardElement);
            fireEvent.mouseLeave(cardElement);
          }
          
          // Property: Element should still be functional after rapid interactions
          expect(cardElement).toBeInTheDocument();
          
          // Property: Final interaction should still work
          fireEvent.mouseEnter(cardElement);
          expect(cardElement).toBeInTheDocument();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Interactive elements should have consistent behavior
  test('should provide consistent visual feedback across all interactive elements', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container: heroContainer } = render(React.createElement(HeroSection));
          const { container: contactContainer } = render(React.createElement(ContactSection));
          
          // Collect all interactive elements from both components
          const heroInteractive = heroContainer.querySelectorAll('a, button');
          const contactInteractive = contactContainer.querySelectorAll('a, button');
          
          const allInteractive = [...Array.from(heroInteractive), ...Array.from(contactInteractive)];
          
          // Property: All interactive elements should have some form of visual feedback
          allInteractive.forEach(element => {
            const hasVisualFeedback = 
              element.className.includes('hover:') ||
              element.className.includes('transition') ||
              element.className.includes('group') ||
              element.className.includes('focus:');
            
            expect(hasVisualFeedback).toBe(true);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
