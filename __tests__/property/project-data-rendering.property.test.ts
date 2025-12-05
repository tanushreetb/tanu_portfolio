/**
 * **Feature: portfolio-blog-websites, Property 1: Project data rendering completeness**
 * **Validates: Requirements 1.2**
 * 
 * Property-based test for validating that project data rendering includes all required information.
 * This test ensures that when displaying projects, all required project information 
 * (title, description, technologies, achievements) is present in the rendered output.
 */

import * as fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectData } from '@/types';
import React from 'react';

describe('Project Data Rendering Properties', () => {
  
  // Generator for valid project data
  const projectDataArbitrary = fc.record({
    id: fc.string({ minLength: 1, maxLength: 50 }),
    title: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.string({ minLength: 10, maxLength: 500 }),
    technologies: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
    achievements: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 200 }), { minLength: 0, maxLength: 5 })),
    link: fc.option(fc.webUrl()),
    role: fc.option(fc.string({ minLength: 1, maxLength: 50 }))
  });

  // Property 1: Project data rendering completeness
  test('should render all required project information for any valid project data', () => {
    fc.assert(
      fc.property(
        projectDataArbitrary,
        (project: ProjectData) => {
          // Render the ProjectCard component with the generated project data
          const { container, getByText } = render(React.createElement(ProjectCard, { project }));
          
          // Property: Title should be present and visible
          expect(getByText(project.title)).toBeInTheDocument();
          
          // Property: Description should be present and visible
          expect(getByText(project.description)).toBeInTheDocument();
          
          // Property: All technologies should be rendered
          project.technologies.forEach(tech => {
            expect(getByText(tech)).toBeInTheDocument();
          });
          
          // Property: Role should be rendered if provided
          if (project.role) {
            expect(getByText(project.role)).toBeInTheDocument();
          }
          
          // Property: Achievements should be rendered if provided
          if (project.achievements && project.achievements.length > 0) {
            project.achievements.forEach(achievement => {
              expect(getByText(achievement)).toBeInTheDocument();
            });
          }
          
          // Property: Link should be rendered if provided
          if (project.link) {
            const linkElement = container.querySelector('a[href="' + project.link + '"]');
            expect(linkElement).toBeInTheDocument();
          }
          
          // Property: Technologies section header should be present
          expect(getByText('Technologies:')).toBeInTheDocument();
          
          // Property: Achievements section header should be present if achievements exist
          if (project.achievements && project.achievements.length > 0) {
            expect(getByText('Achievements:')).toBeInTheDocument();
          }
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Project card should maintain consistent structure
  test('should maintain consistent HTML structure for any project data', () => {
    fc.assert(
      fc.property(
        projectDataArbitrary,
        (project: ProjectData) => {
          const { container } = render(React.createElement(ProjectCard, { project }));
          
          // Property: Should have a main container div
          const mainDiv = container.firstChild as HTMLElement;
          expect(mainDiv).toBeInstanceOf(HTMLDivElement);
          
          // Property: Should contain title as h3 element
          const titleElement = container.querySelector('h3');
          expect(titleElement).toBeInTheDocument();
          expect(titleElement?.textContent).toBe(project.title);
          
          // Property: Should contain description paragraph
          const descriptionElement = container.querySelector('p');
          expect(descriptionElement).toBeInTheDocument();
          
          // Property: Should contain technology tags
          const techElements = container.querySelectorAll('[class*="bg-blue-100"]');
          expect(techElements.length).toBeGreaterThanOrEqual(project.technologies.length);
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Empty or invalid data should be handled gracefully
  test('should handle edge cases in project data gracefully', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          title: fc.string({ minLength: 1 }),
          description: fc.string({ minLength: 1 }),
          technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          achievements: fc.option(fc.array(fc.string(), { minLength: 0 })),
          link: fc.option(fc.oneof(fc.webUrl(), fc.constant(''))),
          role: fc.option(fc.oneof(fc.string({ minLength: 1 }), fc.constant('')))
        }),
        (project: ProjectData) => {
          // Property: Component should render without throwing errors
          expect(() => {
            render(React.createElement(ProjectCard, { project }));
          }).not.toThrow();
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: CSS classes should be applied consistently
  test('should apply consistent CSS classes for styling', () => {
    fc.assert(
      fc.property(
        projectDataArbitrary,
        (project: ProjectData) => {
          const { container } = render(React.createElement(ProjectCard, { project }));
          
          // Property: Main container should have proper styling classes
          const mainDiv = container.firstChild as HTMLElement;
          expect(mainDiv.className).toMatch(/bg-white|dark:bg-gray-800/);
          expect(mainDiv.className).toMatch(/rounded-lg/);
          expect(mainDiv.className).toMatch(/shadow-lg/);
          
          // Property: Technology tags should have consistent styling
          const techTags = container.querySelectorAll('[class*="bg-blue-100"]');
          techTags.forEach(tag => {
            expect(tag.className).toMatch(/bg-blue-100/);
            expect(tag.className).toMatch(/text-blue-800/);
            expect(tag.className).toMatch(/rounded-full/);
          });
          
          // Cleanup after each property test run
          cleanup();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});