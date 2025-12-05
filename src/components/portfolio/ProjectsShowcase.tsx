'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectData } from '@/types';
import { ProjectCard3D } from './ProjectCard3D';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer } from '@/components/animations/animationVariants';
import { prefersReducedMotion } from '@/utils/animations';

/**
 * ProjectsShowcase Component
 * 
 * Displays projects in a bento grid layout with 3D effects, staggered animations,
 * and expandable detail views. Features responsive design with fallback layouts.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 2.2
 */

interface ProjectsShowcaseProps {
  projects: ProjectData[];
  layout?: 'bento' | 'grid';
  title?: string;
  description?: string;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  projects,
  layout = 'bento',
  title = 'Featured Projects',
  description = 'Explore my latest work and creative projects'
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const shouldReduceMotion = prefersReducedMotion();
  
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectExpand = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected project to allow exit animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  /**
   * Determine grid layout classes based on layout prop
   * Responsive: 1 column on mobile, 2 on tablet, 3 on desktop
   */
  const getGridClasses = () => {
    if (layout === 'bento') {
      // Bento grid: asymmetric layout with varying card sizes
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr';
    }
    // Standard grid: uniform card sizes
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6';
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
      id="projects"
      aria-labelledby="projects-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 mb-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-2xl">💼</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Projects
            </span>
          </motion.div>

          <h2 
            id="projects-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent"
          >
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className={getGridClasses()}
        >
          {projects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              onExpand={handleProjectExpand}
              featured={layout === 'bento' && index === 0}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <svg
              className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Projects Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Check back soon for exciting new projects!
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
