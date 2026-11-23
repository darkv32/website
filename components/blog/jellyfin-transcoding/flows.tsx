import { cn } from '@/lib/utils';
import base from '../media-server/media-server.module.css';
import styles from './transcoding.module.css';

type Tone = 'plain' | 'ok' | 'warn' | 'bad';

interface Step {
  kicker: string;
  title: string;
  text: string;
  tone?: Tone;
}

/** A row of boxes with arrows between them. */
function Steps({ steps }: { steps: Step[] }) {
  return (
    <div className={styles.chain}>
      {steps.map((step, i) => (
        <div key={step.kicker + step.title} className={styles.link}>
          <div className={cn(styles.step, step.tone && step.tone !== 'plain' && styles[step.tone])}>
            <span className={styles.stepNo}>{step.kicker}</span>
            <span className={styles.stepTitle}>{step.title}</span>
            <span className={styles.stepText}>{step.text}</span>
          </div>
          {i < steps.length - 1 && <span className={styles.chainArrow} aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}

const SETTINGS: Step[] = [
  { kicker: '1 · Audio output', title: 'Set it to Direct', text: 'Not "Downmix to stereo". In downmix mode the app only accepts AAC, MP2 and MP3, so every Dolby file gets converted.' },
  { kicker: '2 · Bitstream Dolby Digital audio', title: 'Turn it on', text: 'Only if the TV or its soundbar handles Dolby Digital.' },
  { kicker: '3 · Prefer FFmpeg for audio playback', title: 'Turn it on', text: 'If it still converts after the first two, so the app decodes the audio itself.' },
  { kicker: 'Then check', title: 'Look at the session', text: 'Play something for a minute. You want to see "Direct playing".', tone: 'ok' },
];

/** The three settings in the TV's Jellyfin app, in the order to try them, and how to check each one worked. */
export function SettingsSteps() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Checklist · Settings → Playback</span><span>One at a time</span></div>
      <div className={base.body}>
        <Steps steps={SETTINGS} />
        <p className={base.note}>Change one setting at a time and check the dashboard in between, so you know which one made the difference.</p>
      </div>
    </div>
  );
}

const TODAY: Step[] = [
  { kicker: 'Today', title: "The TV's own app", text: "Can't play AC3, so it asks Jellyfin to convert.", tone: 'warn' },
  { kicker: 'On the Pi', title: 'Converts the file', text: 'Converts the audio and re-encodes the video. Only 12 fps.', tone: 'bad' },
  { kicker: 'On the TV', title: 'Stutters', text: "The Pi can't keep up with real time.", tone: 'bad' },
];

const STREAMER: Step[] = [
  { kicker: 'With a streamer', title: "The streamer's app", text: 'Decodes more formats, so it says "I can play that".', tone: 'ok' },
  { kicker: 'On the Pi', title: 'Sends the file as it is', text: 'Direct play. Nothing to convert.', tone: 'ok' },
  { kicker: 'On the TV', title: 'Plays smoothly', text: 'The streamer does the decoding.', tone: 'ok' },
];

/** What changes when a streamer runs the Jellyfin app: the conversion doesn't move, it stops being needed. */
export function StreamerFlow() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Diagram · where the work goes</span><span>Why a streamer helps</span></div>
      <div className={base.body}>
        <Steps steps={TODAY} />
        <div className={styles.other}>
          <Steps steps={STREAMER} />
        </div>
      </div>
    </div>
  );
}
