'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { JourneyCamera } from './JourneyCamera';
import { JourneyAtmosphere } from './JourneyAtmosphere';
import { CorridorRails } from './CorridorRails';
import { DepthStrata } from './DepthStrata';
import { DustMotes } from './DustMotes';
import { LightGates } from './LightGates';
import { JOURNEY_START_Z, MOTE_COUNT } from '@/lib/journey/config';
import { initJourneyDriver } from '@/lib/journey/state';
import { disposeJourneyTextures } from '@/lib/journey/textures';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * The scroll-driven 3D journey.
 *
 * One `Canvas` for the entire site, pinned behind all content. Scrolling moves
 * a real perspective camera forward through a continuous environment — it is
 * not a background that reacts to scroll, it is a space the page travels
 * through.
 *
 * Rendering cost is kept flat: the scene graph is built once, every per-frame
 * update happens on refs, and nothing here re-renders while scrolling.
 */
export function ScrollScene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll driver: one ScrollTrigger scrub feeding the shared journey state.
  useEffect(() => initJourneyDriver(), []);

  useEffect(() => disposeJourneyTextures, []);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Stop rendering entirely when the tab is hidden — no reason to burn GPU.
  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  // Avoid a server/client mismatch: WebGL can only exist on the client.
  if (!mounted) return null;

  // Reduced motion keeps the scroll journey (that is the navigation itself)
  // but dials the ambient drift and pointer parallax right down.
  const motion = reduced ? 0.15 : 1;

  return (
    <div className="tv-canvas-layer" aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, JOURNEY_START_Z], fov: 58, near: 0.1, far: 240 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <JourneyCamera motion={motion} />
          <JourneyAtmosphere />

          <CorridorRails />
          <LightGates withBloom={!isMobile} />
          <DepthStrata count={isMobile ? 8 : 14} />
          <DustMotes count={isMobile ? MOTE_COUNT.mobile : MOTE_COUNT.desktop} />
        </Suspense>
      </Canvas>
    </div>
  );
}
