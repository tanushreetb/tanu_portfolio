'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import styles from '@/styles/blog.module.css';

/**
 * NavigationBar component provides navigation between portfolio and blog sections
 * with an integrated theme toggle control.
 * 
 * Features:
 * - Theme toggle button with smooth transitions
 * - Navigation links to portfolio and blog sections
 * - Theme-aware styling that adapts to light/dark modes
 * - Mobile-responsive hamburger menu for small screens
 * - Touch-friendly navigation with 44px minimum touch targets
 */

export function NavigationBar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle keyboard navigation for mobile menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={styles.navigationBar} aria-label="Main navigation" onKeyDown={handleKeyDown}>
      <div className={styles.navContainer}>
        {/* Logo/Brand */}
        <div className={styles.navBrand}>
          <Link href="/" className={styles.brandLink}>
            Tanushree T B
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className={styles.mobileMenuToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            // Close icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Navigation Links - Desktop */}
        <div 
          className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}
          role="navigation"
          aria-label="Primary navigation links"
        >
          <Link 
            href="/" 
            className={styles.navLink}
            onClick={() => setMobileMenuOpen(false)}
            tabIndex={0}
          >
            Portfolio
          </Link>
          <Link 
            href="/blog" 
            className={styles.navLink}
            onClick={() => setMobileMenuOpen(false)}
            tabIndex={0}
          >
            Blog
          </Link>
        </div>

        {/* Theme Toggle Control - Touch-friendly 44px minimum */}
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            // Moon icon for dark mode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
