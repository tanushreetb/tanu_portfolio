# IntegratedHero Component

## Overview

The `IntegratedHero` component is a modern, animated hero section featuring kinetic typography, gradient animations, parallax effects, and interactive CTA buttons. It creates a memorable first impression with a carefully choreographed animation sequence.

## Features

✅ **Character-by-character text reveal** - Name animates in letter by letter
✅ **Gradient background animation** - Smooth, infinite gradient shift
✅ **Staggered entrance animations** - Name, title, description, and CTAs animate in sequence
✅ **Animated CTA buttons** - Interactive hover and tap effects
✅ **Parallax effect on scroll** - Background moves at different speed for depth
✅ **Scroll indicator** - Animated scroll prompt at bottom
✅ **Responsive design** - Adapts to all screen sizes
✅ **Accessibility compliant** - ARIA labels and semantic HTML
✅ **Reduced motion support** - Respects user preferences

## Animation Sequence

The component follows a carefully timed animation sequence:

1. **0-0.5s**: Gradient background fades in
2. **0.5-1.5s**: Name reveals character by character
3. **1.5-2s**: Title slides up with fade
4. **2-2.5s**: Description fades in
5. **2.5-3s**: CTA buttons scale in with stagger
6. **3s+**: Scroll indicator appears

## Usage

### Basic Usage

```tsx
import { IntegratedHero } from '@/components/portfolio/IntegratedHero';

<IntegratedHero
  name="Your Name"
  title="Your Professional Title"
  description="A brief description about yourself and what you do."
  ctaButtons={[
    { label: "View Projects", href: "#projects", variant: "primary" },
    { label: "Contact Me", href: "#contact", variant: "secondary" }
  ]}
/>
```

### With Portfolio Data

```tsx
import { IntegratedHero } from '@/components/portfolio/IntegratedHero';
import { portfolioData } from '@/data/portfolio';

<IntegratedHero
  name={portfolioData.personal.name}
  title={portfolioData.personal.title}
  description="Passionate about creating innovative solutions through Machine Learning and Web Development."
  ctaButtons={[
    { label: "View Projects", href: "#projects", variant: "primary" },
    { label: "Get in Touch", href: "#contact", variant: "secondary" }
  ]}
/>
```

## Props

### IntegratedHeroProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The main heading text (typically your name) |
| `title` | `string` | Yes | Your prof