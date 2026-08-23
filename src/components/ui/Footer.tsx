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
    <path d="M19.54 3H4.46C3.65 3 3 3.62 3 4.39v15.22C3 20.38 3.65 21 4.46 21h15.08c.81 0 1.46-.62 1.46-1.39V4.39C21 3.62 20.35 3 19.54 3ZM8.38 18.06H5.7V9.27h2.68v8.79ZM7.04 8.08a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.02 9.98h-2.67v-4.27c0-1.02-.02-2.34-1.43-2.34-1.44 0-1.66 1.12-1.66 2.27v4.34h-2.68V9.27h2.57v1.2h.04c.36-.67 1.24-1.38 2.55-1.38 2.73 0 3.23 1.8 3.23 4.14v4.85Z" />
  </svg>
);

const instagramIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.65.51.71.28 1.31.65 1.91 1.25.6.6.97 1.2 1.25 1.91.27.69.46 1.48.51 2.65.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.51 2.65-.28.71-.65 1.31-1.25 1.91-.6.6-1.2.97-1.91 1.25-.69.27-1.48.46-2.65.51-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.65-.51a5.15 5.15 0 0 1-1.91-1.25 5.15 5.15 0 0 1-1.25-1.91c-.27-.69-.46-1.48-.51-2.65C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.96.51-2.65.28-.71.65-1.31 1.25-1.91.6-.6 1.2-.97 1.91-1.25.69-.27 1.48-.46 2.65-.51C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.14 0-3.5.01-4.74.07-.95.04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.91-.34 1.86-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.95.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.91.3 1.86.34 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.95-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.91.34-1.86.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.95-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.91-.3-1.86-.34-1.24-.06-1.6-.07-4.74-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.82Zm5.72-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
  </svg>
);

const mailIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 4.76-8-4.76V6l8 4.75L20 6v2.24Z" />
  </svg>
);

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/join', label: 'Join' },
  { href: '/partner', label: 'Partner' }
];

/* `globals.css` defines no `:focus-visible` style, so before this every footer
   link fell back to the browser's default outline — a thin dark ring that is
   effectively invisible on `--tv-bg`. Keyboard focus now lands as a green ring.
   Deliberately carries no `rounded-*` of its own: the social buttons are
   `rounded-full` and the text links want a tight corner, so each caller sets its
   own radius rather than having one silently overridden by stylesheet order. */
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(57,217,138,0.55)]';

const linkClass =
  `rounded-sm text-sm text-[color:var(--tv-text-secondary)] transition-colors duration-200 hover:text-[color:var(--tv-primary)] ${focusRing}`;

const columnHeadingClass =
  'tv-mono text-xs uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]';

const socialClass =
  `flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[color:var(--tv-text-secondary)] transition-all duration-300 hover:border-[rgba(57,217,138,0.5)] hover:bg-[rgba(57,217,138,0.06)] hover:text-[color:var(--tv-primary)] ${focusRing}`;

/* The `↗` is the site's own external-link mark — the header's Join CTA uses the
   same glyph, so it stays for consistency. Two fixes: it inherits `currentColor`
   at 60% so it follows the link's hover colour instead of being a second,
   competing green, and it is `aria-hidden` because a screen reader was
   announcing "north east arrow" on every external link. The real information it
   was standing in for is now given to assistive tech as actual words. */
const externalMark = (
  <>
    <span aria-hidden="true" className="ml-1 text-[0.72em] opacity-60">
      ↗
    </span>
    <span className="sr-only"> (opens in a new tab)</span>
  </>
);

