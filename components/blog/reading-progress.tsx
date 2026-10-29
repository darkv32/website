'use client';

import { useEffect, useRef } from 'react';

/** A bar across the top of the page that fills as the element with `targetId` scrolls through the viewport. It writes to the DOM directly, so scrolling never re-renders React. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const bar = barRef.current;
    if (!target || !bar) return;

    let queued = false;
    const update = () => {
      queued = false;
      const rect = target.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (innerHeight - rect.top) / rect.height));
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    };
    const queue = () => {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    queue();
    return () => {
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
    };
  }, [targetId]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left bg-primary" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
