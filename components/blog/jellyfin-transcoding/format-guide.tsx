import { cn } from '@/lib/utils';
import base from '../media-server/media-server.module.css';
import styles from './transcoding.module.css';

/** 3 = plays almost everywhere, 2 = most modern TVs, 1 = depends on the TV (and often on a soundbar or receiver). */
type Support = 1 | 2 | 3;

const SUPPORT_TEXT: Record<Support, string> = {
  3: 'Almost everywhere',
  2: 'Most modern TVs',
  1: 'Depends on the TV',
};

interface Format {
  name: string;
  text: string;
  support: Support;
  /** Replaces the usual caption under the bars. */
  caption?: string;
}

const GROUPS: { label: string; rows: Format[] }[] = [
  {
    label: 'Container',
    rows: [
      { name: 'MP4', text: 'The most widely supported container.', support: 3 },
      { name: 'MKV', text: "Used by most releases. A TV that doesn't like it but is fine with what's inside only needs a direct stream, which is cheap.", support: 2 },
    ],
  },
  {
    label: 'Video',
    rows: [
      { name: 'H.264 (AVC)', text: 'The old reliable. Most 1080p releases use it.', support: 3 },
      { name: 'HEVC (H.265)', text: 'Smaller files at the same quality. Nearly every 4K release uses it.', support: 2 },
      { name: 'AV1', text: 'The newest, with the best compression. Still rare in releases.', support: 1 },
    ],
  },
  {
    label: 'HDR',
    rows: [
      { name: 'HDR10', text: 'The baseline HDR that most 4K TVs understand.', support: 2 },
      { name: 'Dolby Vision', text: 'HDR with extra scene-by-scene data. Needs a TV and app that support it, otherwise the picture may have to be converted.', support: 1 },
    ],
  },
  {
    label: 'Audio',
    rows: [
      { name: 'AAC', text: 'Compact and everywhere. Usually stereo or 5.1.', support: 3 },
      { name: 'AC3 (Dolby Digital)', text: 'The classic 5.1 track on DVDs and many releases.', support: 2 },
      { name: 'E-AC3 (Dolby Digital Plus)', text: 'The newer Dolby track used by streaming releases. It can carry Atmos.', support: 2 },
      { name: 'DTS', text: 'The other big surround format. Often missing on TVs.', support: 1 },
      { name: 'TrueHD, DTS-HD MA', text: 'Lossless Blu-ray and 4K audio. Big, and usually needs a soundbar or receiver to handle it.', support: 1 },
    ],
  },
  {
    label: 'Subtitles',
    rows: [
      { name: 'SRT (text)', text: 'Plain text that the app draws itself, so there is nothing to convert.', support: 3 },
      { name: 'PGS (image)', text: 'Pictures from Blu-rays. Can force Jellyfin to burn them into the picture, which means re-encoding the video.', support: 1, caption: 'Often burned in' },
    ],
  },
];

/** The common video, HDR and audio formats, and how likely a TV is to play each without conversion. */
export function FormatGuide() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Guide · formats and who plays them</span><span>Rough guide, not a rule</span></div>
      <div className={base.body}>
        {GROUPS.map((group) => (
          <div key={group.label} className={styles.fgroup}>
            <span className={base.label}>{group.label}</span>
            {group.rows.map((row) => (
              <div key={row.name} className={styles.frow}>
                <span className={styles.fname}>{row.name}</span>
                <span className={styles.ftext}>{row.text}</span>
                <span className={styles.fsupport}>
                  <span className={styles.bars} aria-hidden="true">
                    {[1, 2, 3].map((n) => (
                      <i key={n} className={n <= row.support ? styles[`c${row.support}`] : undefined} />
                    ))}
                  </span>
                  <span className={styles.meterText}>{row.caption ?? SUPPORT_TEXT[row.support]}</span>
                </span>
              </div>
            ))}
          </div>
        ))}
        <p className={cn(base.note, styles.fnote)}>
          Which formats a TV can play depends on its chip and on the app running on it, so treat the bars as a rough guide. Dolby and DTS formats need licences, which is part of why cheaper and older TVs skip some of them.
        </p>
      </div>
    </div>
  );
}
