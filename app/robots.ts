import type { MetadataRoute } from 'next';
import { getFullUrl } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: getFullUrl('/sitemap.xml'),
  };
}
