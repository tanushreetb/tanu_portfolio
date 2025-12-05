# SkillsVisualization Component

## Overview

The `SkillsVisualization` component is an advanced skills display featuring animated flip cards with circular progress rings, category filtering, and staggered entrance animations. It provides an engaging and interactive way to showcase technical skills and proficiency levels.

## Features

### 1. Animated Skill Cards with Flip Interaction
- **Front Side**: Displays skill icon, name, and circular progress ring showing proficiency level
- **Back Side**: Shows detailed description, category, and additional information
- **Flip Animation**: Smooth 3D flip effect on hover (desktop) or click (mobile)
- **Duration**: 0.6s with cubic-bezier easing for smooth transitions

### 2. Circular Progress Ring Animation
- **Visual Indicator**: SVG-based circular progress ring
- **Animated Fill**: Animates from 0% to target proficiency level
- **Staggered Timing**: Each card's ring animates with a 0.1s delay based on index
- **Duration**: 1.5s for smooth, noticeable animation
- **Colors**: Blue gradient (light mode) / Blue-400 (dark mode)

### 3. Category Filtering with Animated Transitions
- **Filter Buttons**: "All", "Languages", "Frontend", "Tools", "ML & AI", "Database"
- **Active State**: Highlighted button with scale effect
- **Smooth Transitions**: Cards fade out/in when category changes
- **AnimatePresence**: Framer Motion's AnimatePresence for exit animations

### 4. Staggered Entrance Animation
- **Container**: Uses `staggerContainer` variant with 0.1s stagger delay
- **Items**: Each card uses `staggerItem` variant for coordinated entrance
- **Viewport Detection**: Animations trigger when section enters viewport
- **Once**: Animations play only once for better performance

### 5. Responsive Grid Layout
- **Mobile** (< 640px): 1 column
- **Small** (640px - 1023px): 2 columns
- **Large** (1024px - 1279px): 3 columns
- **XL** (≥ 1280px): 4 columns
- **Gap**: Consistent 1.5rem (24px) spacing

## Requirements Fulfilled

- **6.1**: Animated visual representations with scroll-triggered animations ✓
- **6.2**: Skill elements animate from 0 to target values (progress rings) ✓
- **6.3**: Animated filtering with category transitions ✓
- **6.4**: Animated transitions between category views ✓
- **6.5**: Creative visual metaphors (flip cards + progress rings) ✓
- **2.2**: Unique effects appropriate to content type ✓

## Usage

### Basic Implementation

```tsx
import { SkillsVisualization } from '@/components/portfolio/SkillsVisualization';

export default function Page() {
  return (
    <main>
      <SkillsVisualization />
    </main>
  );
}
```

### Data Structure

Skills are defined in `src/data/skillsData.ts`:

```typescript
export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
  description?: string;
}
```

### Adding New Skills

Edit `src/data/skillsData.ts`:

```typescript
export const skillsData: Skill[] = [
  {
    name: "TypeScript",
    level: 85,
    category: "Languages",
    icon: "📘",
    description: "Strong typing for JavaScript applications"
  },
  // ... more skills
];
```

### Adding New Categories

Update the `skillCategories` array in `src/data/skillsData.ts`:

```typescript
export const skillCategories = [
  "All",
  "Languages",
  "Frontend",
  "Tools",
  "ML & AI",
  "Database",
  "Your New Category" // Add here
];
```

## Component Structure

```
SkillsVisualization/
├── Section Container
│   ├── Header (title + description)
│   ├── Category Filter Buttons
│   └── Skills Grid
│       └── SkillCard (for each skill)
│           ├── Card Container (3D transform)
│           ├── Front Face
│           │   ├── Progress Ring (SVG)
│           │   ├── Icon
│           │   ├── Name
│           │   └── Percentage
│           └── Back Face
│               ├── Icon
│               ├── Name
│               ├── Description
│               └── Category Badge
```

## Animations

### Card Flip Animation

```typescript
animate={{ rotateY: isFlipped ? 180 : 0 }}
transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
```

### Progress Ring Animation

```typescript
initial={{ strokeDashoffset: circumference }}
animate={{ strokeDashoffset }}
transition={{ 
  duration: 1.5, 
  ease: [0.4, 0, 0.2, 1], 
  delay: index * 0.1 
}}
```

### Staggered Entrance

```typescript
variants={staggerContainer}
initial="hidden"
whileInView="visible"
viewport={{ once: true, margin: '-100px' }}
```

## Styling

