'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** The five bands of the front page, in order. `key` is the single-key shortcut for each. */
export const SECTIONS = [
  { id: 'hero', name: 'About', key: 'a' },
  { id: 'experience', name: 'Experience', key: 'e' },
  { id: 'blogs', name: 'Blog', key: 'b' },
  { id: 'off', name: 'Hobbies', key: 'h' },
  { id: 'contact', name: 'Contact', key: 'c' },
] as const;

export function scrollToSection(id: string) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

/** Scrolls to the band when already on the front page, otherwise navigates to it. */
export function SectionLink({ id, onClick, ...props }: { id: string } & Omit<ComponentProps<typeof Link>, 'href'>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      href={`/#${id}`}
      onClick={(e) => {
        onClick?.(e);
        if (pathname === '/' && !e.defaultPrevented) {
          e.preventDefault();
          scrollToSection(id);
        }
      }}
    />
  );
}
