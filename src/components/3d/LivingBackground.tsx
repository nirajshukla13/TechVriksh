'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { DigitalGrid } from './DigitalGrid';
import { AmbientGeometry } from './AmbientGeometry';
import { AmbientLight } from './AmbientLight';
import { EnvironmentParticles } from './EnvironmentParticles';
import { CameraController } from './CameraController';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function Scene() {
  const { nx, ny } = useMousePosition();
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce effects for reduced motion preference or mobile
  const particleCount = reduced ? 15 : isMobile ? 25 : 40;
  const showGeometry = !reduced && !isMobile;

  return (
    <>
      <CameraController mouseX={nx} mouseY={ny} />
      
      {/* Lighting system */}
      <AmbientLight />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#07110F', 5, 20]} />

      {/* Digital grid - main visual element */}
      <DigitalGrid mouseX={nx} mouseY={ny} />

      {/* Environmental dust particles - very subtle */}
      <EnvironmentParticles count={particleCount} mouseX={nx} mouseY={ny} />

      {/* Subtle ambient geometry - only on desktop */}
      {showGeometry && (
        <>
          {/* Background layer */}
          <AmbientGeometry
            position={[-6, 1, -10]}
            size={3}
            type="plane"
            color="#39D98A"
            opacity={0.04}
            rotationSpeed={0.08}
          />
          <AmbientGeometry
            position={[7, -2, -12]}
            size={2.5}
            type="box"
            color="#78F2B0"
            opacity={0.03}
            rotationSpeed={0.06}
          />

          {/* Middle layer */}
          <AmbientGeometry
            position={[4, 3, -6]}
            size={2}
            type="plane"
            color="#6befd7"
            opacity={0.05}
            rotationSpeed={0.1}
          />
          <AmbientGeometry
            position={[-5, -3, -8]}
            size={1.8}
            type="box"
            color="#39D98A"
            opacity={0.04}
            rotationSpeed={0.07}
          />

          {/* Foreground layer - very subtle */}
          <AmbientGeometry
            position={[2, -1, -3]}
            size={1.5}
            type="plane"
            color="#78F2B0"
            opacity={0.03}
            rotationSpeed={0.12}
          />
        </>
      )}
    </>
  );
}

export function LivingBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="tv-canvas-layer">
      <Canvas
        dpr={[1, 1.5]} // Limit DPR for performance
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 25 }}
        gl={{ 
          antialias: false, 
          alpha: true, 
          powerPreference: 'high-performance' 
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
