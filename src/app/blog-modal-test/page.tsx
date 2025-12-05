/**
 * Blog Modal Test Page
 * 
 * Test page for the BlogPostModal component.
 * Demonstrates the modal functionality with sample blog posts.
 */

import { BlogPostModalExample } from '@/components/blog/BlogPostModalExample';

export default function BlogModalTestPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <h1>Blog Post Modal Test</h1>
      <p>This page demonstrates the BlogPostModal component functionality.</p>
      
      <BlogPostModalExample />
    </main>
  );
}
