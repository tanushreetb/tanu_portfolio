'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ProjectData } from '@/types';
import { prefersReducedMotion } from '@/utils/animations';
import { staggerItem } from '@/components/animations/animationVariants';

/**
 * ProjectCard3D Component
 * 
 * Enhanced project card with 3D tilt effect on hover, image zoom, and expand functionality.
 * Features smooth animations and interactive hover effects.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 2.2
 */

interface ProjectCard3DProps {
  project: ProjectData;
  onExpand?: (project: ProjectData) => void;
  featured?: boolean;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ 
  project, 
  onExpand,
  featured = false 
}) => {
  const shouldReduceMotion = prefersReducedMotion();
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt effect (disabled on mobile)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth tilt (disabled on mobile)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30
  });
  
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Handle mouse move for 3D tilt effect (disabled on mobile)
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isMobileDevice || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized position (-0.5 to 0.5)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  /**
   * Reset tilt on mouse leave
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    if (onExpand) {
      onExpand(project);
    }
  };

  const CardWrapper = shouldReduceMotion ? motion.div : motion.div;

  return (
    <CardWrapper
      ref={cardRef}
      variants={staggerItem}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl hover:shadow-2xl active:shadow-xl transition-all duration-300 touch-target ${
        featured ? 'sm:col-span-2 sm:row-span-2' : ''
      }`}
      style={
        shouldReduceMotion || isMobileDevice
          ? {}
          : {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1000
            }
      }
      onMouseMove={!isMobileDevice ? handleMouseMove : undefined}
      onMouseEnter={!isMobileDevice ? () => setIsHovered(true) : undefined}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      whileHover={shouldReduceMotion || isMobileDevice ? {} : { scale: 1.02, z: 50 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: isMobileDevice ? 0.2 : 0.3 }}
    >
      {/* Image Section with Zoom Effect */}
      {project.image && (
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={isHovered && !shouldReduceMotion && !isMobileDevice ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: isMobileDevice ? 0.2 : 0.4 }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Featured Badge */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 left-4 bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
            >
              ⭐ Featured
            </motion.div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Title and Role */}
        <div className="mb-2 sm:mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
            {project.title}
          </h3>
          {project.role && (
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
              {project.role}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technology Tags with Staggered Animation */}
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {project.technologies.slice(0, 4).map((tech, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0.7, scale: 1 },
                visible: { opacity: 1, scale: 1.05 }
              }}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-gray-500 dark:text-gray-400 text-xs px-2 py-1">
              +{project.technologies.length - 4} more
            </span>
          )}
        </motion.div>

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{project.achievements[0]}</span>
            </div>
          </div>
        )}

        {/* Hover Indicator */}
        <motion.div
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>

      {/* 3D Shine Effect on Hover (disabled on mobile) */}
      {!shouldReduceMotion && !isMobileDevice && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            opacity: isHovered ? 0.3 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </CardWrapper>
  );
};
