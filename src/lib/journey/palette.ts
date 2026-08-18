/**
 * Journey palette.
 *
 * The 3D layer must never hard-code brand colours — they live as CSS custom
 * properties in `src/app/globals.css`. This module reads those tokens once on
 * the client so the WebGL scene and the DOM stay on a single source of truth.
 */

export type JourneyAccent = 'primary' | 'light' | 'cyan';

export interface JourneyPalette {
  bg: string;
  bgDeep: string;
  primary: string;
  primaryLight: string;
  cyan: string;
}

/** Compile-time fallbacks, used during SSR and if a token is ever removed. */
const FALLBACK: JourneyPalette = {
  bg: '#07110F',
  bgDeep: '#040a08',
  primary: '#39D98A',
  primaryLight: '#78F2B0',
  cyan: '#6befd7'
};

const TOKEN_MAP: Record<keyof JourneyPalette, string> = {
  bg: '--tv-bg',
  bgDeep: '--tv-bg-deep',
  primary: '--tv-primary',
  primaryLight: '--tv-primary-light',
  cyan: '--tv-cyan'
};

let cached: JourneyPalette | null = null;

/**
 * Resolves the journey palette from CSS custom properties.
 * Result is cached — token values are static for the lifetime of the page.
 */
export function getJourneyPalette(): JourneyPalette {
  if (cached) return cached;
  if (typeof window === 'undefined') return FALLBACK;

  const styles = window.getComputedStyle(document.documentElement);
  const resolved = { ...FALLBACK };

  (Object.keys(TOKEN_MAP) as Array<keyof JourneyPalette>).forEach((key) => {
    const value = styles.getPropertyValue(TOKEN_MAP[key]).trim();
    if (value) resolved[key] = value;
  });

  cached = resolved;
  return resolved;
}

export function accentColor(accent: JourneyAccent): string {
  const palette = getJourneyPalette();
  if (accent === 'light') return palette.primaryLight;
  if (accent === 'cyan') return palette.cyan;
  return palette.primary;
}
