import { Metadata } from 'next';
import { PortfolioShell } from '@/components/portfolio/PortfolioShell';

export const metadata: Metadata = {
  title: 'Tanushree T B — Computer Science Engineer | AI/ML & Full-Stack Developer',
  description: 'Portfolio of Tanushree T B, a Computer Science Engineering fresher specializing in Python, AI/ML, LLMs, FastAPI, React, and automation workflows.',
  keywords: [
    'Tanushree T B',
    'Computer Science Engineer',
    'AI/ML Developer',
    'Full-Stack Developer',
    'CareEase AI',
    'Multilingual Chatbot',
    'FastAPI',
    'Kafka',
    'PySpark',
    'LLMs',
    'Innovexis',
    'Portfolio',
  ],
  authors: [{ name: 'Tanushree T B' }],
  openGraph: {
    title: 'Tanushree T B — Computer Science Engineer | AI/ML & Full-Stack Developer',
    description: 'Building AI-powered applications, intelligent agents, and automation workflows using LLMs and API integrations.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Tanushree T B Portfolio',
  },
};

export default function Home() {
  return <PortfolioShell />;
}
