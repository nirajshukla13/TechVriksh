'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface EnvironmentParticlesProps {
  count: number;
  mouseX: number;
  mouseY: number;
}

export function EnvironmentParticles({ count, mouseX, mouseY }: EnvironmentParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollProgress = useScrollProgress();

  const { positions, velocities, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const size = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spread particles in 3D space
      pos[i3] = (Math.random() - 0.5) * 25; // x
      pos[i3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i3 + 2] = -15 + Math.random() * 20; // z (depth)

      // Very slow velocities
      vel[i3] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 2] = Math.random() * 0.005;

      // Varying sizes
      size[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions: pos, velocities: vel, sizes: size };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const position = pointsRef.current.geometry.getAttribute('position');
    const array = position.array as Float32Array;

    const scrollDrift = scrollProgress * 0.3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update with velocity
      array[i3] += velocities[i3] * delta * 10;
      array[i3 + 1] += velocities[i3 + 1] * delta * 10;
      array[i3 + 2] += velocities[i3 + 2] * delta * 10 + scrollDrift * delta;

      // Very subtle mouse influence
      array[i3] += mouseX * 0.02 * delta;
      array[i3 + 1] += mouseY * 0.015 * delta;

      // Wrap boundaries
      if (array[i3] > 12) array[i3] = -12;
      if (array[i3] < -12) array[i3] = 12;
      if (array[i3 + 1] > 10) array[i3 + 1] = -10;
      if (array[i3 + 1] < -10) array[i3 + 1] = 10;
      if (array[i3 + 2] > 5) array[i3 + 2] = -15;
    }

    position.needsUpdate = true;

    // Very subtle overall rotation
    pointsRef.current.rotation.y += delta * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#39D98A"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
