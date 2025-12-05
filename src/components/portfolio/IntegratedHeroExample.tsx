/**
 * IntegratedHero Example
 * 
 * Example usage of the IntegratedHero component with sample data.
 * This demonstrates how to use the component in the main portfolio page.
 */

'use client';

import { IntegratedHero } from './IntegratedHero';

/**
 * Example implementation of IntegratedHero
 * 
 * To use in your page:
 * 
 * import { IntegratedHeroExample } from '@/components/portfolio/IntegratedHeroExample';
 * 
 * // In your page component:
 * <IntegratedHeroExample />
 * 
 * Or use IntegratedHero directly with your own data:
 * 
 * <IntegratedHero
 *   name="Your Name"
 *   title="Your Title"
 *   description="Your description"
 *   ctaButtons={[
 *     { label: "View Projects", href: "#projects", variant: "primary" },
 *     { label: "Contact Me", href: "#contact", variant: "secondary" }
 *   ]}
 * />
 */
export const IntegratedHeroExample: React.FC = () => {
  return (
    <IntegratedHero
      name="Tanushree T B"
      title="Computer Science Student & Frontend Developer"
      description="Passionate about creating innovative solutions through Machine Learning and Web Development. Building the future, one line of code at a time."
      ctaButtons={[
        {
          label: "View Projects",
          href: "#projects",
          variant: "primary"
        },
        {
          label: "Contact Me",
          href: "#contact",
          variant: "secondary"
        }
      ]}
    />
  );
};
