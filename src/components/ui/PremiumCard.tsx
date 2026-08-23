'use client';

import { useRef, useCallback, useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import { PosterImage } from './PosterImage';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  disableTilt?: boolean;
}

export function PremiumCard({ children, className = '', disableTilt = false }: PremiumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableTilt) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--spotlight-x', `${x}%`);
      card.style.setProperty('--spotlight-y', `${y}%`);

      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      targetRef.current = { x: ny * -6, y: nx * 6 };
    },
    [disableTilt],
  );

  const onMouseLeave = useCallback(() => {
    if (disableTilt) return;
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--spotlight-x', '50%');
    card.style.setProperty('--spotlight-y', '50%');
    targetRef.current = { x: 0, y: 0 };
  }, [disableTilt]);

  useEffect(() => {
    if (disableTilt) return;
    const card = cardRef.current;
    if (!card) return;

    const animate = () => {
      const c = currentRef.current;
      const t = targetRef.current;

      c.x += (t.x - c.x) * 0.1;
      c.y += (t.y - c.y) * 0.1;

      if (Math.abs(c.x - t.x) > 0.01 || Math.abs(c.y - t.y) > 0.01) {
        card.style.transform = `perspective(1000px) rotateX(${c.x}deg) rotateY(${c.y}deg)`;
        rafRef.current = requestAnimationFrame(animate);
      } else {
        card.style.transform = `perspective(1000px) rotateX(${t.x}deg) rotateY(${t.y}deg)`;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [disableTilt]);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`premium-card group relative h-full overflow-hidden tv-card ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      } as React.CSSProperties}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle 300px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(57, 217, 138, 0.08), transparent 70%)',
        }}
      />
      
      {/* Border highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] rounded-[1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(57, 217, 138, 0.1) 0%, transparent 40%, transparent 60%, rgba(57, 217, 138, 0.05) 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-[3]">{children}</div>
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  aspect?: string;
  badges?: ReactNode;
  /**
   * `cover` crops the image to fill the box — right for photographs. `poster`
   * shows the whole image over a blurred wash of itself — right for designed
   * artwork, where a crop would cut off the title and date.
   */
  fit?: 'cover' | 'poster';
  sizes?: string;
}

export function CardImage({
  src,
  alt,
  aspect = '16/9',
  badges,
  fit = 'cover',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
}: CardImageProps) {
  return (
    <div className="relative overflow-hidden border-b border-white/[0.05]">
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        {fit === 'poster' ? (
          <PosterImage src={src} alt={alt} sizes={sizes} />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
      </div>
      {badges && (
        <div className="absolute left-3.5 top-3.5 z-[4] flex flex-wrap gap-1.5">
          {badges}
        </div>
      )}
    </div>
  );
}

interface CardBadgeProps {
  children: ReactNode;
  accent?: 'primary' | 'cyan' | 'magenta';
}

export function CardBadge({ children, accent = 'primary' }: CardBadgeProps) {
  const color =
    accent === 'primary' ? 'text-[color:var(--tv-primary)]' :
    accent === 'cyan' ? 'text-[color:var(--tv-cyan)]' :
    'text-[color:var(--tv-magenta)]';

  return (
    <span
      className={`inline-block rounded-full border border-white/[0.08] bg-black/40 backdrop-blur-sm px-2.5 py-0.5 tv-mono text-[0.62rem] uppercase tracking-[0.2em] ${color}`}
    >
      {children}
    </span>
  );
}
