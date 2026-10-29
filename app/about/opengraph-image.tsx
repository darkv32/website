import { OG_SIZE, OG_TYPE, renderCard } from '@/lib/brand-image';

export const alt = 'About Tang Yetong, a full stack developer in Singapore';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OpenGraphImage() {
  return renderCard({ eyebrow: 'About', title: 'About Tang Yetong', subtitle: 'Full stack developer in Singapore' });
}
