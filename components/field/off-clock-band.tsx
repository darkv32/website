'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './field.module.css';
import p from './pages.module.css';
import { ANIME, seededBubbles, trackBubbleBand } from './bubbles';

const BUBBLES = seededBubbles(18);

export function OffClockBand() {
  const [hovered, setHovered] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const bub = bubblesRef.current;
    if (sec && bub) return trackBubbleBand(sec, bub);
  }, []);

  return (
    <section ref={sectionRef} id="off" className={`${s.band} ${s.bandDeep} ${s.sec}`}>
      <div ref={bubblesRef} className={s.bubbles} aria-hidden="true">
        {BUBBLES.map((b) => <i key={b.id} style={b.style} />)}
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
