import { SITE_CONFIG, getFullUrl } from './config';
import { formatDate, type BlogPost } from './data';

/* A post as plain markdown, for agents and tools that would rather not parse the page. Interactive posts keep a plain-text version of their text in `content`, so this works for all of them. */

/** The public path of a post's markdown copy. The post itself also returns it to a client that sends `Accept: text/markdown`. */
export const postMarkdownPath = (slug: string) => `/blog/${slug}.md`;

/** Pushes every markdown heading one level down, leaving code blocks alone (a `# comment` in bash is not a heading). */
function demoteHeadings(markdown: string): string {
  let inFence = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      return !inFence && /^#{1,5}\s/.test(line) ? `#${line}` : line;
    })
    .join('\n');
}

export function postToMarkdown(post: BlogPost, { headingLevel = 1 }: { headingLevel?: 1 | 2 } = {}): string {
  const hashes = '#'.repeat(headingLevel);
  /* Under a level 2 post heading, the post's own `##` sections would sit at the same level, so push them down one. */
  const body = headingLevel === 1 ? post.content : demoteHeadings(post.content);
  const updated = post.updatedAt !== post.publishedAt ? `, updated ${formatDate(post.updatedAt)}` : '';

  return `${hashes} ${post.title}

> ${post.excerpt}

By ${SITE_CONFIG.site.author}. Published ${formatDate(post.publishedAt)}${updated}. ${post.readTime} min read. Category: ${post.category}. Tags: ${post.tags.join(', ')}.
Read it with the interactive demos: ${getFullUrl(`/blog/${post.slug}`)}

${body}
`;
}
