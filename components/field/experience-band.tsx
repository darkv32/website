'use client';

import { useEffect, useRef, useState } from 'react';
import type { SiteData } from '@/lib/data';
import s from './field.module.css';

type Role = SiteData['experience']['timeline'][number];

const toolKey = (tool: string) => tool.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Experience as a trail: a line fills as you scroll with one dot per role, rows with details expand on click,
 * and hovering a tool tag dims every role that did not use it.
 */
export function ExperienceBand({ roles }: { roles: Role[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [tool, setTool] = useState('');
  const [reached, setReached] = useState<boolean[]>([]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let queued = false;
    const update = () => {
      queued = false;
      const r = list.getBoundingClientRect();
      const line = innerHeight * 0.62;
      list.style.setProperty('--p', Math.max(0, Math.min(1, (line - r.top) / r.height)).toFixed(3));
      const next = rowRefs.current.map((li) => !!li && li.getBoundingClientRect().top + 32 < line);
      setReached((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const onScroll = () => {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  const toggle = (i: number) => setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section className={`${s.band} ${s.bandPaper} ${s.sec}`}>
      <div className={s.in}>
        <div className={s.secHead}>
          <h1 className={s.h2}>Experience</h1>
          <p>Where I&apos;ve worked and what I built there.</p>
        </div>
        <div>
          <div className={`${s.row} ${s.xpHead} ${s.label}`}>
            <span>When</span>
            <span>Role</span>
            <span style={{ textAlign: 'right' }}>Tools</span>
          </div>
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
