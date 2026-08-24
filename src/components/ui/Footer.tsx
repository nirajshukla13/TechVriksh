import Image from 'next/image';
import Link from 'next/link';
import {
  communityInstagramUrl,
  communityJoinUrl,
  communityLinkedInUrl,
  partnershipEmail,
  teamHiringFormUrl,
  techVrikshLogoUrl
} from '@/app/data';

const linkedInIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
  </svg>
);

const instagramIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const mailIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/join', label: 'Join' },
  { href: '/partner', label: 'Partner' }
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(57,217,138,0.55)]';

const linkClass =
  `group/link inline-flex items-center rounded-sm text-sm text-[color:var(--tv-text-secondary)] transition-colors duration-200 hover:text-[color:var(--tv-primary)] ${focusRing}`;

const columnHeadingClass =
  'tv-mono text-xs uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]';

const socialClass =
  `flex h-8.5 w-8.5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[color:var(--tv-text-secondary)] transition-all duration-300 hover:border-[rgba(57,217,138,0.5)] hover:bg-[rgba(57,217,138,0.06)] hover:text-[color:var(--tv-primary)] ${focusRing}`;

const externalMark = (
  <>
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block h-3 w-3 ml-1 opacity-50 transition-opacity duration-200 group-hover/link:opacity-100 shrink-0"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
    <span className="sr-only"> (opens in a new tab)</span>
  </>
);

export function Footer() {
  return (
    <footer className="relative z-[1] mt-8 border-t border-[rgba(57,217,138,0.18)] bg-gradient-to-b from-[#07110f] to-[#040a08]">
      {/* Hairline glow along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(57,217,138,0.45)] to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-9 pb-10 pt-12 sm:grid-cols-2 lg:grid-cols-12">

          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className={`group inline-flex items-center gap-3.5 rounded-lg ${focusRing}`}
            >
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[rgba(57,217,138,0.35)] bg-white/5 shadow-[0_0_16px_rgba(57,217,138,0.2)] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={techVrikshLogoUrl}
                  alt="Tech Vriksh logo"
                  width={72}
                  height={72}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="tv-heading text-lg font-bold leading-none tracking-[0.2em] text-[color:var(--tv-text-primary)] transition-colors group-hover:text-[color:var(--tv-primary)]">
                  TECH VRIKSH
                </h3>
                <p className="tv-mono mt-1 text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">
                  Real. Relevant. Rooted.
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[color:var(--tv-text-secondary)]">
              A student-driven technology community connecting people, ideas and
              opportunities across India — practical workshops, hackathons and
              honest exposure to how the industry actually works.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={communityLinkedInUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Tech Vriksh on LinkedIn (opens in a new tab)"
                className={socialClass}
              >
                {linkedInIcon}
              </a>
              <a
                href={communityInstagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Tech Vriksh on Instagram (opens in a new tab)"
                className={socialClass}
              >
                {instagramIcon}
              </a>
              {partnershipEmail && (
                <a
                  href={`mailto:${partnershipEmail}`}
                  aria-label={`Email Tech Vriksh at ${partnershipEmail}`}
                  className={socialClass}
                >
                  {mailIcon}
                </a>
              )}
            </div>
          </div>

          {/* ── Navigate ── */}
          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h4 className={columnHeadingClass}>Navigate</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Get involved ── */}
          <div className="lg:col-span-2">
            <h4 className={columnHeadingClass}>Get Involved</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={communityJoinUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  Community sign-up
                  {externalMark}
                </a>
              </li>
              <li>
                <a href={teamHiringFormUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  Apply for a role
                  {externalMark}
                </a>
              </li>
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h4 className={columnHeadingClass}>Contact</h4>
            <address className="not-italic">
              <ul className="mt-4 space-y-2.5">
                {partnershipEmail && (
                  <li>
                    <a href={`mailto:${partnershipEmail}`} className={`${linkClass} break-words`}>
                      {partnershipEmail}
                    </a>
                  </li>
                )}
                <li>
                  <a href={communityLinkedInUrl} target="_blank" rel="noreferrer" className={linkClass}>
                    LinkedIn
                    {externalMark}
                  </a>
                </li>
                <li>
                  <a href={communityInstagramUrl} target="_blank" rel="noreferrer" className={linkClass}>
                    Instagram
                    {externalMark}
                  </a>
                </li>
              </ul>
            </address>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-[color:var(--tv-text-tertiary)]">
              Partnership and speaking enquiries reach the founder directly.
            </p>
          </div>
        </div>

        <div className="tv-divider h-px" aria-hidden="true" />

        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="text-xs leading-relaxed text-[color:var(--tv-text-muted)]">
            <span className="tv-mono">© {new Date().getFullYear()} Tech Vriksh</span>
            <span aria-hidden="true" className="mx-2 text-[color:var(--tv-text-tertiary)]">
              ·
            </span>
            All events are free and open to engineering students across India.
          </p>
          <p className="tv-mono shrink-0 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--tv-text-tertiary)]">
            Built by students, for students.
          </p>
        </div>
      </div>
    </footer>
  );
}
