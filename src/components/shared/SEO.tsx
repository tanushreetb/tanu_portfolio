/**
 * SEO Component
 * 
 * Reusable SEO component for adding meta tags to pages.
 * This component is primarily for documentation and reference,
 * as Next.js 13+ uses the Metadata API in page files.
 * 
 * For actual implementation, use the generateMetadata function
 * in your page.tsx files as shown in the examples below.
 */

import { Metadata } from 'next';

/**
 * SEO Configuration Interface
 * 
 * Defines the structure for SEO metadata across the application.
 */
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Generate metadata for a page
 * 
 * Helper function to create consistent metadata across pages.
 * Use this in your page.tsx files with the generateMetadata export.
 * 
 * @param config - SEO configuration object
 * @returns Metadata object for Next.js
 */
export function generatePageMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    author = 'Tanushree T B',
    ogImage,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    section,
    canonical,
    noindex = false,
    nofollow = false,
  } = config;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: author }],
    
    // Open Graph metadata for social sharing
    openGraph: {
      title,
      description,
      type: ogType,
      locale: 'en_US',
      siteName: 'Tanushree T B Portfolio & Blog',
      images: ogImage ? [{ url: ogImage }] : undefined,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },

    // Twitter Card metadata
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },

    // Robots directives
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    ...(canonical && { alternates: { canonical } }),
  };

  return metadata;
}

/**
 * Default SEO configuration
 * 
 * Base configuration that can be extended for specific pages.
 */
export const defaultSEO: SEOConfig = {
  title: 'Tanushree T B - Portfolio & Blog',
  description: 'Portfolio and blog website showcasing projects, skills, and insights in computer science and web development',
  keywords: [
    'Tanushree T B',
    'Portfolio',
    'Blog',
    'Computer Science',
    'Frontend Developer',
    'Machine Learning',
    'Web Development',
  ],
  author: 'Tanushree T B',
  ogType: 'website',
};

/**
 * Usage Examples:
 * 
 * 1. Basic page metadata:
 * ```tsx
 * // In app/about/page.tsx
 * import { generatePageMetadata } from '@/components/shared/SEO';
 * 
 * export const metadata = generatePageMetadata({
 *   title: 'About | Tanushree T B',
 *   description: 'Learn more about Tanushree T B, a Computer Science student...',
 *   keywords: ['About', 'Biography', 'Education', 'Skills'],
 * });
 * ```
 * 
 * 2. Blog post metadata:
 * ```tsx
 * // In app/blog/[slug]/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const post = await getPost(params.slug);
 *   
 *   return generatePageMetadata({
 *     title: `${post.title} | Blog`,
 *     description: post.excerpt,
 *     keywords: [post.category, 'Blog', 'Technology'],
 *     ogType: 'article',
 *     publishedTime: post.publishedAt.toISOString(),
 *     section: post.category,
 *     ogImage: post.coverImage,
 *   });
 * }
 * ```
 * 
 * 3. Dynamic metadata with canonical URL:
 * ```tsx
 * export const metadata = generatePageMetadata({
 *   title: 'Projects | Tanushree T B',
 *   description: 'View my latest projects and work',
 *   canonical: 'https://tanushree-tb.com/projects',
 * });
 * ```
 */

/**
 * SEO Best Practices Checklist:
 * 
 * ✓ Unique title for each page (50-60 characters)
 * ✓ Compelling description (150-160 characters)
 * ✓ Relevant keywords (5-10 per page)
 * ✓ Open Graph tags for social sharing
 * ✓ Twitter Card tags
 * ✓ Canonical URLs to prevent duplicate content
 * ✓ Structured data (JSON-LD) for rich snippets
 * ✓ Sitemap.xml for search engines
 * ✓ Robots.txt for crawler instructions
 * ✓ Mobile-friendly and responsive design
 * ✓ Fast page load times (Core Web Vitals)
 * ✓ HTTPS enabled
 * ✓ Semantic HTML structure
 * ✓ Alt text for all images
 * ✓ Internal linking strategy
 */

/**
 * Structured Data (JSON-LD) Examples:
 * 
 * Add these to your page components for rich snippets:
 * 
 * 1. Person schema (for portfolio):
 * ```tsx
 * <script type="application/ld+json">
 * {
 *   "@context": "https://schema.org",
 *   "@type": "Person",
 *   "name": "Tanushree T B",
 *   "jobTitle": "Computer Science Student & Frontend Developer",
 *   "url": "https://tanushree-tb.com",
 *   "sameAs": [
 *     "https://www.linkedin.com/in/tanushree-t-b-74b730317"
 *   ]
 * }
 * </script>
 * ```
 * 
 * 2. Blog post schema:
 * ```tsx
 * <script type="application/ld+json">
 * {
 *   "@context": "https://schema.org",
 *   "@type": "BlogPosting",
 *   "headline": "Post Title",
 *   "author": {
 *     "@type": "Person",
 *     "name": "Tanushree T B"
 *   },
 *   "datePublished": "2024-01-01",
 *   "description": "Post description"
 * }
 * </script>
 * ```
 */
