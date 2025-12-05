/**
 * SmoothScrollNav Component
 * 
 * A sticky navigation component with scroll spy functionality and hide-on-scroll-down behavior.
 * Provides smooth scrolling to sections and highlights the active section based on scroll position.
 * 
 * Features:
 * - Sticky header that hides on scroll down, shows on scroll up
 * - Scroll spy to track and highlight active section
 * - Smooth scroll to sections on navigation click
 * - Theme toggle integration
 * - Mobile hamburger menu
 * - Responsive design
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useTheme } from '@/contexts/ThemeContext';

export interface NavSection {
  id: string;
  label: string;
}

interface SmoothScrollNavProps {
  sections: NavSection[];
  className?: string;
}

export const SmoothScrollNav: React.FC<SmoothScrollNavProps> = ({
  sections,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Track active section using scroll spy
  const activeSection = useScrollSpy({
    sectionIds: sections.map(s => s.id),
    offset: 100,
  });

  /**
   * Handle scroll behavior: hide nav on scroll down, show on scroll up
   * Always show nav when at the top of the page
   * Optimized with RAF throttling for 60fps performance
   * Requirements: 8.2, 8.5
   */
  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show nav at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide nav
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu on scroll
      } else {
        // Scrolling up - show nav
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      ticking = false;
    };

    // Use RAF throttle for optimal performance
    const throttledHandleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [lastScrollY]);

  /**
   * Smooth scroll to section when navigation link is clicked
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        id="navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${className}`}
        aria-label="Main navigation"
      >
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <div className="shrink-0">
                <button
                  onClick={() => scrollToSection(sections[0]?.id || 'hero')}
                  className="text-xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all"
                  aria-label="Scroll to top"
                >
                  TTB
                </button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40 hover:backdrop-blur-sm hover:scale-105'
                    }`}
                    aria-label={`Navigate to ${section.label}`}
                    aria-current={activeSection === section.id ? 'true' : 'false'}
                  >
                    {section.label}
                  </button>
                ))}
              </div>

              {/* Theme Toggle & Mobile Menu Button */}
              <div className="flex items-center space-x-2">
                {/* Theme Toggle Button with glassmorphism */}
                <button
                  onClick={toggleTheme}
                  className="relative p-2 rounded-xl text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:scale-110 hover:bg-white/60 dark:hover:bg-gray-800/60 active:scale-95 transition-all duration-300 touch-target overflow-hidden shadow-lg"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {/* Moon icon (dark mode) */}
                  <svg
                    className={`w-5 h-5 absolute inset-0 m-auto transition-all duration-300 ${
                      theme === 'light' 
                        ? 'opacity-100 rotate-0 scale-100' 
                        : 'opacity-0 rotate-90 scale-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  {/* Sun icon (light mode) */}
                  <svg
                    className={`w-5 h-5 absolute inset-0 m-auto transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'opacity-100 rotate-0 scale-100' 
                        : 'opacity-0 -rotate-90 scale-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  {/* Spacer to maintain button size */}
                  <div className="w-5 h-5 opacity-0" aria-hidden="true" />
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:scale-110 hover:bg-white/60 dark:hover:bg-gray-800/60 active:scale-95 transition-all duration-300 touch-target shadow-lg"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown with Glassmorphism */}
        <div
          className={`md:hidden bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-xl transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4 py-3 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 mobile-nav-item ${
                  activeSection === section.id
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:scale-105'
                }`}
                aria-label={`Navigate to ${section.label}`}
                aria-current={activeSection === section.id ? 'true' : 'false'}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Glassmorphism Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
