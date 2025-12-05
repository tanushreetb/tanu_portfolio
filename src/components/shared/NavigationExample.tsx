/**
 * Navigation Example Component
 * 
 * This file demonstrates how to integrate the SmoothScrollNav and ScrollProgress
 * components into a page layout. This is a reference implementation for task 2.
 * 
 * Usage:
 * 1. Import both components
 * 2. Define your page sections with IDs
 * 3. Pass section configuration to SmoothScrollNav
 * 4. Add ScrollProgress for visual feedback
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

'use client';

import React from 'react';
import { SmoothScrollNav, NavSection } from './SmoothScrollNav';
import { ScrollProgress } from './ScrollProgress';

/**
 * Example page layout with smooth scroll navigation
 */
export const NavigationExample: React.FC = () => {
  // Define sections that will be navigated to
  const sections: NavSection[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicator - appears at top of page */}
      <ScrollProgress 
        color="bg-blue-600" 
        height={3} 
        position="top" 
      />

      {/* Smooth Scroll Navigation - sticky header */}
      <SmoothScrollNav sections={sections} />

      {/* Main Content - Each section needs an ID matching the sections array */}
      <main className="pt-16"> {/* Add padding-top to account for fixed nav */}
        
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to My Portfolio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Scroll down to explore
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
              This is the about section. The navigation will highlight this section
              when you scroll here.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
              This is the projects section. Notice how the navigation updates as you scroll.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Skills
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
              This is the skills section. The progress bar at the top shows your scroll position.
            </p>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Blog
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
              This is the blog section. Try scrolling up - the navigation will reappear!
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Contact
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
              This is the contact section. The progress bar should be at 100% when you reach here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

/**
 * Integration Notes:
 * 
 * 1. Section IDs: Each section must have an id attribute that matches the NavSection id
 * 2. Padding Top: Add pt-16 (or appropriate padding) to main content to account for fixed nav
 * 3. Min Height: Use min-h-screen or sufficient height for sections to enable proper scroll spy
 * 4. Scroll Progress: Position at top or bottom based on design preference
 * 5. Theme Toggle: Automatically included in SmoothScrollNav component
 * 
 * Features Demonstrated:
 * - Smooth scroll to sections on navigation click (Requirement 7.2, 7.5)
 * - Active section highlighting with scroll spy (Requirement 7.3)
 * - Hide on scroll down, show on scroll up behavior (Requirement 7.4)
 * - Visual scroll progress indicator (Requirement 7.4)
 * - Sticky navigation (Requirement 7.1)
 * - Mobile responsive with hamburger menu
 * - Theme toggle integration
 * - Accessibility features (ARIA labels, keyboard navigation)
 */
