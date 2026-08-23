'use client';

import { Reveal } from '@/components/reveal';

// ─────────────────────────────────────────────────────────────────────────────
// Data structure for community stories.
//
// TODO: Replace placeholders with real member stories. Reach out to members
// who participated in events like Ctrl + Future, HackVriksh, or Techpath.
// Each real story should include their name, role, a genuine quote about their
// experience, what they participated in, and optionally a LinkedIn/GitHub link.
// ─────────────────────────────────────────────────────────────────────────────

export interface CommunityStory {
  name: string;
  role: string;
  /** Short, genuine quote about their Tech Vriksh experience. */
  quote: string;
  /** What event/activity they participated in. */
  participatedIn: string;
  /** What they built or learned. */
  takeaway: string;
  initials: string;
  linkedIn?: string;
  github?: string;
  /** True = this is a placeholder, not a real testimonial. */
  isPlaceholder: boolean;
}

// PLACEHOLDER STORIES — clearly marked. Do not present these as real.
// Replace with actual member stories once collected.
const stories: CommunityStory[] = [
  {
    name: 'Your Story',
    role: 'Tech Vriksh Member',
    quote:
      'If you attended a workshop, joined a hackathon, or built something with this community — your experience belongs here.',
    participatedIn: 'A Tech Vriksh event',
    takeaway: 'Something real you built or learned',
    initials: 'TV',
    isPlaceholder: true,
  },
  {
    name: 'Your Story',
    role: 'Tech Vriksh Member',
    quote:
      'If you attended a workshop, joined a hackathon, or built something with this community — your experience belongs here.',
    participatedIn: 'A Tech Vriksh event',
    takeaway: 'Something real you built or learned',
    initials: 'TV',
    isPlaceholder: true,
  },
  {
    name: 'Your Story',
    role: 'Tech Vriksh Member',
    quote:
      'If you attended a workshop, joined a hackathon, or built something with this community — your experience belongs here.',
    participatedIn: 'A Tech Vriksh event',
    takeaway: 'Something real you built or learned',
    initials: 'TV',
    isPlaceholder: true,
  },
];

const PlaceholderCard = () => (
  <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-dashed border-[color:var(--tv-border-strong)]/40 bg-[color:var(--tv-surface)]/50 p-8 transition-all duration-500 hover:border-[color:var(--tv-primary)]/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
    {/* Initials */}
    <div className="mb-6 flex items-center gap-4">
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--tv-border)] bg-gradient-to-br from-[color:var(--tv-primary)]/10 to-transparent">
        <span className="tv-heading text-lg text-[color:var(--tv-primary)]/50">?</span>
      </div>
      <div>
        <div className="h-4 w-28 rounded-md bg-[color:var(--tv-border)] opacity-40" />
        <div className="mt-2 h-3 w-20 rounded-md bg-[color:var(--tv-border)] opacity-25" />
      </div>
    </div>

    {/* Placeholder quote area */}
    <div className="mb-6 flex-1">
      <p className="text-sm leading-relaxed text-[color:var(--tv-text-muted)] italic">
        "This spot is waiting for a real story from a Tech Vriksh member."
      </p>
    </div>

    {/* Participated in placeholder */}
    <div className="mt-auto">
      <div className="tv-mono rounded-lg border border-[color:var(--tv-border)]/60 bg-[color:var(--tv-bg-secondary)]/50 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--tv-text-muted)]/60">
        Participated in: —
      </div>
    </div>
  </div>
);

