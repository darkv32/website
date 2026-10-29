import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // The front page carries every section; each section also has a page of its own
  const posts = getAllBlogPosts();
  // The only date the site knows is when a post last changed, so only the blog index gets one
  const blogUpdated = new Date(Math.max(...posts.map((post) => Date.parse(post.updatedAt))));

  const staticPages = ['', '/about', '/experience', '/blog', '/hobbies', '/contact'].map((path) => ({
    url: path ? getFullUrl(path) : SITE_CONFIG.baseUrl,
    lastModified: path === '/blog' ? blogUpdated : undefined,
  }));

  const blogPages = posts.map((post) => ({
    url: getFullUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
  }));

  return [...staticPages, ...blogPages];
}
