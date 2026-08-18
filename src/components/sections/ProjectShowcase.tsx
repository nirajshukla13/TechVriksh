'use client';

import { Reveal } from '@/components/reveal';

export interface CommunityProject {
  name: string;
  description: string;
  creators: string[]; // array of creator names
  stack: string[]; // tech stack
  category: string; // e.g., "AI", "Web", "Mobile"
  event?: string; // associated hackathon/event if applicable
  status: 'building' | 'completed' | 'live';
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
}

// TODO: Replace with real community projects from database/CMS
const placeholderProjects: CommunityProject[] = [
  {
    name: 'AI Resume Analyzer',
    description: 'Smart resume analysis tool that provides actionable feedback using GPT-4 and custom ML models. Helps students optimize their resumes for ATS systems.',
    creators: ['Priya Sharma', 'Arjun Verma', 'Rahul Singh'],
    stack: ['Python', 'Next.js', 'OpenAI', 'TailwindCSS'],
    category: 'AI',
    event: 'Winter Hackathon 2024',
    status: 'live',
    githubUrl: 'https://github.com/placeholder',
    demoUrl: 'https://demo.placeholder.com',
    image: undefined, // Will use gradient placeholder
  },
  {
    name: 'Community Event Platform',
    description: 'Full-featured event management system built specifically for tech communities. Includes RSVP tracking, live polls, and speaker management.',
    creators: ['Sneha Gupta', 'Amit Kumar'],
    stack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'Web',
    status: 'completed',
    githubUrl: 'https://github.com/placeholder',
    image: undefined,
  },
  {
    name: 'Open Source Contribution Tracker',
    description: 'Track your open source contributions across GitHub, GitLab, and Bitbucket. Visualize your impact with beautiful charts and insights.',
    creators: ['Vikram Patel'],
    stack: ['Next.js', 'TypeScript', 'GitHub API', 'Chart.js'],
    category: 'Web',
    status: 'live',
    githubUrl: 'https://github.com/placeholder',
    demoUrl: 'https://demo.placeholder.com',
    image: undefined,
  },
  {
    name: 'Mobile Expense Manager',
    description: 'Beautiful cross-platform expense tracking app with budget alerts, category insights, and cloud sync. Built with performance in mind.',
    creators: ['Anjali Desai', 'Karan Mehta'],
    stack: ['React Native', 'Firebase', 'Redux', 'Native Base'],
    category: 'Mobile',
    event: 'Code Sprint 2024',
    status: 'building',
    githubUrl: 'https://github.com/placeholder',
    image: undefined,
  },
  {
    name: 'Smart Campus Navigator',
    description: 'AI-powered campus navigation with indoor mapping, class schedules integration, and real-time crowd density tracking.',
    creators: ['Rohan Joshi', 'Neha Kapoor', 'Siddharth Agarwal', 'Pooja Reddy'],
    stack: ['Python', 'React', 'TensorFlow', 'Google Maps API'],
    category: 'AI',
    status: 'building',
    image: undefined,
  },
  {
    name: 'Tech Blog Platform',
    description: 'Modern MDX-powered blogging platform with syntax highlighting, reading time estimates, and SEO optimization. Perfect for technical writers.',
    creators: ['Divya Iyer'],
    stack: ['Next.js', 'MDX', 'TailwindCSS', 'Vercel'],
    category: 'Web',
    status: 'live',
    githubUrl: 'https://github.com/placeholder',
    demoUrl: 'https://demo.placeholder.com',
    image: undefined,
  },
];

// Gradient backgrounds for projects without images
const categoryGradients: Record<string, string> = {
  AI: 'from-[color:var(--tv-primary)]/20 via-[color:var(--tv-cyan)]/15 to-[color:var(--tv-bg-secondary)]',
  Web: 'from-[color:var(--tv-cyan)]/20 via-[color:var(--tv-primary)]/15 to-[color:var(--tv-bg-secondary)]',
  Mobile: 'from-[color:var(--tv-magenta)]/20 via-[color:var(--tv-primary)]/15 to-[color:var(--tv-bg-secondary)]',
};