export function Footer() {
  return (
    /* The footer renders outside `.tv-content-layer`, so it sits directly over
       the fixed 3D canvas. Its background used to be `from-transparent`, which
       let the dust motes and light gates animate straight through behind this
       text — the background is opaque top-to-bottom now, and `z-[1]` lifts it
       above the canvas layer explicitly rather than relying on DOM order. */
    <footer className="relative z-[1] mt-8 border-t border-[rgba(57,217,138,0.18)] bg-gradient-to-b from-[#07110f] to-[#040a08]">
      {/* Hairline glow along the top edge, so the seam reads as deliberate */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(57,217,138,0.45)] to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ═══════════════════════════════════════════
            BRAND + LINK COLUMNS
            Every destination a visitor might want is a plain link in one of the
            three columns — there are deliberately no promo cards or figures up
            here, because the pages themselves already make those cases in full.

            Twelve tracks rather than five, because the four blocks do not want
            equal widths: the old 5-column grid gave Contact a 211px cell and
            forced `break-all` to chop the email address mid-word, while the two
            short link lists got the same 211px they had no use for. At 4/2/2/4
            the brand paragraph lands on exactly its `max-w-sm`, the two link
            lists get the ~176px their longest label needs, and the email fits
            on one line. Contact spans the full width at `sm` so the second row
            has no empty cell beside it.

            Padding is `pt-12 pb-10` (was `pt-16 pb-12`) with `gap-y-9` and a
            `py-5` bottom strip — roughly 50px off the total height, without
            dropping a single link or line of copy. The footer is the last thing
            on every page, so it should close the page rather than become
            another section of it.
        ═══════════════════════════════════════════ */}
        <div className="grid gap-x-8 gap-y-9 pb-10 pt-12 sm:grid-cols-2 lg:grid-cols-12">

          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className={`group inline-flex items-center gap-3.5 rounded-lg ${focusRing}`}
            >
              {/* Matches the header's logo treatment, including the glow and the
                  hover scale — it is the same mark, so it should not be a
                  slightly different one at the bottom of the page. */}
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
                {/* Byte-for-byte the header's wordmark treatment: `text-lg`,
                    `font-bold`, `tracking-[0.2em]`, and a muted tagline. This
                    was `text-xl` with a green tagline, which made the footer
                    mark visibly larger and louder than the header's on an
                    identically-sized 44px logo — the same logotype rendered two
                    different ways at the top and bottom of one page. */}
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
              {/* Rendered only when an address exists, so an unset constant
                  cannot produce a `mailto:` to nowhere. */}
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
          {/* A real `<nav>` landmark with a label, so a screen reader reaching
              the footer can jump the page links as a group instead of walking a
              bare list inside a `<div>`. */}
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
              {/* Hackathons is off both navs until the page is rebuilt. Its
                  events still appear on /events under the Hackathons filter. */}
            </ul>
          </nav>

          {/* ── Get involved ── */}
          {/* The two external forms only. Partner, Events and About all live in
              Navigate one column to the left; listing them again here under
              different wording was the same three destinations twice. */}
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
          {/* `<address>` wraps the contact details only. Its content model is
              "flow content, but with no heading content descendant", so the
              `<h4>` has to sit outside it rather than inside, which is where it
              was. `not-italic` undoes the browser's default italic. */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h4 className={columnHeadingClass}>Contact</h4>
            <address className="not-italic">
              <ul className="mt-4 space-y-2.5">
                {partnershipEmail && (
                  <li>
                    {/* `break-words`, not `break-all` — at this column width the
                        address fits on one line, and `break-all` would have been
                        free to split it mid-word if it ever did not. */}
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

        {/* Centre-weighted hairline via the site's own `.tv-divider`, rather
            than the flat `border-white/[0.06]` rule that used to sit here — it
            fades at both ends, so it separates the two halves of the footer
            without drawing a hard line across the full width. */}
        <div className="tv-divider h-px" aria-hidden="true" />

        {/* ═══════════════════════════════════════════
            BOTTOM BAR
            Two blocks, not three. This strip previously held the copyright and
            two separate taglines as three same-sized paragraphs spread by
            `justify-between`, which read as three unrelated fragments. The
            copyright and the free-events fact are one sentence now, and the
            sign-off keeps the site's small mono label style so it reads as a
            signature rather than a third competing line. All three pieces of
            copy are still here.
        ═══════════════════════════════════════════ */}
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
