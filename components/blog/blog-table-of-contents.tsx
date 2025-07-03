'use client';

import { useState, useEffect } from 'react';
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

export function BlogTableOfContents({ content }: BlogTableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(heading => 
        document.getElementById(heading.id)
      ).filter(Boolean);

      const currentHeading = headingElements.find(element => {
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentHeading) {
        setActiveHeading(currentHeading.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

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
          {headings.map((heading) => (
            <button
              key={heading.id}
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