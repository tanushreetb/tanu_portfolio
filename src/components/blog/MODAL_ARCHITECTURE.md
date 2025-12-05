# Blog Post Modal System Architecture

## Component Hierarchy

```
IntegratedBlogSection (Parent Component)
│
├── BlogCard (Multiple instances)
│   ├── onClick handler → opens modal
│   └── Displays: title, excerpt, category, date
│
└── BlogPostModal
    ├── Modal Overlay (backdrop with blur)
    │   └── Click outside → closes modal
    │
    └── Modal Content
        ├── Close Button (X)
        │   └── onClick → closes modal
        │
        ├── Modal Header
        │   ├── Category Badge
        │   ├── Post Title
        │   └── Publication Date
        │
        └── Modal Body (scrollable)
            └── Post Content (HTML)
```

## Data Flow

```
User Action → State Update → UI Update
     ↓              ↓            ↓
Click Card → setSelectedPost → Modal Opens
             open()
     ↓              ↓            ↓
ESC Key    → close()        → Modal Closes
Click X                       Focus Restored
Click Outside                 Scroll Maintained
```

## State Management

```typescript
// Parent Component State
const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
const { isOpen, open, close } = useModalState({
  closeOnEscape: true,
  lockScroll: true
});

// Flow
1. User clicks BlogCard
   → setSelectedPost(post)
   → open()

2. Modal renders with post data
   → Focus trapped
   → Body scroll locked
   → Animations play

3. User closes modal
   → close()
   → Focus restored
   → Body scroll unlocked
   → setSelectedPost(null) after animation
```

## Hook Dependencies

```
BlogPostModal
├── useFocusTrap(isOpen)
│   └── Manages focus within modal
│
└── useEffect (ESC key)
    └── Listens for Escape key press

useModalState
├── useState(isOpen)
├── useRef(previousActiveElement)
├── useRef(scrollPosition)
├── useEffect (ESC handler)
└── useEffect (scroll lock)
```

## Animation Flow

```
Opening Sequence:
1. isOpen = true
2. AnimatePresence mounts modal
3. Backdrop fades in (0-300ms)
4. Content slides up + scales (0-400ms)
5. Focus moves to first element

Closing Sequence:
1. close() called
2. Content slides down + scales (0-300ms)
3. Backdrop fades out (0-300ms)
4. AnimatePresence unmounts modal
5. Focus returns to trigger
6. selectedPost = null (after 300ms)
```

## Event Handlers

```typescript
// Modal Component
handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onClose();
  }
}

handleEscape(event) {
  if (event.key === 'Escape') {
    onClose();
  }
}

// Parent Component
handlePostClick(post) {
  setSelectedPost(post);
  open();
}

handleClose() {
  close();
  setTimeout(() => setSelectedPost(null), 300);
}
```

## CSS Architecture

```
BlogPostModal.module.css
├── .modalOverlay
│   ├── Fixed positioning
│   ├── Backdrop blur
│   └── Click handler
│
└── .modalContent
    ├── .closeButton
    │   └── Absolute positioning
    │
    ├── .modalHeader
    │   ├── .categoryBadge
    │   ├── .modalTitle
    │   └── .modalDate
    │
    └── .modalBody (scrollable)
        └── .content
            ├── Typography styles
            ├── Code block styles
            └── Link styles
```

## Accessibility Features

```
Focus Management:
├── useFocusTrap
│   ├── Finds focusable elements
│   ├── Handles Tab key
│   ├── Handles Shift+Tab
│   └── Cycles focus within modal
│
└── useModalState
    ├── Stores previous focus
    └── Restores focus on close

ARIA Attributes:
├── role="dialog"
├── aria-modal="true"
├── aria-labelledby="modal-title"
└── aria-label="Close modal"

Keyboard Support:
├── ESC → Close modal
├── Tab → Next element
├── Shift+Tab → Previous element
└── Enter/Space → Activate buttons
```

## Performance Optimizations

```
1. GPU Acceleration
   └── Uses transform and opacity for animations

2. Lazy Rendering
   └── AnimatePresence only renders when isOpen

3. Event Cleanup
   └── All listeners removed on unmount

4. Efficient Re-renders
   └── Memoized callbacks where appropriate

5. Scroll Optimization
   └── Single scroll lock implementation
```

## Integration Points

```
Required Imports:
├── BlogPost type from @/types
├── useModalState from @/hooks/useModalState
├── useFocusTrap from @/hooks/useFocusTrap
├── animationVariants from @/components/animations
└── Framer Motion (motion, AnimatePresence)

CSS Variables:
├── --color-background
├── --color-surface
├── --color-text-primary
├── --color-text-secondary
├── --color-primary
├── --color-border
└── --animation-easing
```

## Testing Strategy

```
Unit Tests:
├── Modal renders when open
├── Modal doesn't render when closed
├── Close button calls onClose
├── ESC key calls onClose
├── Backdrop click calls onClose
└── Focus trap works correctly

Integration Tests:
├── BlogCard opens modal
├── Modal displays correct post
├── Scroll position maintained
├── Focus returns to trigger
└── Theme switching works

Accessibility Tests:
├── Keyboard navigation
├── Screen reader compatibility
├── Focus indicators visible
└── ARIA attributes correct
```

## File Structure

```
src/
├── components/
│   └── blog/
│       ├── BlogPostModal.tsx          (Main modal component)
│       ├── BlogPostModal.module.css   (Modal styles)
│       ├── BlogCard.tsx               (Card component)
│       ├── BlogCard.module.css        (Card styles)
│       ├── BlogPostModalExample.tsx   (Usage example)
│       ├── BLOG_POST_MODAL_README.md  (Documentation)
│       └── MODAL_ARCHITECTURE.md      (This file)
│
├── hooks/
│   ├── useModalState.ts               (Modal state management)
│   └── useFocusTrap.ts                (Focus trap logic)
│
├── app/
│   └── blog-modal-test/
│       └── page.tsx                   (Test page)
│
└── data/
    └── blog.ts                        (Blog post data)
```

## Common Patterns

### Pattern 1: Basic Modal Usage
```tsx
const [post, setPost] = useState(null);
const { isOpen, open, close } = useModalState();

<BlogCard onClick={() => { setPost(data); open(); }} />
<BlogPostModal post={post} isOpen={isOpen} onClose={close} />
```

### Pattern 2: With Cleanup
```tsx
const handleClose = () => {
  close();
  setTimeout(() => setPost(null), 300); // After animation
};

<BlogPostModal post={post} isOpen={isOpen} onClose={handleClose} />
```

### Pattern 3: With Multiple Posts
```tsx
{posts.map(post => (
  <BlogCard
    key={post.slug}
    post={post}
    onClick={() => handlePostClick(post)}
    useModal={true}
  />
))}
```

## Troubleshooting Guide

### Issue: Modal doesn't close on backdrop click
**Solution**: Ensure `onClick` is on overlay and `stopPropagation` on content

### Issue: Focus trap not working
**Solution**: Verify modal has focusable elements and `useFocusTrap` is called

### Issue: Scroll position jumps
**Solution**: Check `useModalState` is used with `lockScroll: true`

### Issue: Animations stuttering
**Solution**: Verify GPU acceleration (transform/opacity) and no conflicting CSS

### Issue: ESC key not working
**Solution**: Ensure `closeOnEscape: true` in `useModalState` options
