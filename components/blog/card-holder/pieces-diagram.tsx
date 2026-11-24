'use client';

import { useState, type ReactNode } from 'react';
import { c } from './cls';

/* The flat stages are drawn at 2 px per mm. The body is 114 x 146 mm, so it is 228 x 292 px with its top left corner at (76, 60). The pockets are 44 mm (88 px) deep, which leaves a 58 mm (116 px) gap, and the fold is 73 mm (146 px) from each end. The sheet stage is drawn at 1.1 px per mm so the whole 305 mm sheet fits. */

interface Stage {
  label: string;
  title: string;
  caption: string;
  /** A short list that follows the caption. */
  items?: readonly string[];
}

const STAGES: readonly Stage[] = [
  {
    label: 'Sheet',
    title: 'Cut from the sheet',
    caption: 'All three pieces come out of one 6 × 12 in (152 × 305 mm) sheet of 1.5 mm veg-tan:',
    items: ['One body, 114 × 146 mm', 'Two pocket strips, 51 × 127 mm each', 'The rest is offcuts, for practising'],
  },
  {
    label: 'Glued on',
    title: 'Glued on, a bit oversize',
    caption:
      'The pocket strips are cut a little bigger than they need to be, on purpose: about 7 mm extra at the end and 6 mm on each side. You glue them on and then trim the overhang off flush in step 6.',
  },
  {
    label: 'Trimmed',
    title: 'Trimmed flush',
    caption:
      'After trimming, each pocket is 44 mm deep and as wide as the body (114 mm). That leaves a 58 mm gap between the pockets, and the body folds in half across the middle of it.',
  },
  {
    label: 'Cards',
    title: 'With cards',
    caption:
      'A card is 86 × 54 mm. Inside the stitch lines the body is about 106 mm wide, so cards slide in sideways with room to spare, and about 1 cm sticks out of each pocket for easy pulling.',
  },
  {
    label: 'Folded',
    title: 'Folded',
    caption: 'Folded in half across the gap, the body closes to 114 × 73 mm.',
  },
];

/** A short arrow pointing at a line from outside it, for measurements too small to fit arrows on both ends. */
const Point = ({ d }: { d: string }) => <path className={c('thin')} d={d} markerEnd="url(#m-fg)" />;
/** A measurement line with an arrowhead at each end. */
const Span = ({ d }: { d: string }) => <path className={c('thin')} d={d} markerStart="url(#m-fg)" markerEnd="url(#m-fg)" />;

