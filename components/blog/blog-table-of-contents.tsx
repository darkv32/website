'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Heading } from '@/lib/headings';

export function BlogTableOfContents({ headings }: { headings: Heading[] }) {
  const [activeHeading, setActiveHeading] = useState('');

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
              onClick={() => document.getElementById(heading.id)?.scrollIntoView({ block: 'start' })}
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
