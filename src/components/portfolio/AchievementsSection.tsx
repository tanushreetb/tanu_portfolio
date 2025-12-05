/**
 * AchievementsSection Component
 * 
 * Modern achievements section with glassmorphism cards and animated elements.
 * Features trophy icons, gradient accents, and smooth animations.
 */

'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Achievement {
  title: string;
  description: string;
  icon?: string;
  date?: string;
  highlight?: string;
}

interface AchievementsSectionProps {
  achievements?: Achievement[];
}

const defaultAchievements: Achievement[] = [
  {
    title: "Won First Prize in Spark'24",
    description: "Developed a Hospital Management System frontend using HTML, CSS, and JavaScript with Machine Learning integration",
    icon: "🏆",
    date: "2024",
    highlight: "Hospital Management System"
  },
  {
    title: "Two Industry Ready Projects",
    description: "Completed Frontend Development certification with hands-on industry projects",
    icon: "💼",
    date: "2024"
  },
  {
    title: "Machine Learning with AI Certificate",
    description: "Intershala Training Certificate in Machine Learning and Artificial Intelligence",
    icon: "🤖",
    date: "2024"
  },
  {
    title: "Event Organizer",
    description: "Event organizer of English club and Member & Event organizer in the IQ EQ Club",
    icon: "🎯",
    date: "2023-2024"
  }
];

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements = defaultAchievements
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="achievements-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
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
            <span className="text-2xl">🏆</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Achievements
            </span>
          </motion.div>
          
          <h2
            id="achievements-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
          >
            Milestones & Recognition
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Celebrating achievements and contributions in technology and leadership
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-yellow-500 via-orange-500 to-red-500 rounded-t-2xl" />
                
                {/* Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-16 h-16 flex items-center justify-center bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg text-3xl group-hover:scale-110 transition-transform">
                    {achievement.icon || '🏆'}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {achievement.title}
                    </h3>
                    {achievement.date && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {achievement.description}
                </p>

                {/* Highlight badge */}
                {achievement.highlight && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    <span>⭐</span>
                    {achievement.highlight}
                  </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-yellow-500/0 via-orange-500/0 to-red-500/0 group-hover:from-yellow-500/10 group-hover:via-orange-500/10 group-hover:to-red-500/10 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
