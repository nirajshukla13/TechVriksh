'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface DigitalGridProps {
  mouseX: number;
  mouseY: number;
}

export function DigitalGrid({ mouseX, mouseY }: DigitalGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useScrollProgress();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Create grid line points with perspective
  const gridLines = useMemo(() => {
    const lines: Array<{ points: THREE.Vector3[]; opacity: number }> = [];

    // Reduce grid complexity on mobile
    const gridWidth = isMobile ? 20 : 30;
    const gridDepth = isMobile ? 15 : 25;
    const spacingX = isMobile ? 3 : 2;
    const spacingZ = isMobile ? 2 : 1.5;

    // Horizontal lines (going into depth)
    for (let x = -gridWidth / 2; x <= gridWidth / 2; x += spacingX) {
      const points: THREE.Vector3[] = [];
      for (let z = -gridDepth; z <= 5; z += 0.5) {
        const fade = Math.max(0, 1 - Math.abs(z + gridDepth / 2) / (gridDepth / 2));
        const wave = Math.sin(x * 0.2 + z * 0.1) * 0.3;
        points.push(new THREE.Vector3(x, wave * fade, z));
      }
      lines.push({ points, opacity: 0.08 });
    }

    // Vertical lines (perpendicular)
    for (let z = -gridDepth; z <= 5; z += spacingZ * 2) {
      const points: THREE.Vector3[] = [];
      for (let x = -gridWidth / 2; x <= gridWidth / 2; x += 0.5) {
        const fade = Math.max(0, 1 - Math.abs(z + gridDepth / 2) / (gridDepth / 2));
        const wave = Math.sin(x * 0.2 + z * 0.1) * 0.3;
        points.push(new THREE.Vector3(x, wave * fade, z));
      }
      lines.push({ points, opacity: 0.06 });
    }

    return lines;
  }, [isMobile]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    // Slow wave movement
    groupRef.current.position.y = -3 + Math.sin(t * 0.15) * 0.2;
    groupRef.current.position.x = mouseX * 0.3;

    // Scroll-based depth movement
    groupRef.current.position.z = -10 + scrollProgress * 2;

    // Very subtle rotation
    groupRef.current.rotation.y = mouseX * 0.05 + Math.sin(t * 0.1) * 0.02;
    groupRef.current.rotation.x = -0.3 + mouseY * 0.03;
  });

  return (
    <group ref={groupRef}>
      {gridLines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color="#39D98A"
          lineWidth={0.5}
          transparent
          opacity={line.opacity}
          depthWrite={false}
        />
      ))}
    </group>
  );
}
