'use client';

import { useEffect, useState } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // Normalized -1 to 1
      const ny = -((e.clientY / window.innerHeight) * 2 - 1); // Normalized -1 to 1

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        nx,
        ny
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
}
