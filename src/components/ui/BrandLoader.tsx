'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { techVrikshLogoUrl } from '@/app/data';

export function BrandLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show only on initial visit / reload (sessionStorage)
    const hasSeenIntro = sessionStorage.getItem('techvriksh_intro_seen');
    if (hasSeenIntro === 'true') {
      return;
    }

    // Mark as seen so subpage navigation doesn't re-trigger full loader
    sessionStorage.setItem('techvriksh_intro_seen', 'true');
    setIsVisible(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 1200 : 3300; // ~3.3 seconds total progress count
    const startTime = performance.now();

    let animationFrameId: number;

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawRatio = Math.min(elapsed / duration, 1);

      // Smooth custom easing curve (soft acceleration, steady count, gentle deceleration at 100%)
      const easedRatio =
        rawRatio < 0.5
          ? 2 * rawRatio * rawRatio
          : 1 - Math.pow(-2 * rawRatio + 2, 2) / 2;

      const currentProgress = Math.round(easedRatio * 100);
      setProgress(currentProgress);

      if (rawRatio < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // At 100%, trigger smooth exit sequence after a brief pause
        setTimeout(() => {
          setIsExiting(true);
          // Wait for CSS exit fade/upward transition to complete before unmounting
          setTimeout(() => {
            setIsVisible(false);
          }, 650);
        }, 150);
      }
    };

    // Start progress animation frame immediately
    animationFrameId = requestAnimationFrame(animateProgress);

    // Safety fallback timeout to guarantee unmount if tab is backgrounded
    const fallbackTimeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsVisible(false), 650);
    }, 4500);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-label="Loading Tech Vriksh"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#040a08] select-none overflow-hidden transition-all duration-700 ease-in-out ${
        isExiting
          ? 'opacity-0 -translate-y-6 scale-[0.98] pointer-events-none'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      {/* Subtle radial green ambient glow behind center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,217,138,0.12)_0%,rgba(4,10,8,0.98)_70%)]" />

      {/* Floating subtle ambient light dust motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute left-1/4 top-1/3 h-1.5 w-1.5 rounded-full bg-[color:var(--tv-primary)] blur-[1px] animate-pulse" />
        <div className="absolute right-1/4 top-1/2 h-1 w-1 rounded-full bg-[color:var(--tv-cyan)] blur-[1px] animate-pulse" />
        <div className="absolute left-1/3 bottom-1/3 h-2 w-2 rounded-full bg-[color:var(--tv-primary)]/40 blur-[2px]" />
      </div>

      {/* Content composition */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Orb - Eagerly loaded local WebP asset */}
        <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-full border border-[color:var(--tv-primary)]/40 bg-white/5 p-1.5 shadow-[0_0_35px_rgba(57,217,138,0.25)]">
          <Image
            src={techVrikshLogoUrl}
            alt="Tech Vriksh Logo"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Brand Title & Tagline */}
        <div className="mt-5 text-center space-y-1">
          <h1 className="tv-heading text-xl sm:text-2xl font-bold tracking-[0.3em] text-white">
            TECH VRIKSH
          </h1>
          <p className="tv-mono text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--tv-cyan)] opacity-75">
            Real &bull; Relevant &bull; Rooted
          </p>
        </div>

        {/* Percentage Display */}
        <div className="mt-7 font-mono tv-mono text-2xl sm:text-3xl font-bold tracking-widest text-[color:var(--tv-primary)]">
          {String(progress).padStart(2, '0')}%
        </div>

        {/* Thin Progress Indicator */}
        <div className="relative mt-3 h-1 w-48 sm:w-60 overflow-hidden rounded-full bg-white/10 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[color:var(--tv-cyan)] to-[color:var(--tv-primary)] shadow-[0_0_12px_rgba(57,217,138,0.6)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
