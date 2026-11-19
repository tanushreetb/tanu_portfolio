'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';

export const ExperienceSection = () => {
  const experiences = [
    {
      role: 'Data Science & GenAI Intern',
      company: 'Innovexis Pvt. Ltd.',
      period: '11/2025 – 12/2025',
      description: 'Collaborated on developing web-integrated machine learning applications using Python. Built structured processing workflows, processed datasets for backend model integration, and delivered project milestones within defined timelines.',
      technologies: ['Python', 'GenAI', 'Machine Learning', 'Data Structuring', 'REST APIs', 'Automation Workflows'],
      highlights: [
        'Collaborated on developing web-integrated machine learning applications using Python.',
        'Processed and structured datasets for backend model integration and AI-driven workflows.',
        'Contributed to automation-focused solutions using structured processing workflows.',
        'Worked with team members to develop and deliver project milestones within defined timelines.',
      ],
    },
    {
      role: 'AI & Full-Stack Systems Lead',
      company: 'Academic & Applied Engineering Initiatives',
      period: '09/2023 – Present',
      description: 'Architecting end-to-end intelligent systems including CareEase AI (Hospital Operations Ecosystem) and the Multilingual College Scholarship Chatbot. Integrating LLMs, streaming architectures, and REST microservices.',
      technologies: ['FastAPI', 'React', 'Kafka', 'PySpark (Databricks)', 'LLMs (Qwen 2.5, MedGemma, Gemini)', 'NLP'],
      highlights: [
        'Built an AI-powered discharge assistant extracting diagnoses and medication schedules from PDF/TXT documents with regional-language audio output.',
        'Designed an M/M/c queuing engine for hospital OPD wait-time prediction and intelligent patient routing.',
        'Implemented Kafka and PySpark streaming workflows for real-time patient vital monitoring and automated threshold alerts.',
        'Constructed multilingual conversational query handling workflows for college scholarship systems.',
      ],
    },
  ];

  return (
    <section
      id="experience"
      aria-label="Experience Timeline"
      className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#E9CEB3] dark:bg-[#1C120C] transition-colors relative overflow-hidden"
    >
      {/* Background Architectural Watermark Heading — Perfectly Centered for All Screen Types */}
      <div
        className="absolute top-6 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#4C3526]/[0.05] dark:text-[#FBEAD5]/[0.04] tracking-tight sm:tracking-tighter whitespace-nowrap z-0 overflow-hidden leading-none px-4"
        aria-hidden="true"
      >
        05 · EXPERIENCE
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col relative z-10">
        
        {/* Section Header (Centered for All Screens) */}
        <div className="flex flex-col items-center text-center mx-auto mb-16 max-w-2xl">
          <span className="text-xs font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-2">
            05 · EXPERIENCE
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight mb-4">
            Hands-on experience<br />
            <span className="text-[#70533C] dark:text-[#D6B598] font-normal">in real-world development.</span>
          </h2>
          <div className="w-12 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mb-4 mx-auto" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[rgba(76,53,38,0.22)] dark:border-[rgba(240,214,189,0.22)] ml-4 sm:ml-8 pl-8 sm:pl-12 flex flex-col gap-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-5 h-5 rounded-full bg-[#FBEAD5] dark:bg-[#2B1E16] border-2 border-[#4C3526] dark:border-[#FBEAD5] flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#4C3526] dark:bg-[#FBEAD5]" />
              </div>

              {/* Content Card */}
              <div className="bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay hover:shadow-studio transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold tracking-wider text-[#8F6E54] dark:text-[#C9A687] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span className="text-xs font-mono font-semibold tracking-wider text-[#4C3526] dark:text-[#FBEAD5] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#8F6E54] dark:text-[#C9A687]" />
                    {exp.company}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-4">
                  {exp.role}
                </h3>

                <p className="text-base text-[#70533C] dark:text-[#D6B598] leading-relaxed mb-6">
                  {exp.description}
                </p>

                <div className="flex flex-col gap-2 mb-6">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-[#4C3526] dark:text-[#FBEAD5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4C3526] dark:bg-[#FBEAD5] mt-2 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
                  {exp.technologies.map(t => (
                    <span key={t} className="text-xs font-mono font-medium text-[#4C3526] dark:text-[#FBEAD5] px-2.5 py-1 rounded bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
