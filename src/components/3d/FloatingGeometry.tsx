'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface FloatingGeometryProps {
  position: [number, number, number];
  type: 'torus' | 'sphere' | 'octahedron';
  color: string;
  opacity: number;
}

export function FloatingGeometry({ position, type, color, opacity }: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useScrollProgress();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime();

    // Slow floating movement
    meshRef.current.position.y = position[1] + Math.sin(t * 0.3 + position[0]) * 0.5;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.2 + position[1]) * 0.3;
    
    // Gentle rotation
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    
    // Scroll-based drift
    meshRef.current.position.z = position[2] + scrollProgress * 2;
  });

  const geometry = 
    type === 'torus' ? <torusGeometry args={[0.6, 0.2, 16, 32]} /> :
    type === 'sphere' ? <sphereGeometry args={[0.5, 16, 16]} /> :
    <octahedronGeometry args={[0.6, 0]} />;

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        wireframe
        depthWrite={false}
      />
    </mesh>
  );
}
