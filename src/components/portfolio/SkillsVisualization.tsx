/**
 * SkillsVisualization Component
 * 
 * Advanced skills display with animated flip cards, circular progress rings,
 * category filtering, and staggered entrance animations.
 * 
 * Features:
 * - Animated skill cards with flip interaction (front: icon & name, back: details)
 * - Circular progress ring animation showing proficiency level
 * - Category filtering with animated transitions
 * - Staggered entrance animation for skill cards
 * - Responsive grid layout
 * - Reduced motion support
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 2.2
 * 
 * @component
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData, skillCategories, Skill } from '@/data/skillsData';
import { staggerContainer, staggerItem } from '@/components/animations/animationVariants';

/**
 * Individual skill card with flip animation and progress ring
 */
const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Calculate circle properties for progress ring
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  // Check if device is mobile
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <motion.div
      variants={staggerItem}
      className="relative h-48 perspective-1000 touch-target"
      onHoverStart={!isMobileDevice ? () => setIsFlipped(true) : undefined}
      onHoverEnd={!isMobileDevice ? () => setIsFlipped(false) : undefined}
      onClick={() => setIsFlipped(!isFlipped)}
      onTouchStart={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      style={{ perspective: '1000px' }}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} skill card. ${skill.level}% proficiency. ${isFlipped ? 'Showing details' : 'Press Enter to see details'}`}
      aria-pressed={isFlipped}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-xl shadow-xl p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Circular progress ring */}
          <div className="relative w-24 h-24 mb-3">
            <svg className="w-full h-full -rotate-90">
              {/* Background circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress circle */}
              <motion.circle
                cx="48"
                cy="48"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="text-blue-600 dark:text-blue-400"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
                style={{
                  strokeDasharray: circumference,
                }}
              />
            </svg>
            {/* Icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">{skill.icon || '💡'}</span>
            </div>
          </div>
          
          {/* Skill name */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            {skill.name}
          </h3>
          
          {/* Proficiency percentage */}
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
            {skill.level}%
          </p>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full bg-linear-to-br from-green-600 to-teal-600 dark:from-green-700 dark:to-teal-700 rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-white"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <span className="text-4xl mb-3">{skill.icon || '💡'}</span>
          <h3 className="text-lg font-bold text-center mb-2">
            {skill.name}
          </h3>
          <p className="text-sm text-center opacity-90">
            {skill.description || 'Click to flip back'}
          </p>
          <div className="mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
            {skill.category}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Main SkillsVisualization component
 */
export const SkillsVisualization: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Check if device is mobile for touch optimization
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

  // Filter skills based on active category
  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section 
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 mb-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-2xl">⚡</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Skills
            </span>
          </motion.div>

          <h2 
            id="skills-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {isMobileDevice ? 'Tap cards to see more details' : 'Hover over cards to see more details about each skill'}
          </p>
        </motion.div>

        {/* Category filter with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12 px-2"
          role="group"
          aria-label="Filter skills by category"
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 touch-target ${
                activeCategory === category
                  ? 'bg-linear-to-r from-green-600 to-teal-600 text-white shadow-lg scale-105'
                  : 'bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:scale-105 shadow-lg'
              }`}
              whileHover={!isMobileDevice ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.95 }}
              aria-label={`Filter by ${category}`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={`${skill.name}-${activeCategory}`} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400">
              No skills found in this category
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
