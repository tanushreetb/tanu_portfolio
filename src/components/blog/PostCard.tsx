'use client';

import Link from 'next/link';
import { BlogPost } from '@/types';
import styles from '@/styles/blog.module.css';

/**
 * PostCard Component
 * 
 * Displays a preview card for a blog post with hover animations and theme-aware styling.
 * Used in blog listing pages to show post summaries that link to full articles.
 * 
 * Component structure:
 * - Category badge for visual categorization
 * - Post title as main heading
 * - Excerpt text for preview
 * - Publication date with semantic time element
 * 
 * Animation approach:
 * - Card lifts and scales on hover (defined in CSS)
 * - Smooth color transitions for theme switching
 * - Border color changes on hover for emphasis
 * 
 * Accessibility features:
 * - Semantic HTML with article element
 * - Proper time element with datetime attribute
 * - Keyboard accessible link wrapping entire card
 * - Theme-aware color contrasts meeting WCAG AA standards
 * 
 * @component
 * @param {PostCardProps} props - Component props
 * @param {BlogPost} props.post - Blog post data to display
 * @returns {JSX.Element} Animated post preview card
 */

/**
 * PostCard Props Interface
 * 
 * @interface PostCardProps
 * @property {BlogPost} post - Complete blog post information for preview
 */
interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  /**
   * Format publication date for human-readable display
   * 
   * Uses toLocaleDateString with 'en-US' locale to format date as:
   * "Month Day, Year" (e.g., "January 15, 2024")
   */
  const formattedDate = post.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric', // Full year (e.g., "2024")
    month: 'long', // Full month name (e.g., "January")
    day: 'numeric' // Day of month (e.g., "15")
  });

  return (
    <Link href={`/blog/${post.slug}`} className={styles.postCard}>
      <article className={styles.postCardContent}>
        {/* Category badge */}
        <div className={styles.postCategory}>
          {post.category}
        </div>
        
        {/* Post title */}
        <h3 className={styles.postTitle}>
          {post.title}
        </h3>
        
        {/* Post excerpt */}
        <p className={styles.postExcerpt}>
          {post.excerpt}
        </p>
        
        {/* Post metadata */}
        <div className={styles.postMeta}>
          <time dateTime={post.publishedAt.toISOString()}>
            {formattedDate}
          </time>
        </div>
      </article>
    </Link>
  );
}
