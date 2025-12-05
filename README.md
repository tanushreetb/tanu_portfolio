# Portfolio & Blog Websites

A modern, responsive portfolio and blog website built with Next.js 13+ featuring vibrant animations, theme switching, and comprehensive testing.

## Features

- **Portfolio Website**: Showcasing professional work, projects, and achievements
- **Integrated Blog**: Seamlessly integrated blog section with advanced navigation
- **Theme System**: Light/dark mode with smooth transitions and localStorage persistence
- **Animations**: Engaging animations using Framer Motion and CSS transitions
- **Responsive Design**: Mobile-first approach with optimal viewing across all devices
- **TypeScript**: Full TypeScript support for type safety
- **Testing**: Comprehensive testing with Jest, React Testing Library, and Property-Based Testing

## Project Structure

```
portfolio-blog-websites/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── blog/              # Blog pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles with theme variables
│   ├── components/            # React components
│   │   ├── portfolio/         # Portfolio-specific components
│   │   ├── blog/              # Blog-specific components
│   │   └── shared/            # Shared components
│   ├── contexts/              # React contexts (Theme, etc.)
│   ├── data/                  # Static data and content
│   ├── styles/                # CSS modules
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
├── __tests__/                 # Test files
│   ├── unit/                  # Unit tests
│   └── property/              # Property-based tests
└── public/                    # Static assets
```

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Animations**: Framer Motion + CSS Transitions
- **Testing**: Jest + React Testing Library + fast-check (PBT)
- **Theme**: Custom CSS properties with localStorage persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Run property-based tests
npm run test:property

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Start production server
npm run start
```

## Testing

The project includes comprehensive testing:

- **Unit Tests**: Component and function testing with Jest and React Testing Library
- **Property-Based Tests**: Validation of system properties using fast-check
- **Coverage**: Test coverage reporting

### Running Tests

```bash
# All tests
npm run test

# Property-based tests only
npm run test:property

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Theme System

The application features a robust theme system with:

- Light and dark mode support
- CSS custom properties for consistent theming
- localStorage persistence
- Smooth transitions between themes
- Respect for user's system preferences
- Reduced motion support for accessibility

## Animation System

Animations are implemented using:

- Framer Motion for complex animations
- CSS transitions for simple state changes
- Respect for `prefers-reduced-motion`
- Performance-optimized animations
- Consistent easing and timing

## Responsive Design

- Mobile-first approach
- Flexible grid systems
- Touch-friendly navigation
- Optimized for all screen sizes
- Progressive enhancement

## Contributing

1. Follow the established code structure
2. Write tests for new features
3. Ensure all tests pass
4. Follow TypeScript best practices
5. Document new components and utilities

## License

This project is for educational and portfolio purposes.