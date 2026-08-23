'use client';

import { Reveal } from '@/components/reveal';
import { communityJoinUrl } from '@/app/data';

// ─────────────────────────────────────────────────────────────────────────────
// Community project data structure.
//
// TODO: Populate with real community projects. Good sources:
//   - HackVriksh submissions (Oct 2025)
//   - Projects built during workshops
//   - Side projects members want to share
//
// Do NOT add a project entry without a real GitHub URL or demo link.
// Do NOT invent project names, descriptions, or creator names.
// ─────────────────────────────────────────────────────────────────────────────

export interface CommunityProject {
  name: string;
  description: string;
  /** Member names exactly as known. */
  creators: string[];
  /** Only list technologies actually used. */
  stack: string[];
  /** Context if built at an event. */
  context?: string;
  status: 'building' | 'completed' | 'live';
  githubUrl?: string;
  demoUrl?: string;
  /** Set to true until replaced with a real project. */
  isPlaceholder: boolean;
}

// PLACEHOLDER ENTRIES — none of these are real projects.
// Replace with actual community work as projects are shared.
const projects: CommunityProject[] = [
  {
    name: '—',
    description: '',
    creators: [],
    stack: [],
    status: 'building',
    isPlaceholder: true,
  },
  {
    name: '—',
    description: '',
    creators: [],
    stack: [],
    status: 'building',
    isPlaceholder: true,
  },
  {
    name: '—',
    description: '',
    creators: [],
    stack: [],
    status: 'building',
    isPlaceholder: true,
  },
];

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
    color: 'text-[color:var(--tv-primary)]',
    bg: 'bg-[color:var(--tv-primary)]/10',
    border: 'border-[color:var(--tv-primary)]/30',
  },
};

