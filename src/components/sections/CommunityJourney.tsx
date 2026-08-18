'use client';

import { Reveal } from '@/components/reveal';

// TODO: Replace these placeholder milestones with actual Tech Vriksh history
export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

const milestones: JourneyMilestone[] = [
  {
    year: '2024',
    title: 'Community Begins',
    description: 'Started with a vision to connect tech students',
  },
  {
    year: 'Early 2024',
    title: 'First Workshops',
    description: 'Launched hands-on technical sessions',
  },
  {
    year: 'Mid 2024',
    title: 'Growing Together',
    description: 'Members started collaborating on projects',
  },
  {
    year: 'Late 2024',
    title: 'Hackathons & Events',
    description: 'Organized first major hackathons',
  },
  {
    year: '2025',
    title: 'Expanding Across India',
    description: 'Reached 18 states with 1000+ members',
  },
  {
    year: '2026',
    title: "What's Next?",
    description: 'More opportunities, more builders, more impact',
  },
];

export function CommunityJourney() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-20 space-y-4 text-center">
          <div className="tv-section-label">THE JOURNEY</div>
          <h2 className="tv-heading text-4xl sm:text-5xl lg:text-6xl">
            From idea to community
          </h2>
        </div>
      </Reveal>

      <div className="relative mx-auto max-w-4xl">
        {/* Timeline vertical line with glow */}
        <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 lg:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--tv-primary)] to-transparent opacity-40" />
          <div className="absolute inset-0 blur-sm bg-gradient-to-b from-transparent via-[color:var(--tv-primary)] to-transparent opacity-20" />
        </div>

        {/* Mobile timeline line */}
        <div className="absolute left-6 top-0 h-full w-[2px] lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--tv-primary)] to-transparent opacity-40" />
        </div>

        {/* Milestones */}
        <div className="space-y-12 lg:space-y-20">
          {milestones.map((milestone, index) => {
            const isFuture = milestone.year === '2026';
            const isLeft = index % 2 === 0;

            return (
              <Reveal key={index} delay={index * 50}>
                <div
                  className={`relative flex flex-col items-start gap-6 lg:flex-row lg:items-center ${
                    isLeft ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content card - stacked on mobile, alternating on desktop */}
                  <div className="ml-16 w-full lg:ml-0 lg:w-[calc(50%-2rem)]">
                    <div
                      className={`tv-card group relative overflow-hidden p-6 transition-all duration-500 hover:scale-[1.02] sm:p-8 ${
                        isFuture ? 'border-[color:var(--tv-primary)] border-opacity-30' : ''
                      }`}
                    >
                      {/* Glow effect for future milestone */}
                      {isFuture && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--tv-primary)]/10 via-transparent to-[color:var(--tv-primary)]/5 opacity-50" />
                          <div className="absolute inset-0 blur-xl bg-[color:var(--tv-primary)]/5" />
                        </>
                      )}

                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-[color:var(--tv-primary)]/0 to-[color:var(--tv-primary)]/0 opacity-0 transition-opacity duration-500 group-hover:from-[color:var(--tv-primary)]/8 group-hover:to-transparent group-hover:opacity-100" />

                      <div className="relative space-y-3">
                        {/* Year badge */}
                        <div
                          className={`tv-mono inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-bold ${
                            isFuture
                              ? 'bg-[color:var(--tv-primary)]/20 text-[color:var(--tv-primary)] tv-glow-ring'
                              : 'bg-[color:var(--tv-primary-dim)] text-[color:var(--tv-primary)]'
                          }`}
                        >
                          {milestone.year}
                        </div>

                        {/* Title */}
                        <h3 className="tv-heading text-xl text-[color:var(--tv-text-primary)] sm:text-2xl">
                          {milestone.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline marker */}
                  <div className="absolute left-6 top-2 z-10 lg:relative lg:left-0 lg:top-0">
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      {/* Outer pulse ring for future milestone */}
                      {isFuture && (
                        <div className="absolute inset-0 animate-ping rounded-full bg-[color:var(--tv-primary)]/30 opacity-75" />
                      )}

                      {/* Glow ring */}
                      <div
                        className={`absolute inset-0 rounded-full transition-all duration-500 ${
                          isFuture
                            ? 'bg-[color:var(--tv-primary)]/20 blur-md'
                            : 'bg-[color:var(--tv-primary)]/10 blur-sm group-hover:bg-[color:var(--tv-primary)]/20'
                        }`}
                      />

                      {/* Outer circle */}
                      <div
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          isFuture
                            ? 'border-[color:var(--tv-primary)] bg-[color:var(--tv-primary)]/20'
                            : 'border-[color:var(--tv-primary)]/40 bg-[color:var(--tv-surface)] group-hover:border-[color:var(--tv-primary)]'
                        }`}
                      >
                        {/* Inner dot */}
                        <div
                          className={`h-3 w-3 rounded-full transition-all duration-500 ${
                            isFuture
                              ? 'bg-[color:var(--tv-primary)] shadow-[0_0_12px_rgba(57,217,138,0.6)]'
                              : 'bg-[color:var(--tv-primary)]/60 group-hover:bg-[color:var(--tv-primary)] group-hover:shadow-[0_0_8px_rgba(57,217,138,0.4)]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden w-[calc(50%-2rem)] lg:block" />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom fade effect on timeline */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent to-[color:var(--tv-bg)] lg:block hidden" />
      </div>
    </section>
  );
}
