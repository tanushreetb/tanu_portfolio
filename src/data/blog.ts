import { BlogPost } from '@/types';

/**
 * Sample blog posts data for the blog website.
 * In a production environment, this would be fetched from a CMS or database.
 */

export const blogPosts: BlogPost[] = [
  {
    slug: 'architecting-careease-ai-hospital-operations',
    title: 'Architecting CareEase AI: An Integrated Hospital Operations Ecosystem',
    excerpt: 'How we engineered a multi-service healthcare operations platform with FastAPI, M/M/c queuing, real-time Kafka streaming, and clinical LLMs.',
    content: `
# Architecting CareEase AI: An Integrated Hospital Operations Ecosystem

CareEase AI was built to solve critical operational bottlenecks in modern hospitals—from outpatient department (OPD) queue congestions to clinical document extraction and patient vital monitoring.

## System Architecture

1. **Role-Based Interfaces & FastAPI**: Developed high-performance asynchronous backend services with role-based clinical dashboards.
2. **AI Discharge Assistant**: Integrated specialized LLMs (Qwen 2.5, MedGemma, and Gemini) to extract diagnoses and medication schedules from PDF/TXT documents, coupled with automated regional-language audio readout.
3. **M/M/c Queuing Engine**: Designed a multi-server queuing theory model for OPD wait-time prediction and intelligent patient routing.
4. **Real-Time Telemetry Streaming**: Implemented Apache Kafka and PySpark on Databricks for real-time vital sign ingestion and automated threshold alerts.
    `,
    publishedAt: new Date('2026-02-15'),
    category: 'Projects'
  },
  {
    slug: 'multilingual-chatbot-for-scholarships',
    title: 'Building a Multilingual Chatbot for College Scholarships with Qwen 2.5',
    excerpt: 'Automating scholarship query handling for college students using Python, NLP, and Qwen 2.5 LLM with multilingual accessibility.',
    content: `
# Building a Multilingual Chatbot for College Scholarships with Qwen 2.5

College students often miss crucial financial aid deadlines or struggle with complex eligibility rules. We built an AI-powered conversational platform to automate scholarship-related query resolution.

## Technical Highlights

- **Conversational Workflows**: Structured context-aware prompt orchestration with Qwen 2.5 LLM.
- **Multilingual Support**: Enabled students from regional backgrounds to query eligibility criteria in their native languages.
- **Frontend & Deployment**: Built a lightweight, responsive Next.js conversational interface for immediate assistance.
    `,
    publishedAt: new Date('2026-01-20'),
    category: 'AI & GenAI'
  },
  {
    slug: 'data-science-genai-internship-learnings',
    title: 'Data Science & GenAI Internship at Innovexis: Key Takeaways',
    excerpt: 'Reflecting on building web-integrated machine learning applications, dataset structuring, and automation workflows.',
    content: `
# Data Science & GenAI Internship at Innovexis: Key Takeaways

During my internship at Innovexis Pvt. Ltd., I collaborated on building web-integrated machine learning applications using Python and delivering automation-focused solutions.

## What I Learned

1. **Dataset Structuring for AI**: Preparing robust, high-quality data pipelines for backend model integration.
2. **Web-Integrated ML**: Connecting Python model inference endpoints seamlessly to web-facing interfaces.
3. **Structured Processing Workflows**: Automating operational tasks through clean, reproducible pipelines.
4. **Milestone Delivery**: Collaborating in an Agile team to deliver features on schedule.
    `,
    publishedAt: new Date('2025-12-28'),
    category: 'Career & Learning'
  },
  {
    slug: 'real-time-vital-streaming-kafka-pyspark',
    title: 'Real-Time Patient Vital Monitoring with Kafka and PySpark on Databricks',
    excerpt: 'Designing a fault-tolerant streaming architecture for continuous physiological telemetry and emergency threshold alerts.',
    content: `
# Real-Time Patient Vital Monitoring with Kafka and PySpark on Databricks

Catching subtle acute physiological changes in patients requires real-time telemetry instead of periodic manual checks.

## Streaming Pipeline

- **Kafka Ingestion**: High-throughput message streaming from simulated patient vital sensors into Kafka topics.
- **PySpark on Databricks**: Windowed streaming aggregations detecting heart rate and SpO2 threshold breaches.
- **Alert Dispatch**: Immediate automated notifications dispatched to attending nursing stations.
    `,
    publishedAt: new Date('2025-11-10'),
    category: 'Architecture'
  }
];

