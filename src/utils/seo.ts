/**
 * SEO Utilities
 * 
 * Helper functions for generating SEO-optimized metadata across the application.
 * These utilities ensure consistent and comprehensive SEO implementation.
 * 
 * Features:
 * - Dynamic meta tag generation
 * - Open Graph metadata
 * - Twitter Card metadata
 * - Structured data (JSON-LD) generation
 * - Canonical URL management
 */

import { Metadata } from 'next';

/**
 * Base URL for the application
 * Uses environment variable in production, falls back to localhost in development
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tanushree-tb.com';

/**
 * Default SEO configuration
 * Used as fallback values when specific metadata is not provided
 */
export const DEFAULT_SEO = {
  siteName: 'Tanushree T B Portfolio',
  author: 'Tanushree T B',
  locale: 'en_US',
  type: 'website',
  twitterHandle: '@tanushree_tb',
};

/**
 * Generate comprehensive metadata for a page
 * 
 * @param title - Page title (will be appended with site name)
 * @param description - Page description for search results
 * @param path - Relative path from root (e.g., '/blog/my-post')
 * @param keywords - Array of keywords for the page
 * @param image - Absolute URL to page image for social sharing
 * @param type - Open Graph type (website, article, etc.)
 * @param publishedTime - ISO string for article published time
 * @returns Complete Metadata object for Next.js
 */
export function generateMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image,
  type = 'website',
  publishedTime,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = path === '' ? title : `${title} | ${DEFAULT_SEO.siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: DEFAULT_SEO.author }],
    creator: DEFAULT_SEO.author,
    publisher: DEFAULT_SEO.author,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: DEFAULT_SEO.siteName,
      locale: DEFAULT_SEO.locale,
      type,
      ...(image && { images: [{ url: image }] }),
      ...(publishedTime && type === 'article' && { publishedTime }),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      creator: DEFAULT_SEO.twitterHandle,
      ...(image && { images: [image] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate structured data (JSON-LD) for a person
 * Used on the portfolio homepage
 * 
 * @param personData - Person information
 * @returns JSON-LD structured data object
 */
export function generatePersonStructuredData({
  name,
  jobTitle,
  email,
  telephone,
  url,
  sameAs,
  alumniOf,
  knowsAbout,
}: {
  name: string;
  jobTitle: string;
  email: string;
  telephone: string;
  url: string;
  sameAs: string[];
  alumniOf: string;
  knowsAbout: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    email,
    telephone,
    url,
    sameAs,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: alumniOf,
    },
    knowsAbout,
  };
}

/**
 * Generate structured data (JSON-LD) for a blog post
 * Used on individual blog post pages
 * 
 * @param postData - Blog post information
 * @returns JSON-LD structured data object
 */
export function generateBlogPostStructuredData({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
  articleSection,
}: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  articleSection?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    publisher: {
      '@type': 'Person',
      name: author,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(image && { image }),
    ...(articleSection && { articleSection }),
  };
}

/**
 * Generate structured data (JSON-LD) for a website
 * Used on the homepage
 * 
 * @param websiteData - Website information
 * @returns JSON-LD structured data object
 */
export function generateWebsiteStructuredData({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
  };
}

/**
 * Generate breadcrumb structured data (JSON-LD)
 * Helps search engines understand site hierarchy
 * 
 * @param breadcrumbs - Array of breadcrumb items
 * @returns JSON-LD structured data object
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate structured data script tag content
 * Use this in your page components to add JSON-LD
 * 
 * @param data - Structured data object
 * @returns JSON string for script tag
 */
export function generateStructuredDataScript(data: object): string {
  return JSON.stringify(data);
}

/**
 * Usage examples:
 * 
 * // In a page component:
 * export const metadata = generateMetadata({
 *   title: 'My Page',
 *   description: 'Page description',
 *   path: '/my-page',
 *   keywords: ['keyword1', 'keyword2'],
 * });
 * 
 * // In a page component with structured data:
 * const structuredData = generatePersonStructuredData({
 *   name: 'John Doe',
 *   jobTitle: 'Developer',
 *   // ... other fields
 * });
 * 
 * return (
 *   <>
 *     <script
 *       type="application/ld+json"
 *       dangerouslySetInnerHTML={{ __html: generateStructuredDataScript(structuredData) }}
 *     />
 *     <main>{content}</main>
 *   </>
 * );
 */
