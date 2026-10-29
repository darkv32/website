'use client';

import { useEffect, useRef, useState } from 'react';
import type { Role } from '@/lib/data';
import s from './field.module.css';

const toolKey = (tool: string) => tool.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Experience as a trail beside a pinned heading: a line fills as you scroll with one dot per role,
 * rows with details expand on click, hovering a tool tag dims every role that did not use it,
 * and an arrow runs from the "Right now" card to the current role.
 */
export function ExperienceBand({ roles }: { roles: Role[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const arrowRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [open, setOpen] = useState<number[]>([]);
  const [tool, setTool] = useState('');
  const [reached, setReached] = useState<boolean[]>([]);

  const currentIdx = Math.max(0, roles.findIndex((r) => r.current));
  const current = roles[currentIdx];

  /* trail fill, reached dots and the arrow all follow the scroll position */
  useEffect(() => {
    const list = listRef.current;
    const split = splitRef.current;
    const card = cardRef.current;
    const arrow = arrowRef.current;
    const path = pathRef.current;
    const row = rowRefs.current[currentIdx];
    if (!list || !split || !card || !arrow || !path || !row) return;
    const title = row.querySelector('strong');
    if (!title) return;

    let queued = false;
    const update = () => {
      queued = false;
      const r = list.getBoundingClientRect();
      const line = innerHeight * 0.62;
      list.style.setProperty('--p', Math.max(0, Math.min(1, (line - r.top) / r.height)).toFixed(3));
      const next = rowRefs.current.map((li) => !!li && li.getBoundingClientRect().top + 32 < line);
      setReached((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));

      if (innerWidth <= 900) return;
      const sr = split.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      const rr = row.getBoundingClientRect();
      const tr = title.getBoundingClientRect();
      const sx = cr.right - sr.left + 8;
      const sy = cr.top + cr.height / 2 - sr.top;
      const ex = rr.left - sr.left - 8;
      const ey = tr.top + tr.height / 2 - sr.top;
      const dx = Math.max(40, ex - sx);
      path.setAttribute('d', `M${sx.toFixed(1)} ${sy.toFixed(1)} C${(sx + dx * 0.55).toFixed(1)} ${sy.toFixed(1)} ${(ex - dx * 0.45).toFixed(1)} ${ey.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
      arrow.style.opacity = tr.top > 76 && tr.top < innerHeight - 40 ? '1' : '0';
    };
    const queue = () => {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    const ro = new ResizeObserver(queue);
    ro.observe(split);
    document.fonts?.ready.then(queue);
    queue();
    return () => {
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
      ro.disconnect();
    };
  }, [currentIdx]);

  /* a spotlight of accent dots follows the cursor */
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec || matchMedia('(hover: none)').matches) return;
    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      sec.style.setProperty('--mx', e.clientX - r.left + 'px');
      sec.style.setProperty('--my', e.clientY - r.top + 'px');
    };
    const onLeave = () => {
      sec.style.removeProperty('--mx');
      sec.style.removeProperty('--my');
    };
    sec.addEventListener('pointermove', onMove);
    sec.addEventListener('pointerleave', onLeave);
    return () => {
      sec.removeEventListener('pointermove', onMove);
      sec.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const toggle = (i: number) => setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section ref={sectionRef} id="experience" className={`${s.band} ${s.bandPaper} ${s.sec} ${s.expBand}`}>
      <div ref={splitRef} className={`${s.in} ${s.split}`}>
        <svg ref={arrowRef} className={s.nowArrow} aria-hidden="true">
          <defs>
            <marker id="nowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          <path ref={pathRef} d="" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#nowHead)" />
        </svg>
        <aside className={s.side}>
          <h2 className={s.h2}>Experience</h2>
          <p>Where I&apos;ve worked and what I built there.</p>
          {current && (
            <div ref={cardRef} className={s.nowCard}>
              <span className={s.label}>Right now</span>
              <b>{current.title}</b>
              <span className={s.onCo}>{current.company}</span>
            </div>
          )}
        </aside>
        <div>
          <ol ref={listRef} className={s.xp}>
            {roles.map((role, i) => {
              const expandable = role.details.length > 0;
              const isOpen = open.includes(i);
              const dim = !!tool && !role.tools.some((t) => toolKey(t) === tool);
              const cls = [s.row, expandable && s.expandable, isOpen && s.open, dim && s.dim, reached[i] && s.reached].filter(Boolean).join(' ');
              return (
                <li key={`${role.company}-${role.title}-${role.period}`} ref={(el) => { rowRefs.current[i] = el; }} className={cls}>
                  {expandable && (
                    <button
                      type="button"
                      className={s.xpToggle}
                      aria-expanded={isOpen}
                      aria-label={`Details: ${role.title}, ${role.company}`}
                      onClick={() => toggle(i)}
                    />
                  )}
                  <div className={s.when}>
                    <span className={role.current ? s.now : undefined}>{role.period}</span>
                    <span className={s.kind}>{role.kind}</span>
                  </div>
                  <div className={s.act}>
                    <strong>{role.title}</strong>
                    <span className={s.co}>{role.company}</span>
                    <span className={s.d}>{role.summary}</span>
                    {expandable && (
                      <div className={s.moreXp}>
                        <div>
                          <ul>
                            {role.details.map((d) => <li key={d}>{d}</li>)}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={s.tags}>
                    {role.tools.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`${s.tag} ${tool === toolKey(t) ? s.hl : ''}`}
                        onMouseEnter={() => setTool(toolKey(t))}
                        onMouseLeave={() => setTool('')}
                        onFocus={() => setTool(toolKey(t))}
                        onBlur={() => setTool('')}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
