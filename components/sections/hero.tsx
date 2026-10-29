'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { HeroField } from '@/components/field/hero-field';
import { SITE_CONFIG } from '@/lib/config';
import s from '@/components/field/field.module.css';
import p from '@/components/field/pages.module.css';

const SLIDE_MS = 6500;

/* faceY is where the face sits in each photo, as a share of its height. The crop is centred on it for whatever shape the frame is. */
const frames = [
  { src: '/field/p1.jpg', label: 'Bow Lake', alt: 'standing by a turquoise lake in the Canadian Rockies', faceY: 0.5 },
  { src: '/field/p2.jpg', label: 'Glacier edge', alt: 'in front of a glacier and gravel flats', faceY: 0.54 },
  { src: '/field/p3.jpg', label: 'Glacial lake', alt: 'on the rocky shore of a glacial lake', faceY: 0.43 },
  { src: '/field/p4.jpg', label: 'Above Banff', alt: 'on a hillside above a mountain town and valley', faceY: 0.55 },
  { src: '/field/p5.jpg', label: 'Golden hour', alt: 'on a lookout at sunset', faceY: 0.46 },
  { src: '/field/p6.jpg', label: 'Mountain boardwalk', alt: 'on a wooden boardwalk high above a valley', faceY: 0.5 },
  { src: '/field/p7.jpg', label: 'Waterfall', alt: 'sitting on a ledge beside a waterfall', faceY: 0.44 },
];

/** The front-page hero. With `page` it fills the screen as the top of the About page, with a caption and a hint. */
export function Hero({ page = false }: { page?: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<Array<HTMLImageElement | null>>([]);
  const pausedRef = useRef(false);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((i) => (i + 1) % frames.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + frames.length) % frames.length), []);

  /* Auto-advance. Depending on `current` restarts the timer whenever a tick is clicked. */
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!pausedRef.current && !document.hidden) next();
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [current, next]);

  /* On the About page the arrow keys flip photos while the hero is on screen. */
  useEffect(() => {
    if (!page) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || scrollY > innerHeight * 0.6) return;
      const t = e.target as HTMLElement | null;
      if (t && (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable)) return;
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [page, next, prev]);

  /* Centre each crop on the face for the current frame shape (portrait below 1200px, landscape above). */
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const recrop = () => {
      const r = frame.getBoundingClientRect();
      if (!r.width) return;
      const wf = clamp(0.75 * r.height / r.width, 0.05, 1);
      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        const pos = wf >= 0.999 ? 0.5 : clamp((frames[i].faceY - wf / 2) / (1 - wf), 0, 1);
        img.style.setProperty('--py', (pos * 100).toFixed(1) + '%');
      });
    };
    recrop();
    const ro = new ResizeObserver(recrop);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={heroRef} id="hero" className={page ? `${s.hero} ${p.heroTall}` : s.hero}>
      <HeroField heroRef={heroRef} frameRef={frameRef} />

      <div className={s.in}>
        <div className={s.heroGrid}>
          <div>
            {page && <div className={`${s.label} ${p.eyebrow}`}>About &middot; 01 / 05</div>}
            <h1 className={s.name}>
              <span>Tang</span>
              <span className={s.l2}>Yetong</span>
            </h1>
            <p className={s.lede}>Full stack developer that dabbles in data analytics.</p>
            <p className={s.sub}>
              Software engineer at RFCOM. Previously built scalable pipelines at Fivetran, digital services at GovTech, and
              contributed to the Bitcoin ecosystem.
            </p>
            <div className={s.btnrow}>
              <a className={`${s.b} ${s.primary}`} href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText />
                Resume<span className={s.meta}>PDF</span>
              </a>
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
            </div>
            {!page && (
              <Link className={p.pageLink} href="/about">
                More about me <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>

          <figure
            className={s.photo}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <div ref={frameRef} className={s.photoFrame} onClick={next}>
              {frames.map((f, i) => (
                <Image
                  key={f.src}
                  ref={(el) => { imgRefs.current[i] = el; }}
                  className={i === current ? s.on : undefined}
                  src={f.src}
                  alt={`Tang Yetong ${f.alt}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 860px) 340px, (max-width: 1200px) 380px, 630px"
                />
              ))}
            </div>
            <figcaption className={s.photoCap}>
              {page && (
                <span className={p.photoWhere}>
                  <b>{String(current + 1).padStart(2, '0')}</b> / {String(frames.length).padStart(2, '0')} &middot; {frames[current].label}
                </span>
              )}
              <span className={s.ticks}>
                {frames.map((f, i) => (
                  <button
                    key={f.src}
                    type="button"
                    className={s.tick}
                    aria-label={`Show photo ${i + 1}: ${f.label}`}
                    aria-current={i === current ? 'true' : undefined}
                    onClick={() => setCurrent(i)}
                  >
                    <i />
                  </button>
                ))}
              </span>
            </figcaption>
          </figure>
        </div>
        {page && (
          <p className={`${p.hint} ${p.heroHint}`}>
            Move the cursor over the field. Click the ground to shoot. <kbd>←</kbd> <kbd>→</kbd> flips photos.
          </p>
        )}
      </div>
    </section>
  );
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
