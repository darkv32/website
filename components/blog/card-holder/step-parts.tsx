import type { ReactNode } from 'react';
import { c } from './cls';

/** A labelled group of actions inside a step, such as "Mark", "Cut" or "Store": a card with a tinted title band across the top. It replaces the numbered list with indented sub-steps. */
export function Phase({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <div id={id} className={c('ph')}>
      <h3 className={c('ph-title')}>{title}</h3>
      <div className={c('ph-body')}>{children}</div>
    </div>
  );
}

/** One action per line, with the thing that matters in bold. */
export function Do({ children }: { children: ReactNode }) {
  return <ul className={c('do')}>{children}</ul>;
}

/** The key numbers of a step, as chips above its instructions. */
export function Facts({ items }: { items: readonly (readonly [label: string, value: string])[] }) {
  return (
    <div className={c('facts')}>
      {items.map(([label, value]) => (
        <span key={label} className={c('fact')}>
          {label} <b>{value}</b>
        </span>
      ))}
    </div>
  );
}
