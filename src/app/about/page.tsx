import Image from 'next/image';
import { teamDepartments, communityLinkedInUrl, communityJoinUrl } from '../data';

const linkedInIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M19.54 3H4.46C3.65 3 3 3.62 3 4.39v15.22C3 20.38 3.65 21 4.46 21h15.08c.81 0 1.46-.62 1.46-1.39V4.39C21 3.62 20.35 3 19.54 3ZM8.38 18.06H5.7V9.27h2.68v8.79ZM7.04 8.08a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.02 9.98h-2.67v-4.27c0-1.02-.02-2.34-1.43-2.34-1.44 0-1.66 1.12-1.66 2.27v4.34h-2.68V9.27h2.57v1.2h.04c.36-.67 1.24-1.38 2.55-1.38 2.73 0 3.23 1.8 3.23 4.14v4.85Z" />
  </svg>
);

// Flatten all members and attach their department
const teamMembers = teamDepartments.flatMap((dept) =>
  dept.members.map((member) => ({
    ...member,
    department: dept.department || 'Leadership',
  }))
);

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO & FOUNDER STORY GRID
      ═══════════════════════════════════════════ */}
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        
        {/* Left: Origin Story */}
        <div className="group relative overflow-hidden rounded-[2.2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.85)] to-[rgba(11,23,20,0.95)] p-8 sm:p-10 shadow-[var(--tv-shadow-depth)] transition-all duration-500 hover:border-[color:var(--tv-primary)]/40 hover:shadow-[0_16px_48px_rgba(57,217,138,0.12)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--tv-primary)]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative">
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-primary)] font-semibold">
              The Roots
            </div>

            <h1 className="tv-heading mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-white leading-[1.08]">
              From seed <span className="text-[color:var(--tv-primary)] tv-glow">to shade.</span>
            </h1>
            
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[color:var(--tv-text-secondary)] font-normal">
              <p>
                Tech Vriksh starts with a simple metaphor: a new member arrives like a seed or sapling.
                The community adds guidance, practical exposure, and real connections — so that person can
                grow into a Vriksh and eventually offer shade to others who come after them.
              </p>
              <p>
                The community has been running for over 1.5 years. The team is unpaid, and the founder does
                not take personal income from it. Growth has been steady, honest, and practical rather than inflated.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5 pt-4 border-t border-white/[0.08]">
              <span className="tv-mono rounded-full border border-[color:var(--tv-primary)]/35 bg-[color:var(--tv-primary)]/10 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-[color:var(--tv-primary)] font-semibold shadow-[0_0_12px_rgba(57,217,138,0.15)]">
                Real
              </span>
              <span className="tv-mono rounded-full border border-[color:var(--tv-cyan)]/35 bg-[color:var(--tv-cyan)]/10 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-[color:var(--tv-cyan)] font-semibold shadow-[0_0_12px_rgba(107,239,217,0.15)]">
                Relevant
              </span>
              <span className="tv-mono rounded-full border border-[color:var(--tv-magenta)]/35 bg-[color:var(--tv-magenta)]/10 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-[color:var(--tv-magenta)] font-semibold shadow-[0_0_12px_rgba(249,163,200,0.15)]">
                Rooted
              </span>
            </div>
          </div>
        </div>

        {/* Right: Founder Note & Key Facts */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.75)] to-[rgba(11,23,20,0.9)] p-8 sm:p-10 shadow-[var(--tv-shadow-md)] transition-all duration-500 hover:border-[color:var(--tv-cyan)]/40 hover:shadow-[0_16px_48px_rgba(107,239,217,0.1)]">
          <div className="relative">
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-cyan)] font-semibold">
              Founder Note
            </div>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[color:var(--tv-text-secondary)]">
              &ldquo;Tech Vriksh was started to close the gap between classroom learning and the kind of practical exposure students need once they leave campus. The goal is simple: create honest, useful events that help people build confidence, context, and momentum.&rdquo;
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center rounded-2xl border border-[color:var(--tv-primary)]/20 bg-white/[0.03] px-5 py-3.5 text-xs sm:text-sm tv-mono text-[color:var(--tv-text-secondary)] transition-all hover:bg-white/[0.06] hover:text-white">
                <span className="leading-relaxed">Running unpaid &amp; student-driven</span>
              </div>
              <div className="flex items-center rounded-2xl border border-[color:var(--tv-cyan)]/20 bg-white/[0.03] px-5 py-3.5 text-xs sm:text-sm tv-mono text-[color:var(--tv-text-secondary)] transition-all hover:bg-white/[0.06] hover:text-white">
                <span className="leading-relaxed">Active team of 19 members across India</span>
              </div>
              <div className="flex items-center rounded-2xl border border-[color:var(--tv-magenta)]/20 bg-white/[0.03] px-5 py-3.5 text-xs sm:text-sm tv-mono text-[color:var(--tv-text-secondary)] transition-all hover:bg-white/[0.06] hover:text-white">
                <span className="leading-relaxed">Hosted at OpsTree Global, ThoughtWorks &amp; Microsoft</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 pt-5 border-t border-white/[0.08]">
            <a
              href={communityJoinUrl}
              target="_blank"
              rel="noreferrer"
              className="tv-button tv-button-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold tv-mono uppercase tracking-[0.16em] text-[color:var(--tv-text-primary)] transition-transform duration-300 hover:scale-105 shadow-[0_0_16px_rgba(57,217,138,0.3)]"
            >
              <span>Join Community</span>
              <span>↗</span>
            </a>
            <a
              href={communityLinkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="tv-button inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-semibold tv-mono uppercase tracking-[0.16em] text-[color:var(--tv-text-primary)] transition-all duration-300 hover:border-[color:var(--tv-primary)]/40 hover:text-[color:var(--tv-primary)] hover:bg-white/[0.08]"
            >
              {linkedInIcon}
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: TEAM PROFILES (PROMINENT 3-COL GRID)
      ═══════════════════════════════════════════ */}
      <section className="mt-20">
        <div className="mb-10 space-y-2">
          <div className="tv-mono text-xs uppercase tracking-[0.36em] text-[color:var(--tv-primary)] font-semibold">
            The Team
          </div>
          <h2 className="tv-heading text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-white">
            Tech Vriksh Team Profiles
          </h2>
          <p className="text-sm sm:text-base text-[color:var(--tv-text-muted)] max-w-xl">
            19 student leaders and builders making events, community sessions, and programs happen every week.
          </p>
        </div>

        {/* 3-column spacious team card grid with prominent sizing & premium hover */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.8)] to-[rgba(11,23,20,0.95)] p-5 sm:p-6 shadow-[var(--tv-shadow-md)] transition-all duration-500 hover:border-[color:var(--tv-primary)]/50 hover:shadow-[0_20px_50px_rgba(57,217,138,0.18)] hover:-translate-y-2"
            >
              {/* Image & Header Details */}
              <div className="space-y-4">
                <div className="relative w-full overflow-hidden rounded-2xl aspect-square border border-white/10 bg-black/40 shadow-inner">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle top subtle gradient overlay on image bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Name, Role & Department */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="tv-heading text-xl sm:text-2xl font-bold tracking-[-0.03em] text-white group-hover:text-[color:var(--tv-primary)] transition-colors duration-300">
                      {member.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <p className="tv-mono text-xs uppercase tracking-[0.2em] text-[color:var(--tv-cyan)] font-semibold">
                      {member.role}
                    </p>
                    <span className="tv-mono text-[0.62rem] uppercase tracking-[0.16em] text-[color:var(--tv-text-muted)] border border-white/10 rounded-full px-2.5 py-0.5 bg-white/[0.03]">
                      {member.department}
                    </span>
                  </div>
                </div>

                {/* Focus */}
                <p className="text-xs sm:text-sm leading-relaxed text-[color:var(--tv-text-secondary)] line-clamp-2">
                  {member.focus}
                </p>
              </div>

              {/* LinkedIn Button */}
              <div className="mt-5 pt-4 border-t border-white/[0.08]">
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[color:var(--tv-cyan)]/30 bg-[color:var(--tv-cyan)]/8 py-2.5 text-xs tv-mono font-semibold uppercase tracking-[0.18em] text-[color:var(--tv-cyan)] transition-all duration-300 hover:border-[color:var(--tv-cyan)] hover:bg-[color:var(--tv-cyan)]/20 group-hover:border-[color:var(--tv-primary)]/50 group-hover:text-[color:var(--tv-primary)] shadow-[0_0_12px_rgba(107,239,217,0.1)]"
                >
                  {linkedInIcon}
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">Connect on LinkedIn</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: BOTTOM CTA
      ═══════════════════════════════════════════ */}
      <section className="mt-20 text-center">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.6)] to-[rgba(11,23,20,0.85)] p-10 sm:p-14 space-y-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,217,138,0.1),transparent_70%)]" />
          
          <div className="relative space-y-4">
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-primary)] font-semibold">
              Be part of this
            </div>
            <h2 className="tv-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.04em] text-white">
              The next milestone involves you.
            </h2>
            <p className="mx-auto max-w-lg text-sm sm:text-base leading-relaxed text-[color:var(--tv-text-secondary)]">
              If you are a student who wants to build, learn, and connect with people doing the same — this is where you start.
            </p>
            <div className="pt-3">
              <a
                href={communityJoinUrl}
                target="_blank"
                rel="noreferrer"
                className="tv-button tv-button-primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs sm:text-sm font-semibold tv-mono uppercase tracking-[0.18em] text-[color:var(--tv-text-primary)] transition-transform duration-300 hover:scale-105 shadow-[0_0_24px_rgba(57,217,138,0.35)]"
              >
                <span>Join Tech Vriksh</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
