# Performance Optimization & SEO Guide

This document outlines all performance optimizations and SEO enhancements implemented in the portfolio and blog websites.

## Table of Contents

1. [Image Optimization](#image-optimization)
2. [Code Splitting & Bundle Optimization](#code-splitting--bundle-optimization)
3. [SEO Implementation](#seo-implementation)
4. [Performance Monitoring](#performance-monitoring)
5. [Best Practices](#best-practices)

---

## Image Optimization

### Next.js Image Component

All images should use the Next.js `Image` component for automatic optimization:

```tsx
import Image from 'next/image';

<Image
  src="/images/profile.jpg"
  alt="Profile picture"
  width={400}
  height={400}
  priority={false} // Set to true for above-the-fold images
/>
```

### OptimizedImage Component

A custom wrapper component is available at `src/components/shared/OptimizedImage.tsx` that provides:
- Automatic format conversion (WebP, AVIF)
- Lazy loading
- Error handling with fallback images
- Responsive sizing

### Image Configuration

Configured in `next.config.ts`:
- Supports AVIF and WebP formats for better compression
- Responsive image sizes for different devices
- Device-specific breakpoints

---

## Code Splitting & Bundle Optimization

### Dynamic Imports

Use dynamic imports for large components and libraries:

```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});
```

### Bundle Analyzer

Analyze bundle size with:

```bash
npm run analyze
```

This generates a visual report of your bundle composition.

### Optimization Features

Configured in `next.config.ts`:
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Minification**: Compresses JavaScript and CSS
- **Console Removal**: Removes console logs in production (except errors/warnings)
- **Package Optimization**: Optimizes imports from framer-motion and other libraries

---

## SEO Implementation

### Dynamic Metadata

Each page has dynamic metadata for SEO:

**Homepage** (`app/page.tsx`):
```tsx
export const metadata: Metadata = {
  title: 'Tanushree T B - Portfolio',
  description: '...',
  keywords: [...],
  openGraph: {...},
  twitter: {...},
};
```

**Blog Posts** (`app/blog/[slug]/page.tsx`):
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    // ... more metadata
  };
}
```

### Sitemap Generation

Automatic sitemap generation at `app/sitemap.ts`:
- Portfolio homepage
- Blog homepage
- All blog posts

Access at: `https://your-domain.com/sitemap.xml`

### Robots.txt

Configured at `app/robots.ts`:
- Allows all search engines
- Points to sitemap
- No restricted pages

Access at: `https://your-domain.com/robots.txt`

### Structured Data (JSON-LD)

Implemented on:
- **Homepage**: Person schema with professional information
- **Blog Posts**: BlogPosting schema with article metadata

This helps search engines understand your content and can result in rich snippets.

### SEO Helper Component

Use the SEO helper at `src/components/shared/SEO.tsx`:

```tsx
import { generatePageMetadata } from '@/components/shared/SEO';

export const metadata = generatePageMetadata({
  title: 'About | Tanushree T B',
  description: '...',
  keywords: [...],
});
```

---

## Performance Monitoring

### Web Vitals Tracking

Utilities available at `src/utils/performance.ts`:

```tsx
import { reportWebVitals } from '@/utils/performance';

// Track Core Web Vitals
export function reportWebVitals(metric) {
  reportWebVitals(metric);
}
```

### Performance Metrics

Monitor these Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTFB** (Time to First Byte): < 600ms

### Performance Utilities

```tsx
import { 
  measureRenderTime,
  prefersReducedData,
  getPerformanceMetrics 
} from '@/utils/performance';

// Measure component render time
const measure = measureRenderTime('MyComponent');
// ... render logic
measure.end();

// Check for slow connections
if (prefersReducedData()) {
  // Load lighter version
}

// Get current metrics
const metrics = getPerformanceMetrics();
```

---

## Best Practices

### Image Best Practices

1. **Use Next.js Image component** for all images
2. **Set priority={true}** for above-the-fold images
3. **Provide width and height** to prevent layout shift
4. **Use appropriate formats**: WebP/AVIF for photos, SVG for icons
5. **Optimize image sizes** before uploading

### Code Splitting Best Practices

1. **Dynamic import** for:
   - Large third-party libraries
   - Route-specific components
   - Below-the-fold content
   - Modal/dialog content

2. **Avoid dynamic import** for:
   - Small components (< 5KB)
   - Above-the-fold content
   - Critical rendering path

### SEO Best Practices

1. **Unique titles** for each page (50-60 characters)
2. **Compelling descriptions** (150-160 characters)
3. **Relevant keywords** (5-10 per page)
4. **Open Graph tags** for social sharing
5. **Structured data** for rich snippets
6. **Mobile-friendly** design
7. **Fast load times** (< 3s)
8. **HTTPS** enabled
9. **Semantic HTML** structure
10. **Alt text** for all images

### Performance Checklist

- ✅ Next.js Image optimization enabled
- ✅ Code splitting configured
- ✅ Bundle analyzer installed
- ✅ Dynamic metadata on all pages
- ✅ Sitemap generated
- ✅ Robots.txt configured
- ✅ Structured data implemented
- ✅ Console logs removed in production
- ✅ Compression enabled
- ✅ ETags enabled
- ✅ Source maps disabled in production

---

## Testing Performance

### Build Analysis

```bash
# Analyze bundle size
npm run analyze

# Build for production
npm run build

# Check build output for bundle sizes
```

### Lighthouse Testing

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Real Device Testing

Test on:
- Mobile devices (iOS, Android)
- Tablets
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Slow 3G network simulation

---

## Environment Variables

Add to `.env.local`:

```env
# Base URL for sitemap and canonical URLs
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Enable bundle analyzer
ANALYZE=true
```

---

## Deployment Checklist

Before deploying to production:

1. ✅ Run `npm run build` successfully
2. ✅ Check bundle sizes with `npm run analyze`
3. ✅ Test all pages load correctly
4. ✅ Verify sitemap.xml is accessible
5. ✅ Verify robots.txt is accessible
6. ✅ Test on mobile devices
7. ✅ Run Lighthouse audit
8. ✅ Check Core Web Vitals
9. ✅ Verify all images load
10. ✅ Test theme switching
11. ✅ Verify all links work
12. ✅ Check console for errors

---

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

## Monitoring in Production

Consider integrating:
- **Google Analytics** for traffic analysis
- **Google Search Console** for SEO monitoring
- **Vercel Analytics** for Web Vitals tracking
- **Sentry** for error tracking
- **LogRocket** for session replay

---

## Continuous Optimization

Performance optimization is an ongoing process:

1. **Monitor** Core Web Vitals regularly
2. **Analyze** bundle size after each major change
3. **Test** on real devices and networks
4. **Update** dependencies regularly
5. **Review** Lighthouse scores monthly
6. **Optimize** based on user feedback and analytics

---

For questions or issues, refer to the Next.js documentation or open an issue in the project repository.
