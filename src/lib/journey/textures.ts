/**
 * Procedural canvas textures for the journey.
 *
 * Generated at runtime rather than shipped as image files: they are pure
 * gradients, so generating them costs a fraction of a millisecond and saves
 * network requests. Each texture is cached so every instance shares one upload.
 */

import * as THREE from 'three';

type TextureKey = 'glow' | 'mote' | 'rail';

const cache = new Map<TextureKey, THREE.Texture>();

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D context unavailable for journey texture');
  return { canvas, ctx };
}

function finalise(canvas: HTMLCanvasElement, key: TextureKey): THREE.Texture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  cache.set(key, texture);
  return texture;
}

/** Soft round falloff — atmospheric haze planes and gate bloom. */
export function glowTexture(): THREE.Texture {
  const existing = cache.get('glow');
  if (existing) return existing;

  const size = 256;
  const { canvas, ctx } = createCanvas(size, size);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  gradient.addColorStop(0.7, 'rgba(255,255,255,0.08)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return finalise(canvas, 'glow');
}

/** Tighter dot with a soft edge — atmospheric dust motes. */
export function moteTexture(): THREE.Texture {
  const existing = cache.get('mote');
  if (existing) return existing;

  const size = 64;
  const { canvas, ctx } = createCanvas(size, size);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return finalise(canvas, 'mote');
}

/**
 * Length-wise fade for the corridor rails, so they dissolve into the fog at
 * both ends instead of terminating on a hard edge.
 */
export function railTexture(): THREE.Texture {
  const existing = cache.get('rail');
  if (existing) return existing;

  const width = 512;
  const { canvas, ctx } = createCanvas(width, 8);
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.8, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, 8);

  return finalise(canvas, 'rail');
}

/** Frees every cached texture — called when the scene unmounts. */
export function disposeJourneyTextures(): void {
  cache.forEach((texture) => texture.dispose());
  cache.clear();
}
