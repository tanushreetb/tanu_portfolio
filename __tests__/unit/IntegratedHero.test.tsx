/**
 * IntegratedHero Component Tests
 * 
 * Tests for the IntegratedHero component to verify all sub-tasks are implemented correctly.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntegratedHero } from '@/components/portfolio/IntegratedHero';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_target, prop: string) => {
      return ({ children, ...props }: any) => {
        const Tag = prop || 'div';
        return React.createElement(Tag, props, children);
      };
    },
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock useParallax hook
jest.mock('@/hooks/useParallax', () => ({
  useParallax: () => 0,
}));

// Mock AnimatedText component
jest.mock('@/components/shared/AnimatedText', () => ({
  AnimatedText: ({ text, as: Component = 'span', className }: any) => {
    const Element = Component;
    return <Element className={className}>{text}</Element>;
  },
}));

describe('IntegratedHero Component', () => {
  const mockProps = {
    name: 'John Doe',
    title: 'Software Developer',
    description: 'Building amazing web applications',
    ctaButtons: [
      { label: 'View Projects', href: '#projects', variant: 'primary' as const },
      { label: 'Contact Me', href: '#contact', variant: 'secondary' as const },
    ],
  };

  it('renders without crashing', () => {
    render(<IntegratedHero {...mockProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays the name with AnimatedText component', () => {
    render(<IntegratedHero {...mockProps} />);
    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.tagName).toBe('H1');
  });

  it('displays the title', () => {
    render(<IntegratedHero {...mockProps} />);
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
  });

  it('displays the description', () => {
    render(<IntegratedHero {...mockProps} />);
    expect(screen.getByText('Building amazing web applications')).toBeInTheDocument();
  });

  it('renders all CTA buttons', () => {
    render(<IntegratedHero {...mockProps} />);
    expect(screen.getByText('View Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('applies correct href to CTA buttons', () => {
    render(<IntegratedHero {...mockProps} />);
    const projectsButton = screen.getByText('View Projects');
    const contactButton = screen.getByText('Contact Me');
    
    expect(projectsButton.closest('a')).toHaveAttribute('href', '#projects');
    expect(contactButton.closest('a')).toHaveAttribute('href', '#contact');
  });

  it('applies primary variant styling to primary button', () => {
    render(<IntegratedHero {...mockProps} />);
    const primaryButton = screen.getByText('View Projects').closest('a');
    expect(primaryButton?.className).toContain('bg-blue-600');
  });

  it('applies secondary variant styling to secondary button', () => {
    render(<IntegratedHero {...mockProps} />);
    const secondaryButton = screen.getByText('Contact Me').closest('a');
    expect(secondaryButton?.className).toContain('bg-gray-200');
  });

  it('includes gradient background element', () => {
    const { container } = render(<IntegratedHero {...mockProps} />);
    const gradientBg = container.querySelector('.animated-gradient-bg');
    expect(gradientBg).toBeInTheDocument();
  });

  it('has proper semantic HTML structure', () => {
    render(<IntegratedHero {...mockProps} />);
    const section = screen.getByRole('region', { name: /hero section/i });
    expect(section).toBeInTheDocument();
  });

  it('includes scroll indicator', () => {
    const { container } = render(<IntegratedHero {...mockProps} />);
    const scrollIndicator = container.querySelector('[aria-label="Scroll down indicator"]');
    expect(scrollIndicator).toBeInTheDocument();
  });
});
