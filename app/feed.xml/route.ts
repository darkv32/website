import { NextRequest } from 'next/server';
import { getAllBlogPosts, getSiteData } from '@/lib/data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const { site } = getSiteData();
    const posts = getAllBlogPosts();

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.title || 'Tang Yetong - Blog'}</title>
    <description>${site.description || 'Technical blog and portfolio'}</description>
    <link>${SITE_CONFIG.baseUrl}</link>
    <atom:link href="${getFullUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${getFullUrl(`/blog/${post.slug}`)}</link>
      <guid>${getFullUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${post.author?.name || 'Tang Yetong'}</author>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    // Return a minimal RSS feed in case of error
    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tang Yetong - Blog</title>
    <description>Technical blog and portfolio</description>
    <link>${SITE_CONFIG.baseUrl}</link>
    <atom:link href="${getFullUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
  </channel>
</rss>`;

    return new Response(fallbackRss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
} 