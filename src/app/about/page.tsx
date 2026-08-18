import Image from 'next/image';
import Link from 'next/link';
import { teamDepartments, communityLinkedInUrl, communityJoinUrl } from '../data';

const linkedInIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M19.54 3H4.46C3.65 3 3 3.62 3 4.39v15.22C3 20.38 3.65 21 4.46 21h15.08c.81 0 1.46-.62 1.46-1.39V4.39C21 3.62 20.35 3 19.54 3ZM8.38 18.06H5.7V9.27h2.68v8.79ZM7.04 8.08a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.02 9.98h-2.67v-4.27c0-1.02-.02-2.34-1.43-2.34-1.44 0-1.66 1.12-1.66 2.27v4.34h-2.68V9.27h2.57v1.2h.04c.36-.67 1.24-1.38 2.55-1.38 2.73 0 3.23 1.8 3.23 4.14v4.85Z" />
  </svg>
);

// Flatten all members while preserving their department context
const allMembers = teamDepartments.flatMap((dept) =>
  dept.members.map((member) => ({ ...member, department: dept.department }))
);

// Group members by department for section display
const membersByDept = teamDepartments.filter(
  (dept) => dept.members.length > 0
);

// The core beliefs of the community
const beliefs = [
  {
    number: '01',
    title: 'Build before you brag.',
    description:
      'Make something before worrying about how it looks on a resume. A working project teaches more than any certification, and it gives you something real to talk about.',
  },
  {
    number: '02',
    title: 'Ask questions.',
    description:
      'There are no stupid questions in a room full of people still learning. The only way to avoid learning is to stay quiet.',
  },
  {
    number: '03',
    title: 'Share what you learn.',
    description:
      'Knowledge compounds when it moves through the community. If you figured something out the hard way, save someone else the time.',
  },
  {
    number: '04',
    title: 'Leave it stronger.',
    description:
      'Every member should make the community a little better than they found it. Attend, contribute, help someone get started. That is how this grows.',
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">

      {/* ═══════════════════════════════════════════
          THE ROOTS
      ═══════════════════════════════════════════ */}
      <section className="mb-8">
        <div className="tv-mono text-xs uppercase tracking-[0.32em] text-[color:var(--tv-text-muted)]">
          The Roots
        </div>
        <h1 className="tv-heading mt-4 text-4xl tracking-[-0.05em] sm:text-5xl lg:text-6xl">
          From seed
          <br />
          <span className="tv-glow text-[color:var(--tv-primary)]">to shade.</span>
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Main origin copy */}
          <div className="tv-card rounded-[2rem] p-6 sm:p-10">
            <p className="text-base leading-[1.85] text-[color:var(--tv-text-secondary)]">
              Tech Vriksh starts with a simple metaphor: a new member arrives like a seed or sapling.
              The community adds guidance, practical exposure, and real connections — so that person can
              grow into a Vriksh and eventually offer shade to others who come after them.
            </p>
            <p className="mt-5 text-base leading-[1.85] text-[color:var(--tv-text-secondary)]">
              It was started to close the gap between classroom learning and the kind of exposure students
              need once they leave campus. Not through generic advice or motivational sessions — through
              honest events, real speakers, and actual work.
            </p>
            <p className="mt-5 text-base leading-[1.85] text-[color:var(--tv-text-secondary)]">
              The community has been running for over 1.5 years. The team is unpaid. The founder does
              not take personal income from it. Growth has been steady and practical rather than inflated.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="tv-tag rounded-full tv-mono px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--tv-cyan)]">
                Real
              </span>
              <span className="tv-tag rounded-full tv-mono px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--tv-cyan)]">
                Relevant
              </span>
              <span className="tv-tag rounded-full tv-mono px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--tv-cyan)]">
                Rooted
              </span>
            </div>
          </div>

          {/* Fact strip */}
          <div className="flex flex-col gap-4">
            {[
              { label: 'Running since', value: 'Early 2025' },
              { label: 'Team size', value: '19 members — all unpaid' },
              { label: 'Community reach', value: '18 states across India' },
              { label: 'Events hosted at', value: 'OpsTree Global · ThoughtWorks · Microsoft' },
              { label: 'Largest event', value: 'Ctrl + Future — 80–90 attendees' },
            ].map((fact) => (
              <div
                key={fact.label}
                className="tv-card rounded-[1.5rem] px-6 py-5 transition-all duration-300 hover:border-[color:var(--tv-primary)]/25"
              >
                <div className="tv-mono text-xs uppercase tracking-[0.2em] text-[color:var(--tv-text-muted)]">
                  {fact.label}
                </div>
                <div className="mt-1.5 text-sm font-medium text-[color:var(--tv-text-secondary)]">
                  {fact.value}
                </div>
              </div>
            ))}

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={communityJoinUrl}
                target="_blank"
                rel="noreferrer"
                className="tv-button tv-button-primary inline-flex rounded-full px-6 py-3 text-sm font-medium text-[color:var(--tv-text-primary)]"
                data-cursor-hover
              >
                Join the community
              </a>
              <a
                href={communityLinkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="tv-button inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[color:var(--tv-text-primary)] hover:border-[color:var(--tv-primary)]/30"
                data-cursor-hover
              >
                {linkedInIcon} LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider my-12" />

      {/* ═══════════════════════════════════════════
          WHAT WE BELIEVE
      ═══════════════════════════════════════════ */}
      <section className="mb-8">
        <div className="tv-mono text-xs uppercase tracking-[0.32em] text-[color:var(--tv-text-muted)]">
          What we believe
        </div>
        <h2 className="tv-heading mt-4 text-3xl tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          The philosophy
          <br />
          of this community.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
          Not values on a poster. Actual principles that show up in how we run events and how we expect members to show up.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {beliefs.map((belief, index) => (
            <div
              key={belief.number}
              className="group relative overflow-hidden rounded-[1.5rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[color:var(--tv-surface)] to-[color:var(--tv-bg-secondary)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--tv-primary)]/30 hover:shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
            >
              {/* Accent left bar */}
              <div className="absolute left-0 top-8 h-16 w-[2px] rounded-r-full bg-gradient-to-b from-transparent via-[color:var(--tv-primary)]/50 to-transparent transition-all duration-500 group-hover:h-24 group-hover:via-[color:var(--tv-primary)]" />

              {/* Number */}
              <div className="tv-mono mb-4 text-xs font-bold text-[color:var(--tv-primary)]/50">
                {belief.number}
              </div>

              {/* Title */}
              <h3 className="tv-heading text-xl text-[color:var(--tv-text-primary)] transition-colors duration-300 group-hover:text-[color:var(--tv-primary)] sm:text-2xl">
                {belief.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-[1.85] text-[color:var(--tv-text-secondary)]">
                {belief.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider my-12" />

      {/* ═══════════════════════════════════════════
          THE PEOPLE
      ═══════════════════════════════════════════ */}
      <section>
        <div className="tv-mono text-xs uppercase tracking-[0.32em] text-[color:var(--tv-text-muted)]">
          The People
        </div>
        <h2 className="tv-heading mt-4 text-3xl tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          The team
          <br />
          behind it all.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
          19 people making this work, none of them paid. Every event, session, and post is their time.
        </p>

        {/* Render departments as groups */}
        <div className="mt-12 space-y-14">
          {membersByDept.map((dept) => (
            <div key={dept.department || 'leadership'}>
              {/* Department label */}
              {dept.department && (
                <div className="mb-6 flex items-center gap-4">
                  <div className="tv-mono text-xs uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">
                    {dept.department}
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[color:var(--tv-border)] to-transparent" />
                </div>
              )}
              {dept.summary && !dept.department && (
                <div className="mb-6 flex items-center gap-4">
                  <div className="tv-mono text-xs uppercase tracking-[0.28em] text-[color:var(--tv-primary)]">
                    Leadership
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[color:var(--tv-primary)]/30 to-transparent" />
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {dept.members.map((member) => (
                  <article
                    key={member.name}
                    className="group tv-card rounded-[1.6rem] p-5 transition-all duration-500 hover:-translate-y-2 hover:border-[color:var(--tv-primary)]/40 hover:shadow-[0_0_28px_rgba(57,217,138,0.12),0_20px_56px_rgba(0,0,0,0.5)]"
                  >
                    {/* Photo */}
                    <div className="overflow-hidden rounded-[1rem] border border-white/10 transition-all duration-500 group-hover:border-[color:var(--tv-primary)]/30">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={900}
                        height={900}
                        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Name + role */}
                    <div className="mt-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="transition-transform duration-300 group-hover:translate-x-0.5">
                          <div className="tv-heading text-xl transition-colors duration-300 group-hover:text-[color:var(--tv-primary)]">
                            {member.name}
                          </div>
                          <div className="tv-mono mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--tv-cyan)]">
                            {member.role}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Focus */}
                    <p className="mt-3 text-sm leading-[1.75] text-[color:var(--tv-text-secondary)]">
                      {member.focus}
                    </p>

                    {/* LinkedIn */}
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--tv-cyan)]/25 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--tv-cyan)] transition-all duration-300 hover:border-[color:var(--tv-cyan)] hover:bg-[color:var(--tv-cyan)]/8"
                    >
                      {linkedInIcon}
                      <span>Connect</span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider my-12" />

      {/* Bottom CTA */}
      <section className="text-center">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-[color:var(--tv-primary)]/[0.05] to-transparent p-10 sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,217,138,0.08),transparent_70%)]" />
          <div className="relative">
            <div className="tv-mono text-xs uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">
              Be part of this
            </div>
            <h2 className="tv-heading mt-4 text-3xl tracking-[-0.04em] sm:text-4xl">
              The next milestone involves you.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
              If you are a student who wants to build, learn, and actually connect with people doing the same — this is where you start.
            </p>
            <div className="mt-8">
              <a
                href={communityJoinUrl}
                target="_blank"
                rel="noreferrer"
                className="tv-button tv-button-primary inline-flex rounded-full px-8 py-4 text-base font-medium text-[color:var(--tv-text-primary)]"
                data-cursor-hover
              >
                Join Tech Vriksh
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
