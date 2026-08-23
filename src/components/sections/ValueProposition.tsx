'use client';

import { Reveal } from '@/components/reveal';

interface ValueCard {
  number: string;
  title: string;
  headline: string;
  description: string;
  accent: string;
}

const valueCards: ValueCard[] = [
  {
    number: '01',
    title: 'LEARN',
    headline: 'Exposure before the job listing',
    description:
      'Workshops, live sessions, and speaker talks on topics that are actually relevant — before they become requirements.',
    accent: 'primary',
  },
  {
    number: '02',
    title: 'BUILD',
    headline: 'Ideas you can actually ship',
    description:
      'Hackathons, community challenges, hands-on projects. Not presentations about building — actual building.',
    accent: 'cyan',
  },
  {
    number: '03',
    title: 'CONNECT',
    headline: 'Find people making the same mistakes',
    description:
      'Students, mentors, people already in the industry. The kind of network that forms when people are working on real things together.',
    accent: 'primary',
  },
  {
    number: '04',
    title: 'GROW',
    headline: 'Then help others get here',
    description:
      'Collaborate, discover what is next for you, and eventually become the person who helps someone else figure it out.',
    accent: 'cyan',
  },
];

export function ValueProposition() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <Reveal>
        {/* Section header */}
        <div className="mb-10 sm:mb-12">
          <div className="tv-section-label">WHY JOIN</div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="tv-heading text-4xl tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              What you get
              <br />
              <span className="tv-glow text-[color:var(--tv-primary)]">here.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
              Not promises. Specific, honest answers about what being part of Tech Vriksh actually means.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Cards grid with connector thread on desktop */}
      <div className="relative">
        {/* Desktop connector line through card centres */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[5.5rem] hidden h-[1px] lg:block"
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-[color:var(--tv-border-strong)] to-transparent" />
          {/* Glowing pulse on the line */}
          <div className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-[color:var(--tv-primary)]/20 to-transparent" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueCards.map((card, index) => (
            <Reveal key={card.number} delay={index * 80}>
              <div className="value-prop-card group relative flex h-full flex-col rounded-[1.5rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[color:var(--tv-surface)] to-[color:var(--tv-bg-secondary)] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[color:var(--tv-primary)]/30 hover:shadow-[0_24px_56px_rgba(0,0,0,0.5),0_0_24px_rgba(57,217,138,0.08)]">
                {/* Number indicator — sits on the connector line on desktop */}
                <div className="relative z-10 mb-6">
                  <div
                    className={`tv-mono flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-500 ${
                      card.accent === 'primary'
                        ? 'border-[color:var(--tv-primary)]/30 bg-[color:var(--tv-primary)]/10 text-[color:var(--tv-primary)] group-hover:border-[color:var(--tv-primary)]/60 group-hover:bg-[color:var(--tv-primary)]/20 group-hover:shadow-[0_0_16px_rgba(57,217,138,0.25)]'
                        : 'border-[color:var(--tv-cyan)]/30 bg-[color:var(--tv-cyan)]/10 text-[color:var(--tv-cyan)] group-hover:border-[color:var(--tv-cyan)]/60 group-hover:bg-[color:var(--tv-cyan)]/20 group-hover:shadow-[0_0_16px_rgba(107,239,215,0.25)]'
                    }`}
                  >
                    {card.number}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`tv-heading text-2xl tracking-[-0.02em] transition-colors duration-300 ${
                    card.accent === 'primary'
                      ? 'group-hover:text-[color:var(--tv-primary)]'
                      : 'group-hover:text-[color:var(--tv-cyan)]'
                  }`}
                >
                  {card.title}
                </h3>

                {/* Headline — the specific hook */}
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-[color:var(--tv-text-muted)]">
                  {card.headline}
                </p>

                {/* Divider */}
                <div className="my-5 h-[1px] w-full bg-gradient-to-r from-[color:var(--tv-border)] to-transparent" />

                {/* Description */}
                <p className="flex-1 text-sm leading-[1.8] text-[color:var(--tv-text-secondary)]">
                  {card.description}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className={`absolute bottom-0 left-6 right-6 h-[2px] origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100 ${
                    card.accent === 'primary'
                      ? 'bg-gradient-to-r from-[color:var(--tv-primary)]/60 to-transparent'
                      : 'bg-gradient-to-r from-[color:var(--tv-cyan)]/60 to-transparent'
                  }`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
