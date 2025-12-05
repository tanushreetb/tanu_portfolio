# Smooth Scroll Navigation System

This document explains how to use the smooth scroll navigation system implemented for the integrated portfolio redesign.

## Components

### 1. SmoothScrollNav

A sticky navigation component with advanced scroll behavior and scroll spy functionality.

**Features:**
- ✅ Sticky header that stays at the top of the viewport
- ✅ Hides on scroll down, shows on scroll up
- ✅ Always visible when at the top of the page
- ✅ Scroll spy to highlight active section
- ✅ Smooth scroll to sections on click
- ✅ Integrated theme toggle
- ✅ Mobile responsive with hamburger menu
- ✅ Keyboard accessible
- ✅ ARIA labels for screen readers

**Props:**
```typescript
interface SmoothScrollNavProps {
  sections: NavSection[];  // Array of sections to navigate to
  className?: string;      // Optional additional CSS classes
}

interface NavSection {
  id: string;    // Must match the section's HTML id attribute
  label: string; // Display text for the navigation link
}
```

**Usage:**
```tsx
import { SmoothScrollNav } from '@/components/shared';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

<SmoothScrollNav sections={sections} />
```

### 2. ScrollProgress

A visual progress indicator showing scroll position through the page.

**Features:**
- ✅ Real-time scroll progress tracking
- ✅ Smooth animation with GPU acceleration
- ✅ Customizable color, height, and position
- ✅ Responsive to page height changes
- ✅ Accessible with ARIA progressbar role

**Props:**
```typescript
interface ScrollProgressProps {
  className?: string;           // Optional additional CSS classes
  color?: string;              // Tailwind color class (default: 'bg-blue-600')
  height?: number;             // Height in pixels (default: 3)
  position?: 'top' | 'bottom'; // Position on screen (default: 'top')
}
```

**Usage:**
```tsx
import { ScrollProgress } from '@/components/shared';

<ScrollProgress 
  color="bg-blue-600" 
  height={3} 
  position="top" 
/>
```

## Complete Integration Example

```tsx
'use client';

import { SmoothScrollNav, ScrollProgress } from '@/components/shared';

export default function IntegratedPortfolioPage() {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Navigation */}
      <SmoothScrollNav sections={sections} />
      
      {/* Main Content - Add pt-16 to account for fixed nav */}
      <main className="pt-16">
        <section id="hero" className="min-h-screen">
          {/* Hero content */}
        </section>
        
        <section id="about" className="min-h-screen">
          {/* About content */}
        </section>
        
        <section id="projects" className="min-h-screen">
          {/* Projects content */}
        </section>
        
        <section id="skills" className="min-h-screen">
          {/* Skills content */}
        </section>
        
        <section id="blog" className="min-h-screen">
          {/* Blog content */}
        </section>
        
        <section id="contact" className="min-h-screen">
          {/* Contact content */}
        </section>
      </main>
    </div>
  );
}
```

## Important Implementation Notes

### 1. Section IDs
Each section in your page **must** have an `id` attribute that matches the `id` in your sections array:

```tsx
// In sections array
{ id: 'projects', label: 'Projects' }

// In HTML
<section id="projects">...</section>
```

### 2. Content Padding
Add padding to your main content to prevent it from being hidden under the fixed navigation:

```tsx
<