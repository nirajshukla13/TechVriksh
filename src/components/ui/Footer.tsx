import Link from 'next/link';
import { communityInstagramUrl, communityLinkedInUrl } from '@/app/data';

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-gradient-to-b from-transparent to-[#040a08] py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="tv-heading text-xl tracking-[-0.02em]">TECH VRIKSH</h3>
            <p className="mt-3 text-sm leading-6 text-[color:var(--tv-text-secondary)]">
              Real. Relevant. Rooted.
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--tv-text-muted)]">
              A student-driven technology community.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="tv-mono text-xs uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">Navigate</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-[color:var(--tv-text-secondary)] transition-colors hover:text-[color:var(--tv-primary)]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[color:var(--tv-text-secondary)] transition-colors hover:text-[color:var(--tv-primary)]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-[color:var(--tv-text-secondary)] transition-colors hover:text-[color:var(--tv-primary)]">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/hackathons" className="text-sm text-[color:var(--tv-text-secondary)] transition-colors hover:text-[color:var(--tv-primary)]">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-sm text-[color:var(--tv-text-secondary)] transition-colors hover:text-[color:var(--tv-primary)]">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="tv-mono text-xs uppercase tracking-[0.28em] text-[color:var(--tv-text-muted)]">Connect</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={communityInstagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[color:var(--tv-text-secondary)] transition-colors hover:text-[color:var(--tv-primary)]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={communityLinkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[color:var(--tv-text-secondary)] transition-colors hover:text-[color:var(--tv-primary)]"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div>
            <p className="tv-mono text-xs text-[color:var(--tv-text-muted)]">
              © {new Date().getFullYear()} Tech Vriksh
            </p>
            <p className="mt-2 text-xs text-[color:var(--tv-text-tertiary)]">
              Built by students, for students.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.04] pt-6">
          <p className="text-center text-xs text-[color:var(--tv-text-tertiary)]">
            All events are free and open to engineering students across India.
          </p>
        </div>
      </div>
    </footer>
  );
}
