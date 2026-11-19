'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LinkedInIcon, GitHubIcon, GmailIcon } from '@/components/shared/SocialIcons';

interface StepperProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const steps = [
  { id: 'hero', number: '01', label: 'HOME' },
  { id: 'about', number: '02', label: 'ABOUT' },
  { id: 'projects', number: '03', label: 'PROJECTS' },
  { id: 'experience', number: '04', label: 'EXPERIENCE' },
  { id: 'contact', number: '05', label: 'CONTACT' },
];

export const LeftVerticalStepper: React.FC<StepperProps> = ({ activeSection, onNavigate }) => {
  return (
    <aside
      aria-label="Portfolio sections timeline"
      className="hidden xl:flex fixed left-6 top-0 bottom-0 z-40 flex-col justify-between py-12 pointer-events-none select-none w-28"
    >
      {/* Background subtle curved ambient decorative arc */}
      <div className="absolute -left-16 top-1/4 w-32 h-96 rounded-full bg-gradient-to-r from-[#D6B598]/30 to-transparent dark:from-[#2B1E16]/30 filter blur-xl pointer-events-none" />

      {/* Top spacer */}
      <div className="h-12" />

      {/* Stepper nodes */}
      <nav className="relative flex flex-col gap-7 pointer-events-auto">
        {/* Continuous vertical connecting line */}
        <div className="absolute left-[6px] top-2 bottom-2 w-[1.5px] bg-[rgba(76,53,38,0.18)] dark:bg-[rgba(240,214,189,0.18)]" />

        {steps.map((step) => {
          const isActive = activeSection === step.id;
          return (
            <button
              key={step.id}
              onClick={() => onNavigate(step.id)}
              className="group flex items-center gap-3 text-left focus:outline-none"
              aria-label={`Jump to ${step.label}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Dot indicator: filled dark-brown for active, hollow circle for inactive */}
              <div
                className={`relative z-10 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-[#4C3526] dark:bg-[#FBEAD5] scale-110 shadow-sm'
                    : 'bg-transparent border-2 border-[rgba(76,53,38,0.35)] dark:border-[rgba(240,214,189,0.35)] group-hover:border-[#4C3526] dark:group-hover:border-[#FBEAD5]'
                }`}
              />

              {/* Text label */}
              <div className="flex flex-col">
                <span
                  className={`text-[10px] font-mono tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'text-[#4C3526] dark:text-[#FBEAD5] font-bold'
                      : 'text-[#8F6E54] dark:text-[#C9A687] group-hover:text-[#4C3526] dark:group-hover:text-[#FBEAD5]'
                  }`}
                >
                  {step.number}
                </span>
                <span
                  className={`text-[9px] font-mono tracking-[0.18em] transition-colors duration-200 ${
                    isActive
                      ? 'text-[#4C3526] dark:text-[#FBEAD5] font-bold'
                      : 'text-[#8F6E54] dark:text-[#C9A687] group-hover:text-[#4C3526] dark:group-hover:text-[#FBEAD5]'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Area: Social Icons & Micro Branding */}
      <div className="flex flex-col items-start gap-6 pointer-events-auto">
        {/* Social Icons */}
        <div className="flex flex-col gap-3">
          <a
            href="https://www.linkedin.com/in/tanushree-t-b-74b730317"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#70533C] hover:text-[#4C3526] dark:text-[#C9A687] dark:hover:text-[#FBEAD5] hover:bg-[rgba(76,53,38,0.08)] dark:hover:bg-[rgba(240,214,189,0.1)] transition-all hover:scale-110"
            aria-label="LinkedIn Profile"
            data-cursor="open"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/tanushree-tb"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#70533C] hover:text-[#4C3526] dark:text-[#C9A687] dark:hover:text-[#FBEAD5] hover:bg-[rgba(76,53,38,0.08)] dark:hover:bg-[rgba(240,214,189,0.1)] transition-all hover:scale-110"
            aria-label="GitHub Profile"
            data-cursor="open"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:tanushree251105@gmail.com"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#70533C] hover:text-[#4C3526] dark:text-[#C9A687] dark:hover:text-[#FBEAD5] hover:bg-[rgba(76,53,38,0.08)] dark:hover:bg-[rgba(240,214,189,0.1)] transition-all hover:scale-110"
            aria-label="Email Tanushree (Gmail)"
            data-cursor="open"
          >
            <GmailIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Micro Statement */}
        <div className="text-[8px] font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase leading-tight select-none">
          SMALL<br />
          STEPS<br />
          BIG<br />
          PROGRESS
        </div>
      </div>
    </aside>
  );
};
