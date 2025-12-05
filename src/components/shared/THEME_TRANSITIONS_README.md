# Theme Transition Animations

## Overview

This implementation provides enhanced theme transition animations that create a smooth, coordinated visual experience when switching between light and dark modes. All theme-dependent elements transition together with proper timing and easing.

**Requirements Implemented:**
- 9.1: Enhanced theme toggle with coordinated color transitions
- 9.2: Gradient cross-fade for backgrounds
- 9.3: Smooth transitions for all theme-dependent elements
- 9.4: Updated shadow and overlay colors with theme

## Features

### 1. Coordinated Color Transitions (Requirement 9.1)

All theme-dependent properties transition smoothly together:
- Background colors
- Text colors
- Border colors
- Box shadows
- Fill and stroke colors

**Implementation:**
```css
/* All elements get coordinated transitions */
*,
*::before,
*::after {
  transition-property: background-color, color, border-color, box-shadow, fill, stroke;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 2. Gradient Cross-Fade (Requirement 9.2)

Gradients smoothly transition between light and dark theme colors:

**Gradient Overlay:**
```tsx
<div className="gradient-overlay">
  {/* Content */}
</div>
```

**Animated Gradient Background:**
```tsx
<div className="animated-gradient-bg">
  {/* Content with animated gradient */}
</div>
```

### 3. Animation Continuity (Requirement 9.3)

Ongoing animations continue smoothly during theme transitions without interruption:

```tsx
// Animations maintain their state during theme changes
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 3, repeat: Infinity }}
>
  {/* Content continues animating during theme change */}
</motion.div>
```

### 4. Theme-Aware Shadows and Overlays (Requirement 9.4)

Shadows and overlays automatically adjust their intensity based on the current theme:

**Shadow Utilities:**
```tsx
<div className="shadow-theme-sm">Small shadow</div>
<div className="shadow-theme-md">Medium shadow</div>
<div className="shadow-theme-lg">Large shadow</div>
<div className="shadow-theme-xl">Extra large shadow</div>
```

**Overlay Utilities:**
```tsx
<div className="overlay-light">Light overlay (90% opacity)</div>
<div className="overlay-medium">Medium overlay (70% opacity)</div>
<div className="overlay-dark">Dark overlay (50% opacity)</div>
```

## Usage

### Basic Theme Toggle

The theme toggle button in `SmoothScrollNav` includes enhanced visual transitions:

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```

### Detecting Theme Transitions

Use the `useThemeTransition` hook to detect when a theme transition is in progress:

```tsx
import { useThemeTransition } from '@/hooks/useThemeTransition';

function MyComponent() {
  const isTransitioning = useThemeTransition();
  
  return (
    <div className={isTransitioning ? 'transitioning' : ''}>
      {/* Content that responds to transitions */}
    </div>
  );
}
```

### Theme-Aware Styling

Use the provided utility classes for automatic theme transitions:

```tsx
<div className="bg-theme-surface text-theme-primary border-theme shadow-theme-md">
  {/* All properties transition smoothly on theme change */}
</div>
```

## CSS Utility Classes

### Background Colors
- `bg-theme-background` - Main background color
- `bg-theme-surface` - Surface/card background color
- `bg-theme-primary` - Primary accent background

### Text Colors
- `text-theme-primary` - Primary text color
- `text-theme-secondary` - Secondary text color
- `text-theme-accent` - Accent text color

### Borders
- `border-theme` - Theme-aware border color
- `border-theme-light` - Light border with theme transition

### Shadows
- `shadow-theme-sm` - Small shadow (adjusts for theme)
- `shadow-theme-md` - Medium shadow (adjusts for theme)
- `shadow-theme-lg` - Large shadow (adjusts for theme)
- `shadow-theme-xl` - Extra large shadow (adjusts for theme)

### Overlays
- `overlay-light` - Light overlay (90% opacity)
- `overlay-medium` - Medium overlay (70% opacity)
- `overlay-dark` - Dark overlay (50% opacity)

### Gradients
- `gradient-overlay` - Cross-fading gradient background
- `animated-gradient-bg` - Animated gradient with theme support
- `gradient-bg-light` - Light theme gradient
- `gradient-bg-dark` - Dark theme gradient

### Hover Effects
- `hover-lift` - Lift effect with theme-aware shadow
- `hover-scale` - Scale effect on hover
- `hover-glow` - Glow effect with theme-aware color

## Accessibility

### Reduced Motion Support

The theme transition system respects the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --theme-transition-duration: 0.01ms;
  }
  
  * {
    transition-duration: 0.01ms !important;
  }
}
```

Users who prefer reduced motion will experience instant theme changes without transitions.

### Keyboard Navigation

The theme toggle button is fully keyboard accessible:
- Focusable with Tab key
- Activatable with Enter or Space
- Clear focus indicators
- Descriptive ARIA labels

## Performance

### GPU Acceleration

Theme transitions use GPU-accelerated properties where possible:
- `opacity` for fade effects
- `transform` for scale and rotation
- Avoids layout-triggering properties during transitions

### Optimized Transitions

- Transition duration: 400ms (optimal for perceived smoothness)
- Easing function: `cubic-bezier(0.4, 0, 0.2, 1)` (material design standard)
- Debounced scroll events to prevent performance issues
- Coordinated timing prevents visual jarring

## Example Component

See `ThemeTransitionExample.tsx` for a comprehensive demonstration of all theme transition features:

```tsx
import ThemeTransitionExample from '@/components/shared/ThemeTransitionExample';

function Page() {
  return <ThemeTransitionExample />;
}
```

## Technical Details

### Theme Context Enhancement

The `ThemeContext` has been enhanced to coordinate transitions:

1. Adds `theme-transitioning` class to document root
2. Updates theme state and localStorage
3. Updates `data-theme` attribute for CSS variables
4. Removes transitioning class after 400ms

### CSS Custom Properties

Theme colors are defined as CSS custom properties:

```css
:root {
  --color-primary: #0052a3;
  --color-background: #ffffff;
  /* ... more colors */
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-background: #111827;
  /* ... more colors */
}
```

### Transition Coordination

The `theme-transitioning` class ensures all elements transition together:

```css
.theme-transitioning {
  --theme-transition-active: true;
}

.theme-transitioning [class*="animate-"] {
  animation-play-state: running;
}
```

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Fallback to instant theme changes if transitions not supported

## Testing

To test theme transitions:

1. Toggle theme using the button in the navigation
2. Observe smooth color transitions across all elements
3. Check that animations continue during theme change
4. Verify shadows and overlays adjust appropriately
5. Test with reduced motion preference enabled

## Future Enhancements

Potential improvements for future iterations:

1. Multiple theme options (not just light/dark)
2. Custom transition duration preferences
3. Per-component transition timing
4. Theme transition sound effects (optional)
5. Transition preview before applying
