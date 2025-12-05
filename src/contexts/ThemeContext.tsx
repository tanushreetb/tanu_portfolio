/**
 * Theme Context Module
 * 
 * This module provides theme management functionality for the blog website, enabling
 * users to switch between light and dark visual modes. The theme preference is persisted
 * across sessions using localStorage and respects system preferences as a fallback.
 * 
 * Key features:
 * - Light/dark theme toggle with smooth transitions
 * - Persistent theme storage using localStorage
 * - System preference detection as fallback
 * - Comprehensive error handling for storage failures
 * - Automatic DOM attribute updates for CSS theme variables
 * 
 * @module ThemeContext
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType } from '@/types';

/**
 * React Context for theme state management.
 * 
 * Provides theme value ('light' | 'dark') and toggleTheme function to all child components.
 * Initialized as undefined to enforce usage within ThemeProvider.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Component
 * 
 * Wraps the application to provide theme context to all child components.
 * Manages theme state, persistence, and synchronization with DOM attributes.
 * 
 * Implementation approach:
 * 1. Initialize theme state with 'light' as default
 * 2. On mount, check localStorage for saved theme preference
 * 3. If no saved theme, detect system preference via media query
 * 4. Apply theme to DOM via data-theme attribute for CSS variables
 * 5. Provide toggleTheme function to switch between modes
 * 
 * Error handling:
 * - Gracefully handles localStorage unavailability (private browsing, disabled storage)
 * - Validates stored theme values to prevent corruption
 * - Falls back to system preference or default light theme on errors
 * - Logs warnings for debugging without breaking functionality
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with theme context
 * @returns {JSX.Element} ThemeContext.Provider wrapping children
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme state: 'light' or 'dark', defaults to 'light'
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  /**
   * Effect: Initialize theme on component mount
   * 
   * This effect runs once when the ThemeProvider mounts and establishes the initial theme.
   * It follows a priority order: saved preference > system preference > default light.
   * 
   * Initialization steps:
   * 1. Check if localStorage is available (may be blocked in private browsing)
   * 2. Attempt to read saved theme from localStorage with validation
   * 3. If no saved theme, detect system color scheme preference
   * 4. Apply the determined theme to both React state and DOM
   * 5. Handle all potential errors gracefully without breaking the app
   * 
   * Error scenarios handled:
   * - localStorage unavailable: Skip to system preference
   * - localStorage read error: Log warning and skip to system preference
   * - Invalid stored value: Ignore and use system preference
   * - matchMedia unavailable: Default to light theme
   * - DOM manipulation error: Log warning but continue with state update
   */
  useEffect(() => {
    try {
      // Step 1: Check if localStorage API is available in this environment
      // typeof Storage checks for Storage API support
      // window.localStorage checks if it's actually accessible (not blocked)
      const isLocalStorageAvailable = typeof Storage !== 'undefined' && window.localStorage;
      
      let savedTheme: 'light' | 'dark' | null = null;
      
      // Step 2: Attempt to retrieve saved theme preference from localStorage
      if (isLocalStorageAvailable) {
        try {
          const storedTheme = localStorage.getItem('theme');
          // Validate that stored value is one of our expected theme values
          // This prevents corruption from manual localStorage manipulation
          if (storedTheme === 'light' || storedTheme === 'dark') {
            savedTheme = storedTheme;
          }
        } catch (error) {
          // localStorage.getItem can throw in some browsers/modes
          console.warn('Failed to read theme from localStorage:', error);
        }
      }
      
      // Step 3: Fallback to system preference if no saved theme exists
      // Uses CSS media query to detect user's OS-level color scheme preference
      let systemTheme: 'light' | 'dark' = 'light';
      try {
        if (window.matchMedia) {
          // Query prefers-color-scheme media feature
          // Returns true if user prefers dark mode at OS level
          systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
      } catch (error) {
        // matchMedia might not be available in some environments
        console.warn('Failed to detect system theme preference:', error);
      }
      
      // Step 4: Determine final theme (saved preference takes priority over system)
      const initialTheme = savedTheme || systemTheme;
      
      // Update React state with determined theme
      setTheme(initialTheme);
      
      // Step 5: Apply theme to DOM for CSS custom properties
      // The data-theme attribute is used by CSS to switch color variables
      try {
        if (document.documentElement) {
          document.documentElement.setAttribute('data-theme', initialTheme);
        }
      } catch (error) {
        // DOM manipulation might fail in some edge cases
        console.warn('Failed to set theme attribute:', error);
      }
    } catch (error) {
      // Catch-all for any unexpected errors during initialization
      // Ensures app continues to function with default theme
      console.error('Theme initialization failed, using default light theme:', error);
      setTheme('light');
    }
  }, []); // Empty dependency array: run only once on mount

  /**
   * Toggle theme between light and dark modes
   * 
   * This function switches the current theme to its opposite value and persists
   * the change to both localStorage and the DOM. It's designed to be called from
   * theme toggle buttons throughout the application.
   * 
   * Implementation approach:
   * 1. Calculate new theme (opposite of current)
   * 2. Update React state immediately for UI responsiveness
   * 3. Persist new theme to localStorage for future sessions
   * 4. Update DOM data-theme attribute for CSS variable switching
   * 5. Handle errors at each step without breaking functionality
   * 
   * Error handling:
   * - localStorage write failure: Theme still works for current session
   * - DOM update failure: CSS might not update but state is correct
   * - Complete failure: Logs error and maintains current theme
   * 
   * The function uses nested try-catch blocks to isolate failures and ensure
   * that one failure doesn't prevent other operations from completing.
   */
  const toggleTheme = () => {
    try {
      // Calculate opposite theme: light -> dark, dark -> light
      const newTheme = theme === 'light' ? 'dark' : 'light';
      
      // Update React state immediately for responsive UI
      setTheme(newTheme);
      
      // Persist theme preference to localStorage for future sessions
      try {
        // Check localStorage availability before attempting write
        if (typeof Storage !== 'undefined' && window.localStorage) {
          localStorage.setItem('theme', newTheme);
        }
      } catch (error) {
        // localStorage.setItem can fail due to quota, permissions, or private mode
        // Theme still works for current session even if persistence fails
        console.warn('Failed to save theme to localStorage:', error);
      }
      
      // Update DOM attribute to trigger CSS custom property changes
      try {
        if (document.documentElement) {
          // Set data-theme attribute which CSS uses to switch color variables
          document.documentElement.setAttribute('data-theme', newTheme);
        }
      } catch (error) {
        // DOM manipulation might fail in restricted environments
        console.warn('Failed to update theme attribute:', error);
      }
    } catch (error) {
      // Catch-all for unexpected errors during theme toggle
      // Prevents theme toggle button from breaking the entire app
      console.error('Theme toggle failed:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme context
 * 
 * This hook provides access to the current theme and toggleTheme function.
 * It must be used within a component that's wrapped by ThemeProvider.
 * 
 * Implementation approach:
 * 1. Access ThemeContext using React's useContext hook
 * 2. Validate that context is defined (component is within ThemeProvider)
 * 3. Throw descriptive error if used outside ThemeProvider
 * 4. Return context value for use in component
 * 
 * @returns {ThemeContextType} Object containing theme and toggleTheme function
 * @throws {Error} If used outside of ThemeProvider
 * 
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme() {
  // Access the theme context
  const context = useContext(ThemeContext);
  
  // Validate that hook is used within ThemeProvider
  // context will be undefined if used outside provider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Return theme state and toggle function
  return context;
}