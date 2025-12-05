# ProjectsShowcase Component Suite

## Overview

The ProjectsShowcase component suite provides an interactive, animated project display system with 3D effects, bento grid layouts, and expandable detail views. This implementation fulfills task 4 of the integrated portfolio redesign specification.

## Components

### 1. ProjectsShowcase (Main Component)

The primary component that orchestrates the project display with layout options and animations.

**Features:**
- Bento grid or standard grid layout options
- Staggered entrance animations
- Scroll-triggered visibility detection
- Responsive design with mobile optimizations
- Empty state handling

**Usage:**
```tsx
import { ProjectsShowcase } from '@/components/portfolio/ProjectsShowcase';
import { portfolioData } from '@/data/portfolio';

<ProjectsShowcase
  projects={portfolioData.projects}
  layout="bento" // or "grid"
  title="Featured Projects"
  description="Explore my latest work"
/>
```

**Props:**
- `projects: ProjectData[]` - Array of project objects
- `layout?: 'bento' | 'grid'` - Layout style (default: 'bento')
- `title?: string` - Section title (default: 'Featured Projects')
- `description?: string` - Section description

### 2. ProjectCard3D

Enhanced project card with 3D tilt effect, image zoom, and hover animations.

**Features:**
- 3D tilt effect based on mouse position
- Image zoom on hover (1.1x scale)
- Smooth spring animations
- Tag animations on hover
- Featured badge for highlighted projects
- Responsive to reduced motion preferences

**Technical Details:**
- Uses Framer Motion's `useMotionValue` and `useSpring` for smooth 3D transforms
- Calculates mouse position relative to card center
- Applies perspective transforms for 3D effect
- Includes shine effect overlay on hover

**Usage:**
```tsx
import { ProjectCard3D } from '@/components/portfolio/ProjectCard3D';

<ProjectCard3D
  project={projectData}
  onExpand={handleExpand}
  featured={true}
/>
```

**Props:**
- `project: ProjectData` - Project information
- `onExpand?: (project: ProjectData) => void` - Callback when card is clicked
- `featured?: boolean` - Whether to display as featured (larger in bento grid)

### 3. ProjectDetailModal

Full-screen modal for displaying detailed project information.

**Features:**
- Smooth slide-up animation
- Backdrop blur effect
- ESC key to close
- Click outside to close
- Prevents body scroll when open
- Staggered content animations
- Focus management

**Usage:**
```tsx
import { ProjectDetailModal } from '@/components/portfolio/ProjectDetailModal';

<ProjectDetailModal
  project={selectedProject}
  isOpen={isModalOpen}
  onClose={handleClose}
/>
```

**Props:**
- `project: ProjectData | null` - Project to display
- `isOpen: boolean` - Modal visibility state
- `onClose: () => void` - Close callback

## Layout Options

### Bento Grid Layout

Asymmetric grid with varying card sizes for visual interest:
- First project (featured) spans 2 columns and 2 rows on desktop
- Remaining projects in standard grid cells
- Responsive: Single column on mobile, 2 columns on tablet, 3 columns on desktop

### Standard Grid Layout

Uniform card sizes in a responsive grid:
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop

## Animations

### Entrance Animations
- **Staggered Container**: Cards animate in sequence with 100ms delay
- **Scroll Trigger**: Animations trigger when section enters viewport
- **Fade + Slide**: Cards slide up while fading in

### Hover Animations
- **3D Tilt**: Card rotates based on mouse position (±10 degrees)
- **Image Zoom**: Project image scales to 1.1x
- **Card Lift**: Card scales to 1.02x and lifts 50px in z-space
- **Tag Pulse**: Technology tags scale to 1.05x
- **Shine Effect**: Gradient overlay fades in

### Modal Animations
- **Backdrop**: Fades in over 300ms
- **Content**: Slides up with scale from 0.95 to 1.0
- **Exit**: Reverses entrance animation

## Accessibility

### Keyboard Navigation
- Modal closes with ESC key
- All interactive elements are keyboard accessible
- Logical tab order maintained

### Reduced Motion
- Respects `prefers-reduced-motion` media query
- Disables 3D tilt and complex animations
- Maintains functionality without animations

### Screen Readers
- Semantic HTML structure
- ARIA labels on interactive elements
- Alt text for images
- Proper heading hierarchy

## Performance Optimizations

### Animation Performance
- Uses CSS transforms (GPU-accelerated)
- Spring animations with optimized stiffness/damping
- Debounced mouse move events
- Will-change hints for animated properties

### Image Handling
- Lazy loading ready (add loading="lazy" to img tags)
- Placeholder images included
- Responsive image support ready

### Code Splitting
- Modal component can be lazy loaded
- Framer Motion tree-shaking enabled

## Data Structure

Projects require the following structure:

```typescript
interface ProjectData {
  id: string;              // Unique identifier
  title: string;           // Project name
  description: string;     // Project description
  technologies: string[];  // Tech stack
  role?: string;          // Your role
  achievements?: string[]; // Awards/achievements
  link?: string;          // External link
  image?: string;         // Project image URL
  featured?: boolean;     // Featured flag for bento grid
}
```

## Styling

### Tailwind Classes
- Uses utility-first approach with Tailwind CSS
- Dark mode support with `dark:` variants
- Responsive breakpoints: `md:` (768px), `lg:` (1024px)

### Custom Styles
- 3D transforms with perspective
- Gradient overlays
- Shadow elevations
- Backdrop blur effects

## Browser Support

- Modern browsers with CSS Grid support
- Framer Motion requires JavaScript
- Graceful degradation for older browsers
- Fallback to standard grid on unsupported browsers

## Demo

Visit `/projects-showcase-demo` to see the component in action with both layout options.

## Requirements Fulfilled

✅ **5.1** - Unique layout (bento grid, masonry, carousel)  
✅ **5.2** - Animated card entrance with creative effects  
✅ **5.3** - Hover reveals additional information  
✅ **5.4** - Expandable detail view with smooth animation  
✅ **5.5** - Lazy loading and smooth image transitions  
✅ **5.6** - Animated tags, descriptions, and links  
✅ **2.2** - Unique effects appropriate to content type  

## Future Enhancements

- [ ] Add filtering by technology
- [ ] Implement search functionality
- [ ] Add sorting options (date, title, featured)
- [ ] Support for video thumbnails
- [ ] GitHub API integration for live project data
- [ ] Analytics tracking for project views
- [ ] Share functionality for projects
