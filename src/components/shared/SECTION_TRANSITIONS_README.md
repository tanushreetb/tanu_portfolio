# Section Dividers and Transitions

This document provides guidance on using the `SectionDivider` and `ParallaxSection` components to create smooth transitions and visual separators between portfolio sections.

## Components Overview

### SectionDivider

Visual separator between sections with animated transitions. Provides smooth visual breaks and enhances the flow between different content areas.

**Variants:**
- `line` - Simple horizontal line with gradient
- `wave` - Smooth wave pattern
- `gradient` - Animated gradient overlay
- `dots` - Series of animated dots
- `zigzag` - Zigzag pattern

### ParallaxSection

Wrapper component that adds parallax scroll effects to sections, creating depth perception by moving elements at different speeds.

**Sub-components:**
- `ParallaxLayer` - Individual layer with custom speed
- `ParallaxBackground` - Background layer optimized for images
- `SectionTransition` - Simple fade and slide animation wrapper

## Usage Examples

### Basic Section Divider

```tsx
import { SectionDivider } from '@/components/shared';

<SectionDivider variant="line" className="my-16" />
```

### Different Divider Variants

```tsx
// Wave divider
<SectionDivider variant="wave" className="my-12" />

// Gradient divider
<SectionDivider variant="gradient" className="my-20" />

// Dots divider
<SectionDivider variant="dots" className="my-8" />

// Zigzag divider
<SectionDivider variant="zigzag" className="my-12" />
```

### Animated Section Divider

```tsx
import { AnimatedSectionDivider } from '@/components/shared';

<AnimatedSectionDivider className="my-16" />
```

### Basic Parallax Section

```tsx
import { ParallaxSection } from '@/components/shared';

<ParallaxSection 
  id="about"
  speed="medium"
  direction="up"
  className="py-20"
>
  <h2>About Me</h2>
  <p>Content here...</p>
</ParallaxSection>
```

### Parallax with Multiple Layers

```tsx
import { ParallaxSection, ParallaxLayer } from '@/components/shared';

<ParallaxSection id="projects" enableParallax={false}>
  <ParallaxLayer speed={0.2} zIndex={1}>
    <div className="background-decoration" />
  </ParallaxLayer>
  
  <ParallaxLayer speed={0.5} zIndex={2}>
    <h2>Projects</h2>
  </ParallaxLayer>
  
  <ParallaxLayer speed={0.8} zIndex={3}>
    <div className="project-cards">
      {/* Project content */}
    </div>
  </ParallaxLayer>
</ParallaxSection>
```

### Parallax Background

```tsx
import { ParallaxBackground } from '@/components/shared';

<div className="relative min-h-screen">
  <ParallaxBackground
    speed={0.3}
    backgroundImage="/images/hero-bg.jpg"
    overlay={true}
  />
  
  <div className="relative z-10">
    {/* Content on top of parallax background */}
  </div>
</div>
```

### Section Transition

```tsx
import { SectionTransition } from '@/components/shared';

<SectionTransition id="skills" delay={0.2}>
  <h2>Skills</h2>
  <div className="skills-grid">
    {/* Skills content */}
  </div>
</SectionTransition>
```

## Complete Page Example

```tsx
import {
  SectionDivider,
  AnimatedSectionDivider,
  ParallaxSection,
  ParallaxBackground,
  SectionTransition
} from '@/components/shared';

export default function PortfolioPage() {
  return (
    <main>
      {/* Hero Section with Parallax Background */}
      <div className="relative min-h-screen">
        <ParallaxBackground
          speed={0.3}
          backgroundImage="/images/hero-bg.jpg"
          overlay={true}
        />
        <div className="relative z-10 container mx-auto">
          <h1>Welcome</h1>
        </div>
      </div>

      {/* Animated Divider */}
      <AnimatedSectionDivider className="my-16" />

      {/* About Section with Parallax */}
      <ParallaxSection
        id="about"
        speed="slow"
        className="py-20 container mx-auto"
      >
        <h2>About Me</h2>
        <p>Content here...</p>
      </ParallaxSection>

      {/* Wave Divider */}
      <SectionDivider variant="wave" className="my-16" />

      {/* Projects Section with Transition */}
      <SectionTransition id="projects" className="py-20 container mx-auto">
        <h2>Projects</h2>
        <div className="projects-grid">
          {/* Projects */}
        </div>
      </SectionTransition>

      {/* Gradient Divider */}
      <SectionDivider variant="gradient" className="my-20" />

      {/* Skills Section */}
      <ParallaxSection
        id="skills"
        speed="medium"
        className="py-20 container mx-auto"
      >
        <h2>Skills</h2>
        <div className="skills-grid">
          {/* Skills */}
        </div>
      </ParallaxSection>

      {/* Dots Divider */}
      <SectionDivider variant="dots" className="my-12" />

      {/* Contact Section */}
      <SectionTransition id="contact" className="py-20 container mx-auto">
        <h2>Contact</h2>
        <form>{/* Contact form */}</form>
      </SectionTransition>
    </main>
  );
}
```

## Props Reference

### SectionDivider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'line' \| 'wave' \| 'gradient' \| 'dots' \| 'zigzag'` | `'line'` | Style of divider |
| `className` | `string` | `''` | Additional CSS classes |
| `animate` | `boolean` | `true` | Whether to animate on scroll |

### ParallaxSection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to wrap |
| `speed` | `'slow' \| 'medium' \| 'fast' \| number` | `'medium'` | Parallax speed |
| `direction` | `'up' \| 'down'` | `'up'` | Direction of movement |
| `className` | `string` | `''` | Additional CSS classes |
| `enableParallax` | `boolean` | `true` | Toggle parallax effect |
| `animateOnScroll` | `boolean` | `true` | Animate on scroll into view |
| `id` | `string` | - | Section ID for navigation |

### ParallaxLayer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to wrap |
| `speed` | `number` | `0.5` | Parallax speed multiplier |
| `direction` | `'up' \| 'down'` | `'up'` | Direction of movement |
| `className` | `string` | `''` | Additional CSS classes |
| `zIndex` | `number` | `0` | Z-index for layering |

### ParallaxBackground Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Optional content overlay |
| `speed` | `number` | `0.3` | Parallax speed multiplier |
| `className` | `string` | `''` | Additional CSS classes |
| `backgroundImage` | `string` | - | URL of background image |
| `overlay` | `boolean` | `false` | Add gradient overlay |

### SectionTransition Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to wrap |
| `className` | `string` | `''` | Additional CSS classes |
| `delay` | `number` | `0` | Animation delay in seconds |
| `id` | `string` | - | Section ID for navigation |

## Accessibility

All divider components include `aria-hidden="true"` as they are purely decorative. The parallax effects respect the `prefers-reduced-motion` user preference and will be disabled automatically for users who prefer reduced motion.

## Performance Tips

1. **Limit Parallax Layers**: Use 2-3 layers maximum per section for best performance
2. **Optimize Images**: Use optimized images for `ParallaxBackground`
3. **Debounce Scroll**: The hooks already handle this, but avoid adding additional scroll listeners
4. **Use CSS Transforms**: The components use GPU-accelerated transforms for smooth animations
5. **Lazy Load**: Consider lazy loading sections that are below the fold

## Requirements Satisfied

- **2.1**: Scroll-triggered entrance animations for sections
- **2.2**: Unique effects with parallax and animated dividers
- **2.6**: Smooth transitions between sections with easing
