import { cn } from '@/lib/utils';
import base from '../media-server/media-server.module.css';
import styles from './transcoding.module.css';

type Tone = 'plain' | 'ok' | 'warn' | 'bad';

interface Token {
  text: string;
  meaning: string;
  tone: Tone;
}

const EXAMPLES: { label: string; tokens: Token[]; verdict: string }[] = [
  {
    label: 'The kind that needs transcoding for me',
    tokens: [
      { text: '2160p', meaning: 'Resolution (4K)', tone: 'plain' },
      { text: 'WEB-DL', meaning: 'Source (a streaming service)', tone: 'plain' },
      { text: 'DV', meaning: 'Dolby Vision', tone: 'bad' },
      { text: 'HDR', meaning: 'HDR10', tone: 'plain' },
      { text: 'DD5.1', meaning: 'AC3 audio (Dolby Digital)', tone: 'warn' },
      { text: 'H.265', meaning: 'HEVC video', tone: 'plain' },
    ],
    verdict: 'Plays fine on a TV that handles Dolby Vision and Dolby audio. Otherwise the Pi has to convert it.',
  },
  {
    label: 'The kind that nearly always direct plays',
    tokens: [
      { text: '1080p', meaning: 'Resolution (Full HD)', tone: 'plain' },
      { text: 'WEB-DL', meaning: 'Source (a streaming service)', tone: 'plain' },
      { text: 'AAC2.0', meaning: 'AAC stereo audio', tone: 'ok' },
      { text: 'H.264', meaning: 'AVC video', tone: 'ok' },
    ],
    verdict: 'Both formats are understood almost everywhere, so there is nothing for the Pi to convert.',
  },
];

/** Two made-up release names, taken apart: the tags in a release name are what a quality profile and its custom formats can match on. */
export function ReleaseName() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Decoder · reading a release name</span><span>Example names, not real releases</span></div>
      <div className={base.body}>
        {EXAMPLES.map((ex) => (
          <div key={ex.label} className={styles.rel}>
            <span className={base.label}>{ex.label}</span>
            <div className={styles.tokens}>
              {ex.tokens.map((t) => (
                <span key={t.text} className={cn(styles.token, t.tone !== 'plain' && styles[`t_${t.tone}`])}>
                  <b>{t.text}</b>
                  <small>{t.meaning}</small>
                </span>
              ))}
            </div>
            <p className={styles.relVerdict}>{ex.verdict}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
