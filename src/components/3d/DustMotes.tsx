'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { JOURNEY_END_Z, JOURNEY_START_Z } from '@/lib/journey/config';
import { getJourneyPalette } from '@/lib/journey/palette';
import { journeyState } from '@/lib/journey/state';
import { moteTexture } from '@/lib/journey/textures';

interface DustMotesProps {
  count: number;
}

/**
 * Fine atmospheric dust filling the corridor volume.
 *
 * Unconnected points only — no lines between them. The purpose is to give the
 * air itself texture so forward motion has something to stream past, which is
 * what sells the sense of physically travelling.
 */
export function DustMotes({ count }: DustMotesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const palette = getJourneyPalette();
  const texture = useMemo(() => moteTexture(), []);

  const geometry = useMemo(() => {
    let seed = 987654321;
    const random = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };

    const span = JOURNEY_START_Z - JOURNEY_END_Z;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (random() - 0.5) * 22;
      positions[i * 3 + 1] = (random() - 0.5) * 14;
      positions[i * 3 + 2] = JOURNEY_START_Z - random() * (span + 12);
      scales[i] = 0.4 + random() * 0.8;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    return buffer;
  }, [count]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    const material = materialRef.current;
    if (!points || !material) return;

    const time = clock.getElapsedTime();

    // Drift the whole field rather than each point: one transform instead of
    // thousands of buffer writes per frame.
    points.position.y = Math.sin(time * 0.08) * 0.5;
    points.position.x = Math.cos(time * 0.06) * 0.4;
    points.rotation.z = time * 0.004;

    // Motes brighten and swell slightly while scrolling hard.
    const rush = THREE.MathUtils.clamp(Math.abs(journeyState.velocity) / 12000, 0, 1);
    material.opacity = 0.3 + rush * 0.35;
    material.size = 0.07 + rush * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        ref={materialRef}
        map={texture}
        color={new THREE.Color(palette.primaryLight)}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
