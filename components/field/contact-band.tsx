'use client';

import { useEffect, useRef } from 'react';
import { FileText, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { SITE_CONFIG } from '@/lib/config';
import s from './field.module.css';

const EMAIL = SITE_CONFIG.site.email;

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
    <section ref={sectionRef} className={`${s.band} ${s.bandPaper} ${s.sec} ${s.contact}`}>
      <div className={s.in}>
        <h1 className={s.say}>
          Say <button ref={hiRef} type="button" className={s.hi} onClick={copy} title="Click to copy my email">hi.</button>
        </h1>
        <div className={s.btnrow}>
          <button type="button" className={`${s.b} ${s.primary}`} onClick={copy}>
            <Mail />
            <span ref={addrRef} className={s.addr}>{EMAIL}</span>
            <span className={s.meta}>Copy</span>
          </button>
          <a className={s.b} href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer">
            <Github />
            GitHub
            <ArrowUpRight className={s.ext} />
          </a>
          <a className={s.b} href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin />
            LinkedIn
            <ArrowUpRight className={s.ext} />
          </a>
          <a className={s.b} href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <FileText />
            Resume<span className={s.meta}>PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}
