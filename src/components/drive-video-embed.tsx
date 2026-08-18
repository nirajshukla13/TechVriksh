'use client';

import { useState } from 'react';

function extractDriveId(url: string) {
  const match = url.match(/\/d\/([^/]+)/) ?? url.match(/[?&]id=([^&]+)/);
  return match ? match[1] : url;
}

export function DriveVideoEmbed({ url, title }: { url: string; title: string }) {
  const fileId = extractDriveId(url);
  const [loaded, setLoaded] = useState(false);

  return (
    /**
     * Mobile fix: the outer container uses `relative` + `pb-[56.25%]` (16:9
     * padding trick) to create a responsive aspect-ratio box. The iframe is
     * then absolutely positioned to fill it. This avoids the mobile bug where
     * a fixed height would clip the video once playback starts and the
     * browser's native video controls changed the layout.
     *
     * The `overflow-hidden` + `rounded` on the outer wrapper clip the iframe
     * to the card shape so the Google Drive chrome doesn't spill out.
     */
    <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {/* Low-flicker placeholder while iframe loads */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--tv-primary)]/30 border-t-[color:var(--tv-primary)]" />
              <span className="tv-mono text-xs uppercase tracking-[0.2em] text-[color:var(--tv-text-muted)]">
                Loading video…
              </span>
            </div>
          </div>
        )}
        <iframe
          src={`https://drive.google.com/file/d/${fileId}/preview`}
          title={title}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
