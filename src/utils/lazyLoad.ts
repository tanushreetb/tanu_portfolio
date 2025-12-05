/**
 * Lazy Loading Utilities
 * 
 * Utilities for lazy loading images and components to improve initial page load performance.
 * Uses Intersection Observer API for efficient viewport detection.
 * 
 * Requirements: 8.1, 8.4
 */

/**
 * Lazy load image with Intersection Observer
 * Replaces data-src with src when image enters viewport
 * 
 * @param img - Image element to lazy load
 * @param options - Intersection Observer options
 */
export const lazyLoadImage = (
  img: HTMLImageElement,
  options: IntersectionObserverInit = {}
): void => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px', // Start loading 50px before entering viewport
    threshold: 0.01,
    ...options,
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        const src = image.dataset.src;
        const srcset = image.dataset.srcset;

        if (src) {
          image.src = src;
        }
        if (srcset) {
          image.srcset = srcset;
        }

        // Remove data attributes after loading
        image.removeAttribute('data-src');
        image.removeAttribute('data-srcset');

        // Add loaded class for fade-in effect
        image.classList.add('lazy-loaded');

        // Stop observing this image
        observer.unobserve(image);
      }
    });
  }, defaultOptions);

  imageObserver.observe(img);
};

/**
 * Initialize lazy loading for all images with data-src attribute
 * Call this on component mount or page load
 */
export const initLazyLoading = (): void => {
  if (typeof window === 'undefined') return;

  const lazyImages = document.querySelectorAll<HTMLImageElement>('img[data-src]');
  
  lazyImages.forEach((img) => {
    lazyLoadImage(img);
  });
};

/**
 * Preload critical images that should load immediately
 * Use for above-the-fold images
 * 
 * @param src - Image source URL
 * @param srcset - Optional srcset for responsive images
 */
export const preloadImage = (src: string, srcset?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve();
    img.onerror = reject;
    
    if (srcset) {
      img.srcset = srcset;
    }
    img.src = src;
  });
};

/**
 * Lazy load background images
 * 
 * @param element - Element with background image
 * @param options - Intersection Observer options
 */
export const lazyLoadBackgroundImage = (
  element: HTMLElement,
  options: IntersectionObserverInit = {}
): void => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  };

  const bgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const bgImage = el.dataset.bgImage;

        if (bgImage) {
          el.style.backgroundImage = `url(${bgImage})`;
          el.removeAttribute('data-bg-image');
          el.classList.add('lazy-loaded');
        }

        observer.unobserve(el);
      }
    });
  }, defaultOptions);

  bgObserver.observe(element);
};
