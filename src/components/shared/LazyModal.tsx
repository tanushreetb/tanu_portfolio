/**
 * LazyModal Component
 * 
 * Lazy-loaded modal wrapper that only loads modal content when opened.
 * Improves initial page load performance by code-splitting heavy modal components.
 * 
 * Requirements: 8.1, 8.4
 */

'use client';

import { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

/**
 * Loading spinner component for modal
 */
const ModalLoader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <motion.div
      className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      aria-label="Loading"
    />
  </div>
);

/**
 * LazyModal component that lazy-loads content
 * 
 * @example
 * <LazyModal isOpen={isOpen} onClose={handleClose}>
 *   <BlogPostModal post={post} isOpen={isOpen} onClose={handleClose} />
 * </LazyModal>
 */
export const LazyModal: React.FC<LazyModalProps> = ({
  isOpen,
  onClose,
  children,
  ariaLabel = 'Modal dialog',
}) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={<ModalLoader />}>
              {children}
            </Suspense>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Hook to create a lazy-loaded modal component
 * 
 * @param importFn - Dynamic import function
 * @returns Lazy-loaded component
 * 
 * @example
 * const LazyBlogModal = useLazyModal(() => import('./BlogPostModal'));
 */
export const useLazyModal = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return lazy(importFn);
};
