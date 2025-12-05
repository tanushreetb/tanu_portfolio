# BlogPostModal Component

## Overview

The `BlogPostModal` component is a full-screen modal overlay for displaying blog post content without leaving the main portfolio page. It features smooth animations, backdrop blur, comprehensive accessibility support, and maintains scroll position on the main page.

## Requirements

This component fulfills the following requirements:
- **3.3**: Display blog post in modal/slide-in panel
- **3.4**: Allow scrolling within modal while keeping background fixed
- **3.5**: Smooth animation and restore main page state on close
- **10.2**: Keyboard navigation and accessibility features

## Features

✅ **Smooth Animations**
- Slide-in/slide-out animations using Framer Motion
- Backdrop fade with blur effect
- Coordinated entrance and exit animations

✅ **Accessibility**
- Focus trap keeps keyboard navigation within modal
- ESC key closes the modal
- ARIA labels and semantic HTML
- Focus returns to trigger element on close
- Screen reader friendly

✅ **User Experience**
- Click outside to close
- Backdrop blur for visual depth
- Maintains scroll position on main page
- Prevents body scroll when open
- Responsive design for all screen sizes

✅ **Performance**
- Optimized animations using GPU-accelerated transforms
- Lazy rendering with AnimatePresence
- Efficient scroll locking

## Usage

### Basic Usage

```tsx
import { BlogPostModal } from '@/components/blog/BlogPostModal';
import { useModalState } from '@/hooks/useModalState';
import { useState } from 'react';

function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { isOpen, open, close } = useModalState({
    closeOnEscape: true,
    lockScroll: true
  });

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    open();
  };

  const handleClose = () => {
    close();
    // Optional: Clear post after animation
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <>
      {posts.map(post => (
        <BlogCard 
          key={post.slug}
          post={post}
          onClick={() => handlePostClick(post)}
        />
      ))}
      
      <BlogPostModal
        post={selectedPost}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
}
```

### With IntegratedBlogSection

```tsx
import { BlogPostModal } from '@/components/blog/BlogPostModal';
import { BlogCard } from '@/components/blog/BlogCard';
import { useModalState } from '@/hooks/useModalState';
import { getAllPosts } from '@/data/blog';

function IntegratedBlogSection() {
  const posts = getAllPosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, open, close } = useModalState();

  return (
    <section id="blog">
      <h2>Latest Posts</h2>
      
      <div className="blog-grid">
        {posts.map(post => (
          <BlogCard
            key={post.slug}
            post={post}
            onClick={() => {
              setSelectedPost(post);
              open();
            }}
          />
        ))}
      </div>

      <BlogPostModal
        post={selectedPost}
        isOpen={isOpen}
        onClose={close}
      />
    </section>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `post` | `BlogPost \| null` | Yes | Blog post data to display. Pass `null` when modal is closed. |
| `isOpen` | `boolean` | Yes | Controls whether the modal is visible. |
| `onClose` | `() => void` | Yes | Callback function called when modal should close. |

## BlogPost Type

```typescript
interface BlogPost {
  slug: string;           // URL-friendly identifier
  title: string;          // Post title
  excerpt: string;        // Short preview text
  content: string;        // Full post content (HTML)
  publishedAt: Date;      // Publication date
  category: string;       // Post category
}
```

## Keyboard Interactions

| Key | Action |
|-----|--------|
| `ESC` | Close the modal |
| `Tab` | Navigate forward through focusable elements (trapped within modal) |
| `Shift + Tab` | Navigate backward through focusable elements (trapped within modal) |

## Accessibility Features

### Focus Management
- Focus is trapped within the modal when open
- First focusable element receives focus on open
- Focus returns to trigger element on close
- Tab navigation cycles through modal elements only

### Screen Reader Support
- `role="dialog"` and `aria-modal="true"` on overlay
- `aria-labelledby` references the post title
- Semantic HTML structure (header, article, time)
- Close button has `aria-label="Close modal"`

### Keyboard Navigation
- ESC key closes modal
- Tab key navigates through interactive elements
- Focus indicators visible on all interactive elements

### Reduced Motion
- Respects `prefers-reduced-motion` setting
- Animations are simplified or disabled for users with motion sensitivity

## Styling

The component uses CSS modules for styling. Key features:

- **Backdrop**: Semi-transparent black with blur effect
- **Content**: White/dark background with rounded corners and shadow
- **Responsive**: Full-screen on mobile, centered modal on desktop
- **Theme Support**: Adapts to light/dark theme
- **Scrollbar**: Custom styled scrollbar for modal content

### CSS Variables Used

```css
--color-background
--color-surface
--color-text-primary
--color-text-secondary
--color-primary
--color-border
```

## Animation Details

### Entrance Animation
1. Backdrop fades in (300ms)
2. Content slides up and scales in (400ms)
3. Both use cubic-bezier easing for smooth motion

### Exit Animation
1. Content slides down and scales out (300ms)
2. Backdrop fades out (300ms)
3. Component unmounts after animation completes

### Animation Variants
Uses centralized animation variants from `animationVariants.ts`:
- `modalBackdrop`: Backdrop fade animation
- `modalContent`: Content slide and scale animation

## Scroll Behavior

### Body Scroll Lock
When modal opens:
- Body overflow is set to hidden
- Padding is added to compensate for scrollbar width
- Current scroll position is preserved

When modal closes:
- Body overflow is restored
- Padding is removed
- Scroll position is maintained

### Modal Content Scroll
- Modal content area is independently scrollable
- Custom scrollbar styling
- Smooth scrolling behavior

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

1. **GPU Acceleration**: Uses `transform` and `opacity` for animations
2. **Lazy Rendering**: Component only renders when `isOpen` is true
3. **Event Cleanup**: All event listeners are properly cleaned up
4. **Optimized Re-renders**: Uses `AnimatePresence` for efficient mounting/unmounting

## Related Components

- `BlogCard`: Preview card for blog posts
- `IntegratedBlogSection`: Section containing blog post grid
- `useModalState`: Hook for managing modal state
- `useFocusTrap`: Hook for trapping focus within modal

## Testing

### Unit Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BlogPostModal } from './BlogPostModal';

test('renders modal when open', () => {
  const post = { /* blog post data */ };
  render(<BlogPostModal post={post} isOpen={true} onClose={() => {}} />);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('closes on ESC key', () => {
  const onClose = jest.fn();
  render(<BlogPostModal post={post} isOpen={true} onClose={onClose} />);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});
```

### Accessibility Tests
```tsx
import { axe } from 'jest-axe';

test('has no accessibility violations', async () => {
  const { container } = render(
    <BlogPostModal post={post} isOpen={true} onClose={() => {}} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Troubleshooting

### Modal doesn't close on backdrop click
- Ensure `onClick` handler is on the overlay element
- Check that `event.stopPropagation()` is called on content element

### Focus trap not working
- Verify `useFocusTrap` hook is properly imported
- Ensure modal has focusable elements
- Check that `isOpen` prop is correctly passed

### Scroll position not maintained
- Verify `useModalState` hook is used with `lockScroll: true`
- Check that body styles are properly cleaned up on unmount

### Animations not smooth
- Ensure Framer Motion is installed
- Check that animation variants are imported correctly
- Verify no conflicting CSS transitions

## Future Enhancements

- [ ] Add support for image galleries within posts
- [ ] Implement share functionality
- [ ] Add reading progress indicator
- [ ] Support for related posts section
- [ ] Add print-friendly styles
- [ ] Support for comments section
