import { OG_SIZE, OG_TYPE, renderCard } from '@/lib/brand-image';

export const alt = "Tang Yetong's work and education timeline";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function OpenGraphImage() {
  return renderCard({ eyebrow: 'Experience', title: 'Experience', subtitle: 'RFCOM · Fivetran · GovTech · Bitcoin Dev Kit · NUS' });
}
