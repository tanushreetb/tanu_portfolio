import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Tanushree T B",
    title: "Computer Science Engineer | AI/ML & Full-Stack Developer",
    email: "tanushree251105@gmail.com",
    phone: "7603973955",
    linkedin: "https://www.linkedin.com/in/tanushree-t-b-74b730317",
    github: "https://github.com/tanushree-tb",
    location: "Dharmapuri, Tamil Nadu, India"
  },
  education: {
    degree: "B.E Computer Science and Engineering",
    institution: "Sona College of Technology, Salem",
    expectedGraduation: "09/2023 – 06/2027",
    cgpa: "7.95/10 (Till 6th Semester)",
    hsc: {
      school: "Dr Krishna Vikas Matric Hr. Sec School, Dharmapuri",
      year: "06/2022 – 03/2023",
      percentage: "88.8%"
    },
    sslc: {
      school: "Dr Krishna Vikas Matric Hr. Sec School, Dharmapuri",
      year: "06/2020 – 03/2021"
    }
  },
  internship: [
    {
      role: "Data Science & GenAI Intern",
      company: "Innovexis Pvt. Ltd.",
      period: "11/2025 – 12/2025",
      highlights: [
        "Collaborated on developing web-integrated machine learning applications using Python.",
        "Processed and structured datasets for backend model integration and AI-driven workflows.",
        "Contributed to automation-focused solutions using structured processing workflows.",
        "Worked with team members to develop and deliver project milestones within defined timelines."
      ]
    }
  ],
  projects: [
    {
      id: "careease-ai",
      title: "CareEase AI — Integrated Hospital Operations Ecosystem",
      role: "AI & Full-Stack Developer",
      technologies: ["Python", "FastAPI", "React", "Kafka", "PySpark (Databricks)", "LLMs (Qwen 2.5, MedGemma, Gemini)"],
      description: "A comprehensive multi-service hospital operations platform featuring role-based interfaces, FastAPI backend services, an M/M/c queuing engine for OPD wait-time prediction, an AI-powered discharge assistant with regional-language audio output, and Kafka/PySpark streaming for real-time patient vital monitoring.",
      achievements: [
        "Built AI discharge assistant extracting diagnoses & medication schedules from PDF/TXT documents with regional audio output",
        "Designed M/M/c queuing engine for OPD wait-time prediction & intelligent patient routing",
        "Implemented Kafka & PySpark streaming workflows for real-time vital monitoring and automated threshold alerts",
        "Engineered role-based interfaces and high-performance FastAPI backend services"
      ],
      image: "/placeholder.svg",
      featured: true,
      link: "https://github.com/tanushree-tb"
    },
    {
      id: "multilingual-chatbot",
      title: "Multilingual Chatbot for College Students Scholarship Queries",
      role: "AI / NLP Developer",
      technologies: ["Python", "NLP", "Next.js", "LLM (Qwen 2.5)"],
      description: "An AI-powered conversational platform built to automate scholarship-related query handling for college students, featuring multilingual support for regional accessibility and structured conversational workflows for accurate, consistent responses.",
      achievements: [
        "Integrated Qwen 2.5 LLM conversational capabilities to generate precise, context-aware responses",
        "Designed multilingual support to dramatically enhance accessibility for regional students",
        "Structured conversational workflows to optimize query resolution latency and response consistency",
        "Automated repetitive query processing for academic and administrative scholarship services"
      ],
      image: "/placeholder.svg",
      featured: true,
      link: "https://github.com/tanushree-tb"
    }
  ],
  skills: {
    languages: ["Python", "Java"],
    frontend: ["HTML", "CSS", "React.js", "Next.js"],
    tools: ["FastAPI", "REST APIs", "Kafka", "PySpark (Databricks)", "Git"],
    frameworks: ["React.js", "FastAPI", "Next.js"],
    database: ["SQL (Joins, Subqueries, Normalization)", "MongoDB"],
    ai_ml: ["Regression", "Classification", "Clustering", "NLP", "LLMs (Qwen 2.5, MedGemma, Gemini)"],
    backend: ["FastAPI", "REST API Development", "Kafka", "PySpark (Databricks)"],
    core_concepts: ["OOPS", "DSA (Basics)", "DBMS"],
    hardware: ["Embedding"]
  },
  certifications: [
    "Programming in Python",
    "SQL Fundamentals",
    "Cloud Computing Basics",
    "Machine Learning With AI",
    "Programming in Java"
  ]
};
