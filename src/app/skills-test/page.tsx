/**
 * Skills Visualization Test Page
 * 
 * This page is used to test and preview the SkillsVisualization component
 * in isolation. It can be accessed at /skills-test during development.
 */

import { SkillsVisualization } from '@/components/portfolio/SkillsVisualization';

export default function SkillsTestPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Skills Visualization Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Testing the SkillsVisualization component with all features
          </p>
        </div>
        
        <SkillsVisualization />
        
        <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Test checklist:</p>
          <ul className="mt-4 space-y-2">
            <li>✓ Cards flip on hover (desktop) or click (mobile)</li>
            <li>✓ Progress rings animate on scroll</li>
            <li>✓ Category filtering works smoothly</li>
            <li>✓ Staggered entrance animations</li>
            <li>✓ Responsive grid layout</li>
            <li>✓ Dark mode support</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
