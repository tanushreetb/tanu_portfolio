/**
 * SkillsVisualization Example Usage
 * 
 * This file demonstrates how to integrate the SkillsVisualization component
 * into your portfolio page. It shows the component in context with other
 * portfolio sections.
 * 
 * @example
 */

'use client';

import React from 'react';
import { SkillsVisualization } from './SkillsVisualization';
import { IntegratedHero } from './IntegratedHero';
import { ProjectsShowcase } from './ProjectsShowcase';

/**
 * Example: Full Portfolio Page with SkillsVisualization
 * 
 * This example shows how to integrate the SkillsVisualization component
 * into a complete portfolio page with proper section ordering and spacing.
 */
export function FullPortfolioExample() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="hero">
        <IntegratedHero
          name="Your Name"
          title="Your Title"
          description="Your description"
          ctaButtons={[
            { label: 'View Projects', href: '#projects', variant: 'primary' },
            { label: 'Contact Me', href: '#contact', variant: 'secondary' }
          ]}
        />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectsShowcase projects={[]} layout="bento" />
      </section>

      {/* Skills Section - The main component */}
      <section id="skills">
        <SkillsVisualization />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Get In Touch
          </h2>
          {/* Contact form or info here */}
        </div>
      </section>
    </main>
  );
}

/**
 * Example: Standalone Skills Section
 * 
 * This example shows the SkillsVisualization component as a standalone
 * section, perfect for a dedicated skills page or modal.
 */
export function StandaloneSkillsExample() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SkillsVisualization />
    </div>
  );
}

/**
 * Example: Skills Section with Custom Wrapper
 * 
 * This example shows how to wrap the SkillsVisualization component
 * with custom styling and additional content.
 */
export function CustomWrappedSkillsExample() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-900/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Optional intro text */}
        <div className="container mx-auto max-w-4xl px-6 pt-16 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            I'm constantly learning and expanding my skill set. Here's what I'm currently working with:
          </p>
        </div>
        
        {/* Skills component */}
        <SkillsVisualization />
        
        {/* Optional outro text */}
        <div className="container mx-auto max-w-4xl px-6 pb-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mt-8">
            Want to see these skills in action? Check out my{' '}
            <a href="#projects" className="text-blue-600 dark:text-blue-400 hover:underline">
              projects
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Example: Skills Section with Intersection Observer
 * 
 * This example shows how to add custom behavior when the skills section
 * comes into view, such as tracking analytics or triggering other effects.
 */
export function SkillsWithObserverExample() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Track analytics event
          console.log('Skills section viewed');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="skills">
      <SkillsVisualization />
      
      {isVisible && (
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Thanks for checking out my skills! 👋
        </div>
      )}
    </section>
  );
}

/**
 * Example: Skills Section with Dynamic Data
 * 
 * This example shows how you might load skills data dynamically
 * from an API or CMS instead of using static data.
 */
export function DynamicSkillsExample() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return <SkillsVisualization />;
}

/**
 * Example: Minimal Integration
 * 
 * The simplest way to add the SkillsVisualization component to your page.
 */
export function MinimalSkillsExample() {
  return <SkillsVisualization />;
}

/**
 * Example: Skills Section with Smooth Scroll Navigation
 * 
 * This example shows how to integrate with smooth scroll navigation
 * for a single-page portfolio layout.
 */
export function SkillsWithNavigationExample() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <ul className="flex justify-center gap-6">
            <li>
              <a href="#hero" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400">
                Projects
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400">
                Skills
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <section id="skills">
          <SkillsVisualization />
        </section>
      </main>
    </>
  );
}

// Export all examples
export default {
  FullPortfolioExample,
  StandaloneSkillsExample,
  CustomWrappedSkillsExample,
  SkillsWithObserverExample,
  DynamicSkillsExample,
  MinimalSkillsExample,
  SkillsWithNavigationExample
};