// Status colors
const statusConfig = {
  building: {
    label: 'In Progress',
    color: 'text-[color:var(--tv-cyan)]',
    bg: 'bg-[color:var(--tv-cyan)]/10',
    border: 'border-[color:var(--tv-cyan)]/30',
  },
  completed: {
    label: 'Completed',
    color: 'text-[color:var(--tv-primary)]',
    bg: 'bg-[color:var(--tv-primary)]/10',
    border: 'border-[color:var(--tv-primary)]/30',
  },
  live: {
    label: 'Live',
    color: 'text-[color:var(--tv-magenta)]',
    bg: 'bg-[color:var(--tv-magenta)]/10',
    border: 'border-[color:var(--tv-magenta)]/30',
  },
};

export function ProjectShowcase() {
  const [featuredProject, ...otherProjects] = placeholderProjects;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-16 space-y-4 text-center">
          <div className="tv-section-label">BUILT BY THE COMMUNITY</div>
          <h2 className="tv-heading text-4xl sm:text-5xl lg:text-6xl">
            REAL PROJECTS BY REAL MEMBERS
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[color:var(--tv-text-secondary)] sm:text-lg">
            From hackathons to personal passion projects, see what our community is building
          </p>
        </div>
      </Reveal>

      <div className="space-y-6">
        {/* Featured Project - Larger card */}
        <Reveal delay={0}>
          <ProjectCard project={featuredProject} featured />
        </Reveal>

        {/* Grid of other projects */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <Reveal key={project.name} delay={(index + 1) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: CommunityProject;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const gradient = categoryGradients[project.category] || categoryGradients.Web;

  return (
    <div
      className={`tv-card group relative flex flex-col overflow-hidden hover:scale-[1.02] ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Category Badge - Top Right Corner */}
      <div className="absolute right-4 top-4 z-10">
        <span className="tv-tag rounded-lg px-3 py-1.5 text-xs font-medium text-[color:var(--tv-text-secondary)] backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Project Image/Gradient */}
      <div
        className={`relative overflow-hidden ${
          featured ? 'h-64 sm:h-80' : 'h-48'
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${gradient} transition-all duration-700 group-hover:scale-110`}
          />
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--tv-bg-secondary)]/95 via-[color:var(--tv-bg-secondary)]/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
      </div>

      {/* Project Content */}
      <div className="relative flex flex-1 flex-col space-y-4 p-6">
        {/* Event Badge (if applicable) */}
        {project.event && (
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-[color:var(--tv-primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="tv-mono text-xs text-[color:var(--tv-primary)]">
              {project.event}
            </span>
          </div>
        )}

        {/* Project Name */}
        <h3
          className={`tv-heading text-[color:var(--tv-text-primary)] ${
            featured ? 'text-2xl sm:text-3xl' : 'text-xl'
          }`}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className={`flex-1 leading-relaxed text-[color:var(--tv-text-secondary)] ${
            featured ? 'text-base' : 'text-sm'
          }`}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="tv-mono rounded-md border border-[color:var(--tv-border)] bg-[color:var(--tv-bg-secondary)]/50 px-2.5 py-1 text-xs text-[color:var(--tv-text-muted)] transition-colors duration-300 hover:border-[color:var(--tv-primary)]/30 hover:text-[color:var(--tv-text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer: Creators, Status, Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--tv-border-subtle)] pt-4">
          {/* Creators */}
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-[color:var(--tv-text-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-sm text-[color:var(--tv-text-muted)]">
              {project.creators.length} {project.creators.length === 1 ? 'creator' : 'creators'}
            </span>
          </div>

          {/* Status Badge */}
          <span
            className={`tv-mono rounded-md border px-2.5 py-1 text-xs font-medium ${status.color} ${status.bg} ${status.border}`}
          >
            {status.label}
          </span>
        </div>

        {/* Action Links */}
        {(project.githubUrl || project.demoUrl) && (
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tv-button flex flex-1 items-center justify-center gap-2 rounded-lg border border-[color:var(--tv-border)] bg-[color:var(--tv-bg-secondary)]/50 px-4 py-2.5 text-sm font-medium text-[color:var(--tv-text-secondary)] transition-all duration-300 hover:border-[color:var(--tv-primary)]/30 hover:bg-[color:var(--tv-primary)]/5 hover:text-[color:var(--tv-text-primary)]"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tv-button tv-button-primary flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[color:var(--tv-text-primary)]"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
