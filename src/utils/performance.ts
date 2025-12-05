/**
 * Performance Monitoring Utilities
 * 
 * Utilities for monitoring and optimizing web performance metrics.
 * Tracks Core Web Vitals and provides performance insights.
 * 
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): Loading performance
 * - FID (First Input Delay): Interactivity
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FCP (First Contentful Paint): Initial render
 * - TTFB (Time to First Byte): Server response time
 */

/**
 * Report Web Vitals to analytics
 * 
 * This function can be used in _app.tsx or layout.tsx to track
 * performance metrics and send them to your analytics service.
 * 
 * Usage in app/layout.tsx:
 * ```tsx
 * import { reportWebVitals } from '@/utils/performance';
 * 
 * export function reportWebVitals(metric: NextWebVitalsMetric) {
 *   reportWebVitals(metric);
 * }
 * ```
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  label: string;
  value: number;
}) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}:`, metric.value);
  }

  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    // window.gtag?.('event', metric.name, {
    //   value: Math.round(metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // });

    // Example: Send to custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify(metric),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  }
}

/**
 * Measure component render time
 * 
 * Use this to identify slow-rendering components that may need optimization.
 * 
 * Usage:
 * ```tsx
 * const measure = measureRenderTime('MyComponent');
 * // ... component render logic
 * measure.end();
 * ```
 */
export function measureRenderTime(componentName: string) {
  const startTime = performance.now();

  return {
    end: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (process.env.NODE_ENV === 'development' && duration > 16) {
        // Warn if render takes longer than one frame (16ms at 60fps)
        console.warn(
          `[Performance] ${componentName} took ${duration.toFixed(2)}ms to render`
        );
      }

      return duration;
    },
  };
}

/**
 * Check if user prefers reduced data usage
 * 
 * Useful for conditionally loading heavy resources based on
 * user's network conditions and preferences.
 */
export function prefersReducedData(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Check for Save-Data header support
  const connection = (navigator as any).connection;
  if (connection?.saveData) return true;

  // Check for slow connection
  if (connection?.effectiveType) {
    return ['slow-2g', '2g'].includes(connection.effectiveType);
  }

  return false;
}

/**
 * Lazy load images with Intersection Observer
 * 
 * Provides a fallback for browsers that don't support native lazy loading.
 * Next.js Image component handles this automatically, but this is useful
 * for custom image implementations.
 */
export function setupLazyLoading() {
  if (typeof window === 'undefined') return;

  // Check if native lazy loading is supported
  if ('loading' in HTMLImageElement.prototype) {
    return; // Browser supports native lazy loading
  }

  // Fallback: Use Intersection Observer
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          imageObserver.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

/**
 * Prefetch critical resources
 * 
 * Preload resources that will be needed soon to improve perceived performance.
 */
export function prefetchResource(url: string, type: 'script' | 'style' | 'font' | 'image') {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = type;
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Performance optimization checklist:
 * 
 * ✓ Use Next.js Image component for automatic optimization
 * ✓ Enable code splitting with dynamic imports
 * ✓ Minimize JavaScript bundle size
 * ✓ Optimize CSS delivery (CSS Modules, Tailwind purge)
 * ✓ Use font-display: swap for web fonts
 * ✓ Implement lazy loading for below-the-fold content
 * ✓ Minimize layout shifts (CLS)
 * ✓ Optimize server response time (TTFB)
 * ✓ Use CDN for static assets
 * ✓ Enable compression (gzip/brotli)
 * ✓ Monitor Core Web Vitals
 * ✓ Test on real devices and slow networks
 */

/**
 * Get performance metrics
 * 
 * Returns current performance metrics for debugging and monitoring.
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  return {
    // Navigation timing
    dns: navigation?.domainLookupEnd - navigation?.domainLookupStart,
    tcp: navigation?.connectEnd - navigation?.connectStart,
    ttfb: navigation?.responseStart - navigation?.requestStart,
    download: navigation?.responseEnd - navigation?.responseStart,
    domInteractive: navigation?.domInteractive - navigation?.fetchStart,
    domComplete: navigation?.domComplete - navigation?.fetchStart,
    loadComplete: navigation?.loadEventEnd - navigation?.fetchStart,

    // Paint timing
    fcp: paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime,
    lcp: paint.find((entry) => entry.name === 'largest-contentful-paint')?.startTime,
  };
}