/**
 * Get all blog posts sorted by publication date (newest first)
 * 
 * Error handling:
 * - Returns empty array if blogPosts is undefined or null
 * - Handles invalid date objects gracefully
 * - Catches sorting errors and returns unsorted array as fallback
 * 
 * @returns {BlogPost[]} Array of blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  try {
    // Validate that blogPosts exists and is an array
    if (!blogPosts || !Array.isArray(blogPosts)) {
      console.warn('Blog posts data is unavailable or invalid');
      return [];
    }

    // Create a copy to avoid mutating original array
    const postsCopy = [...blogPosts];
    
    // Sort with error handling for invalid dates
    return postsCopy.sort((a, b) => {
      try {
        const timeA = a.publishedAt?.getTime() || 0;
        const timeB = b.publishedAt?.getTime() || 0;
        return timeB - timeA;
      } catch (error) {
        console.warn('Error sorting blog posts by date:', error);
        return 0; // Keep original order if comparison fails
      }
    });
  } catch (error) {
    console.error('Failed to retrieve blog posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 * 
 * Error handling:
 * - Returns undefined if slug is invalid or empty
 * - Returns undefined if blogPosts is unavailable
 * - Handles search errors gracefully
 * 
 * @param {string} slug - The URL slug of the blog post
 * @returns {BlogPost | undefined} The blog post if found, undefined otherwise
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      console.warn('Invalid slug provided to getPostBySlug');
      return undefined;
    }

    // Validate that blogPosts exists
    if (!blogPosts || !Array.isArray(blogPosts)) {
      console.warn('Blog posts data is unavailable');
      return undefined;
    }

    // Search for post with matching slug
    const post = blogPosts.find(post => post?.slug === slug);
    
    if (!post) {
      console.warn(`Blog post not found for slug: ${slug}`);
    }
    
    return post;
  } catch (error) {
    console.error(`Error retrieving blog post with slug "${slug}":`, error);
    return undefined;
  }
}

/**
 * Get all unique categories from blog posts
 * 
 * Error handling:
 * - Returns empty array if blogPosts is unavailable
 * - Filters out invalid or empty categories
 * - Handles sorting errors gracefully
 * 
 * @returns {string[]} Array of unique category names sorted alphabetically
 */
export function getCategories(): string[] {
  try {
    // Validate that blogPosts exists
    if (!blogPosts || !Array.isArray(blogPosts)) {
      console.warn('Blog posts data is unavailable for categories');
      return [];
    }

    // Extract categories with validation
    const categories = new Set<string>();
    blogPosts.forEach(post => {
      if (post?.category && typeof post.category === 'string' && post.category.trim()) {
        categories.add(post.category);
      }
    });

    // Convert to array and sort
    try {
      return Array.from(categories).sort();
    } catch (sortError) {
      console.warn('Error sorting categories:', sortError);
      return Array.from(categories); // Return unsorted if sort fails
    }
  } catch (error) {
    console.error('Failed to retrieve categories:', error);
    return [];
  }
}

/**
 * Get posts by category
 * 
 * Error handling:
 * - Returns empty array if category is invalid
 * - Returns empty array if blogPosts is unavailable
 * - Handles filtering and sorting errors gracefully
 * 
 * @param {string} category - The category to filter by
 * @returns {BlogPost[]} Array of blog posts in the specified category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  try {
    // Validate category parameter
    if (!category || typeof category !== 'string') {
      console.warn('Invalid category provided to getPostsByCategory');
      return [];
    }

    // Validate that blogPosts exists
    if (!blogPosts || !Array.isArray(blogPosts)) {
      console.warn('Blog posts data is unavailable');
      return [];
    }

    // Filter posts by category
    const filteredPosts = blogPosts.filter(post => 
      post?.category === category
    );

    // Sort by date with error handling
    try {
      return filteredPosts.sort((a, b) => {
        try {
          const timeA = a.publishedAt?.getTime() || 0;
          const timeB = b.publishedAt?.getTime() || 0;
          return timeB - timeA;
        } catch (error) {
          console.warn('Error sorting posts by date:', error);
          return 0;
        }
      });
    } catch (sortError) {
      console.warn('Error sorting posts by category:', sortError);
      return filteredPosts; // Return unsorted if sort fails
    }
  } catch (error) {
    console.error(`Failed to retrieve posts for category "${category}":`, error);
    return [];
  }
}
