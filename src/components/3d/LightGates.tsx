'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { STATIONS } from '@/lib/journey/config';
import { accentColor } from '@/lib/journey/palette';
import { glowTexture } from '@/lib/journey/textures';
import { journeyState } from '@/lib/journey/state';

interface LightGatesProps {
  /** When false the soft bloom plane behind each frame is skipped (mobile). */
  withBloom?: boolean;
}

/**
 * A thin rectangular light frame at every station, which the camera flies
 * through as its section comes into view.
 *
 * Rectangles rather than rings or blobs: the whole site speaks in rounded
 * rectangles (cards, buttons, the map panel), so the 3D layer uses the same
 * geometric vocabulary instead of importing an unrelated shape language.
 */
export function LightGates({ withBloom = true }: LightGatesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bloomTexture = useMemo(() => glowTexture(), []);

  const gates = useMemo(
    () =>
      STATIONS.map((station) => {
        const [halfWidth, halfHeight] = station.gate;
        const color = new THREE.Color(accentColor(station.accent));

        // EdgesGeometry of a plane gives a crisp 1px rectangle outline.
        const plane = new THREE.PlaneGeometry(halfWidth * 2, halfHeight * 2);
        const edges = new THREE.EdgesGeometry(plane);
        plane.dispose();

        return { station, edges, color, halfWidth, halfHeight };
      }),
    []
  );

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();

    group.children.forEach((child, index) => {
      // Each frame breathes gently on its own phase.
      const phase = index * 1.7;
      const pulse = 0.45 + Math.sin(time * 0.2 + phase) * 0.1;

      const lines = child.children[0] as THREE.LineSegments | undefined;
      if (lines) {
        const material = lines.material as THREE.LineBasicMaterial;
        material.opacity = pulse;
      }

      // Frames drift very slowly.
      child.position.x = STATIONS[index].position[0] + Math.sin(time * 0.06 + phase) * 0.06;
      child.position.y = STATIONS[index].position[1] + Math.cos(time * 0.05 + phase) * 0.05;

      const stretch = 1 + THREE.MathUtils.clamp(Math.abs(journeyState.velocity) / 45000, 0, 0.2);
      child.scale.z = stretch;
    });
  });

  return (
    <group ref={groupRef}>
      {gates.map(({ station, edges, color, halfWidth, halfHeight }) => (
        <group key={station.id} position={station.position}>
          <lineSegments geometry={edges}>
            <lineBasicMaterial
              color={color}
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </lineSegments>

          {withBloom && (
            <mesh position={[0, 0, -0.35]}>
              <planeGeometry args={[halfWidth * 3.4, halfHeight * 3.4]} />
              <meshBasicMaterial
                map={bloomTexture}
                color={color}
                transparent
                opacity={0.025}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
