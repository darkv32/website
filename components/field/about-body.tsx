'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Role } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';
import { Reveal } from './reveal';
import s from './field.module.css';
import p from './pages.module.css';

const FACTS: Array<{ k: string; href: string; v: ReactNode }> = [
  { k: 'Based in', href: '/contact', v: <><b>{SITE_CONFIG.site.location}</b> &middot; SGT, UTC+8</> },
  { k: 'Now', href: '/experience', v: <><b>Senior Engineer</b> at RFCOM Technologies</> },
  { k: 'Before', href: '/experience', v: 'Fivetran · GovTech · Bitcoin Dev Kit · RFCOM (Android)' },
  { k: 'Studied', href: '/experience', v: <><b>Computer Science</b>, National University of Singapore</> },
  { k: 'Writes', href: '/blog', v: 'Bitcoin wallets, Android, what an internship is really like' },
  { k: 'Off hours', href: '/hobbies', v: 'Anime and StarCraft II, as Terran' },
];

/** What follows the hero on the About page: where things are, a toolbox pulled from the experience data, and a nudge to get in touch. */
export function AboutBody({ roles }: { roles: Role[] }) {
  const [picked, setPicked] = useState('');
  const tools = Array.from(new Set(roles.flatMap((r) => r.tools)));
  const hits = picked ? roles.filter((r) => r.tools.includes(picked)) : [];

  return (
    <div className={`${s.band} ${p.aboutBody}`}>
      <section className={s.sec} id="short">
        <div className={s.in}>
          <Reveal>
            <div className={s.secHead}>
              <h2 className={s.h2}>The short version</h2>
              <p>Where I am, what I do and where to read more. Each line leads somewhere.</p>
            </div>
            <div className={`${s.lines} ${p.facts}`}>
              {FACTS.map((f) => (
                <Link key={f.k} href={f.href} className={s.ln} style={{ '--i': FACTS.indexOf(f) } as CSSProperties}>
                  <span className={s.k}>{f.k}</span>
                  <span className={s.v}>{f.v}</span>
                  <span className={s.ar}>↗</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={s.sec} id="toolbox">
        <div className={s.in}>
          <Reveal>
            <div className={s.secHead}>
              <h2 className={s.h2}>Toolbox</h2>
              <p>The tools and topics from the experience trail. Pick one to see which roles it shows up in.</p>
            </div>
            <div className={p.chipsRow}>
              {tools.map((t) => (
                <button key={t} type="button" className={p.tool} aria-pressed={picked === t} onClick={() => setPicked(picked === t ? '' : t)}>
                  {t}
                </button>
              ))}
            </div>
            <div className={p.toolOut} aria-live="polite">
              {picked ? (
                <>
                  <strong>{picked}</strong> &middot; used in {hits.length} {hits.length === 1 ? 'role' : 'roles'}
                  <ul>
                    {hits.map((r, i) => (
                      <li key={`${r.company}-${r.title}`} style={{ animationDelay: `${i * 60}ms` }}>
                        <b>{r.short}</b>
                        <span>{r.title}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                'Pick a tool.'
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={s.sec} id="end">
        <div className={s.in}>
          <Reveal className={p.endCta}>
            <p>
              Want to talk shop?
              <br />
              <em>Say hi.</em>
            </p>
            <Link className={`${s.b} ${s.primary}`} href="/contact">
              Get in touch
              <ArrowRight className={s.arrR} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
