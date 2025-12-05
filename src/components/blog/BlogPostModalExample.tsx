/**
 * BlogPostModal Example Component
 * 
 * Demonstrates how to use the BlogPostModal component with the useModalState hook.
 * This example shows the integration with blog post data and proper state management.
 * 
 * @example
 * import { BlogPostModalExample } from '@/components/blog/BlogPostModalExample';
 * 
 * function BlogPage() {
 *   return <BlogPostModalExample />;
 * }
 */

'use client';

import { useState } from 'react';
import { BlogPostModal } from './BlogPostModal';
import { BlogCard } from './BlogCard';
import { BlogPost } from '@/types';
import { useModalState } from '@/hooks/useModalState';
import { getAllPosts } from '@/data/blog';

/**
 * BlogPostModal Example Component
 * 
 * Shows how to integrate BlogPostModal with modal state management.
 * Displays real blog posts from the data layer.
 */
export function BlogPostModalExample() {
  const posts = getAllPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { isOpen, open, close } = useModalState({
    closeOnEscape: true,
    lockScroll: true
  });

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    open();
  };

  const handleCloseModal = () => {
    close();
    // Optional: Clear selected post after animation completes
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <h2 style={{ marginBottom: '1rem' }}>Blog Posts with Modal</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
        Click any blog card below to open it in a modal overlay:
      </p>
      
      {/* Blog grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {posts.map(post => (
          <BlogCard
            key={post.slug}
            post={post}
            onClick={() => handlePostClick(post)}
            useModal={true}
          />
        ))}
      </div>

      {/* Modal */}
      <BlogPostModal
        post={selectedPost}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />

      {/* Usage documentation */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Usage Example:</h3>
        <pre style={{
          overflow: 'auto',
          padding: '1rem',
          backgroundColor: 'var(--color-background)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
{`import { BlogPostModal } from '@/components/blog/BlogPostModal';
import { BlogCard } from '@/components/blog/BlogCard';
import { useModalState } from '@/hooks/useModalState';
import { getAllPosts } from '@/data/blog';

function IntegratedBlogSection() {
  const posts = getAllPosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, open, close } = useModalState();

  const handlePostClick = (post) => {
    setSelectedPost(post);
    open();
  };

  return (
    <section>
      <div className="blog-grid">
        {posts.map(post => (
          <BlogCard
            key={post.slug}
            post={post}
            onClick={() => handlePostClick(post)}
            useModal={true}
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
}`}
        </pre>
      </div>
    </div>
  );
}
