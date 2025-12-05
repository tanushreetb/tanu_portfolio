import { Metadata } from 'next';
import { ProjectsShowcase } from '@/components/portfolio/ProjectsShowcase';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';

/**
 * ProjectsShowcase Demo Page
 * 
 * Demonstrates the new ProjectsShowcase component with 3D effects,
 * bento grid layout, and expandable detail views.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 2.2
 */

export const metadata: Metadata = {
  title: 'Projects Showcase Demo - Portfolio',
  description: 'Interactive project showcase with 3D effects and bento grid layout',
};

export default function ProjectsShowcaseDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-40 flex justify-between items-center">
        <Link 
          href="/"
          className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          ← Back to Home
        </Link>
        <div className="flex gap-4">
          <Link 
            href="/projects-showcase-demo?layout=bento"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
          >
            Bento Layout
          </Link>
          <Link 
            href="/projects-showcase-demo?layout=grid"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-all"
          >
            Grid Layout
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Bento Grid Layout */}
        <ProjectsShowcase
          projects={portfolioData.projects}
          layout="bento"
          title="Featured Projects"
          description="Explore my latest work with interactive 3D cards and detailed views"
        />

        {/* Standard Grid Layout */}
        <div className="py-8">
          <ProjectsShowcase
            projects={portfolioData.projects}
            layout="grid"
            title="All Projects"
            description="Browse all projects in a clean grid layout"
          />
        </div>

        {/* Feature Highlights */}
        <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Component Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🎨 3D Tilt Effect
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Cards respond to mouse movement with smooth 3D tilt animations for an immersive experience.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🔍 Image Zoom
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Project images smoothly zoom in on hover, drawing attention to visual details.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  📱 Responsive Design
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Bento grid adapts to all screen sizes with graceful fallbacks for mobile devices.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  ✨ Staggered Animations
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Cards and tags animate in sequence for a polished, professional appearance.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🎯 Detail Modal
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Click any project to view full details in a beautiful modal with smooth animations.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  ♿ Accessible
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Respects reduced motion preferences and includes keyboard navigation support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