export function ProjectShowcase() {
  const allPlaceholder = projects.every((p) => p.isPlaceholder);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <Reveal>
        {/* Section header */}
        <div className="mb-10 sm:mb-12">
          <div className="tv-section-label">BUILT BY THE COMMUNITY</div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="tv-heading text-4xl tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              We don't just
              <br />
              talk about it.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
              When members build something real — during a hackathon, a workshop, or on their own — it belongs here.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="space-y-6">
        {/* Featured slot */}
        <Reveal>
          {allPlaceholder ? (
            <FeaturedPlaceholder />
          ) : (
            projects[0] && !projects[0].isPlaceholder && (
              <ProjectCard project={projects[0]} featured />
            )
          )}
        </Reveal>

        {/* Grid of secondary projects */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(1).map((project, index) => (
            <Reveal key={index} delay={(index + 1) * 80}>
              {project.isPlaceholder ? (
                <SecondaryPlaceholder index={index + 1} />
              ) : (
                <ProjectCard project={project} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Placeholder components ─────────────────────────────────────────────── */

function FeaturedPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-[color:var(--tv-primary)]/20 bg-gradient-to-br from-[color:var(--tv-surface)] to-[color:var(--tv-bg-secondary)]">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(57,217,138,0.04),transparent_60%)]" />

      <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
        {/* Left — concept visual */}
        <div className="flex h-48 items-center justify-center rounded-[1.5rem] border border-dashed border-[color:var(--tv-border)]/60 bg-[color:var(--tv-bg-secondary)]/50 sm:h-64 lg:h-72">
          <div className="text-center">
            {/* Stylised brackets icon */}
            <div className="tv-heading mb-3 text-4xl text-[color:var(--tv-primary)]/20 sm:text-5xl">
              {'</>'}
            </div>
            <p className="tv-mono text-xs uppercase tracking-[0.24em] text-[color:var(--tv-text-muted)]/60">
              Featured project
            </p>
          </div>
        </div>

        {/* Right — copy */}
        <div className="space-y-5">
          <div className="tv-mono text-xs uppercase tracking-[0.28em] text-[color:var(--tv-primary)]/60">
            Coming soon
          </div>
          <h3 className="tv-heading text-2xl tracking-[-0.03em] text-[color:var(--tv-text-primary)] sm:text-3xl">
            The first featured project will appear here.
          </h3>
          <p className="text-sm leading-[1.8] text-[color:var(--tv-text-secondary)]">
            This slot is for the most significant thing a Tech Vriksh member has built — a hackathon winner,
            a live tool, or a project that genuinely solves a problem. When that project exists, it goes here.
          </p>
          <a
            href={communityJoinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tv-button tv-button-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[color:var(--tv-text-primary)]"
            data-cursor-hover
          >
            Join and build something →
          </a>
        </div>
      </div>
    </div>
  );
}

function SecondaryPlaceholder({ index }: { index: number }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-dashed border-[color:var(--tv-border)]/50 bg-[color:var(--tv-surface)]/50 p-6">
      <div className="mb-4 flex h-32 items-center justify-center rounded-[1rem] border border-dashed border-[color:var(--tv-border)]/40 bg-[color:var(--tv-bg-secondary)]/40">
        <span className="tv-mono text-xs uppercase tracking-[0.24em] text-[color:var(--tv-text-muted)]/40">
          Project #{index + 1}
        </span>
      </div>
      <div className="space-y-2">
        <div className="h-5 w-3/4 rounded-md bg-[color:var(--tv-border)]/30" />
        <div className="h-4 w-full rounded-md bg-[color:var(--tv-border)]/20" />
        <div className="h-4 w-2/3 rounded-md bg-[color:var(--tv-border)]/20" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {['Stack', 'Tags', 'Here'].map((t) => (
          <span
            key={t}
            className="tv-mono rounded-md border border-[color:var(--tv-border)]/30 bg-[color:var(--tv-bg-secondary)]/30 px-2.5 py-1 text-xs text-[color:var(--tv-text-muted)]/40"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Real project card ───────────────────────────────────────────────────── */

interface ProjectCardProps {
  project: CommunityProject;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[color:var(--tv-surface)] to-[color:var(--tv-bg-secondary)] transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--tv-primary)]/30 hover:shadow-[0_20px_56px_rgba(0,0,0,0.5)] ${
        featured ? 'lg:flex-row' : ''
      }`}
    >
      {/* Gradient visual */}
      <div
        className={`relative flex-shrink-0 bg-gradient-to-br from-[color:var(--tv-primary)]/20 via-[color:var(--tv-cyan)]/10 to-[color:var(--tv-bg-secondary)] ${
          featured ? 'h-48 lg:h-auto lg:w-2/5' : 'h-40'
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="tv-heading text-3xl text-[color:var(--tv-primary)]/20">{'</>'}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--tv-bg-secondary)]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col space-y-4 p-6 ${featured ? 'sm:p-8' : ''}`}>
        {/* Context badge */}
        {project.context && (
          <div className="tv-mono text-xs text-[color:var(--tv-primary)]">
            ↳ {project.context}
          </div>
        )}

        {/* Name */}
        <h3 className={`tv-heading text-[color:var(--tv-text-primary)] ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {project.name}
        </h3>

        {/* Description */}
        {project.description && (
          <p className={`flex-1 leading-relaxed text-[color:var(--tv-text-secondary)] ${featured ? 'text-base' : 'text-sm'}`}>
            {project.description}
          </p>
        )}

        {/* Stack */}
        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="tv-mono rounded-md border border-[color:var(--tv-border)] bg-[color:var(--tv-bg-secondary)]/50 px-2.5 py-1 text-xs text-[color:var(--tv-text-muted)] transition-colors hover:text-[color:var(--tv-text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--tv-border-subtle)] pt-4">
          {project.creators.length > 0 && (
            <span className="text-sm text-[color:var(--tv-text-muted)]">
              Built by {project.creators.join(', ')}
            </span>
          )}
          <span
            className={`tv-mono rounded-md border px-2.5 py-1 text-xs font-medium ${status.color} ${status.bg} ${status.border}`}
          >
            {status.label}
          </span>
        </div>

        {/* Action links — only shown when real URLs exist */}
        {(project.githubUrl || project.demoUrl) && (
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tv-button flex flex-1 items-center justify-center gap-2 rounded-lg border border-[color:var(--tv-border)] bg-[color:var(--tv-bg-secondary)]/50 px-4 py-2.5 text-sm font-medium text-[color:var(--tv-text-secondary)] hover:border-[color:var(--tv-primary)]/30 hover:text-[color:var(--tv-text-primary)]"
              >
                View Code →
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tv-button tv-button-primary flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[color:var(--tv-text-primary)]"
              >
                View Project →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
