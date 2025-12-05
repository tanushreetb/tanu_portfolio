/**
 * ProjectsShowcase Component Tests
 * 
 * Tests for the ProjectsShowcase component suite including:
 * - ProjectsShowcase main component
 * - ProjectCard3D component
 * - ProjectDetailModal component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectsShowcase } from '../ProjectsShowcase';
import { ProjectCard3D } from '../ProjectCard3D';
import { ProjectDetailModal } from '../ProjectDetailModal';
import { ProjectData } from '@/types';

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>, ref: React.Ref<HTMLDivElement>) => 
        <div ref={ref} {...props}>{children}</div>
      ),
      img: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <img {...props} />,
      span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...props}>{children}</span>,
      a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <a {...props}>{children}</a>,
      button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
    },
    AnimatePresence: ({ children }: React.PropsWithChildren<{ children?: React.ReactNode }>) => <>{children}</>,
    useMotionValue: () => ({ set: jest.fn(), get: jest.fn() }),
    useSpring: (value: unknown) => value,
    useTransform: () => 0,
  };
});

// Mock hooks
jest.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({ ref: { current: null }, isVisible: true }),
}));

jest.mock('@/utils/animations', () => ({
  prefersReducedMotion: () => false,
}));

const mockProject: ProjectData = {
  id: 'test-project',
  title: 'Test Project',
  description: 'This is a test project description',
  technologies: ['React', 'TypeScript', 'Jest'],
  role: 'Developer',
  achievements: ['Won first prize'],
  link: 'https://example.com',
  image: '/test-image.jpg',
  featured: true,
};

describe('ProjectsShowcase', () => {
  it('renders the component with projects', () => {
    render(<ProjectsShowcase projects={[mockProject]} />);
    
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders with custom title and description', () => {
    render(
      <ProjectsShowcase
        projects={[mockProject]}
        title="My Projects"
        description="Custom description"
      />
    );
    
    expect(screen.getByText('My Projects')).toBeInTheDocument();
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('renders empty state when no projects', () => {
    render(<ProjectsShowcase projects={[]} />);
    
    expect(screen.getByText('No Projects Yet')).toBeInTheDocument();
  });

  it('applies correct grid classes for bento layout', () => {
    const { container } = render(
      <ProjectsShowcase projects={[mockProject]} layout="bento" />
    );
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('auto-rows-fr');
  });

  it('applies correct grid classes for standard grid layout', () => {
    const { container } = render(
      <ProjectsShowcase projects={[mockProject]} layout="grid" />
    );
    
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });
});

describe('ProjectCard3D', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard3D project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('renders technology tags', () => {
    render(<ProjectCard3D project={mockProject} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
  });

  it('renders featured badge when featured prop is true', () => {
    render(<ProjectCard3D project={mockProject} featured={true} />);
    
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('calls onExpand when card is clicked', () => {
    const onExpand = jest.fn();
    const { container } = render(
      <ProjectCard3D project={mockProject} onExpand={onExpand} />
    );
    
    const card = container.firstChild as HTMLElement;
    fireEvent.click(card);
    
    expect(onExpand).toHaveBeenCalledWith(mockProject);
  });

  it('renders achievements when present', () => {
    render(<ProjectCard3D project={mockProject} />);
    
    expect(screen.getByText('Won first prize')).toBeInTheDocument();
  });

  it('renders project image when provided', () => {
    render(<ProjectCard3D project={mockProject} />);
    
    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });
});

describe('ProjectDetailModal', () => {
  it('renders modal when open', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('About the Project')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={false}
        onClose={jest.fn()}
      />
    );
    
    expect(screen.queryByText('About the Project')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={onClose}
      />
    );
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('renders all project details', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
    expect(screen.getByText('Technologies Used')).toBeInTheDocument();
    expect(screen.getByText('Achievements')).toBeInTheDocument();
  });

  it('renders project link when provided', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    
    const link = screen.getByText('View Project').closest('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render when project is null', () => {
    const { container } = render(
      <ProjectDetailModal
        project={null}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });
});
