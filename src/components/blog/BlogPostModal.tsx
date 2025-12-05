/**
 * BlogPostModal Component
 * 
 * Full-screen modal overlay for displaying blog post content without leaving
 * the main portfolio page. Features smooth animations, backdrop blur, and
 * comprehensive accessibility support.
 * 
 * Requirements: 3.3, 3.4, 3.5, 10.2
 * 
 * Features:
 * - Smooth slide-in/slide-out animations
 * - Backdrop blur with click-outside-to-close
 * - ESC key handler for closing
 * - Focus trap for keyboard navigation
 * - Maintains scroll position on main page
 * - Accessible with ARIA labels and semantic HTML
 * 
 * @component
 */

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '@/types';
import { modalBackdrop, modalContent } from '@/components/animations/animationVariants';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import styles from './BlogPostModal.module.css';

/**
 * BlogPostModal Props Interface
 * 
 * @interface BlogPostModalProps
 * @property {BlogPost | null} post - Blog post to display (null when closed)
 * @property {boolean} isOpen - Whether the modal is currently open
 * @property {() => void} onClose - Callback function to close the modal
 */
interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * BlogPostModal Component
 * 
 * Displays full blog post content in an accessible modal overlay.
 * Handles animations, keyboard navigation, and focus management.
 * 
 * @param {BlogPostModalProps} props - Component props
 * @returns {JSX.Element | null} Modal component or null if not open
 */
export function BlogPostModal({ post, isOpen, onClose }: BlogPostModalProps) {
  const trapRef = useFocusTrap(isOpen);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Format publication date
  const formattedDate = post?.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AnimatePresence mode="wait">
      {isOpen && post && (
        <motion.div
          className={styles.modalOverlay}
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={trapRef}
            className={styles.modalContent}
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
              type="button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal header */}
            <header className={styles.modalHeader}>
              <div className={styles.categoryBadge}>
                {post.category}
              </div>
              <h1 id="modal-title" className={styles.modalTitle}>
                {post.title}
              </h1>
              <time
                className={styles.modalDate}
                dateTime={post.publishedAt.toISOString()}
              >
                {formattedDate}
              </time>
            </header>

            {/* Modal body */}
            <article className={styles.modalBody}>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
