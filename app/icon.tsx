import { renderIcon } from '@/lib/brand-image';

/* Search engines want a favicon that is a multiple of 48px. */
export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

export default function Icon() {
  return renderIcon(size.width);
}
