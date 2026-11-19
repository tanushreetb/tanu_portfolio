'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Cpu, 
  Database, 
  GitBranch, 
  Terminal, 
  Globe, 
  Brain, 
  Sparkles, 
  ArrowUpRight,
  Workflow
} from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  category: 'frontend' | 'programming' | 'ai' | 'database' | 'backend';
  role: string;
  level: string;
  application: string;
  concepts: string[];
  codeHighlight: string;
  icon: React.ElementType;
}

export const SkillsVisualization: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTechId, setActiveTechId] = useState<string>('react');

  const categories = [
    { id: 'all', label: 'ALL DISCIPLINES' },
    { id: 'ai', label: 'AI & LLMS' },
    { id: 'backend', label: 'BACKEND & APIS' },
    { id: 'frontend', label: 'FRONTEND & WEB' },
    { id: 'database', label: 'DATABASES & CORE' },
  ];

  const technologies: TechNode[] = [
    {
      id: 'python',
      name: 'Python',
      category: 'ai',
      role: 'AI/ML, Automation Workflows & Scripting',
      level: 'Core Proficiency',
      application: 'Powers CareEase AI, Multilingual Chatbot & Innovexis ML Applications',
      concepts: ['Machine Learning', 'NLP & LLM Orchestration', 'Data Structuring', 'Automation Workflows'],
      codeHighlight: 'from fastapi import FastAPI\nimport pySpark, requests',
      icon: Terminal,
    },
    {
      id: 'llms',
      name: 'LLMs & Intelligent Agents',
      category: 'ai',
      role: 'Generative AI & Conversational Automation',
      level: 'Advanced GenAI',
      application: 'Orchestrates Qwen 2.5, MedGemma, and Gemini for clinical & scholarship bots',
      concepts: ['Qwen 2.5 & MedGemma', 'Prompt Engineering', 'Document Entity Extraction', 'Multilingual Workflows'],
      codeHighlight: 'response = llm.generate(prompt=clinical_doc, context=patient_history)',
      icon: Brain,
    },
    {
      id: 'fastapi',
      name: 'FastAPI & REST APIs',
      category: 'backend',
      role: 'High-Performance Asynchronous Microservices',
      level: 'Microservice Design',
      application: 'Powers CareEase AI multi-service hospital management platform backend',
      concepts: ['Asynchronous Endpoints', 'Role-Based Authentication', 'Pydantic Data Contracts', 'Swagger Docs'],
      codeHighlight: '@app.post("/api/v1/discharge/extract")\nasync def process_summary(...)',
      icon: Cpu,
    },
    {
      id: 'react',
      name: 'React.js & Next.js',
      category: 'frontend',
      role: 'Dynamic Responsive Interfaces & Web Apps',
      level: 'Modern Architecture',
      application: 'Drives Multilingual Chatbot UI, CareEase Hospital dashboards & Portfolio',
      concepts: ['Component Architecture', 'Hooks & State Management', 'Server Components', 'Accessible UX'],
      codeHighlight: '<ChatInterface model="qwen-2.5" language="ta" />',
      icon: Globe,
    },
    {
      id: 'kafka',
      name: 'Kafka & PySpark',
      category: 'backend',
      role: 'Real-Time Streaming & Telemetry Alerts',
      level: 'Distributed Streams',
      application: 'Ingests patient vitals and processes real-time alert thresholds on Databricks',
      concepts: ['Kafka Topic Pub/Sub', 'PySpark Streaming', 'Databricks Workflows', 'Threshold Alerting'],
      codeHighlight: 'stream = spark.readStream.format("kafka").option("subscribe", "vitals")',
      icon: Workflow,
    },
    {
      id: 'sql',
      name: 'SQL (Relational DB)',
      category: 'database',
      role: 'Relational Schema Modeling & Query Optimization',
      level: 'Data Persistence',
      application: 'Structured hospital schemas, joins, subqueries, and database normalization',
      concepts: ['Complex Joins', 'Subqueries', 'Database Normalization', 'ACID Transactions'],
      codeHighlight: 'SELECT p.name, v.heart_rate FROM patients p JOIN vitals v ON p.id = v.pid',
      icon: Database,
    },
    {
      id: 'mongodb',
      name: 'MongoDB (NoSQL)',
      category: 'database',
      role: 'Document Modeling & Schema Validation',
      level: 'Document Storage',
      application: 'Scalable document persistence for chat workflows, logs, and telemetry schemas',
      concepts: ['Document Modeling', 'JSON Aggregation', 'Indexing', 'Schema Validation'],
      codeHighlight: 'db.chat_sessions.updateOne({ id: sessionId }, { $push: { messages } })',
      icon: Layers,
    },
    {
      id: 'java',
      name: 'Java & Core CS',
      category: 'database',
      role: 'Object-Oriented Design & System Foundations',
      level: 'Foundational CS',
      application: 'Object-oriented architecture patterns, algorithms, and DBMS fundamentals',
      concepts: ['OOPS Principles', 'DSA Fundamentals', 'DBMS Concepts', 'Embedding Basics'],
      codeHighlight: 'public class HospitalDispatcher implements RoutingEngine { ... }',
      icon: Code2,
    },
  ];

  const filteredTechs = selectedCategory === 'all'
    ? technologies
    : technologies.filter((t) => t.category === selectedCategory);

  const activeTech = technologies.find((t) => t.id === activeTechId) || technologies[0];
  const ActiveIcon = activeTech.icon;

  const pipelineStages = [
    { title: '01 · Semantic UI', desc: 'HTML · CSS · React.js · Next.js' },
    { title: '02 · Backend Services', desc: 'FastAPI · REST APIs · Async' },
    { title: '03 · Stream Telemetry', desc: 'Kafka · PySpark (Databricks)' },
    { title: '04 · Data Layers', desc: 'SQL Joins & Normalization · MongoDB' },
    { title: '05 · Applied GenAI', desc: 'LLMs (Qwen 2.5, MedGemma) · NLP' },
  ];

  return (
    <section
      id="skills"
      aria-label="Skills & Technologies"
      className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#E9CEB3] dark:bg-[#1C120C] transition-colors relative overflow-hidden"
    >
      {/* Background Architectural Watermark Heading — Perfectly Centered for All Screen Types */}
      <div
        className="absolute top-6 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#4C3526]/[0.05] dark:text-[#FBEAD5]/[0.04] tracking-tight sm:tracking-tighter whitespace-nowrap z-0 overflow-hidden leading-none px-4"
        aria-hidden="true"
      >
        03 · SKILLS
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col relative z-10">
        
        {/* Section Header (Centered for All Screens) */}
        <div className="flex flex-col items-center text-center mx-auto mb-12 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-2">
            03 · SKILLS & TECHNOLOGIES
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight mb-4">
            Tools I use to turn ideas<br />
            <span className="text-[#70533C] dark:text-[#D6B598] font-normal">into working experiences.</span>
          </h2>
          <div className="w-12 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mb-4 mx-auto" />
          <p className="text-base sm:text-lg text-[#70533C] dark:text-[#D6B598] leading-relaxed max-w-2xl mx-auto">
            An interactive engineering matrix of the core technologies, frameworks, and architectural principles applied across my software and machine learning projects.
          </p>
        </div>

        {/* Category Filter Pills (Centered) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                  isSelected
                    ? 'bg-[#4C3526] text-[#FBEAD5] dark:bg-[#FBEAD5] dark:text-[#1C120C] shadow-sm font-bold scale-[1.02]'
                    : 'bg-[#F0D6BD]/80 dark:bg-[#2B1E16] text-[#70533C] dark:text-[#D6B598] border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] hover:border-[#4C3526] dark:hover:border-[#FBEAD5]'
                }`}
                aria-pressed={isSelected}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Matrix Layout (Two Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Left Column: Interactive Tactile Tech Cards Grid (8 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredTechs.map((tech) => {
                const Icon = tech.icon;
                const isActive = activeTechId === tech.id;

                return (
                  <motion.div
                    key={tech.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setActiveTechId(tech.id)}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all relative overflow-hidden group ${
                      isActive
                        ? 'bg-[#FBEAD5] dark:bg-[#38271C] border-[#4C3526] dark:border-[#FBEAD5] shadow-studio scale-[1.02]'
                        : 'bg-[#F0D6BD]/80 dark:bg-[#2B1E16]/80 border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] hover:bg-[#F0D6BD] dark:hover:bg-[#2B1E16] hover:border-[#4C3526]'
                    }`}
                  >
                    {/* Top Row: Icon + Level Badge */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[#4C3526] text-[#FBEAD5] dark:bg-[#FBEAD5] dark:text-[#1C120C]'
                          : 'bg-[#FBEAD5] text-[#4C3526] dark:bg-[#38271C] dark:text-[#FBEAD5]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-[#8F6E54] dark:text-[#C9A687]">
                        {tech.level}
                      </span>
                    </div>

                    {/* Tech Name */}
                    <h3 className="text-lg font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-1 group-hover:translate-x-0.5 transition-transform">
                      {tech.name}
                    </h3>

                    {/* Subtitle / Role */}
                    <p className="text-xs text-[#70533C] dark:text-[#D6B598] line-clamp-1 mb-3">
                      {tech.role}
                    </p>

                    {/* Footer Application Indicator */}
                    <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-[rgba(76,53,38,0.12)] dark:border-[rgba(240,214,189,0.12)]">
                      <span className="text-[#8F6E54] dark:text-[#C9A687] truncate max-w-[170px]">
                        {tech.application.split(' ')[0]} {tech.application.split(' ')[1]}
                      </span>
                      <span className="text-[#4C3526] dark:text-[#FBEAD5] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        Inspect <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Deep-Dive Tech Inspector (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <motion.div
              key={activeTech.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F0D6BD] dark:bg-[#2B1E16] border border-[rgba(76,53,38,0.22)] dark:border-[rgba(240,214,189,0.22)] rounded-2xl p-6 sm:p-7 shadow-studio flex flex-col relative overflow-hidden"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3 pb-5 border-b border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.15)] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#4C3526] text-[#FBEAD5] dark:bg-[#FBEAD5] dark:text-[#1C120C] flex items-center justify-center shadow-sm">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-semibold tracking-wider text-[#8F6E54] dark:text-[#C9A687] uppercase">
                      INSPECTOR
                    </span>
                    <h3 className="text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5]">
                      {activeTech.name}
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#FBEAD5] dark:bg-[#38271C] text-[#4C3526] dark:text-[#FBEAD5] font-semibold uppercase">
                  {activeTech.level}
                </span>
              </div>

              {/* Core Role Statement */}
              <div className="mb-5">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8F6E54] dark:text-[#C9A687] block mb-1">
                  ENGINEERING PURPOSE
                </span>
                <p className="text-sm font-medium text-[#4C3526] dark:text-[#FBEAD5] leading-relaxed">
                  {activeTech.role}
                </p>
              </div>

              {/* Real-World Application */}
              <div className="mb-5 p-3.5 rounded-xl bg-[#FBEAD5]/70 dark:bg-[#38271C]/70 border border-[rgba(76,53,38,0.12)] dark:border-[rgba(240,214,189,0.12)]">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8F6E54] dark:text-[#C9A687] block mb-1">
                  PROJECT APPLICATION
                </span>
                <p className="text-xs text-[#70533C] dark:text-[#D6B598] leading-relaxed">
                  {activeTech.application}
                </p>
              </div>

              {/* Concepts Mastered */}
              <div className="mb-5">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8F6E54] dark:text-[#C9A687] block mb-2">
                  KEY PRINCIPLES & CAPABILITIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTech.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#E9CEB3] dark:bg-[#1C120C] text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.15)]"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture Code Snippet */}
              <div className="mt-auto pt-4 border-t border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.15)]">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8F6E54] dark:text-[#C9A687] block mb-1.5">
                  SYNTAX / ARCHITECTURE CALL
                </span>
                <code className="block text-xs font-mono p-3 rounded-lg bg-[#1C120C] text-[#FBEAD5] dark:bg-[#150D08] dark:text-[#FBEAD5] overflow-x-auto shadow-inner">
                  {activeTech.codeHighlight}
                </code>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Architecture Pipeline Flow Banner */}
        <div className="bg-[#F0D6BD]/80 dark:bg-[#2B1E16]/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Workflow className="w-4 h-4 text-[#4C3526] dark:text-[#FBEAD5]" />
            <span className="text-[11px] font-mono tracking-[0.22em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold">
              FULL-STACK ENGINEERING LIFECYCLE FLOW
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pipelineStages.map((stage, idx) => (
              <div
                key={stage.title}
                className="p-4 rounded-xl bg-[#FBEAD5]/60 dark:bg-[#38271C]/60 border border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.15)] flex flex-col hover:border-[#4C3526] transition-colors"
              >
                <span className="text-xs font-mono font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-1">
                  {stage.title}
                </span>
                <span className="text-[11px] text-[#70533C] dark:text-[#D6B598]">
                  {stage.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
