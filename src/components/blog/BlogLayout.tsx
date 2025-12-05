'use client';

import { NavigationBar } from './NavigationBar';
import styles from '@/styles/blog.module.css';

/**
 * BlogLayout Component
 * 
 * Provides the main layout structure for all blog pages, ensuring consistent
 * navigation, styling, and footer across the blog section.
 * 
 * Component structure:
 * - Navigation bar with theme toggle at the top
 * - Main content area for page-specific content
 * - Footer with copyright information
 * 
 * Layout approach:
 * - Flexbox column layout for proper footer positioning
 * - Theme-aware styling using CSS custom properties
 * - Responsive design that adapts to all screen sizes
 * - Consistent spacing and typography across pages
 * 
 * Theme integration:
 * - Uses data-theme attribute for CSS variable switching
 * - Smooth transitions between light and dark modes
 * - All child components inherit theme context
 * 
 * @component
 * @param {BlogLayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Page content to render in main area
 * @returns {JSX.Element} Complete blog page layout with navigation and footer
 */

/**
 * BlogLayout Props Interface
 * 
 * @interface BlogLayoutProps
 * @property {React.ReactNode} children - Content to display in the main area
 */
interface BlogLayoutProps {
  children: React.ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className={styles.blogLayout}>
      {/* Navigation bar with theme toggle */}
      <NavigationBar />
      
      {/* Main content area */}
      <main className={styles.blogMain}>
        {children}
      </main>
      
      {/* Footer */}
      <footer className={styles.blogFooter}>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} Tanushree T B. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
