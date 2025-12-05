/**
 * ParallaxSection Component Tests
 * 
 * Tests for the ParallaxSection and related components to ensure
 * they render correctly and handle different configurations.
 */

import { render, screen } from '@testing-library/react';
import {
  ParallaxSection,
  ParallaxLayer,
  ParallaxBackground,
  SectionTransition,
} from '../ParallaxSection';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock the hooks
jest.mock('@/hooks/useParallax', () => ({
  useParallax: () => 0,
}));

jest.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true,
  }),
}));

describe('ParallaxSection', () => {
  it('renders children correctly', () => {
    render(
      <ParallaxSection>
        <div>Test Content</div>
      </ParallaxSection>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ParallaxSection className="custom-class">
        <div>Content</div>
      </ParallaxSection>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies id attribute', () => {
    const { container } = render(
      <ParallaxSection id="test-section">
        <div>Content</div>
      </ParallaxSection>
    );
    expect(container.querySelector('#test-section')).toBeInTheDocument();
  });

  it('renders as section element', () => {
    const { container } = render(
      <ParallaxSection>
        <div>Content</div>
      </ParallaxSection>
    );
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});

describe('ParallaxLayer', () => {
  it('renders children correctly', () => {
    render(
      <ParallaxLayer>
        <div>Layer Content</div>
      </ParallaxLayer>
    );
    expect(screen.getByText('Layer Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ParallaxLayer className="layer-class">
        <div>Content</div>
      </ParallaxLayer>
    );
    expect(container.querySelector('.layer-class')).toBeInTheDocument();
  });

  it('applies zIndex style', () => {
    const { container } = render(
      <ParallaxLayer zIndex={10}>
        <div>Content</div>
      </ParallaxLayer>
    );
    const layer = container.firstChild as HTMLElement;
    expect(layer.style.zIndex).toBe('10');
  });
});

describe('ParallaxBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<ParallaxBackground />);
    expect(container).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <ParallaxBackground>
        <div>Background Content</div>
      </ParallaxBackground>
    );
    expect(screen.getByText('Background Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ParallaxBackground className="bg-class" />
    );
    expect(container.querySelector('.bg-class')).toBeInTheDocument();
  });

  it('applies background image style', () => {
    const { container } = render(
      <ParallaxBackground backgroundImage="/test-image.jpg" />
    );
    const bgElement = container.querySelector('.absolute.inset-0.w-full');
    expect(bgElement).toBeInTheDocument();
  });

  it('renders overlay when enabled', () => {
    const { container } = render(
      <ParallaxBackground overlay={true} />
    );
    const overlay = container.querySelector('.bg-gradient-to-b');
    expect(overlay).toBeInTheDocument();
  });

  it('does not render overlay when disabled', () => {
    const { container } = render(
      <ParallaxBackground overlay={false} />
    );
    const overlay = container.querySelector('.bg-gradient-to-b');
    expect(overlay).not.toBeInTheDocument();
  });
});

describe('SectionTransition', () => {
  it('renders children correctly', () => {
    render(
      <SectionTransition>
        <div>Transition Content</div>
      </SectionTransition>
    );
    expect(screen.getByText('Transition Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SectionTransition className="transition-class">
        <div>Content</div>
      </SectionTransition>
    );
    expect(container.querySelector('.transition-class')).toBeInTheDocument();
  });

  it('applies id attribute', () => {
    const { container } = render(
      <SectionTransition id="transition-section">
        <div>Content</div>
      </SectionTransition>
    );
    expect(container.querySelector('#transition-section')).toBeInTheDocument();
  });

  it('renders as section element', () => {
    const { container } = render(
      <SectionTransition>
        <div>Content</div>
      </SectionTransition>
    );
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
