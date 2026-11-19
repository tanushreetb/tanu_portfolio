'use client';

import React from 'react';
import { SmoothScrollNav, NavSection } from '@/components/shared/SmoothScrollNav';
import { LeftVerticalStepper } from '@/components/shared/LeftVerticalStepper';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { SmoothScrollProvider } from '@/components/shared/SmoothScrollProvider';
import { KineticMarquee } from '@/components/shared/KineticMarquee';
import { IntegratedHero } from '@/components/portfolio/IntegratedHero';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { SkillsVisualization } from '@/components/portfolio/SkillsVisualization';
import { ProjectsShowcase } from '@/components/portfolio/ProjectsShowcase';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { AchievementsSection } from '@/components/portfolio/AchievementsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { Footer } from '@/components/shared/Footer';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const sections: NavSection[] = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'contact', label: 'CONTACT' },
];

export const PortfolioShell: React.FC = () => {
  const sectionIds = sections.map((s) => s.id);
  const activeSection = useScrollSpy({
    sectionIds,
    offset: 120,
  });

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -40, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <SmoothScrollProvider>
      {/* 1.5s Minimalist Luxury Loading Screen */}
      <LoadingScreen />

      {/* Smooth Spring Custom Cursor with Contextual States */}
      <CustomCursor />

      {/* Floating Transparent/White Header Navigation */}
      <SmoothScrollNav sections={sections} activeSection={activeSection} />

      {/* Fixed Left Vertical Timeline Journey Stepper */}
      <LeftVerticalStepper activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Single-Page Flow */}
      <main id="main-content" className="w-full relative min-h-screen bg-[#E9CEB3] dark:bg-[#1C120C] text-[#4C3526] dark:text-[#FBEAD5] transition-colors">
        {/* 01 · Hero Section */}
        <IntegratedHero />

        {/* Dynamic Kinetic Marquee Stream */}
        <KineticMarquee />

        {/* 02 · About Section */}
        <AboutSection />

        {/* 03 · Skills Section with Architectural Matrix */}
        <SkillsVisualization />

        {/* 04 · Selected Projects with Asymmetric Layouts & Case Studies */}
        <ProjectsShowcase />

        {/* Dynamic Kinetic Marquee Stream (Reverse) */}
        <KineticMarquee reverse={true} speed={42} />

        {/* 05 · Hands-on Experience Timeline */}
        <ExperienceSection />

        {/* 06 · Achievements & Activities */}
        <AchievementsSection />

        {/* 07 · Contact Section */}
        <ContactSection />

        {/* Minimal Luxury Footer */}
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
};
