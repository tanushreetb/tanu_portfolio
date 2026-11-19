'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Zap, Users, Sparkles, ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const personalityCards = [
    {
      icon: Code2,
      title: 'Problem Solver',
      description: 'I enjoy breaking complex problems into simple, elegant, and practical solutions.',
    },
    {
      icon: Zap,
      title: 'Quick Learner',
      description: 'I continuously explore new technologies, modern development practices, and architectures.',
    },
    {
      icon: Users,
      title: 'Team Player',
      description: 'I enjoy collaborating, sharing ideas, and building meaningful solutions together.',
    },
    {
      icon: Sparkles,
      title: 'Tech Enthusiast',
      description: 'I am curious about modern software development, Machine Learning, and emerging technologies.',
    },
  ];

  const timelineSteps = [
    'Learn',
    'Build',
    'Experiment',
    'Improve',
    'Create Impact',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Me"
      className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#D6B598]/25 dark:bg-[#1C120C] transition-colors relative overflow-hidden"
    >
      {/* Background Architectural Watermark Heading — Perfectly Centered for All Screen Types */}
      <div
        className="absolute top-6 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#4C3526]/[0.05] dark:text-[#FBEAD5]/[0.04] tracking-tight sm:tracking-tighter whitespace-nowrap z-0 overflow-hidden leading-none px-4"
        aria-hidden="true"
      >
        02 · ABOUT ME
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col relative z-10">
        
        {/* Section Header (Centered for All Screens) */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mx-auto mb-16 max-w-3xl"
        >
          <span className="text-xs font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-2">
            02 · KNOW ME BETTER
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight mb-4">
            More than a developer.<br />
            <span className="text-[#70533C] dark:text-[#D6B598] font-normal">A continuous learner.</span>
          </h2>
          <div className="w-12 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mb-6 mx-auto" />
          
          <div className="space-y-4 text-base sm:text-lg text-[#70533C] dark:text-[#D6B598] leading-relaxed">
            <p>
              I am a Computer Science Engineering fresher at Sona College of Technology, Salem (CGPA: 7.95/10), with hands-on experience across Python, AI/ML, full-stack development, and SQL.
            </p>
            <p>
              I specialize in developing AI-powered applications, intelligent agents, and automation workflows using LLMs (Qwen 2.5, MedGemma, Gemini) and API integrations. Experienced in building high-performance backend microservices and AI-driven solutions through academic innovations and internship experience at Innovexis Pvt. Ltd.
            </p>
          </div>
        </motion.div>

        {/* 4 Personality Cards with Blur-to-Sharp Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {personalityCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md p-8 rounded-2xl border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay hover:shadow-studio transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] flex items-center justify-center text-[#4C3526] dark:text-[#FBEAD5] mb-5 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[#70533C] dark:text-[#D6B598] leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Growth Cycle Timeline */}
        <div className="bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay flex flex-col items-center text-center">
          <span className="text-[10px] font-mono tracking-[0.22em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-3">
            THE GROWTH LIFECYCLE
          </span>
          <h4 className="text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-8">
            How I Approach Engineering
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
            {timelineSteps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="px-5 py-2.5 rounded-full bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-sm text-xs sm:text-sm font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5]">
                  {step}
                </div>
                {index < timelineSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#70533C] dark:text-[#C9A687] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
