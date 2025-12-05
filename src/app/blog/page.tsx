import { Metadata } from 'next';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { PostCard } from '@/components/blog/PostCard';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';
import { getAllPosts, getCategories } from '@/data/blog';
import styles from '@/styles/blog.module.css';

/**
 * Blog homepage displays a list of all blog posts with category filtering.
 * 
 * Features:
 * - Displays all blog posts in reverse chronological order
 * - Shows category badges for filtering
 * - Animated entrance for post cards
 * - Theme-aware styling
 */

// Dynamic metadata for blog homepage
export const metadata: Metadata = {
  title: 'Blog | Tanushree T B - Technology, Projects & Learning',
  description: 'Read articles about technology, machine learning projects, web development, and computer science insights by Tanushree T B. Explore topics including Hospital Management Systems, Model Context Protocol, and Heart Disease Prediction.',
  keywords: ['Blog', 'Technology', 'Machine Learning', 'Web Development', 'Computer Science', 'Projects', 'Learning', 'Programming'],
  authors: [{ name: 'Tanushree T B' }],
  openGraph: {
    title: 'Blog | Tanushree T B',
    description: 'Articles about technology, machine learning, and web development',
    type: 'website',
    locale: 'en_US',
    siteName: 'Tanushree T B Blog',
  },
  twitter: {
    card: 'summary',
    title: 'Blog | Tanushree T B',
    description: 'Articles about technology, machine learning, and web development',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogHome() {
  // Retrieve blog posts and categories with error handling
  const posts = getAllPosts();
  const categories = getCategories();

  // Check if posts failed to load
  const hasNoPosts = !posts || posts.length === 0;
  const hasNoCategories = !categories || categories.length === 0;

  return (
    <BlogLayout>
      <main id="main-content" className={styles.blogContainer}>
        {/* Blog header */}
        <AnimatedContainer animationType="fade" duration={0.6}>
          <header className={styles.blogHeader}>
            <h1 className={styles.blogTitle}>Blog</h1>
            <p className={styles.blogDescription}>
              Thoughts on technology, projects, and learning in computer science
            </p>
          </header>
        </AnimatedContainer>

        {/* Categories - with error handling */}
        {!hasNoCategories && (
          <AnimatedContainer animationType="slideUp" delay={0.2}>
            <section className={styles.categoriesContainer} aria-label="Blog categories">
              <h2 className={styles.categoriesTitle}>Categories</h2>
              <div className={styles.categoriesList} role="list">
                {categories.map((category) => (
                  <span key={category} className={styles.categoryBadge} role="listitem">
                    {category}
                  </span>
                ))}
              </div>
            </section>
          </AnimatedContainer>
        )}

        {/* Blog posts grid - with error handling */}
        <section aria-label="Blog posts" className={styles.postsGrid}>
          {hasNoPosts ? (
            <AnimatedContainer animationType="fade">
              <div className="col-span-full text-center py-16">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg 
                    className="w-24 h-24 mx-auto mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No Blog Posts Available
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Blog posts are currently unavailable. Please check back later or contact the site administrator if this problem persists.
                </p>
              </div>
            </AnimatedContainer>
          ) : (
            posts.map((post, index) => (
              <AnimatedContainer 
                key={post.slug} 
                animationType="scale"
                delay={index * 0.1}
              >
                <PostCard post={post} />
              </AnimatedContainer>
            ))
          )}
        </section>
      </main>
    </BlogLayout>
  );
}