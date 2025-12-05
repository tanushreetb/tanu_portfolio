/**
 * Animation Variants Library
 * 
 * Centralized Framer Motion animation variants for consistent animations
 * throughout the portfolio. These variants follow the design system and
 * ensure smooth, performant animations with GPU acceleration.
 * 
 * All animations use transform and opacity for optimal performance (60fps).
 * 
 * Requirements: 2.1, 2.3, 6.1, 8.2, 8.5
 */

import { Variants, Transition } from 'framer-motion';

/**
 * Performance-optimized transition settings
 * Uses GPU-accelerated properties only (transform, opacity)
 */
const performantTransition: Transition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth easing
};

/**
 * Basic fade in animation
 * Used for subtle content reveals without spatial movement
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Slide up animation with fade
 * Elements start below their final position and fade in as they slide up
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Slide down animation with fade
 * Elements start above their final position and fade in as they slide down
 */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Slide in from left
 * Used for side panel entrances or horizontal reveals
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Slide in from right
 * Used for side panel entrances or horizontal reveals
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Scale in animation
 * Creates a zoom-in effect, ideal for modals and emphasis
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Scale out animation
 * Creates a zoom-out effect for exits
 */
export const scaleOut: Variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Stagger container
 * Parent container that staggers the animation of its children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

/**
 * Stagger item
 * Child elements that animate in sequence within a stagger container
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Fast stagger container
 * Faster stagger timing for smaller elements like tags or icons
 */
export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0
    }
  }
};

/**
 * Character reveal animation
 * For kinetic typography effects, animates each character individually
 */
export const characterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  })
};

/**
 * Word reveal animation
 * Animates words sequentially for dramatic text reveals
 */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  })
};

/**
 * Modal backdrop animation
 * Fade in/out for modal overlays
 */
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

/**
 * Modal content animation
 * Slide up with fade for modal content
 */
export const modalContent: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

/**
 * Card hover animation
 * Lift effect for interactive cards
 */
export const cardHover: Variants = {
  rest: { 
    scale: 1,
    y: 0,
    transition: { duration: 0.2 }
  },
  hover: { 
    scale: 1.02,
    y: -8,
    transition: { duration: 0.2 }
  }
};

/**
 * Button hover animation
 * Scale and glow effect for buttons
 */
export const buttonHover: Variants = {
  rest: { 
    scale: 1,
    transition: { duration: 0.2 }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

/**
 * Image zoom animation
 * Subtle zoom effect for images on hover
 */
export const imageZoom: Variants = {
  rest: { 
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.3 }
  }
};

/**
 * Rotate in animation
 * Adds rotation to entrance for playful effects
 */
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Flip animation
 * 3D flip effect for card reveals
 */
export const flip: Variants = {
  front: { 
    rotateY: 0,
    transition: { duration: 0.6 }
  },
  back: { 
    rotateY: 180,
    transition: { duration: 0.6 }
  }
};

/**
 * Progress ring animation
 * For circular progress indicators
 */
export const progressRing = (percentage: number): Variants => ({
  hidden: { 
    pathLength: 0,
    opacity: 0
  },
  visible: { 
    pathLength: percentage / 100,
    opacity: 1,
    transition: { 
      pathLength: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.3 }
    }
  }
});

/**
 * Navigation slide animation
 * For sticky navigation show/hide
 */
export const navSlide: Variants = {
  visible: { 
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  hidden: { 
    y: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Drawer animation
 * For mobile menu slide-in from side
 */
export const drawer: Variants = {
  closed: { 
    x: '100%',
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  open: { 
    x: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
};

/**
 * Reduced motion variants
 * Simplified animations for users with motion sensitivity
 */
export const reducedMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.01 }
  }
};
