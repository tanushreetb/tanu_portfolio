/**
 * Animation Utilities Module
 * 
 * This module provides centralized animation configurations and utilities for the portfolio
 * and blog websites. It includes Framer Motion variants and accessibility-aware animation
 * helpers that respect user preferences for reduced motion.
 * 
 * @module animations
 */

import { AnimationConfig } from '@/types';

/**
 * Default animation configurations used throughout the application.
 * 
 * These configurations provide consistent timing and easing functions for all animations.
 * The easing function 'cubic-bezier(0.4, 0, 0.2, 1)' creates a smooth, natural motion
 * that accelerates quickly and decelerates slowly (ease-out curve).
 * 
 * Animation types:
 * - fadeIn: Simple opacity transition for subtle entrances (300ms)
 * - slideUp: Vertical slide with fade for content reveals (400ms)
 * - scaleIn: Scale transformation for emphasis and attention (200ms)
 * - slideInLeft: Horizontal slide from right for directional flow (500ms)
 * - slideInRight: Horizontal slide from left for directional flow (500ms)
 */
export const defaultAnimations: Record<string, AnimationConfig> = {
  fadeIn: {
    duration: 0.3, // 300ms - Quick fade for subtle transitions
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Ease-out curve for natural deceleration
  },
  slideUp: {
    duration: 0.4, // 400ms - Slightly longer for noticeable movement
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  scaleIn: {
    duration: 0.2, // 200ms - Fast scale for immediate feedback
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  slideInLeft: {
    duration: 0.5, // 500ms - Longer duration for horizontal travel
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  slideInRight: {
    duration: 0.5, // 500ms - Matches slideInLeft for consistency
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * Framer Motion variant for fade-in animations.
 * 
 * Creates a simple opacity transition from invisible (0) to fully visible (1).
 * Used for subtle content reveals that don't require spatial movement.
 * 
 * States:
 * - hidden: Element is invisible (opacity: 0)
 * - visible: Element fades in smoothly using fadeIn animation config
 */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: defaultAnimations.fadeIn
  }
};

/**
 * Framer Motion variant for slide-up animations.
 * 
 * Combines vertical movement with opacity change for dynamic content entrances.
 * Elements start 20px below their final position and fade in as they slide up.
 * Commonly used for card reveals and section transitions.
 * 
 * States:
 * - hidden: Element is invisible and positioned 20px below (opacity: 0, y: 20)
 * - visible: Element slides up to position and fades in (opacity: 1, y: 0)
 */
export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 }, // Start 20px below final position
  visible: { 
    opacity: 1, 
    y: 0, // Move to final position
    transition: defaultAnimations.slideUp
  }
};

/**
 * Framer Motion variant for scale-in animations.
 * 
 * Creates a zoom-in effect by scaling from 95% to 100% while fading in.
 * The subtle scale change (0.95 to 1.0) provides emphasis without being jarring.
 * Ideal for interactive elements like buttons and cards on hover or focus.
 * 
 * States:
 * - hidden: Element is slightly smaller and invisible (opacity: 0, scale: 0.95)
 * - visible: Element scales to full size and fades in (opacity: 1, scale: 1)
 */
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 }, // Start at 95% size
  visible: { 
    opacity: 1, 
    scale: 1, // Scale to full size (100%)
    transition: defaultAnimations.scaleIn
  }
};

/**
 * Framer Motion variant for staggered children animations.
 * 
 * Creates a cascading effect where child elements animate sequentially rather than
 * simultaneously. Each child's animation starts 100ms (0.1s) after the previous one,
 * creating a smooth, flowing reveal pattern.
 * 
 * Usage: Apply to parent container, and children will animate with stagger delay.
 * 
 * States:
 * - hidden: No specific properties (children define their own hidden state)
 * - visible: Triggers children animations with 100ms stagger between each
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1 // 100ms delay between each child animation
    }
  }
};

/**
 * Checks if the user has enabled reduced motion preferences.
 * 
 * This function respects the user's system-level accessibility setting for reduced motion
 * (prefers-reduced-motion: reduce). When enabled, animations should be minimized or disabled
 * to prevent motion sickness and improve accessibility for users with vestibular disorders.
 * 
 * Implementation approach:
 * 1. Check if running in browser environment (window is defined)
 * 2. Query the media query for reduced motion preference
 * 3. Return true if user prefers reduced motion, false otherwise
 * 
 * @returns {boolean} True if user prefers reduced motion, false otherwise
 * 
 * @example
 * ```typescript
 * if (prefersReducedMotion()) {
 *   // Skip animations or use instant transitions
 *   return <div>{content}</div>;
 * } else {
 *   // Use full animations
 *   return <motion.div animate={...}>{content}</motion.div>;
 * }
 * ```
 */
export const prefersReducedMotion = (): boolean => {
  // Server-side rendering check: window is undefined on server
  if (typeof window === 'undefined') return false;
  
  // Query the user's motion preference via CSS media query
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};