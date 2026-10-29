import { getFullUrl } from '@/lib/config';

/** One JSON-LD block. `<` is escaped so post content can never close the script tag. */
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function BreadcrumbData({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: getFullUrl(item.url),
        })),
      }}
    />
  );
}
