import type { Heading } from '@/lib/headings';
import { c } from './cls';
import { HeroPhoto } from './photos';
import { CutList, Fixes, Glossary, Guides, NextTime, Recessed, WhichSide } from './sections';
import { StepThread, type ThreadGroup } from './step-thread';
import { STEPS } from './steps';

/** The contents list for this post: short names, in the order the sections appear. */
export const CARD_HOLDER_HEADINGS: Heading[] = [
  { id: 'before-you-start', text: 'Before you start', level: 2 },
  { id: 'cutlist', text: 'The pieces', level: 2 },
  ...STEPS.map((s) => ({ id: `step-${s.n}`, text: `${s.n}. ${s.title}`, level: 2 })),
  { id: 'recessed', text: 'Recessed stitching', level: 2 },
  { id: 'guides', text: 'The guides', level: 2 },
  { id: 'fixes', text: 'If something goes wrong', level: 2 },
  { id: 'next-time', text: 'Next time', level: 2 },
];

/** The stages the progress thread groups the steps into. */
const GROUPS: ThreadGroup[] = [
  { label: 'Cut', steps: [1, 2] },
  { label: 'Stamp', steps: [3] },
  { label: 'Pockets', steps: [4, 5, 6] },
  { label: 'Holes', steps: [7, 8, 9] },
  { label: 'Stitch', steps: [10] },
  { label: 'Finish', steps: [11, 12, 13] },
];

const THREAD_STEPS = STEPS.map(({ n, title }) => ({ n, title }));

const H2 = ({ id, children }: { id: string; children: string }) => <h2 id={id}>{children}</h2>;

/** The arrowheads and the hatch the diagrams point at by id. They are defined once for the whole post. */
function Markers() {
  const arrow = (id: string, colour: string) => (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M1 1L9 5L1 9z" style={{ fill: colour }} />
    </marker>
  );
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {arrow('m-fg', 'var(--fg)')}
        {arrow('m-ok', 'var(--accent)')}
        {arrow('m-no', 'var(--warn)')}
        {arrow('m-mu', 'var(--muted)')}
        <pattern id="hatch-glue" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" style={{ stroke: 'var(--accent)', strokeWidth: 2 }} />
        </pattern>
      </defs>
    </svg>
  );
}

/** The body of the card holder post. The page around it (hero, contents, author) comes from BlogArticle. */
export function CardHolderPost() {
  return (
    <div className={c('manual')}>
      <div className={c('hero')}>
        <HeroPhoto />
        <div className={c('hero-text')}>
          <p>
            This is a simple card holder: a small bi-fold holder in natural veg-tan leather, stitched by hand, with two card pockets inside and Z Y stamped on the front.
          </p>
          <p>
            Below is the guide I followed to make it: thirteen steps, a diagram for most of them (many of them animated), and photos of my own piece where I have them.
          </p>
          <p>
            The steps are written for me, to make the piece in one go with no retries, because I was on a time crunch for my girlfriend&apos;s birthday. That is why some steps may look unnecessarily detailed.
          </p>
          <div className={c('facts')}>
            <span className={c('fact')}>
              Open <b>114 × 146 mm</b>
            </span>
            <span className={c('fact')}>
              Folded <b>114 × 73 mm</b>
            </span>
            <span className={c('fact')}>
              Leather <b>1.5 mm veg-tan</b>
            </span>
            <span className={c('fact')}>
              Stitching <b>saddle stitch</b>
            </span>
          </div>
        </div>
      </div>

      <H2 id="before-you-start">Before you start</H2>
      <WhichSide />
      <Glossary />

      <H2 id="cutlist">The pieces</H2>
      <CutList />

      <div className={c('steps-area')}>
        <StepThread steps={THREAD_STEPS} groups={GROUPS} />
        {STEPS.map(({ n, Component }) => (
          <Component key={n} />
        ))}
      </div>

      <H2 id="recessed">Recessed stitching</H2>
      <Recessed />

      <H2 id="guides">The guides</H2>
      <Guides />

      <H2 id="fixes">If something goes wrong</H2>
      <Fixes />

      <H2 id="next-time">Next time</H2>
      <NextTime />

      <Markers />
    </div>
  );
}
