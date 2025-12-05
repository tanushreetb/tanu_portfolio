# Accessibility Implementation Guide

This document outlines the accessibility features implemented in the portfolio website to ensure WCAG 2.1 AA compliance and provide an inclusive experience for all users.

## Overview

The portfolio website has been designed and developed with accessibility as a core principle. All features are keyboard accessible, screen reader friendly, and respect user preferences for reduced motion.

**Requirements Addressed:** 10.1, 10.2, 10.3, 10.4, 10.5

## Key Accessibility Features

### 1. Keyboard Navigation Support (Requirement 10.1, 10.2)

#### Skip Links
- **Location:** Top of every page
- **Purpose:** Allow keyboard users to bypass repetitive navigation
- **Implementation:** `src/components/shared/SkipLinks.tsx`
- **Usage:** Press Tab on page load to reveal skip links

Available skip links:
- Skip to main content
- Skip to navigation
- Skip to projects
- Skip to contact

#### Focus Management
- All interactive elements are keyboard accessible
- Logical tab order throughout the page
- Focus trap in modals (blog post modal, project detail modal)
- Roving tabindex for complex components (skill cards, project cards)

#### Keyboard Shortcuts
- **Tab:** Move forward through interactive elements
- **Shift + Tab:** Move backward through interactive elements
- **Enter/Space:** Activate buttons and links
- **Escape:** Close modals and overlays
- **Arrow Keys:** Navigate within components (skill filters, project cards)
- **Home/End:** Jump to first/last item in lists

### 2. Focus Indicators (Requirement 10.2)

#### Visual Focus Indicators
- **Contrast Ratio:** 3:1 minimum against background (WCAG 2.1 AA)
- **Style:** 3px solid outline with 2px offset
- **Enhancement:** Subtle glow effect for better visibility
- **Implementation:** `src/app/globals.css` (lines 60-120)

#### Focus-Visible Pattern
- Focus indicators only appear for keyboard navigation
- Mouse clicks don't show focus rings (better UX)
- Uses `:focus-visible` pseudo-class

#### High Contrast Mode
- Focus indicators adapt to theme (light/dark)
- Enhanced visibility in dark mode
- Respects system high contrast preferences

### 3. ARIA Labels and Semantic HTML (Requirement 10.3)

#### Semantic HTML Structure
```html
<header> - Site header with navigation
<nav> - Navigation menus
<main> - Main content area
<section> - Content sections
<article> - Blog posts and project cards
<aside> - Complementary content
<footer> - Site footer
```

#### ARIA Landmarks
- `role="banner"` - Hero section
- `role="navigation"` - Navigation menus
- `role="main"` - Main content
- `role="complementary"` - Sidebar content
- `role="contentinfo"` - Footer

#### ARIA Labels
- All interactive elements have descriptive labels
- Icon buttons include `aria-label`
- Complex components use `aria-labelledby` and `aria-describedby`
- Dynamic content uses `aria-live` regions

#### ARIA States
- `aria-expanded` - Collapsible sections
- `aria-pressed` - Toggle buttons (theme toggle, filters)
- `aria-current` - Active navigation items
- `aria-busy` - Loading states
- `aria-hidden` - Decorative elements

### 4. Reduced Motion Support (Requirement 10.1, 10.3)

#### Detection
- Respects `prefers-reduced-motion: reduce` media query
- Automatically detected on page load
- Updates when system preference changes

#### Implementation
- **Hook:** `src/hooks/useReducedMotion.ts`
- **Utility:** `src/utils/accessibility.ts`
- **CSS:** `src/app/globals.css` (lines 800-850)

#### Fallback Behavior
When reduced motion is enabled:
- All animations duration reduced to 0.01ms
- Parallax effects disabled
- Scroll-triggered animations show content immediately
- Theme transitions are instant
- Focus indicators remain visible (not motion-based)

#### Component Support
All animated components check for reduced motion:
- `IntegratedHero` - Simplified entrance
- `ProjectsShowcase` - Instant card reveals
- `SkillsVisualization` - No flip animations
- `BlogPostModal` - Instant open/close
- `SmoothScrollNav` - Instant scroll

### 5. Screen Reader Support (Requirement 10.3, 10.4)

#### Live Regions
- **Component:** `src/components/shared/LiveRegion.tsx`
- **Purpose:** Announce dynamic content changes
- **Usage:** Status updates, notifications, form validation

#### Descriptive Text
- All images have alt text
- Icon buttons have aria-labels
- Links have descriptive text (not "click here")
- Form inputs have associated labels

#### Hidden Content
- Decorative elements marked with `aria-hidden="true"`
- Screen reader only text uses `.sr-only` class
- Skip links visible on focus

#### Reading Order
- Logical document structure
- Headings in hierarchical order (h1 → h2 → h3)
- Content flows naturally without CSS positioning issues

### 6. Color and Contrast (Requirement 10.3)

#### WCAG AA Compliance
- **Normal Text:** 4.5:1 contrast ratio minimum
- **Large Text:** 3:1 contrast ratio minimum
- **UI Components:** 3:1 contrast ratio minimum

