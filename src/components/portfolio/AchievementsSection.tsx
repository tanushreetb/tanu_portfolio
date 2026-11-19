'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, GraduationCap, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AchievementsSection = () => {
  const achievements = [
    {
      icon: GraduationCap,
      tag: 'ACADEMIC EXCELLENCE',
      title: 'B.E in Computer Science & Engineering',
      subtitle: 'Sona College of Technology, Salem · CGPA: 7.95/10',
      description: 'Maintaining a strong academic record (Till 6th Semester) with solid foundations in OOPS, DSA, DBMS, AI/ML, and Full-Stack Engineering. Graduated HSC from Dr Krishna Vikas Matric Hr. Sec School with 88.8%.',
      year: '2023 – 2027',
    },
    {
      icon: ShieldCheck,
      tag: 'PROFESSIONAL CREDENTIALS',
      title: 'Industry Certifications in AI & Computing',
      subtitle: 'Python · Java · SQL · ML with AI · Cloud Computing',
      description: 'Earned foundational industry certifications covering Programming in Python, Programming in Java, SQL Fundamentals, Machine Learning With AI, and Cloud Computing Basics.',
      year: '2024 – 2025',
    },
    {
      icon: Trophy,
      tag: 'PROJECT INNOVATION',
      title: 'CareEase AI & Multilingual Chatbot',
      subtitle: 'Integrated Hospital Operations & Campus Accessibility',
      description: 'Pioneered an integrated hospital operations platform with M/M/c queuing, real-time Kafka/PySpark vital monitoring, and an AI discharge assistant with regional audio output, alongside a multilingual scholarship chatbot.',
      year: '2025 – 2026',
    },
  ];

  const certificationsList = [
    { name: 'Programming in Python', issuer: 'Certified Foundation', icon: '🐍' },
    { name: 'Machine Learning With AI', issuer: 'Advanced Competency', icon: '🧠' },
    { name: 'Cloud Computing Basics', issuer: 'Infrastructure & Cloud', icon: '☁️' },
    { name: 'SQL Fundamentals', issuer: 'Relational DB & Queries', icon: '🗄️' },
    { name: 'Programming in Java', issuer: 'OOP & Architecture', icon: '☕' },
  ];

  return (
    <section
      id="achievements"
      aria-label="Achievements and Activities"
      className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#D6B598]/25 dark:bg-[#1C120C] transition-colors relative overflow-hidden"
    >
      {/* Background Architectural Watermark Heading — Perfectly Centered for All Screen Types */}
      <div
        className="absolute top-6 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#4C3526]/[0.05] dark:text-[#FBEAD5]/[0.04] tracking-tight sm:tracking-tighter whitespace-nowrap z-0 overflow-hidden leading-none px-4"
        aria-hidden="true"
      >
        06 · ACHIEVEMENTS
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col relative z-10">
        
        {/* Section Header (Centered for All Screens) */}
        <div className="flex flex-col items-center text-center mx-auto mb-16 max-w-2xl">
          <span className="text-xs font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-2">
            06 · ACHIEVEMENTS & CERTIFICATIONS
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight mb-4">
            Milestones and credentials<br />
            <span className="text-[#70533C] dark:text-[#D6B598] font-normal">earned through dedication.</span>
          </h2>
          <div className="w-12 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mb-4 mx-auto" />
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md p-8 rounded-3xl border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay hover:shadow-studio flex flex-col justify-between transition-all hover:scale-[1.01]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] flex items-center justify-center text-[#4C3526] dark:text-[#FBEAD5] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8F6E54] dark:text-[#C9A687]">
                      {item.year}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-[#8F6E54] dark:text-[#C9A687] uppercase block mb-2">
                    {item.tag}
                  </span>

                  <h3 className="text-xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-1 leading-snug">
                    {item.title}
                  </h3>

                  <h4 className="text-xs font-mono text-[#70533C] dark:text-[#E1C3A7] font-semibold mb-4">
                    {item.subtitle}
                  </h4>

                  <p className="text-sm text-[#70533C] dark:text-[#D6B598] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Showcase Row */}
        <div className="bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay flex flex-col">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.22em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-bold block mb-1">
                VALIDATED TECHNICAL EXPERTISE
              </span>
              <h3 className="text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5]">
                Verified Certifications
              </h3>
            </div>
            <span className="text-xs font-mono font-semibold text-[#8F6E54] dark:text-[#C9A687] px-3 py-1 rounded-full bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)]">
              5 Certifications Completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {certificationsList.map((cert) => (
              <div
                key={cert.name}
                className="p-4 rounded-2xl bg-[#FBEAD5]/80 dark:bg-[#38271C]/80 border border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.15)] flex flex-col items-start gap-2 shadow-sm hover:border-[#4C3526] transition-colors"
              >
                <span className="text-2xl">{cert.icon}</span>
                <span className="text-sm font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] leading-tight">
                  {cert.name}
                </span>
                <span className="text-[10px] font-mono text-[#8F6E54] dark:text-[#C9A687]">
                  {cert.issuer}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
