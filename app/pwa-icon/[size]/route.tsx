import { notFound } from 'next/navigation';
import { renderIcon } from '@/lib/brand-image';

/* The web manifest needs icons at a fixed URL, which the hashed `icon` route cannot give it. */
const SIZES = [192, 512];

export const dynamicParams = false;

export function generateStaticParams() {
  return SIZES.map((size) => ({ size: String(size) }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const size = Number((await params).size);
  if (!SIZES.includes(size)) notFound();
  return renderIcon(size);
}
