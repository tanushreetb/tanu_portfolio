# Accessibility Quick Reference Guide

Quick reference for developers working on the portfolio. Use this guide to ensure new features maintain accessibility standards.

---

## 🎯 Quick Checklist for New Features

When adding a new component or feature, ensure:

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible (use default styles)
- [ ] ARIA labels are added where needed
- [ ] Semantic HTML is used
- [ ] Animations respect reduced motion
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets are at least 44x44px
- [ ] Screen reader tested

---

## 🔧 Common Patterns

### 1. Accessible Button

```tsx
import { AccessibleButton } from '@/components/shared/AccessibleButton';

<AccessibleButton
  variant="primary"
  onClick={handleClick}
  aria-label="Descriptive label"
>
  Button Text
</AccessibleButton>
```

### 2. Skip Links

```tsx
import { SkipLinks } from '@/components/shared/SkipLinks';

<SkipLinks links={[
  { href: '#main', label: 'Skip to main content' },
  { href: '#nav', label: 'Skip to navigation' }
]} />
```

### 3. Live Region (Screen Reader Announcements)

```tsx
import { useLiveRegion } from '@/components/shared/LiveRegion';

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
```

### 4. Keyboard Navigation

```tsx
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

const { activeIndex, containerRef, itemRefs } = useKeyboardNavigation({
  enabled: true,
  onActivate: (index) => handleItemClick(items[index])
});

return (
  <div ref={containerRef}>
    {items.map((item, i) => (
      <button ref={el => itemRefs.current[i] = el}>
        {item.label}
      </button>
    ))}
  </div>
);
```

### 5. Reduced Motion Support

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

const shouldReduceMotion = useReducedMotion();

return (
  <motion.div
    animate={{ opacity: 1 }}
    transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
  >
    Content
  </motion.div>
);
```

### 6. Focus Trap (for Modals)

```tsx
import { useFocusTrap } from '@/hooks/useFocusTrap';

const Modal = ({ isOpen, onClose }) => {
  const trapRef = useFocusTrap(isOpen);
  
  return (
    <div 
      ref={trapRef}
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      <button onClick={onClose} aria-label="Close modal">×</button>
      {/* Modal content */}
    </div>
  );
};
```

---

## 🎨 Semantic HTML Structure

Always use semantic HTML elements:

```html
<!-- ✅ Good -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="#home">Home</a></li>
    </ul>
  </nav>
</header>

<main id="main-content">
  <section aria-labelledby="about-heading">
    <h2 id="about-heading">About</h2>
    <article>
      <h3>Article Title</h3>
      <p>Content...</p>
    </article>
  </section>
</main>

<footer>
  <p>© 2025</p>
</footer>

<!-- ❌ Bad -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
```

---

## 🏷️ ARIA Labels Cheat Sheet

### When to Use ARIA Labels

```tsx
// Icon buttons (no visible text)
<button aria-label="Close modal">
  <XIcon />
</button>

// Links with generic text
<a href="/learn-more" aria-label="Learn more about our services">
  Learn More
</a>

// Form inputs without visible labels
<input 
  type="search" 
  aria-label="Search projects"
  placeholder="Search..."
/>

// Complex widgets
<div 
  role="tablist" 
  aria-label="Project categories"
>
  <button role="tab" aria-selected="true">All</button>
  <button role="tab" aria-selected="false">Web</button>
</div>
```

### Common ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Provides label for element | `<button aria-label="Close">×</button>` |
| `aria-labelledby` | References element that labels this one | `<section aria-labelledby="heading">` |
| `aria-describedby` | References element that describes this one | `<input aria-describedby="help-text">` |
| `aria-hidden` | Hides element from screen readers | `<div aria-hidden="true">Decorative</div>` |
| `aria-live` | Announces dynamic content | `<div aria-live="polite">Status</div>` |
| `aria-expanded` | Indicates if element is expanded | `<button aria-expanded="false">Menu</button>` |
| `aria-pressed` | Indicates if toggle is pressed | `<button aria-pressed="true">Bold</button>` |
| `aria-current` | Indicates current item | `<a aria-current="page">Home</a>` |
| `aria-busy` | Indicates loading state | `<div aria-busy="true">Loading...</div>` |

---

## ⌨️ Keyboard Support Requirements

### Standard Keyboard Interactions

| Element | Keys | Action |
|---------|------|--------|
| Button | Enter, Space | Activate |
| Link | Enter | Navigate |
| Checkbox | Space | Toggle |
| Radio | Arrow keys | Select |
| Select | Arrow keys | Navigate options |
| Modal | Escape | Close |
| Menu | Arrow keys | Navigate items |
| Tabs | Arrow keys | Switch tabs |

### Custom Component Example

```tsx
const CustomButton = ({ onClick, children }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Custom button"
    >
      {children}
    </div>
  );
};
```

---

## 🎨 Color Contrast Requirements

### WCAG AA Standards

| Content Type | Contrast Ratio | Example |
|--------------|----------------|---------|
| Normal text (< 18pt) | 4.5:1 | Body text, paragraphs |
| Large text (≥ 18pt or 14pt bold) | 3:1 | Headings, large labels |
| UI components | 3:1 | Buttons, form borders |
| Focus indicators | 3:1 | Focus rings, outlines |

### Our Color Palette (WCAG AA Compliant)

**Light Theme:**
```css
--color-primary: #0052a3;      /* 4.54:1 on white */
--color-text-primary: #1f2937; /* 14.59:1 on white */
--color-text-secondary: #4b5563; /* 7.52:1 on white */
```

**Dark Theme:**
```css
--color-primary: #60a5fa;      /* 6.28:1 on dark */
--color-text-primary: #f9fafb; /* 15.57:1 on dark */
--color-text-secondary: #d1d5db; /* 9.89:1 on dark */
```

### Testing Contrast

```bash
# Use Chrome DevTools:
1. Inspect element
2. Check Styles panel
3. Look for contrast ratio indicator
4. Verify it meets requirements

