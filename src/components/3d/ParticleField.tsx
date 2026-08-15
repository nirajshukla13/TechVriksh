'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface ParticleFieldProps {
  count: number;
  color: string;
  opacity: number;
  speed: number;
  depth: 'background' | 'middle' | 'foreground';
  mouseX: number;
  mouseY: number;
}

export function ParticleField({
  count,
  color,
  opacity,
  speed,
  depth,
  mouseX,
  mouseY
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollProgress = useScrollProgress();

  const depthOffset = depth === 'background' ? -8 : depth === 'middle' ? -4 : -2;
  const depthRange = depth === 'background' ? 6 : depth === 'middle' ? 4 : 2;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = depthOffset + Math.random() * depthRange;

      vel[i3] = (Math.random() - 0.5) * speed;
      vel[i3 + 1] = (Math.random() - 0.5) * speed;
      vel[i3 + 2] = (Math.random() - 0.5) * speed * 0.5;
    }

    return { positions: pos, velocities: vel };
  }, [count, speed, depthOffset, depthRange]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const position = pointsRef.current.geometry.getAttribute('position');
    const array = position.array as Float32Array;

    // Mouse influence
    const mouseInfluence = depth === 'foreground' ? 0.15 : depth === 'middle' ? 0.08 : 0.04;
    
    // Scroll influence
    const scrollDrift = scrollProgress * (depth === 'background' ? 0.5 : depth === 'middle' ? 0.3 : 0.2);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update position with velocity
      array[i3] += velocities[i3] * delta * 10;
      array[i3 + 1] += velocities[i3 + 1] * delta * 10;
      array[i3 + 2] += velocities[i3 + 2] * delta * 10 + scrollDrift * delta;

      // Add mouse influence
      array[i3] += mouseX * mouseInfluence * delta;
      array[i3 + 1] += mouseY * mouseInfluence * delta;

      // Wrap around boundaries
      if (array[i3] > 10) array[i3] = -10;
      if (array[i3] < -10) array[i3] = 10;
      if (array[i3 + 1] > 10) array[i3 + 1] = -10;
      if (array[i3 + 1] < -10) array[i3 + 1] = 10;
      if (array[i3 + 2] > 2) array[i3 + 2] = depthOffset;
      if (array[i3 + 2] < depthOffset) array[i3 + 2] = 2;
    }

    position.needsUpdate = true;

    // Subtle rotation
    pointsRef.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={depth === 'foreground' ? 0.04 : depth === 'middle' ? 0.03 : 0.02}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
