import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/data';
import { getFullUrl } from '@/lib/config';
import { postToMarkdown } from '@/lib/post-text';

/* The post as plain markdown. It is reached as /blog/<slug>.md, or as /blog/<slug> by a client that asks for text/markdown (see the rewrites in next.config.js). */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return new Response('Not found', { status: 404 });

  return new Response(postToMarkdown(post), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      /* Tells search engines the page, not this copy, is the one to list */
      Link: `<${getFullUrl(`/blog/${post.slug}`)}>; rel="canonical"`,
      Vary: 'Accept',
    },
  });
}
