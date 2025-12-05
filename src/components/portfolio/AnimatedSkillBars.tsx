'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '@/utils/animations';

/**
 * AnimatedSkillBars Component
 * 
 * Displays technical skills with animated progress bars that fill on scroll.
 * This is a unique interactive feature that provides visual feedback on skill
 * proficiency levels through color-coded, animated bars.
 * 
 * Component features:
 * - Animated progress bars that fill when scrolled into view
 * - Color-coded categories (Programming, Frontend, Tools, Database)
 * - Hover effects for interactive feedback
 * - Staggered animations for sequential reveal
 * - Respects reduced motion preferences for accessibility
 * 
 * Animation approach:
 * - Bars animate from 0% to their target width using Framer Motion
 * - Each bar has a staggered delay (100ms between bars)
 * - Hover effect scales the bar slightly for interactivity
 * - Falls back to static bars if user prefers reduced motion
 * 
 * @component
 * @param {AnimatedSkillBarsProps} props - Component props
 * @param {Skill[]} props.skills - Array of skills to display with levels
 * @returns {JSX.Element} Animated skill bars grouped by category
 */

/**
 * Skill Interface
 * 
 * Represents a single skill with its proficiency level and category.
 * 
 * @interface Skill
 * @property {string} name - Skill name (e.g., "Python", "React")
 * @property {number} level - Proficiency level from 0-100 (percentage)
 * @property {string} category - Skill category for grouping and color coding
 */
interface Skill {
  name: string;
  level: number; // 0-100 percentage
  category: string;
}

/**
 * AnimatedSkillBars Props Interface
 * 
 * @interface AnimatedSkillBarsProps
 * @property {Skill[]} skills - Array of skills to display
 */
interface AnimatedSkillBarsProps {
  skills: Skill[];
}

export const AnimatedSkillBars: React.FC<AnimatedSkillBarsProps> = ({ skills }) => {
  // Check if user prefers reduced motion for accessibility
  const shouldReduceMotion = prefersReducedMotion();

  /**
   * Group skills by category for organized display
   * 
   * Uses reduce to transform flat skills array into an object where
   * keys are category names and values are arrays of skills in that category.
   * This allows us to render skills in organized sections with category headers.
   */
  const groupedSkills = skills.reduce((acc, skill) => {
    // Initialize category array if it doesn't exist
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    // Add skill to its category group
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  /**
   * Color schemes for skill categories
   * 
   * Each category has three colors:
   * - bg: Background color for the progress bar track (light/dark mode aware)
   * - fill: Fill color for the progress bar itself
   * - hover: Hover state color for interactive feedback
   * 
   * Color choices provide visual distinction between categories while
   * maintaining accessibility and aesthetic consistency.
   */
  const categoryColors: Record<string, { bg: string; fill: string; hover: string }> = {
    'Programming': { bg: 'bg-red-100 dark:bg-red-900', fill: 'bg-red-500', hover: 'hover:bg-red-600' },
    'Frontend': { bg: 'bg-green-100 dark:bg-green-900', fill: 'bg-green-500', hover: 'hover:bg-green-600' },
    'Tools': { bg: 'bg-purple-100 dark:bg-purple-900', fill: 'bg-purple-500', hover: 'hover:bg-purple-600' },
    'Database': { bg: 'bg-indigo-100 dark:bg-indigo-900', fill: 'bg-indigo-500', hover: 'hover:bg-indigo-600' },
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => {
        const colors = categoryColors[category] || categoryColors['Tools'];
        
        return (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {category}
            </h3>
            
            <div className="space-y-3">
              {categorySkills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className={`w-full ${colors.bg} rounded-full h-3 overflow-hidden`}>
                    {shouldReduceMotion ? (
                      // Static bar for reduced motion preference
                      <div
                        className={`h-full ${colors.fill} ${colors.hover} transition-colors duration-300`}
                        style={{ width: `${skill.level}%` }}
                      />
                    ) : (
                      // Animated bar with Framer Motion
                      <motion.div
                        className={`h-full ${colors.fill} ${colors.hover} transition-colors duration-300`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{
                          duration: 1,
                          delay: index * 0.1,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
