# ProjectsShowcase - Quick Start Guide

## Basic Usage

### 1. Import the Component

```tsx
import { ProjectsShowcase } from "@/components/portfolio/ProjectsShowcase";
import { portfolioData } from "@/data/portfolio";
```

### 2. Add to Your Page

```tsx
export default function ProjectsPage() {
  return (
    <ProjectsShowcase
      projects={portfolioData.projects}
      layout="bento"
      title="My Projects"
      description="Check out my latest work"
    />
  );
}
```

## Layout Options

### Bento Grid (Recommended)

Creates a visually interesting asymmetric layout where the first project is featured.

```tsx
<ProjectsShowcase
  projects={projects}
  layout="bento" // First project spans 2x2 grid cells
/>
```

**Best for:**

- Highlighting a featured project
- Creating visual interest
- Modern, magazine-style layouts

### Standard Grid

Uniform card sizes in a responsive grid.

```tsx
<ProjectsShowcase
  projects={projects}
  layout="grid" // All cards same size
/>
```

**Best for:**

- Equal emphasis on all projects
- Consistent visual rhythm
- Traditional portfolio layouts

## Project Data Structure

Ensure your projects follow this structure:

```typescript
const project: ProjectData = {
  id: "unique-id",
  title: "Project Name",
  description: "Detailed description of the project",
  technologies: ["React", "TypeScript", "Tailwind"],
  role: "Lead Developer", // Optional
  achievements: ["Won first prize"], // Optional
  link: "https://project-url.com", // Optional
  image: "/images/project.jpg", // Optional but recommended
  featured: true, // Optional, for bento grid
};
```

## Customization Examples

### Custom Section Title and Description

```tsx
<ProjectsShowcase
  projects={projects}
  title="Featured Work"
  description="Explore my portfolio of web applications and creative projects"
/>
```

### Without Description

```tsx
<ProjectsShowcase projects={projects} title="Projects" />
```

### Minimal Setup

```tsx
<ProjectsShowcase projects={projects} />
// Uses defaults: "Featured Projects" title, bento layout
```

## Integration with Main Page

### Option 1: Direct Integration

```tsx
// src/app/page.tsx
import { ProjectsShowcase } from "@/components/portfolio/ProjectsShowcase";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProjectsShowcase projects={portfolioData.projects} />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
```

### Option 2: Separate Projects Page

```tsx
// src/app/projects/page.tsx
import { ProjectsShowcase } from "@/components/portfolio/ProjectsShowcase";
import { portfolioData } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <ProjectsShowcase projects={portfolioData.projects} layout="bento" />
    </main>
  );
}
```

## Styling Customization

The component uses Tailwind CSS classes. You can customize by:

### 1. Wrapping in a Container

```tsx
<div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
  <ProjectsShowcase projects={projects} />
</div>
```

### 2. Adjusting Section Padding

The component has built-in padding (`py-20 px-4 md:px-8`). Override by wrapping:

```tsx
<div className="py-32">
  <ProjectsShowcase projects={projects} />
</div>
```

## Adding Images

### Using Public Folder

```typescript
// src/data/portfolio.ts
{
  id: 'project-1',
  title: 'My Project',
  image: '/images/projects/project-1.jpg',  // Place in public/images/projects/
  // ... other fields
}
```

### Using External URLs

```typescript
{
  id: 'project-1',
  title: 'My Project',
  image: 'https://example.com/project-image.jpg',
  // ... other fields
}
```

### Using Next.js Image Optimization (Future Enhancement)

Currently uses `<img>` tags. To use Next.js `<Image>`:

1. Update ProjectCard3D.tsx to import `Image` from 'next/image'
2. Replace `<motion.img>` with `<Image>` component
3. Add width and height props

## Accessibility

The component is fully accessible out of the box:

- ✅ Keyboard navigation (Tab, Enter, ESC)
- ✅ Screen reader support
- ✅ Reduced motion support
- ✅ Semantic HTML
- ✅ ARIA labels

### Testing Accessibility

```bash
# Run with screen reader
# Press Tab to navigate
# Press Enter to open project details
# Press ESC to close modal
```

## Performance Tips

### 1. Optimize Images

```bash
# Use optimized image formats
- WebP for modern browsers
- JPEG for photos
- PNG for graphics with transparency
```

### 2. Lazy Load Images

Add `loading="lazy"` to images (future enhancement):

```tsx
<img src={project.image} alt={project.title} loading="lazy" />
```

### 3. Limit Number of Projects

For best performance, show 6-12 projects per page:

```tsx
<ProjectsShowcase projects={portfolioData.projects.slice(0, 9)} />
```

## Common Issues

### Issue: Cards Not Animating

**Solution:** Ensure Framer Motion is installed:

```bash
npm install framer-motion
```

### Issue: 3D Tilt Not Working

**Solution:** Check that `prefersReducedMotion` is not enabled in your system settings.

### Issue: Modal Not Closing

**Solution:** Ensure you're not preventing event propagation on parent elements.

### Issue: Images Not Loading

**Solution:**

1. Check image paths are correct
2. Ensure images are in the `public` folder
3. Verify image URLs are accessible

## Demo

Visit `/projects-showcase-demo` to see:

- Both layout options in action
- Interactive 3D effects
- Modal functionality
- Responsive behavior

## Support

For issues or questions:

1. Check the main README: `PROJECTS_SHOWCASE_README.md`
2. Review the implementation summary: `TASK_4_IMPLEMENTATION_SUMMARY.md`
3. Examine the test file for usage examples: `__tests__/ProjectsShowcase.test.tsx`
