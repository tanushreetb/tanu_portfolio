import type { NextConfig } from "next";

/**
 * Next.js Configuration for Performance Optimization
 * 
 * This configuration optimizes the application for:
 * - Bundle size reduction through code splitting
 * - Image optimization with Next.js Image component
 * - Production build optimization
 * - Static page generation for better performance
 * - Bundle analysis for monitoring bundle size
 */

// Bundle analyzer configuration (optional, enable with ANALYZE=true)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Define allowed image domains (add your image CDN domains here)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains (restrict in production)
      },
    ],
    // Image formats to support (modern formats for better compression)
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift with proper sizing
    minimumCacheTTL: 60,
    // Disable static image imports for better control
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production for smaller bundle size
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Keep error and warn logs
    } : false,
  },

  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports for smaller bundles
    optimizePackageImports: ['framer-motion', '@testing-library/react'],
    // Enable CSS optimization
    optimizeCss: true,
  },

  // Production source maps (disable for smaller builds)
  productionBrowserSourceMaps: false,

  // Compression
  compress: true,

  // Power by header (disable for security)
  poweredByHeader: false,

  // Generate ETags for caching
  generateEtags: true,

  // Output configuration for static export (optional)
  // Uncomment if you want to generate a static site
  // output: 'export',
};

// Export configuration with bundle analyzer wrapper
export default withBundleAnalyzer(nextConfig);
