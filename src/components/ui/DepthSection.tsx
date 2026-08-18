'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DepthSectionProps {
  children: React.ReactNode;
  /** Matches a station id in `src/lib/journey/config.ts`. */
  station: string;
  className?: string;
  /** How far back in Z the content starts, in px. Larger = more dramatic. */
  depth?: number;
}

/**
 * Wraps a homepage section so its content shares the 3D camera's depth.
 *
 * The WebGL corridor and the DOM are two different renderers, so they are kept
 * in sync the only reliable way: both are scrubbed by the same scroll. As the
 * camera flies toward a station, that station's DOM content rises out of depth
 * on a real CSS perspective transform and recedes again once passed.
 *
 * This replaces the old fade-and-slide `Reveal` on the homepage — content now
 * occupies the same space as the scene instead of floating on top of it.
 */
export function DepthSection({
  children,
  station,
  className = '',
  depth = 260
}: DepthSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)'
        },
        (mediaContext) => {
          const { isDesktop } = mediaContext.conditions as { isDesktop: boolean };

          // Blur is the expensive part of this transform, so it is desktop-only
          // and stays small. Mobile gets the same depth move without it.
          const enterBlur = isDesktop ? 'blur(7px)' : 'blur(0px)';
          const exitBlur = isDesktop ? 'blur(4px)' : 'blur(0px)';
          const travel = isDesktop ? depth : depth * 0.45;

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              // Matches the camera's scrub so DOM and WebGL move as one system.
              scrub: 0.9,
              invalidateOnRefresh: true
            }
          });

          timeline
            .fromTo(
              inner,
              { z: -travel, opacity: 0.2, filter: enterBlur },
              { z: 0, opacity: 1, filter: 'blur(0px)', ease: 'power2.out' }
            )
            .to(inner, {
              z: travel * 0.4,
              opacity: 0.35,
              filter: exitBlur,
              ease: 'power2.in'
            });
        }
      );
    }, root);

    return () => context.revert();
  }, [depth]);

  return (
    <div ref={rootRef} className={`tv-depth ${className}`} data-station={station}>
      <div ref={innerRef} className="tv-depth__inner">
        {children}
      </div>
    </div>
  );
}
