'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_CURVE } from '@/lib/journey/config';
import { journeyState } from '@/lib/journey/state';

interface JourneyCameraProps {
  /** Scales pointer parallax and idle drift. 0 disables both. */
  motion?: number;
}

/** How far ahead down the corridor the camera aims. */
const LOOK_AHEAD = 8;

/**
 * Drives the real perspective camera along the journey curve.
 *
 * Scroll progress maps to arc length on the curve, so the camera physically
 * travels through the corridor. Pointer movement and scroll velocity only ever
 * add small offsets on top — the spine of the motion is always the scroll.
 *
 * Everything here reads from refs and the mutable `journeyState`, so this
 * component renders exactly once no matter how far the user scrolls.
 */
export function JourneyCamera({ motion = 1 }: JourneyCameraProps) {
  const { camera } = useThree();

  const position = useRef(new THREE.Vector3());
  const tangent = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());
  const pointer = useRef({ x: 0, y: 0 });
  const roll = useRef(0);

  useFrame(({ clock }, delta) => {
    const progress = THREE.MathUtils.clamp(journeyState.progress, 0, 1);

    // Arc-length sampling keeps flight speed constant across the curve.
    CAMERA_CURVE.getPointAt(progress, position.current);
    CAMERA_CURVE.getTangentAt(progress, tangent.current);

    // Frame-rate independent smoothing — same feel at 60fps and 144fps.
    const ease = 1 - Math.pow(0.0015, delta);

    const targetPointerX = journeyState.pointerActive ? journeyState.pointerX : 0;
    const targetPointerY = journeyState.pointerActive ? journeyState.pointerY : 0;
    pointer.current.x += (targetPointerX - pointer.current.x) * ease;
    pointer.current.y += (targetPointerY - pointer.current.y) * ease;

    const time = clock.getElapsedTime();
    // Idle breathing so the corridor stays alive when scrolling stops.
    const driftY = Math.sin(time * 0.24) * 0.12 * motion;
    const driftX = Math.cos(time * 0.19) * 0.1 * motion;

    camera.position.set(
      position.current.x + pointer.current.x * 0.9 * motion + driftX,
      position.current.y + pointer.current.y * 0.6 * motion + driftY,
      position.current.z
    );

    // Aim down the corridor, nudged by the pointer so looking around feels live.
    lookTarget.current
      .copy(position.current)
      .addScaledVector(tangent.current, LOOK_AHEAD);
    lookTarget.current.x += pointer.current.x * 1.6 * motion;
    lookTarget.current.y += pointer.current.y * 1.1 * motion;
    camera.lookAt(lookTarget.current);

    // Banking: fast scrolling rolls the frame a touch, like a camera on a rig.
    const targetRoll = THREE.MathUtils.clamp(journeyState.velocity / 9000, -1, 1) * 0.035 * motion;
    roll.current += (targetRoll - roll.current) * ease;
    camera.rotation.z += roll.current;
  });

  return null;
}
