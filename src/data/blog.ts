import { BlogPost } from '@/types';

/**
 * Sample blog posts data for the blog website.
 * In a production environment, this would be fetched from a CMS or database.
 */

export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-machine-learning',
    title: 'Getting Started with Machine Learning',
    excerpt: 'My journey into machine learning and the key concepts I learned while building the Hospital Management System.',
    content: `
# Getting Started with Machine Learning

Machine learning has been an exciting journey for me. Through my work on the Hospital Management System project, I've learned how to apply ML concepts to real-world problems.

## Key Learnings

1. **Data Preprocessing**: Understanding how to clean and prepare data is crucial
2. **Model Selection**: Choosing the right algorithm for the problem
3. **Evaluation**: Measuring model performance accurately

## Next Steps

I'm excited to continue exploring deep learning and neural networks in my upcoming projects.
    `,
    publishedAt: new Date('2024-11-15'),
    category: 'Learning'
  },
  {
    slug: 'building-hospital-management-system',
    title: 'Building a Hospital Management System',
    excerpt: 'How we won first prize at Spark\'24 with our innovative hospital management platform.',
    content: `
# Building a Hospital Management System

Our team developed a centralized platform for hospital administration that won first prize at Spark'24.

## The Challenge

Hospitals need efficient systems to manage patient records, appointments, and staff coordination.

## Our Solution

We built a comprehensive system using:
- Machine Learning for predictive analytics
- Modern web technologies (HTML, CSS, JavaScript)
- User-friendly interface design

## Results

The system streamlined hospital operations and received recognition at the competition.
    `,
    publishedAt: new Date('2024-10-20'),
    category: 'Projects'
  },
  {
    slug: 'exploring-model-context-protocol',
    title: 'Exploring Model Context Protocol',
    excerpt: 'Understanding the Model Context Protocol and its applications in modern software development.',
    content: `
# Exploring Model Context Protocol

The Model Context Protocol (MCP) is an emerging standard for AI model interactions.

## What is MCP?

MCP provides a standardized way for applications to communicate with AI models.

## Why It Matters

- Consistency across different AI platforms
- Easier integration for developers
- Better context management

## My Experience

Working with MCP has opened my eyes to the future of AI-powered applications.
    `,
    publishedAt: new Date('2024-09-10'),
    category: 'Technology'
  },
  {
    slug: 'heart-disease-prediction-with-ml',
    title: 'Heart Disease Prediction with Machine Learning',
    excerpt: 'Developing a machine learning model to predict heart disease risk factors.',
    content: `
# Heart Disease Prediction with Machine Learning

This project focuses on using ML algorithms to predict heart disease risk.

## Dataset

We used medical data including:
- Age, gender, and lifestyle factors
- Medical history and test results
- Risk indicators

## Model Development

We experimented with various algorithms to find the best predictor.

## Impact

Early detection can save lives, making this project particularly meaningful.
    `,
    publishedAt: new Date('2024-08-05'),
    category: 'Projects'
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
