import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step5() {
  return (
    <Step n={5} title="Glue the pockets on">
      <div className={c("tags")}>
        <span className={c("tag tools")}>
          Fiebing&apos;s Leathercraft Cement (20 ml) · cotton buds · pencil · ruler · binder clips + paper · old cards · heavy book
        </span>
      </div>
      <p className={c("goal")}>
        Stick each pocket onto the back of the body with the Fiebing&apos;s Leathercraft Cement (the small 20 ml bottle with no brush). It is contact cement: it grabs the moment two coated surfaces touch, so you get one go. Line everything up{' '}
        <em>
          before
        </em>
        {' '}they meet.
      </p>
      <div className={c("callout warn")}>
        Work near an open window, since the cement has a solvent smell. Keep the lighter away from it. Put the lid back on straight after each use, so the cement doesn&apos;t thicken.
      </div>
      <Facts items={[['Pocket depth','44 mm'],['Gap between','58 mm'],['Overhang','7 mm end, 6 mm sides'],['Clip','30 minutes']]} />
      <Phase title="Mark the pockets">
        <Do>
          <li><strong>Put the body face down,</strong> so its <strong>rough back is up</strong>. This side becomes the inside of the card holder.</li>
          <li><strong>Draw the pocket lines:</strong> from one short end, measure <strong>44 mm</strong> in at both long edges, make a small tick at each and join the ticks with the ruler in a light pencil line. Do the same from the other end. Check that the two lines are <strong>58 mm</strong> apart. The middle of that gap, 73 mm from each end, is where the body folds later, so keep glue and clips away from it.</li>
          <li><strong>Dry fit each pocket, with no glue:</strong> lay a strip on the body smooth side up (so its rough side is down on the body&apos;s rough side), with one long edge exactly on a pencil line. That is the opening edge, and it faces the middle. The strip should hang past the end by about 7 mm and past each side by about 6 mm, evenly. Slide a card in sideways to check it fits, pull it out, then do the other pocket. Lift both off and keep each beside its own end.</li>
          <li><strong>Mark the glue bands in pencil.</strong> On the body: a band 5 mm wide along the end and down both sides, as far as the pencil line. On the underside of each strip: a band 12 mm wide along the end and both sides. The two bands will meet in the same place. <strong>Keep the opening edge completely clear.</strong> No glue goes there.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              Glue three sides of each pocket, never the opening.
            </b>
            {' '}Draw the band 5 mm in from the body&apos;s edge, and 12 mm in from the strip&apos;s edge on the pocket&apos;s underside. They meet in the same place, because the overhang is trimmed off in the next step. Thin coat on both surfaces, wait until tacky, then press together.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 222" role="img" aria-label="Animation: pencil lines are drawn 44 millimetres from each end of the body, pocket strips are dry fitted with their opening edge on the line, lifted off while glue is spread on three sides, pressed down and clipped">
            <rect className={c("lf")} x="24" y="16" width="148" height="190" />
            <g className={c("a5pt")}>
              <rect className={c("lf2")} x="16" y="7" width="164" height="65" />
            </g>
            <g className={c("a5pb")}>
              <rect className={c("lf2")} x="16" y="148" width="164" height="65" />
            </g>
            <g className={c("a5bd")}>
              <rect x="24" y="16" width="6.5" height="56" fill="url(#hatch-glue)" />
              <rect x="165.5" y="16" width="6.5" height="56" fill="url(#hatch-glue)" />
              <rect x="24" y="16" width="148" height="6.5" fill="url(#hatch-glue)" />
              <rect x="24" y="148" width="6.5" height="58" fill="url(#hatch-glue)" />
              <rect x="165.5" y="148" width="6.5" height="58" fill="url(#hatch-glue)" />
              <rect x="24" y="199.5" width="148" height="6.5" fill="url(#hatch-glue)" />
            </g>
            <path className={c("gl a5pl")} pathLength="1" d="M16 72 H180" />
            <path className={c("gl a5pl")} pathLength="1" d="M16 148 H180" />
            <g className={c("a5ms")}>
              <path className={c("thin")} d="M40 74 V146" markerStart="url(#m-mu)" markerEnd="url(#m-mu)" />
              <text x="44" y="92" className={c("sub")}>
                58 mm
              </text>
              <line className={c("foldl")} x1="24" y1="110" x2="172" y2="110" />
              <text x="122" y="125" className={c("mid sub")}>
                fold line
              </text>
            </g>
            <text x="122" y="90" className={c("mid sub")}>
              body, rough
            </text>
            <text x="122" y="102" className={c("mid sub")}>
              side up
            </text>
            <g className={c("a5cl")}>
              <rect className={c("steel")} x="12" y="34" width="20" height="9" rx="2" />
              <rect className={c("steel")} x="164" y="34" width="20" height="9" rx="2" />
              <rect className={c("steel")} x="12" y="176" width="20" height="9" rx="2" />
              <rect className={c("steel")} x="164" y="176" width="20" height="9" rx="2" />
            </g>
            <text className={c("cap a5c1")} x="196" y="26">
              1. pencil a line
            </text>
            <text className={c("cap a5c1")} x="196" y="40">
              44 mm from each end
            </text>
            <text className={c("cap on a5c2")} x="196" y="26">
              2. dry fit: opening
            </text>
            <text className={c("cap on a5c2")} x="196" y="40">
              on the line, no glue
            </text>
            <text className={c("cap a5c3")} x="196" y="26">
              3. lift off, spread
            </text>
            <text className={c("cap a5c3")} x="196" y="40">
              glue on the bands
            </text>
            <text className={c("cap a5c4")} x="196" y="26">
              4. wait until tacky,
            </text>
            <text className={c("cap a5c4")} x="196" y="40">
              then press down hard
            </text>
            <text className={c("cap a5c5")} x="196" y="26">
              5. clip, paper under
            </text>
            <text className={c("cap a5c5")} x="196" y="40">
              the jaws, 30 minutes
            </text>
            <text x="196" y="78">
              pocket strip,
            </text>
            <text x="196" y="92">
              smooth side up
            </text>
            <rect x="196" y="108" width="16" height="10" fill="url(#hatch-glue)" />
            <text x="220" y="117">
              glue band, 5 mm
            </text>
            <text x="196" y="138">
              no glue along
            </text>
            <text x="196" y="152">
              the opening edges
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <Phase title="Glue and press">
        <Do>
          <li><strong>Spread the cement:</strong> tip a few drops of the Fiebing&apos;s cement onto a scrap of card, pick some up with a cotton bud and spread a thin, even coat on the marked band on the body, then on the marked band on the underside of the first pocket. Both surfaces get a coat. Stay inside the pencil lines, then close the bottle.</li>
          <li><strong>Wait until it is tacky:</strong> touch a spot lightly with a clean fingertip. It should feel sticky, but nothing should come off on your finger and it shouldn&apos;t string. A few minutes; the bottle says how long.</li>
          <li><strong>Press the pocket on:</strong> hold it by its overhanging ends with the opening edge directly above the pencil line. Let one end touch down first, then lay the rest down like closing a book. Don&apos;t slide it around once it touches. Press hard along the glued bands with your fingers, then rub along them with the flat of the slicker.</li>
          <li><strong>Clip it:</strong> fold a bit of paper over each clip&apos;s jaws so the metal doesn&apos;t dent the leather, and clip along the glued bands (the end and both sides), never across the opening edge or the fold zone. Leave for about 30 minutes.</li>
          <li><strong>Repeat</strong> from the cement step for the second pocket. When both are dry, slide a card into each pocket to confirm the opening isn&apos;t stuck shut.</li>
        </Do>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="The back with two pocket strips glued on and sticking out past the body edges">
          <text className={c("mid h sub")} x="86.1" y="14">
            FRONT, smooth side up
          </text>
          <text className={c("mid h sub")} x="296.1" y="14">
            BACK, rough side up
          </text>
          <rect className={c("lf")} x="12" y="28" width="148.2" height="189.8" rx="0" />
          <line className={c("foldl")} x1="12" y1="122.9" x2="160.2" y2="122.9" />
          <text className={c("zy")} x="86.1" y="175">
            Z · Y
          </text>
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="0" />
          <rect className={c("lf2")} x="213.5" y="18.9" width="165.2" height="66.3" rx="0" />
          <rect className={c("lf2")} x="213.5" y="160.6" width="165.2" height="66.3" rx="0" />
          <line className={c("gl")} x1="222" y1="85.2" x2="370.2" y2="85.2" />
          <line className={c("gl")} x1="222" y1="160.6" x2="370.2" y2="160.6" />
          <line className={c("foldl")} x1="222" y1="122.9" x2="370.2" y2="122.9" />
          <text className={c("mid sub")} x="296.1" y="126.9">
            fold line
          </text>
          <text className={c("mid sub")} x="296.1" y="56.6">
            pocket
          </text>
          <text className={c("mid sub")} x="296.1" y="193.2">
            pocket
          </text>
        </svg>
        <figcaption>
          The pockets are glued to the{' '}
          <b>
            rough back
          </b>
          , one at each end, with their opening edges (green) facing the middle. They stick out a little past the body at the end and the sides. The 58 mm gap between them is where it will fold.
        </figcaption>
      </figure>
      <Photos step={5} />
    </Step>
  );
}
