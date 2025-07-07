import { MetadataRoute } from 'next';
import { getAllBlogPosts, getSiteData } from '@/lib/data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const { site } = getSiteData();
  const blogPosts = getAllBlogPosts();

  // Static pages
  const staticPages = [
    {
      url: SITE_CONFIG.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: getFullUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: getFullUrl('/experience'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: getFullUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: getFullUrl('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Blog post pages
  const blogPages = blogPosts.map((post) => ({
    url: getFullUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
} 