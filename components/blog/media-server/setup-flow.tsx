'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './copy-button';
import { STEPS, type Step } from './data';
import { Rich } from './rich';
import styles from './media-server.module.css';

const CORE_COUNT = STEPS.filter((s) => !s.optional).length;
const OPTIONAL_COUNT = STEPS.length - CORE_COUNT;

export function SetupFlow() {
  const uid = useId();
  const [all, setAll] = useState(true);
  const [open, setOpen] = useState<number>(0);
  const jumpTo = useRef<number | null>(null);

  const visible = STEPS.map((step, index) => ({ step, index })).filter(({ step }) => all || !step.optional);
  const headId = (i: number) => `${uid}-head-${i}`;

  /* After Next or Back, bring the step that just opened into view. */
  useEffect(() => {
    if (jumpTo.current === null) return;
    const head = document.getElementById(headId(jumpTo.current));
    jumpTo.current = null;
    head?.focus({ preventScroll: true });
    head?.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    // headId only depends on uid
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const go = (i: number) => { jumpTo.current = i; setOpen(i); };

  function renderItem({ step, index }: { step: Step; index: number }, label: string | number) {
    const pos = visible.findIndex((v) => v.index === index);
    const prev = visible[pos - 1];
    const next = visible[pos + 1];
    const isOpen = open === index;
    return (
      <div key={index}>
        {step.group && <div className={styles.gl}><span className={styles.label}>{step.group}</span></div>}
        <div className={cn(styles.st, isOpen && styles.stOpen, step.optional && styles.stOptional)}>
          <button
            type="button"
            id={headId(index)}
            className={styles.sthead}
            aria-expanded={isOpen}
            aria-controls={`${uid}-panel-${index}`}
            onClick={() => setOpen(isOpen ? -1 : index)}
          >
            <span className={styles.dot}>{label}</span>
            <span className={styles.ttl}>{step.title}</span>
            {step.port !== undefined && <span className={styles.port}>:{step.port}</span>}
            <span className={styles.chev} aria-hidden="true" />
          </button>
          <div id={`${uid}-panel-${index}`} role="region" aria-labelledby={headId(index)} className={styles.stpanel} inert={!isOpen}>
            <div className={styles.stinner}>
              <div className={styles.stbody}>
                {step.needs && (
                  <div className={styles.chips}>
                    <span className={styles.label}>Needs</span>
                    {step.needs.map((n) => <span key={n} className={styles.chip}>{n}</span>)}
                  </div>
                )}
                {step.warn && <div className={styles.callout}><Rich text={step.warn} /></div>}
                <p><Rich text={step.body} /></p>
                {step.code && <CodeBlock text={step.code} />}
                <div className={styles.done}>{step.done}</div>
                {(prev || next) && (
                  <div className={styles.stnav}>
                    {prev && <button type="button" className={styles.btn} onClick={() => go(prev.index)}>← Back</button>}
                    {next && <button type="button" className={cn(styles.btn, styles.pri)} onClick={() => go(next.index)}>Next: {next.step.title} →</button>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const core = visible.filter(({ step }) => !step.optional);
  const optional = visible.filter(({ step }) => step.optional);

  return (
    <div className={styles.try}>
      <div className={styles.tag}><span>Try it · setup flow</span><span>{all ? `${CORE_COUNT} core steps · ${OPTIONAL_COUNT} optional` : `${CORE_COUNT} core steps`}</span></div>
      <div className={styles.body}>
        <div className={styles.flowTop}>
          <div className={styles.seg} role="group" aria-label="Which steps to show">
            <button type="button" aria-pressed={all} onClick={() => setAll(true)}>All steps</button>
            <button
              type="button"
              aria-pressed={!all}
              onClick={() => { setAll(false); setOpen((o) => (o >= CORE_COUNT ? CORE_COUNT - 1 : o)); }}
            >
              Core only
            </button>
          </div>
          <span className={styles.note}>Tap a step to open it.</span>
        </div>
        <div className={styles.spine}>{core.map((item, n) => renderItem(item, n + 1))}</div>
        {all && (
          <>
            <div className={styles.optHead}>
              <span className={cn(styles.label, styles.accentText)}>Optional · add any time after launch</span>
              <span className={styles.note}>In any order. Each one lists what it needs first.</span>
            </div>
            <div className={cn(styles.spine, styles.spineDashed)}>{optional.map((item) => renderItem(item, '+'))}</div>
          </>
        )}
      </div>
    </div>
  );
}
