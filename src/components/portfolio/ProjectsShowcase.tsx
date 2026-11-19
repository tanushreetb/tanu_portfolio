'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProjectCaseStudyModal, ProjectDetail } from './ProjectCaseStudyModal';

export const projectsData: ProjectDetail[] = [
  {
    id: 'careease-ai',
    number: '01',
    title: 'CareEase AI — Integrated Hospital Operations Ecosystem',
    highlight: 'AI & Distributed Systems',
    description: 'A multi-service hospital management platform featuring role-based interfaces, FastAPI services, M/M/c queuing for OPD wait-time prediction, an AI discharge assistant with regional audio output, and Kafka/PySpark streaming vital monitoring.',
    technologies: ['Python', 'FastAPI', 'React', 'Kafka', 'PySpark (Databricks)', 'LLMs (Qwen 2.5, MedGemma, Gemini)'],
    github: 'https://github.com/tanushree-tb',
    overview: 'Full-scale healthcare operations platform architected with microservice backends, generative clinical assistance, and distributed real-time streaming workflows.',
    problem: 'Hospitals experience severe OPD congestion, lengthy discharge delays, communication barriers for regional-language patients, and fragmented tracking of vital signs across wards.',
    solution: 'Engineered a unified ecosystem with role-based interfaces, FastAPI backend services, an M/M/c queuing engine for queue optimization, an LLM discharge assistant extracting diagnoses and medication schedules with regional audio output, and Kafka-PySpark streaming for patient vitals.',
    architecture: 'React Frontend -> FastAPI Microservices -> LLM Inference Layer (Qwen 2.5, MedGemma, Gemini) -> Kafka Stream Ingestion -> PySpark Databricks Processing -> Alert & Storage Engine.',
    challenges: 'Extracting structured medication schedules reliably from diverse PDF/TXT clinical notes, maintaining low latency on streaming patient telemetry, and accurate OPD queue prediction.',
    results: 'Automated clinical document parsing into structured medication schedules, generated regional-language audio instructions for patients, predicted OPD wait times, and triggered real-time vital threshold alerts.',
    learnings: 'Mastered distributed streaming workflows with Kafka & Databricks, clinical LLM orchestration with MedGemma and Gemini, and building robust FastAPI microservices.',
  },
  {
    id: 'multilingual-chatbot',
    number: '02',
    title: 'Multilingual Chatbot for College Students Scholarship Queries',
    highlight: 'Generative AI & NLP',
    description: 'An AI-powered conversational chatbot automating scholarship-related query handling for college students, featuring multilingual support for regional accessibility and structured conversational workflows.',
    technologies: ['Python', 'NLP', 'Next.js', 'LLM (Qwen 2.5)'],
    github: 'https://github.com/tanushree-tb',
    overview: 'AI-driven educational accessibility platform designed to resolve complex scholarship questions, eligibility criteria, and application processes in regional languages.',
    problem: 'Students frequently miss scholarship deadlines or struggle with complex bureaucratic eligibility requirements due to lack of immediate administrative guidance and language barriers.',
    solution: 'Developed an automated conversational chatbot using Next.js and Python that integrates Qwen 2.5 LLM reasoning with NLP workflows to deliver accurate, localized guidance.',
    architecture: 'Next.js Conversational UI -> Python NLP Engine -> Prompt & Context Orchestrator -> Qwen 2.5 LLM Inference -> Multilingual Localization Layer.',
    challenges: 'Ensuring high factual accuracy against complex scholarship criteria and maintaining seamless conversational fluency across multiple regional languages.',
    results: 'Streamlined scholarship query handling for college students, improved accessibility for non-English speakers, and eliminated response inconsistency through structured conversational workflows.',
    learnings: 'Deepened expertise in prompt engineering, LLM workflow structuring, multilingual NLP tokenization, and building rapid-response Next.js chat interfaces.',
  },
  {
    id: 'careease-discharge-assistant',
    number: '03',
    title: 'CareEase AI Discharge Assistant & Regional Audio Engine',
    highlight: 'Clinical GenAI & Audio',
    description: 'An intelligent clinical assistant extracting diagnoses and medication regimens from medical PDF/TXT documents, translating summaries into regional languages with audio output.',
    technologies: ['Python', 'MedGemma', 'Qwen 2.5', 'NLP', 'TTS', 'FastAPI'],
    github: 'https://github.com/tanushree-tb',
    overview: 'Specialized clinical NLP sub-system of CareEase AI, designed to ensure patients understand their discharge instructions and medication schedules.',
    problem: 'Discharge paperwork is dense with technical medical terms, leading to confusion, incorrect dosage administration, and readmissions, especially for regional-language speakers.',
    solution: 'Leveraged MedGemma and Qwen 2.5 to extract structured diagnoses and dosage tables from clinical documents, coupled with automated regional audio synthesis for accessibility.',
    architecture: 'Document Ingestion -> Text & PDF Parser -> Clinical LLM Entity Extraction -> Medication Regimen Structuring -> Regional Audio Synthesizer.',
    challenges: 'Preventing medical hallucinations in critical dosage schedules and generating natural, phonetically accurate pronunciations of medication names in regional languages.',
    results: 'Achieved high fidelity in medication extraction and generated clear regional-language audio instructions for patients and caregivers.',
    learnings: 'Gained hands-on mastery of specialized medical LLMs, clinical document structuring, and accessible assistive technology design.',
  },
  {
    id: 'vital-monitoring-streaming',
    number: '04',
    title: 'Real-Time Patient Vital Telemetry & Streaming Alerts',
    highlight: 'Kafka & PySpark Streaming',
    description: 'A distributed data pipeline ingesting continuous patient vital sensor streams, calculating rolling metrics on Databricks, and dispatching automated threshold-based emergency alerts.',
    technologies: ['Kafka', 'PySpark', 'Databricks', 'Python', 'FastAPI'],
    github: 'https://github.com/tanushree-tb',
    overview: 'Distributed telemetry engine built for CareEase AI to provide real-time physiological monitoring across hospital care units.',
    problem: 'Delayed detection of critical vital fluctuations (heart rate spikes, oxygen drops) in busy hospital wards can lead to preventable patient crises.',
    solution: 'Implemented Apache Kafka for high-throughput sensor telemetry ingestion and PySpark on Databricks for real-time windowed threshold monitoring and instant alert dispatch.',
    architecture: 'Sensor Telemetry -> Apache Kafka Topics -> PySpark Streaming (Databricks) -> Sliding Window Threshold Engine -> Real-Time Alert Dispatcher.',
    challenges: 'Handling out-of-order sensor packets and backpressure during high-load event bursts without dropping vital telemetry data.',
    results: 'Enabled sub-second anomaly detection with automated alert routing to attending medical personnel.',
    learnings: 'Mastered distributed streaming architectures, Databricks PySpark pipelines, and fault-tolerant event processing.',
  },
  {
    id: 'data-science-genai-internship',
    number: '05',
    title: 'Web-Integrated Machine Learning & Automation Workflows',
    highlight: 'Innovexis Pvt. Ltd. Internship',
    description: 'Production-ready web-integrated machine learning applications, dataset structuring pipelines, and automation-focused processing workflows developed during industry internship.',
    technologies: ['Python', 'Machine Learning', 'GenAI', 'REST APIs', 'Data Processing'],
    github: 'https://github.com/tanushree-tb',
    overview: 'Industry internship engineering at Innovexis Pvt. Ltd., collaborating on web-integrated ML applications and automation workflows.',
    problem: 'Raw production datasets require rigorous cleaning, validation, and structuring before they can reliably power backend model integration and automated workflows.',
    solution: 'Collaborated on developing web-integrated ML applications in Python, structured datasets for seamless model integration, and delivered automation-focused processing workflows within defined milestones.',
    architecture: 'Data Ingestion -> Python Structuring Pipeline -> Model Integration Layer -> Backend API Services -> Automation Workflow.',
    challenges: 'Designing adaptable data schemas that accommodate evolving model requirements while maintaining milestone delivery schedules.',
    results: 'Successfully delivered robust dataset structuring workflows and web-integrated ML applications within defined project timelines.',
    learnings: 'Developed deep practical knowledge of collaborative Agile development, production ML integration, and automation workflows.',
  },
];

