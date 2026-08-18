'use client';

import { Reveal } from '@/components/reveal';

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  isFuture?: boolean;
}

// Concise, high-impact milestones
const milestones: JourneyMilestone[] = [
  {
    year: 'Early 2025',
    title: 'First Workshops',
    description: 'Practical online sessions on Gen AI, Web Dev & career skills.',
  },
  {
    year: 'May 2025',
    title: 'Techpath 1.O',
    description: 'First offline campus session connecting skills to career paths.',
  },
  {
    year: 'Oct 2025',
    title: 'HackVriksh',
    description: 'Flagship hackathon with mentor feedback and hands-on building.',
  },
  {
    year: 'Jun 2026',
    title: 'Ctrl + Future',
    description: '80+ builders offline at OpsTree Global covering AI & cybersecurity.',
  },
  {
    year: "What's Next",
    title: 'Expanding Across India',
    description: 'More offline events, new chapters, and continuous builder support.',
    isFuture: true,
  },
];

// ─── Journey column — used as the right side of the two-column layout ─────────
export function JourneyColumn() {
  return (
    <div className="w-full">
      <Reveal>
        <div className="mb-8 space-y-2">
          <div className="tv-section-label">THE JOURNEY</div>
          <h2 className="tv-heading text-3xl sm:text-4xl lg:text-5xl">
            From idea to community.
          </h2>
        </div>
      </Reveal>

      {/* Clean, compact linear timeline */}
      <div className="relative pl-6 sm:pl-8">
        {/* Continuous timeline line */}
        <div
          className="absolute bottom-4 left-2.5 top-3 w-[2px] bg-gradient-to-b from-[color:var(--tv-primary)] via-[color:var(--tv-primary)]/40 to-transparent sm:left-3"
          aria-hidden="true"
        />

        <div className="space-y-6 sm:space-y-8">
          {milestones.map((milestone, index) => {
            const isFuture = !!milestone.isFuture;

            return (
              <Reveal key={index} delay={index * 60}>
                <div className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="absolute -left-[1.38rem] top-1.5 flex h-6 w-6 items-center justify-center sm:-left-[1.62rem]">
                    {isFuture && (
                      <span className="absolute h-full w-full animate-ping rounded-full bg-[color:var(--tv-primary)]/30" />
                    )}
                    <span
                      className={`h-3 w-3 rounded-full border-2 transition-colors ${
                        isFuture
                          ? 'border-[color:var(--tv-primary)] bg-[color:var(--tv-primary)] shadow-[0_0_8px_rgba(57,217,138,0.8)]'
                          : 'border-[color:var(--tv-primary)] bg-[color:var(--tv-surface)]'
                      }`}
                    />
                  </div>

                  {/* Milestone card */}
                  <div
                    className={`tv-card group w-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--tv-primary)]/40 sm:p-6 ${
                      isFuture
                        ? 'border-[color:var(--tv-primary)]/30 bg-gradient-to-br from-[color:var(--tv-primary)]/[0.06] to-transparent'
                        : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="tv-heading text-lg text-[color:var(--tv-text-primary)] sm:text-xl">
                        {milestone.title}
                      </h3>
                      <span
                        className={`tv-mono inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${
                          isFuture
                            ? 'bg-[color:var(--tv-primary)]/20 text-[color:var(--tv-primary)]'
                            : 'bg-[color:var(--tv-primary-dim)] text-[color:var(--tv-primary)]'
                        }`}
                      >
                        {milestone.year}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Legacy full section wrapper ──────────────────
export function CommunityJourney() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JourneyColumn />
    </section>
  );
}
