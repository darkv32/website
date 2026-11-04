'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './copy-button';
import { CORE_FIVE, NODES, SORT, SVCS, type AppId } from './data';
import styles from './media-server.module.css';

type On = Record<AppId, boolean>;
const allOn = (): On => Object.fromEntries(SORT.map((k) => [k, true])) as On;

function composeLines(on: On, tz: string, uid: string, gid: string): string[] {
  const out = ['services:'];
  SORT.filter((k) => on[k]).forEach((k, idx) => {
    const s = SVCS[k];
    const env = s.ls ? [`PUID=${uid}`, `PGID=${gid}`, `TZ=${tz}`, ...(s.env ?? [])] : (s.env ?? []).map((e) => (e === 'TZ' ? `TZ=${tz}` : e));
    if (idx) out.push('');
    out.push(`  ${k}:`, `    image: ${s.image}`, `    container_name: ${k}`);
    if (s.init) out.push('    init: true');
    if (s.user) out.push(`    user: "${uid}:${gid}"`);
    if (env.length) out.push(`    environment: [${env.join(', ')}]`);
    if (s.vols) { out.push('    volumes:'); s.vols.forEach((v) => out.push(`      - ${v}`)); }
    out.push(`    ports: [${s.ports.map((p) => `"${p}"`).join(', ')}]`, '    restart: unless-stopped');
  });
  return out;
}

/** Keys get the accent colour; everything else is plain text. */
function paint(lines: string[]): ReactNode {
  return lines.map((line, i) => {
    const m = /^(\s*)([a-z_]+)(:)(.*)$/.exec(line);
    return (
      <span key={i}>
        {m ? <>{m[1]}<span className={styles.yk}>{m[2]}</span>{m[3]}{m[4]}</> : line}
        {'\n'}
      </span>
    );
  });
}

function problems(on: On): string[] {
  const p: string[] = [];
  const a = (k: AppId) => on[k];
  if (a('seerr') && !a('jellyfin')) p.push('Seerr signs in through Jellyfin. Turn Jellyfin on.');
  if (a('seerr') && !a('radarr') && !a('sonarr')) p.push('Seerr needs Radarr or Sonarr to send requests to.');
  if ((a('radarr') || a('sonarr')) && !a('qbittorrent')) p.push('Radarr and Sonarr hand downloads to qBittorrent. Turn it on.');
  if ((a('radarr') || a('sonarr')) && !a('prowlarr')) p.push('Without Prowlarr, Radarr and Sonarr have no indexers to search.');
  if (a('flaresolverr') && !a('prowlarr')) p.push('FlareSolverr only helps Prowlarr. On its own it does nothing.');
  if (a('bazarr') && !a('radarr') && !a('sonarr')) p.push('Bazarr adds subtitles to what Radarr and Sonarr file. It has nothing to watch yet.');
  if (a('maintainerr') && !a('jellyfin')) p.push('Maintainerr reads watch history from Jellyfin. Turn Jellyfin on.');
  return p;
}

export function ComposeBuilder() {
  const [on, setOn] = useState<On>(allOn);
  const [tz, setTz] = useState('Asia/Singapore');
  const [puid, setPuid] = useState('1000');
  const [pgid, setPgid] = useState('1000');

  const active = SORT.filter((k) => on[k]);
  const lines = composeLines(on, tz.trim() || 'UTC', puid.trim() || '1000', pgid.trim() || '1000');
  const withConfig = active.filter((k) => k !== 'flaresolverr');
  const mkdir = withConfig.length ? `cd ~/stack\nmkdir -p config/{${withConfig.join(',')}}` : 'cd ~/stack';
  const issues = problems(on);

  return (
    <div className={styles.try}>
      <div className={styles.tag}><span>Try it · docker-compose.yml</span><span>~/stack</span></div>
      <div className={styles.body}>
        <div className={styles.cmp}>
          <div>
            <div className={styles.svcs}>
              {SORT.map((k) => (
                <button key={k} type="button" className={styles.svc} aria-pressed={on[k]} onClick={() => setOn((o) => ({ ...o, [k]: !o[k] }))}>
                  <span className={styles.box} />
                  {NODES[k].name}
                  <em>:{NODES[k].port}</em>
                </button>
              ))}
            </div>
            <div className={styles.fields}>
              <label>Timezone<input value={tz} onChange={(e) => setTz(e.target.value)} autoComplete="off" spellCheck={false} /></label>
              <label>PUID<input value={puid} onChange={(e) => setPuid(e.target.value)} inputMode="numeric" autoComplete="off" /></label>
              <label>PGID<input value={pgid} onChange={(e) => setPgid(e.target.value)} inputMode="numeric" autoComplete="off" /></label>
            </div>
            <div className={styles.btnRow}>
              <button type="button" className={styles.btn} onClick={() => setOn(allOn())}>All nine</button>
              <button type="button" className={styles.btn} onClick={() => setOn(Object.fromEntries(SORT.map((k) => [k, CORE_FIVE.includes(k)])) as On)}>Core five</button>
            </div>
          </div>
          <div className={styles.out}>
            <CodeBlock text={mkdir} />
            {active.length ? (
              <CodeBlock text={lines.join('\n')} display={paint(lines)} maxHeight={420} />
            ) : (
              <div className={styles.code}><pre className={styles.pre}><span className={styles.cmt}># Switch on at least one container.</span></pre></div>
            )}
            <div className={styles.issues} aria-live="polite">
              {issues.map((text) => <div key={text} className={cn(styles.issue, styles.issueWarn)}>{text}</div>)}
              {!issues.length && active.length > 0 && <div className={cn(styles.issue, styles.issueGood)}>Every container you picked has what it depends on.</div>}
              {on.maintainerr && <div className={styles.issue}>Check Maintainerr&apos;s volume path (<code>/opt/data</code>) against its current documentation before you rely on it.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
