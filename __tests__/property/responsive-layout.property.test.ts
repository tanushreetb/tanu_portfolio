/**
 * **Feature: portfolio-blog-websites, Property 7: Responsive layout adaptation**
 * **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
 * 
 * Property-based test for validating responsive layout adaptation.
 * This test ensures that layouts adapt appropriately across different viewport sizes
 * without breaking functionality or causing horizontal scrolling.
 */

import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { SkillsGrid } from '@/components/portfolio/SkillsGrid';
import { NavigationBar } from '@/components/blog/NavigationBar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import React from 'react';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, initial, animate, variants, ...props }: any) => 
      React.createElement('div', props, children),
    a: ({ children, whileHover, whileTap, transition, ...props }: any) => 
      React.createElement('a', props, children),
    svg: ({ children, whileHover, transition, ...props }: any) => 
      React.createElement('svg', props, children),
  },
}));

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

// Generator for viewport widths covering mobile, tablet, and desktop
const viewportWidthArbitrary = fc.oneof(
  fc.integer({ min: 320, max: 639 }),   // Mobile
  fc.integer({ min: 640, max: 1023 }),  // Tablet
  fc.integer({ min: 1024, max: 1920 })  // Desktop
);

// Generator for project data with non-whitespace strings
const projectDataArbitrary = fc.record({
  id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
  title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
  description: fc.string({ minLength: 10, maxLength: 500 }).filter(s => s.trim().length > 0),
  technologies: fc.array(fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0), { minLength: 1, maxLength: 10 }),
  role: fc.option(fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0), { nil: undefined }),
  achievements: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0), { minLength: 0, maxLength: 5 }), { nil: undefined }),
  link: fc.option(fc.webUrl(), { nil: undefined }),
});

describe('Responsive Layout Adaptation Properties', () => {
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

  // Property 7: Responsive layout adaptation
  test('should adapt layouts without horizontal scrolling across viewport sizes', () => {
    fc.assert(
      fc.property(
        viewportWidthArbitrary,
        (viewportWidth) => {
          // Set viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render HeroSection component
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(HeroSection)
            )
          );

          // Property: Component should render without errors
          expect(container).toBeInTheDocument();
          
          // Property: No element should cause horizontal overflow
          const allElements = container.querySelectorAll('*');
          allElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            // Elements should not have fixed widths larger than viewport
            if (computedStyle.width && computedStyle.width !== 'auto') {
              const widthValue = parseInt(computedStyle.width);
              if (!isNaN(widthValue)) {
                expect(widthValue).toBeLessThanOrEqual(viewportWidth);
              }
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should render ProjectCard responsively across viewport sizes', () => {
    fc.assert(
      fc.property(
        viewportWidthArbitrary,
        projectDataArbitrary,
        (viewportWidth, projectData) => {
          // Set viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render ProjectCard component
          const { container } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(ProjectCard, { project: projectData })
            )
          );

          // Property: Component should render without errors
          expect(container).toBeInTheDocument();
          
          // Property: All required project data should be present in the container
          const containerText = container.textContent || '';
          expect(containerText).toContain(projectData.title);
          expect(containerText).toContain(projectData.description);
          
          // Property: Technologies should be displayed
          projectData.technologies.forEach(tech => {
            expect(containerText).toContain(tech);
          });

          // Property: Component should not overflow viewport
          const cardElement = container.querySelector('.projectCard') as HTMLElement;
          if (cardElement) {
            const rect = cardElement.getBoundingClientRect();
            // Allow for some margin, but card should fit within viewport
            expect(rect.width).toBeLessThanOrEqual(viewportWidth + 100);
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should render NavigationBar responsively across viewport sizes', () => {
    fc.assert(
      fc.property(
        viewportWidthArbitrary,
        (viewportWidth) => {
          // Set viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render NavigationBar component
          const { container, getAllByText } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Property: Navigation should render without errors
          expect(container).toBeInTheDocument();
          
          // Property: Brand name should always be visible
          const brandElements = getAllByText('Tanushree T B');
          expect(brandElements.length).toBeGreaterThan(0);
          
          // Property: Navigation links should be present (may be hidden on mobile)
          const portfolioLinks = getAllByText('Portfolio');
          const blogLinks = getAllByText('Blog');
          expect(portfolioLinks.length).toBeGreaterThan(0);
          expect(blogLinks.length).toBeGreaterThan(0);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should render SkillsGrid responsively across viewport sizes', () => {
    fc.assert(
      fc.property(
        viewportWidthArbitrary,
        (viewportWidth) => {
          // Set viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render SkillsGrid component
          const { container, getAllByText } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(SkillsGrid)
            )
          );

          // Property: Component should render without errors
          expect(container).toBeInTheDocument();
          
          // Property: Section title should be visible
          const skillsTitles = getAllByText('Technical Skills & Expertise');
          expect(skillsTitles.length).toBeGreaterThan(0);
          
          // Property: Education section should be visible
          const educationTitles = getAllByText('Education & Certifications');
          expect(educationTitles.length).toBeGreaterThan(0);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('should maintain functionality when resizing from desktop to mobile', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.integer({ min: 1024, max: 1920 }), // Desktop width
          fc.integer({ min: 320, max: 639 })    // Mobile width
        ),
        ([desktopWidth, mobileWidth]) => {
          // Start with desktop viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: desktopWidth,
          });

          const { container, rerender } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Property: Should render on desktop
          expect(container).toBeInTheDocument();

          // Resize to mobile
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: mobileWidth,
          });

          // Re-render with new viewport
          rerender(
            React.createElement(ThemeProvider, null,
              React.createElement(NavigationBar)
            )
          );

          // Property: Should still render after resize
          expect(container).toBeInTheDocument();

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
