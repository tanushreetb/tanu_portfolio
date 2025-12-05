/**
 * OptimizedImage Component
 * 
 * Performance-optimized image component with lazy loading, blur placeholder,
 * and responsive sizing. Uses Next.js Image component for automatic optimization.
 * 
 * Requirements: 8.1, 8.4
 */

'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  /**
   * Whether to show a blur placeholder while loading
   */
  showPlaceholder?: boolean;
  /**
   * Custom placeholder color (CSS color value)
   */
  placeholderColor?: string;
  /**
   * Whether to animate the image on load
   */
  animateOnLoad?: boolean;
  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;
}

/**
 * OptimizedImage component with lazy loading and blur placeholder
 * 
 * Features:
 * - Automatic lazy loading
 * - Blur placeholder while loading
 * - Fade-in animation on load
 * - Responsive sizing
 * - WebP/AVIF format support (via Next.js)
 * 
 * @example
 * <OptimizedImage
 *   src="/images/project.jpg"
 *   alt="Project screenshot"
 *   width={800}
 *   height={600}
 *   showPlaceholder
 *   animateOnLoad
 * />
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  showPlaceholder = true,
  placeholderColor = '#e5e7eb',
  animateOnLoad = true,
  loadingComponent,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ width: props.width, height: props.height }}
      >
        <svg
          className="w-12 h-12 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {showPlaceholder && !isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        >
          {loadingComponent || (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Image */}
      {animateOnLoad ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            {...props}
            className={className}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            quality={85}
          />
        </motion.div>
      ) : (
        <Image
          {...props}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          quality={85}
        />
      )}
    </div>
  );
};

/**
 * OptimizedBackgroundImage component for background images with lazy loading
 * 
 * @example
 * <OptimizedBackgroundImage
 *   src="/images/hero-bg.jpg"
 *   alt="Hero background"
 *   className="absolute inset-0"
 * >
 *   <div>Content over background</div>
 * </OptimizedBackgroundImage>
 */
export const OptimizedBackgroundImage: React.FC<{
  src: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
  priority?: boolean;
}> = ({ src, alt, children, className = '', priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        quality={85}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
