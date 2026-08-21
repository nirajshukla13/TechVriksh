'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { fogDensityAt } from '@/lib/journey/config';
import { getJourneyPalette } from '@/lib/journey/palette';
import { journeyState } from '@/lib/journey/state';

/**
 * Fog and lighting for the corridor.
 *
 * Exponential fog is what turns a set of planes into an atmosphere: distant
 * gates dissolve into haze and only resolve as the camera closes on them, so
 * each section is revealed by travel instead of by an opacity transition.
 *
 * Fog density is scrubbed by scroll — it thickens through the middle of the
 * journey and clears for the final CTA.
 */
export function JourneyAtmosphere() {
  const { scene } = useThree();
  const palette = getJourneyPalette();
  const travelLight = useRef<THREE.PointLight>(null);

  const fog = useMemo(
    () => new THREE.FogExp2(new THREE.Color(palette.bgDeep || '#040a08').getHex(), 0.012),
    [palette.bgDeep]
  );

  // Assigning through the imperative API keeps one Fog instance for the whole session
  if (scene.fog !== fog) scene.fog = fog;

  useFrame(({ camera, clock }) => {
    // Keep fog density stable so scrolling does not cause brightness changes
    fog.density = 0.012 + Math.min(journeyState.progress, 1) * 0.004;

    const light = travelLight.current;
    if (!light) return;

    const time = clock.getElapsedTime();

    // Key light follows camera at a fixed subtle intensity
    light.position.set(
      camera.position.x + Math.sin(time * 0.2) * 1.2,
      camera.position.y + 1.0,
      camera.position.z - 8
    );
    light.intensity = 1.8;
  });

  return (
    <>
      <ambientLight intensity={0.06} color={palette.primary} />
      <pointLight
        ref={travelLight}
        color={palette.primary}
        intensity={1.8}
        distance={18}
        decay={2}
      />
      <directionalLight position={[-6, 4, 3]} intensity={0.1} color={palette.cyan} />
    </>
  );
}
