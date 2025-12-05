# Performance Optimizations

This document outlines the performance optimizations implemented to achieve 60fps animations and optimal page load times.

## Overview

All optimizations target Requirements 8.1, 8.2, 8.4, and 8.5 from the integrated portfolio redesign specification.

## Implemented Optimizations

### 1. Lazy Loading (Requirement 8.1, 8.4)

#### Component Code Splitting
Heavy components are dynamically imported to reduce initial bundle size:

```typescript
// src/app/page.tsx
const IntegratedHero = dynamic(
  () => import('@/components/portfolio/IntegratedHero').then(mod => ({ default: mod.IntegratedHero })),
  { ssr: true }
);
```

**Benefits:**
- Reduced initial JavaScript bundle size
- Faster Time to Interactive (TTI)
- Better First Contentful Paint (FCP)

#### Image Lazy Loading
- `OptimizedImage` component with built-in lazy loading
- Blur placeholder while loading
- Automatic WebP/AVIF format support via Next.js
- Responsive image sizing

**Usage:**
```typescript
<OptimizedImage
  src="/images/project.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  showPlaceholder
  animateOnLoad
/>
```

#### Modal Lazy Loading
- Blog post modal only loads when opened
- Reduces initial page weight
- Improves perceived performance

### 2. Scroll Event Optimization (Requirement 8.2, 8.5)

#### RAF (RequestAnimationFrame) Throttling
All scroll handlers use RAF throttling for optimal 60fps performance:

```typescript
// src/utils/debounce.ts
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function executedFunction(...args: Parameters<T>): void {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  };
}
```

**Applied to:**
- `useParallax` hook
- `SmoothScrollNav` component
- `useScrollSpy` hook

**Benefits:**
- Ensures scroll handlers run at most once per frame
- Prevents layout thrashing
- Maintains 60fps during scroll

### 3. Animation Performance (Requirement 8.2, 8.5)

#### GPU Acceleration
All animations use GPU-accelerated properties only:
- `transform` (translateX, translateY, scale, rotate)
- `opacity`

**Avoided properties:**
- `width`, `height` (trigger layout)
- `top`, `left` (trigger layout)
- `margin`, `padding` (trigger layout)

#### will-change Property
Strategic use of `will-change` to hint browser optimization:

```css
/* Applied before animation */
.optimized-animation {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU layer */
}

/* Removed after animation */
.animation-complete {
  will-change: auto;
}
```

**Important:** `will-change` is removed after animations complete to avoid memory issues.

#### Force Hardware Acceleration
```css
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### 4. Performance Monitoring (Requirement 8.5)

#### Development Tools

**PerformanceMonitor Component:**
- Real-time FPS monitoring
- Long task detection
- Visual performance indicators
- Only active in development mode

**Usage:**
- Click "Show Perf" button in bottom-right corner
- Monitor FPS (target: 60fps)
- Track long tasks (target: <50ms)

**Performance Test Suite:**
```typescript
import { runPerformanceTestSuite } from '@/utils/performanceTest';

