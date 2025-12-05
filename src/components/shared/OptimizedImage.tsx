'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component that provides:
 * - Automatic image optimization (WebP/AVIF conversion)
 * - Lazy loading by default
 * - Responsive image sizing
 * - Proper error handling with fallback
 * - Accessibility features
 * 
 * Performance benefits:
 * - Automatic format conversion to modern formats (WebP, AVIF)
 * - Responsive images served based on device size
 * - Lazy loading reduces initial page load time
 * - Automatic image compression
 * 
 * Usage:
 * ```tsx
 * <OptimizedImage
 *   src="/images/profile.jpg"
 *   alt="Profile picture"
 *   width={400}
 *   height={400}
 *   priority={false} // Set to true for above-the-fold images
 * />
 * ```
 * 
 * @component
 */

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  onError,
  priority = false,
  loading = 'lazy',
  quality = 85,
  ...props
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(false);

  /**
   * Handle image loading errors
   * 
   * If an image fails to load:
   * 1. Set error state
   * 2. Switch to fallback image
   * 3. Call optional error callback
   */
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      onError?.();
    }
  };

  // Reset error state when src changes
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      priority={priority}
      loading={priority ? undefined : loading}
      quality={quality}
      {...props}
      // Ensure proper styling for responsive images
      style={{
        maxWidth: '100%',
        height: 'auto',
        ...props.style,
      }}
    />
  );
};

/**
 * Example usage in components:
 * 
 * // For hero images (above the fold) - use priority
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   width={1920}
 *   height={1080}
 *   priority={true}
 * />
 * 
 * // For project images (below the fold) - lazy load
 * <OptimizedImage
 *   src="/images/project.jpg"
 *   alt="Project screenshot"
 *   width={800}
 *   height={600}
 *   priority={false}
 * />
 * 
 * // With custom fallback
 * <OptimizedImage
 *   src="/images/profile.jpg"
 *   alt="Profile picture"
 *   width={400}
 *   height={400}
 *   fallbackSrc="/images/default-avatar.png"
 *   onError={() => console.log('Image failed to load')}
 * />
 */
