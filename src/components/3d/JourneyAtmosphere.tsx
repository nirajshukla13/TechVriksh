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
    () => new THREE.FogExp2(new THREE.Color(palette.bg).getHex(), fogDensityAt(0)),
    [palette.bg]
  );

  // Assigning through the imperative API keeps one Fog instance for the whole
  // session; `attach="fog"` would recreate it whenever this component rendered.
  if (scene.fog !== fog) scene.fog = fog;

  useFrame(({ camera, clock }) => {
    fog.density = fogDensityAt(THREE.MathUtils.clamp(journeyState.progress, 0, 1));

    const light = travelLight.current;
    if (!light) return;

    const time = clock.getElapsedTime();

    // A key light that travels just ahead of the camera, so whichever gate the
    // camera is approaching is the brightest thing in frame.
    light.position.set(
      camera.position.x + Math.sin(time * 0.3) * 2.5,
      camera.position.y + 1.5,
      camera.position.z - 9
    );
    light.intensity = 6 + Math.sin(time * 0.4) * 1.4;
  });

  return (
    <>
      <ambientLight intensity={0.22} color={palette.primary} />
      <pointLight
        ref={travelLight}
        color={palette.primary}
        intensity={6}
        distance={34}
        decay={2}
      />
      {/* Cool counter-light stops the green from reading as monochrome. */}
      <directionalLight position={[-6, 4, 3]} intensity={0.25} color={palette.cyan} />
    </>
  );
}
