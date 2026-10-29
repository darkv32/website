import type { CSSProperties } from 'react';
import s from './field.module.css';

export const ANIME = [
  { name: 'Made in Abyss', src: '/field/a1.jpg' },
  { name: 'Quan Zhi Gao Shou', src: '/field/a2.jpg' },
  { name: 'Bleach', src: '/field/a3.jpg' },
  { name: 'Grand Blue Dreaming', src: '/field/a4.jpg' },
  { name: 'Call of the Night', src: '/field/a5.jpg' },
];

export interface Bubble { id: number; style: CSSProperties }

/* Seeded so server and client render the same first bubbles. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeBubble(id: number, rnd: () => number): Bubble {
  const size = 8 + rnd() * 30;
  return {
    id,
    style: {
      left: `${(rnd() * 100).toFixed(1)}%`,
      width: `${size.toFixed(0)}px`,
      height: `${size.toFixed(0)}px`,
      '--d': `${(16 + rnd() * 18).toFixed(1)}s`,
      '--dl': `-${(rnd() * 30).toFixed(1)}s`,
      '--sw': `${((rnd() - 0.5) * 70).toFixed(0)}px`,
      '--y': `${(rnd() * 90).toFixed(0)}%`,
    } as CSSProperties,
  };
}

/** The same bubbles on every render, so the server and the client agree. */
export function seededBubbles(count: number): Bubble[] {
  const rnd = mulberry32(2026);
  return Array.from({ length: count }, (_, i) => makeBubble(i, rnd));
}

/** Bubbles rise the full height of `section`, and pause while it is off screen. Returns the cleanup. */
export function trackBubbleBand(section: HTMLElement, bubbles: HTMLElement) {
  const ro = new ResizeObserver(() => bubbles.style.setProperty('--rise', section.offsetHeight + 80 + 'px'));
  ro.observe(section);
  const io = new IntersectionObserver((entries) => bubbles.classList.toggle(s.paused, !entries[0].isIntersecting));
  io.observe(section);
  return () => {
    ro.disconnect();
    io.disconnect();
  };
}
