'use client';

import { useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { SITE_CONFIG } from '@/lib/config';
import s from './field.module.css';

const EMAIL = SITE_CONFIG.site.email;
const GITHUB = SITE_CONFIG.social.github;
const LINKEDIN = SITE_CONFIG.social.linkedin;

const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function ContactBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const hiRef = useRef<HTMLButtonElement>(null);
  const addrRef = useRef<HTMLSpanElement>(null);

  /* The word "hi" drifts toward the cursor. */
  useEffect(() => {
    const section = sectionRef.current;
    const hi = hiRef.current;
    if (!section || !hi) return;
    if (matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      const r = hi.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      hi.style.transform = d < 280 ? `translate(${(dx * (1 - d / 280) * 0.2).toFixed(1)}px,${(dy * (1 - d / 280) * 0.2).toFixed(1)}px)` : '';
    };
    const onLeave = () => { hi.style.transform = ''; };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const copy = () => {
    const fallback = () => {
      const el = addrRef.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      toast({ title: 'Press Ctrl+C to copy' });
    };
    if (!navigator.clipboard) return fallback();
    navigator.clipboard.writeText(EMAIL).then(() => toast({ title: 'Email copied' }), fallback);
  };

  return (
    <section ref={sectionRef} id="contact" className={`${s.band} ${s.bandPaper} ${s.sec} ${s.contact}`}>
      <div className={s.in}>
        <div className={s.sayGrid}>
          <h2 className={s.say}>
            Say <button ref={hiRef} type="button" className={s.hi} onClick={copy} title="Click to copy my email">hi.</button>
          </h2>
          <div className={s.lines}>
            <button type="button" className={s.ln} onClick={copy}>
              <span className={s.k}>Email</span>
              <span ref={addrRef} className={`${s.v} ${s.addr}`}>{EMAIL}</span>
              <span className={s.ar}>COPY</span>
            </button>
            <a className={s.ln} href={GITHUB} target="_blank" rel="noopener noreferrer">
              <span className={s.k}>GitHub</span>
              <span className={s.v}>{display(GITHUB)}</span>
              <span className={s.ar}>↗</span>
            </a>
            <a className={s.ln} href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <span className={s.k}>LinkedIn</span>
              <span className={s.v}>{display(LINKEDIN).replace(/^linkedin\.com\//, '')}</span>
              <span className={s.ar}>↗</span>
            </a>
            <a className={s.ln} href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <span className={s.k}>Resume</span>
              <span className={s.v}>resume.pdf</span>
              <span className={s.ar}>PDF</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
