'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

  // Use IntersectionObserver instead of scroll listener for better performance
  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map(heading => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    // Track which headings are visible
    const visibleHeadings = new Map<HTMLElement, boolean>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          visibleHeadings.set(entry.target as HTMLElement, entry.isIntersecting);
        });

        // Find the first visible heading (topmost in viewport)
        const visible = Array.from(visibleHeadings.entries())
          .filter(([_, isVisible]) => isVisible)
          .map(([element]) => element);

        if (visible.length > 0) {
          // Get the topmost visible heading
          const topmost = visible.reduce((top, current) => {
            const topRect = top.getBoundingClientRect();
            const currentRect = current.getBoundingClientRect();
            return currentRect.top < topRect.top ? current : top;
          });

          setActiveHeading(topmost.id);
        }
      },
      {
        rootMargin: '-100px 0px -80% 0px', // Trigger when heading is near top
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    // Observe all heading elements
    headingElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  // Optimized smooth scroll function
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const start = window.pageYOffset;
      const target = element.offsetTop - 100; // Account for fixed header
      const distance = target - start;
      const duration = 600;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

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