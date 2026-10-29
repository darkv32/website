import { OG_SIZE, OG_TYPE, renderCard } from '@/lib/brand-image';
import { SITE_CONFIG } from '@/lib/config';

export const alt = SITE_CONFIG.site.title;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

/* The preview card for the front page. Every other page has an `opengraph-image` of its own. */
export default function OpenGraphImage() {
  return renderCard({
    title: SITE_CONFIG.site.name,
    subtitle: 'Full stack developer that dabbles in data analytics',
  });
}
