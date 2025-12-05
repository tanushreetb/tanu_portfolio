import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SmoothScrollNav } from '@/components/shared/SmoothScrollNav';
import { SkipLinks } from '@/components/shared/SkipLinks';
import { portfolioData } from '@/data/portfolio';

// Lazy load heavy components for better initial page load performance
// Requirements: 8.1, 8.4
const IntegratedHero = dynamic(
  () => import('@/components/portfolio/IntegratedHero').then(mod => ({ default: mod.IntegratedHero })),
  { ssr: true }
);

const AboutSection = dynamic(
  () => import('@/components/portfolio/AboutSection').then(mod => ({ default: mod.AboutSection })),
  { ssr: true }
);

const EducationSection = dynamic(
  () => import('@/components/portfolio/EducationSection').then(mod => ({ default: mod.EducationSection })),
  { ssr: true }
);

const AchievementsSection = dynamic(
  () => import('@/components/portfolio/AchievementsSection').then(mod => ({ default: mod.AchievementsSection })),
  { ssr: true }
);

const ProjectsShowcase = dynamic(
  () => import('@/components/portfolio/ProjectsShowcase').then(mod => ({ default: mod.ProjectsShowcase })),
  { ssr: true }
);

const SkillsVisualization = dynamic(
  () => import('@/components/portfolio/SkillsVisualization').then(mod => ({ default: mod.SkillsVisualization })),
  { ssr: true }
);

const IntegratedBlogSection = dynamic(
  () => import('@/components/portfolio/IntegratedBlogSection').then(mod => ({ default: mod.IntegratedBlogSection })),
  { ssr: true }
);

const ContactSection = dynamic(
  () => import('@/components/portfolio/ContactSection').then(mod => ({ default: mod.ContactSection })),
  { ssr: true }
);

const SectionDivider = dynamic(
  () => import('@/components/shared/SectionDivider').then(mod => ({ default: mod.SectionDivider })),
  { ssr: true }
);

/**
 * Integrated Portfolio Page - Single-page scrolling experience
 * 
 * This page implements a modern, single-page portfolio layout that integrates
 * all content sections (hero, about, projects, skills, blog, contact) into one
 * seamless scrolling experience with smooth navigation and creative animations.
 * 
 * Features:
 * - Smooth scroll navigation with scroll spy
 * - Section-specific animations and transitions
 * - Integrated blog section (no separate route)
 * - Semantic HTML structure for accessibility
 * - Skip links for keyboard navigation
 * - Responsive design across all devices
 * 
 * Requirements: 1.1, 1.5, 10.5
 */

// Section configuration for navigation
const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

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
    <>
      {/* Skip Links for Accessibility - Requirement 10.5 */}
      <SkipLinks />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Smooth Scroll Navigation - Requirement 7.1, 7.2, 7.3 */}
      <SmoothScrollNav sections={sections} />

      {/* Main Content - Semantic HTML Structure - Requirement 1.5, 10.5 */}
      <main id="main-content" className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
        {/* Hero Section - Requirement 4.1, 4.2, 4.3, 4.4 */}
        <section id="hero" aria-label="Introduction">
          <IntegratedHero
            name={portfolioData.personal.name}
            title={portfolioData.personal.title}
            description="Passionate about building innovative solutions with Machine Learning and Web Development"
            profileImage="/images/profile.jpg"
            socialLinks={{
              github: portfolioData.personal.github,
              linkedin: portfolioData.personal.linkedin,
              email: portfolioData.personal.email,
            }}
            ctaButtons={[
              { label: 'View Projects', href: '#projects', variant: 'primary' },
              { label: 'Contact Me', href: '#contact', variant: 'secondary' },
            ]}
          />
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* About Section - Requirement 1.1, 2.1 */}
        <section id="about" aria-labelledby="about-heading">
          <AboutSection />
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Education Section */}
        <section id="education" aria-labelledby="education-heading">
          <EducationSection />
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Achievements Section */}
        <section id="achievements" aria-labelledby="achievements-heading">
          <AchievementsSection />
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Projects Section - Requirement 5.1, 5.2, 5.3, 5.4, 5.5, 5.6 */}
        <section id="projects" aria-labelledby="projects-heading">
          <ProjectsShowcase
            projects={portfolioData.projects}
            layout="grid"
          />
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Skills Section - Requirement 6.1, 6.2, 6.3, 6.4, 6.5 */}
        <section id="skills" aria-labelledby="skills-heading">
          <SkillsVisualization />
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Integrated Blog Section - Requirement 3.1, 3.2, 3.6, 3.7 */}
        <section id="blog" aria-labelledby="blog-heading">
          <IntegratedBlogSection postsPerPage={6} />
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Contact Section - Requirement 1.1 */}
        <section id="contact" aria-labelledby="contact-heading">
          <ContactSection />
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center gap-6">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                aria-label="Email Contact"
              >
                Email
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
