/**
 * ParallaxSection Component
 * 
 * Wrapper component that adds parallax scroll effects to sections.
 * Creates depth perception by moving elements at different speeds
 * relative to the scroll position.
 * 
 * Requirements: 2.1, 2.2, 2.6
 */

'use client';

import { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeIn, slideUp } from '@/components/animations/animationVariants';

export type ParallaxSpeed = 'slow' | 'medium' | 'fast';
export type ParallaxDirection = 'up' | 'down';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: ParallaxSpeed | number;
  direction?: ParallaxDirection;
  className?: string;
  enableParallax?: boolean;
  animateOnScroll?: boolean;
  id?: string;
}

/**
 * Convert speed preset to numeric value
 */
const getSpeedValue = (speed: ParallaxSpeed | number): number => {
  if (typeof speed === 'number') return speed;
  
  switch (speed) {
    case 'slow':
      return 0.2;
    case 'medium':
      return 0.5;
    case 'fast':
      return 0.8;
    default:
      return 0.5;
  }
};

/**
 * ParallaxSection - Wrapper component for parallax scroll effects
 * 
 * @param children - Content to be wrapped with parallax effect
 * @param speed - Speed of parallax movement (slow, medium, fast, or custom number)
 * @param direction - Direction of parallax movement (up or down)
 * @param className - Additional CSS classes
 * @param enableParallax - Toggle parallax effect on/off
 * @param animateOnScroll - Whether to animate content on scroll into view
 * @param id - Section ID for navigation
 */
export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 'medium',
  direction = 'up',
  className = '',
  enableParallax = true,
  animateOnScroll = true,
  id
}) => {
  const speedValue = getSpeedValue(speed);
  const offset = useParallax({ speed: speedValue, direction });
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const parallaxStyle: CSSProperties = enableParallax
    ? { transform: `translateY(${offset}px)` }
    : {};

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${className}`}
    >
      <motion.div
        style={parallaxStyle}
        initial={animateOnScroll ? "hidden" : "visible"}
        animate={animateOnScroll && isVisible ? "visible" : animateOnScroll ? "hidden" : "visible"}
        variants={slideUp}
      >
        {children}
      </motion.div>
    </section>
  );
};

/**
 * ParallaxLayer - Individual layer within a parallax section
 * 
 * Use multiple layers with different speeds to create depth
 */
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: ParallaxDirection;
  className?: string;
  zIndex?: number;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  zIndex = 0
}) => {
  const offset = useParallax({ speed, direction });

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
        zIndex
      }}
    >
      {children}
    </div>
  );
};

/**
 * ParallaxBackground - Background layer with parallax effect
 * 
 * Optimized for background images and decorative elements
 */
interface ParallaxBackgroundProps {
  children?: ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.3,
  className = '',
  backgroundImage,
  overlay = false
}) => {
  const offset = useParallax({ speed, direction: 'down' });

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{
          transform: `translateY(${offset}px)`,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {children}
      </div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80" />
      )}
    </div>
  );
};

/**
 * SectionTransition - Smooth transition wrapper for sections
 * 
 * Adds fade and slide animations as sections enter viewport
 */
interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className = '',
  delay = 0,
  id
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.4, 0, 0.2, 1]
          }
        }
      }}
    >
      {children}
    </motion.section>
  );
};

export default ParallaxSection;
