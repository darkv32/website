export interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Heading text to element id. The article renders its headings with the same ids so the contents can link to them. */
export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const stripMarkdown = (text: string) => text.replace(/[`*_]/g, '').trim();

/** The ATX headings of a markdown document, skipping anything inside a code fence. */
export function extractHeadings(content: string): Heading[] {
  const found: Heading[] = [];
  let inFence = false;
  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    const match = !inFence && /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match) continue;
    const text = stripMarkdown(match[2]);
    found.push({ id: slugify(text), text, level: match[1].length });
  }
  return found;
}
