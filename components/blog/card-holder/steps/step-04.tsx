import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step4() {
  return (
    <Step n={4} title="Finish the pocket openings">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://www.weaverleathersupply.com/pages/how-to-make-your-own-minimal-card-wallet" target="_blank" rel="noopener">
          Weaver guide
        </a>
        <span className={c("tag tools")}>
          4# beveler · nail file · Seiwa Tokonole · wooden slicker
        </span>
      </div>
      <p className={c("goal")}>
        Finish the opening edge of each pocket now, because you can&apos;t reach it once the pockets are glued on. Each strip has two long (127 mm) edges: pick one as the opening and work only on that one.
      </p>
      <Facts items={[['Angle','45°'],['Beveler','4# (0.7 mm)'],['Per strip','one long edge']]} />
      <p className={c("prac")}><strong>New to this move? Practise it first:</strong> bevelling and burnishing on the practice strip, in <a href="#step-2b">step 2, part B</a>.</p>
      <Phase title="Bevel the opening edge">
        <Do>
          <li><strong>Position a pocket strip</strong> on the cutting mat, smooth side up, with the opening edge <strong>pointing straight away from you</strong> and a short end nearest you. Hold it down with your other hand, fingers well clear of the beveler&apos;s path.</li>
          <li><strong>Bevel:</strong> set the 4# beveler on the corner at the near end, tilted to about <strong>45°</strong> (see the drawings below). Light pressure, and push it away from you along the whole edge in one smooth stroke. A thin ribbon should come off. Then turn the strip over and bevel the same edge on the other face.</li>
        </Do>
        <figure className={c("fig")}>
          <svg className={c("d")} viewBox="0 0 400 190" role="img" aria-label="End-on view of a leather edge with its top corner shaved off at 45 degrees, and the beveler tilted at 45 degrees on the corner">
            <polygon className={c("lf")} points="20,96 202,96 230,124 230,176 20,176" />
            <polygon className={c("steel")} points="202,96 230,124 302,52 274,24" fillOpacity="0.9" />
            <polyline className={c("ghost")} points="202,96 230,96 230,124" />
            <line className={c("gl")} x1="202" y1="96" x2="230" y2="124" />
            <path className={c("thin")} d="M230 96 H262" />
            <path className={c("gl")} d="M232 96 A30 30 0 0 1 223.2 117.2" />
            <text x="246" y="128" className={c("ok h")}>
              45°
            </text>
            <text x="34" y="142" className={c("sub")}>
              leather, 1.5 mm thick
            </text>
            <text x="240" y="162" className={c("sub")}>
              cut edge
            </text>
            <text x="190" y="66" className={c("end")}>
              this corner comes off
            </text>
            <path className={c("thin")} d="M196 64 L220 100" />
            <text x="312" y="40">
              tool tilted
            </text>
            <text x="312" y="54">
              at 45°
            </text>
          </svg>
          <figcaption>
            <b>
              End-on view, looking along the edge.
            </b>
            {' '}You push the beveler away from you, into the page. It shaves the square corner into a small 45° slope, equal on the top face and the edge. Do the other face the same way.
          </figcaption>
        </figure>
        <AnimFigure
          caption={
            <>
            <b>
              Top view of one pass.
            </b>
            {' '}The strip&apos;s edge points straight away from you. The beveler sits at 45° on the corner and is pushed along in one stroke. A thin ribbon curls off, and the narrow strip left behind is the bevel.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 250" role="img" aria-label="Animation, top view: a beveler is pushed along the edge of a leather strip, away from you, leaving a narrow bevel behind it and a thin ribbon of leather curling off ahead of it">
            <rect className={c("lf")} x="60" y="34" width="110" height="146" />
            <rect className={c("a4bev")} x="162" y="34" width="8" height="146" />
            <text className={c("mid sub")} x="110" y="104">
              leather strip,
            </text>
            <text className={c("mid sub")} x="110" y="118">
              top view
            </text>
            <text className={c("mid sub")} x="110" y="232">
              you
            </text>
            <path className={c("gl")} d="M362 190 V82" markerEnd="url(#m-ok)" />
            <text className={c("end")} x="372" y="70">
              away from you
            </text>
            <text x="222" y="110">
              light pressure,
            </text>
            <text x="222" y="124">
              one smooth stroke
            </text>
            <text className={c("sub")} x="222" y="156">
              the bevel stays behind
            </text>
            <text className={c("sub")} x="222" y="168">
              the tool
            </text>
            <g transform="translate(170 0)">
              <g className={c("a4tool")}>
                <rect className={c("steel")} x="-6" y="0" width="26" height="16" rx="3" />
                <rect className={c("steel")} x="2" y="16" width="10" height="42" rx="2" />
                <path className={c("tl")} d="M4 -1 q-5 -8 2 -13 q8 -5 3 -13" />
              </g>
            </g>
            <text className={c("mid cap a4c1")} x="190" y="16">
              1. start at the near end
            </text>
            <text className={c("mid cap a4c2")} x="190" y="16">
              2. push away from you, light pressure
            </text>
            <text className={c("mid cap a4c3")} x="190" y="16">
              3. look: even slope, same width all along
            </text>
          </svg>
        </AnimFigure>
        <Do>
          <li><strong>Check the edge</strong> against the RIGHT, TOO STEEP and TOO FLAT drawings. If it&apos;s wrong, practise more on the practice strip. Don&apos;t keep trying on the real piece.</li>
        </Do>
        <figure className={c("fig")}>
          <div className={c("fig-row")}>
            <svg className={c("d")} viewBox="0 0 200 150" role="img" aria-label="Correct bevel: an even 45 degree slope on both faces of the edge">
              <polygon className={c("lf")} points="20,60 126,60 140,74 140,86 126,100 20,100" />
              <polyline className={c("gl")} points="126,60 140,74" />
              <polyline className={c("gl")} points="126,100 140,86" />
              <text x="100" y="26" className={c("mid ok h")}>
                RIGHT
              </text>
              <text x="100" y="124" className={c("mid sub")}>
                even 45° slope on
              </text>
              <text x="100" y="137" className={c("mid sub")}>
                both faces
              </text>
            </svg>
            <svg className={c("d")} viewBox="0 0 200 150" role="img" aria-label="Too steep: a deep narrow cut down the side of the edge">
              <polygon className={c("lf")} points="20,60 132,60 140,84 140,100 20,100" />
              <polyline className={c("bd")} points="132,60 140,84" />
              <text x="100" y="26" className={c("mid no h")}>
                TOO STEEP
              </text>
              <text x="100" y="124" className={c("mid sub")}>
                digs down the edge,
              </text>
              <text x="100" y="137" className={c("mid sub")}>
                deep narrow cut
              </text>
            </svg>
            <svg className={c("d")} viewBox="0 0 200 150" role="img" aria-label="Too flat: a long shallow slice across the top, with the corner still nearly square">
              <polygon className={c("lf")} points="20,60 100,60 140,68 140,100 20,100" />
              <polyline className={c("bd")} points="100,60 140,68" />
              <text x="100" y="26" className={c("mid no h")}>
                TOO FLAT
              </text>
              <text x="100" y="124" className={c("mid sub")}>
                skims the surface,
              </text>
              <text x="100" y="137" className={c("mid sub")}>
                corner stays sharp
              </text>
            </svg>
          </div>
          <figcaption>
            <b>
              Check the angle by looking at the edge end-on.
            </b>
            {' '}A small, even slope that is the same width all along is right. If it digs in or only skims, change the tilt. The practice strip is the place to find it.
          </figcaption>
        </figure>
      </Phase>
      <Phase title="Smooth and burnish">
        <Do>
          <li><strong>Smooth</strong> the edge with the finer side of the nail file, held flat against the bevelled slope at the same 45°. Make 3 or 4 light strokes along the edge, all in the same direction, then run a fingertip along it: smooth, no fuzz. If not, a few more strokes.</li>
          <li><strong>Burnish</strong> with Seiwa Tokonole and the slicker: dab a thin film on the edge with a fingertip, then rub quickly back and forth in the slicker groove that fits a single 1.5 mm layer, until it warms up and turns glossy (<a href="#step-11">step 11</a> has a diagram). Do it a second time.</li>
          <li><strong>Do the same on the second strip.</strong></li>
        </Do>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="The stamped body, and two pocket strips whose opening edge, drawn in green, is bevelled and glossy">
          <text className={c("mid h sub")} x="86.1" y="14">
            BODY (waiting), front
          </text>
          <text className={c("mid h sub")} x="270" y="14">
            POCKET STRIPS
          </text>
          <rect className={c("lf")} x="12" y="28" width="148.2" height="189.8" rx="0" />
          <line className={c("foldl")} x1="12" y1="122.9" x2="160.2" y2="122.9" />
          <text className={c("mid sub")} x="86.1" y="117.9">
            fold line
          </text>
          <text className={c("mid sub")} x="86.1" y="79.45">
            back cover
          </text>
          <text className={c("mid sub")} x="86.1" y="146.35">
            front cover
          </text>
          <text className={c("zy")} x="86.1" y="175">
            Z · Y
          </text>
          <rect className={c("lf2")} x="206" y="28" width="66.3" height="165.1" rx="0" />
          <line className={c("gl")} x1="206" y1="28" x2="206" y2="193.1" />
          <text className={c("mid sub")} x="243.15" y="110.55">
            pocket
          </text>
          <text className={c("mid sub")} x="243.15" y="123.55">
            strip
          </text>
          <rect className={c("lf2")} x="290" y="28" width="66.3" height="165.1" rx="0" />
          <line className={c("gl")} x1="290" y1="28" x2="290" y2="193.1" />
          <text className={c("mid sub")} x="327.15" y="110.55">
            pocket
          </text>
          <text className={c("mid sub")} x="327.15" y="123.55">
            strip
          </text>
          <text className={c("mid sub")} x="270" y="224">
            green edge = opening edge,
          </text>
          <text className={c("mid sub")} x="270" y="237">
            bevelled and glossy
          </text>
        </svg>
        <figcaption>
          The body is unchanged. Each pocket strip now has{' '}
          <b>
            one long edge finished
          </b>
          {' '}(green): that is the edge cards slide in past.
        </figcaption>
      </figure>
      <Photos step={4} />
    </Step>
  );
}
