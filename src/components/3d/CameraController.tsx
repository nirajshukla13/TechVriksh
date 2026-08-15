'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import * as THREE from 'three';

interface CameraControllerProps {
  mouseX: number;
  mouseY: number;
}

export function CameraController({ mouseX, mouseY }: CameraControllerProps) {
  const { camera } = useThree();
  const scrollProgress = useScrollProgress();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    // Very subtle mouse parallax
    const mouseInfluenceX = mouseX * 0.3;
    const mouseInfluenceY = mouseY * 0.2;

    // Scroll influence - camera moves forward through the grid
    const scrollZ = 6 - scrollProgress * 2.5; // From 6 to 3.5

    // Update target position
    targetPosition.current.set(
      mouseInfluenceX,
      mouseInfluenceY,
      scrollZ
    );

    // Very smooth lerp
    camera.position.lerp(targetPosition.current, 0.04);

    // Subtle look-at with mouse offset
    const lookAtTarget = new THREE.Vector3(
      mouseX * 0.15,
      mouseY * 0.1,
      0
    );

    // Smooth camera direction
    const currentDirection = new THREE.Vector3();
    camera.getWorldDirection(currentDirection);
    currentDirection.lerp(lookAtTarget.clone().sub(camera.position).normalize(), 0.02);
    
    camera.lookAt(camera.position.clone().add(currentDirection));
  });

  return null;
}
