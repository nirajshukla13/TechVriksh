import Link from 'next/link';
import { hackathons } from '@/app/data';
import { PosterImage } from '@/components/ui/PosterImage';

export default function HackathonsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-12 space-y-3">
        <div className="tv-mono text-xs uppercase tracking-[0.36em] text-[color:var(--tv-primary)]">
          Tech Vriksh · Hackathons
        </div>
        <h1 className="tv-heading text-4xl sm:text-5xl tracking-[-0.05em]">
          Flagship builds &amp; prep series
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-[color:var(--tv-text-secondary)]">
          HackVriksh is the main event — built around real problems, mentor support, and hands-on shipping. The pre-hackathon series helps teams prepare.
        </p>
      </div>

      {/* Hackathon cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {hackathons.map((hackathon) => (
          <article
            key={hackathon.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.72)] to-[rgba(11,23,20,0.88)] shadow-[var(--tv-shadow-md)] transition-all duration-300 hover:border-[color:var(--tv-border-strong)] hover:shadow-[var(--tv-shadow-depth)] hover:-translate-y-0.5"
          >
            {/* Cover poster — contained and anchored right, so the whole artwork
                shows and the badge on the left sits on the colour wash rather
                than on top of it. Cropping this 0.707 poster to a 2.13 banner
                left only a third of it visible. */}
            <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>
              <PosterImage
                src={hackathon.coverImage}
                alt={`${hackathon.title} poster`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                align="right"
              />
              {/* Scrim, kept short. The badge below carries its own `bg-black/70`
                  and sits on the blurred wash to the left of the right-anchored
                  poster, so it needs far less help than when this was a photo
                  crop — and `h-1/2` would have dimmed the poster's bottom third,
                  where the date sits. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#040907]/75 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="tv-mono rounded-full border border-[color:var(--tv-primary)]/30 bg-black/70 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-[color:var(--tv-primary)] backdrop-blur-sm font-semibold">
                  {hackathon.heroMetric}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
              <div>
                <h2 className="tv-heading text-2xl font-semibold tracking-[-0.04em] text-[color:var(--tv-text-primary)]">
                  {hackathon.title}
                </h2>
                <p className="tv-mono mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--tv-text-muted)]">
                  {hackathon.tagline}
                </p>
              </div>

              <p className="flex-1 text-sm leading-relaxed text-[color:var(--tv-text-secondary)] line-clamp-3">
                {hackathon.description}
              </p>

              {/* Tracks preview */}
              <div className="flex flex-wrap gap-1.5">
                {hackathon.tracks.slice(0, 3).map((track) => (
                  <span
                    key={track.name}
                    className="tv-mono rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.15em] text-[color:var(--tv-text-muted)]"
                  >
                    {track.name.split(':')[0]}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
                <a
                  href={hackathon.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="tv-mono text-xs uppercase tracking-[0.2em] text-[color:var(--tv-text-muted)] hover:text-[color:var(--tv-text-secondary)] transition-colors"
                >
                  Register ↗
                </a>
                <Link
                  href={`/hackathons/${hackathon.slug}`}
                  className="group/link tv-button tv-button-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-[color:var(--tv-text-primary)]"
                >
                  <span>View Details</span>
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
