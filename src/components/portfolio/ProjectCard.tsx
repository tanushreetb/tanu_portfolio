'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectData } from '@/types';
import { prefersReducedMotion } from '@/utils/animations';
import styles from '@/styles/portfolio.module.css';

/**
 * ProjectCard Component
 * 
 * Displays a single project with all its details in an interactive card format.
 * Features hover animations, technology tags, achievements, and optional project links.
 * 
 * Component structure:
 * - Project title and optional role
 * - Project description
 * - Technology tags with color coding
 * - Optional achievements list
 * - Optional external link with animated icon
 * 
 * Animation approach:
 * - Card scales up and lifts on hover (scale: 1.03, y: -5px)
 * - Subtle press effect on click (scale: 0.98)
 * - Link arrow animates on hover (slides right and up)
 * - Respects reduced motion preferences
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - External links open in new tab with rel="noopener noreferrer"
 * - Keyboard accessible interactive elements
 * 
 * @component
 * @param {ProjectCardProps} props - Component props
 * @param {ProjectData} props.project - Project data to display
 * @returns {JSX.Element} Animated project card
 */

/**
 * ProjectCard Props Interface
 * 
 * @interface ProjectCardProps
 * @property {ProjectData} project - Complete project information
 */
interface ProjectCardProps {
  project: ProjectData;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Check if user prefers reduced motion for accessibility
  const shouldReduceMotion = prefersReducedMotion();

  /**
   * Conditional card wrapper based on motion preference
   * 
   * Uses motion.div for animated cards when motion is enabled,
   * falls back to regular div for users who prefer reduced motion.
   */
  const CardWrapper = shouldReduceMotion ? 'div' : motion.div;
  
  /**
   * Card animation properties
   * 
   * Hover animation:
   * - scale: 1.03 (3% larger for emphasis)
   * - y: -5 (lifts card 5px up)
   * - duration: 300ms with ease-out curve
   * 
   * Tap animation:
   * - scale: 0.98 (slight press effect for tactile feedback)
   */
  const cardProps = shouldReduceMotion ? {} : {
    whileHover: { 
      scale: 1.03, // Scale up 3% for emphasis
      y: -5, // Lift card 5px up
      transition: { 
        duration: 0.3, // 300ms animation
        ease: [0.4, 0, 0.2, 1] as any // Ease-out cubic bezier
      }
    },
    whileTap: { scale: 0.98 } // Slight press effect on click
  };

  return (
    <CardWrapper 
      className={`${styles.projectCard} bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6`}
      {...cardProps}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        {project.role && (
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
            {project.role}
          </p>
        )}
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {project.description}
      </p>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Technologies:
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {project.achievements && project.achievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Achievements:
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
            {project.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
      
      {project.link && (
        <div className="mt-4">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            View Project
            <motion.svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: 3, y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </motion.svg>
          </motion.a>
        </div>
      )}
    </CardWrapper>
  );
};