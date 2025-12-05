/**
 * ThemeTransitionExample Component
 * 
 * Demonstrates the enhanced theme transition animations including:
 * - Coordinated color transitions
 * - Gradient cross-fade backgrounds
 * - Smooth shadow and overlay updates
 * - Animation continuity during theme changes
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4
 * 
 * @module ThemeTransitionExample
 */

'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeTransition } from '@/hooks/useThemeTransition';
import { motion } from 'framer-motion';

/**
 * Example component showcasing theme transition features
 */
export const ThemeTransitionExample: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isTransitioning = useThemeTransition();

  return (
    <div className="min-h-screen bg-theme-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-theme-primary">
            Theme Transition Animations
          </h1>
          <p className="text-lg text-theme-secondary">
            Demonstrating coordinated color transitions, gradient cross-fades, and smooth shadow updates
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={toggleTheme}
              className="px-6 py-3 bg-theme-primary text-white rounded-lg shadow-theme-md hover:shadow-theme-lg transition-all duration-300"
            >
              Toggle Theme
            </button>
            <span className="text-sm text-theme-secondary">
              {isTransitioning ? 'Transitioning...' : `Current: ${theme}`}
            </span>
          </div>
        </div>

        {/* Gradient Background Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-theme-primary">
            1. Gradient Cross-Fade (Requirement 9.2)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="gradient-overlay h-48 rounded-xl flex items-center justify-center">
              <p className="text-white font-bold text-xl z-10 relative">
                Gradient Overlay
              </p>
            </div>
            <div className="animated-gradient-bg h-48 rounded-xl flex items-center justify-center">
              <p className="text-white font-bold text-xl">
                Animated Gradient
              </p>
            </div>
          </div>
        </section>

        {/* Shadow Transitions Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-theme-primary">
            2. Shadow Transitions (Requirement 9.4)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-theme-surface p-6 rounded-lg shadow-theme-sm">
              <p className="text-theme-primary font-medium">Small</p>
            </div>
            <div className="bg-theme-surface p-6 rounded-lg shadow-theme-md">
              <p className="text-theme-primary font-medium">Medium</p>
            </div>
            <div className="bg-theme-surface p-6 rounded-lg shadow-theme-lg">
              <p className="text-theme-primary font-medium">Large</p>
            </div>
            <div className="bg-theme-surface p-6 rounded-lg shadow-theme-xl">
              <p className="text-theme-primary font-medium">Extra Large</p>
            </div>
          </div>
        </section>

        {/* Overlay Transitions Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-theme-primary">
            3. Overlay Color Transitions (Requirement 9.4)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative h-32 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg overflow-hidden">
              <div className="overlay-light absolute inset-0 flex items-center justify-center">
                <p className="text-theme-primary font-bold">Light Overlay</p>
              </div>
            </div>
            <div className="relative h-32 bg-linear-to-br from-green-500 to-teal-500 rounded-lg overflow-hidden">
              <div className="overlay-medium absolute inset-0 flex items-center justify-center">
                <p className="text-theme-primary font-bold">Medium Overlay</p>
              </div>
            </div>
            <div className="relative h-32 bg-linear-to-br from-orange-500 to-red-500 rounded-lg overflow-hidden">
              <div className="overlay-dark absolute inset-0 flex items-center justify-center">
                <p className="text-white font-bold">Dark Overlay</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coordinated Transitions Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-theme-primary">
            4. Coordinated Element Transitions (Requirement 9.1, 9.3)
          </h2>
          <div className="bg-theme-surface border-2 border-theme rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-theme-primary rounded-full" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-theme-primary">Card Title</h3>
                <p className="text-theme-secondary">
                  All elements transition smoothly together
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-theme-primary text-white rounded-full text-sm">
                Tag 1
              </span>
              <span className="px-3 py-1 bg-theme-surface border border-theme rounded-full text-sm text-theme-primary">
                Tag 2
              </span>
              <span className="px-3 py-1 bg-theme-surface border border-theme rounded-full text-sm text-theme-accent">
                Tag 3
              </span>
            </div>
          </div>
        </section>

        {/* Animation Continuity Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-theme-primary">
            5. Animation Continuity (Requirement 9.3)
          </h2>
          <p className="text-theme-secondary">
            Animations continue smoothly during theme transitions
          </p>
          <div className="flex gap-4 flex-wrap">
            <motion.div
              className="w-24 h-24 bg-theme-primary rounded-lg shadow-theme-md"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-24 h-24 bg-theme-surface border-2 border-theme rounded-lg shadow-theme-md"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-24 h-24 animated-gradient-bg rounded-lg shadow-theme-md"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </section>

        {/* Hover Effects Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-theme-primary">
            6. Theme-Aware Hover Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-theme-surface p-6 rounded-lg hover-lift cursor-pointer">
              <h3 className="font-bold text-theme-primary mb-2">Hover Lift</h3>
              <p className="text-theme-secondary text-sm">
                Lifts with theme-aware shadow
              </p>
            </div>
            <div className="bg-theme-surface p-6 rounded-lg hover-scale cursor-pointer">
              <h3 className="font-bold text-theme-primary mb-2">Hover Scale</h3>
              <p className="text-theme-secondary text-sm">
                Scales smoothly on hover
              </p>
            </div>
            <div className="bg-theme-surface p-6 rounded-lg hover-glow cursor-pointer">
              <h3 className="font-bold text-theme-primary mb-2">Hover Glow</h3>
              <p className="text-theme-secondary text-sm">
                Glows with theme-aware color
              </p>
            </div>
          </div>
        </section>

        {/* Transition State Indicator */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-theme-primary">
            7. Transition State Detection
          </h2>
          <div className={`bg-theme-surface border-2 rounded-xl p-6 ${
            isTransitioning ? 'border-blue-500' : 'border-theme'
          }`}>
            <p className="text-theme-primary font-medium">
              Transition State: {isTransitioning ? '🔄 Active' : '✅ Complete'}
            </p>
            <p className="text-theme-secondary text-sm mt-2">
              Components can detect and respond to theme transitions using the useThemeTransition hook
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThemeTransitionExample;
