'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { JOURNEY_END_Z, JOURNEY_START_Z } from '@/lib/journey/config';
import { getJourneyPalette } from '@/lib/journey/palette';
import { glowTexture } from '@/lib/journey/textures';

interface DepthStrataProps {
  /** Number of haze layers spread along the corridor. */
  count?: number;
}

/**
 * Layers of soft atmospheric haze spaced through the corridor's depth.
 *
 * These exist purely to make depth legible: as the camera passes each layer it
 * slides by at its own rate, producing genuine parallax between foreground and
 * background rather than a flat gradient that scales.
 */
export function DepthStrata({ count = 14 }: DepthStrataProps) {
  const groupRef = useRef<THREE.Group>(null);
  const palette = getJourneyPalette();
  const texture = useMemo(() => glowTexture(), []);

  const layers = useMemo(() => {
    // Deterministic pseudo-random so server and client agree and the look is
    // reproducible between reloads.
    let seed = 20260816;
    const random = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };

    const span = JOURNEY_START_Z - JOURNEY_END_Z;

    return Array.from({ length: count }, (_, index) => {
      const t = index / (count - 1);
      const z = JOURNEY_START_Z - t * span;
      const tint = index % 3 === 0 ? palette.cyan : index % 2 === 0 ? palette.primaryLight : palette.primary;

      return {
        key: `stratum-${index}`,
        position: [
          (random() - 0.5) * 14,
          (random() - 0.5) * 9,
          z - random() * 4
        ] as [number, number, number],
        size: 12 + random() * 16,
        opacity: 0.045 + random() * 0.05,
        color: new THREE.Color(tint),
        phase: random() * Math.PI * 2
      };
    });
  }, [count, palette.primary, palette.primaryLight, palette.cyan]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();

    group.children.forEach((child, index) => {
      const layer = layers[index];
      if (!layer) return;

      // Very slow lateral drift, so haze never sits perfectly still.
      child.position.x = layer.position[0] + Math.sin(time * 0.06 + layer.phase) * 0.9;
      child.position.y = layer.position[1] + Math.cos(time * 0.05 + layer.phase) * 0.6;
    });
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer) => (
        // Normals face +Z, which is where the camera always looks from — no
        // per-frame billboarding needed.
        <mesh key={layer.key} position={layer.position}>
          <planeGeometry args={[layer.size, layer.size]} />
          <meshBasicMaterial
            map={texture}
            color={layer.color}
            transparent
            opacity={layer.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
