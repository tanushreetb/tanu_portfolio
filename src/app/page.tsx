import Link from 'next/link';
import { Metadata } from 'next';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { SkillsGrid } from '@/components/portfolio/SkillsGrid';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';
import { portfolioData } from '@/data/portfolio';

/**
 * Home page with animated sections and page transitions.
 * Uses AnimatedContainer for entrance animations with different animation types.
 * Includes navigation to blog section.
 */

// Dynamic metadata for portfolio homepage
export const metadata: Metadata = {
  title: 'Tanushree T B - Portfolio | Computer Science Student & Frontend Developer',
  description: 'Portfolio of Tanushree T B, a Computer Science student and Frontend Developer specializing in Machine Learning, Web Development, and innovative software solutions. View projects including Hospital Management System, Model Context Protocol, and Heart Disease Predictor.',
  keywords: ['Tanushree T B', 'Portfolio', 'Computer Science', 'Frontend Developer', 'Machine Learning', 'Web Development', 'Hospital Management System', 'Model Context Protocol', 'Heart Disease Predictor'],
  authors: [{ name: 'Tanushree T B' }],
  openGraph: {
    title: 'Tanushree T B - Portfolio',
    description: 'Computer Science student and Frontend Developer showcasing innovative projects in Machine Learning and Web Development',
    type: 'website',
    locale: 'en_US',
    siteName: 'Tanushree T B Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanushree T B - Portfolio',
    description: 'Computer Science student and Frontend Developer showcasing innovative projects',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  // Validate portfolio data with error handling
  const hasProjects = portfolioData?.projects && Array.isArray(portfolioData.projects) && portfolioData.projects.length > 0;

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioData.personal.name,
    jobTitle: portfolioData.personal.title,
    email: portfolioData.personal.email,
    telephone: portfolioData.personal.phone,
    url: typeof window !== 'undefined' ? window.location.origin : 'https://tanushree-tb.com',
    sameAs: [portfolioData.personal.linkedin],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: portfolioData.education.institution,
    },
    knowsAbout: [
      ...portfolioData.skills.languages,
      ...portfolioData.skills.frontend,
      ...portfolioData.skills.frameworks,
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Navigation to Blog */}
      <nav className="fixed top-4 right-4 z-50" aria-label="Site navigation">
        <Link 
          href="/blog"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          aria-label="Navigate to blog section"
        >
          Visit Blog
        </Link>
      </nav>
      
      {/* Main content landmark for accessibility */}
      <main id="main-content">
        {/* Hero Section - Fade in animation */}
        <AnimatedContainer animationType="fade" duration={0.6}>
          <HeroSection />
        </AnimatedContainer>
      
      {/* Projects Section - Slide up animation with error handling */}
      <AnimatedContainer animationType="slideUp" delay={0.2}>
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Featured Projects
            </h2>
            {hasProjects ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.projects.map((project, index) => (
                  <AnimatedContainer 
                    key={project.id} 
                    animationType="scale"
                    delay={index * 0.1}
                  >
                    <ProjectCard project={project} />
                  </AnimatedContainer>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Projects Unavailable
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Project information is currently unavailable. Please check back later.
                </p>
              </div>
            )}
          </div>
        </section>
      </AnimatedContainer>
      
      {/* Skills Section - Slide left animation */}
      <AnimatedContainer animationType="slideLeft">
        <SkillsGrid />
      </AnimatedContainer>
      
      {/* Contact Section - Slide right animation */}
      <AnimatedContainer animationType="slideRight">
        <ContactSection />
      </AnimatedContainer>
      </main>
    </div>
  );
}
