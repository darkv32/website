'use client';

import { useEffect, useRef, useState } from 'react';
import { watchScroll } from '@/lib/dom';
import { cn } from '@/lib/utils';
import { c } from './cls';
import { clearSteps, useDoneSteps } from './ticks';

export interface ThreadStep {
  n: number;
  title: string;
}

export interface ThreadGroup {
  label: string;
  steps: number[];
}

/** A row of stitches, one per step, that sticks under the site's header while you read the steps. The stitches behind you turn thread-brown, the one you are on is highlighted, and ticked steps stay sewn. Tap one to jump to that step. */
export function StepThread({ steps, groups }: { steps: ThreadStep[]; groups: ThreadGroup[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const done = useDoneSteps();

  /* Sit just under the site's sticky header, whatever its height is on this screen. */
  useEffect(() => {
    const wrap = wrapRef.current;
    const header = [...document.querySelectorAll('header')].find((h) => getComputedStyle(h).position === 'sticky');
    if (!wrap || !header) return;
    const sync = () => wrap.style.setProperty('--nav-h', `${Math.round(header.getBoundingClientRect().height)}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  /* The current step is the last heading that has scrolled up past the thread. */
  useEffect(() => {
    const headings = steps.map((s) => document.getElementById(`step-${s.n}`));
    const { stop } = watchScroll(() => {
      const line = (wrapRef.current?.getBoundingClientRect().bottom ?? 0) + 24;
      let now = 0;
      headings.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) now = steps[i].n;
      });
      setCurrent(now);
    });
    return stop;
  }, [steps]);

  const here = steps.find((s) => s.n === current);
  const go = (n: number) => document.getElementById(`step-${n}`)?.scrollIntoView({ block: 'start' });

  return (
    <div ref={wrapRef} className={c('thread-wrap')}>
      <div className={c('thread-top')}>
        <span>
          {here ? (
            <>
              Step {here.n} of {steps.length} · <b>{here.title}</b>
            </>
          ) : (
            <>The build · {steps.length} steps</>
          )}
        </span>
        <span>
          {done.size} / {steps.length} ticked
          {done.size > 0 && (
            <button type="button" className={c('thread-clear')} onClick={clearSteps}>
              Clear
            </button>
          )}
        </span>
      </div>
      <div className={c('thread')} role="group" aria-label="Jump to a step">
        {groups.map((g) => (
          <div key={g.label} className={c('t-group')} style={{ flexGrow: g.steps.length, flexBasis: g.steps.length * 26 }}>
            <div className={c('t-stitches')}>
              {g.steps.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={cn(c('t-stitch'), (n < current || done.has(n)) && c('sewn'), n === current && c('now'))}
                  aria-label={`Step ${n}: ${steps.find((s) => s.n === n)?.title}${done.has(n) ? ' (ticked)' : ''}`}
                  aria-current={n === current ? 'step' : undefined}
                  onClick={() => go(n)}
                />
              ))}
            </div>
            <span className={c('t-label')}>{g.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
