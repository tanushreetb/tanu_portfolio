/**
 * SkipLinks Component
 * 
 * Provides skip navigation links for keyboard users to bypass repetitive content.
 * Links are visually hidden but become visible when focused.
 * 
 * Requirements: 10.2, 10.5
 * 
 * @component
 */

'use client';

import React from 'react';

interface SkipLink {
  href: string;
  label: string;
}

interface SkipLinksProps {
  /**
   * Array of skip links to render
   */
  links?: SkipLink[];
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Default skip links for portfolio page
 */
const defaultLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#projects', label: 'Skip to projects' },
  { href: '#contact', label: 'Skip to contact' }
];

/**
 * SkipLinks component for keyboard navigation
 * 
 * Renders a list of skip links that are hidden until focused.
 * Allows keyboard users to quickly navigate to important page sections.
 */
export const SkipLinks: React.FC<SkipLinksProps> = ({
  links = defaultLinks,
  className = ''
}) => {
  return (
    <nav
      className={`skip-links ${className}`}
      aria-label="Skip navigation"
    >
      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          className="
            sr-only
            focus:not-sr-only
            focus:absolute
            focus:z-9999
            focus:px-4
            focus:py-2
            focus:bg-blue-600
            focus:text-white
            focus:rounded-md
            focus:shadow-lg
            focus:outline-none
            focus:ring-3
            focus:ring-blue-500
            focus:ring-offset-2
            transition-all
            duration-200
          "
          style={{
            top: '1rem',
            left: `${1 + index * 10}rem`
          }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};
