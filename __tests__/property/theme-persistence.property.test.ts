/**
 * **Feature: portfolio-blog-websites, Property 4: Theme persistence round trip**
 * **Validates: Requirements 3.3**
 * 
 * Property-based test for validating theme persistence functionality.
 * This test ensures that theme selections persist across page navigation and browser sessions.
 */

import * as fc from 'fast-check';
import { render, act, cleanup } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import React from 'react';

// Mock localStorage for testing
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
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

// Test component that uses the theme context
function TestThemeComponent() {
  const { theme, toggleTheme } = useTheme();
  return React.createElement('div', 
    { 'data-testid': 'theme-display', 'data-theme': theme },
    React.createElement('button', 
      { 'data-testid': 'toggle-button', onClick: toggleTheme },
      'Toggle Theme'
    ),
    React.createElement('span', 
      { 'data-testid': 'current-theme' },
      theme
    )
  );
}

describe('Theme Persistence Properties', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockLocalStorage.clear();
    jest.clearAllMocks();
    
    // Mock global objects
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true,
    });
    
    // Mock matchMedia
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

  // Property 4: Theme persistence round trip
  test('should persist theme selection across component re-renders', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (initialTheme) => {
          // Set initial theme in localStorage
          mockLocalStorage.setItem('theme', initialTheme);
          
          // Render component with ThemeProvider
          const { getByTestId, rerender } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(TestThemeComponent)
            )
          );
          
          // Property: Initial theme should match what was stored
          const currentThemeElement = getByTestId('current-theme');
          expect(currentThemeElement.textContent).toBe(initialTheme);
          
          // Property: localStorage should be called to retrieve theme
          expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
          
          // Property: Document element should have correct data-theme attribute
          expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', initialTheme);
          
          // Re-render the component to simulate navigation/refresh
          rerender(
            React.createElement(ThemeProvider, null,
              React.createElement(TestThemeComponent)
            )
          );
          
          // Property: Theme should persist after re-render
          expect(getByTestId('current-theme').textContent).toBe(initialTheme);
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Theme toggle should persist the new theme
  test('should persist theme changes to localStorage', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (startingTheme) => {
          const expectedNewTheme = startingTheme === 'light' ? 'dark' : 'light';
          
          // Set initial theme
          mockLocalStorage.setItem('theme', startingTheme);
          
          const { getByTestId } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(TestThemeComponent)
            )
          );
          
          // Verify initial state
          expect(getByTestId('current-theme').textContent).toBe(startingTheme);
          
          // Toggle theme
          const toggleButton = getByTestId('toggle-button');
          act(() => {
            toggleButton.click();
          });
          
          // Property: New theme should be displayed
          expect(getByTestId('current-theme').textContent).toBe(expectedNewTheme);
          
          // Property: New theme should be saved to localStorage
          expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', expectedNewTheme);
          
          // Property: Document element should be updated with new theme
          expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', expectedNewTheme);
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Theme should fallback gracefully when localStorage is unavailable
  test('should handle localStorage errors gracefully', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (shouldThrowError) => {
          // Mock localStorage to throw error if needed
          if (shouldThrowError) {
            mockLocalStorage.getItem.mockImplementation(() => {
              throw new Error('localStorage not available');
            });
          }
          
          const { getByTestId } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(TestThemeComponent)
            )
          );
          
          // Property: Component should still render without crashing
          expect(getByTestId('current-theme')).toBeInTheDocument();
          
          // Property: Should fallback to light theme when localStorage fails
          if (shouldThrowError) {
            expect(getByTestId('current-theme').textContent).toBe('light');
          }
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Theme should respect system preference when no saved theme exists
  test('should use system preference when no saved theme exists', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (prefersDark) => {
          // Clear localStorage
          mockLocalStorage.clear();
          
          // Mock system preference
          window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }));
          
          const { getByTestId } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(TestThemeComponent)
            )
          );
          
          // Property: Should use system preference when no saved theme
          const expectedTheme = prefersDark ? 'dark' : 'light';
          expect(getByTestId('current-theme').textContent).toBe(expectedTheme);
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Invalid theme values should be ignored
  test('should ignore invalid theme values from localStorage', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => s !== 'light' && s !== 'dark'),
        (invalidTheme) => {
          // Set invalid theme in localStorage
          mockLocalStorage.setItem('theme', invalidTheme);
          
          const { getByTestId } = render(
            React.createElement(ThemeProvider, null,
              React.createElement(TestThemeComponent)
            )
          );
          
          // Property: Should fallback to system preference or light theme
          const currentTheme = getByTestId('current-theme').textContent;
          expect(['light', 'dark']).toContain(currentTheme);
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});