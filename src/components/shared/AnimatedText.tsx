/**
 * AnimatedText Component
 * 
 * Reusable component for kinetic typography effects including character-by-character
 * reveals, gradient animations, and other text animation styles.
 * 
 * Requirements: 4.2, 2.2
 */

'use client';

import { motion } from 'framer-motion';
import { characterReveal, wordReveal } from '@/components/animations/animationVariants';

type AnimationVariant = 'reveal' | 'gradient' | 'typewriter' | 'word-reveal';

interface AnimatedTextProps {
  text: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  id?: string;
}

/**
 * AnimatedText component for kinetic typography effects
 * 
 * @param text - The text content to animate
 * @param variant - Animation style ('reveal', 'gradient', 'typewriter', 'word-reveal')
 * @param delay - Initial delay before animation starts (in seconds)
 * @param duration - Duration of the animation (in seconds)
 * @param className - Additional CSS classes
 * @param as - HTML element to render as
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  variant = 'reveal',
  delay = 0,
  duration = 0.3,
  id,
  className = '',
  as = 'span'
}) => {
  const MotionComponent = motion[as];

  // Character-by-character reveal animation
  if (variant === 'reveal') {
    return (
      <MotionComponent
        id={id}
        className={`inline-block ${className}`}
        initial="hidden"
        animate="visible"
        aria-label={text}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            custom={index}
            variants={characterReveal}
            className="inline-block"
            style={{ 
              display: char === ' ' ? 'inline' : 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
          >
            {char}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  // Word-by-word reveal animation
  if (variant === 'word-reveal') {
    const words = text.split(' ');
    return (
      <MotionComponent
        className={`inline-block ${className}`}
        initial="hidden"
        animate="visible"
        aria-label={text}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            custom={index}
            variants={wordReveal}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  // Gradient animation (CSS-based)
  if (variant === 'gradient') {
    return (
      <MotionComponent
        className={`animated-gradient-text ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration }}
        aria-label={text}
      >
        {text}
      </MotionComponent>
    );
  }

  // Typewriter effect
  if (variant === 'typewriter') {
    return (
      <MotionComponent
        className={`inline-block ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        aria-label={text}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: delay + (index * 0.05),
              duration: 0.1
            }}
            className="inline-block"
            style={{ 
              display: char === ' ' ? 'inline' : 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
          >
            {char}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  // Default fallback
  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration }}
    >
      {text}
    </MotionComponent>
  );
};
