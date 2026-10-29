'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import p from './pages.module.css';

/** Fades its children up the first time they scroll into view. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${p.reveal} ${seen ? p.seen : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}
