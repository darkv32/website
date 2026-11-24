import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step12() {
  return (
    <Step n={12} title="Fold it and break in the pockets">
      <div className={c("tags")}>
        <span className={c("tag tools")}>
          sponge · pencil or marker (8 mm) · binder clip + paper · 2–3 old cards per pocket
        </span>
      </div>
      <p className={c("goal")}>
        Fold the body in half across the middle, with the smooth sides outside and the pockets inside, and leave it to dry in shape. The cards in the pockets loosen them at the same time.
      </p>
      <Facts items={[['Fold line','73 mm from each end'],['Dampen','6 cm band, 2 minutes'],['Clip','41 mm or wider']]} />
      <p className={c("prac")}><strong>New to this move? Practise it first:</strong> folding an offcut, in <a href="#step-2c">step 2, part C</a>.</p>
      <Phase title="Dampen and fold">
        <Do>
          <li><strong>Find the fold line again:</strong> it is the middle of the 58 mm gap between the pockets, 73 mm from each end. Make a faint pencil line there on the rough side if it has rubbed off.</li>
          <li><strong>Dampen the fold zone:</strong> with a well-squeezed sponge, wipe a band about 6 cm wide along the fold zone, on the <strong>rough side only</strong>. Keep it off the burnished edges, the pockets and the stamped side. Wait about 2 minutes, until the leather looks darker and bends easily.</li>
          <li><strong>Fold it round a pencil:</strong> lay a pencil (or a marker about 8 mm thick) across the fold line on the rough side, between the pockets. Bring the two ends together around it, with the pockets facing in and the smooth sides outside, and press gently along the fold from the middle outwards. Don&apos;t force it. The outside of the fold should be a smooth round curve, with no cracks.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              The pencil keeps the bend round.
            </b>
            {' '}Dampen the rough side only, lay the pencil across the fold line, bring the two ends round it and clip them. The curve around the pencil sets as it dries overnight, so the fold doesn&apos;t crack or crease. Schematic: the real leather is thinner compared with the pencil than it looks here.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 206" role="img" aria-label="Animation, side view: a pencil lies across the fold line on the rough side of the body. The free end is brought up and around it so the two halves lie together with the rough sides facing in and the smooth side outside, then old cards go in the pockets and a clip holds the ends together overnight">
            <rect className={c("lf")} x="90" y="156" width="110" height="6" />
            <g className={c("a12cl")}>
              <rect className={c("lf2")} x="106" y="143" width="84" height="10" />
              <rect className={c("steel")} x="84" y="128" width="22" height="40" rx="3" />
              <path className={c("thin")} d="M148 143 V112" />
              <text x="148" y="104" className={c("mid sub")}>
                old cards in the pockets
              </text>
              <text x="95" y="183" className={c("mid sub")}>
                clip
              </text>
            </g>
            <path className={c("a12arc")} d="M200 159 A11 11 0 0 0 200 137" />
            <g className={c("a12up")}>
              <rect className={c("lf")} x="200" y="156" width="110" height="6" />
            </g>
            <circle className={c("wood")} cx="200" cy="148" r="8" />
            <text className={c("end sub")} x="78" y="146">
              rough sides
            </text>
            <text className={c("end sub")} x="78" y="159">
              face in
            </text>
            <path className={c("thin")} d="M170 163 V176" />
            <text x="170" y="190" className={c("mid sub")}>
              smooth side out
            </text>
            <path className={c("thin")} d="M209 148 H220" />
            <text x="224" y="152" className={c("sub")}>
              pencil spacer
            </text>
            <text className={c("mid cap on a12c1")} x="190" y="16">
              1. pencil across the fold line
            </text>
            <text className={c("mid cap a12c2")} x="190" y="16">
              2. bring the ends together around it
            </text>
            <text className={c("mid cap a12c3")} x="190" y="16">
              3. cards in, clip, leave overnight
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <Phase title="Break in the pockets">
        <Do>
          <li><strong>Slide 2 or 3 old cards</strong> into each pocket.</li>
          <li><strong>Hold it closed</strong> with a binder clip, with folded paper under the jaws, on the open end. It has to be a large clip (41 mm or wider): the small 15–19 mm ones don&apos;t open far enough. No large clip? Wrap the holder in plain, unprinted paper and put a rubber band round it, snug but not tight, or rest a heavy book on it.</li>
          <li><strong>Leave it overnight</strong> somewhere dry and out of the sun.</li>
          <li><strong>Next day,</strong> remove the clip, the cards and the pencil. It should stay folded and close nearly flat.</li>
        </Do>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="The card holder closed, seen from the front, and opened out flat showing a card in each pocket">
          <text className={c("mid h sub")} x="86.1" y="14">
            CLOSED, front
          </text>
          <text className={c("mid h sub")} x="296.1" y="14">
            OPEN, inside
          </text>
          <path className={c("lf")} d="M12 82 H160.2 V163.2 A13.7 13.7 0 0 1 146.5 176.9 H25.7 A13.7 13.7 0 0 1 12 163.2 Z" />
          <path className={c("stitch")} d="M17.2 82 V163.2 A8.5 8.5 0 0 0 25.7 171.7 H146.5 A8.5 8.5 0 0 0 155 163.2 V82" />
          <path className={c("bev")} d="M13 82 V163.2 A12.7 12.7 0 0 0 25.7 175.9 H146.5 A12.7 12.7 0 0 0 159.2 163.2 V82" />
          <path className={c("glossl")} d="M14.6 82 V163.2 A11.1 11.1 0 0 0 25.7 174.3 H146.5 A11.1 11.1 0 0 0 157.6 163.2 V82" />
          <line className={c("foldl")} x1="12" y1="82" x2="160.2" y2="82" />
          <text className={c("mid sub")} x="86.1" y="76">
            fold (the spine)
          </text>
          <text className={c("zy")} x="86.1" y="134.1">
            Z · Y
          </text>
          <text className={c("mid sub")} x="86.1" y="194.9">
            114 × 73 mm
          </text>
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          <rect className={c("cardr")} x="240.2" y="30.6" width="111.8" height="70.2" rx="3" />
          <rect className={c("cardr")} x="240.2" y="145" width="111.8" height="70.2" rx="3" />
          <clipPath id="clip12">
            <rect x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          </clipPath>
          <g clipPath="url(#clip12)">
            <rect className={c("lf2")} x="213.5" y="18.9" width="165.2" height="66.3" rx="0" />
            <rect className={c("lf2")} x="213.5" y="160.6" width="165.2" height="66.3" rx="0" />
          </g>
          <line className={c("gl")} x1="222" y1="85.2" x2="370.2" y2="85.2" />
          <line className={c("gl")} x1="222" y1="160.6" x2="370.2" y2="160.6" />
          <line className={c("foldl")} x1="222" y1="122.9" x2="370.2" y2="122.9" />
          <rect className={c("stitch")} x="227.2" y="33.2" width="137.8" height="179.4" rx="8.5" />
          <rect className={c("bev")} x="223" y="29" width="146.2" height="187.8" rx="12.7" />
          <rect className={c("glossl")} x="224.6" y="30.6" width="143" height="184.6" rx="11.1" />
        </svg>
        <figcaption>
          Left: the card holder closed, 114 × 73 mm, with the Z·Y on the front cover. Right: opened out flat, the inside, with a card in each pocket sticking out about 1 cm.
        </figcaption>
      </figure>
      <Photos step={12} />
    </Step>
  );
}
