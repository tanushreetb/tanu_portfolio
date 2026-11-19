'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GitHubIcon } from '@/components/shared/SocialIcons';

export interface ProjectDetail {
  id: string;
  number: string;
  title: string;
  highlight: string;
  description: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  results: string;
  learnings: string;
}

interface CaseStudyProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<CaseStudyProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Slide-in Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-2xl h-full bg-[#E9CEB3] dark:bg-[#1C120C] shadow-2xl border-l border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] overflow-y-auto p-8 sm:p-12 flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] mb-8">
            <span className="text-xs font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-bold">
              {project.number} · CASE STUDY
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F0D6BD] dark:hover:bg-[#2B1E16] text-[#4C3526] dark:text-[#FBEAD5] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Badge */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-[#FBEAD5] dark:bg-[#2B1E16] text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.18)] mb-3">
              {project.highlight}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] leading-tight">
              {project.title}
            </h2>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 mb-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5] hover:underline"
                data-cursor="open"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub ↗</span>
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5] hover:underline"
                data-cursor="open"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo ↗</span>
              </a>
            )}
          </div>

          {/* 9-Step Case Study Layout */}
          <div className="space-y-8 text-[#4C3526] dark:text-[#FBEAD5]">
            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase mb-1">01 — Overview</h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#70533C] dark:text-[#D6B598]">{project.overview}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase mb-1">02 — The Problem</h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#70533C] dark:text-[#D6B598]">{project.problem}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase mb-1">03 — The Solution</h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#70533C] dark:text-[#D6B598]">{project.solution}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase mb-1">04 — System Architecture</h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#70533C] dark:text-[#D6B598]">{project.architecture}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase mb-2">05 — Technologies & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-[#FBEAD5] dark:bg-[#2B1E16] text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.18)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase mb-1">06 — Key Challenges</h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#70533C] dark:text-[#D6B598]">{project.challenges}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase mb-1">07 — Measured Results</h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#70533C] dark:text-[#D6B598]">{project.results}</p>
            </div>

            <div className="pb-8">
              <h4 className="text-xs font-mono tracking-widest text-[#8F6E54] dark:text-[#C9A687] uppercase mb-1">08 — What I Learned</h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#70533C] dark:text-[#D6B598]">{project.learnings}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