/** The cut list's table next to one diagram that follows the pieces from the sheet to the folded holder. The table and the stage captions sit on the left, the stage buttons and drawing on the right. All the captions stay in the page, so they can be read without clicking. */
export function PiecesDiagram({ table }: { table: ReactNode }) {
  const [stage, setStage] = useState(0);
  const on = (s: number) => stage === s;

  return (
    <div className={c('cut-grid')}>
      <div className={c('cut-table')}>{table}</div>

      <figure className={c('fig cut-fig')}>
        <div className={c('seg')} role="group" aria-label="Stage of the pieces">
          {STAGES.map((s, i) => (
            <button key={s.label} type="button" aria-pressed={on(i)} onClick={() => setStage(i)}>
              {i + 1} · {s.label}
            </button>
          ))}
        </div>

        <svg
          className={c('d')}
          viewBox="0 0 380 404"
          role="img"
          aria-label="The pieces at five stages. Sheet: a body and two pocket strips cut from a 6 by 12 inch sheet. Glued on: the strips stick out 7 mm at the end and 6 mm on each side. Trimmed: each pocket is 44 mm deep and 114 mm wide, with a 58 mm gap between them. Cards: a 86 by 54 mm card sits in each pocket with 10 mm showing. Folded: it closes to 114 by 73 mm."
        >
          <defs>
            <pattern id="hatch-trim" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="5" style={{ stroke: 'var(--warn)', strokeWidth: 1.4 }} />
            </pattern>
          </defs>

          {/* 1. the sheet: where the three pieces come from */}
          <g className={c('pz')} data-on={on(0)}>
            <text className={c('sub mid')} x="190" y="22">152 mm (6 in)</text>
            <text className={c('sub mid')} x="90" y="201" transform="rotate(-90 90 201)">305 mm (12 in)</text>
            <g transform="translate(106 34) scale(1.1)">
              <rect className={c('lf')} x="0" y="0" width="152" height="305" />
              <rect className={c('lf2')} x="0" y="0" width="114" height="146" />
              <text className={c('mid')} x="57" y="66">BODY</text>
              <text className={c('sub mid')} x="57" y="80">114×146</text>
              <rect className={c('lf2')} x="0" y="152" width="51" height="127" />
              <rect className={c('lf2')} x="57" y="152" width="51" height="127" />
              <text className={c('sub mid')} x="25.5" y="210">POCKET</text>
              <text className={c('sub mid')} x="25.5" y="224">51×127</text>
              <text className={c('sub mid')} x="82.5" y="210">POCKET</text>
              <text className={c('sub mid')} x="82.5" y="224">51×127</text>
              <text className={c('sub mid tn')} x="133" y="73" transform="rotate(-90 133 73)">offcuts for practice</text>
            </g>
            <text className={c('sub mid')} x="190" y="392">your 1.5 mm veg-tan sheet</text>
          </g>

          {/* the body and the two pockets, as they are after trimming; the oversize strips are drawn over them in stage 2 */}
          <g className={c('pz')} data-on={stage >= 1 && stage <= 3}>
            <rect className={c('lf')} x="76" y="60" width="228" height="292" />
            <rect className={c('lf2')} x="76" y="60" width="228" height="88" />
            <rect className={c('lf2')} x="76" y="264" width="228" height="88" />
            <g className={c('pz')} data-on={on(1) || on(2)}>
              <text className={c('sub mid')} x="190" y="108">pocket</text>
              <text className={c('sub mid')} x="190" y="312">pocket</text>
            </g>
          </g>

          {/* 2. glued on: the overhang that gets trimmed off */}
          <g className={c('pz')} data-on={on(1)}>
            <path className={c('rm')} d="M63 46 H317 V148 H304 V60 H76 V148 H63 Z" />
            <path d="M63 46 H317 V148 H304 V60 H76 V148 H63 Z" fill="url(#hatch-trim)" />
            <path className={c('rm')} d="M63 366 H317 V264 H304 V352 H76 V264 H63 Z" />
            <path d="M63 366 H317 V264 H304 V352 H76 V264 H63 Z" fill="url(#hatch-trim)" />
            <path className={c('ghost')} d="M76 148 V60 H304 V148" />
            <path className={c('ghost')} d="M76 264 V352 H304 V264" />
            <Point d="M330 32 V46" />
            <Point d="M330 74 V60" />
            <text x="336" y="57">7 mm</text>
            <Point d="M48 34 H63" />
            <Point d="M91 34 H76" />
            <text className={c('mid')} x="69" y="26">6 mm</text>
            <rect className={c('rm')} x="76" y="376" width="14" height="10" />
            <rect fill="url(#hatch-trim)" x="76" y="376" width="14" height="10" />
            <text className={c('sub')} x="96" y="385">trimmed off</text>
            <rect className={c('lf2')} x="196" y="376" width="14" height="10" />
            <text className={c('sub')} x="216" y="385">stays on</text>
          </g>

          {/* 3. trimmed: the finished sizes */}
          <g className={c('pz')} data-on={on(2)}>
            <Span d="M76 30 H304" />
            <text className={c('mid')} x="190" y="22">114 mm</text>
            <Span d="M322 60 V352" />
            <text x="328" y="210">146 mm</text>
            <Span d="M58 60 V148" />
            <text className={c('end')} x="52" y="108">44 mm</text>
            <Span d="M58 148 V264" />
            <text className={c('end')} x="52" y="210">58 mm</text>
            <Span d="M58 264 V352" />
            <text className={c('end')} x="52" y="312">44 mm</text>
            <line className={c('foldl')} x1="68" y1="206" x2="312" y2="206" />
            <text className={c('sub mid')} x="190" y="198">fold, 73 mm from each end</text>
          </g>

          {/* 4. with cards: a card in each pocket, 10 mm showing */}
          <g className={c('pz')} data-on={on(3)}>
            <rect className={c('stitch')} x="84" y="68" width="212" height="276" rx="8" />
            {/* each card goes in behind the pocket: the part inside the pocket is veiled, the part showing is not */}
            <rect className={c('cardr')} style={{ fill: 'var(--accent-soft)', stroke: 'var(--accent)' }} x="104" y="60" width="172" height="108" rx="3" />
            <rect style={{ fill: 'var(--surface)', opacity: 0.6 }} x="105" y="61" width="170" height="87" />
            <line className={c('tl')} x1="76" y1="148" x2="304" y2="148" />
            <text className={c('sub mid')} x="190" y="162">card</text>
            <rect className={c('cardr')} style={{ fill: 'var(--accent-soft)', stroke: 'var(--accent)' }} x="104" y="244" width="172" height="108" rx="3" />
            <rect style={{ fill: 'var(--surface)', opacity: 0.6 }} x="105" y="265" width="170" height="86" />
            <line className={c('tl')} x1="76" y1="264" x2="304" y2="264" />
            <text className={c('sub mid')} x="190" y="258">card</text>
            <path className={c('thin')} d="M104 60 V40 M276 60 V40" />
            <Span d="M104 46 H276" />
            <text className={c('mid')} x="190" y="36">86 mm</text>
            <path className={c('thin')} d="M282 148 H288 V168 H282" />
            <path className={c('thin')} d="M288 158 H318" />
            <text className={c('ok')} x="322" y="158">10 mm</text>
            <text className={c('sub ok')} x="322" y="171">showing</text>
            <path className={c('thin')} d="M84 344 V382 M296 344 V382" />
            <Span d="M84 376 H296" />
            <text className={c('mid')} x="190" y="396">106 mm inside the stitching</text>
          </g>

          {/* 5. folded: it closes up to half the height */}
          <g className={c('pz')} data-on={on(4)}>
            <rect className={c('lf')} x="76" y="130" width="228" height="146" rx="14" />
            <rect className={c('stitch')} x="84" y="138" width="212" height="130" rx="9" />
            <line className={c('foldl')} x1="76" y1="130" x2="304" y2="130" />
            <text className={c('sub mid')} x="190" y="122">the fold, now the spine</text>
            <text className={c('zy')} style={{ fontSize: 18 }} x="190" y="209">Z · Y</text>
            <Span d="M76 296 H304" />
            <text className={c('mid')} x="190" y="314">114 mm</text>
            <Span d="M58 130 V276" />
            <text className={c('end')} x="52" y="207">73 mm</text>
          </g>
        </svg>
      </figure>

      <div className={c('cut-cap')} aria-live="polite">
        {STAGES.map((s, i) => (
          <div key={s.label} hidden={!on(i)}>
            <p>
              <b>{s.title}.</b> {s.caption}
            </p>
            {s.items && (
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
