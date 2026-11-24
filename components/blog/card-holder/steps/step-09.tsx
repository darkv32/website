import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step9() {
  return (
    <Step n={9} title="Punch the stitching holes">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://www.weaverleathersupply.com/pages/how-to-make-your-own-minimal-card-wallet" target="_blank" rel="noopener">
          Weaver guide
        </a>
        <a className={c("tag")} href="https://tandyleather.com/blogs/projects/tandy-skills-saddle-stitching" target="_blank" rel="noopener">
          Tandy, step 2
        </a>
        <span className={c("tag tools")}>
          chisels (1, 2, 4, 6-prong) · nylon mallet · white PVC punch board
        </span>
      </div>
      <p className={c("goal")}>
        A row of evenly spaced holes, 4 mm apart, all the way round the groove, going through both layers. The chisels have 1, 2, 4 and 6 teeth (prongs); the 6-prong does most of the work.
      </p>
      <Facts items={[['Hole spacing','4 mm'],['Main chisel','6-prong'],['Each strike','one firm hit']]} />
      <Phase title="Start">
        <Do>
          <li><strong>Set up:</strong> put the card holder on the white PVC punch board, <strong>stamped front facing up</strong>, on a solid table. Make sure the board isn&apos;t on anything wobbly.</li>
          <li><strong>First strike:</strong> start in the middle of one short end, the same place you started the groove. Put the 6-prong chisel&apos;s teeth in the groove, hold it straight up (not leaning) and hold the leather down with your other hand. Give it <strong>one firm hit</strong> with the nylon mallet, then pull the chisel straight up, wiggling it slightly if it sticks.</li>
        </Do>
      </Phase>
      <Phase title="Go round">
        <Do>
          <li><strong>Overlap by one hole:</strong> put the chisel&apos;s first tooth into the last hole you made, so the spacing stays even. Hit it once and pull it straight up. Repeat until you are about to reach a corner.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              Overlap by one hole.
            </b>
            {' '}Drop the first tooth of the chisel into the last hole you made (green), then strike, so the spacing carries on evenly. At corners use the 2-prong and 1-prong chisels the same way.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 176" role="img" aria-label="Animation, top view: a six-prong chisel strikes to make six holes, slides along so its first tooth sits in the last hole, then strikes again to make five more evenly spaced holes">
            <rect className={c("lf")} x="10" y="72" width="360" height="52" />
            <line className={c("dash")} x1="10" y1="98" x2="370" y2="98" />
            <g className={c("a9h1")}>
              <ellipse className={c("hole")} cx="24" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole")} cx="48" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole")} cx="72" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole")} cx="96" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole")} cx="120" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole")} cx="144" cy="98" rx="3.5" ry="2.8" />
            </g>
            <g className={c("a9h2")}>
              <ellipse className={c("hole-new")} cx="168" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole-new")} cx="192" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole-new")} cx="216" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole-new")} cx="240" cy="98" rx="3.5" ry="2.8" />
              <ellipse className={c("hole-new")} cx="264" cy="98" rx="3.5" ry="2.8" />
            </g>
            <g className={c("a9ch")}>
              <rect className={c("steel")} x="134" y="26" width="140" height="22" rx="3" />
              <polygon className={c("steel")} points="140,48 148,48 144,92" />
              <polygon className={c("steel")} points="164,48 172,48 168,92" />
              <polygon className={c("steel")} points="188,48 196,48 192,92" />
              <polygon className={c("steel")} points="212,48 220,48 216,92" />
              <polygon className={c("steel")} points="236,48 244,48 240,92" />
              <polygon className={c("steel")} points="260,48 268,48 264,92" />
              <polygon className={c("tooth")} points="140,48 148,48 144,92" />
            </g>
            <text x="282" y="42">
              6-prong
            </text>
            <text x="282" y="56" className={c("sub")}>
              tooth 1 in the
            </text>
            <text x="282" y="68" className={c("sub")}>
              last hole
            </text>
            <path className={c("thin")} d="M24 84 H48" markerStart="url(#m-mu)" markerEnd="url(#m-mu)" />
            <text x="36" y="80" className={c("mid sub")}>
              4 mm
            </text>
            <g className={c("a9b1")}>
              <path className={c("thin")} d="M20 134 H144 M20 130 V138 M144 130 V138" />
              <text x="82" y="150" className={c("mid sub")}>
                1st strike: 6 holes
              </text>
            </g>
            <g className={c("a9b2")}>
              <path className={c("thin")} d="M148 134 H268 M148 130 V138 M268 130 V138" />
              <text x="208" y="168" className={c("mid sub")}>
                2nd strike: 5 new holes
              </text>
            </g>
            <text className={c("mid cap a9c1")} x="190" y="14">
              1. strike: holes 1 to 6
            </text>
            <text className={c("mid cap a9c2")} x="190" y="14">
              2. slide right: tooth 1 goes in hole 6
            </text>
            <text className={c("mid cap a9c3")} x="190" y="14">
              3. strike again: five new holes
            </text>
            <text className={c("mid cap a9c4")} x="190" y="14">
              4. keep going, overlap by one hole
            </text>
          </svg>
        </AnimFigure>
        <Do>
          <li><strong>Corners:</strong> switch to the 2-prong, then the 1-prong chisel, and punch single holes about 4 mm apart that follow the curve of the corner. Go back to the 6-prong on the next straight edge.</li>
          <li><strong>Pocket openings:</strong> where a pocket&apos;s opening edge meets the side edge, look for a hole on each side of the opening, about 2 mm away from it. If a hole falls right on the edge, punch a 1-prong hole 2 mm to one side instead. These holes let the stitches lock the top of the pocket.</li>
        </Do>
      </Phase>
      <Phase title="Close the loop and check">
        <Do>
          <li><strong>Close the loop:</strong> when you are about 20 mm from your first hole, stop and look at the gap that is left. Fill it with the 4, 2 or 1-prong chisel, whichever makes the spacing even.</li>
          <li><strong>Check the back:</strong> every hole should be punched through <strong>both layers</strong> where a pocket is. If one isn&apos;t, strike a 1-prong chisel into the same hole again.</li>
        </Do>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="Both sides with a row of stitching holes all the way round">
          <text className={c("mid h sub")} x="86.1" y="14">
            FRONT, smooth side up
          </text>
          <text className={c("mid h sub")} x="296.1" y="14">
            BACK, rough side up
          </text>
          <rect className={c("lf")} x="12" y="28" width="148.2" height="189.8" rx="13.7" />
          <line className={c("foldl")} x1="12" y1="122.9" x2="160.2" y2="122.9" />
          <text className={c("zy")} x="86.1" y="175">
            Z · Y
          </text>
          <rect className={c("holes")} x="17.2" y="33.2" width="137.8" height="179.4" rx="8.5" />
          <rect className={c("bev")} x="13" y="29" width="146.2" height="187.8" rx="12.7" />
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          <clipPath id="clip9">
            <rect x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          </clipPath>
          <g clipPath="url(#clip9)">
            <rect className={c("lf2")} x="213.5" y="18.9" width="165.2" height="66.3" rx="0" />
            <rect className={c("lf2")} x="213.5" y="160.6" width="165.2" height="66.3" rx="0" />
          </g>
          <line className={c("gl")} x1="222" y1="85.2" x2="370.2" y2="85.2" />
          <line className={c("gl")} x1="222" y1="160.6" x2="370.2" y2="160.6" />
          <line className={c("foldl")} x1="222" y1="122.9" x2="370.2" y2="122.9" />
          <rect className={c("holes")} x="227.2" y="33.2" width="137.8" height="179.4" rx="8.5" />
          <rect className={c("bev")} x="223" y="29" width="146.2" height="187.8" rx="12.7" />
        </svg>
        <figcaption>
          A row of holes runs all the way round, 4 mm in, going through both layers where a pocket is. You can see them from both sides.
        </figcaption>
      </figure>
      <Photos step={9} />
    </Step>
  );
}
