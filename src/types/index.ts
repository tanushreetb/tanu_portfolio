/**
 * Type Definitions Module
 * 
 * This module contains all TypeScript interfaces and type definitions used throughout
 * the portfolio and blog websites. These types ensure type safety and provide clear
 * contracts for data structures used across components.
 * 
 * @module types
 */

/**
 * Theme Context Type
 * 
 * Defines the shape of the theme context value provided by ThemeProvider.
 * Used by components that need to access or modify the current theme.
 * 
 * @interface ThemeContextType
 * @property {('light'|'dark')} theme - Current active theme mode
 * @property {Function} toggleTheme - Function to switch between light and dark themes
 */
export interface ThemeContextType {
  /** Current theme mode: 'light' for light mode, 'dark' for dark mode */
  theme: 'light' | 'dark';
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
}

/**
 * Project Data Interface
 * 
 * Represents a single project in the portfolio. Contains all information needed
 * to display a project card including title, description, technologies used,
 * and optional achievements and links.
 * 
 * @interface ProjectData
 * @property {string} id - Unique identifier for the project (used as React key)
 * @property {string} title - Display name of the project
 * @property {string} description - Detailed description of the project and its purpose
 * @property {string[]} technologies - Array of technologies/tools used in the project
 * @property {string[]} [achievements] - Optional array of notable achievements or awards
 * @property {string} [link] - Optional URL to project demo or repository
 * @property {string} [role] - Optional role description (e.g., "Frontend Developer")
 */
export interface ProjectData {
  /** Unique identifier for the project */
  id: string;
  /** Project title displayed on cards */
  title: string;
  /** Detailed project description */
  description: string;
  /** Technologies and tools used */
  technologies: string[];
  /** Optional achievements or awards */
  achievements?: string[];
  /** Optional link to project or repository */
  link?: string;
  /** Optional role in the project */
  role?: string;
  /** Optional featured image URL */
  image?: string;
  /** Optional flag to mark as featured (larger card in bento grid) */
  featured?: boolean;
}

/**
 * Blog Post Interface
 * 
 * Represents a blog post with all necessary metadata and content.
 * Used for both blog listing pages and individual post pages.
 * 
 * @interface BlogPost
 * @property {string} slug - URL-friendly identifier used in routing (e.g., "my-first-post")
 * @property {string} title - Post title displayed in listings and post page
 * @property {string} excerpt - Short preview text shown in post cards
 * @property {string} content - Full post content (supports markdown)
 * @property {Date} publishedAt - Publication date for sorting and display
 * @property {string} category - Post category for filtering and organization
 */
export interface BlogPost {
  /** URL slug for routing (e.g., "getting-started-with-react") */
  slug: string;
  /** Post title */
  title: string;
  /** Short excerpt for preview cards */
  excerpt: string;
  /** Full post content (markdown supported) */
  content: string;
  /** Publication date */
  publishedAt: Date;
  /** Category for filtering (e.g., "Technology", "Tutorial") */
  category: string;
}

/**
 * Animation Configuration Interface
 * 
 * Defines timing and easing parameters for animations throughout the application.
 * Used by animation utilities and Framer Motion variants to ensure consistent
 * animation behavior across all components.
 * 
 * @interface AnimationConfig
 * @property {number} duration - Animation duration in seconds (e.g., 0.3 for 300ms)
 * @property {string} easing - CSS easing function (e.g., "cubic-bezier(0.4, 0, 0.2, 1)")
 * @property {number} [delay] - Optional delay before animation starts in seconds
 */
export interface AnimationConfig {
  /** Animation duration in seconds */
  duration: number;
  /** CSS easing function or keyword (e.g., "ease-out", "cubic-bezier(...)") */
  easing: string;
  /** Optional delay before animation starts (in seconds) */
  delay?: number;
}

/**
 * Portfolio Data Interface
 * 
 * Complete data structure for the portfolio website. Contains all personal information,
 * education details, projects, and skills. This is the main data model for the portfolio
 * homepage and is typically loaded from a data file or API.
 * 
 * @interface PortfolioData
 * @property {Object} personal - Personal information and contact details
 * @property {Object} education - Educational background and qualifications
 * @property {ProjectData[]} projects - Array of portfolio projects
 * @property {Object} skills - Categorized technical skills and competencies
 */
export interface PortfolioData {
  /** Personal information section */
  personal: {
    /** Full name */
    name: string;
    /** Professional title or role */
    title: string;
    /** Contact email address */
    email: string;
    /** Contact phone number */
    phone: string;
    /** LinkedIn profile URL */
    linkedin: string;
    /** GitHub profile URL */
    github?: string;
    /** Geographic location */
    location: string;
  };
  /** Education section */
  education: {
    /** Degree name (e.g., "BE Computer Science and Engineering") */
    degree: string;
    /** Educational institution name */
    institution: string;
    /** Expected or actual graduation year */
    expectedGraduation: string;
    /** Current CGPA or GPA */
    cgpa: string;
    /** Higher secondary education details */
    hsc: {
      /** School name */
      school: string;
      /** Graduation year */
      year: string;
      /** Percentage or grade achieved */
      percentage: string;
    };
    /** Secondary school leaving certificate details */
    sslc?: {
      /** School name */
      school: string;
      /** Graduation year */
      year: string;
    };
  };
  /** Array of portfolio projects */
  projects: ProjectData[];
  /** Skills organized by category */
  skills: {
    /** Programming languages */
    languages: string[];
    /** Frontend technologies */
    frontend: string[];
    /** Development tools */
    tools: string[];
    /** Frameworks and libraries */
    frameworks: string[];
    /** Database technologies */
    database: string[];
    /** AI and Machine Learning */
    ai_ml?: string[];
    /** Backend & APIs */
    backend?: string[];
    /** Core computer science concepts */
    core_concepts?: string[];
    /** Hardware and embedded concepts */
    hardware?: string[];
  };
  /** Internship experiences */
  internship?: Array<{
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }>;
  /** Professional certifications */
  certifications?: string[];
}