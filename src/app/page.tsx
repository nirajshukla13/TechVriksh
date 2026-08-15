import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { Counter } from '@/components/counter';
import { DriveVideoEmbed } from '@/components/drive-video-embed';
import { IndiaMapLoader } from '@/components/india-map-loader';
import { PremiumCard, CardImage, CardBadge } from '@/components/ui/PremiumCard';
import { HeroVisual } from '@/components/ui/HeroVisual';
import { communityGalleryPhotos, events, stateMembers, communityJoinUrl } from './data';

export default function HomePage() {
  // Featured events
  const featuredEventSlugs = ['ctrl-future', 'snap-the-lens', 'techpath-1o-discover-decide-dominate'];
  const featuredEvents = featuredEventSlugs
    .map((slug) => events.find((event) => event.slug === slug))
    .filter((event): event is NonNullable<typeof event> => Boolean(event));

  // Calculate stats
  const totalMembers = stateMembers.reduce((sum, entry) => sum + entry.count, 0);
  const totalStates = stateMembers.length;
  const totalEvents = events.length;

  return (
    <main className="relative">
      {/* ═══════════════════════════════════════════
          01 — HERO
      ═══════════════════════════════════════════ */}
      <section className="mx-auto min-h-screen flex items-center w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
          <div className="tv-hero-in space-y-8">
            <div className="space-y-4">
              <div className="tv-mono text-xs uppercase tracking-[0.36em] text-[color:var(--tv-primary)]">
                Tech Vriksh
              </div>
              <h1 className="tv-heading text-[3.5rem] leading-[0.88] tracking-[-0.06em] text-[color:var(--tv-text-primary)] sm:text-[5rem] lg:text-[6rem]">
                BUILD.<br />
                LEARN.<br />
                <span className="tv-glow">GROW.</span>
              </h1>
            </div>

            <p className="max-w-lg text-lg leading-relaxed text-[color:var(--tv-text-secondary)]">
              A student-driven technology community connecting people, ideas and opportunities.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={communityJoinUrl}
                target="_blank"
                rel="noreferrer"
                className="tv-button tv-button-primary rounded-full px-7 py-4 text-sm font-medium text-[color:var(--tv-text-primary)]"
                data-cursor-hover
              >
                Join Community
              </a>
              <Link
                href="/events"
                className="tv-button rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-medium text-[color:var(--tv-text-primary)] hover:border-[color:var(--tv-primary)]/30 hover:text-[color:var(--tv-primary)]"
                data-cursor-hover
              >
                Explore Events
              </Link>
            </div>
          </div>

          {/* Hero visual with interactive stats */}
          <div className="relative hidden lg:block">
            <div className="aspect-square w-full rounded-[2rem] border border-[color:var(--tv-border)] bg-gradient-to-br from-[color:var(--tv-primary)]/[0.08] to-transparent p-1 shadow-[0_0_40px_rgba(57,217,138,0.08)]">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          02 — COMMUNITY STATS
      ═══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <div className="tv-section-label">01 — Community</div>
            <h2 className="tv-heading mt-4 text-4xl tracking-[-0.05em] sm:text-5xl">
              People.<br />
              Ideas.<br />
              Opportunities.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="group">
              <div className="tv-heading text-6xl tracking-[-0.06em] text-[color:var(--tv-text-primary)] transition-all duration-500 group-hover:tv-glow sm:text-7xl">
                <Counter target={totalMembers} suffix="+" />
              </div>
              <div className="tv-mono mt-3 text-sm uppercase tracking-[0.28em] text-[color:var(--tv-text-secondary)]">
                Members
              </div>
            </div>

            <div className="group">
              <div className="tv-heading text-6xl tracking-[-0.06em] text-[color:var(--tv-text-primary)] transition-all duration-500 group-hover:tv-glow sm:text-7xl">
                <Counter target={totalStates} />
              </div>
              <div className="tv-mono mt-3 text-sm uppercase tracking-[0.28em] text-[color:var(--tv-text-secondary)]">
                States
              </div>
            </div>

            <div className="group">
              <div className="tv-heading text-6xl tracking-[-0.06em] text-[color:var(--tv-text-primary)] transition-all duration-500 group-hover:tv-glow sm:text-7xl">
                <Counter target={totalEvents} suffix="+" />
              </div>
              <div className="tv-mono mt-3 text-sm uppercase tracking-[0.28em] text-[color:var(--tv-text-secondary)]">
                Events
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          03 — RECENT HIGHLIGHTS
      ═══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8">
            <div className="tv-section-label">02 — Highlights</div>
            <h2 className="tv-heading mt-4 text-4xl tracking-[-0.05em] sm:text-5xl">
              What our sessions<br />actually look like
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--tv-text-secondary)]">
              Real photos from live workshops and meetups — the people, the rooms, the work in progress.
            </p>
          </div>

          {/* Editorial grid layout */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Large featured image */}
            {communityGalleryPhotos[0] && (
              <Reveal className="md:row-span-2">
                <div className="group relative h-full overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.02]">
                  <Image
                    src={communityGalleryPhotos[0]}
                    alt="Tech Vriksh community session"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Reveal>
            )}

            {/* Two smaller images */}
            {communityGalleryPhotos.slice(1, 3).map((src, index) => (
              <Reveal key={src} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.02]">
                  <Image
                    src={src}
                    alt="Tech Vriksh community session"
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          04 — FEATURED EVENTS
      ═══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="tv-section-label">03 — Events</div>
              <h2 className="tv-heading mt-4 text-4xl tracking-[-0.05em] sm:text-5xl">
                What's happening
              </h2>
            </div>
            <Link
              href="/events"
              className="tv-mono text-xs uppercase tracking-[0.24em] text-[color:var(--tv-primary)] hover:opacity-80"
              data-cursor-hover
            >
              View all events →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event, index) => (
              <Reveal key={event.slug} delay={index * 100}>
                <PremiumCard>
                  <CardImage
                    src={event.image}
                    alt={event.title}
                    aspect="4/3"
                    badges={
                      <>
                        <CardBadge accent="primary">{event.subtitle}</CardBadge>
                        <CardBadge>{event.dateLabel}</CardBadge>
                      </>
                    }
                  />
                  <div className="flex flex-col gap-4 p-6">
                    <div>
                      <h3 className="tv-heading text-2xl tracking-[-0.03em] text-[color:var(--tv-text-primary)]">
                        {event.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--tv-text-secondary)]">
                        {event.description}
                      </p>
                    </div>
                    {event.venue && (
                      <div className="tv-mono text-xs uppercase tracking-[0.24em] text-[color:var(--tv-text-muted)]">
                        {event.venue}
                      </div>
                    )}
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[color:var(--tv-primary)] transition-all hover:gap-3"
                      data-cursor-hover
                    >
                      View event <span className="transition-transform">→</span>
                    </a>
                  </div>
                </PremiumCard>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          05 — 2025 RECAP
      ═══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <div className="tv-section-label">04 — Recap</div>
            <h2 className="tv-heading mt-4 text-4xl tracking-[-0.05em] sm:text-5xl">
              2025 RECAP
            </h2>
            <p className="mt-4 text-base leading-7 text-[color:var(--tv-text-secondary)]">
              A year of Tech Vriksh, in one video.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[color:var(--tv-primary)]/[0.04] to-transparent p-4 shadow-[0_24px_64px_rgba(0,0,0,0.4)] transition-shadow duration-500 hover:shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <DriveVideoEmbed
              url="https://drive.google.com/file/d/1JWtB2j04oCn8ErjhcTMcHRrq2mwOA6-A/view?usp=drive_link"
              title="Tech Vriksh 2025 year-in-review video"
            />
          </div>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          06 — INDIA COMMUNITY MAP
      ═══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="max-w-md">
              <div className="tv-section-label">05 — India</div>
              <h2 className="tv-heading mt-4 text-4xl tracking-[-0.05em] sm:text-5xl">
                Our community<br />across India
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--tv-text-secondary)]">
                {stateMembers.length} states and counting — hover a marker to see the count for that state.
              </p>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[2.4rem] bg-[radial-gradient(circle_at_50%_50%,rgba(57,217,138,0.08),transparent_60%)] blur-2xl" />
              <IndiaMapLoader data={stateMembers} />
            </div>
          </div>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          07 — FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[color:var(--tv-primary)]/[0.06] to-transparent p-12 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,217,138,0.12),transparent_70%)]" />
            
            <div className="relative">
              <div className="tv-section-label">06 — Join</div>
              <h2 className="tv-heading mt-6 text-4xl tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Ready to build<br />something together?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--tv-text-secondary)]">
                Tech Vriksh brings together people who want to learn, build and grow.
              </p>
              
              <div className="mt-10">
                <a
                  href={communityJoinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="tv-button tv-button-primary inline-flex rounded-full px-8 py-5 text-base font-medium text-[color:var(--tv-text-primary)]"
                  data-cursor-hover
                >
                  Join Tech Vriksh
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
