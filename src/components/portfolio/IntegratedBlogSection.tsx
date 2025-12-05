'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPostModal } from '@/components/blog/BlogPostModal';
import { BlogPost } from '@/types';
import { getAllPosts } from '@/data/blog';

interface IntegratedBlogSectionProps {
  postsPerPage?: number;
}

/**
 * IntegratedBlogSection - Displays blog posts within the portfolio page
 * Features:
 * - Grid layout of blog post cards
 * - Modal overlay for full post content
 * - Staggered entrance animations
 * - Load more functionality
 */
export function IntegratedBlogSection({ postsPerPage = 6 }: IntegratedBlogSectionProps) {
  const allPosts = getAllPosts();
  const [displayCount, setDisplayCount] = useState(postsPerPage);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedPosts = allPosts.slice(0, displayCount);
  const hasMore = displayCount < allPosts.length;

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + postsPerPage, allPosts.length));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <section id="blog" className="relative py-20 px-4 sm:px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 mb-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-2xl">📝</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Blog
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Latest Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Thoughts on technology, development, and learning
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {displayedPosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <BlogCard post={post} onClick={() => handlePostClick(post)} />
              </motion.div>
            ))}
          </motion.div>

          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button
                onClick={handleLoadMore}
                className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl touch-target"
              >
                Load More Posts
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <BlogPostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
