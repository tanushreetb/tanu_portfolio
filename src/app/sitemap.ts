import { MetadataRoute } from 'next';
import { getAllPosts } from '@/data/blog';

/**
 * Sitemap generation for SEO optimization
 * 
 * Generates a sitemap.xml file that helps search engines discover and index
 * all pages on the website. Includes:
 * - Portfolio homepage
 * - Blog homepage
 * - Individual blog post pages
 * 
 * The sitemap includes:
 * - url: The full URL of the page
 * - lastModified: When the page was last updated
 * - changeFrequency: How often the page is expected to change
 * - priority: Relative importance of the page (0.0 to 1.0)
 * 
 * @returns {MetadataRoute.Sitemap} Sitemap configuration for Next.js
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for the website (update this to your actual domain in production)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tanushree-tb.com';

  // Get all blog posts for dynamic sitemap entries
  const posts = getAllPosts();

  // Static pages with their priorities and update frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0, // Homepage has highest priority
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly', // Blog index updates when new posts are added
      priority: 0.8,
    },
  ];

  // Dynamic blog post pages
  const blogPostPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt || new Date(),
    changeFrequency: 'monthly' as const, // Blog posts rarely change after publication
    priority: 0.6,
  }));

  // Combine static and dynamic pages
  return [...staticPages, ...blogPostPages];
}
