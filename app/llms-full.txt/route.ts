import { getAllBlogPosts } from '@/lib/data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';
import { postToMarkdown } from '@/lib/post-text';

/* Everything on the blog in one plain-text file, for a model that wants the writing itself rather than a map of it (https://llmstxt.org). */
export const dynamic = 'force-static';

export function GET() {
  const { blog } = SITE_CONFIG;
  const posts = getAllBlogPosts();

  const body = `# ${blog.title}

> ${blog.description}

This is the full text of every post on ${getFullUrl('/blog')}, newest first. The site map is at ${getFullUrl('/llms.txt')}.

${posts.map((post) => `${postToMarkdown(post, { headingLevel: 2 })}`).join('\n---\n\n')}`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
