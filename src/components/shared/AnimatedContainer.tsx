/**
 * AnimatedContainer Component Module
 * 
 * This module provides a reusable animated container component that wraps content
 * with entrance animations. It's designed to be flexible, accessible, and performant.
 * 
 * Key features:
 * - Multiple animation types (fade, slideUp, slideLeft, slideRight, scale)
 * - Viewport-based animation triggering (animates when scrolled into view)
 * - Customizable timing (duration and delay)
 * - Accessibility-first approach (respects prefers-reduced-motion)
 * - Smooth 60fps animations using Framer Motion
 * 
 * @module AnimatedContainer
 */

'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { prefersReducedMotion } from '@/utils/animations';

/**
 * AnimatedContainer Component
 * 
 * A wrapper component that provides entrance animations for its children.
 * Supports multiple animation types and respects user accessibility preferences.
 * 
 * Animation approach:
 * - Uses Framer Motion for smooth, performant animations
 * - Triggers animations when element enters viewport (whileInView)
 * - Provides 5 distinct animation types for visual variety
 * - Falls back to static rendering if user prefers reduced motion
 * 
 * Accessibility features:
 * - Respects prefers-reduced-motion system setting
 * - Provides instant rendering for users with motion sensitivity
 * - Maintains full functionality without animations
 * 
 * Performance considerations:
 * - Uses CSS transforms (translateX, translateY, scale) for GPU acceleration
 * - Animates opacity for smooth fading
 * - Viewport intersection observer for efficient triggering
 * - Optional "once" prop to prevent re-animation on scroll
 * 
 * @component
 * @param {AnimatedContainerProps} props - Component props
 * @returns {JSX.Element} Animated wrapper around children
 * 
 * @example
 * ```tsx
 * <AnimatedContainer animationType="slideUp" delay={0.2}>
 *   <h1>This heading will slide up when scrolled into view</h1>
 * </AnimatedContainer>
 * ```
 */

/**
 * AnimatedContainer Props Interface
 * 
 * Defines all configurable options for the AnimatedContainer component.
 * All props are optional except children, providing sensible defaults.
 * 
 * @interface AnimatedContainerProps
 */
interface AnimatedContainerProps {
  /** Content to be wrapped and animated */
  children: React.ReactNode;
  
  /** 
   * Animation type to apply on entrance
   * 
   * Available types:
   * - fade: Simple opacity transition (0 to 1)
   * - slideUp: Vertical slide from below with fade (y: 30px to 0)
   * - slideLeft: Horizontal slide from right with fade (x: 30px to 0)
   * - slideRight: Horizontal slide from left with fade (x: -30px to 0)
   * - scale: Zoom-in effect with fade (scale: 0.9 to 1.0)
   * 
   * @default 'fade'
   */
  animationType?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  
  /** 
   * Delay before animation starts (in seconds)
   * 
   * Useful for creating staggered animations when multiple
   * AnimatedContainers are used in sequence.
   * 
   * @default 0
   */
  delay?: number;
  
  /** 
   * Duration of the animation (in seconds)
   * 
   * Controls how long the animation takes to complete.
   * Shorter durations feel snappier, longer feel more dramatic.
   * 
   * @default 0.5
   */
  duration?: number;
  
  /** 
   * Custom className for styling
   * 
   * Applied to the wrapper div/motion.div element.
   * Useful for layout positioning and spacing.
   * 
   * @default ''
   */
  className?: string;
  
  /** 
   * Whether to animate only once or every time component enters viewport
   * 
   * - true: Animates once when first scrolled into view, then stays visible
   * - false: Re-animates every time element enters viewport
   * 
   * @default true
   */
  once?: boolean;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animationType = 'fade',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
}) => {
  /**
   * Check if user prefers reduced motion for accessibility
   * 
   * This respects the user's system-level accessibility setting.
   * If enabled, we skip all animations and render static content.
   */
  const shouldReduceMotion = prefersReducedMotion();

  /**
   * Animation variants for different animation types
   * 
   * Each variant defines two states:
   * - hidden: Initial state before animation (element enters viewport)
   * - visible: Final state after animation completes
   * 
   * All animations use the same easing curve: cubic-bezier(0.4, 0, 0.2, 1)
   * This is an ease-out curve that starts fast and decelerates smoothly.
   * 
   * Animation details:
   * - fade: Simple opacity transition (0 → 1)
   * - slideUp: Vertical movement (y: 30px → 0) with fade
   * - slideLeft: Horizontal movement from right (x: 30px → 0) with fade
   * - slideRight: Horizontal movement from left (x: -30px → 0) with fade
   * - scale: Zoom effect (scale: 0.9 → 1.0) with fade
   */
  const variants: Record<string, Variants> = {
    fade: {
      hidden: { opacity: 0 }, // Start invisible
      visible: { 
        opacity: 1, // Fade to fully visible
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] }
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 30 }, // Start invisible and 30px below
      visible: { 
        opacity: 1, // Fade to fully visible
        y: 0, // Slide to final position
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 30 }, // Start invisible and 30px to the right
      visible: { 
        opacity: 1, // Fade to fully visible
        x: 0, // Slide to final position
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: -30 }, // Start invisible and 30px to the left
      visible: { 
        opacity: 1, // Fade to fully visible
        x: 0, // Slide to final position
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 }, // Start invisible and at 90% size
      visible: { 
        opacity: 1, // Fade to fully visible
        scale: 1, // Scale to full size (100%)
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] }
      }
    }
  };

  /**
   * Accessibility fallback: Skip animations if user prefers reduced motion
   * 
   * When shouldReduceMotion is true, we render a plain div instead of
   * motion.div. This ensures users with motion sensitivity or vestibular
   * disorders can use the site comfortably without animations.
   */
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  /**
   * Render animated container using Framer Motion
   * 
   * Configuration:
   * - initial="hidden": Start in hidden state (defined in variants)
   * - whileInView="visible": Animate to visible when element enters viewport
   * - viewport.once: Control whether to re-animate on subsequent viewport entries
   * - viewport.margin: Start animation 50px before element enters viewport
   * - variants: Use the animation variant matching the animationType prop
   * 
   * The viewport intersection observer efficiently triggers animations only
   * when the element is about to become visible, improving performance.
   */
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once, // Animate once or every time element enters viewport
        margin: '-50px' // Trigger animation 50px before element is visible
      }}
      variants={variants[animationType]}
    >
      {children}
    </motion.div>
  );
};
