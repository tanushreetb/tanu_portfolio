'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, CheckCircle2 } from 'lucide-react';

export const ResumeSection = () => {
  return (
    <section
      id="resume"
      aria-label="Resume Preview"
      className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#E9CEB3] dark:bg-[#1C120C] transition-colors relative overflow-hidden"
    >
      {/* Background Architectural Watermark Heading — Perfectly Centered for All Screen Types */}
      <div
        className="absolute top-6 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#4C3526]/[0.05] dark:text-[#FBEAD5]/[0.04] tracking-tight sm:tracking-tighter whitespace-nowrap z-0 overflow-hidden leading-none px-4"
        aria-hidden="true"
      >
        SNAPSHOT · RESUME
      </div>

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl">
          <span className="text-xs font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-2">
            SNAPSHOT
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight mb-4">
            My Resume
          </h2>
          <div className="w-12 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mb-4" />
          <p className="text-base text-[#70533C] dark:text-[#D6B598] leading-relaxed">
            A snapshot of my education, experience, technical skills, and software engineering projects.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wide text-[#FBEAD5] bg-[#4C3526] dark:bg-[#FBEAD5] dark:text-[#1C120C] shadow-md hover:scale-105 transition-all"
            >
              <span>View Resume ↗</span>
            </a>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wide text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.25)] dark:border-[rgba(240,214,189,0.25)] hover:border-[#4C3526] dark:hover:border-[#FBEAD5] transition-all hover:bg-[#F0D6BD]/50 dark:hover:bg-[#2B1E16]"
            >
              <span>Download Resume ↓</span>
            </button>
          </div>
        </div>

        {/* Styled Document Preview */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-3xl bg-[#F0D6BD]/90 dark:bg-[#2B1E16]/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-studio text-left flex flex-col"
        >
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] mb-8 gap-4">
            <div>
              <h3 className="text-3xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5]">
                Tanushree T B
              </h3>
              <p className="text-xs font-mono text-[#8F6E54] dark:text-[#C9A687] tracking-wider uppercase mt-1">
                Computer Science Engineer · AI/ML & Full-Stack Developer
              </p>
            </div>
            <div className="text-right text-xs font-mono text-[#70533C] dark:text-[#D6B598] space-y-0.5">
              <p>tanushree251105@gmail.com</p>
              <p>+91 7603973955 · Dharmapuri, TN</p>
              <p>linkedin.com/in/tanushree-t-b-74b730317</p>
              <p>github.com/tanushree-tb</p>
            </div>
          </div>

          {/* Education Block */}
          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-3 pb-1 border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
              Education
            </h4>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm font-display font-bold text-[#4C3526] dark:text-[#FBEAD5]">
                B.E Computer Science and Engineering — Sona College of Technology, Salem
              </span>
              <span className="text-xs font-mono text-[#8F6E54] dark:text-[#C9A687]">
                09/2023 – 06/2027 (CGPA: 7.95/10)
              </span>
            </div>
            <p className="text-xs text-[#70533C] dark:text-[#D6B598]">
              HSC: Dr Krishna Vikas Matric Hr. Sec School, Dharmapuri (88.8%) · SSLC: Dr Krishna Vikas Matric Hr. Sec School (2020–2021)
            </p>
          </div>

          {/* Technical Skills Block */}
          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-3 pb-1 border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
              Skills & Core Competencies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5] block mb-1">Languages:</span>
                <span className="text-[#70533C] dark:text-[#D6B598]">Python, Java</span>
              </div>
              <div>
                <span className="font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5] block mb-1">AI / ML & APIs:</span>
                <span className="text-[#70533C] dark:text-[#D6B598]">LLMs (Qwen 2.5, MedGemma, Gemini), NLP, FastAPI, Kafka, PySpark</span>
              </div>
              <div>
                <span className="font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5] block mb-1">Web & DB:</span>
                <span className="text-[#70533C] dark:text-[#D6B598]">React.js, Next.js, HTML, CSS, SQL (Joins, Normalization), MongoDB</span>
              </div>
            </div>
          </div>

          {/* Key Experience */}
          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-3 pb-1 border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
              Internship Experience
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-baseline font-mono font-semibold text-[#4C3526] dark:text-[#FBEAD5]">
                  <span>Data Science & GenAI Intern — Innovexis Pvt. Ltd.</span>
                  <span className="text-[#8F6E54] dark:text-[#C9A687]">11/2025 – 12/2025</span>
                </div>
                <p className="text-[#70533C] dark:text-[#D6B598] mt-0.5">
                  Collaborated on developing web-integrated machine learning applications using Python. Structured datasets for backend model integration and delivered automation-focused solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-3 pb-1 border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
              Key Projects
            </h4>
            <div className="space-y-2 text-xs text-[#70533C] dark:text-[#D6B598]">
              <div>
                <span className="font-bold text-[#4C3526] dark:text-[#FBEAD5]">CareEase AI — Integrated Hospital Operations Ecosystem:</span>
                {' '}FastAPI, React, Kafka, PySpark, LLMs (Qwen 2.5, MedGemma, Gemini). AI discharge assistant with regional audio, M/M/c queuing, and real-time streaming vital alerts.
              </div>
              <div>
                <span className="font-bold text-[#4C3526] dark:text-[#FBEAD5]">Multilingual Chatbot for College Scholarship Queries:</span>
                {' '}Python, NLP, Next.js, LLM (Qwen 2.5). Automated scholarship query handling with multilingual regional accessibility and structured conversational workflows.
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#4C3526] dark:text-[#FBEAD5] uppercase mb-2 pb-1 border-b border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
              Certifications
            </h4>
            <p className="text-xs text-[#70533C] dark:text-[#D6B598]">
              • Programming in Python · SQL Fundamentals · Cloud Computing Basics · Machine Learning With AI · Programming in Java
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
