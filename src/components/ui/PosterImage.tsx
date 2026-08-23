import Image from 'next/image';

interface PosterImageProps {
  src: string;
  alt: string;
  /** Passed to both layers so the browser fetches one optimized file, not two. */
  sizes: string;
  priority?: boolean;
  /**
   * Where the poster sits inside the box. Wide banners use `right` so the copy
   * overlaid on the left half never lands on the artwork.
   */
  align?: 'center' | 'right';
  /**
   * Defaults from `isPoster(src)`: real posters are contained, the landscape
   * `/sample/*.svg` placeholders are covered. Pass it explicitly only to
   * override that — a photograph stored as a `.jpg` that wants cropping, say.
   */
  fit?: 'contain' | 'cover';
}

/**
 * The `/sample/*.svg` covers are placeholder graphics drawn landscape — 1400×820
 * and 1200×800 — to fill whatever box they are given. The Google Drive covers are
 * the real event posters, and every one of those is portrait or square. Only the
 * posters need containing; letterboxing a placeholder that already fits would be
 * a step backwards.
 */
export function isPoster(src: string) {
  return !src.endsWith('.svg');
}

/**
 * An event poster shown *whole*.
 *
 * Every cover in `data.ts` is a designed poster, and twelve of the thirteen are
 * portrait (six at exactly 0.707 — A-series paper). Dropping those into the
 * landscape boxes the cards used meant `object-cover` threw away most of the
 * artwork: 53–75% survived on the homepage, 35–48% in the events grid, and only
 * 26% in the hackathon hero. Titles, dates and speaker names — the parts of a
 * poster that carry the information — sit at the top and bottom, which is exactly
 * what a centre crop removes.
 *
 * So the poster is `object-contain`: never cropped, whatever its ratio. The gap
 * that leaves is filled by the same image, cover-cropped and blurred, so the box
 * reads as the poster's own colour wash rather than black letterbox bars. Both
 * layers share one `src` and one `sizes`, so this is still a single download.
 */
export function PosterImage({
  src,
  alt,
  sizes,
  priority = false,
  align = 'center',
  fit,
}: PosterImageProps) {
  // Derived rather than defaulted to `'contain'`, so dropping a landscape
  // placeholder into any of these boxes cannot silently letterbox it.
  const mode = fit ?? (isPoster(src) ? 'contain' : 'cover');

  if (mode === 'cover') {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <>
      {/* Colour wash. Decorative — it shows nothing the poster above doesn't, so
          it stays out of the accessibility tree. `scale-125` pushes the blur's
          soft edge outside the box, which would otherwise feather to transparent. */}
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        className="scale-125 object-cover blur-2xl saturate-150 transition-transform duration-700 ease-out group-hover:scale-[1.32]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#040907]/45" />

      {/* The poster. No transform on hover: any scale on a contained image starts
          cropping it again, which is the bug this component exists to fix. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-contain ${align === 'right' ? 'object-right' : 'object-center'}`}
      />
    </>
  );
}
