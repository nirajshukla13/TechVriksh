import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hackathons, communityJoinUrl } from '../../data';
import { PosterImage } from '@/components/ui/PosterImage';

// Track accent colours cycling through the TV palette
const TRACK_ACCENTS = [
  'text-[color:var(--tv-primary)] border-[color:var(--tv-primary)]/20 bg-[color:var(--tv-primary)]/5',
  'text-[color:var(--tv-cyan)] border-[color:var(--tv-cyan)]/20 bg-[color:var(--tv-cyan)]/5',
  'text-[color:var(--tv-magenta)] border-[color:var(--tv-magenta)]/20 bg-[color:var(--tv-magenta)]/5',
];

export default async function HackathonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const hackathon = hackathons.find((item) => item.slug === resolvedParams.slug);

  if (!hackathon) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">

      {/* ═══ BACK LINK ═══ */}
      <Link
        href="/hackathons"
        className="group/back tv-mono mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[color:var(--tv-text-muted)] hover:text-[color:var(--tv-primary)] transition-colors"
      >
        <span className="transition-transform duration-300 group-hover/back:-translate-x-1">←</span>
        <span>All Hackathons</span>
      </Link>

      {/* ═══ HERO CARD ═══ */}
      <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-[color:var(--tv-border)] shadow-[var(--tv-shadow-depth)]">
        {/* Cover poster — contained and anchored right; the title block overlaid
            on the left keeps the existing left-to-right gradient behind it. A
            centre crop of this portrait poster showed only 26% of it. */}
        <div className="relative w-full overflow-hidden" style={{ height: '440px' }}>
          <PosterImage
            src={hackathon.coverImage}
            alt={`${hackathon.title} poster`}
            sizes="100vw"
            align="right"
            priority
          />
          {/* Gradients. The first still backs the title on the left. The second
              was `h-4/5 from-98%` across the full width — over a cropped photo
              that was free, but it would now black out the bottom two-thirds of
              the poster. Diagonal instead: near-solid under the title in the
              bottom-left corner, clear by the time it reaches the artwork. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040907]/90 via-[#040907]/50 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#040907] via-[#040907]/40 to-transparent" />

          {/* Content over image */}
          <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10">
            {/* Top badge */}
            <div className="mb-auto flex flex-wrap gap-2 pt-3">
              <span className="tv-mono rounded-full border border-[color:var(--tv-primary)]/30 bg-black/70 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--tv-primary)] backdrop-blur-sm font-semibold">
                {hackathon.heroMetric}
              </span>
            </div>

            {/* Title block */}
            <div className="space-y-2">
              <h1 className="tv-heading text-4xl sm:text-6xl font-bold tracking-[-0.05em] text-white leading-[0.9]">
                {hackathon.title}
              </h1>
              <p className="tv-mono text-xs sm:text-sm uppercase tracking-[0.28em] text-[color:var(--tv-primary)] font-medium">
                {hackathon.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom action strip */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.85)] to-[rgba(11,23,20,0.95)] px-7 sm:px-10 py-5">
          <p className="max-w-xl text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
            {hackathon.description}
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={hackathon.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="tv-button tv-button-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[color:var(--tv-text-primary)]"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT GRID ═══ */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">

        {/* ── LEFT: Tracks ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="tv-mono text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">
              Challenge Tracks
            </div>
            <div className="h-px flex-1 bg-[color:var(--tv-border)]" />
          </div>

          <div className="space-y-3">
            {hackathon.tracks.map((track, i) => {
              const accent = TRACK_ACCENTS[i % TRACK_ACCENTS.length];
              return (
                <div
                  key={track.name}
                  className={`rounded-2xl border p-5 space-y-2 transition-all duration-200 hover:shadow-[var(--tv-shadow-md)] ${accent}`}
                >
                  <div className={`tv-mono text-xs uppercase tracking-[0.2em] font-bold ${accent.split(' ')[0]}`}>
                    {track.name}
                  </div>
                  <p className="text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
                    {track.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Notes */}
          {hackathon.notes.length > 0 && (
            <div className="rounded-xl border border-[color:var(--tv-border)] bg-white/[0.02] p-4 space-y-2">
              {hackathon.notes.map((note) => (
                <div key={note} className="flex items-start gap-2 tv-mono text-xs text-[color:var(--tv-text-muted)]">
                  <span className="text-[color:var(--tv-primary)] mt-px shrink-0">·</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── RIGHT: Sponsors + Prizes + FAQs ── */}
        <div className="space-y-6">

          {/* Sponsors */}
          <section className="rounded-2xl border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.72)] to-[rgba(11,23,20,0.88)] p-5 sm:p-6 space-y-4">
            <div className="tv-mono text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">
              Partners & Sponsors
            </div>
            <div className="flex flex-wrap gap-2">
              {hackathon.sponsors.map((s) => (
                <span
                  key={s}
                  className="tv-mono rounded-full border border-[color:var(--tv-border)] bg-white/[0.04] px-3.5 py-1.5 text-xs text-[color:var(--tv-text-secondary)] tracking-[0.1em]"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Prizes */}
          <section className="rounded-2xl border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.72)] to-[rgba(11,23,20,0.88)] p-5 sm:p-6 space-y-4">
            <div className="tv-mono text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">
              Prizes
            </div>
            <div className="space-y-2">
              {hackathon.prizes.map((prize, i) => (
                <div
                  key={prize}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
                >
                  <span className={`tv-mono text-sm font-bold shrink-0 ${
                    i === 0 ? 'text-[color:var(--tv-primary)]' :
                    i === 1 ? 'text-[color:var(--tv-cyan)]' :
                    'text-[color:var(--tv-text-muted)]'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-[color:var(--tv-text-secondary)] leading-relaxed">
                    {prize}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          {hackathon.faqs.length > 0 && (
            <section className="rounded-2xl border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.72)] to-[rgba(11,23,20,0.88)] p-5 sm:p-6 space-y-4">
              <div className="tv-mono text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">
                FAQ
              </div>
              <div className="space-y-4">
                {hackathon.faqs.map((faq) => (
                  <div key={faq.question} className="space-y-1.5">
                    <div className="tv-heading text-base font-semibold text-[color:var(--tv-text-primary)] tracking-[-0.02em]">
                      {faq.question}
                    </div>
                    <p className="text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ═══ JOIN CTA ═══ */}
      <div className="mt-16 rounded-[2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.5)] to-[rgba(11,23,20,0.7)] p-8 sm:p-12 text-center space-y-5">
        <div className="tv-mono text-xs uppercase tracking-[0.3em] text-[color:var(--tv-text-muted)]">
          Want to build?
        </div>
        <h2 className="tv-heading text-2xl sm:text-3xl tracking-[-0.04em]">
          Join the community first.
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
          Hackathon participants are almost always active Tech Vriksh members. Get in early — find your team, build ideas, and be ready when the next challenge drops.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href={communityJoinUrl}
            target="_blank"
            rel="noreferrer"
            className="tv-button tv-button-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-[color:var(--tv-text-primary)]"
          >
            Join Community
          </a>
          <a
            href={hackathon.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="tv-button inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-[color:var(--tv-text-primary)] hover:border-[color:var(--tv-primary)]/30 hover:text-[color:var(--tv-primary)]"
          >
            Register for Hackathon
          </a>
        </div>
      </div>
    </main>
  );
}
