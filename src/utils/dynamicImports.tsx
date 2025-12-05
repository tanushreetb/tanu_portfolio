import React from 'react';
import dynamic from 'next/dynamic';

/**
 * Dynamic Import Utilities for Code Splitting
 * 
 * These utilities help reduce initial bundle size by:
 * - Loading components only when needed (lazy loading)
 * - Splitting code into smaller chunks
 * - Showing loading states during component load
 * - Improving initial page load performance
 * 
 * Code splitting benefits:
 * - Smaller initial JavaScript bundle
 * - Faster Time to Interactive (TTI)
 * - Better performance on slow networks
 * - Improved Core Web Vitals scores
 */

/**
 * Loading component shown while dynamic components are loading
 * 
 * Provides visual feedback during component load to improve
 * perceived performance and user experience.
 */
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
  </div>
);

/**
 * Dynamically import Framer Motion components
 * 
 * Framer Motion is a large library (~50KB gzipped), so we load it
 * dynamically to reduce initial bundle size. This is especially
 * beneficial for users who prefer reduced motion.
 */
export const DynamicMotion = {
  div: dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
    loading: () => <div />,
    ssr: true,
  }),
  section: dynamic(() => import('framer-motion').then(mod => mod.motion.section), {
    loading: () => <div />,
    ssr: true,
  }),
  article: dynamic(() => import('framer-motion').then(mod => mod.motion.article), {
    loading: () => <div />,
    ssr: true,
  }),
};

/**
 * Example: Dynamically import heavy components
 * 
 * Use this pattern for components that:
 * - Are not immediately visible (below the fold)
 * - Are conditionally rendered
 * - Have large dependencies
 * - Are only used in specific routes
 */

// Example: Dynamic blog components (only loaded on blog pages)
export const DynamicBlogLayout = dynamic(
  () => import('@/components/blog/BlogLayout').then(mod => ({ default: mod.BlogLayout })),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

// Example: Dynamic portfolio components (only loaded on portfolio pages)
export const DynamicProjectCard = dynamic(
  () => import('@/components/portfolio/ProjectCard').then(mod => ({ default: mod.ProjectCard })),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

/**
 * Usage examples:
 * 
 * // Instead of:
 * import { BlogLayout } from '@/components/blog/BlogLayout';
 * 
 * // Use:
 * import { DynamicBlogLayout } from '@/utils/dynamicImports';
 * 
 * // In component:
 * <DynamicBlogLayout>
 *   {children}
 * </DynamicBlogLayout>
 * 
 * // For conditional rendering:
 * {showBlog && <DynamicBlogLayout>{content}</DynamicBlogLayout>}
 * 
 * // This ensures BlogLayout is only loaded when needed,
 * // reducing the initial bundle size.
 */

/**
 * Preload critical components
 * 
 * For components that will definitely be needed soon,
 * we can preload them to avoid loading delays.
 * 
 * Call this function when you know a component will be needed:
 * - On route change start
 * - On user interaction (hover, focus)
 * - Based on user behavior patterns
 */
export const preloadComponent = (componentPath: string) => {
  // Next.js automatically handles preloading for dynamic imports
  // This is a placeholder for custom preload logic if needed
  return import(componentPath);
};

/**
 * Bundle size optimization tips:
 * 
 * 1. Use dynamic imports for:
 *    - Large third-party libraries (charts, editors, etc.)
 *    - Route-specific components
 *    - Modal/dialog content
 *    - Below-the-fold content
 * 
 * 2. Avoid dynamic imports for:
 *    - Small components (<5KB)
 *    - Above-the-fold content
 *    - Critical rendering path components
 * 
 * 3. Monitor bundle size:
 *    - Run: npm run build
 *    - Check .next/analyze/ for bundle analysis
 *    - Use webpack-bundle-analyzer for detailed insights
 */
