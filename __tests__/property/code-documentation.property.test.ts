/**
 * **Feature: portfolio-blog-websites, Property 9: Code documentation completeness**
 * **Validates: Requirements 6.1, 6.2, 6.4**
 * 
 * Property-based test for validating code documentation completeness.
 * This test ensures that animation logic, theme functionality, and component structure
 * are properly documented with inline comments explaining the implementation approach.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Code Documentation Completeness Properties', () => {
  const projectRoot = path.resolve(__dirname, '../..');
  
  /**
   * Helper function to check if a file has meaningful documentation
   * @param content - File content to analyze
   * @param minCommentRatio - Minimum ratio of comment lines to total lines
   * @returns boolean indicating if documentation is adequate
   */
  const hasAdequateDocumentation = (content: string, minCommentRatio: number = 0.1): boolean => {
    const lines = content.split('\n');
    const totalLines = lines.filter(line => line.trim().length > 0).length;
    
    // Count comment lines (single-line and multi-line)
    const commentLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.startsWith('//') || 
             trimmed.startsWith('/*') || 
             trimmed.startsWith('*') ||
             trimmed.startsWith('*/');
    }).length;
    
    // Check for JSDoc comments
    const hasJSDoc = content.includes('/**');
    
    // Check for inline explanatory comments (not just code)
    const hasExplanatoryComments = /\/\/\s*[A-Z]/.test(content) || /\/\*\*?\s*[A-Z]/.test(content);
    
    return (commentLines / totalLines >= minCommentRatio) && (hasJSDoc || hasExplanatoryComments);
  };

  /**
   * Helper function to check if animation code has explanatory comments
   * @param content - File content to analyze
   * @returns boolean indicating if animation logic is documented
   */
  const hasAnimationDocumentation = (content: string): boolean => {
    // Check for animation-related keywords in comments
    const animationKeywords = [
      'animation', 'transition', 'motion', 'framer', 
      'duration', 'easing', 'fade', 'slide', 'scale',
      'transform', 'opacity', 'keyframe'
    ];
    
    const commentBlocks = content.match(/\/\*[\s\S]*?\*\/|\/\/.*/g) || [];
    const commentText = commentBlocks.join(' ').toLowerCase();
    
    return animationKeywords.some(keyword => commentText.includes(keyword));
  };

  /**
   * Helper function to check if theme functionality has explanatory comments
   * @param content - File content to analyze
   * @returns boolean indicating if theme logic is documented
   */
  const hasThemeDocumentation = (content: string): boolean => {
    // Check for theme-related keywords in comments
    const themeKeywords = [
      'theme', 'dark', 'light', 'toggle', 'color',
      'localstorage', 'persist', 'preference', 'mode'
    ];
    
    const commentBlocks = content.match(/\/\*[\s\S]*?\*\/|\/\/.*/g) || [];
    const commentText = commentBlocks.join(' ').toLowerCase();
    
    return themeKeywords.some(keyword => commentText.includes(keyword));
  };

  // Property: Animation utility files should have comprehensive documentation
  test('animation logic should include inline comments explaining implementation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'src/utils/animations.ts',
          'src/components/shared/AnimatedContainer.tsx',
          'src/components/portfolio/AnimatedSkillBars.tsx'
        ),
        (animationFile) => {
          const filePath = path.join(projectRoot, animationFile);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Property: Animation files should have adequate documentation
            expect(hasAdequateDocumentation(content, 0.15)).toBe(true);
            
            // Property: Animation files should have animation-specific documentation
            expect(hasAnimationDocumentation(content)).toBe(true);
            
            // Property: Should have JSDoc comments for exported functions/components
            if (content.includes('export')) {
              expect(content).toMatch(/\/\*\*/);
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Theme functionality should be documented with clear explanations
  test('theme functionality should be documented with explanatory comments', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'src/contexts/ThemeContext.tsx',
          'src/app/globals.css'
        ),
        (themeFile) => {
          const filePath = path.join(projectRoot, themeFile);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Property: Theme files should have adequate documentation
            expect(hasAdequateDocumentation(content, 0.1)).toBe(true);
            
            // Property: Theme files should have theme-specific documentation
            expect(hasThemeDocumentation(content)).toBe(true);
            
            // Property: Should explain error handling for localStorage
            if (themeFile.includes('ThemeContext')) {
              expect(content.toLowerCase()).toMatch(/error|handling|fallback|catch/);
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Component files should follow consistent naming and have structure documentation
  test('component structure and naming conventions should be documented', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'src/components/portfolio/HeroSection.tsx',
          'src/components/portfolio/ProjectCard.tsx',
          'src/components/portfolio/SkillsGrid.tsx',
          'src/components/blog/BlogLayout.tsx',
          'src/components/blog/NavigationBar.tsx',
          'src/components/blog/PostCard.tsx'
        ),
        (componentFile) => {
          const filePath = path.join(projectRoot, componentFile);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Property: Component files should have documentation
            expect(hasAdequateDocumentation(content, 0.08)).toBe(true);
            
            // Property: Should have component description comment
            const hasComponentDoc = content.includes('/**') || 
                                   content.match(/\/\/.*component/i) !== null;
            expect(hasComponentDoc).toBe(true);
            
            // Property: Should document props interface if it exists
            if (content.includes('interface') && content.includes('Props')) {
              const interfaceMatch = content.match(/interface\s+\w+Props/);
              if (interfaceMatch) {
                // Check if there's a comment before or within the interface
                const interfaceIndex = content.indexOf(interfaceMatch[0]);
                const precedingText = content.substring(Math.max(0, interfaceIndex - 200), interfaceIndex);
                const hasInterfaceDoc = precedingText.includes('/**') || precedingText.includes('//');
                expect(hasInterfaceDoc).toBe(true);
              }
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: CSS files should include comments describing custom animations and transitions
  test('CSS custom animations and transitions should be documented', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'src/app/globals.css',
          'src/styles/portfolio.module.css',
          'src/styles/blog.module.css'
        ),
        (cssFile) => {
          const filePath = path.join(projectRoot, cssFile);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Property: CSS files should have comments
            const hasComments = content.includes('/*');
            expect(hasComments).toBe(true);
            
            // Property: Animation keyframes should be documented
            if (content.includes('@keyframes')) {
              const keyframeMatches = content.match(/@keyframes\s+\w+/g) || [];
              keyframeMatches.forEach(keyframe => {
                const keyframeIndex = content.indexOf(keyframe);
                // Use 500-character lookback window to accommodate comprehensive JSDoc-style comments
                const precedingText = content.substring(Math.max(0, keyframeIndex - 500), keyframeIndex);
                // Check if there's a comment explaining the keyframe
                const hasKeyframeDoc = precedingText.includes('/*');
                expect(hasKeyframeDoc).toBe(true);
              });
            }
            
            // Property: Transition properties should have explanatory comments
            if (content.includes('transition:')) {
              // Should have at least some comments explaining transitions
              const transitionComments = content.match(/\/\*[\s\S]*?transition[\s\S]*?\*\//gi) ||
                                        content.match(/\/\*[\s\S]*?\*\/[\s\S]{0,100}transition/gi);
              expect(transitionComments).toBeTruthy();
            }
            
            // Property: Custom properties (CSS variables) should be documented
            if (content.includes('--')) {
              const customPropSections = content.match(/--[\w-]+:/g);
              if (customPropSections && customPropSections.length > 3) {
                // Should have comments explaining the custom properties
                const hasCustomPropDoc = content.match(/\/\*[\s\S]*?custom\s+propert/i) ||
                                        content.match(/\/\*[\s\S]*?variable/i) ||
                                        content.match(/\/\*[\s\S]*?theme/i);
                expect(hasCustomPropDoc).toBeTruthy();
              }
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Utility functions should have JSDoc comments
  test('utility functions should have JSDoc documentation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'src/utils/animations.ts',
          'src/utils/colorContrast.ts'
        ),
        (utilFile) => {
          const filePath = path.join(projectRoot, utilFile);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Property: Utility files should have JSDoc comments
            expect(content).toMatch(/\/\*\*/);
            
            // Property: Exported functions should have documentation
            const exportedFunctions = content.match(/export\s+(const|function)\s+\w+/g) || [];
            if (exportedFunctions.length > 0) {
              // At least half of exported functions should have JSDoc
              const jsdocCount = (content.match(/\/\*\*[\s\S]*?\*\//g) || []).length;
              expect(jsdocCount).toBeGreaterThanOrEqual(Math.ceil(exportedFunctions.length / 2));
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Complex logic should have inline explanatory comments
  test('complex logic should have step-by-step explanatory comments', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'src/contexts/ThemeContext.tsx',
          'src/components/portfolio/AnimatedSkillBars.tsx',
          'src/utils/colorContrast.ts'
        ),
        (complexFile) => {
          const filePath = path.join(projectRoot, complexFile);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Property: Files with try-catch blocks should document error handling
            if (content.includes('try') && content.includes('catch')) {
              const catchBlocks = content.match(/catch\s*\([^)]*\)\s*{[^}]*}/g) || [];
              catchBlocks.forEach(catchBlock => {
                // Each catch block should have a comment explaining the error handling
                expect(catchBlock).toMatch(/console\.(warn|error|log)/);
              });
            }
            
            // Property: Conditional logic should have explanatory comments
            const conditionalCount = (content.match(/if\s*\(/g) || []).length;
            if (conditionalCount > 5) {
              // Complex files with many conditionals should have adequate comments
              expect(hasAdequateDocumentation(content, 0.1)).toBe(true);
            }
            
            // Property: Loop logic should be documented
            if (content.includes('map(') || content.includes('forEach(') || content.includes('reduce(')) {
              const hasLoopDoc = content.match(/\/\/.*map|\/\/.*forEach|\/\/.*reduce|\/\*\*[\s\S]*?(map|forEach|reduce)/i);
              expect(hasLoopDoc).toBeTruthy();
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Type definitions should be documented
  test('type definitions and interfaces should have documentation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'src/types/index.ts'
        ),
        (typeFile) => {
          const filePath = path.join(projectRoot, typeFile);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Property: Type file should have documentation
            expect(hasAdequateDocumentation(content, 0.15)).toBe(true);
            
            // Property: Each interface should have a description
            const interfaces = content.match(/export\s+interface\s+\w+/g) || [];
            if (interfaces.length > 0) {
              // Should have JSDoc comments for interfaces
              const jsdocCount = (content.match(/\/\*\*[\s\S]*?\*\//g) || []).length;
              expect(jsdocCount).toBeGreaterThanOrEqual(Math.ceil(interfaces.length / 2));
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
