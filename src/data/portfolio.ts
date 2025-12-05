import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Tanushree T B",
    title: "Computer Science Student & Frontend Developer",
    email: "tanu25105@gmail.com",
    phone: "7803973565",
    linkedin: "https://www.linkedin.com/in/tanushree-t-b-74b730317",
    location: "India"
  },
  education: {
    degree: "BE Computer Science and Engineering",
    institution: "Sona College of Technology",
    expectedGraduation: "2027",
    cgpa: "8.02%",
    hsc: {
      school: "Dr Krishna Vikas Matric Higher Secondary School",
      year: "2022-2023",
      percentage: "88.84%"
    }
  },
  projects: [
    {
      id: "hospital-management",
      title: "Hospital Management System",
      role: "Frontend Developer",
      technologies: ["Machine Learning", "HTML", "CSS", "JavaScript"],
      description: "Centralized platform for hospital administration with ML-powered features for efficient patient management and resource allocation.",
      achievements: ["Won first prize in Spark'24"]
    },
    {
      id: "model-context-protocol",
      title: "Model Context Protocol",
      role: "Developer",
      technologies: ["Protocol Design", "API Development"],
      description: "Advanced protocol implementation for managing model contexts in distributed systems.",
      achievements: []
    },
    {
      id: "heart-disease-predictor",
      title: "Heart Disease Predictor",
      role: "ML Developer",
      technologies: ["Machine Learning", "Python", "Data Analysis"],
      description: "Machine learning model for predicting heart disease risk based on patient data and medical indicators.",
      achievements: []
    }
  ],
  skills: {
    languages: ["Python (Intermediate)", "Java (Basic)", "C++ (Basic)"],
    frontend: ["HTML", "CSS", "JavaScript", "Java Development (Basic)"],
    tools: ["Android Studio", "Adobe Photoshop", "Blender", "Excel", "PowerPoint", "Canva"],
    frameworks: ["Web Development"],
    database: ["MySQL"]
  }
};