'use client';

import { Reveal } from '@/components/reveal';

interface ValueCard {
  number: string;
  title: string;
  description: string;
}

const valueCards: ValueCard[] = [
  {
    number: '01',
    title: 'LEARN',
    description: 'Workshops, technical sessions, and practical learning experiences that build real skills.',
  },
  {
    number: '02',
    title: 'BUILD',
    description: 'Hackathons, projects, and hands-on experimentation to turn your ideas into reality.',
  },
  {
    number: '03',
    title: 'CONNECT',
    description: 'Meet fellow students, builders, and mentors who share your passion for technology.',
  },
  {
    number: '04',
    title: 'GROW',
    description: 'Discover opportunities, collaborate on projects, and help others on their journey.',
  },
];

export function ValueProposition() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-16 space-y-4 text-center">
          <div className="tv-section-label">MORE THAN A COMMUNITY</div>
          <h2 className="tv-heading text-4xl sm:text-5xl lg:text-6xl">
            What You Get
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {valueCards.map((card, index) => (
          <Reveal key={card.number} delay={index * 100}>
            <div className="tv-card group relative h-full p-8 hover:scale-[1.02]">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-[color:var(--tv-primary)]/0 to-[color:var(--tv-primary)]/0 opacity-0 transition-opacity duration-500 group-hover:from-[color:var(--tv-primary)]/5 group-hover:to-transparent group-hover:opacity-100" />

              <div className="relative space-y-4">
                {/* Number indicator */}
                <div className="tv-mono flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--tv-primary-dim)] text-sm font-bold text-[color:var(--tv-primary)]">
                  {card.number}
                </div>

                {/* Title */}
                <h3 className="tv-heading text-2xl text-[color:var(--tv-text-primary)]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
                  {card.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
