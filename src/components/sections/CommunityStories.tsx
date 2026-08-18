'use client';

import { Reveal } from '@/components/reveal';

export interface CommunityStory {
  name: string;
  role: string;
  quote: string;
  achievement: string;
  image?: string;
  linkedIn?: string;
}

// TODO: Replace with real testimonials
const placeholderStories: CommunityStory[] = [
  {
    name: 'Priya Sharma',
    role: 'BTech Student, AKGEC',
    quote: 'I attended my first workshop as a nervous first-year. Now I lead technical sessions and help others start their journey.',
    achievement: 'From attendee to workshop leader in 6 months',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    linkedIn: 'https://linkedin.com/in/placeholder',
  },
  {
    name: 'Arjun Verma',
    role: 'CSE Student, AKGEC',
    quote: 'Built my first full-stack app at the community hackathon. That project became my internship portfolio piece.',
    achievement: 'Won Best Innovation Award and landed dream internship',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    linkedIn: 'https://linkedin.com/in/placeholder',
  },
  {
    name: 'Sneha Gupta',
    role: 'IT Student, AKGEC',
    quote: 'The connections I made here opened doors I didn\'t know existed. Found my first open source project through a community member.',
    achievement: 'Contributing to major open source projects',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
  },
  {
    name: 'Rahul Singh',
    role: 'BTech Student, AKGEC',
    quote: 'Tech Vriksh gave me the confidence to build. Started with basic HTML, now building production-ready applications.',
    achievement: 'Launched 3 projects and mentoring 10+ juniors',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    linkedIn: 'https://linkedin.com/in/placeholder',
  },
];

export function CommunityStories() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-16 space-y-4 text-center">
          <div className="tv-section-label">REAL VOICES, REAL IMPACT</div>
          <h2 className="tv-heading text-4xl sm:text-5xl lg:text-6xl">
            PEOPLE WHO BUILT WITH US
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[color:var(--tv-text-secondary)] sm:text-lg">
            Stories from community members who learned, built, and grew alongside us
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderStories.map((story, index) => (
          <Reveal key={story.name} delay={index * 50}>
            <div className="tv-card group relative flex h-full flex-col p-8 hover:scale-[1.02]">
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-[color:var(--tv-primary)]/0 to-[color:var(--tv-primary)]/0 opacity-0 transition-opacity duration-500 group-hover:from-[color:var(--tv-primary)]/5 group-hover:to-transparent group-hover:opacity-100" />

              <div className="relative flex flex-1 flex-col">
                {/* Profile Image */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {story.image ? (
                      <img
                        src={story.image}
                        alt={story.name}
                        className="h-14 w-14 rounded-full border-2 border-[color:var(--tv-primary)]/20 bg-[color:var(--tv-bg-secondary)] object-cover transition-all duration-300 group-hover:border-[color:var(--tv-primary)]/40"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[color:var(--tv-primary)]/20 bg-gradient-to-br from-[color:var(--tv-primary)]/10 to-[color:var(--tv-primary)]/5 transition-all duration-300 group-hover:border-[color:var(--tv-primary)]/40">
                        <span className="tv-heading text-xl text-[color:var(--tv-primary)]">
                          {story.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="tv-heading text-lg text-[color:var(--tv-text-primary)]">
                        {story.name}
                      </h3>
                      <p className="tv-mono text-xs text-[color:var(--tv-text-muted)]">
                        {story.role}
                      </p>
                    </div>
                  </div>
                  {story.linkedIn && (
                    <a
                      href={story.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--tv-border)] bg-[color:var(--tv-bg-secondary)]/50 transition-all duration-300 hover:border-[color:var(--tv-primary)]/30 hover:bg-[color:var(--tv-primary)]/5"
                      aria-label={`${story.name}'s LinkedIn`}
                    >
                      <svg
                        className="h-4 w-4 text-[color:var(--tv-text-secondary)] transition-colors duration-300 hover:text-[color:var(--tv-primary)]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Quote */}
                <div className="mb-6 flex-1">
                  <div className="relative">
                    <svg
                      className="absolute -left-1 -top-1 h-8 w-8 text-[color:var(--tv-primary)]/20"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z" />
                    </svg>
                    <blockquote className="pl-6 text-base leading-relaxed text-[color:var(--tv-text-primary)]">
                      {story.quote}
                    </blockquote>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="mt-auto">
                  <div className="flex items-start gap-2 rounded-lg border border-[color:var(--tv-primary)]/10 bg-[color:var(--tv-primary)]/5 p-3">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--tv-primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <p className="text-sm leading-snug text-[color:var(--tv-text-secondary)]">
                      {story.achievement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
