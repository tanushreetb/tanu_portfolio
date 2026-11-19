'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';

interface ScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(ScrollContext);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Only initialize smooth scroll on non-reduced-motion environments
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.3,
      infinite: false,
    });

    window.__lenis = lenis;
    setLenisInstance(lenis);

    lenis.on('scroll', (e: { progress: number }) => {
      setScrollProgress(Math.min(100, Math.max(0, e.progress * 100)));
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global listener for anchor clicks with hash (e.g. #about, #skills, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -50,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, offset = -50) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { offset, duration: 1.2 });
    } else {
      const element = typeof target === 'string' ? document.getElementById(target) : target;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {/* Top Luxury Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none origin-left"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#4C3526] dark:bg-[#FBEAD5] transition-all duration-75 ease-out shadow-[0_1px_4px_rgba(76,53,38,0.3)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {children}
    </ScrollContext.Provider>
  );
};
