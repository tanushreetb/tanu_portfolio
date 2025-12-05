/**
 * Shared Components Module
 * 
 * Central export point for all shared/reusable components used across the application.
 * These components are designed to be used in multiple contexts and pages.
 */

export { AnimatedContainer } from './AnimatedContainer';
export { AnimatedText } from './AnimatedText';
export { OptimizedImage } from './OptimizedImage';
export { SmoothScrollNav } from './SmoothScrollNav';
export { ScrollProgress } from './ScrollProgress';
export { SectionDivider, AnimatedSectionDivider } from './SectionDivider';
export { 
  ParallaxSection, 
  ParallaxLayer, 
  ParallaxBackground, 
  SectionTransition 
} from './ParallaxSection';
export { ThemeTransitionExample } from './ThemeTransitionExample';
export { AccessibleButton } from './AccessibleButton';
export { SkipLinks } from './SkipLinks';
export { LiveRegion, useLiveRegion } from './LiveRegion';

export type { NavSection } from './SmoothScrollNav';
export type { DividerVariant } from './SectionDivider';
export type { ParallaxSpeed, ParallaxDirection } from './ParallaxSection';
