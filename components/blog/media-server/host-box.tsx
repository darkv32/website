'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';
import { NODES, PI_IP, SORT } from './data';
import styles from './media-server.module.css';

type Choice = 'name' | 'ip' | 'localhost';

const OPTIONS: Array<[Choice, string]> = [
  ['name', 'container name'],
  ['ip', PI_IP],
  ['localhost', 'localhost'],
];

const HOST: Record<Choice, string> = { name: 'qbittorrent', ip: PI_IP, localhost: 'localhost' };

export function HostBox() {
  const [choice, setChoice] = useState<Choice>('name');
  const [tested, setTested] = useState<Choice | null>(null);

  return (
    <div className={styles.try}>
      <div className={styles.tag}><span>Try it · the host box</span><span>Radarr → qBittorrent</span></div>
      <div className={styles.body}>
        <div className={styles.hostlab}>
          <div className={styles.seg} role="group" aria-label="Host to enter">
            {OPTIONS.map(([id, label]) => (
              <button key={id} type="button" aria-pressed={choice === id} onClick={() => { setChoice(id); setTested(null); }}>{label}</button>
            ))}
          </div>
          <dl className={styles.kv}>
            <dt>Host</dt><dd className={styles.hot}>{HOST[choice]}</dd>
            <dt>Port</dt><dd>8080</dd>
          </dl>
          <button type="button" className={cn(styles.btn, styles.pri)} style={{ alignSelf: 'flex-start' }} onClick={() => setTested(choice)}>Test connection</button>
          <div aria-live="polite">
            <div key={tested ?? 'none'} className={cn(styles.res, tested === 'localhost' ? styles.resBad : tested && styles.resOk, tested && styles.resIn)}>
              {tested === 'name' && <><b>Connected.</b> Container names resolve on Docker&apos;s private network.</>}
              {tested === 'ip' && <><b>Connected.</b> This works because qBittorrent&apos;s port is published and the Pi keeps {PI_IP}.</>}
              {tested === 'localhost' && <><b>Connection refused.</b> Inside a container, localhost is the container itself, not the Pi.</>}
              {tested === null && 'Not tested yet.'}
            </div>
          </div>
        </div>

        <div className={styles.addrhead}><span className={styles.label}>Names and ports to type</span><span className={styles.note}>Tap one to copy it.</span></div>
        <div className={styles.addrs}>
          {SORT.map((k) => {
            const text = `${k}:${NODES[k].port}`;
            return (
              <div key={k} className={styles.addrcell}>
                <span className={styles.label}>{NODES[k].name}</span>
                <CopyButton text={text} className={styles.addr}>{text}</CopyButton>
              </div>
            );
          })}
        </div>
        <p className={styles.note}>
          Each connection also asks for the other app&apos;s API key, found under Settings, General. Some screens want a full address such as <code>http://radarr:7878</code>, others take the host and port separately.
        </p>
      </div>
    </div>
  );
}
