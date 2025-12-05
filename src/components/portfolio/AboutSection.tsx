'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

/**
 * AboutSection - Brief bio section with scroll-triggered animations
 */
export function AboutSection() {
  const { personal, education } = portfolioData;

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
            About Me
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-base sm:prose-lg dark:prose-invert mx-auto"
          >
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
              I'm <strong>{personal.name}</strong>, a passionate {personal.title.toLowerCase()} 
              currently pursuing {education.degree} at {education.institution}.
            </p>
            
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
              With a strong foundation in frontend development and machine learning, 
              I love creating innovative solutions that make a real-world impact. 
              My journey in tech has been driven by curiosity and a desire to build 
              applications that solve meaningful problems.
            </p>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open-source projects, or sharing my learnings through blog posts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          >
            <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
                {education.cgpa}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Current CGPA
              </div>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
                {portfolioData.projects.length}+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Projects Completed
              </div>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
                {education.expectedGraduation}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Expected Graduation
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
