/**
 * Section Transitions Example
 * 
 * Demonstrates the usage of SectionDivider and ParallaxSection components.
 * This example can be used as a reference or integrated into the portfolio.
 * 
 * Requirements: 2.1, 2.2, 2.6
 */

'use client';

import {
  SectionDivider,
  AnimatedSectionDivider,
  ParallaxSection,
  ParallaxLayer,
  ParallaxBackground,
  SectionTransition
} from './index';

/**
 * Example page showing all divider and transition variants
 */
export const SectionTransitionsExample: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Background */}
      <div className="relative min-h-screen flex items-center justify-center">
        <ParallaxBackground
          speed={0.3}
          className="bg-gradient-to-br from-primary/20 to-accent/20"
          overlay={true}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </ParallaxBackground>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Section Transitions
          </h1>
          <p className="text-xl text-muted-foreground">
            Scroll down to see different divider and parallax effects
          </p>
        </div>
      </div>

      {/* Animated Divider */}
      <AnimatedSectionDivider className="my-16" />

      {/* Section 1: Line Divider */}
      <ParallaxSection
        id="section-1"
        speed="slow"
        className="py-20 container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Line Divider</h2>
          <p className="text-lg text-muted-foreground mb-8">
            A simple horizontal line with gradient animation. Perfect for subtle section breaks.
          </p>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <p>Content with parallax effect (slow speed)</p>
          </div>
        </div>
      </ParallaxSection>

      <SectionDivider variant="line" className="my-16" />

      {/* Section 2: Wave Divider */}
      <SectionTransition id="section-2" className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Wave Divider</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Smooth wave pattern that animates on scroll. Great for organic, flowing designs.
          </p>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <p>Content with fade and slide transition</p>
          </div>
        </div>
      </SectionTransition>

      <SectionDivider variant="wave" className="my-16" />

      {/* Section 3: Multi-layer Parallax */}
      <ParallaxSection id="section-3" enableParallax={false} className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center relative">
          <ParallaxLayer speed={0.2} zIndex={1}>
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          </ParallaxLayer>
          
          <ParallaxLayer speed={0.5} zIndex={2}>
            <h2 className="text-4xl font-bold mb-6">Multi-Layer Parallax</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Multiple layers moving at different speeds create depth perception.
            </p>
          </ParallaxLayer>
          
          <ParallaxLayer speed={0.8} zIndex={3}>
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <p>This card moves faster than the background elements</p>
            </div>
          </ParallaxLayer>
          
          <ParallaxLayer speed={0.2} zIndex={1}>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          </ParallaxLayer>
        </div>
      </ParallaxSection>

      <SectionDivider variant="gradient" className="my-20" />

      {/* Section 4: Dots Divider */}
      <ParallaxSection
        id="section-4"
        speed="medium"
        className="py-20 container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Dots Divider</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Animated dots that scale in sequentially. Minimal and elegant.
          </p>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <p>Content with medium parallax speed</p>
          </div>
        </div>
      </ParallaxSection>

      <SectionDivider variant="dots" className="my-12" />

      {/* Section 5: Zigzag Divider */}
      <SectionTransition id="section-5" delay={0.2} className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Zigzag Divider</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Zigzag pattern with path animation. Adds energy and movement.
          </p>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <p>Content with delayed transition animation</p>
          </div>
        </div>
      </SectionTransition>

      <SectionDivider variant="zigzag" className="my-12" />

      {/* Final Section */}
      <ParallaxSection
        id="final"
        speed="fast"
        className="py-20 container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Mix and Match</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Combine different dividers and parallax effects to create unique section transitions
            that match your design aesthetic.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground">
                All effects use GPU-accelerated transforms for smooth 60fps animations
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Respects prefers-reduced-motion and includes proper ARIA attributes
              </p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      <div className="py-20 text-center text-muted-foreground">
        <p>End of examples</p>
      </div>
    </div>
  );
};

export default SectionTransitionsExample;
