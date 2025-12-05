/**
 * SkillsGrid Component
 * 
 * Displays technical skills organized by category in a responsive grid layout.
 * Also includes education and certification information in a separate section.
 * 
 * Component structure:
 * - Skills section with color-coded category cards
 * - Each category displays skills as colored badges
 * - Education section with degree and HSC information
 * - Responsive grid that adapts to different screen sizes
 * 
 * Visual design:
 * - Color-coded categories for visual distinction
 * - Card-based layout with hover effects
 * - Theme-aware styling for light/dark modes
 * - Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * 
 * Accessibility features:
 * - Semantic HTML with proper heading hierarchy
 * - Clear visual grouping of related information
 * - Sufficient color contrast in both themes
 * 
 * @component
 * @returns {JSX.Element} Skills grid with education section
 */

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import styles from '@/styles/portfolio.module.css';

export const SkillsGrid: React.FC = () => {
  // Extract skills data from portfolio data source
  const { skills } = portfolioData;

  /**
   * Skill categories with associated colors
   * 
   * Each category has:
   * - title: Display name for the category
   * - items: Array of skills in this category
   * - color: Tailwind classes for badge styling (light/dark mode aware)
   * 
   * Color scheme provides visual distinction while maintaining accessibility.
   */
  const skillCategories = [
    { title: 'Programming Languages', items: skills.languages, color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' },
    { title: 'Frontend Technologies', items: skills.frontend, color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' },
    { title: 'Tools & Software', items: skills.tools, color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' },
    { title: 'Frameworks', items: skills.frameworks, color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' },
    { title: 'Database', items: skills.database, color: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200' }
  ];

  return (
    <section className={styles.skillsGrid}>
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Technical Skills & Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`${category.color} px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Education Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Education & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {portfolioData.education.degree}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                {portfolioData.education.institution}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Expected Graduation: {portfolioData.education.expectedGraduation}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                CGPA: {portfolioData.education.cgpa}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Higher Secondary Certificate
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                {portfolioData.education.hsc.school}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Year: {portfolioData.education.hsc.year}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Percentage: {portfolioData.education.hsc.percentage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};