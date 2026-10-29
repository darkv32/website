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
    icons: [{ src: '/logo-white.png', sizes: '550x507', type: 'image/png' }],
  };
}
