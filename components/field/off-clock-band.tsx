'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './field.module.css';
import p from './pages.module.css';

const ANIME = [
  { name: 'Made in Abyss', src: '/field/a1.jpg' },
  { name: 'Quan Zhi Gao Shou', src: '/field/a2.jpg' },
  { name: 'Bleach', src: '/field/a3.jpg' },
  { name: 'Grand Blue Dreaming', src: '/field/a4.jpg' },
  { name: 'Call of the Night', src: '/field/a5.jpg' },
];

/* Seeded so server and client render the same bubbles. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BUBBLES = (() => {
  const rnd = mulberry32(2026);
  return Array.from({ length: 18 }, () => {
    const size = 8 + rnd() * 30;
    return {
      left: `${(rnd() * 100).toFixed(1)}%`,
      width: `${size.toFixed(0)}px`,
      height: `${size.toFixed(0)}px`,
      '--d': `${(16 + rnd() * 18).toFixed(1)}s`,
      '--dl': `-${(rnd() * 30).toFixed(1)}s`,
      '--sw': `${((rnd() - 0.5) * 70).toFixed(0)}px`,
      '--y': `${(rnd() * 90).toFixed(0)}%`,
    } as CSSProperties;
  });
})();

export function OffClockBand() {
  const [hovered, setHovered] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  /* Bubbles rise the full height of the band, and pause while it is off screen. */
  useEffect(() => {
    const sec = sectionRef.current;
    const bub = bubblesRef.current;
    if (!sec || !bub) return;
    const ro = new ResizeObserver(() => bub.style.setProperty('--rise', sec.offsetHeight + 80 + 'px'));
    ro.observe(sec);
    const io = new IntersectionObserver((en) => bub.classList.toggle(s.paused, !en[0].isIntersecting));
    io.observe(sec);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="off" className={`${s.band} ${s.bandDeep} ${s.sec}`}>
      <div ref={bubblesRef} className={s.bubbles} aria-hidden="true">
        {BUBBLES.map((style, i) => <i key={i} style={style} />)}
      </div>
      <div className={s.in}>
        <div className={s.secHead}>
          <h2 className={s.h2}>Off the clock</h2>
          <p>A few things I enjoy away from the keyboard.</p>
        </div>
        <div className={s.offGrid}>
          <div className={s.fanWrap}>
            <div className={s.fan}>
              {ANIME.map((a, i) => (
                <Image
                  key={a.name}
                  className={s.p}
                  style={{ '--i': i } as CSSProperties}
                  src={a.src}
                  alt={`${a.name} poster`}
                  width={320}
                  height={456}
                  tabIndex={0}
                  onMouseEnter={() => setHovered(a.name)}
                  onFocus={() => setHovered(a.name)}
                  onMouseLeave={() => setHovered('')}
                  onBlur={() => setHovered('')}
                />
              ))}
            </div>
          </div>
          <div className={s.race}>
            <span className={s.ic} role="img" aria-label="Terran logo" />
            <div>
              <span className={s.label}>Main race</span>
              <h3>Terran</h3>
              <span className={s.sc2}>StarCraft II</span>
            </div>
          </div>
          <p className={s.fanCap} aria-live="polite">
            {hovered ? (
              <b>{hovered}</b>
            ) : (
              <>
                <b>Top five anime</b> · {ANIME.map((a) => a.name).join(', ')}
              </>
            )}
          </p>
        </div>
        <Link className={p.pageLink} href="/hobbies">
          Rank the posters, pop a bubble, train a marine <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