export function CommunityStories() {
  const allPlaceholder = stories.every((s) => s.isPlaceholder);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <Reveal>
        <div className="mb-10 sm:mb-12">
          <div className="tv-section-label">REAL VOICES, REAL PEOPLE</div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="tv-heading text-4xl tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              People who
              <br />
              built with us.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
              Tech Vriksh is not a website or an event calendar. It is a community of real students doing real things.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Placeholder notice — visible only while all cards are placeholder */}
      {allPlaceholder && (
        <Reveal delay={100}>
          <div className="mb-8 rounded-[1rem] border border-[color:var(--tv-primary)]/15 bg-[color:var(--tv-primary)]/[0.04] px-6 py-4">
            <p className="tv-mono text-xs uppercase tracking-[0.22em] text-[color:var(--tv-primary)]/70">
              Community stories coming soon
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
              If you have attended an event or built something with Tech Vriksh,{' '}
              <a
                href="https://www.linkedin.com/company/tech-vriksh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--tv-primary)] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                reach out on LinkedIn
              </a>{' '}
              — your story belongs here.
            </p>
          </div>
        </Reveal>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <Reveal key={index} delay={index * 80}>
            {story.isPlaceholder ? (
              <PlaceholderCard />
            ) : (
              <RealStoryCard story={story} />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function RealStoryCard({ story }: { story: CommunityStory }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[color:var(--tv-surface)] to-[color:var(--tv-bg-secondary)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--tv-primary)]/30 hover:shadow-[0_20px_56px_rgba(0,0,0,0.5)]">
      {/* Left accent bar */}
      <div className="absolute left-0 top-10 h-20 w-[2px] rounded-r-full bg-gradient-to-b from-transparent via-[color:var(--tv-primary)]/60 to-transparent transition-all duration-500 group-hover:h-32 group-hover:via-[color:var(--tv-primary)]" />

      {/* Profile header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--tv-primary)]/20 bg-gradient-to-br from-[color:var(--tv-primary)]/15 to-transparent transition-all duration-500 group-hover:border-[color:var(--tv-primary)]/40">
            <span className="tv-heading text-lg text-[color:var(--tv-primary)]">
              {story.initials}
            </span>
          </div>
          <div>
            <h3 className="tv-heading text-lg text-[color:var(--tv-text-primary)] transition-colors duration-300 group-hover:text-[color:var(--tv-primary)]">
              {story.name}
            </h3>
            <p className="tv-mono mt-0.5 text-xs uppercase tracking-[0.18em] text-[color:var(--tv-text-muted)]">
              {story.role}
            </p>
          </div>
        </div>

        {/* Social link */}
        {(story.linkedIn || story.github) && (
          <a
            href={story.linkedIn || story.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--tv-border)] bg-[color:var(--tv-bg-secondary)]/50 transition-all duration-300 hover:border-[color:var(--tv-primary)]/30 hover:bg-[color:var(--tv-primary)]/5"
            aria-label={`${story.name}'s profile`}
          >
            {story.linkedIn ? (
              <svg className="h-4 w-4 fill-[color:var(--tv-text-secondary)] transition-colors group-hover:fill-[color:var(--tv-primary)]" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            ) : (
              <svg className="h-4 w-4 fill-[color:var(--tv-text-secondary)]" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            )}
          </a>
        )}
      </div>

      {/* Quote */}
      <div className="mb-6 flex-1">
        <svg className="mb-3 h-6 w-6 text-[color:var(--tv-primary)]/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
        <blockquote className="text-base leading-[1.8] text-[color:var(--tv-text-primary)]">
          {story.quote}
        </blockquote>
      </div>

      {/* Participated in + takeaway */}
      <div className="mt-auto space-y-2">
        <div className="tv-mono rounded-lg border border-[color:var(--tv-border)]/60 bg-[color:var(--tv-bg-secondary)]/50 px-4 py-3 text-xs">
          <span className="uppercase tracking-[0.18em] text-[color:var(--tv-text-muted)]">Participated in: </span>
          <span className="text-[color:var(--tv-text-secondary)]">{story.participatedIn}</span>
        </div>
        <div className="tv-mono rounded-lg border border-[color:var(--tv-primary)]/10 bg-[color:var(--tv-primary)]/5 px-4 py-3 text-xs">
          <span className="uppercase tracking-[0.18em] text-[color:var(--tv-primary)]/70">Built / learned: </span>
          <span className="text-[color:var(--tv-text-secondary)]">{story.takeaway}</span>
        </div>
      </div>
    </div>
  );
}
