'use client';

import { useState } from 'react';
import { CodeBlock } from './copy-button';
import { SNAGS } from './data';
import styles from './media-server.module.css';

export function Troubleshooter() {
  const [sel, setSel] = useState(0);
  const snag = SNAGS[sel];

  return (
    <div className={styles.try}>
      <div className={styles.tag}><span>Try it · troubleshooter</span><span>{SNAGS.length} common snags</span></div>
      <div className={styles.body}>
        <div className={styles.sym}>
          {SNAGS.map((s, i) => (
            <button key={s.symptom} type="button" aria-pressed={sel === i} onClick={() => setSel(i)}>{s.symptom}</button>
          ))}
        </div>
        <div key={sel} className={styles.diag} aria-live="polite">
          <div>
            <span className={styles.label}>Likely cause</span>
            <p>{snag.cause}</p>
          </div>
          <div>
            <span className={styles.label}>Fix</span>
            <p>{snag.fix}</p>
            {snag.code && <CodeBlock text={snag.code} />}
          </div>
        </div>
      </div>
    </div>
  );
}
