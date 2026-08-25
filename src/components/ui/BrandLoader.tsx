'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { techVrikshLogoUrl } from '@/app/data';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  baseOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

function LoaderCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Particle count: 36 on desktop, 18 on mobile, 12 on reduced motion
    const count = prefersReducedMotion ? 12 : isMobile ? 18 : 36;

    const colors = [
      '57, 217, 138',  // Primary Green
      '107, 239, 215', // Cyan
      '180, 245, 210', // Soft Green White
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = 0.8 + Math.random() * 2.0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        // Ultra-slow organic drift speed
        vx: (Math.random() - 0.5) * (0.15 + Math.random() * 0.15),
        vy: (Math.random() - 0.5) * (0.15 + Math.random() * 0.15) - 0.05,
        baseOpacity: 0.15 + Math.random() * 0.4,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.001 + Math.random() * 0.003,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      // ── Deep green-tinted dark atmospheric background ──
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#071612');
      bgGrad.addColorStop(0.5, '#05110d');
      bgGrad.addColorStop(1, '#040a08');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // ── 2. Drifting Particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const pulse = Math.sin(elapsed * p.pulseSpeed + p.pulsePhase);
        const opacity = Math.max(0.08, Math.min(0.7, p.baseOpacity + pulse * 0.15));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
        ctx.fill();

        if (p.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${opacity * 0.25})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />;
}

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
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-b from-[#071612] via-[#05110d] to-[#040a08] select-none overflow-hidden transition-all duration-700 ease-in-out ${
        isExiting
          ? 'opacity-0 -translate-y-6 scale-[0.98] pointer-events-none'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      {/* Dynamic living atmospheric background canvas */}
      <LoaderCanvas progress={progress} />

      {/* Content composition */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Soft focused ambient glow directly behind logo */}
        <div className="pointer-events-none absolute -top-8 h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(57,217,138,0.22)_0%,rgba(57,217,138,0.06)_45%,transparent_70%)] blur-xl" />

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
