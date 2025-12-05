import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';
import { getPostBySlug, getAllPosts } from '@/data/blog';
import styles from '@/styles/blog.module.css';

/**
 * Individual blog post page displays the full content of a blog post.
 * 
 * Features:
 * - Displays full blog post content with proper formatting
 * - Shows post metadata (date, category)
 * - Theme-aware styling for optimal readability
 * - Animated entrance
 * - Dynamic metadata generation for SEO
 */

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Tanushree T B Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    keywords: [post.category, 'Blog', 'Tanushree T B', 'Technology', 'Programming'],
    authors: [{ name: 'Tanushree T B' }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: ['Tanushree T B'],
      section: post.category,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  // Retrieve post with error handling
  const post = getPostBySlug(params.slug);

  // Return 404 if post not found
  if (!post) {
    notFound();
  }

  // Format date for display with error handling
  let formattedDate = 'Date unavailable';
  try {
    if (post.publishedAt && typeof post.publishedAt.toLocaleDateString === 'function') {
      formattedDate = post.publishedAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch (error) {
    console.warn('Error formatting blog post date:', error);
  }

  // Safely get ISO string for datetime attribute
  let isoDate = '';
  try {
    if (post.publishedAt && typeof post.publishedAt.toISOString === 'function') {
      isoDate = post.publishedAt.toISOString();
    }
  } catch (error) {
    console.warn('Error converting date to ISO string:', error);
  }

  // Safely process content with error handling
  let processedContent = '';
  try {
    if (post.content && typeof post.content === 'string') {
      processedContent = post.content.replace(/\n/g, '<br />');
    } else {
      console.warn('Blog post content is missing or invalid');
      processedContent = '<p>Content unavailable</p>';
    }
  } catch (error) {
    console.error('Error processing blog post content:', error);
    processedContent = '<p>Error loading content. Please try again later.</p>';
  }

  // Structured data for blog post SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    author: {
      '@type': 'Person',
      name: 'Tanushree T B',
    },
    datePublished: isoDate,
    dateModified: isoDate,
    publisher: {
      '@type': 'Person',
      name: 'Tanushree T B',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window !== 'undefined' ? window.location.href : '',
    },
    articleSection: post.category,
  };

  return (
    <BlogLayout>
      <div className={styles.postContainer}>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AnimatedContainer animationType="fade" duration={0.6}>
          <article className={styles.postArticle}>
            {/* Post header */}
            <header className={styles.postHeader}>
              {post.category && (
                <div className={styles.postCategory}>
                  {post.category}
                </div>
              )}
              <h1 className={styles.postPageTitle}>
                {post.title || 'Untitled Post'}
              </h1>
              <div className={styles.postMeta}>
                {isoDate ? (
                  <time dateTime={isoDate}>
                    {formattedDate}
                  </time>
                ) : (
                  <span>{formattedDate}</span>
                )}
              </div>
            </header>

            {/* Post content */}
            <div className={styles.postContent}>
              {/* Render markdown-style content as HTML */}
              <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            </div>
          </article>
        </AnimatedContainer>
      </div>
    </BlogLayout>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}