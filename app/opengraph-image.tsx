import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/config';

export const alt = SITE_CONFIG.site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* The preview card for every page that does not bring its own image, drawn in the site's dark palette. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#0b0e0f',
          color: '#e6eded',
        }}
      >
        <div style={{ display: 'flex', fontSize: 112, fontWeight: 700, letterSpacing: -2 }}>{SITE_CONFIG.site.name}</div>
        <div style={{ display: 'flex', marginTop: 24, fontSize: 40, color: '#5fd0dc' }}>
          Full stack developer that dabbles in data analytics
        </div>
        <div style={{ display: 'flex', marginTop: 48, fontSize: 28, color: '#8b9a9d' }}>
          {SITE_CONFIG.site.location} · {SITE_CONFIG.baseUrl.replace('https://', '')}
        </div>
      </div>
    ),
    size,
  );
}
