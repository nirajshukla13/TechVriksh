/**
 * Journey configuration — the single source of truth for the scroll-driven
 * camera path and every object placed along it.
 *
 * The page is one continuous corridor in Z. Each homepage section owns a
 * "station": a point in space the camera flies through at a known scroll
 * progress. Scrolling never fades a background in or out — it physically moves
 * a real perspective camera down the corridor.
 *
 * Storytelling arc (mirrors the homepage section order):
 *   hero       → The Beginning      — introduce Tech Vriksh
 *   community  → The People         — who is here and what they get
 *   highlights → The Experience     — what sessions actually look like
 *   events     → The Opportunity    — what is happening right now
 *   projects   → The Creation       — what members have built
 *   india      → The Expansion      — the community across India
 *   cta        → Your Turn          — join
 */

import * as THREE from 'three';
import type { JourneyAccent } from './palette';

export interface JourneyStation {
  /** Matches the `data-station` attribute on the corresponding DOM section. */
  id: string;
  label: string;
  /** World-space centre of the station's gate. */
  position: [number, number, number];
  /** Half-width / half-height of the gate frame the camera passes through. */
  gate: [number, number];
  accent: JourneyAccent;
}

/** Depth between consecutive stations, in world units. */
const STATION_SPACING = 18;

/** Where the camera starts, just in front of the first gate. */
export const JOURNEY_START_Z = 8;

/**
 * Stations in scroll order. Lateral (x) and vertical (y) offsets alternate so
 * the flight path curves instead of running dead straight — that curvature is
 * what makes the parallax read as motion rather than a zoom.
 */
export const STATIONS: JourneyStation[] = [
  {
    id: 'hero',
    label: 'The Beginning — Build. Learn. Grow.',
    position: [0, 0, -STATION_SPACING * 0],
    gate: [6.4, 4.0],
    accent: 'primary',
  },
  {
    id: 'community',
    label: 'The People — who make it real',
    position: [-2.6, 0.9, -STATION_SPACING * 1],
    gate: [5.8, 3.6],
    accent: 'light',
  },
  {
    id: 'highlights',
    label: 'The Experience — what sessions look like',
    position: [2.4, -1.1, -STATION_SPACING * 2],
    gate: [6.6, 4.2],
    accent: 'primary',
  },
  {
    id: 'events',
    label: "The Opportunity — what's happening now",
    position: [-2.2, -0.8, -STATION_SPACING * 3],
    gate: [6.0, 3.8],
    accent: 'cyan',
  },
  {
    id: 'projects',
    label: 'The Creation — built by the community',
    position: [2.0, 1.0, -STATION_SPACING * 4],
    gate: [6.4, 4.0],
    accent: 'light',
  },
  {
    id: 'recap',
    label: '2025 Recap — a year in one video',
    position: [0, 1.4, -STATION_SPACING * 5],
    gate: [7.2, 4.6],
    accent: 'primary',
  },
  {
    id: 'india',
    label: 'The Expansion — across India',
    position: [2.8, 0.6, -STATION_SPACING * 6],
    gate: [6.2, 4.0],
    accent: 'light',
  },
  {
    id: 'cta',
    label: 'Your Turn — join Tech Vriksh',
    position: [0, 0, -STATION_SPACING * 7],
    gate: [8.0, 5.0],
    accent: 'primary',
  },
];

/** Furthest point the camera reaches. */
export const JOURNEY_END_Z = STATIONS[STATIONS.length - 1].position[2] - 10;

/** Total corridor length — used to lay out dust and rails. */
export const JOURNEY_LENGTH = JOURNEY_START_Z - JOURNEY_END_Z;

/**
 * Smooth camera path through every station.
 *
 * A Catmull-Rom curve keeps the flight continuous (no direction snap at a
 * station) and gives us `getPointAt` for uniform-speed travel, so a constant
 * scroll rate produces a constant flight rate.
 */
export const CAMERA_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, JOURNEY_START_Z),
    ...STATIONS.map(({ position }) => new THREE.Vector3(...position)),
    new THREE.Vector3(0, 0, JOURNEY_END_Z)
  ],
  false,
  'catmullrom',
  0.45
);

/** Scroll progress (0–1) at which the camera reaches a given station. */
export function stationProgress(index: number): number {
  return (index + 1) / (STATIONS.length + 1);
}

/** Fog tightens mid-journey then opens out for the CTA, so arrival feels earned. */
export function fogDensityAt(progress: number): number {
  const swell = Math.sin(progress * Math.PI);
  return 0.018 + swell * 0.016;
}

/** Mote counts are the main performance dial. */
export const MOTE_COUNT = { mobile: 220, desktop: 700 } as const;
