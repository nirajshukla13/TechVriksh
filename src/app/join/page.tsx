import Image from 'next/image';
import { communityInstagramUrl, communityJoinUrl, communityLinkedInUrl } from '../data';

const openRoles = [
  {
    title: 'WhatsApp Community Management',
    blurb: 'Keep the groups active, welcoming, and spam-free. Run polls and surface questions to the right people.',
    commitment: '3-5 hrs/week',
    type: 'Remote',
  },
  {
    title: 'Social Media Management',
    blurb: 'Plan and post across Instagram and LinkedIn, turn event recaps into content, and track audience growth.',
    commitment: '4-6 hrs/week',
    type: 'Remote',
  },
  {
    title: 'Video Editing & Content',
    blurb: 'Cut event highlights, reels, and workshop clips. Bring raw footage into polished stories people share.',
    commitment: 'Per-project',
    type: 'Remote',
  },
];

const recentActivity = [
  {
    label: 'Bootcamp',
    title: 'Ethereum Build Camp',
    detail: '8-day virtual bootcamp by Aya Community — Tech Vriksh as event partner.',
  },
  {
    label: 'In-person',
    title: 'Road to Devcon 8, Delhi NCR',
    detail: 'Co-organized meetup bringing the Ethereum Build Camp community together offline.',
  },
  {
    label: 'Workshop',
    title: 'Ctrl + Future: Agentic Observability',
    detail: 'Hands-on session hosted at OpsTree Global, Noida — part of the ongoing Ctrl + Future series.',
  },
];

const faqs = [
  {
    q: 'Is there any cost to join?',
    a: 'No. Joining the community, attending sessions, and applying for team roles are all 100% free.',
  },
  {
    q: 'Do I need prior experience to apply for roles?',
    a: 'No. Roles start with a short trial period so you can learn the workflow and test if it is a good fit both ways.',
  },
  {
    q: 'Is this remote or in-person?',
    a: 'Most day-to-day work (WhatsApp, social media, editing) is remote. Events and workshops happen in-person around Delhi NCR.',
  },
  {
    q: 'What happens after I submit the form?',
    a: 'You will hear back by email within a few days with next steps and a short trial period before full onboarding.',
  },
];

const linkedInIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M19.54 3H4.46C3.65 3 3 3.62 3 4.39v15.22C3 20.38 3.65 21 4.46 21h15.08c.81 0 1.46-.62 1.46-1.39V4.39C21 3.62 20.35 3 19.54 3ZM8.38 18.06H5.7V9.27h2.68v8.79ZM7.04 8.08a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.02 9.98h-2.67v-4.27c0-1.02-.02-2.34-1.43-2.34-1.44 0-1.66 1.12-1.66 2.27v4.34h-2.68V9.27h2.57v1.2h.04c.36-.67 1.24-1.38 2.55-1.38 2.73 0 3.23 1.8 3.23 4.14v4.85Z" />
  </svg>
);

const instagramIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
  </svg>
);

