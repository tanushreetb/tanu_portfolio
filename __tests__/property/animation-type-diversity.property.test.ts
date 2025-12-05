/**
 * **Feature: portfolio-blog-websites, Property 6: Animation type diversity**
 * **Validates: Requirements 4.4**
 * 
 * Property-based test for validating animation type diversity.
 * This test ensures that the animation system utilizes at least three distinct 
 * animation types (fade, slide, transform) across the user experience.
 */

import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';
import { defaultAnimations } from '@/utils/animations';
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

describe('Animation Type Diversity Properties', () => {
  beforeEach(() => {
    // Mock matchMedia to not prefer reduced motion (enable animations)
    mockMatchMedia(false);
  });

  // Property 6: Animation type diversity - Multiple animation types exist
  test('should have at least three distinct animation types defined', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          // Property: defaultAnimations should contain multiple animation types
          const animationTypes = Object.keys(defaultAnimations);
          
          // Property: Should have at least 3 distinct animation types
          expect(animationTypes.length).toBeGreaterThanOrEqual(3);
          
          // Property: Each animation should have required properties
          animationTypes.forEach(type => {
            expect(defaultAnimations[type]).toHaveProperty('duration');
            expect(defaultAnimations[type]).toHaveProperty('easing');
            expect(typeof defaultAnimations[type].duration).toBe('number');
            expect(typeof defaultAnimations[type].easing).toBe('string');
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: AnimatedContainer should support multiple animation types
  test('should support fade, slide, and scale animation types', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('fade', 'slideUp', 'slideLeft', 'slideRight', 'scale'),
        (animationType: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale') => {
          // Property: Component should render without errors for each animation type
          const { container } = render(
            React.createElement(
              AnimatedContainer,
              { animationType },
              React.createElement('div', { 'data-testid': 'test-content' }, 'Test Content')
            )
          );
          
          // Property: Content should be rendered
          expect(container.querySelector('[data-testid="test-content"]')).toBeInTheDocument();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Different animation types should have distinct characteristics
  test('should have distinct animation configurations for different types', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const animationTypes = Object.keys(defaultAnimations);
          
          // Property: Should have fade animation
          expect(animationTypes).toContain('fadeIn');
          
          // Property: Should have slide animations
          const hasSlideAnimation = animationTypes.some(type => type.includes('slide'));
          expect(hasSlideAnimation).toBe(true);
          
          // Property: Should have scale animation
          expect(animationTypes).toContain('scaleIn');
          
          // Property: At least 3 distinct animation categories
          const categories = new Set<string>();
          animationTypes.forEach(type => {
            if (type.includes('fade')) categories.add('fade');
            if (type.includes('slide')) categories.add('slide');
            if (type.includes('scale')) categories.add('scale');
          });
          
          expect(categories.size).toBeGreaterThanOrEqual(3);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Animation durations should be reasonable
  test('should have reasonable animation durations for all types', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const animationTypes = Object.keys(defaultAnimations);
          
          animationTypes.forEach(type => {
            const duration = defaultAnimations[type].duration;
            
            // Property: Duration should be positive
            expect(duration).toBeGreaterThan(0);
            
            // Property: Duration should be reasonable (not too fast or too slow)
            expect(duration).toBeGreaterThanOrEqual(0.1);
            expect(duration).toBeLessThanOrEqual(2.0);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Animation easing functions should be valid
  test('should have valid easing functions for all animation types', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const animationTypes = Object.keys(defaultAnimations);
          
          animationTypes.forEach(type => {
            const easing = defaultAnimations[type].easing;
            
            // Property: Easing should be a non-empty string
            expect(typeof easing).toBe('string');
            expect(easing.length).toBeGreaterThan(0);
            
            // Property: Easing should be a valid CSS easing function
            const validEasingPatterns = [
              /^ease/,
              /^linear/,
              /^cubic-bezier/,
              /^steps/
            ];
            
            const isValidEasing = validEasingPatterns.some(pattern => pattern.test(easing));
            expect(isValidEasing).toBe(true);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: AnimatedContainer should accept custom durations
  test('should support custom animation durations', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.1, max: 2.0, noNaN: true }),
        fc.constantFrom('fade', 'slideUp', 'scale'),
        (duration: number, animationType: 'fade' | 'slideUp' | 'scale') => {
          // Property: Component should render with custom duration
          const { container } = render(
            React.createElement(
              AnimatedContainer,
              { animationType, duration },
              React.createElement('div', { 'data-testid': 'test-content' }, 'Test Content')
            )
          );
          
          // Property: Content should be rendered
          expect(container.querySelector('[data-testid="test-content"]')).toBeInTheDocument();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: AnimatedContainer should accept custom delays
  test('should support custom animation delays', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0, max: 1.0, noNaN: true }),
        fc.constantFrom('fade', 'slideUp', 'scale'),
        (delay: number, animationType: 'fade' | 'slideUp' | 'scale') => {
          // Property: Component should render with custom delay
          const { container } = render(
            React.createElement(
              AnimatedContainer,
              { animationType, delay },
              React.createElement('div', { 'data-testid': 'test-content' }, 'Test Content')
            )
          );
          
          // Property: Content should be rendered
          expect(container.querySelector('[data-testid="test-content"]')).toBeInTheDocument();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Animation system should work with reduced motion preference
  test('should respect reduced motion preference while maintaining diversity', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('fade', 'slideUp', 'slideLeft', 'slideRight', 'scale'),
        (animationType: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale') => {
          // Enable reduced motion
          mockMatchMedia(true);
          
          // Property: Component should still render with reduced motion
          const { container } = render(
            React.createElement(
              AnimatedContainer,
              { animationType },
              React.createElement('div', { 'data-testid': 'test-content' }, 'Test Content')
            )
          );
          
          // Property: Content should be rendered
          expect(container.querySelector('[data-testid="test-content"]')).toBeInTheDocument();
          
          // Reset to normal motion
          mockMatchMedia(false);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Multiple AnimatedContainers with different types should coexist
  test('should support multiple animation types simultaneously', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          // Property: Multiple containers with different animation types should render
          const { container } = render(
            React.createElement(
              'div',
              null,
              React.createElement(
                AnimatedContainer,
                { animationType: 'fade' },
                React.createElement('div', { 'data-testid': 'fade-content' }, 'Fade')
              ),
              React.createElement(
                AnimatedContainer,
                { animationType: 'slideUp' },
                React.createElement('div', { 'data-testid': 'slide-content' }, 'Slide')
              ),
              React.createElement(
                AnimatedContainer,
                { animationType: 'scale' },
                React.createElement('div', { 'data-testid': 'scale-content' }, 'Scale')
              )
            )
          );
          
          // Property: All three animation types should be present
          expect(container.querySelector('[data-testid="fade-content"]')).toBeInTheDocument();
          expect(container.querySelector('[data-testid="slide-content"]')).toBeInTheDocument();
          expect(container.querySelector('[data-testid="scale-content"]')).toBeInTheDocument();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Animation system should have consistent API across types
  test('should have consistent configuration structure across all animation types', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const animationTypes = Object.keys(defaultAnimations);
          
          // Property: All animations should have the same configuration structure
          const requiredKeys = ['duration', 'easing'];
          
          animationTypes.forEach(type => {
            const config = defaultAnimations[type];
            
            // Property: Each animation should have all required keys
            requiredKeys.forEach(key => {
              expect(config).toHaveProperty(key);
            });
            
            // Property: Optional delay should be a number if present
            if ('delay' in config) {
              expect(typeof config.delay).toBe('number');
            }
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