// Run comprehensive tests
const results = await runPerformanceTestSuite();
```

**Tests include:**
1. Idle performance
2. Scroll performance
3. Animation stress test

### 5. Passive Event Listeners

All scroll and touch event listeners use `{ passive: true }`:

```typescript
window.addEventListener('scroll', handler, { passive: true });
```

**Benefits:**
- Prevents scroll blocking
- Improves scroll responsiveness
- Better mobile performance

### 6. Intersection Observer

Efficient viewport detection for animations:

```typescript
const observer = new IntersectionObserver(callback, {
  rootMargin: '50px', // Start loading 50px before viewport
  threshold: 0.01,    // Trigger at 1% visibility
});
```

**Benefits:**
- More efficient than scroll listeners
- Automatic cleanup
- Better battery life on mobile

## Performance Targets

### Animation Performance
- **Target FPS:** 60fps
- **Minimum FPS:** 55fps (acceptable)
- **Critical FPS:** 30fps (minimum acceptable)

### Page Load Performance
- **First Contentful Paint (FCP):** <1.5s
- **Time to Interactive (TTI):** <3s
- **Lighthouse Performance Score:** 90+ (mobile)

### Long Tasks
- **Target:** <50ms per task
- **Maximum:** <100ms per task

## Testing Performance

### Manual Testing

1. **Enable Performance Monitor:**
   ```
   - Run in development mode
   - Click "Show Perf" button
   - Monitor FPS during interactions
   ```

2. **Chrome DevTools:**
   ```
   - Open DevTools (F12)
   - Go to Performance tab
   - Record interaction
   - Check for:
     - Frame rate (should be ~60fps)
     - Long tasks (should be minimal)
     - Layout thrashing (should be none)
   ```

3. **Lighthouse Audit:**
   ```
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run audit for Performance
   - Target: 90+ score
   ```

### Automated Testing

Run the performance test suite:

```typescript
// In browser console or test file
import { runPerformanceTestSuite } from '@/utils/performanceTest';

const results = await runPerformanceTestSuite();
console.log(results);
```

## Optimization Checklist

- [x] Lazy load heavy components
- [x] Lazy load images with blur placeholder
- [x] Lazy load modal components
- [x] Debounce/throttle scroll handlers with RAF
- [x] Use GPU-accelerated properties only
- [x] Apply will-change strategically
- [x] Use passive event listeners
- [x] Implement Intersection Observer
- [x] Add performance monitoring tools
- [x] Create performance test suite
- [x] Optimize animation variants
- [x] Force hardware acceleration where needed

## Best Practices

### DO:
✅ Use `transform` and `opacity` for animations
✅ Apply `will-change` before animations, remove after
✅ Use RAF throttling for scroll handlers
✅ Use passive event listeners
✅ Lazy load below-the-fold content
✅ Monitor performance in development

### DON'T:
❌ Animate layout properties (width, height, top, left)
❌ Leave `will-change` applied permanently
❌ Use synchronous scroll handlers
❌ Load all components upfront
❌ Ignore performance warnings

## Troubleshooting

### Low FPS (<55fps)

1. **Check for layout thrashing:**
   - Open Chrome DevTools Performance tab
   - Look for purple "Layout" bars
   - Batch DOM reads and writes

2. **Check for heavy computations:**
   - Look for long yellow "Scripting" bars
   - Move heavy work to Web Workers
   - Debounce expensive operations

3. **Check for too many animations:**
   - Reduce number of simultaneous animations
   - Simplify animation complexity
   - Use CSS animations for simple effects

### High Memory Usage

1. **Check for will-change overuse:**
   - Ensure will-change is removed after animations
   - Don't apply will-change to too many elements

2. **Check for memory leaks:**
   - Ensure event listeners are cleaned up
   - Check for detached DOM nodes
   - Use Chrome DevTools Memory profiler

### Slow Page Load

1. **Check bundle size:**
   ```bash
   npm run analyze
   ```

2. **Check for render-blocking resources:**
   - Use Lighthouse audit
   - Defer non-critical JavaScript
   - Inline critical CSS

## Resources

- [Web Performance Working Group](https://www.w3.org/webperf/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Framer Motion Performance](https://www.framer.com/motion/guide-reduce-bundle-size/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)

## Maintenance

### Regular Performance Audits

Run performance audits:
- Before each release
- After adding new features
- When performance issues are reported

### Performance Budget

Maintain these budgets:
- **JavaScript bundle:** <200KB (gzipped)
- **CSS bundle:** <50KB (gzipped)
- **Images:** WebP/AVIF, properly sized
- **Fonts:** Subset, preloaded

### Monitoring

Monitor in production:
- Core Web Vitals (LCP, FID, CLS)
- Real User Monitoring (RUM)
- Error tracking
- Performance regression alerts
