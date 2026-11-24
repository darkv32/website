'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/dom';
import { c } from './cls';

/** A diagram whose animation runs while it is on screen. The loop pauses when it scrolls away, and the buttons pause, resume and restart it. The drawing itself comes in as children; the stylesheet does the animating once the figure has the `play` class. */
export function AnimFigure({ children, caption }: { children: ReactNode; caption: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [held, setHeld] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setPlaying(entry.isIntersecting);
        if (!entry.isIntersecting) setHeld(false);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    if (!playing) {
      setHeld(false);
      setPlaying(true);
    } else {
      setHeld((h) => !h);
    }
  };

  /* A new key rebuilds the drawing, which starts every animation again from its first frame. */
  const restart = () => {
    setHeld(false);
    setPlaying(true);
    setRun((r) => r + 1);
  };

  return (
    <figure ref={ref} className={c(`fig${playing ? ' play' : ''}${held ? ' hold' : ''}`)}>
      <div key={run}>{children}</div>
      <div className={c('ctl')}>
        <span className={c('anim-tag')}>Animated</span>
        <button type="button" onClick={toggle}>
          {!playing ? 'Play' : held ? 'Resume' : 'Pause'}
        </button>
        <button type="button" onClick={restart}>
          Restart
        </button>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
