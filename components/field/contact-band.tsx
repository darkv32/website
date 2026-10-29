'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { LazyToaster } from '@/components/ui/lazy-toaster';
import { copyText } from '@/lib/clipboard';
import { SITE_CONFIG } from '@/lib/config';
import { prefersReducedMotion } from '@/lib/dom';
import s from './field.module.css';
import p from './pages.module.css';

const EMAIL = SITE_CONFIG.site.email;
const GITHUB = SITE_CONFIG.social.github;
const LINKEDIN = SITE_CONFIG.social.linkedin;

const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const GREETINGS = ['hi.', 'hello.', '你好.', 'hey.', 'halo.', 'こんにちは.'];

/**
 * The last band of the front page. With `asPage` it is the whole Contact page: the greeting cycles through languages when clicked,
 * and `children` (the clock and the draft composer) follow the ruled lines. They are passed in so the front page never loads them.
 */
export function ContactBand({ asPage = false, children }: { asPage?: boolean; children?: ReactNode }) {
  const [greet, setGreet] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hiRef = useRef<HTMLButtonElement>(null);

  /* The word "hi" drifts toward the cursor. */
  useEffect(() => {
    const section = sectionRef.current;
    const hi = hiRef.current;
    if (!section || !hi) return;
    if (matchMedia('(hover: none)').matches || prefersReducedMotion()) return;
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

  const copy = () => copyText(EMAIL, 'Email copied');

  const onHi = () => {
    if (asPage) setGreet((g) => (g + 1) % GREETINGS.length);
    copy();
  };
  const Heading = asPage ? 'h1' : 'h2';
  const heading = (
    <Heading className={s.say}>
      Say{' '}
      <button ref={hiRef} type="button" className={s.hi} onClick={onHi} title="Click to copy my email">
        {asPage ? <span key={greet} className={greet ? p.swap : undefined}>{GREETINGS[greet]}</span> : 'hi.'}
      </button>
    </Heading>
  );

  return (
    <>
    <section ref={sectionRef} id="contact" className={`${s.band} ${s.bandPaper} ${s.sec} ${s.contact}`}>
      <div className={s.in}>
        <div className={s.sayGrid}>
          {asPage ? (
            <div>
              {heading}
              <p className={p.sayNote}>
                That word is a button. Click it: <b>it copies my email</b>{greet ? <> and says <b>{GREETINGS[greet].replace('.', '')}</b></> : ' and learns a new greeting'}.
              </p>
            </div>
          ) : (
            heading
          )}
          <div>
          <div className={s.lines}>
            <button type="button" className={s.ln} onClick={copy}>
              <span className={s.k}>Email</span>
              <span className={`${s.v} ${s.addr}`}>{EMAIL}</span>
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
          {!asPage && (
            <Link className={p.pageLink} href="/contact">
              Or write a message <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          </div>
        </div>
        {asPage && children}
      </div>
    </section>
    {/* The only page content that raises toasts, and the toast code loads only once one is raised. */}
    <LazyToaster />
    </>
  );
}
