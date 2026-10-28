'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import s from './field.module.css';

const ANIME = [
  { name: 'Made in Abyss', src: '/field/a1.jpg' },
  { name: 'Quan Zhi Gao Shou', src: '/field/a2.jpg' },
  { name: 'Bleach', src: '/field/a3.jpg' },
  { name: 'Grand Blue Dreaming', src: '/field/a4.jpg' },
  { name: 'Call of the Night', src: '/field/a5.jpg' },
];

export function OffClockBand() {
  const [hovered, setHovered] = useState('');

  return (
    <section className={`${s.band} ${s.bandDeep} ${s.sec}`}>
      <div className={s.in}>
        <div className={s.secHead}>
          <h1 className={s.h2}>Off the clock</h1>
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
              <h2>Terran</h2>
              <span className={s.sc2}>StarCraft II</span>
            </div>
          </div>
          <p className={s.fanCap}>
            {hovered ? (
              <b>{hovered}</b>
            ) : (
              <>
                <b>Top five anime</b> · {ANIME.map((a) => a.name).join(', ')}
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
