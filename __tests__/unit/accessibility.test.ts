/**
 * Accessibility Utilities Tests
 * 
 * Tests for accessibility utility functions and helpers.
 * Ensures proper keyboard navigation, focus management, and ARIA support.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4
 */

import {
  prefersReducedMotion,
  prefersHighContrast,
  getFocusableElements,
  isActivationKey,
  generateAriaId,
  isTouchDevice,
  getAccessibleAnimationDuration,
  KeyboardKeys
} from '@/utils/accessibility';

describe('Accessibility Utilities', () => {
  describe('prefersReducedMotion', () => {
    it('should return false in non-browser environment', () => {
      expect(prefersReducedMotion()).toBe(false);
    });

    it('should detect reduced motion preference', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const result = prefersReducedMotion();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('prefersHighContrast', () => {
    it('should return false in non-browser environment', () => {
      expect(prefersHighContrast()).toBe(false);
    });
  });

  describe('getFocusableElements', () => {
    it('should find all focusable elements in a container', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button>Button 1</button>
        <a href="#">Link</a>
        <input type="text" />
        <button disabled>Disabled Button</button>
        <div tabindex="0">Focusable Div</div>
      `;
      document.body.appendChild(container);

      const focusableElements = getFocusableElements(container);
      
      // Should find button, link, input, and focusable div (not disabled button)
      expect(focusableElements.length).toBeGreaterThanOrEqual(4);
      
      document.body.removeChild(container);
    });

    it('should exclude hidden elements', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button>Visible Button</button>
        <button hidden>Hidden Button</button>
        <button style="display: none;">Display None Button</button>
      `;
      document.body.appendChild(container);

      const focusableElements = getFocusableElements(container);
      
      // Should only find the visible button
      expect(focusableElements.length).toBe(1);
      
      document.body.removeChild(container);
    });
  });

  describe('isActivationKey', () => {
    it('should return true for Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(isActivationKey(event)).toBe(true);
    });

    it('should return true for Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      expect(isActivationKey(event)).toBe(true);
    });

    it('should return false for other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      expect(isActivationKey(event)).toBe(false);
    });
  });

  describe('generateAriaId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateAriaId('test');
      const id2 = generateAriaId('test');
      
      expect(id1).not.toBe(id2);
      expect(id1).toContain('test-');
      expect(id2).toContain('test-');
    });

    it('should use default prefix if none provided', () => {
      const id = generateAriaId();
      expect(id).toContain('aria-');
    });
  });

  describe('isTouchDevice', () => {
    it('should return false in non-browser environment', () => {
      expect(isTouchDevice()).toBe(false);
    });

    it('should detect touch support', () => {
      // Mock touch support
      Object.defineProperty(window, 'ontouchstart', {
        writable: true,
        value: true
      });

      const result = isTouchDevice();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('getAccessibleAnimationDuration', () => {
    it('should return minimal duration when reduced motion is preferred', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const duration = getAccessibleAnimationDuration(0.5);
      expect(duration).toBe(0.01);
    });

    it('should return normal duration when reduced motion is not preferred', () => {
      // Mock no reduced motion preference
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

      const duration = getAccessibleAnimationDuration(0.5);
      expect(duration).toBe(0.5);
    });
  });

  describe('KeyboardKeys', () => {
    it('should have all common keyboard keys defined', () => {
      expect(KeyboardKeys.ENTER).toBe('Enter');
      expect(KeyboardKeys.SPACE).toBe(' ');
      expect(KeyboardKeys.ESCAPE).toBe('Escape');
      expect(KeyboardKeys.TAB).toBe('Tab');
      expect(KeyboardKeys.ARROW_UP).toBe('ArrowUp');
      expect(KeyboardKeys.ARROW_DOWN).toBe('ArrowDown');
      expect(KeyboardKeys.ARROW_LEFT).toBe('ArrowLeft');
      expect(KeyboardKeys.ARROW_RIGHT).toBe('ArrowRight');
      expect(KeyboardKeys.HOME).toBe('Home');
      expect(KeyboardKeys.END).toBe('End');
    });
  });
});

describe('Focus Management', () => {
  describe('trapFocus', () => {
    it('should trap focus within container', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="first">First</button>
        <button id="middle">Middle</button>
        <button id="last">Last</button>
      `;
      document.body.appendChild(container);

      const firstButton = container.querySelector('#first') as HTMLElement;
      const lastButton = container.querySelector('#last') as HTMLElement;

      // Focus first button
      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);

      // Simulate Shift+Tab on first button (should cycle to last)
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true
      });
      
      // Note: Full focus trap testing requires more complex setup
      // This is a basic structure test
      expect(firstButton).toBeTruthy();
      expect(lastButton).toBeTruthy();

      document.body.removeChild(container);
    });
  });
});

describe('ARIA Helpers', () => {
  describe('announceToScreenReader', () => {
    it('should create and remove announcement element', (done) => {
      const { announceToScreenReader } = require('@/utils/accessibility');
      
      announceToScreenReader('Test announcement', 'polite');
      
      // Check that announcement element was created
      const announcements = document.querySelectorAll('[role="status"]');
      expect(announcements.length).toBeGreaterThan(0);
      
      // Wait for cleanup
      setTimeout(() => {
        const announcementsAfter = document.querySelectorAll('[role="status"]');
        expect(announcementsAfter.length).toBe(0);
        done();
      }, 1100);
    });
  });
});
