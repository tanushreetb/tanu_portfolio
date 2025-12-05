/**
 * IntegratedHero Component
 * 
 * Ultra-modern hero section with profile image, glassmorphism effects, 
 * animated gradients, and contemporary design patterns.
 * Features profile avatar, floating elements, and smooth animations.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 2.2, 2.5
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { useParallax } from '@/hooks/useParallax';
import { useResponsive } from '@/hooks/useResponsive';
import { buttonHover, slideUp, scaleIn } from '@/components/animations/animationVariants';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface IntegratedHeroProps {
  name: string;
  title: string;
  description: string;
  ctaButtons: CTAButton[];
  profileImage?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

/**
 * IntegratedHero component with kinetic typography and animations
 * 
 * Animation sequence:
 * 1. Gradient background fades in (0-0.5s)
 * 2. Name reveals character by character (0.5-1.5s)
 * 3. Title slides up with fade (1.5-2s)
 * 4. Description fades in (2-2.5s)
 * 5. CTA buttons scale in (2.5-3s)
 */
export const IntegratedHero: React.FC<IntegratedHeroProps> = ({
  name,
  title,
  description,
  ctaButtons,
  profileImage = '/images/profile.jpg',
  socialLinks = {}
}) => {
  // Responsive state
  const { isMobile, shouldEnableParallax: enableParallax } = useResponsive();
  
  // Parallax effects for floating elements
  const parallaxSlow = useParallax({ speed: 0.2, direction: 'down' });
  const parallaxFast = useParallax({ speed: 0.5, direction: 'up' });

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <motion.div
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-4 border-blue-400/30 dark:border-blue-600/30 rounded-lg rotate-12"
        style={{ y: enableParallax ? parallaxSlow : 0 }}
        animate={{ rotate: [12, 24, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full"
        style={{ y: enableParallax ? parallaxFast : 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-indigo-400/30 dark:border-indigo-600/30 rounded-full"
        style={{ y: enableParallax ? parallaxSlow : 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Left side - Profile Image with glassmorphism card */}
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glowing ring effect */}
              <motion.div
                className="absolute -inset-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-75 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Profile image container with glassmorphism */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-full border border-white/20 dark:border-gray-700/20 shadow-2xl" />
                <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white/50 dark:border-gray-800/50 shadow-xl bg-linear-to-br from-blue-400 via-purple-400 to-pink-400">
                  {/* Fallback gradient avatar with initials */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl sm:text-9xl font-bold text-white drop-shadow-lg">
                      {name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  {/* Actual image (if exists, will overlay the fallback) */}
                  <Image
                    src={profileImage}
                    alt={`${name} - Profile Picture`}
                    fill
                    className="object-cover relative z-10"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                    onError={(e) => {
                      // Hide image on error to show fallback
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Greeting badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 mb-6 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-2xl">👋</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hello, I'm
              </span>
            </motion.div>

            {/* Name with gradient text - single line */}
            <motion.h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {name}
            </motion.h1>

            {/* Title with animated underline */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {title}
              </h2>
              <motion.div
                className="h-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {description}
            </motion.p>

            {/* Social links */}
            {Object.keys(socialLinks).length > 0 && (
              <motion.div
                className="flex gap-4 justify-center lg:justify-start mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 hover:scale-110 hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg"
                    aria-label="GitHub Profile"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 hover:scale-110 hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {socialLinks.email && (
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="w-12 h-12 flex items-center justify-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 hover:scale-110 hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg"
                    aria-label="Email Contact"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                )}
              </motion.div>
            )}

            {/* CTA Buttons with modern styling */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.3
                  }
                }
              }}
            >
              {ctaButtons.map((button, index) => (
                <motion.a
                  key={index}
                  href={button.href}
                  className={`
                    group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden
                    transition-all duration-300 text-center touch-target
                    ${button.variant === 'primary'
                      ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-105'
                      : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                  variants={scaleIn}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={button.label}
                >
                  {button.variant === 'primary' && (
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {button.label}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>


      </div>
    </section>
  );
};
