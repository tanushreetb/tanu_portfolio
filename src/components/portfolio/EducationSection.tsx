/**
 * EducationSection Component
 * 
 * Modern education section with timeline design, glassmorphism cards,
 * and animated progress indicators.
 */

'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  score: string;
  scoreLabel: string;
  description?: string;
  icon?: string;
}

interface EducationSectionProps {
  education?: EducationItem[];
}

const defaultEducation: EducationItem[] = [
  {
    degree: "BE, Computer Science and Engineering",
    institution: "Sona College of Technology",
    duration: "Expected to graduate in 2027",
    score: "8.02%",
    scoreLabel: "CGPA",
    description: "Currently pursuing Bachelor's degree in Computer Science And Engineering",
    icon: "🎓"
  },
  {
    degree: "HSC (2022 - 2023)",
    institution: "Dr Krishna Vikas Matric Higher Secondary School",
    duration: "2022 - 2023",
    score: "88.84%",
    scoreLabel: "Percentage",
    description: "Prevailed an aggregate of 88.84%",
    icon: "📚"
  }
];

export const EducationSection: React.FC<EducationSectionProps> = ({
  education = defaultEducation
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="education-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
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

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 mb-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-2xl">🎓</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Education
            </span>
          </motion.div>
          
          <h2
            id="education-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Academic Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Building a strong foundation in computer science and technology
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-indigo-500 to-purple-500 hidden md:block" />

          {/* Education Items */}
          <div className="space-y-8">
            {education.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 top-8 w-4 h-4 bg-linear-to-br from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block transform -translate-x-1/2" />

                {/* Card */}
                <div className="md:ml-20 group">
                  <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* Gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-2xl" />
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon */}
                      <div className="shrink-0">
                        <div className="w-20 h-20 flex items-center justify-center bg-linear-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg text-4xl group-hover:scale-110 transition-transform">
                          {item.icon || '🎓'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                              {item.degree}
                            </h3>
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                              {item.institution}
                            </p>
                          </div>
                          
                          {/* Score badge */}
                          <div className="shrink-0 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg">
                            <div className="text-2xl font-black">{item.score}</div>
                            <div className="text-xs font-medium opacity-90">{item.scoreLabel}</div>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {item.duration}
                        </p>

                        {item.description && (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Certifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Basics of Python", icon: "🐍" },
              { name: "Generative AI", icon: "🤖" },
              { name: "Design Thinking - a primer", icon: "🎨" },
              { name: "Machine Learning with AI", icon: "🧠", highlight: true }
            ].map((cert, index) => (
              <motion.div
                key={index}
                className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/20 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.7 + (0.1 * index) }}
              >
                {cert.highlight && (
                  <div className="absolute top-0 right-0 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-bl-lg rounded-tr-xl">
                    ⭐ Featured
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cert.icon}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {cert.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
