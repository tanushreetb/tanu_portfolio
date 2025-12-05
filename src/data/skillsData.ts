/**
 * Skills Data
 * 
 * Enhanced skills data structure for the SkillsVisualization component.
 * Each skill includes proficiency level, category, icon, and description.
 * 
 * Requirements: 6.1, 6.2
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
    level: 70,
    category: "Languages",
    icon: "🐍",
    description: "Intermediate proficiency in Python for ML and backend development"
  },
  {
    name: "Java",
    level: 50,
    category: "Languages",
    icon: "☕",
    description: "Basic Java programming and OOP concepts"
  },
  {
    name: "C++",
    level: 45,
    category: "Languages",
    icon: "⚡",
    description: "Basic C++ for algorithms and data structures"
  },
  {
    name: "JavaScript",
    level: 75,
    category: "Languages",
    icon: "📜",
    description: "Strong JavaScript skills for web development"
  },
  
  // Frontend Technologies
  {
    name: "HTML",
    level: 85,
    category: "Frontend",
    icon: "🌐",
    description: "Semantic HTML5 and accessibility best practices"
  },
  {
    name: "CSS",
    level: 80,
    category: "Frontend",
    icon: "🎨",
    description: "Modern CSS including Flexbox, Grid, and animations"
  },
  {
    name: "React",
    level: 75,
    category: "Frontend",
    icon: "⚛️",
    description: "Building modern web applications with React"
  },
  {
    name: "Next.js",
    level: 70,
    category: "Frontend",
    icon: "▲",
    description: "Server-side rendering and static site generation"
  },
  
  // Tools & Software
  {
    name: "Android Studio",
    level: 60,
    category: "Tools",
    icon: "🤖",
    description: "Mobile app development for Android"
  },
  {
    name: "Adobe Photoshop",
    level: 65,
    category: "Tools",
    icon: "🖼️",
    description: "Image editing and graphic design"
  },
  {
    name: "Blender",
    level: 55,
    category: "Tools",
    icon: "🎭",
    description: "3D modeling and animation"
  },
  {
    name: "Git",
    level: 70,
    category: "Tools",
    icon: "🔀",
    description: "Version control and collaboration"
  },
  
  // Machine Learning
  {
    name: "Machine Learning",
    level: 65,
    category: "ML & AI",
    icon: "🤖",
    description: "ML algorithms and model development"
  },
  {
    name: "Data Analysis",
    level: 60,
    category: "ML & AI",
    icon: "📊",
    description: "Data processing and visualization"
  },
  
  // Database
  {
    name: "MySQL",
    level: 65,
    category: "Database",
    icon: "🗄️",
    description: "Relational database design and queries"
  }
];

export const skillCategories = [
  "All",
  "Languages",
  "Frontend",
  "Tools",
  "ML & AI",
  "Database"
];
