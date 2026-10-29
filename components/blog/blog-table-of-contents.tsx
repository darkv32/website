'use client';

import { useState, useEffect, useMemo } from 'react';
import { List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogTableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Heading text to element id. The article renders its headings with the same ids so the contents can link to them. */
export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const stripMarkdown = (text: string) => text.replace(/[`*_]/g, '').trim();

export function BlogTableOfContents({ content }: BlogTableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState('');

  const headings = useMemo(() => {
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
  }, [content]);

  /* The active entry is the topmost heading inside the band just below the fixed header. */
  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(el);
          else visible.delete(el);
        });
        const topmost = [...visible].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
        if (topmost) setActiveHeading(topmost.id);
      },
      { rootMargin: '-100px 0px -80% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  if (headings.length === 0) return null;

  return (
    <Card className="hidden lg:block">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center">
          <List className="h-4 w-4 mr-2" />
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav className="space-y-1">
          {headings.map((heading, i) => (
            <button
              key={`${heading.id}-${i}`}
              type="button"
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                activeHeading === heading.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
