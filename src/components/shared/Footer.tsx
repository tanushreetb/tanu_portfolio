'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, GmailIcon } from '@/components/shared/SocialIcons';

export const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#E9CEB3] dark:bg-[#1C120C] border-t border-[rgba(76,53,38,0.18)] dark:border-[rgba(251,234,213,0.1)] py-16 px-6 sm:px-12 lg:px-20 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(251,234,213,0.1)]">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5]">
              T.
            </span>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-display font-bold text-[#4C3526] dark:text-[#FBEAD5]">
                Tanushree T B
              </span>
              <span className="text-[10px] font-mono tracking-[0.22em] text-[#8F6E54] dark:text-[#C9A687] uppercase">
                CODE · CREATE · GROW
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-mono font-medium text-[#70533C] hover:text-[#4C3526] dark:text-[#C9A687] dark:hover:text-[#FBEAD5] transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-[rgba(76,53,38,0.2)] dark:border-[rgba(251,234,213,0.15)] flex items-center justify-center group-hover:-translate-y-1 transition-transform bg-[#F0D6BD]/50 dark:bg-[#2B1E16]">
              <ArrowUp className="w-3.5 h-3.5 text-[#4C3526] dark:text-[#FBEAD5]" />
            </div>
          </button>
        </div>

        {/* Middle Navigation & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <nav className="flex flex-wrap gap-6 sm:gap-8 text-xs font-mono text-[#70533C] dark:text-[#C9A687]">
            <a href="#hero" className="hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors">HOME</a>
            <a href="#about" className="hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors">ABOUT</a>
            <a href="#skills" className="hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors">SKILLS</a>
            <a href="#projects" className="hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors">PROJECTS</a>
            <a href="#experience" className="hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors">EXPERIENCE</a>
            <a href="#achievements" className="hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors">ACHIEVEMENTS</a>
            <a href="#contact" className="hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors">CONTACT</a>
          </nav>

          <div className="flex items-center gap-4 text-[#70533C] dark:text-[#C9A687]">
            <a href="https://www.linkedin.com/in/tanushree-t-b-74b730317" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[#F0D6BD] dark:hover:bg-[#2B1E16] hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors" aria-label="LinkedIn">
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a href="https://github.com/tanushree-tb" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[#F0D6BD] dark:hover:bg-[#2B1E16] hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors" aria-label="GitHub">
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a href="mailto:tanushree251105@gmail.com" className="p-2 rounded-full hover:bg-[#F0D6BD] dark:hover:bg-[#2B1E16] hover:text-[#4C3526] dark:hover:text-[#FBEAD5] transition-colors" aria-label="Gmail">
              <GmailIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Handwritten Signoff */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 text-xs text-[#8F6E54] dark:text-[#C9A687]">
          <p>© 2026 Tanushree T B. All rights reserved.</p>
          <p className="font-script text-xl text-[#4C3526] dark:text-[#FBEAD5]">
            Built with curiosity & code.
          </p>
        </div>

      </div>
    </footer>
  );
};
