import { OG_SIZE, OG_TYPE, renderCard } from '@/lib/brand-image';

export const alt = "Tang Yetong's hobbies: anime and StarCraft II";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OpenGraphImage() {
  return renderCard({ eyebrow: 'Hobbies', title: 'Off the clock', subtitle: 'Anime and StarCraft II as Terran' });
}
