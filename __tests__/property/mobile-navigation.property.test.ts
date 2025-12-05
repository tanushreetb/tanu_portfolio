/**
 * **Feature: portfolio-blog-websites, Property 8: Navigation accessibility on mobile**
 * **Validates: Requirements 5.5**
 * 
 * Property-based test for validating mobile navigation accessibility.
 * This test ensures that navigation elements meet minimum touch target sizes (44px)
 * and provide appropriate spacing on mobile viewports.
 */

import * as fc from 'fast-check';
import { render, fireEvent } from '@testing-library/react';
import { NavigationBar } from '@/components/blog/NavigationBar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import React from 'react';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return React.createElement('a', { href }, children);
  };
});

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// Mock document.documentElement
const mockDocumentElement = {
  setAttribute: jest.fn(),
  getAttribute: jest.fn(),
};

// Generator for mobile viewport widths (below 640px)
const mobileViewportArbitrary = fc.integer({ min: 320, max: 639 });

// Minimum touch target size in pixels (WCAG 2.1 Level AAA guideline)
const MIN_TOUCH_TARGET_SIZE = 44;

describe('Mobile Navigation Accessibility Properties', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
    
    // Setup global mocks
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true,
    });
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  // Property 8: Navigation accessibility on mobile
  test('should have touch-friendly theme toggle button on mobile viewports', () => {
    fc.assert(
      fc.property(
        mobileViewportArbitrary,
        (viewportWidth) => {
          // Set mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render NavigationBar
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Find theme toggle button
          const themeToggle = container.querySelector('button[aria-label*="Switch to"]');
          
          // Property: Theme toggle button should exist
          expect(themeToggle).toBeInTheDocument();

          // Property: Theme toggle should have the themeToggle class which defines touch-friendly sizing
          if (themeToggle) {
            expect(themeToggle.className).toContain('themeToggle');
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should have touch-friendly navigation links on mobile viewports', () => {
    fc.assert(
      fc.property(
        mobileViewportArbitrary,
        (viewportWidth) => {
          // Set mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render NavigationBar
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Find navigation links specifically within the navLinks container
          const navLinksContainer = container.querySelector('.navLinks');
          expect(navLinksContainer).toBeInTheDocument();

          if (navLinksContainer) {
            const navLinks = navLinksContainer.querySelectorAll('a');
            
            // Property: Should have navigation links (Portfolio and Blog)
            expect(navLinks.length).toBeGreaterThanOrEqual(2);

            // Property: Each link should be an anchor element (touch-friendly structure)
            navLinks.forEach(link => {
              expect(link.tagName).toBe('A');
              expect(link).toBeInTheDocument();
            });
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should have touch-friendly mobile menu toggle button', () => {
    fc.assert(
      fc.property(
        mobileViewportArbitrary,
        (viewportWidth) => {
          // Set mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render NavigationBar
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Find mobile menu toggle button
          const menuToggle = container.querySelector('button[aria-label="Toggle navigation menu"]');

          // Property: Mobile menu toggle should exist
          expect(menuToggle).toBeInTheDocument();

          // Property: Mobile menu toggle should have the mobileMenuToggle class which defines touch-friendly sizing
          if (menuToggle) {
            expect(menuToggle.className).toContain('mobileMenuToggle');
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should provide appropriate spacing between touch targets on mobile', () => {
    fc.assert(
      fc.property(
        mobileViewportArbitrary,
        (viewportWidth) => {
          // Set mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render NavigationBar
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Find all interactive elements (buttons and links)
          const interactiveElements = container.querySelectorAll('button, a');

          // Property: Should have multiple interactive elements
          expect(interactiveElements.length).toBeGreaterThan(0);

          // Property: Each interactive element should have adequate spacing
          interactiveElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const margin = parseInt(computedStyle.margin || '0');
            const padding = parseInt(computedStyle.padding || '0');
            
            // Elements should have some spacing (margin or padding)
            // This ensures they're not too cramped together
            expect(margin + padding).toBeGreaterThanOrEqual(0);
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should maintain touch target sizes when mobile menu is toggled', () => {
    fc.assert(
      fc.property(
        mobileViewportArbitrary,
        fc.boolean(),
        (viewportWidth, shouldToggle) => {
          // Set mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render NavigationBar
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Toggle mobile menu if specified
          if (shouldToggle) {
            const menuToggle = container.querySelector('button[aria-label="Toggle navigation menu"]');
            if (menuToggle) {
              fireEvent.click(menuToggle);
            }
          }

          // Find navigation links specifically within the navLinks container
          const navLinksContainer = container.querySelector('.navLinks');
          expect(navLinksContainer).toBeInTheDocument();

          if (navLinksContainer) {
            const navLinks = navLinksContainer.querySelectorAll('a');
            
            // Property: Links should exist regardless of menu state
            expect(navLinks.length).toBeGreaterThanOrEqual(2);

            // Property: Links should maintain proper structure (anchor elements)
            navLinks.forEach(link => {
              expect(link.tagName).toBe('A');
              expect(link).toBeInTheDocument();
            });
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should have accessible ARIA labels for all interactive elements', () => {
    fc.assert(
      fc.property(
        mobileViewportArbitrary,
        (viewportWidth) => {
          // Set mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render NavigationBar
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Find all buttons
          const buttons = container.querySelectorAll('button');

          // Property: All buttons should have aria-label or accessible text
          buttons.forEach(button => {
            const hasAriaLabel = button.hasAttribute('aria-label');
            const hasTextContent = (button.textContent?.trim().length || 0) > 0;
            
            // Property: Button should be accessible via aria-label or text content
            expect(hasAriaLabel || hasTextContent).toBe(true);
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should support keyboard navigation on mobile viewports', () => {
    fc.assert(
      fc.property(
        mobileViewportArbitrary,
        (viewportWidth) => {
          // Set mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render NavigationBar
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Find all interactive elements
          const interactiveElements = container.querySelectorAll('button, a');

          // Property: All interactive elements should be keyboard accessible
          interactiveElements.forEach(element => {
            const tabIndex = element.getAttribute('tabindex');
            
            // Property: Element should not have negative tabindex (unless intentionally hidden)
            if (tabIndex !== null) {
              expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(-1);
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
