import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  const { site, seo } = SITE_CONFIG;
  return {
    name: `${site.name} - Full Stack Developer`,
    short_name: site.name,
    description: site.bio,
    start_url: '/',
    display: 'standalone',
    background_color: seo.themeColor,
    theme_color: seo.themeColor,
    icons: [
      { src: '/pwa-icon/192', sizes: '192x192', type: 'image/png' },
      { src: '/pwa-icon/512', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
