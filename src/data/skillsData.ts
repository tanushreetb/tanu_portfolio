/**
 * Skills Data
 * 
 * Enhanced skills data structure for the SkillsVisualization component.
 * Each skill includes proficiency level, category, icon, and description.
 * Derived directly from Tanushree T B's engineering resume.
 */

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
  description?: string;
}

export const skillsData: Skill[] = [
  // Programming Languages
  {
    name: "Python",
    level: 90,
    category: "Languages",
    icon: "🐍",
    description: "Hands-on experience in Python for AI/ML, automation workflows, and backend services"
  },
  {
    name: "Java",
    level: 75,
    category: "Languages",
    icon: "☕",
    description: "Object-oriented programming, data structures, and algorithmic foundations"
  },
  
  // AI & Machine Learning
  {
    name: "LLMs & Intelligent Agents",
    level: 88,
    category: "AI & ML",
    icon: "🤖",
    description: "Prompt engineering, conversational workflows, and integrations with Qwen 2.5, MedGemma, and Gemini"
  },
  {
    name: "Natural Language Processing (NLP)",
    level: 82,
    category: "AI & ML",
    icon: "💬",
    description: "Multilingual text processing, conversational tokenization, and query handling systems"
  },
  {
    name: "Machine Learning (Classification & Regression)",
    level: 80,
    category: "AI & ML",
    icon: "📊",
    description: "Supervised and unsupervised learning including regression, classification, and clustering models"
  },

  // Backend & APIs
  {
    name: "FastAPI",
    level: 85,
    category: "Backend & APIs",
    icon: "⚡",
    description: "Asynchronous, high-performance RESTful API microservices with automated validation"
  },
  {
    name: "REST API Development",
    level: 85,
    category: "Backend & APIs",
    icon: "🔌",
    description: "Architecting modular backend endpoints, authentication, and structured payload contracts"
  },
  {
    name: "Kafka & PySpark",
    level: 78,
    category: "Backend & APIs",
    icon: "🌊",
    description: "Real-time streaming workflows, Databricks distributed processing, and threshold-based alerts"
  },

  // Frontend Development
  {
    name: "React.js",
    level: 82,
    category: "Frontend",
    icon: "⚛️",
    description: "Building responsive, component-driven user interfaces and role-based client dashboards"
  },
  {
    name: "Next.js",
    level: 80,
    category: "Frontend",
    icon: "▲",
    description: "Modern full-stack web applications with server-side rendering and dynamic routing"
  },
  {
    name: "HTML & CSS",
    level: 90,
    category: "Frontend",
    icon: "🌐",
    description: "Semantic layouts, responsive styling, and accessible web standards"
  },
  
  // Database
  {
    name: "SQL",
    level: 85,
    category: "Database",
    icon: "🗄️",
    description: "Relational queries, complex joins, subqueries, normalization, and schema design"
  },
  {
    name: "MongoDB",
    level: 78,
    category: "Database",
    icon: "🍃",
    description: "NoSQL document storage, indexing, and JSON-based document modeling"
  },

  // Core Concepts & Hardware
  {
    name: "OOPS & DSA (Basics)",
    level: 80,
    category: "Core CS",
    icon: "🧩",
    description: "Object-oriented software principles, clean modular patterns, and core algorithms"
  },
  {
    name: "DBMS",
    level: 82,
    category: "Core CS",
    icon: "💾",
    description: "Database management principles, ACID transactions, and integrity constraints"
  },
  {
    name: "Embedding (Hardware)",
    level: 72,
    category: "Core CS",
    icon: "⚡",
    description: "Hardware interfacing and embedded architecture foundations"
  }
];

export const skillCategories = [
  "All",
  "Languages",
  "AI & ML",
  "Backend & APIs",
  "Frontend",
  "Database",
  "Core CS"
];