export default function JoinPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO & QUICK LINKS GRID
      ═══════════════════════════════════════════ */}
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        
        {/* Hero Card */}
        <div className="group relative overflow-hidden rounded-[2.2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.85)] to-[rgba(11,23,20,0.95)] p-8 sm:p-10 shadow-[var(--tv-shadow-depth)] transition-all duration-500 hover:border-[color:var(--tv-primary)]/40 hover:shadow-[0_16px_48px_rgba(57,217,138,0.12)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--tv-primary)]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative space-y-5">
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-primary)] font-semibold">
              Join Tech Vriksh
            </div>

            <h1 className="tv-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-white leading-[1.08]">
              Join, learn, grow, <span className="text-[color:var(--tv-primary)] tv-glow">pass it on.</span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[color:var(--tv-text-secondary)]">
              Tech Vriksh treats members like a sapling being rooted properly: useful guidance, practical exposure, and a community that empowers you to grow into the person who gives shade later.
            </p>

            {/* Real Event Image Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 h-52 sm:h-60 bg-black/40">
              <Image
                src="/sample/CTRL+Future.jpeg"
                alt="Tech Vriksh Community Session"
                fill
                className="object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/80 tv-mono">
                <span>OpsTree Global, Noida</span>
                <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 border border-white/15 text-[color:var(--tv-primary)]">Live Community Event</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={communityJoinUrl}
                target="_blank"
                rel="noreferrer"
                className="tv-button tv-button-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold tv-mono uppercase tracking-[0.16em] text-[color:var(--tv-text-primary)] transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(57,217,138,0.3)]"
              >
                <span>Join Community Form</span>
                <span>↗</span>
              </a>
              <span className="tv-mono text-xs text-[color:var(--tv-text-muted)] border border-white/10 rounded-full px-4 py-3 bg-white/[0.03]">
                Free &bull; Open to all students
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Links & How Joining Works */}
        <div className="flex flex-col gap-6">
          {/* Quick Links Card */}
          <div className="rounded-[2.2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.75)] to-[rgba(11,23,20,0.9)] p-7 sm:p-8 shadow-[var(--tv-shadow-md)]">
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-cyan)] font-semibold mb-4">
              Quick Connect
            </div>
            
            <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-3">
              <a
                href={communityJoinUrl}
                target="_blank"
                rel="noreferrer"
                className="group/link flex flex-col justify-between rounded-2xl border border-[color:var(--tv-primary)]/30 bg-[color:var(--tv-primary)]/10 p-4.5 transition-all duration-300 hover:border-[color:var(--tv-primary)] hover:bg-[color:var(--tv-primary)]/20 hover:-translate-y-1"
              >
                <div>
                  <div className="tv-heading text-lg font-bold text-white group-hover/link:text-[color:var(--tv-primary)]">Join Form</div>
                  <div className="mt-1 text-xs text-[color:var(--tv-text-secondary)]">Google Form sign-up</div>
                </div>
                <div className="mt-4 tv-mono text-xs text-[color:var(--tv-primary)] font-semibold flex items-center justify-between">
                  <span>Apply</span>
                  <span>↗</span>
                </div>
              </a>

              <a
                href={communityInstagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group/link flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4.5 transition-all duration-300 hover:border-[color:var(--tv-cyan)]/50 hover:bg-white/[0.08] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-2 tv-heading text-lg font-bold text-white group-hover/link:text-[color:var(--tv-cyan)]">
                    {instagramIcon}
                    <span>Insta</span>
                  </div>
                  <div className="mt-1 text-xs text-[color:var(--tv-text-secondary)]">Reels &amp; updates</div>
                </div>
                <div className="mt-4 tv-mono text-xs text-[color:var(--tv-cyan)] font-semibold flex items-center justify-between">
                  <span>Follow</span>
                  <span>↗</span>
                </div>
              </a>

              <a
                href={communityLinkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="group/link flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4.5 transition-all duration-300 hover:border-[color:var(--tv-cyan)]/50 hover:bg-white/[0.08] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-2 tv-heading text-lg font-bold text-white group-hover/link:text-[color:var(--tv-cyan)]">
                    {linkedInIcon}
                    <span>LinkedIn</span>
                  </div>
                  <div className="mt-1 text-xs text-[color:var(--tv-text-secondary)]">Company page</div>
                </div>
                <div className="mt-4 tv-mono text-xs text-[color:var(--tv-cyan)] font-semibold flex items-center justify-between">
                  <span>Connect</span>
                  <span>↗</span>
                </div>
              </a>
            </div>
          </div>

          {/* How Joining Works Card */}
          <div className="flex-1 rounded-[2.2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.75)] to-[rgba(11,23,20,0.9)] p-7 sm:p-8 shadow-[var(--tv-shadow-md)]">
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-primary)] font-semibold mb-4">
              How Joining Works
            </div>

            <ol className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
              <li className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--tv-primary)]/15 border border-[color:var(--tv-primary)]/40 text-xs tv-mono font-bold text-[color:var(--tv-primary)]">1</span>
                <div>
                  <span className="font-bold text-white block text-sm">Fill the Community Form</span>
                  Tell us what topics you are into and how much time you have to commit.
                </div>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--tv-cyan)]/15 border border-[color:var(--tv-cyan)]/40 text-xs tv-mono font-bold text-[color:var(--tv-cyan)]">2</span>
                <div>
                  <span className="font-bold text-white block text-sm">Trial Period</span>
                  Try out team tasks for real before committing long-term — zero pressure.
                </div>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--tv-magenta)]/15 border border-[color:var(--tv-magenta)]/40 text-xs tv-mono font-bold text-[color:var(--tv-magenta)]">3</span>
                <div>
                  <span className="font-bold text-white block text-sm">Full Onboarding</span>
                  Get added to the core team channels, build projects, and start shipping.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: OPEN ROLES
      ═══════════════════════════════════════════ */}
      <section className="mt-20">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="tv-mono text-xs uppercase tracking-[0.36em] text-[color:var(--tv-primary)] font-semibold">
              Open Positions
            </div>
            <h2 className="tv-heading text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-white">
              Apply for Open Team Roles
            </h2>
            <p className="text-sm text-[color:var(--tv-text-muted)] max-w-lg">
              Unpaid, student-led roles designed to build real portfolio experience.
            </p>
          </div>
          <span className="tv-mono text-xs uppercase tracking-[0.2em] text-[color:var(--tv-primary)] border border-[color:var(--tv-primary)]/30 rounded-full px-4 py-1.5 bg-[color:var(--tv-primary)]/10 font-semibold self-start sm:self-auto">
            Hiring Now &bull; 3 Roles
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {openRoles.map((role) => (
            <article
              key={role.title}
              className="group flex flex-col justify-between rounded-[2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.8)] to-[rgba(11,23,20,0.95)] p-6 shadow-[var(--tv-shadow-md)] transition-all duration-500 hover:border-[color:var(--tv-primary)]/50 hover:shadow-[0_16px_40px_rgba(57,217,138,0.15)] hover:-translate-y-1.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="tv-mono text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--tv-cyan)] font-semibold border border-[color:var(--tv-cyan)]/30 rounded-full px-3 py-1 bg-[color:var(--tv-cyan)]/10">
                    {role.type}
                  </span>
                  <span className="tv-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--tv-text-muted)]">
                    {role.commitment}
                  </span>
                </div>

                <h3 className="tv-heading text-xl font-bold text-white group-hover:text-[color:var(--tv-primary)] transition-colors">
                  {role.title}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
                  {role.blurb}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <a
                  href={communityJoinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="tv-button tv-button-primary inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold tv-mono uppercase tracking-[0.16em] text-[color:var(--tv-text-primary)]"
                >
                  <span>Apply Now</span>
                  <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: RECENT ACTIVITY & BENEFITS
      ═══════════════════════════════════════════ */}
      <section className="mt-20 grid gap-6 lg:grid-cols-[0.55fr_0.45fr]">
        
        {/* Recent Activity */}
        <div className="rounded-[2.2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.75)] to-[rgba(11,23,20,0.9)] p-7 sm:p-9 shadow-[var(--tv-shadow-md)]">
          <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-primary)] font-semibold mb-5">
            Recent Community Work
          </div>
          
          <ul className="space-y-4">
            {recentActivity.map((item) => (
              <li
                key={item.title}
                className="flex flex-col space-y-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-[color:var(--tv-primary)]/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="tv-heading text-lg font-bold text-white">{item.title}</h4>
                  <span className="tv-mono text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--tv-cyan)] font-semibold border border-[color:var(--tv-cyan)]/30 rounded-full px-3 py-1 bg-[color:var(--tv-cyan)]/10 shrink-0">
                    {item.label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="flex flex-col justify-between rounded-[2.2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.75)] to-[rgba(11,23,20,0.9)] p-7 sm:p-9 shadow-[var(--tv-shadow-md)]">
          <div>
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-cyan)] font-semibold mb-5">
              What Happens After Joining
            </div>

            <ul className="space-y-4 text-xs sm:text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">
              <li className="flex items-start gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <span className="h-2 w-2 rounded-full bg-[color:var(--tv-primary)] shrink-0 mt-2" />
                <div>
                  <strong className="text-white block text-base font-bold">Event &amp; Session Updates</strong>
                  Receive clear event notifications, workshop sign-ups, and community notes in one place.
                </div>
              </li>
              <li className="flex items-start gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <span className="h-2 w-2 rounded-full bg-[color:var(--tv-cyan)] shrink-0 mt-2" />
                <div>
                  <strong className="text-white block text-base font-bold">Early Workshop Access</strong>
                  Get early visibility and reserved spots on offline meetups, hackathons, and technical bootcamps.
                </div>
              </li>
              <li className="flex items-start gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <span className="h-2 w-2 rounded-full bg-[color:var(--tv-magenta)] shrink-0 mt-2" />
                <div>
                  <strong className="text-white block text-base font-bold">Collaborate &amp; Build</strong>
                  Stay close to core members if you want to co-host events, build side projects, or volunteer.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: FAQ SECTION
      ═══════════════════════════════════════════ */}
      <section className="mt-20">
        <div className="rounded-[2.2rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.75)] to-[rgba(11,23,20,0.9)] p-8 sm:p-10 shadow-[var(--tv-shadow-md)]">
          <div className="mb-6 space-y-1">
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-primary)] font-semibold">
              FAQ
            </div>
            <h3 className="tv-heading text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-2 transition-colors hover:border-[color:var(--tv-primary)]/30"
              >
                <h4 className="tv-heading text-lg font-bold text-white">{item.q}</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[color:var(--tv-text-secondary)]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: BOTTOM CTA BANNER
      ═══════════════════════════════════════════ */}
      <section className="mt-20 text-center">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[color:var(--tv-border)] bg-gradient-to-b from-[rgba(16,30,26,0.6)] to-[rgba(11,23,20,0.85)] p-10 sm:p-14 space-y-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,217,138,0.1),transparent_70%)]" />

          <div className="relative space-y-4">
            <div className="tv-mono text-xs uppercase tracking-[0.34em] text-[color:var(--tv-primary)] font-semibold">
              Ready to start?
            </div>
            <h2 className="tv-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.04em] text-white">
              Join Tech Vriksh Today
            </h2>
            <p className="mx-auto max-w-lg text-sm sm:text-base leading-relaxed text-[color:var(--tv-text-secondary)]">
              Fill out the simple Google Form to get added to the community group and get notified about upcoming events.
            </p>
            <div className="pt-3">
              <a
                href={communityJoinUrl}
                target="_blank"
                rel="noreferrer"
                className="tv-button tv-button-primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs sm:text-sm font-semibold tv-mono uppercase tracking-[0.18em] text-[color:var(--tv-text-primary)] transition-transform duration-300 hover:scale-105 shadow-[0_0_24px_rgba(57,217,138,0.35)]"
              >
                <span>Open Google Form</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
