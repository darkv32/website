import { cn } from '@/lib/utils';
import base from '../media-server/media-server.module.css';
import styles from './transcoding.module.css';

const ROWS = [
  { stream: 'Video', detail: '', source: '4K · Dolby Vision', result: 'Re-encoded', verdict: 'Heavy', tone: 'bad' },
  { stream: 'Audio', detail: 'Italian, English', source: 'Dolby Digital (AC3) 5.1', result: 'AAC', verdict: 'Converted', tone: 'warn' },
] as const;

/** What the Jellyfin dashboard showed for the TV, laid out as a readout: what was in the file, what the TV got, and how fast the video was being encoded. */
export function SessionCard() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Readout · the live session</span><span>Dashboard</span></div>
      <div className={base.body}>
        <div className={styles.sessHead}>
          <span className={styles.sessApp}>Jellyfin Android TV 0.20.0</span>
          <span className={cn(styles.pill, styles.bad)}>Transcoding</span>
        </div>

        <div className={styles.sess}>
          {ROWS.map((row) => (
            <div key={row.stream} className={styles.sessRow}>
              <span className={styles.sessStream}>
                {row.stream}
                {row.detail && <small>{row.detail}</small>}
              </span>
              <span>{row.source}</span>
              <span className={styles.sessArrow} aria-hidden="true">→</span>
              <span>{row.result}</span>
              <span className={cn(styles.pill, styles[row.tone])}>{row.verdict}</span>
            </div>
          ))}
        </div>

        <div className={styles.fps}>
          <div className={styles.fpsTop}>
            <span className={styles.fpsNum}>12<small>frames per second</small></span>
            <span className={base.label}>Video encoding speed</span>
          </div>
          <div className={styles.track} role="img" aria-label="The video is being encoded at about half of real time">
            <div className={styles.fill} style={{ width: '50%' }} />
            <span className={styles.tick} style={{ left: '100%', marginLeft: '-2px' }} />
          </div>
          <div className={styles.trackLabels}><span>Standing still</span><span>Real time</span></div>
        </div>
        <p className={base.note}>
          The TV&apos;s app told Jellyfin it can&apos;t play AC3, so the audio gets converted. The video is re-encoded at about half of real time, so it stutters.
        </p>
      </div>
    </div>
  );
}
