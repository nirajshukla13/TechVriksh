'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { communityGalleryPhotos, events, stateMembers } from '@/app/data';

interface HeroEventPhoto {
  id: string;
  src: string;
  alt: string;
  eventTitle: string;
  eventCategory: string;
  eventTheme: string;
  date: string;
  location: string;
  attendees: string;
}

const eventPhotos: HeroEventPhoto[] = [
  {
    id: 'ctrl-future-main',
    src: '/sample/CTRL+Future.jpeg',
    alt: 'Tech Vriksh Ctrl + Future flagship community gathering at OpsTree Global, Noida',
    eventTitle: 'CTRL + FUTURE',
    eventCategory: 'AI · BUILD · CONNECT',
    eventTheme: 'AI · COMMUNITY · BUILD',
    date: 'June 2026',
    location: 'Noida, India',
    attendees: '80+',
  },
  {
    id: 'workshop-session-1',
    src: communityGalleryPhotos[0] || '/sample/CTRL+Future.jpeg',
    alt: 'Tech Vriksh hands-on workshop session with students',
    eventTitle: 'HANDS-ON LABS',
    eventCategory: 'WORKSHOP · CODE',
    eventTheme: 'PRACTICAL · LEARN · SHIP',
    date: 'May 2025',
    location: 'Delhi NCR, India',
    attendees: '90+',
  },
  {
    id: 'workshop-session-2',
    src: communityGalleryPhotos[1] || '/sample/CTRL+Future.jpeg',
    alt: 'Tech Vriksh Techpath campus edition meetup',
    eventTitle: 'TECHPATH 1.O',
    eventCategory: 'CAMPUS · ROADMAP',
    eventTheme: 'CAREER · TECH · FUTURE',
    date: 'May 2025',
    location: 'Noida Campus',
    attendees: '100+',
  },
];

export function HeroVisual() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const activePhoto = eventPhotos[activePhotoIndex];

  const totalStates = stateMembers.length;
  const totalEvents = events.length;

  return (
    <div className="group relative flex flex-col justify-between w-full min-h-[500px] sm:min-h-[540px] lg:h-full overflow-hidden rounded-[2rem] border border-[color:var(--tv-border)] bg-[color:var(--tv-surface)] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
      {/* ── Background Photograph ── */}
      <div className="absolute inset-0">
        <Image
          src={activePhoto.src}
          alt={activePhoto.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
          className="object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Subtle top vignette for upper card contrast */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/75 via-black/30 to-transparent" />

        {/* Bottom gradient overlay tailored for text & stats legibility without hiding faces */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#040907] via-[#07110e]/80 to-transparent" />

        {/* Subtle border glow ring */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 group-hover:ring-[color:var(--tv-primary)]/30 transition-all duration-500" />
      </div>

      {/* ── Top Header / Floating Information Card ── */}
      <div className="relative z-10 flex items-start justify-end p-4 sm:p-6">
        {/* Editorial event card (top right) */}
        <div className="rounded-2xl border border-white/15 bg-black/70 p-3.5 sm:p-4 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.6)] max-w-[220px]">
          <div className="flex items-center justify-between gap-2">
            <span className="tv-mono text-[0.62rem] uppercase tracking-[0.2em] text-[color:var(--tv-primary)] font-semibold">
              {activePhoto.eventTitle}
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tv-primary)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--tv-primary)]" />
            </span>
          </div>

          <div className="tv-mono mt-1 text-[0.68rem] tracking-wider text-[color:var(--tv-text-secondary)] font-medium">
            {activePhoto.eventCategory}
          </div>

          <div className="mt-2.5 flex flex-col gap-0.5 border-t border-white/10 pt-2 text-[0.72rem] text-[color:var(--tv-text-muted)]">
            <div className="flex items-center gap-1.5 font-medium text-white/90">
              <svg className="h-3 w-3 text-[color:var(--tv-primary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{activePhoto.date}</span>
            </div>
            <div className="flex items-center gap-1.5 pl-4 text-white/70">
              <span>{activePhoto.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Content Overlay: Event Title, Supporting Stats, Thumbnails & CTA ── */}
      <div className="relative z-10 p-5 sm:p-7 space-y-4">
        {/* Event Title & Subtitle */}
        <div>
          <h2 className="tv-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-white tracking-[-0.03em] leading-tight">
            {activePhoto.eventTitle}
          </h2>
          <p className="tv-mono text-xs uppercase tracking-[0.22em] text-[color:var(--tv-primary)] mt-1 font-medium">
            {activePhoto.eventTheme}
          </p>
        </div>

        {/* Supporting stats cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          <div className="rounded-xl border border-white/10 bg-black/65 p-2.5 sm:p-3 backdrop-blur-sm transition-colors hover:border-[color:var(--tv-primary)]/40">
            <div className="tv-heading text-lg sm:text-2xl font-bold text-white tracking-tight">
              {activePhoto.attendees}
            </div>
            <div className="tv-mono mt-0.5 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--tv-text-muted)]">
              Attendees
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/65 p-2.5 sm:p-3 backdrop-blur-sm transition-colors hover:border-[color:var(--tv-primary)]/40">
            <div className="tv-heading text-lg sm:text-2xl font-bold text-[color:var(--tv-primary-light)] tracking-tight">
              {totalStates}
            </div>
            <div className="tv-mono mt-0.5 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--tv-text-muted)]">
              States
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/65 p-2.5 sm:p-3 backdrop-blur-sm transition-colors hover:border-[color:var(--tv-primary)]/40">
            <div className="tv-heading text-lg sm:text-2xl font-bold text-[color:var(--tv-cyan)] tracking-tight">
              {totalEvents}+
            </div>
            <div className="tv-mono mt-0.5 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--tv-text-muted)]">
              Events
            </div>
          </div>
        </div>

        {/* Bottom bar: Optional Photo Switchers + Explore Events link */}
        <div className="flex items-center justify-between pt-1 gap-2">
          {/* Real Photo Thumbnails */}
          {eventPhotos.length > 1 && (
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 p-1 backdrop-blur-sm">
              {eventPhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`View ${photo.eventTitle}`}
                  className={`relative h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-md border transition-all ${
                    activePhotoIndex === index
                      ? 'border-[color:var(--tv-primary)] ring-2 ring-[color:var(--tv-primary)]/50 scale-105 opacity-100'
                      : 'border-white/20 opacity-50 hover:opacity-90'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Explore Events CTA */}
          <Link
            href="/events"
            className="group/link inline-flex items-center gap-1.5 tv-mono text-xs uppercase tracking-[0.2em] text-[color:var(--tv-primary)] hover:text-white transition-colors ml-auto"
            data-cursor-hover
          >
            <span>Explore Events</span>
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
