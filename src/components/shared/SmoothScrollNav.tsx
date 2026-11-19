'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, ArrowRight, Menu, X } from 'lucide-react';

export interface NavSection {
  id: string;
  label: string;
}

interface SmoothScrollNavProps {
  sections?: NavSection[];
  activeSection?: string;
  className?: string;
}

const defaultSections: NavSection[] = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
];

export const SmoothScrollNav: React.FC<SmoothScrollNavProps> = ({
  sections = defaultSections,
  activeSection = 'hero',
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -50, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#E9CEB3]/90 dark:bg-[#1C120C]/90 backdrop-blur-xl border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-[0_4px_20px_rgba(76,53,38,0.06)] py-3'
            : 'bg-transparent py-5 sm:py-6'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Left Brand Monogram & Stacked Tagline */}
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
            aria-label="Scroll to home"
          >
            <span className="text-3xl sm:text-4xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight">
              T.
            </span>
            <div className="flex flex-col text-[8px] font-mono font-semibold tracking-[0.22em] text-[#8F6E54] dark:text-[#C9A687] uppercase leading-tight select-none">
              <span>CODE</span>
              <span>CREATE</span>
              <span>GROW</span>
            </div>
          </button>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="relative group py-1 text-[11px] font-mono tracking-[0.16em] uppercase transition-colors"
                  aria-label={`Navigate to ${section.label}`}
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-[#4C3526] dark:text-[#FBEAD5] font-bold'
                        : 'text-[#70533C] dark:text-[#C9A687] hover:text-[#4C3526] dark:hover:text-[#FBEAD5]'
                    }`}
                  >
                    {section.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#4C3526] dark:bg-[#FBEAD5]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Let's Connect + Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#70533C] hover:text-[#4C3526] dark:text-[#FBEAD5] bg-[rgba(76,53,38,0.08)] dark:bg-[rgba(240,214,189,0.1)] hover:bg-[rgba(76,53,38,0.15)] transition-colors"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Let's Connect Pill Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-[#4C3526] dark:text-[#FBEAD5] bg-[#FBEAD5] dark:bg-[#2B1E16] border border-[rgba(76,53,38,0.2)] dark:border-[rgba(240,214,189,0.2)] hover:border-[#4C3526] dark:hover:border-[#FBEAD5] shadow-[0_4px_16px_rgba(76,53,38,0.06)] hover:shadow-md transition-all group"
            >
              <span>Let's Connect</span>
              <div className="w-6 h-6 rounded-full bg-[#4C3526] dark:bg-[#FBEAD5] text-[#FBEAD5] dark:text-[#1C120C] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#4C3526] dark:text-[#FBEAD5] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#E9CEB3]/98 dark:bg-[#1C120C]/98 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden">
          <nav className="flex flex-col gap-6">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-left text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] hover:text-[#70533C] transition-colors flex items-center gap-3"
              >
                <span className="text-xs font-mono text-[#8F6E54] dark:text-[#C9A687]">0{idx + 1}</span>
                <span>{section.label}</span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-6 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-mono text-[#FBEAD5] bg-[#4C3526] dark:bg-[#FBEAD5] dark:text-[#1C120C]"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </>
  );
};
