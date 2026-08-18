'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { JOURNEY_END_Z, JOURNEY_START_Z, JOURNEY_LENGTH } from '@/lib/journey/config';
import { getJourneyPalette } from '@/lib/journey/palette';
import { railTexture } from '@/lib/journey/textures';

interface CorridorRailsProps {
  /** Distance of the side rails from the corridor centre line. */
  spread?: number;
}

/**
 * Four thin light rails running the full length of the corridor.
 *
 * These are the primary depth cue: because they converge toward the vanishing
 * point, forward camera travel becomes unmistakable. Four long planes is
 * essentially free compared to any volumetric approach.
 */
export function CorridorRails({ spread = 7.4 }: CorridorRailsProps) {
  const palette = getJourneyPalette();
  const texture = useMemo(() => railTexture(), []);

  const centreZ = (JOURNEY_START_Z + JOURNEY_END_Z) / 2;

  // One shared geometry — the rails differ only by transform.
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(JOURNEY_LENGTH, 0.075),
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: texture,
        color: new THREE.Color(palette.primary),
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false
      }),
    [texture, palette.primary]
  );

  const accentMaterial = useMemo(() => {
    const clone = material.clone();
    clone.color = new THREE.Color(palette.cyan);
    clone.opacity = 0.32;
    return clone;
  }, [material, palette.cyan]);

  return (
    <group position={[0, 0, centreZ]}>
      {/* Side rails — rotated so their length runs along Z. */}
      <mesh
        geometry={geometry}
        material={material}
        position={[-spread, -0.4, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={[spread, -0.4, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Floor and ceiling rails, laid flat to close the tunnel. */}
      <mesh
        geometry={geometry}
        material={accentMaterial}
        position={[0, -4.6, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        geometry={geometry}
        material={accentMaterial}
        position={[0, 4.6, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
    </group>
  );
}
