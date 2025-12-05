/**
 * SectionDivider Component Tests
 * 
 * Tests for the SectionDivider and AnimatedSectionDivider components
 * to ensure they render correctly and handle different variants.
 */

import { render, screen } from '@testing-library/react';
import { SectionDivider, AnimatedSectionDivider } from '../SectionDivider';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
  },
}));

// Mock the useScrollAnimation hook
jest.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true,
  }),
}));

describe('SectionDivider', () => {
  it('renders without crashing', () => {
    const { container } = render(<SectionDivider />);
    expect(container).toBeInTheDocument();
  });

  it('renders line variant by default', () => {
    const { container } = render(<SectionDivider />);
    expect(container.querySelector('.h-px')).toBeInTheDocument();
  });

  it('renders wave variant', () => {
    const { container } = render(<SectionDivider variant="wave" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders gradient variant', () => {
    const { container } = render(<SectionDivider variant="gradient" />);
    expect(container.querySelector('.h-24')).toBeInTheDocument();
  });

  it('renders dots variant', () => {
    const { container } = render(<SectionDivider variant="dots" />);
    const dots = container.querySelectorAll('.w-2.h-2.rounded-full');
    expect(dots.length).toBe(5);
  });

  it('renders zigzag variant', () => {
    const { container } = render(<SectionDivider variant="zigzag" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<SectionDivider className="my-custom-class" />);
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
  });

  it('has aria-hidden attribute', () => {
    const { container } = render(<SectionDivider />);
    const divider = container.querySelector('[aria-hidden="true"]');
    expect(divider).toBeInTheDocument();
  });
});

describe('AnimatedSectionDivider', () => {
  it('renders without crashing', () => {
    const { container } = render(<AnimatedSectionDivider />);
    expect(container).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<AnimatedSectionDivider className="my-custom-class" />);
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
  });

  it('has aria-hidden attribute', () => {
    const { container } = render(<AnimatedSectionDivider />);
    const divider = container.querySelector('[aria-hidden="true"]');
    expect(divider).toBeInTheDocument();
  });
});