#### Color Scheme
**Light Theme:**
- Primary: #0052a3 (4.54:1 on white)
- Text: #1f2937 (14.59:1 on white)
- Secondary Text: #4b5563 (7.52:1 on white)

**Dark Theme:**
- Primary: #60a5fa (6.28:1 on dark)
- Text: #f9fafb (15.57:1 on dark)
- Secondary Text: #d1d5db (9.89:1 on dark)

#### Color Independence
- Information not conveyed by color alone
- Icons and text labels accompany color coding
- Focus indicators use outline, not just color

### 7. Touch and Mobile Accessibility

#### Touch Targets
- **Minimum Size:** 44x44 pixels (WCAG 2.1 AAA)
- **Implementation:** `.touch-target` class
- **Spacing:** Adequate spacing between targets

#### Mobile Navigation
- Hamburger menu for small screens
- Touch-friendly button sizes
- Swipe gestures have keyboard alternatives

#### Responsive Design
- Content reflows at different zoom levels
- No horizontal scrolling required
- Text remains readable at 200% zoom

## Testing Checklist

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are clearly visible
- [ ] Skip links work correctly
- [ ] Modals trap focus appropriately
- [ ] Escape key closes modals
- [ ] No keyboard traps

### Screen Reader
- [ ] All content is announced correctly
- [ ] Images have appropriate alt text
- [ ] Headings are in logical order
- [ ] ARIA labels are descriptive
- [ ] Live regions announce updates
- [ ] Form inputs have labels
- [ ] Error messages are announced

### Reduced Motion
- [ ] Animations respect prefers-reduced-motion
- [ ] Content is accessible without animations
- [ ] No motion-triggered nausea or discomfort
- [ ] Focus indicators remain visible

### Color and Contrast
- [ ] Text meets contrast requirements
- [ ] UI components meet contrast requirements
- [ ] Information not conveyed by color alone
- [ ] High contrast mode supported

### Mobile and Touch
- [ ] Touch targets are at least 44x44px
- [ ] Content reflows at different zoom levels
- [ ] No horizontal scrolling required
- [ ] Touch gestures have alternatives

## Accessibility Tools and Resources

### Testing Tools
- **Lighthouse:** Built into Chrome DevTools
- **axe DevTools:** Browser extension for accessibility testing
- **WAVE:** Web accessibility evaluation tool
- **NVDA:** Free screen reader for Windows
- **VoiceOver:** Built-in screen reader for macOS/iOS
- **JAWS:** Popular screen reader for Windows

### Browser Testing
- Chrome with keyboard navigation
- Firefox with accessibility inspector
- Safari with VoiceOver
- Edge with Narrator

### Manual Testing
1. Navigate entire site using only keyboard
2. Test with screen reader (NVDA, VoiceOver, JAWS)
3. Enable reduced motion and verify animations
4. Test at 200% zoom level
5. Test with high contrast mode
6. Test on mobile devices

## Common Accessibility Patterns

### Modal Dialog
```tsx
import { useFocusTrap } from '@/hooks/useFocusTrap';

const Modal = ({ isOpen, onClose }) => {
  const trapRef = useFocusTrap(isOpen);
  
  return (
    <div role="dialog" aria-modal="true" ref={trapRef}>
      <button onClick={onClose} aria-label="Close modal">×</button>
      {/* Modal content */}
    </div>
  );
};
```

### Accessible Button
```tsx
import { AccessibleButton } from '@/components/shared/AccessibleButton';

<AccessibleButton
  variant="primary"
  onClick={handleClick}
  aria-label="Submit form"
>
  Submit
</AccessibleButton>
```

### Skip Links
```tsx
import { SkipLinks } from '@/components/shared/SkipLinks';

<SkipLinks links={[
  { href: '#main', label: 'Skip to main content' },
  { href: '#nav', label: 'Skip to navigation' }
]} />
```

### Live Region
```tsx
import { useLiveRegion } from '@/components/shared/LiveRegion';

const Component = () => {
  const { announce, LiveRegionComponent } = useLiveRegion();
  
  const handleAction = () => {
    // Do something
    announce('Action completed successfully');
  };
  
  return (
    <>
      <button onClick={handleAction}>Do Action</button>
      <LiveRegionComponent />
    </>
  );
};
```

## Maintenance and Updates

### Regular Audits
- Run Lighthouse accessibility audit monthly
- Test with screen readers quarterly
- Review WCAG guidelines for updates
- Monitor user feedback for accessibility issues

### Code Reviews
- Check for semantic HTML
- Verify ARIA attributes
- Test keyboard navigation
- Ensure focus management

### Documentation
- Keep this guide updated
- Document new accessibility features
- Share best practices with team
- Train developers on accessibility

## Resources and References

### WCAG Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WCAG 2.1 AA Checklist](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_customize&levels=aaa)

### ARIA Practices
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [ARIA Roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)

### Testing Resources
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Deque University](https://dequeuniversity.com/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)

## Contact

For accessibility issues or questions, please:
- Open an issue on GitHub
- Contact the development team
- Submit feedback through the contact form

We are committed to maintaining and improving the accessibility of this website.