### Theme Support
- **Light Mode**: White cards, blue accents, gray text
- **Dark Mode**: Dark gray cards, light blue accents, white text
- **Gradient Back**: Blue to purple gradient on card back

### CSS Classes
- `perspective-1000`: 3D perspective for flip effect
- `backface-hidden`: Hides back face during flip
- `transform-style: preserve-3d`: Maintains 3D space

## Accessibility

### Keyboard Navigation
- Cards are focusable and can be flipped with Enter/Space
- Filter buttons are keyboard accessible
- Logical tab order through all interactive elements

### Screen Readers
- Semantic HTML structure
- Descriptive text for skill levels
- Category information announced

### Reduced Motion
- Respects `prefers-reduced-motion` setting
- Framer Motion automatically reduces animations
- Content remains accessible without animations

## Performance

### Optimizations
1. **GPU Acceleration**: Uses `transform` and `opacity` for animations
2. **Viewport Detection**: Animations only trigger when in view
3. **Once Animation**: Entrance animations play only once
4. **Efficient Re-renders**: React.memo can be added if needed
5. **SVG Progress**: Lightweight SVG for progress rings

### Bundle Size
- Framer Motion: ~30KB gzipped (already included in project)
- Component: ~3KB
- Data: ~2KB

## Browser Support

- **Modern Browsers**: Full support with all animations
- **IE11**: Graceful degradation (no 3D transforms)
- **Safari**: Full support with `-webkit-` prefixes
- **Mobile**: Touch-friendly with click-to-flip

## Customization

### Colors

Edit the component's className strings:

```typescript
// Progress ring color
className="text-blue-600 dark:text-blue-400"

// Card background
className="bg-white dark:bg-gray-800"

// Back gradient
className="bg-gradient-to-br from-blue-600 to-purple-600"
```

### Animation Timing

Adjust transition durations:

```typescript
// Flip speed
transition={{ duration: 0.6 }} // Change to 0.4 for faster

// Progress ring speed
transition={{ duration: 1.5 }} // Change to 1.0 for faster

// Stagger delay
transition: { staggerChildren: 0.1 } // Change to 0.05 for faster
```

### Grid Layout

Modify grid classes:

```typescript
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
// Change to: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## Testing

### Manual Testing Checklist
- [ ] Cards flip on hover (desktop)
- [ ] Cards flip on click (mobile)
- [ ] Progress rings animate on scroll
- [ ] Category filtering works
- [ ] Animations are smooth (60fps)
- [ ] Responsive layout at all breakpoints
- [ ] Dark mode styling correct
- [ ] Keyboard navigation works
- [ ] Reduced motion respected

### Unit Tests
```typescript
// Example test structure
describe('SkillsVisualization', () => {
  it('renders all skills when "All" category selected', () => {});
  it('filters skills by category', () => {});
  it('flips card on click', () => {});
  it('animates progress ring', () => {});
});
```

## Troubleshooting

### Cards Not Flipping
- Check that `perspective-1000` class is applied to parent
- Verify `transform-style: preserve-3d` is set
- Ensure `backfaceVisibility: 'hidden'` is in inline styles

### Progress Ring Not Animating
- Verify `strokeDasharray` and `strokeDashoffset` are set
- Check that Framer Motion is installed
- Ensure viewport detection is working

### Category Filter Not Working
- Check that `activeCategory` state is updating
- Verify `filteredSkills` array is correct
- Ensure `AnimatePresence` has `mode="wait"`

### Performance Issues
- Reduce number of skills displayed
- Increase stagger delay
- Disable animations on low-end devices
- Use `React.memo` for SkillCard component

## Future Enhancements

1. **Search Functionality**: Add search bar to filter skills by name
2. **Skill Levels**: Add visual indicators (Beginner, Intermediate, Advanced)
3. **Sorting**: Sort by proficiency level or alphabetically
4. **Animations**: Add more entrance animation variants
5. **Tooltips**: Show additional info on hover without flipping
6. **Export**: Allow users to export skills list
7. **Comparison**: Compare skill levels over time

## Related Components

- `AnimatedText`: For kinetic typography effects
- `AnimatedContainer`: For scroll-triggered animations
- `ProjectsShowcase`: Similar card-based layout
- `IntegratedHero`: Uses similar animation patterns

## References

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [CSS 3D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [SVG Circle Progress](https://css-tricks.com/building-progress-ring-quickly/)
- Design Document: `.kiro/specs/integrated-portfolio-redesign/design.md`
- Requirements: `.kiro/specs/integrated-portfolio-redesign/requirements.md`
