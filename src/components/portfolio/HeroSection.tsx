'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { prefersReducedMotion } from '@/utils/animations';
import styles from '@/styles/portfolio.module.css';

/**
 * HeroSection Component
 * 
 * The main hero section of the portfolio website that displays professional introduction
 * with animated entrance effects. Features staggered text animations, interactive buttons,
 * and a profile avatar with hover effects.
 * 
 * Component structure:
 * - Name and title with staggered fade-in animations
 * - Professional description text
 * - Call-to-action buttons (email and LinkedIn) with hover effects
 * - Profile avatar with rotation and scale animations on hover
 * 
 * Animation approach:
 * - Uses Framer Motion for smooth entrance animations
 * - Implements staggered children animation (150ms delay between elements)
 * - Respects user's reduced motion preferences for accessibility
 * - Provides interactive hover effects on buttons and avatar
 * 
 * Accessibility features:
 * - Semantic HTML with proper heading hierarchy (h1, h2)
 * - ARIA labels for screen readers
 * - Keyboard-accessible interactive elements
 * - Respects prefers-reduced-motion setting
 * 
 * @component
 * @returns {JSX.Element} Animated hero section with personal information
 */
export const HeroSection: React.FC = () => {
  // Extract personal data from portfolio data source
  const { personal } = portfolioData;
  
  // Check if user prefers reduced motion for accessibility
  const shouldReduceMotion = prefersReducedMotion();

  /**
   * Container animation variant for staggered children
   * 
   * Creates a cascading effect where child elements animate sequentially.
   * Each child starts animating 150ms after the previous one, creating
   * a smooth, flowing entrance pattern.
   */
  const containerVariants = {
    hidden: {}, // No specific hidden state for container
    visible: {
      transition: {
        staggerChildren: 0.15 // 150ms delay between each child animation
      }
    }
  };

  /**
   * Item animation variant for text elements
   * 
   * Animates individual text elements (name, title, description) with a
   * slide-up and fade-in effect. Elements start 20px below their final
   * position and fade in over 500ms.
   */
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start invisible and 20px below
    visible: { 
      opacity: 1, // Fade to fully visible
      y: 0, // Slide to final position
      transition: { 
        duration: 0.5, // 500ms animation duration
        ease: [0.4, 0, 0.2, 1] as any // Ease-out cubic bezier curve
      }
    }
  };

  /**
   * Avatar animation variant
   * 
   * Animates the profile avatar with a scale and fade effect.
   * Avatar starts at 80% size and fades in to full size over 600ms,
   * creating a subtle zoom-in entrance.
   */
  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Start invisible and smaller
    visible: { 
      opacity: 1, // Fade to fully visible
      scale: 1, // Scale to full size (100%)
      transition: { 
        duration: 0.6, // 600ms animation (slightly longer than text)
        ease: [0.4, 0, 0.2, 1] as any // Ease-out cubic bezier curve
      }
    }
  };

  /**
   * Conditional wrapper components based on motion preference
   * 
   * If user prefers reduced motion, use plain div elements.
   * Otherwise, use Framer Motion's motion.div for animations.
   * This ensures accessibility while providing enhanced experience
   * for users who can enjoy animations.
   */
  const ContentWrapper = shouldReduceMotion ? 'div' : motion.div;
  const ItemWrapper = shouldReduceMotion ? 'div' : motion.div;
  const AvatarWrapper = shouldReduceMotion ? 'div' : motion.div;

  return (
    <section className={styles.heroSection} aria-label="Introduction and hero section">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start">
          <ContentWrapper 
            className="lg:w-2/3"
            {...(!shouldReduceMotion && {
              initial: "hidden",
              animate: "visible",
              variants: containerVariants
            })}
          >
            <ItemWrapper 
              {...(!shouldReduceMotion && { variants: itemVariants })}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {personal.name}
              </h1>
            </ItemWrapper>
            
            <ItemWrapper 
              {...(!shouldReduceMotion && { variants: itemVariants })}
            >
              <h2 className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-6">
                {personal.title}
              </h2>
            </ItemWrapper>
            
            <ItemWrapper 
              {...(!shouldReduceMotion && { variants: itemVariants })}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                A passionate Computer Science Engineering fresher with hands-on experience in Python, AI/ML, full-stack development, and SQL. Interested in building AI-powered applications, intelligent agents, and automation workflows using LLMs and API integrations.
              </p>
            </ItemWrapper>
            
            <ItemWrapper 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              {...(!shouldReduceMotion && { variants: itemVariants })}
            >
              <motion.a
                href={`mailto:${personal.email}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Send email to ${personal.email}`}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View LinkedIn profile (opens in new tab)"
              >
                View LinkedIn
              </motion.a>
            </ItemWrapper>
          </ContentWrapper>
          
          <AvatarWrapper 
            className="lg:w-1/3 mt-8 lg:mt-0"
            {...(!shouldReduceMotion && {
              initial: "hidden",
              animate: "visible",
              variants: avatarVariants
            })}
          >
            <motion.div 
              className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold"
              whileHover={{ 
                rotate: 5,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              role="img"
              aria-label={`Profile avatar with initials ${personal.name.split(' ').map(n => n[0]).join('')}`}
            >
              {personal.name.split(' ').map(n => n[0]).join('')}
            </motion.div>
          </AvatarWrapper>
        </div>
      </div>
    </section>
  );
};