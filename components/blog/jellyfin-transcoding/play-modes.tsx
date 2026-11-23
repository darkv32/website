import { cn } from '@/lib/utils';
import base from '../media-server/media-server.module.css';
import styles from './transcoding.module.css';

type Part = 'asis' | 'repack' | 'conv' | 'heavy';

interface Lane {
  name: string;
  /** What happens to the container, the video and the audio. */
  parts: [Part, Part, Part];
  /** How hard the Pi works, 1 to 3. */
  load: 1 | 2 | 3;
  loadText: string;
}

const PART_TEXT: Record<Part, string> = {
  asis: 'Sent as it is',
  repack: 'Repackaged',
  conv: 'Converted',
  heavy: 'Re-encoded',
};

const LANES: Lane[] = [
  { name: 'Direct play', parts: ['asis', 'asis', 'asis'], load: 1, loadText: 'Almost nothing' },
  { name: 'Direct stream', parts: ['repack', 'asis', 'asis'], load: 1, loadText: 'Cheap' },
  { name: 'Transcode · audio only', parts: ['asis', 'asis', 'conv'], load: 2, loadText: 'Fairly cheap' },
  { name: 'Transcode · video', parts: ['asis', 'heavy', 'asis'], load: 3, loadText: 'Heavy' },
];

/** The three ways Jellyfin plays a file: the file as a bundle and what happens to each part in each mode. */
export function PlayModes() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Diagram · how Jellyfin plays a file</span><span>3 ways, 4 cases</span></div>
      <div className={base.body}>
        <div className={styles.bundle}>
          <div className={styles.file}>
            <span className={base.label}>A video file is a bundle</span>
            <div className={styles.inner}>
              <span className={styles.piece}>Container<small>.mkv, .mp4</small></span>
              <span className={styles.piece}>Video<small>HEVC, Dolby Vision</small></span>
              <span className={styles.piece}>Audio<small>AAC, AC3</small></span>
            </div>
          </div>
          <p className={styles.ask}>
            The TV can only play the formats its hardware and app understand, so Jellyfin checks every part of the bundle against what the TV can take.
          </p>
        </div>

        <div className={styles.lanes}>
          <div className={styles.laneHead} aria-hidden="true">
            <span />
            <div className={styles.colHead}>
              <span className={base.label}>Container</span>
              <span className={base.label}>Video</span>
              <span className={base.label}>Audio</span>
            </div>
            <span className={base.label}>Pi effort</span>
          </div>
          {LANES.map((lane) => (
            <div key={lane.name} className={styles.lane}>
              <span className={styles.laneName}>{lane.name}</span>
              <div className={styles.cells}>
                {lane.parts.map((part, i) => (
                  <span key={i} className={cn(styles.cell, part !== 'asis' && styles[part])}>
                    {PART_TEXT[part]}
                  </span>
                ))}
              </div>
              <div className={styles.meter}>
                <div className={styles.bars} aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <i key={n} className={n <= lane.load ? styles[`l${lane.load}`] : undefined} />
                  ))}
                </div>
                <span className={styles.meterText}>{lane.loadText}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.legend2}>
          <span><i className={styles.sw1} />Untouched</span>
          <span><i className={styles.sw2} />Repackaged, no re-encoding</span>
          <span><i className={styles.sw3} />Converted</span>
          <span><i className={styles.sw4} />Re-encoded</span>
        </div>

        <p className={base.note}>
          The Pi struggles with video because it has no hardware video encoder, so the work lands on its CPU. Many mini PCs can hand this job to their graphics hardware, such as Intel&apos;s Quick Sync, so the same transcode barely registers.
        </p>
      </div>
    </div>
  );
}
