import { MetadataRoute } from 'next';

/**
 * Robots.txt generation for SEO optimization
 * 
 * Generates a robots.txt file that instructs search engine crawlers
 * on which pages they can and cannot access. This configuration:
 * - Allows all user agents (search engines) to crawl all pages
 * - Points to the sitemap for efficient crawling
 * 
 * @returns {MetadataRoute.Robots} Robots.txt configuration for Next.js
 */
export default function robots(): MetadataRoute.Robots {
  // Base URL for the website (update this to your actual domain in production)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tanushree-tb.com';

  return {
    rules: {
      userAgent: '*', // Apply to all search engine crawlers
      allow: '/', // Allow crawling of all pages
      disallow: [], // No restricted pages
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Point to sitemap for efficient crawling
  };
}
