import { cn } from '@/lib/utils';
import base from '../media-server/media-server.module.css';
import styles from '../jellyfin-transcoding/transcoding.module.css';
import { Steps, type Step } from '../jellyfin-transcoding/flows';

const CHECKS = [
  { what: 'Jellyfin session', detail: 'In the dashboard', shows: 'Direct playing', means: 'Nothing was being converted', verdict: 'Ruled out', tone: 'ok' },
  { what: 'CPU usage', detail: 'Over SSH', shows: '90%+ busy', means: 'The Pi was overloaded', verdict: 'The problem', tone: 'bad' },
  { what: 'The busy apps', detail: 'Looking around', shows: 'Bazarr and qBittorrent', means: 'Four seasons of Tulsa King at once', verdict: 'The cause', tone: 'bad' },
] as const;

/** What I checked, in order, and what each check ruled in or out. */
export function Checks() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Readout · what I checked</span><span>{CHECKS.length} checks</span></div>
      <div className={base.body}>
        <div className={styles.sess}>
          {CHECKS.map((row) => (
            <div key={row.what} className={styles.sessRow}>
              <span className={styles.sessStream}>
                {row.what}
                <small>{row.detail}</small>
              </span>
              <span>{row.shows}</span>
              <span className={styles.sessArrow} aria-hidden="true">→</span>
              <span>{row.means}</span>
              <span className={cn(styles.pill, styles[row.tone])}>{row.verdict}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SHARERS = [
  { name: 'qBittorrent', text: 'Four seasons downloading', tone: 'bad' },
  { name: 'Bazarr', text: 'Four seasons of episodes', tone: 'bad' },
  { name: 'Jellyfin', text: 'Direct playing one file', tone: 'ok' },
  { name: 'Everything else', text: 'Seerr, Sonarr, Radarr, Prowlarr, Docker', tone: 'plain' },
] as const;

/** Everything in the stack runs on the same four cores, so one busy app takes cores away from the rest. */
export function SharedCores() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Diagram · one Pi, four cores, everything on it</span><span>Shared CPU</span></div>
      <div className={base.body}>
        <div className={styles.fps}>
          <div className={styles.fpsTop}>
            <span className={styles.fpsNum}>90%+<small>CPU busy</small></span>
            <span className={base.label}>Raspberry Pi 5 · 4 cores</span>
          </div>
          <div className={styles.track} role="img" aria-label="The Pi's CPU was more than 90 percent busy">
            <div className={styles.fill} style={{ width: '92%' }} />
          </div>
          <div className={styles.trackLabels}><span>Idle</span><span>Maxed out</span></div>
        </div>
        <div className={styles.tokens} style={{ marginTop: 14 }}>
          {SHARERS.map((s) => (
            <span key={s.name} className={cn(styles.token, s.tone !== 'plain' && styles[`t_${s.tone}`])}>
              <b>{s.name}</b>
              <small>{s.text}</small>
            </span>
          ))}
        </div>
        <p className={base.note}>
          Direct play is light work, but it still needs its share of the CPU, and with the Pi this busy it was probably getting less than it needed.
        </p>
      </div>
    </div>
  );
}

const BEFORE: Step[] = [
  { kicker: 'Before', title: 'Seerr requests all four seasons', text: 'All of it is queued, then downloaded and processed together.', tone: 'warn' },
  { kicker: 'On the Pi', title: 'CPU at 90%+', text: 'qBittorrent and Bazarr take most of the four cores.', tone: 'bad' },
  { kicker: 'On the TV', title: 'Direct play stutters', text: 'Nothing is being converted, but Jellyfin is starved.', tone: 'bad' },
];

const AFTER: Step[] = [
  { kicker: 'After', title: 'One active torrent', text: 'The rest of the season waits in the queue.', tone: 'ok' },
  { kicker: 'On the Pi', title: 'CPU back to about 20–30%', text: 'Only one download is worked on at a time, so there is much less to do at once.', tone: 'ok' },
  { kicker: 'On the TV', title: 'Plays smoothly', text: 'Jellyfin gets the CPU it needs.', tone: 'ok' },
];

/** The same queue of episodes, before and after limiting qBittorrent to one active torrent. */
export function QueueFix() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Diagram · before and after the limit</span><span>qBittorrent queueing</span></div>
      <div className={base.body}>
        <Steps steps={BEFORE} />
        <div className={styles.other}>
          <Steps steps={AFTER} />
        </div>
      </div>
    </div>
  );
}