export const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Selected Projects"
      className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#D6B598]/25 dark:bg-[#1C120C] transition-colors relative overflow-hidden"
    >
      {/* Background Architectural Watermark Heading — Perfectly Centered for All Screen Types */}
      <div
        className="absolute top-6 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#4C3526]/[0.05] dark:text-[#FBEAD5]/[0.04] tracking-tight sm:tracking-tighter whitespace-nowrap z-0 overflow-hidden leading-none px-4"
        aria-hidden="true"
      >
        04 · PROJECTS
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col relative z-10">
        
        {/* Section Header (Centered for All Screens) */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mx-auto mb-16 max-w-2xl"
        >
          <span className="text-xs font-mono tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase font-semibold mb-2">
            04 · SELECTED PROJECTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] tracking-tight mb-4">
            A collection of things I've built,<br />
            <span className="text-[#70533C] dark:text-[#D6B598] font-normal">explored and learned from.</span>
          </h2>
          <div className="w-12 h-[1.5px] bg-[#4C3526] dark:bg-[#FBEAD5] mb-4 mx-auto" />
        </motion.div>

        {/* Asymmetrical Project Grid */}
        <div className="flex flex-col gap-10">
          
          {/* Project 01: Large Highlight Area */}
          {projectsData[0] && (
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.01 }}
              onClick={() => setSelectedProject(projectsData[0])}
              className="group bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay hover:shadow-studio cursor-pointer transition-all duration-300"
              data-cursor="view"
            >
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5]">
                    {projectsData[0].number}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-[#FBEAD5] dark:bg-[#38271C] text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.18)]">
                    {projectsData[0].highlight}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[rgba(76,53,38,0.25)] dark:border-[rgba(240,214,189,0.25)] group-hover:bg-[#4C3526] group-hover:text-[#FBEAD5] dark:group-hover:bg-[#FBEAD5] dark:group-hover:text-[#1C120C] flex items-center justify-center text-[#4C3526] dark:text-[#FBEAD5] transition-all group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-4 group-hover:translate-x-1 transition-transform">
                {projectsData[0].title}
              </h3>
              <p className="text-base text-[#70533C] dark:text-[#D6B598] max-w-2xl leading-relaxed mb-6">
                {projectsData[0].description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
                {projectsData[0].technologies.map(t => (
                  <span key={t} className="text-xs font-mono font-medium text-[#4C3526] dark:text-[#FBEAD5] px-2.5 py-1 rounded-md bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project 02 & 03: Asymmetric 2-Column Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Project 02: 7 cols */}
            {projectsData[1] && (
              <motion.div
                initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedProject(projectsData[1])}
                className="lg:col-span-7 group bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay hover:shadow-studio cursor-pointer transition-all duration-300 flex flex-col justify-between"
                data-cursor="view"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-2xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5]">
                      {projectsData[1].number}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-[#FBEAD5] dark:bg-[#38271C] text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.18)]">
                      {projectsData[1].highlight}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-3 group-hover:translate-x-1 transition-transform">
                    {projectsData[1].title}
                  </h3>
                  <p className="text-sm text-[#70533C] dark:text-[#D6B598] leading-relaxed mb-6">
                    {projectsData[1].description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
                  {projectsData[1].technologies.map(t => (
                    <span key={t} className="text-[11px] font-mono font-medium text-[#4C3526] dark:text-[#FBEAD5] px-2 py-0.5 rounded bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project 03: 5 cols */}
            {projectsData[2] && (
              <motion.div
                initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedProject(projectsData[2])}
                className="lg:col-span-5 group bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay hover:shadow-studio cursor-pointer transition-all duration-300 flex flex-col justify-between"
                data-cursor="view"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-2xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5]">
                      {projectsData[2].number}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-[#FBEAD5] dark:bg-[#38271C] text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.18)]">
                      {projectsData[2].highlight}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-3 group-hover:translate-x-1 transition-transform">
                    {projectsData[2].title}
                  </h3>
                  <p className="text-sm text-[#70533C] dark:text-[#D6B598] leading-relaxed mb-6">
                    {projectsData[2].description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
                  {projectsData[2].technologies.map(t => (
                    <span key={t} className="text-[11px] font-mono font-medium text-[#4C3526] dark:text-[#FBEAD5] px-2 py-0.5 rounded bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Project 04 & 05: Asymmetric Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Project 04 */}
            {projectsData[3] && (
              <motion.div
                initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedProject(projectsData[3])}
                className="lg:col-span-5 group bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay hover:shadow-studio cursor-pointer transition-all duration-300 flex flex-col justify-between"
                data-cursor="view"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-2xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5]">
                      {projectsData[3].number}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-[#FBEAD5] dark:bg-[#38271C] text-[#4C3526] dark:text-[#FBEAD5] border border-[rgba(76,53,38,0.18)]">
                      {projectsData[3].highlight}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-3 group-hover:translate-x-1 transition-transform">
                    {projectsData[3].title}
                  </h3>
                  <p className="text-sm text-[#70533C] dark:text-[#D6B598] leading-relaxed mb-6">
                    {projectsData[3].description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
                  {projectsData[3].technologies.map(t => (
                    <span key={t} className="text-[11px] font-mono font-medium text-[#4C3526] dark:text-[#FBEAD5] px-2 py-0.5 rounded bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project 05: Industry Internship */}
            {projectsData[4] && (
              <motion.div
                initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedProject(projectsData[4])}
                className="lg:col-span-7 group bg-[#F0D6BD]/85 dark:bg-[#2B1E16]/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)] shadow-clay hover:shadow-studio cursor-pointer transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                data-cursor="view"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-2xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5]">
                      {projectsData[4].number}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-[#4C3526] text-[#FBEAD5] dark:bg-[#FBEAD5] dark:text-[#1C120C]">
                      <Sparkles className="w-3 h-3" />
                      <span>{projectsData[4].highlight}</span>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#4C3526] dark:text-[#FBEAD5] mb-3 group-hover:translate-x-1 transition-transform">
                    {projectsData[4].title}
                  </h3>
                  <p className="text-sm text-[#70533C] dark:text-[#D6B598] leading-relaxed mb-6">
                    {projectsData[4].description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(76,53,38,0.18)] dark:border-[rgba(240,214,189,0.18)]">
                  {projectsData[4].technologies.map(t => (
                    <span key={t} className="text-[11px] font-mono font-medium text-[#4C3526] dark:text-[#FBEAD5] px-2 py-0.5 rounded bg-[#FBEAD5] dark:bg-[#38271C] border border-[rgba(76,53,38,0.18)]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

        </div>

      </div>

      {/* Case Study Detail Drawer */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
