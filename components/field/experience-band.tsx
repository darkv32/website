'use client';

import { Fragment, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import type { Role } from '@/lib/data';
import { watchScroll } from '@/lib/dom';
import { clamp } from '@/lib/math';
import { Reveal } from './reveal';
import s from './field.module.css';
import p from './pages.module.css';

const toolKey = (tool: string) => tool.toLowerCase().replace(/[^a-z0-9]/g, '');

const KINDS = ['All', 'Work', 'Education', 'Programme'] as const;

/* the chart starts here; earlier stretches are clipped at the left edge */
const CHART_START = 2018;

/* stretches blocked out on the timeline, as [label, start, end] in decimal years */
const BLOCKS = [['Army', 2020.25, 2022]] as const;

/* "Now" as a decimal year for the timeline. The server snapshot is only used for hydration; the client then reads the real date. */
const nowYear = () => {
  const d = new Date();
  return Math.round((d.getFullYear() + (d.getMonth() + d.getDate() / 31) / 12) * 100) / 100;
};
const subscribeNever = () => () => {};
/* Fixed so the prerendered timeline and the first client render agree; the real date replaces it right after hydration. */
const PRERENDER_NOW = 2026.83;

const roleKey = (r: Role) => `${r.company}-${r.title}-${r.period}`;

const spanClass = (kind: string) => (kind === 'Education' ? p.edu : kind === 'Programme' ? p.prog : '');

/**
 * Experience as a trail beside a pinned heading: a line fills as you scroll with one dot per role,
 * rows with details expand on click, hovering a tool tag dims every role that did not use it,
 * and an arrow runs from the "Right now" card to the current role.
 *
 * With `asPage` it is the whole Experience page: a timeline of the years above the trail (hover a bar to light its row),
 * a filter by kind, click-to-pin on tools, and expand all.
 */
export function ExperienceBand({ roles, asPage = false }: { roles: Role[]; asPage?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const arrowRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [open, setOpen] = useState<number[]>([]);
  const [tool, setTool] = useState('');
  const [pinned, setPinned] = useState('');
  const [kind, setKind] = useState<(typeof KINDS)[number]>('All');
  const [hover, setHover] = useState(-1);
  const [reached, setReached] = useState<boolean[]>([]);
  const now = useSyncExternalStore(subscribeNever, nowYear, () => PRERENDER_NOW);

  const currentIdx = Math.max(0, roles.findIndex((r) => r.current));
  const current = roles[currentIdx];
  const activeTool = tool || pinned;
  const kindOk = (r: Role) => kind === 'All' || r.kind === kind;
  const toolOk = (r: Role) => !activeTool || r.tools.some((t) => toolKey(t) === activeTool);
  const expandable = roles.map((r, i) => (r.details.length > 0 ? i : -1)).filter((i) => i >= 0);
  const allOpen = expandable.every((i) => open.includes(i));
  const shown = roles.filter((r) => kindOk(r) && toolOk(r)).length;

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

    const update = () => {
      const r = list.getBoundingClientRect();
      const line = innerHeight * 0.62;
      list.style.setProperty('--p', clamp((line - r.top) / r.height, 0, 1).toFixed(3));
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
      arrow.dataset.show = tr.top > 76 && tr.top < innerHeight - 40 ? '1' : '0';
    };
    const { queue, stop } = watchScroll(update);
    const ro = new ResizeObserver(queue);
    ro.observe(split);
    document.fonts?.ready.then(queue);
    /* filters and expanding rows move the trail, so measure again after them */
    const mo = new MutationObserver(queue);
    mo.observe(list, { attributes: true, attributeFilter: ['class'], subtree: true });
    return () => {
      stop();
      ro.disconnect();
      mo.disconnect();
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
  const toolName = (k: string) => roles.flatMap((r) => r.tools).find((t) => toolKey(t) === k) ?? k;
  const Heading = asPage ? 'h1' : 'h2';

  /* timeline geometry, in decimal years */
  const spans = roles.flatMap((r) => r.spans.map(([a, b]) => [a, b ?? now] as const));
  const y0 = CHART_START;
  const y1 = Math.ceil(Math.max(...spans.map(([, b]) => b), now));
  const pct = (y: number) => `${(((y - y0) / (y1 - y0)) * 100).toFixed(2)}%`;
  const axisYears = Array.from({ length: Math.ceil((y1 - y0) / 2) }, (_, i) => y0 + i * 2);
  const hovered = hover >= 0 ? roles[hover] : null;

  return (
    <section ref={sectionRef} id="experience" className={`${s.band} ${s.bandPaper} ${s.sec} ${s.expBand}`}>
      <div ref={splitRef} className={`${s.in} ${s.split}`}>
        <svg ref={arrowRef} className={s.nowArrow} aria-hidden="true">
          <defs>
            <marker id="nowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path className={s.arrowTip} d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          <path ref={pathRef} className={s.arrowLine} pathLength={1} d="" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#nowHead)" />
        </svg>
        <aside className={s.side}>
          <Heading className={s.h2}>Experience</Heading>
          <p>Where I&apos;ve worked and what I built there.</p>
          {current && (
            <div ref={cardRef} className={s.nowCard}>
              <span className={s.label}>Right now</span>
              <b>{current.title}</b>
              <span className={s.onCo}>{current.company}</span>
            </div>
          )}
          {!asPage && (
            <div>
              <Link className={p.pageLink} href="/experience">
                See it on a timeline <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
          {asPage && (
            <div className={p.ctl}>
              <div>
                <span className={s.label}>Show</span>
                <div className={p.fchips} role="group" aria-label="Filter by kind">
                  {KINDS.map((k) => (
                    <button key={k} type="button" className={p.fchip} aria-pressed={kind === k} onClick={() => setKind(k)}>
                      {k}
                      <span>{k === 'All' ? roles.length : roles.filter((r) => r.kind === k).length}</span>
                    </button>
                  ))}
                </div>
              </div>
              {pinned && (
                <div className={p.pinned} aria-live="polite">
                  <span>Tool:</span>
                  <button type="button" onClick={() => setPinned('')}>{toolName(pinned)} ×</button>
                </div>
              )}
              <button type="button" className={`${p.expandAll} ${allOpen ? p.allOpen : ''}`} onClick={() => setOpen(allOpen ? [] : expandable)}>
                <i>+</i>
                <span>{allOpen ? 'Collapse all' : 'Expand all'}</span>
              </button>
            </div>
          )}
        </aside>
        <div>
          {asPage && (
            <Reveal className={p.gantt}>
              <div className={p.gHead}>
                <span className={s.label}>{y0} &rarr; now</span>
                <span className={p.gRead} aria-live="polite">
                  {hovered ? <><b>{hovered.title}</b> · {hovered.company} · {hovered.period}</> : 'Hover a bar'}
                </span>
              </div>
              <div className={p.gGrid}>
                {BLOCKS.map(([label, a, b]) => (
                  <i
                    key={label}
                    className={p.gBlock}
                    style={{ left: `calc(var(--lw) + (100% - var(--lw)) * ${(a - y0) / (y1 - y0)})`, width: `calc((100% - var(--lw)) * ${(b - a) / (y1 - y0)})` }}
                    aria-hidden="true"
                  >
                    <span>{label}</span>
                  </i>
                ))}
                <span />
                <div className={p.gAxis}>
                  {axisYears.map((y) => <span key={y} style={{ left: pct(y) }}>{y}</span>)}
                </div>
                {roles.map((r, i) => {
                  const off = !kindOk(r) || !toolOk(r);
                  return (
                    <Fragment key={roleKey(r)}>
                      <div className={`${p.gLab} ${off ? p.off : ''}`} style={{ '--i': i } as CSSProperties}>{r.short}</div>
                      <div className={p.gTrack}>
                        {r.spans.map(([from, b], k) => {
                          const a = Math.max(from, y0);
                          return (
                          <button
                            key={k}
                            type="button"
                            className={clsx(p.seg, spanClass(r.kind), hover === i && p.on, off && p.off)}
                            style={{ left: pct(a), width: `${(((b ?? now) - a) / (y1 - y0)) * 100}%`, '--i': i } as CSSProperties}
                            aria-label={`${r.title}, ${r.company}, ${r.period}`}
                            onMouseEnter={() => setHover(i)}
                            onMouseLeave={() => setHover(-1)}
                            onFocus={() => setHover(i)}
                            onBlur={() => setHover(-1)}
                            onClick={() => {
                              setOpen((prev) => (prev.includes(i) || !r.details.length ? prev : [...prev, i]));
                              rowRefs.current[i]?.scrollIntoView({ block: 'center' });
                            }}
                          />
                          );
                        })}
                      </div>
                    </Fragment>
                  );
                })}
                <i className={p.gNow} style={{ left: `calc(var(--lw) + (100% - var(--lw)) * ${(now - y0) / (y1 - y0)})` }} />
              </div>
              <div className={p.gKey}>
                <span><i />Work</span>
                <span><i className={p.edu} />Education</span>
                <span><i className={p.prog} />Programme</span>
                <span><i className={p.army} />Army</span>
              </div>
            </Reveal>
          )}
          <ol ref={listRef} className={s.xp}>
            {roles.map((role, i) => {
              const canOpen = role.details.length > 0;
              const isOpen = open.includes(i);
              const hidden = asPage && !kindOk(role);
              const dim = !hidden && !toolOk(role);
              const cls = clsx(s.row, canOpen && s.expandable, isOpen && s.open, dim && s.dim, hidden && s.gone, asPage && hover === i && s.hl, reached[i] && s.reached);
              return (
                <li
                  key={roleKey(role)}
                  ref={(el) => { rowRefs.current[i] = el; }}
                  className={cls}
                  onMouseEnter={asPage ? () => setHover(i) : undefined}
                  onMouseLeave={asPage ? () => setHover(-1) : undefined}
                >
                  {canOpen && (
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
                    {canOpen && (
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
                        className={clsx(s.tag, tool === toolKey(t) && s.hl, asPage && pinned === toolKey(t) && s.pin)}
                        aria-pressed={asPage ? pinned === toolKey(t) : undefined}
                        onMouseEnter={() => setTool(toolKey(t))}
                        onMouseLeave={() => setTool('')}
                        onFocus={() => setTool(toolKey(t))}
                        onBlur={() => setTool('')}
                        onClick={asPage ? () => setPinned((cur) => (cur === toolKey(t) ? '' : toolKey(t))) : undefined}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
          {asPage && shown === 0 && <p className={p.noHits}>Nothing matches that combination. Clear the tool or switch the filter.</p>}
        </div>
      </div>
    </section>
  );
}
