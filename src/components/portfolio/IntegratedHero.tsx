'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Download } from 'lucide-react';

interface IntegratedHeroProps {
  name?: string;
  title?: string;
  description?: string;
  ctaButtons?: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
}

export const IntegratedHero: React.FC<IntegratedHeroProps> = ({
  name = "Tanushree T B",
  title = "COMPUTER SCIENCE ENGINEER · AI/ML & FULL-STACK",
  description = "A passionate Computer Science Engineering fresher with hands-on experience in Python, AI/ML, full-stack development, and SQL. Building AI-powered applications, intelligent agents, and automation workflows using LLMs and API integrations.",
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven multi-plane parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, 75]);

  const scrollToSection = (id: string) => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(`#${id}`, { offset: -50, duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#E9CEB3] dark:bg-[#1C120C]"
    >
      {/* Soft studio ambient background glows & curves */}
      <div className="absolute top-12 left-1/3 w-[500px] h-[500px] rounded-full bg-[#D6B598]/35 dark:bg-[#2B1E16]/30 filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-[#E1C3A7]/40 dark:bg-[#20140D]/30 filter blur-3xl pointer-events-none" />

      {/* Main Two-Column Hero Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        
        {/* Left Column: Typography, CTAs, Stats (Desktop: 1st, Mobile: 2nd) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 flex flex-col z-10"
        >
          
          {/* Micro Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-3"
          >
            HELLO, I'M
          </motion.div>

          {/* Master Name: Editorial Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl xl:text-7xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight leading-[1.08] mb-4"
          >
            {name}
          </motion.h1>

          {/* Subtitle with Underline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col mb-6"
          >
            <h2 className="text-xs sm:text-sm font-mono tracking-[0.22em] text-[#70533C] dark:text-[#E1C3A7] uppercase font-bold">
              {title}
            </h2>
            <div className="w-14 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mt-3" />
          </motion.div>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-[#70533C] dark:text-[#D6B598] font-normal leading-relaxed max-w-lg mb-8"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            {/* View My Work Primary Button */}
            <button
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-sm font-mono font-medium tracking-wide text-[#FBEAD5] bg-[#4C3526] dark:bg-[#FBEAD5] dark:text-[#1C120C] shadow-[0_8px_25px_rgba(76,53,38,0.22)] hover:shadow-lg transition-all hover:scale-[1.02]"
              data-cursor="view"
            >
              <span>View My Work</span>
              <div className="w-8 h-8 rounded-full bg-[#FBEAD5] text-[#4C3526] dark:bg-[#1C120C] dark:text-[#FBEAD5] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            {/* Download Resume Button */}
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-mono font-medium tracking-wide text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.25)] dark:border-[rgba(240,214,189,0.25)] hover:border-[#4C3526] dark:hover:border-[#FBEAD5] transition-all hover:bg-[#F0D6BD]/50 dark:hover:bg-[#2B1E16] hover:scale-[1.02] shadow-sm"
              data-cursor="download"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Telemetry Stat Counter Grid (Resume Highlights) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-4 sm:gap-6 py-4 border-t border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] max-w-md"
          >
            {/* Stat 1 */}
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5]">
                7.95
              </span>
              <span className="text-[11px] font-mono text-[#8F6E54] dark:text-[#C9A687] tracking-wider">
                CGPA (B.E)
              </span>
            </div>

            <div className="w-px h-8 bg-[rgba(76,53,38,0.18)] dark:bg-[rgba(240,214,189,0.18)]" />

            {/* Stat 2 */}
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5]">
                GenAI
              </span>
              <span className="text-[11px] font-mono text-[#8F6E54] dark:text-[#C9A687] tracking-wider">
                Internship
              </span>
            </div>

            <div className="w-px h-8 bg-[rgba(76,53,38,0.18)] dark:bg-[rgba(240,214,189,0.18)]" />

            {/* Stat 3 */}
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5]">
                5
              </span>
              <span className="text-[11px] font-mono text-[#8F6E54] dark:text-[#C9A687] tracking-wider">
                Certifications
              </span>
            </div>

            <div className="w-px h-8 bg-[rgba(76,53,38,0.18)] dark:bg-[rgba(240,214,189,0.18)]" />

            {/* Stat 4 */}
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5]">
                ∞
              </span>
              <span className="text-[11px] font-mono text-[#8F6E54] dark:text-[#C9A687] tracking-wider">
                Continuous Learning
              </span>
            </div>
          </motion.div>

          {/* Handwritten Quote Detail & Decorative Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 flex flex-col"
          >
            <p className="font-script text-2xl sm:text-3xl text-[#4C3526] dark:text-[#FBEAD5] leading-tight">
              Better Code<br />
              <span className="ml-4">Brighter Tomorrows</span>
            </p>
            {/* Artistic flourish line */}
            <svg className="w-32 h-4 text-[#4C3526] dark:text-[#FBEAD5] mt-1" viewBox="0 0 140 16" fill="none">
              <path d="M2 12C35 4 90 2 138 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase mt-2 select-none">
              CODE · CREATE · GROW
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Studio Avatar Composition (Desktop: 2nd, Mobile: 1st) */}
        <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 relative flex items-center justify-center min-h-[400px] sm:min-h-[520px] lg:min-h-[640px]">
          
          {/* Layer 1: Concentric 3D Porcelain Portal Rings */}
          <motion.div
            style={{ rotate: ringRotate, scale: ringScale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Outer Ring */}
            <div className="w-[320px] sm:w-[460px] lg:w-[560px] h-[320px] sm:h-[460px] lg:h-[560px] rounded-full border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.15)] shadow-[0_30px_70px_rgba(76,53,38,0.06)] bg-gradient-to-b from-[#F0D6BD]/70 via-[#E1C3A7]/30 to-transparent dark:from-[#2B1E16]/40 dark:via-transparent" />
            {/* Middle Ring */}
            <div className="absolute w-[250px] sm:w-[360px] lg:w-[440px] h-[250px] sm:h-[360px] lg:h-[440px] rounded-full border border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.12)] shadow-[inset_0_4px_16px_rgba(76,53,38,0.04)]" />
            {/* Inner Ring */}
            <div className="absolute w-[180px] sm:w-[260px] lg:w-[320px] h-[180px] sm:h-[260px] lg:h-[320px] rounded-full border border-[rgba(76,53,38,0.12)] dark:border-[rgba(240,214,189,0.1)]" />
          </motion.div>

          {/* Layer 2: Floating Porcelain Spheres */}
          {/* Top-left small orb */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#FBEAD5] via-[#F0D6BD] to-[#D6B598] dark:from-[#38271C] dark:to-[#1C120C] shadow-clay border border-[#FBEAD5]/80 dark:border-[#FBEAD5]/10 pointer-events-none"
          />
          {/* Bottom-right large sphere */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 right-4 sm:right-12 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FBEAD5] via-[#F0D6BD] to-[#D6B598] dark:from-[#38271C] dark:to-[#1C120C] shadow-studio border border-[#FBEAD5]/80 dark:border-[#FBEAD5]/10 pointer-events-none z-20"
          />

          {/* Layer 3: Central 3D Avatar in Designer Lounge Chair */}
          <motion.div
            style={{ y: avatarY, scale: avatarScale }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] flex items-center justify-center animate-float-gentle"
          >
            <div className="relative w-full aspect-[682/1024] max-h-[560px] sm:max-h-[640px] lg:max-h-[680px]">
              <Image
                src="/images/avatar-studio.png"
                alt="Tanushree T B — Seated in Lounge Chair with Laptop"
                fill
                priority
                className="object-contain object-center filter drop-shadow-[0_25px_35px_rgba(76,53,38,0.22)] dark:drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
              />
            </div>
          </motion.div>

          {/* Layer 4: Floating Translucent Cards (Exact Match to Reference UI) */}
          
          {/* Top Right Card: "Ideas to Impact" */}
          <motion.div
            style={{ y: card1Y }}
            className="absolute top-12 sm:top-20 right-2 sm:right-8 z-20 bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-clay border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] max-w-[130px] sm:max-w-[150px]"
          >
            <span className="text-xs sm:text-sm font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] leading-tight block">
              Ideas<br />to<br />Impact
            </span>
            <div className="w-5 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mt-2" />
          </motion.div>

          {/* Middle Right Card: Checklist */}
          <motion.div
            style={{ y: card2Y }}
            className="absolute top-44 sm:top-52 right-0 sm:right-4 z-20 bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-clay border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] min-w-[125px] sm:min-w-[145px]"
          >
            <ul className="flex flex-col gap-2 text-xs font-mono font-medium text-[#4C3526] dark:text-[#FBEAD5]">
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#4C3526] dark:bg-[#FBEAD5] text-[#FBEAD5] dark:text-[#1C120C] flex items-center justify-center text-[9px] font-bold">✓</span>
                <span>Code</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#4C3526] dark:bg-[#FBEAD5] text-[#FBEAD5] dark:text-[#1C120C] flex items-center justify-center text-[9px] font-bold">✓</span>
                <span>Create</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#4C3526] dark:bg-[#FBEAD5] text-[#FBEAD5] dark:text-[#1C120C] flex items-center justify-center text-[9px] font-bold">✓</span>
                <span>Learn</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#4C3526] dark:bg-[#FBEAD5] text-[#FBEAD5] dark:text-[#1C120C] flex items-center justify-center text-[9px] font-bold">✓</span>
                <span>Repeat</span>
              </li>
            </ul>
          </motion.div>

          {/* Bottom Right: Dark Brown Book Stack & Minimal Coffee Mug (Master Prompt) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-10 sm:bottom-16 right-2 sm:right-6 z-20 flex flex-col items-end pointer-events-auto"
          >
            {/* Minimal Cream Coffee Mug */}
            <div className="mb-2 mr-4 bg-[#FBEAD5] dark:bg-[#2B1E16] rounded-lg px-2.5 py-1.5 shadow-sm text-right border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
              <span className="text-[8px] font-mono tracking-wider font-bold text-[#4C3526] dark:text-[#FBEAD5] uppercase leading-tight block">
                GOOD IDEAS<br />FUEL PROGRESS ♥
              </span>
            </div>

            {/* 4 Stacked Book Spines (Dark brown covers with warm cream typography) */}
            <div className="flex flex-col gap-1 w-36 sm:w-44">
              <div className="bg-[#4C3526] dark:bg-[#20140D] border border-[rgba(76,53,38,0.3)] px-3 py-1 rounded-md text-[10px] font-mono font-medium text-[#FBEAD5] text-center shadow-sm">
                LLMs & GenAI
              </div>
              <div className="bg-[#4C3526] dark:bg-[#20140D] border border-[rgba(76,53,38,0.3)] px-3 py-1 rounded-md text-[10px] font-mono font-medium text-[#FBEAD5] text-center shadow-sm">
                Python & AI/ML
              </div>
              <div className="bg-[#4C3526] dark:bg-[#20140D] border border-[rgba(76,53,38,0.3)] px-3 py-1 rounded-md text-[10px] font-mono font-medium text-[#FBEAD5] text-center shadow-sm">
                FastAPI & React
              </div>
              <div className="bg-[#4C3526] dark:bg-[#20140D] border border-[rgba(76,53,38,0.3)] px-3 py-1 rounded-md text-[10px] font-mono font-medium text-[#FBEAD5] text-center shadow-sm">
                DSA & SQL
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Center Scroll Indicator (Exact Match to Image) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mx-auto flex flex-col items-center gap-2 pt-6 select-none cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        {/* Mouse icon */}
        <div className="w-5 h-8 rounded-full border-2 border-[#4C3526] dark:border-[#FBEAD5] flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[#4C3526] dark:bg-[#FBEAD5]"
          />
        </div>
        <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#70533C] dark:text-[#C9A687] uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-6 h-[1.5px] bg-[#70533C] dark:bg-[#C9A687]" />
      </motion.div>
    </section>
  );
};
