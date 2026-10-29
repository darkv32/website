import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // The front page carries every section; /blog is the full post list
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
  ];

  const blogPages = getAllBlogPosts().map((post) => ({
    url: getFullUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
