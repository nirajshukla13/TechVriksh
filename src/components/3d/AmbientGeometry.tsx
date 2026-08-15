'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface AmbientGeometryProps {
  position: [number, number, number];
  size: number;
  type: 'plane' | 'box';
  color: string;
  opacity: number;
  rotationSpeed?: number;
}

export function AmbientGeometry({
  position,
  size,
  type,
  color,
  opacity,
  rotationSpeed = 0.1
}: AmbientGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useScrollProgress();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime();

    // Slow floating
    meshRef.current.position.y = position[1] + Math.sin(t * 0.2 + position[0]) * 0.4;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.15 + position[2]) * 0.3;

    // Very slow rotation
    meshRef.current.rotation.x = t * rotationSpeed * 0.05;
    meshRef.current.rotation.y = t * rotationSpeed * 0.08;
    meshRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;

    // Scroll-based depth
    meshRef.current.position.z = position[2] + scrollProgress * 1.5;

    // Subtle opacity pulse
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = opacity + Math.sin(t * 0.3 + position[0]) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'plane' ? (
        <planeGeometry args={[size, size, 1, 1]} />
      ) : (
        <boxGeometry args={[size, size * 0.1, size]} />
      )}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
