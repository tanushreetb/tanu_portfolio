/**
 * BlogCard Component
 * 
 * Enhanced blog post preview card that supports both traditional navigation
 * and modal-based viewing. Features hover animations and theme-aware styling.
 * 
 * This component can be used in two modes:
 * 1. Navigation mode: Uses Next.js Link to navigate to blog post page
 * 2. Modal mode: Triggers onClick callback to open post in modal
 * 
 * Requirements: 3.1, 3.2, 2.2
 * 
 * @component
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';
import { cardHover } from '@/components/animations/animationVariants';
import styles from './BlogCard.module.css';

/**
 * BlogCard Props Interface
 * 
 * @interface BlogCardProps
 * @property {BlogPost} post - Blog post data to display
 * @property {() => void} [onClick] - Optional click handler for modal mode
 * @property {boolean} [useModal] - If true, uses onClick instead of Link navigation
 */
interface BlogCardProps {
  post: BlogPost;
  onClick?: () => void;
  useModal?: boolean;
}

/**
 * BlogCard Component
 * 
 * Displays a blog post preview card with animations and theme support.
 * Can be used with either Link navigation or modal opening.
 * 
 * @param {BlogCardProps} props - Component props
 * @returns {JSX.Element} Animated blog post card
 */
export function BlogCard({ post, onClick, useModal = false }: BlogCardProps) {
  /**
   * Format publication date for human-readable display
   */
  const formattedDate = post.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Check if device is mobile
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

  /**
   * Card content JSX
   */
  const cardContent = (
    <motion.article
      className={`${styles.blogCard} touch-target`}
      variants={cardHover}
      initial="rest"
      whileHover={!isMobileDevice ? "hover" : "rest"}
      whileTap="rest"
    >
      {/* Category badge */}
      <div className={styles.categoryBadge}>
        {post.category}
      </div>

      {/* Post title */}
      <h3 className={styles.title}>
        {post.title}
      </h3>

      {/* Post excerpt */}
      <p className={styles.excerpt}>
        {post.excerpt}
      </p>

      {/* Post metadata */}
      <div className={styles.meta}>
        <time dateTime={post.publishedAt.toISOString()}>
          {formattedDate}
        </time>
      </div>
    </motion.article>
  );

  // Modal mode: Use button with onClick
  if (useModal && onClick) {
    return (
      <button
        onClick={onClick}
        className={styles.cardButton}
        aria-label={`Read ${post.title}`}
      >
        {cardContent}
      </button>
    );
  }

  // Navigation mode: Use Next.js Link
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={styles.cardLink}
    >
      {cardContent}
    </Link>
  );
}
