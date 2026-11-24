import type { ReactNode } from 'react';
import { c } from './cls';
import { StepTick } from './step-tick';

/** One step of the build: its heading (which the contents list and the progress thread link to), a tick box, and the body. */
export function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className={c('step')} aria-labelledby={`step-${n}`}>
      <div className={c('step-head')}>
        <h2 id={`step-${n}`}>
          <span className={c('n')}>{n}</span>
          {title}
        </h2>
        <StepTick n={n} title={title} />
      </div>
      <div className={c('step-body')}>{children}</div>
    </section>
  );
}
