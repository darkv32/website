'use client';

import { c } from './cls';
import { toggleStep, useDoneSteps } from './ticks';

/** "Mark done" for a step, kept in the visitor's browser. The progress thread reads the same ticks. */
export function StepTick({ n, title }: { n: number; title: string }) {
  const done = useDoneSteps().has(n);

  return (
    <label className={c('tick')} data-on={done}>
      <input type="checkbox" checked={done} onChange={() => toggleStep(n)} aria-label={`Step ${n}, ${title}: mark as done`} />
      <span>{done ? 'Done' : 'Mark done'}</span>
    </label>
  );
}
