'use client';

import { useEffect, useRef, useState } from 'react';
import { Counter } from '@/components/counter';
import { stateMembers } from '@/app/data';

export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const totalMembers = stateMembers.reduce((sum, entry) => sum + entry.count, 0);
  const totalStates = stateMembers.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = 'rgba(57, 217, 138, 0.08)';
      ctx.lineWidth = 1;

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = (1 - distance / 120) * 0.15;
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse influence
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.x -= dx * 0.002;
          particle.y -= dy * 0.002;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 217, 138, ${particle.opacity})`;
        ctx.globalAlpha = 1;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="group relative h-full overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#0B1714] to-[#07110F]"
      onMouseMove={handleMouseMove}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-8">
        {/* Floating stats */}
        <div className="space-y-8 text-center">
          <div className="animate-float">
            <div className="tv-mono text-xs uppercase tracking-[0.32em] text-[color:var(--tv-text-muted)]">
              Community
            </div>
            <div className="tv-heading mt-3 text-5xl tracking-[-0.06em] text-[color:var(--tv-primary)] tv-glow">
              <Counter target={totalMembers} suffix="+" />
            </div>
            <div className="tv-mono mt-2 text-sm uppercase tracking-[0.24em] text-[color:var(--tv-text-secondary)]">
              Members
            </div>
          </div>

          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[color:var(--tv-primary)]/20 to-transparent" />

          <div className="grid grid-cols-2 gap-8 animate-float-delayed">
            <div>
              <div className="tv-heading text-3xl tracking-[-0.04em] text-[color:var(--tv-cyan)]">
                <Counter target={totalStates} />
              </div>
              <div className="tv-mono mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--tv-text-muted)]">
                States
              </div>
            </div>
            <div>
              <div className="tv-heading text-3xl tracking-[-0.04em] text-[color:var(--tv-cyan)]">
                <Counter target={10} suffix="+" />
              </div>
              <div className="tv-mono mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--tv-text-muted)]">
                Events
              </div>
            </div>
          </div>
        </div>

        {/* Geometric decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-4 top-4 h-12 w-12 rounded-lg border border-[color:var(--tv-primary)]/20 opacity-40 animate-spin-slow" />
          <div className="absolute right-6 bottom-6 h-16 w-16 rotate-45 border border-[color:var(--tv-cyan)]/20 opacity-30 animate-pulse-slow" />
          <div className="absolute left-1/4 bottom-8 h-8 w-8 rounded-full border border-[color:var(--tv-primary)]/25 opacity-50 animate-float" />
        </div>
      </div>
    </div>
  );
}
