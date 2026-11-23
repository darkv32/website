import { cn } from '@/lib/utils';
import base from '../media-server/media-server.module.css';
import styles from './transcoding.module.css';

type Tone = 'plain' | 'ok' | 'warn' | 'bad';

interface Step {
  title: string;
  text: string;
  tone: Tone;
}

const AUDIO: Step[] = [
  { title: "TV can't play AC3", text: "The TV's app tells Jellyfin it can't play it.", tone: 'plain' },
  { title: 'Audio is converted', text: 'AC3 becomes AAC.', tone: 'warn' },
  { title: 'The Pi copes', text: 'Converting audio is cheap, even for a Pi.', tone: 'ok' },
];

const VIDEO: Step[] = [
  { title: '4K Dolby Vision file', text: 'The picture is re-encoded too. The dashboard lists the reason.', tone: 'plain' },
  { title: 'Re-encoded on the CPU', text: 'The Pi has no hardware video encoder.', tone: 'bad' },
  { title: 'Only 12 fps', text: 'Half of real time, so it falls behind.', tone: 'bad' },
  { title: 'Playback stutters', text: 'Stop-start, borderline unwatchable.', tone: 'bad' },
];

function Row({ label, steps }: { label: string; steps: Step[] }) {
  return (
    <div className={styles.chainRow}>
      <span className={base.label}>{label}</span>
      <div className={styles.chain}>
        {steps.map((step, i) => (
          <div key={step.title} className={styles.link}>
            <div className={cn(styles.step, step.tone !== 'plain' && styles[step.tone])}>
              <span className={styles.stepNo}>{i + 1}</span>
              <span className={styles.stepTitle}>{step.title}</span>
              <span className={styles.stepText}>{step.text}</span>
            </div>
            {i < steps.length - 1 && <span className={styles.chainArrow} aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** The two things that happened to the file: the audio was converted (cheap), and the video was re-encoded (the part that stuttered). */
export function Chain() {
  return (
    <div className={base.try}>
      <div className={base.tag}><span>Diagram · where the stutter comes from</span><span>Audio and video</span></div>
      <div className={base.body}>
        <Row label="The audio" steps={AUDIO} />
        <Row label="The video" steps={VIDEO} />
        <div className={styles.other}>
          <span className={base.label}>My other TV</span>
          <span className={styles.otherFlow}>
            <b>No Time to Die</b> has AAC audio
            <span className={styles.chainArrow} aria-hidden="true">→</span>
            nothing to convert
            <span className={styles.chainArrow} aria-hidden="true">→</span>
            <span className={cn(styles.pill, styles.ok)}>Direct play</span>
          </span>
        </div>
      </div>
    </div>
  );
}
