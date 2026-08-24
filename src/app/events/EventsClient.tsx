'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PosterImage } from '@/components/ui/PosterImage';
import type { EventItem, EventKind, EventFormat } from '@/app/data';

// ─── Kind metadata ────────────────────────────────────────────────────────────
const kindMeta: Record<EventKind, { label: string; color: string }> = {
  session: { label: 'Session', color: 'text-[color:var(--tv-cyan)]' },
  workshop: { label: 'Workshop', color: 'text-[color:var(--tv-magenta)]' },
  hackathon: { label: 'Hackathon', color: 'text-[color:var(--tv-primary)]' },
};

const formatMeta: Record<EventFormat, { label: string }> = {
  offline: { label: 'Offline' },
  online: { label: 'Online' },
};

// ─── Filter config ────────────────────────────────────────────────────────────
type FilterKey = 'all' | 'offline' | 'online' | 'workshop' | 'hackathon';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Events' },
  { key: 'offline', label: 'Offline' },
  { key: 'online', label: 'Online' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'hackathon', label: 'Hackathons' },
];

/** Which events a given tab would show. One definition, used both to render the
 *  grid and to decide whether a tab is worth showing at all. */
function matchesFilter(event: EventItem, key: FilterKey) {
  if (key === 'all') return true;
  if (key === 'offline') return event.format === 'offline';
  if (key === 'online') return event.format === 'online';
  return event.kind === key;
}

// ─── Single event card ────────────────────────────────────────────────────────
function EventCard({ event, index }: { event: EventItem; index: number }) {
  const km = kindMeta[event.kind];
  // Absent on events whose record does not state a format — no pill rather than
  // a guessed one.
  const fm = event.format ? formatMeta[event.format] : null;
  const isUpcoming = event.status === 'upcoming';

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.72)] to-[rgba(11,23,20,0.88)] shadow-[var(--tv-shadow-md)] transition-all duration-300 hover:border-[color:var(--tv-border-strong)] hover:shadow-[var(--tv-shadow-depth)] hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Poster. A fixed 220px-tall box against a ~392px-wide card is a 1.78
          landscape frame; these covers run 0.62–0.86 portrait, so cropping to
          fill it showed barely a third of each poster. Portrait box, contained
          artwork — the whole poster, every time. */}
      <div className="relative w-full overflow-hidden aspect-[4/5]">
        <PosterImage
          src={event.image}
          alt={`${event.title} event poster`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 300px"
        />
        {/* Scrim for the pills only. This was `h-1/2`, which was fine over a
            cropped photo but darkens the lower half of a whole poster — where the
            date and venue are printed. Just tall enough to seat the pills. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#040907]/90 to-transparent" />

        {/* Kind pill — overlaid bottom-left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span
            className={`tv-mono rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] backdrop-blur-sm font-semibold ${km.color}`}
          >
            {km.label}
          </span>
          {fm && (
            <span className="tv-mono rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-[color:var(--tv-text-muted)] backdrop-blur-sm">
              {fm.label}
            </span>
          )}
        </div>

        {/* Status indicator */}
        {isUpcoming && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-[color:var(--tv-primary)]/30 bg-black/70 px-2.5 py-1 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tv-primary)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--tv-primary)]" />
            </span>
            <span className="tv-mono text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--tv-primary)] font-semibold">
              Upcoming
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {/* Date + venue row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1.5 tv-mono text-[0.68rem] text-[color:var(--tv-primary)] font-medium">
            <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{event.dateLabel}</span>
          </div>
          {event.venue && (
            <div className="flex items-center gap-1.5 tv-mono text-[0.68rem] text-[color:var(--tv-text-muted)]">
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate max-w-[160px]">{event.venue}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="tv-heading text-lg sm:text-xl font-semibold leading-tight tracking-[-0.03em] text-[color:var(--tv-text-primary)]">
          {event.title}
        </h3>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-[color:var(--tv-text-secondary)] line-clamp-2">
          {event.description}
        </p>

        {/* CTA. "View Recap" is an internal route — it used to point at
            `registrationUrl` in a new tab, which is why it led nowhere. */}
        <div className="mt-auto pt-2 border-t border-white/[0.06]">
          {isUpcoming ? (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1.5 tv-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors text-[color:var(--tv-primary)] hover:text-white"
            >
              <span>Register</span>
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </a>
          ) : (
            <Link
              href={`/events/${event.slug}`}
              className="group/link inline-flex items-center gap-1.5 tv-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors text-[color:var(--tv-text-muted)] hover:text-[color:var(--tv-text-secondary)]"
            >
              <span>View Recap</span>
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Main client grid component ───────────────────────────────────────────────
export function EventsClient({ nonFeaturedEvents }: { nonFeaturedEvents: EventItem[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Hide a tab that no current event matches — with the two hackathon cards
  // commented out of `data.ts`, "Hackathons" would otherwise be an empty tab.
  // Re-adding those entries brings the tab back on its own.
  const visibleFilters = useMemo(
    () =>
      filters.filter(
        (f) => f.key === 'all' || nonFeaturedEvents.some((e) => matchesFilter(e, f.key))
      ),
    [nonFeaturedEvents]
  );

  const filtered = useMemo(
    () => nonFeaturedEvents.filter((e) => matchesFilter(e, activeFilter)),
    [activeFilter, nonFeaturedEvents]
  );

  return (
    <div className="space-y-8">
      {/* ── Filter tabs ── */}
      <div className="flex flex-wrap items-center gap-2">
        {visibleFilters.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`tv-mono rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 ${
                isActive
                  ? 'border-[color:var(--tv-primary)]/50 bg-[color:var(--tv-primary)]/10 text-[color:var(--tv-primary)]'
                  : 'border-[color:var(--tv-border)] bg-white/[0.03] text-[color:var(--tv-text-secondary)] hover:border-[color:var(--tv-border-strong)] hover:text-[color:var(--tv-text-primary)]'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* ── Event grid ── */}
      {/* One flat list. Events are not split by year or by status: an undated
          entry would otherwise need a heading of its own, which singles it out
          instead of letting it sit among the rest. The filter tabs are the only
          way the list is ever divided — picking "Hackathons" narrows it to the
          hackathon entries. */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[color:var(--tv-border)] bg-white/[0.02] p-10 text-center">
          <p className="tv-mono text-sm text-[color:var(--tv-text-muted)]">No events match this filter.</p>
        </div>
      ) : (
        // Portrait poster tiles are taller than the old 220px crop, so the grid
        // gains a fourth column at xl — narrower tiles, shorter rows.
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((event, i) => (
            <EventCard key={event.slug} event={event} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
