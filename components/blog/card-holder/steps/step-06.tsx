import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step6() {
  return (
    <Step n={6} title="Trim flush and round the corners">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://www.weaverleathersupply.com/pages/how-to-make-your-own-minimal-card-wallet" target="_blank" rel="noopener">
          Weaver guide
        </a>
        <span className={c("tag tools")}>
          craft knife · steel ruler · paper · Singapore 20-cent coin (21 mm) · pencil · nail file
        </span>
      </div>
      <p className={c("goal")}>
        Cut off the pocket overhang so the edges are flush, round the four corners, then file everything smooth. There is a diagram for each part: the first shows the trim, the second the corners, the third the filing.
      </p>
      <Facts items={[['Trim','2 or 3 light passes'],['Cuts','3 per pocket, 6 in all'],['Corner radius','about 10 mm (20-cent coin)']]} />
      <Phase title="Trim the overhang">
        <Do>
          <li><strong>Turn it over</strong> so the <strong>stamped front faces up</strong>. The pocket overhang is now underneath, sticking out past the edges of the body. Lay a sheet of paper over the front to protect the stamping.</li>
          <li><strong>Ruler on the edge:</strong> put the steel ruler on the paper with its edge <strong>exactly on the edge of the body</strong>. Look from above to check, then press it down hard with your flat hand, fingers well back from the edge.</li>
          <li><strong>Cut:</strong> hold the knife <strong>upright</strong> (90° to the mat, not leaning), with the flat of the blade touching the ruler&apos;s edge, and run it down the ruler&apos;s edge in 2 or 3 <strong>light passes</strong>. Don&apos;t try to cut through in one go. The overhang drops away.</li>
          <li><strong>Repeat for every overhang.</strong> Each pocket sticks out on <strong>three sides</strong> (its end and both of its sides), so that is 3 cuts per pocket, 6 in all. Move the ruler for each one. The long sides in the gap between the pockets have no overhang, so there is nothing to cut there.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              Press the ruler down, keep the blade upright, and take 2 or 3 light passes.
            </b>
            {' '}End-on view of the card holder flipped front up, with paper over the stamping. The ruler&apos;s edge sits exactly on the body&apos;s edge, so the blade runs along the ruler and slices the pocket overhang off flush with the body. Do the end and both sides of each pocket.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 226" role="img" aria-label="Animation, end-on cross-section: the card holder lies on a cutting mat with the stamped front up, a sheet of paper over it and a steel ruler on top with its edge exactly on the body edge. A knife held upright makes three light passes down the ruler edge and the pocket overhang beyond the body falls away">
            <rect className={c("stone")} x="20" y="180" width="340" height="22" />
            <text x="30" y="195" className={c("sub")}>
              cutting mat
            </text>
            <rect className={c("lf2")} x="120" y="164" width="100" height="16" />
            <rect className={c("lf")} x="120" y="148" width="100" height="16" />
            <rect className={c("paper")} x="116" y="142" width="104" height="6" />
            <g className={c("a6ov")}>
              <rect className={c("rm")} x="220" y="164" width="50" height="16" />
            </g>
            <rect className={c("steel")} x="140" y="119" width="80" height="23" />
            <text x="180" y="134" className={c("mid sub")}>
              steel ruler
            </text>
            <path className={c("gl a6cutl")} pathLength="1" d="M220 164 V180" />
            <g className={c("a6k")}>
              <rect className={c("wood")} x="212" y="36" width="20" height="70" rx="3" />
              <rect className={c("steel")} x="220" y="106" width="3" height="72" />
            </g>
            <text className={c("end sub")} x="110" y="148">
              paper
            </text>
            <text className={c("end sub")} x="110" y="160">
              body
            </text>
            <text className={c("end sub")} x="110" y="176">
              pocket
            </text>
            <text x="18" y="100" className={c("sub")}>
              stamped front
            </text>
            <text x="18" y="112" className={c("sub")}>
              faces up
            </text>
            <text x="244" y="72" className={c("sub")}>
              blade upright,
            </text>
            <text x="244" y="85" className={c("sub")}>
              90° to the mat
            </text>
            <path className={c("thin")} d="M242 88 L226 116" />
            <text x="282" y="146" className={c("sub")}>
              overhang
            </text>
            <text x="282" y="159" className={c("sub")}>
              (gets cut off)
            </text>
            <path className={c("thin")} d="M300 162 L268 170" />
            <text className={c("mid cap on a6ka1")} x="190" y="218">
              1. ruler edge exactly on the body edge
            </text>
            <text className={c("mid cap a6ka2")} x="190" y="218">
              2. blade upright, three light passes
            </text>
            <text className={c("mid cap a6ka3")} x="190" y="218">
              3. the overhang comes away
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <Phase title="Round the corners">
        <Do>
          <li><strong>Trace the curve:</strong> put a Singapore 20-cent coin (21 mm across) into one corner, tight against both edges, and trace its curve with the pencil. The corner radius is the coin&apos;s radius, about 10 mm. Do the same in the other three corners.</li>
          <li><strong>Cut each corner in three short straight cuts.</strong> Make two extra pencil dots on the curve, evenly spaced, so you have four points in a row: where the curve leaves the top edge, two between, and where it leaves the side edge. Cut from point to point with the knife, using the ruler as a guide where you can, and stay on the waste side of the pencil line. Each cut takes 2 or 3 light passes, and the little piece in the corner falls away.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              Three short straight cuts are easier than one curve.
            </b>
            {' '}Trace a Singapore 20-cent coin (21 mm across, so a corner radius of about 10 mm). The shaded piece is what you cut away. Do all four corners the same way, then file each one smooth.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 190" role="img" aria-label="Animation: a Singapore 20 cent coin, 21 millimetres across, is traced in the corner, three short straight cuts are made along it, the waste piece falls away and the points are filed smooth">
            <rect className={c("lf")} x="20" y="30" width="180" height="150" />
            <polygon className={c("rm a6waste")} points="130,30 200,30 200,100 190.6,65 165,39.4" />
            <polygon className={c("a6cut")} points="130,28 202,28 202,100 190.6,65 165,39.4" />
            <circle className={c("dash a6coin")} cx="130" cy="100" r="70" />
            <g className={c("a6segs")}>
              <path className={c("gl a6s1")} pathLength="1" d="M130 30 L165 39.4" />
              <path className={c("gl a6s2")} pathLength="1" d="M165 39.4 L190.6 65" />
              <path className={c("gl a6s3")} pathLength="1" d="M190.6 65 L200 100" />
            </g>
            <path className={c("a6arc")} d="M130 30 A70 70 0 0 1 200 100" />
            <text x="130" y="98" className={c("mid sub")}>
              20¢ coin,
            </text>
            <text x="130" y="111" className={c("mid sub")}>
              21 mm across
            </text>
            <g className={c("a6t1")}>
              <text x="214" y="42">
                1. trace a coin
              </text>
              <text x="214" y="56">
                in the corner
              </text>
            </g>
            <g className={c("a6t2")}>
              <text x="214" y="90">
                2. cut three short
              </text>
              <text x="214" y="104">
                straight lines
              </text>
            </g>
            <g className={c("a6t3")}>
              <text x="214" y="138">
                3. file the points
              </text>
              <text x="214" y="152">
                until it is smooth
              </text>
            </g>
          </svg>
        </AnimFigure>
      </Phase>
      <Phase title="File smooth">
        <Do>
          <li><strong>Go all the way round all four sides</strong> of the piece, not just where the pockets are.</li>
          <li><strong>Straight edges:</strong> use the finer side of the file, held flat against the edge so it covers the body and the pocket layers together. Make 3 or 4 light strokes along the edge, all in the same direction, until the layers are level.</li>
          <li><strong>Corners:</strong> use the coarser side first, filing along the curve until the three cuts blend into one round shape, then the finer side.</li>
          <li><strong>Check by touch:</strong> run a fingertip over every edge and corner. The body and the pocket layers should feel like <strong>one flat surface, with no step between them</strong>. If you can feel a step or a point, do a few more strokes there.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              File until it feels like one piece.
            </b>
            {' '}Use the finer side of the nail file, flat against the edge, with 3 or 4 light strokes in the same direction. On the corners, file along the curve until the three cuts blend into one round shape. Then run a fingertip over it: you should feel no step between the body and the pocket layers.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 250" role="img" aria-label="Animation, two views: on the left an end-on cross-section of the glued edge where the pocket sticks out a hair past the body, and a nail file held flat against the edge wears the step away; on the right a top view of a corner where the points left by the three cuts are filed into one round curve">
            <text x="95" y="18" className={c("mid h")}>
              THE EDGE
            </text>
            <text x="95" y="31" className={c("mid sub")}>
              end-on view
            </text>
            <rect className={c("lf")} x="30" y="78" width="80" height="16" />
            <rect className={c("lf2")} x="30" y="94" width="80" height="16" />
            <g className={c("a6stp")}>
              <rect className={c("rm")} x="110" y="94" width="10" height="16" />
            </g>
            <g className={c("a6file")}>
              <rect className={c("wood")} x="127" y="42" width="8" height="22" rx="2" />
              <rect className={c("steel")} x="122" y="64" width="14" height="60" rx="2" />
              <circle className={c("thin a6dot")} cx="129" cy="94" r="4.5" />
              <circle cx="129" cy="94" r="1.4" style={{ fill: "var(--fg)" }} />
            </g>
            <text x="95" y="146" className={c("mid sub")}>
              step you can feel
            </text>
            <path className={c("thin")} d="M100 138 L114 114" />
            <text x="95" y="172" className={c("mid sub")}>
              nail file held flat against
            </text>
            <text x="95" y="185" className={c("mid sub")}>
              the edge, finer side.
            </text>
            <text x="95" y="203" className={c("mid sub")}>
              the dot = strokes run along
            </text>
            <text x="95" y="216" className={c("mid sub")}>
              the edge, into the page
            </text>
            <text x="285" y="18" className={c("mid h")}>
              THE CORNER
            </text>
            <text x="285" y="31" className={c("mid sub")}>
              top view
            </text>
            <path className={c("lf")} d="M214 190 V70 H296 A64 64 0 0 1 360 134 V190 Z" />
            <g className={c("a6pts")}>
              <path className={c("ghost")} d="M296 70 L330 74 L356 100 L360 134" />
              <circle className={c("ghost")} cx="330" cy="74" r="5" />
              <circle className={c("ghost")} cx="356" cy="100" r="5" />
            </g>
            <path className={c("gl a6fa")} d="M296 56 A78 78 0 0 1 374 134" markerEnd="url(#m-ok)" />
            <text x="206" y="48" className={c("sub")}>
              points left by
            </text>
            <text x="206" y="61" className={c("sub")}>
              the three cuts
            </text>
            <path className={c("thin")} d="M298 56 L324 70" />
            <text x="285" y="210" className={c("mid sub")}>
              file along the curve,
            </text>
            <text x="285" y="223" className={c("mid sub")}>
              finer side, light strokes
            </text>
            <text className={c("mid cap on a6sm1")} x="190" y="244">
              1. file flat on the edge, light strokes
            </text>
            <text className={c("mid cap a6sm2")} x="190" y="244">
              2. the step and the points wear away
            </text>
            <text className={c("mid cap a6sm3")} x="190" y="244">
              3. fingertip check: one flat surface
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="Both sides with rounded corners and pockets trimmed flush">
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
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          <clipPath id="clip6">
            <rect x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          </clipPath>
          <g clipPath="url(#clip6)">
            <rect className={c("lf2")} x="213.5" y="18.9" width="165.2" height="66.3" rx="0" />
            <rect className={c("lf2")} x="213.5" y="160.6" width="165.2" height="66.3" rx="0" />
          </g>
          <line className={c("gl")} x1="222" y1="85.2" x2="370.2" y2="85.2" />
          <line className={c("gl")} x1="222" y1="160.6" x2="370.2" y2="160.6" />
          <line className={c("foldl")} x1="222" y1="122.9" x2="370.2" y2="122.9" />
        </svg>
        <figcaption>
          The overhang is gone, so the pockets are flush with the body, and all four corners are rounded. The front is unchanged apart from the corners.
        </figcaption>
      </figure>
      <Photos step={6} />
    </Step>
  );
}
