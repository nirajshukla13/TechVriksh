/**
 * Journey state — the bridge between scroll and the 3D scene.
 *
 * Deliberately NOT React state. A scroll-linked camera updates every frame; if
 * that value lived in `useState` the whole tree would re-render dozens of times
 * per second. Instead GSAP's ScrollTrigger scrubs a plain mutable object and
 * `useFrame` reads it — so scrolling causes zero React renders.
 *
 * Lenis is already wired to ScrollTrigger in `LenisProvider`, so the smoothed
 * scroll position feeds this automatically.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface JourneyState {
  /** Scrub-smoothed scroll progress, 0 → 1 across the whole document. */
  progress: number;
  /** Signed scroll velocity in px/s — drives motion streaking. */
  velocity: number;
  /** Pointer position normalised to -1 → 1. */
  pointerX: number;
  pointerY: number;
  /** False until the user moves a pointer, so we do not fake parallax on touch. */
  pointerActive: boolean;
}

export const journeyState: JourneyState = {
  progress: 0,
  velocity: 0,
  pointerX: 0,
  pointerY: 0,
  pointerActive: false
};

/**
 * Scrub target. GSAP tweens `value` from 0 → 1 against document scroll with
 * `scrub`, which gives the camera its cinematic lag/catch-up for free.
 */
const scrubTarget = { value: 0 };

/**
 * Starts the scroll driver. Returns a disposer.
 * Safe to call only on the client, after layout.
 */
export function initJourneyDriver(): () => void {
  gsap.registerPlugin(ScrollTrigger);

  const tween = gsap.to(scrubTarget, {
    value: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      // Lag is the point: the camera keeps gliding for a beat after the wheel
      // stops, which is what separates this from a scroll-position lookup.
      scrub: 0.9,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        journeyState.velocity = self.getVelocity();
      }
    },
    onUpdate: () => {
      journeyState.progress = scrubTarget.value;
    }
  });

  const onPointerMove = (event: PointerEvent) => {
    journeyState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    journeyState.pointerY = -((event.clientY / window.innerHeight) * 2 - 1);
    journeyState.pointerActive = true;
  };

  const onPointerLeave = () => {
    journeyState.pointerActive = false;
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerleave', onPointerLeave, { passive: true });

  // Fonts and images settle after hydration and change document height.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);

  return () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('load', refresh);
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
