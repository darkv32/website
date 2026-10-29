import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // The front page carries every section; each section also has a page of its own
  const staticPages = ['', '/about', '/experience', '/blog', '/hobbies', '/contact'].map((path) => ({
    url: path ? getFullUrl(path) : SITE_CONFIG.baseUrl,
  }));

  const blogPages = getAllBlogPosts().map((post) => ({
    url: getFullUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
  }));

  return [...staticPages, ...blogPages];
}
