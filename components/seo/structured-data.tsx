'use client';

import Script from 'next/script';
import { getFullUrl } from '@/lib/config';

interface StructuredDataProps {
  data: any;
  type?: 'application/ld+json' | 'application/json';
}

export function StructuredData({ data, type = 'application/ld+json' }: StructuredDataProps) {
  if (!data) return null;

  return (
    <Script
      id="structured-data"
      type={type}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

interface BreadcrumbDataProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbData({ items }: BreadcrumbDataProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getFullUrl(item.url),
    })),
  };

  return <StructuredData data={breadcrumbData} />;
} 