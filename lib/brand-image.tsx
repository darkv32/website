import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from './config';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = 'image/png';

const INK = '#e6eded';
const BG = '#0b0e0f';
const ACCENT = '#5fd0dc';
const MUTED = '#8b9a9d';

interface CardProps {
  /** Small line above the title, e.g. the section or the post's category. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/** A long title steps down a size so it still fits in three lines. */
const titleSize = (title: string) => (title.length > 70 ? 56 : title.length > 40 ? 72 : title.length > 20 ? 96 : 112);

/** The share card for a page, drawn in the site's dark palette. Every page's `opengraph-image` goes through it. */
export function renderCard({ eyebrow, title, subtitle }: CardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 96px',
          background: BG,
          color: INK,
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: ACCENT }}>{eyebrow ?? SITE_CONFIG.site.name}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: titleSize(title), fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{title}</div>
          {subtitle && <div style={{ display: 'flex', marginTop: 24, fontSize: 36, color: ACCENT }}>{subtitle}</div>}
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: MUTED }}>
          {SITE_CONFIG.site.name} · {SITE_CONFIG.baseUrl.replace('https://', '')}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

/** The "TYT" monogram from the nav bar, as a square PNG of any size. */
export function renderIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BG,
          color: ACCENT,
          fontSize: size * 0.42,
          fontWeight: 700,
          letterSpacing: -size * 0.02,
        }}
      >
        TYT
      </div>
    ),
    { width: size, height: size },
  );
}
