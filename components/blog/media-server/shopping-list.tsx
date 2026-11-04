import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { BUYS, BUYS_TOTAL } from './data';
import { RevealOnView } from './reveal-on-view';
import styles from './media-server.module.css';

/** What I actually bought, with what each part is for. */
export function ShoppingList() {
  return (
    <div className={styles.try}>
      <div className={styles.tag}><span>Shopping list</span><span>prices in S$</span></div>
      <div className={styles.body}>
        <RevealOnView>
          {BUYS.map((buy, i) => (
            <div key={buy.name} className={cn(styles.buy, buy.sub && styles.buySub)} style={{ '--i': i } as CSSProperties}>
              <div>
                <b>{buy.name}</b>
                <p className={styles.why}>{buy.why}</p>
              </div>
              <div className={styles.where}><span className={styles.label}>Where</span><br />{buy.where}</div>
              <div className={styles.price}>{buy.price}</div>
            </div>
          ))}
          <div className={styles.total}><span className={styles.label}>Total</span><strong>{BUYS_TOTAL}</strong></div>
          <p className={styles.note}>The Pi, case and power supply came to S$289.98 with GST. The microSD card and its reader make up the rest, and the drive was a spare I already had.</p>
        </RevealOnView>
      </div>
    </div>
  );
}
