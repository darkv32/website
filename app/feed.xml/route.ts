import { getAllBlogPosts } from '@/lib/data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

/* The feed only changes when a post does, so it is built once with the site instead of on every request. */
export const dynamic = 'force-static';

const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const { site } = SITE_CONFIG;
  const posts = getAllBlogPosts();
  const latest = new Date(Math.max(...posts.map((post) => Date.parse(post.updatedAt)))).toUTCString();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt)}</description>
      <link>${getFullUrl(`/blog/${post.slug}`)}</link>
      <guid>${getFullUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${site.email} (${escapeXml(site.author)})</author>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('')}
    </item>`,
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <description>${escapeXml(site.description)}</description>
    <link>${SITE_CONFIG.baseUrl}</link>
    <atom:link href="${getFullUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <pubDate>${latest}</pubDate>
    <ttl>60</ttl>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
