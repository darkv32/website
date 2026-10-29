import { OG_SIZE, OG_TYPE, renderCard } from '@/lib/brand-image';

export const alt = "Tang Yetong's technical blog";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OpenGraphImage() {
  return renderCard({ eyebrow: 'Blog', title: 'Technical Blog', subtitle: 'Bitcoin wallets, Android and internships' });
}
