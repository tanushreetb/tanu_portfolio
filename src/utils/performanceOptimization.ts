/**
 * Performance Optimization Utilities
 * 
 * Utilities for optimizing animation performance, managing will-change property,
 * and ensuring 60fps animations.
 * 
 * Requirements: 8.2, 8.5
 */

/**
 * Apply will-change property to element before animation
 * Automatically removes it after animation completes to avoid memory issues
 * 
 * @param element - Element to optimize
 * @param properties - CSS properties that will change (e.g., 'transform', 'opacity')
 * @param duration - Duration in ms after which to remove will-change
 */
export const optimizeAnimation = (
  element: HTMLElement,
  properties: string | string[],
  duration = 1000
): void => {
  const props = Array.isArray(properties) ? properties.join(', ') : properties;
  
  // Apply will-change
  element.style.willChange = props;
  
  // Remove will-change after animation completes
  setTimeout(() => {
    element.style.willChange = 'auto';
  }, duration);
};

/**
 * Check if device supports hardware acceleration
 * 
 * @returns true if hardware acceleration is supported
 */
export const supportsHardwareAcceleration = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  return !!gl;
};

/**
 * Force hardware acceleration on element using transform3d
 * 
 * @param element - Element to force hardware acceleration on
 */
export const forceHardwareAcceleration = (element: HTMLElement): void => {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
};

/**
 * Measure FPS over a period of time
 * Useful for testing animation performance
 * 
 * @param duration - Duration to measure in ms
 * @returns Promise that resolves with average FPS
 */
export const measureFPS = (duration = 1000): Promise<number> => {
  return new Promise((resolve) => {
    let frameCount = 0;
    let lastTime = performance.now();
    const startTime = lastTime;
    
    const countFrame = (currentTime: number) => {
      frameCount++;
      
      if (currentTime - startTime < duration) {
        requestAnimationFrame(countFrame);
      } else {
        const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
        resolve(fps);
      }
    };
    
    requestAnimationFrame(countFrame);
  });
};

/**
 * Check if animations should be reduced based on user preference
 * 
 * @returns true if animations should be reduced
 */
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get optimal animation duration based on device performance
 * Reduces duration on low-end devices
 * 
 * @param baseDuration - Base duration in ms
 * @returns Optimized duration in ms
 */
export const getOptimizedDuration = (baseDuration: number): number => {
  if (shouldReduceMotion()) {
    return 1; // Near-instant for reduced motion
  }
  
  // Check device performance indicators
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
  const hasSlowConnection = (navigator as any).connection && 
    ((navigator as any).connection.effectiveType === 'slow-2g' || 
     (navigator as any).connection.effectiveType === '2g');
  
  if (isMobile || hasLowMemory || hasSlowConnection) {
    return baseDuration * 0.7; // 30% faster on low-end devices
  }
  
  return baseDuration;
};

/**
 * Batch DOM reads and writes to avoid layout thrashing
 * 
 * @param reads - Array of read operations
 * @param writes - Array of write operations
 */
export const batchDOMOperations = (
  reads: Array<() => void>,
  writes: Array<() => void>
): void => {
  requestAnimationFrame(() => {
    // Perform all reads first
    reads.forEach(read => read());
    
    // Then perform all writes
    requestAnimationFrame(() => {
      writes.forEach(write => write());
    });
  });
};

/**
 * Optimize scroll performance by using passive listeners
 * 
 * @param element - Element to attach listener to
 * @param handler - Scroll handler function
 * @returns Cleanup function
 */
export const optimizeScrollListener = (
  element: HTMLElement | Window,
  handler: EventListener
): (() => void) => {
  element.addEventListener('scroll', handler, { passive: true });
  
  return () => {
    element.removeEventListener('scroll', handler);
  };
};

/**
 * Create a performance-optimized intersection observer
 * 
 * @param callback - Callback function
 * @param options - Intersection observer options
 * @returns IntersectionObserver instance
 */
export const createOptimizedObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px', // Start observing 50px before entering viewport
    threshold: 0.01, // Trigger as soon as 1% is visible
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Preload critical resources
 * 
 * @param resources - Array of resource URLs to preload
 * @param type - Resource type ('image', 'script', 'style', 'font')
 */
export const preloadResources = (
  resources: string[],
  type: 'image' | 'script' | 'style' | 'font' = 'image'
): void => {
  resources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    switch (type) {
      case 'image':
        link.as = 'image';
        break;
      case 'script':
        link.as = 'script';
        break;
      case 'style':
        link.as = 'style';
        break;
      case 'font':
        link.as = 'font';
        link.crossOrigin = 'anonymous';
        break;
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Monitor long tasks that block the main thread
 * Useful for identifying performance bottlenecks
 * 
 * @param threshold - Threshold in ms for what constitutes a long task
 * @param callback - Callback function called when long task is detected
 */
export const monitorLongTasks = (
  threshold = 50,
  callback: (duration: number) => void
): void => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }
  
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > threshold) {
          callback(entry.duration);
        }
      }
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // PerformanceObserver not supported or longtask not available
    console.warn('Long task monitoring not supported');
  }
};