# Or use online tools:
- WebAIM Contrast Checker
- Colour Contrast Analyser
```

---

## 🎬 Animation Guidelines

### Always Check for Reduced Motion

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Component = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.01 : 0.5 
      }}
    >
      Content
    </motion.div>
  );
};
```

### CSS Animations

```css
/* Always include reduced motion support */
@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animated {
  animation: slideIn 0.5s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animated {
    animation-duration: 0.01ms;
  }
}
```

---

## 📱 Touch Target Guidelines

### Minimum Size: 44x44 pixels

```tsx
// ✅ Good - meets minimum size
<button className="px-4 py-3 touch-target">
  Click Me
</button>

// ❌ Bad - too small
<button className="px-1 py-1">
  Click Me
</button>
```

### Use the `.touch-target` Class

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

---

## 🧪 Testing Checklist

### Before Committing Code

- [ ] Tab through your component
- [ ] Verify focus indicators are visible
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Enable reduced motion and test
- [ ] Check color contrast
- [ ] Test on mobile (touch targets)
- [ ] Run Lighthouse audit
- [ ] Run axe DevTools scan

### Quick Test Commands

```bash
# Run unit tests
npm test

# Run Lighthouse audit
npm run build
npm start
# Then open Chrome DevTools > Lighthouse

# Check TypeScript
npm run type-check

# Check linting
npm run lint
```

---

## 🚫 Common Mistakes to Avoid

### 1. Missing Alt Text
```tsx
// ❌ Bad
<img src="photo.jpg" />

// ✅ Good
<img src="photo.jpg" alt="Description of photo" />

// ✅ Good (decorative image)
<img src="decoration.jpg" alt="" aria-hidden="true" />
```

### 2. Non-Semantic HTML
```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```

### 3. Missing Keyboard Support
```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</div>

// ✅ Better - use a button
<button onClick={handleClick}>Click me</button>
```

### 4. Poor Focus Indicators
```css
/* ❌ Bad - removes focus indicator */
button:focus {
  outline: none;
}

/* ✅ Good - uses default or custom indicator */
button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

### 5. Color-Only Information
```tsx
// ❌ Bad - relies only on color
<span style={{ color: 'red' }}>Error</span>

// ✅ Good - includes icon and text
<span className="text-red-600">
  <ErrorIcon aria-hidden="true" />
  <span>Error: Invalid input</span>
</span>
```

---

## 📚 Utility Functions

### Available in `src/utils/accessibility.ts`

```tsx
import {
  prefersReducedMotion,
  getFocusableElements,
  trapFocus,
  announceToScreenReader,
  generateAriaId,
  isActivationKey,
  isTouchDevice,
  getAccessibleAnimationDuration,
  KeyboardKeys
} from '@/utils/accessibility';

// Check reduced motion preference
if (prefersReducedMotion()) {
  // Use instant transitions
}

// Get focusable elements
const focusable = getFocusableElements(container);

// Trap focus in modal
const cleanup = trapFocus(modalElement);

// Announce to screen reader
announceToScreenReader('Form submitted successfully', 'polite');

// Generate unique ARIA ID
const id = generateAriaId('modal');

// Check if key is activation key
if (isActivationKey(event)) {
  handleActivation();
}

// Check if device is touch-enabled
if (isTouchDevice()) {
  // Adjust for touch
}

// Get accessible duration
const duration = getAccessibleAnimationDuration(0.5);
```

---

## 🔗 Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Windows)
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) (macOS/iOS)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows)

---

## 💡 Tips

1. **Test early and often** - Don't wait until the end to test accessibility
2. **Use semantic HTML** - It's accessible by default
3. **Don't remove focus indicators** - They're essential for keyboard users
4. **Test with real users** - Nothing beats real-world testing
5. **Keep learning** - Accessibility standards evolve

---

## 📞 Need Help?

- Check `ACCESSIBILITY.md` for comprehensive guide
- Review `TASK_12_VERIFICATION_CHECKLIST.md` for testing
- Ask team members for accessibility review
- Consult WCAG guidelines for specific requirements

---

**Last Updated:** December 5, 2025  
**Maintained by:** Development Team
