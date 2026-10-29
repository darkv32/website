'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** The five sections, in order. `key` is the single-key shortcut and `href` the section's own page. */
export const SECTIONS = [
  { id: 'hero', name: 'About', key: 'a', href: '/about' },
  { id: 'experience', name: 'Experience', key: 'e', href: '/experience' },
  { id: 'blogs', name: 'Blog', key: 'b', href: '/blog' },
  { id: 'off', name: 'Hobbies', key: 'h', href: '/hobbies' },
  { id: 'contact', name: 'Contact', key: 'c', href: '/contact' },
] as const;

/**
 * A link always points at the section's own page, so crawlers can follow it from the front page too.
 * On the front page a plain click scrolls to the band instead; `href` overrides the destination (the logo uses it to go home).
 */
export function SectionLink({ id, href, onClick, ...props }: { id: string; href?: string } & Omit<ComponentProps<typeof Link>, 'href'>) {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const page = href ?? SECTIONS.find((sec) => sec.id === id)?.href ?? '/';
  return (
    <Link
      {...props}
      href={page}
      onClick={(e) => {
        onClick?.(e);
        const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
        if (onHome && !modified && !e.defaultPrevented) {
          e.preventDefault();
          document.getElementById(id)?.scrollIntoView({ block: 'start' });
        }
      }}
    />
  );
}
