'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function AmbientLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const scrollProgress = useScrollProgress();

  useFrame(({ clock }) => {
    if (!lightRef.current) return;

    const t = clock.getElapsedTime();

    // Slow circular movement
    const radius = 8;
    const speed = 0.15;
    
    lightRef.current.position.x = Math.cos(t * speed) * radius;
    lightRef.current.position.z = Math.sin(t * speed) * radius - 5;
    lightRef.current.position.y = Math.sin(t * 0.2) * 3;

    // Subtle intensity pulse
    lightRef.current.intensity = 0.6 + Math.sin(t * 0.25) * 0.2;

    // Scroll-based position adjustment
    lightRef.current.position.y += scrollProgress * 2;
  });

  return (
    <>
      {/* Main ambient light */}
      <ambientLight intensity={0.15} color="#39D98A" />
      
      {/* Moving point light */}
      <pointLight
        ref={lightRef}
        position={[0, 2, -5]}
        intensity={0.6}
        color="#39D98A"
        distance={15}
        decay={2}
      />
      
      {/* Subtle fill light */}
      <directionalLight
        position={[-5, 3, 2]}
        intensity={0.2}
        color="#78F2B0"
      />
    </>
  );
}
