import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // The front page carries every section; each section also has a page of its own
  const staticPages = [
    {
      url: SITE_CONFIG.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: getFullUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...['/about', '/experience', '/hobbies', '/contact'].map((path) => ({
      url: getFullUrl(path),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const blogPages = getAllBlogPosts().map((post) => ({
    url: getFullUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
