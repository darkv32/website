import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { ALTERNATIVES } from './data';
import { RevealOnView } from './reveal-on-view';
import styles from './media-server.module.css';

/** One row per app: what I run, and what could take its place. */
export function Alternatives() {
  return (
    <div className={styles.try}>
      <div className={styles.tag}><span>Diagram · what could take its place</span><span>{ALTERNATIVES.length} slots</span></div>
      <div className={styles.body}>
        <RevealOnView>
          <div className={styles.alts}>
            {ALTERNATIVES.map((row, i) => (
              <div key={row.pick} className={styles.altRow} style={{ '--i': i } as CSSProperties}>
                <span className={styles.label}>{row.role}</span>
                <span className={styles.pick}>{row.pick}</span>
                <span className={styles.to} aria-hidden="true">→</span>
                <span className={styles.opts}>
                  {row.locked ? (
                    <span className={cn(styles.altOpt, styles.dashed)}>{row.locked}</span>
                  ) : (
                    <>
                      {row.alts.map((alt) => <span key={alt} className={styles.altOpt}>{alt}</span>)}
                      {row.optional && <span className={cn(styles.altOpt, styles.dashed)}>or nothing, it is optional</span>}
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </RevealOnView>
        <div className={styles.legend}>
          <span><i className={styles.k1} />What I run</span>
          <span><i className={styles.k2} />What could replace it</span>
          <span><i className={styles.k3} />Optional, or hard to swap</span>
        </div>
      </div>
    </div>
  );
}
