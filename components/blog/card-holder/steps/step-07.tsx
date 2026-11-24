import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step7() {
  return (
    <Step n={7} title="Groove the stitch line">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://tandyleather.com/blogs/projects/tandy-skills-saddle-stitching" target="_blank" rel="noopener">
          Tandy saddle stitch, step 1
        </a>
        <span className={c("tag tools")}>
          adjustable groover (from the tool kit) · ruler · offcut
        </span>
      </div>
      <p className={c("goal")}>
        Score a faint line all the way round, 4 mm in from the edge. It is your guide for the holes and keeps the stitches straight. (This is the groover&apos;s shallow line, not to be confused with the grooves in the wooden slicker.)
      </p>
      <div className={c("callout")}>
        <strong>
          Want the stitches to sit in a channel?
        </strong>
        {' '}As written, this step gives you a faint guide line, which means flat stitching. For the recessed look, make a few light passes instead of one.{' '}
        <a href="#recessed">
          Recessed stitching
        </a>
        {' '}shows how, and also how to put the groover together if it came in pieces. Decide before you cut the real piece: the cut can&apos;t be undone.
      </div>
      <Facts items={[['Groove gap','4 mm'],['Start','middle of a short end']]} />
      <Phase title="Set and test the groover">
        <Do>
          <li><strong>Set the groover:</strong> loosen its screw, slide the guide until the gap between the guide and the blade is <strong>4 mm</strong> (measure it against the steel ruler), then tighten the screw.</li>
          <li><strong>Test it on an offcut:</strong> press the guide against the offcut&apos;s edge and pull the groover along. You want a clear, shallow line, not a deep cut. If it&apos;s too faint or too deep, change the pressure.</li>
        </Do>
      </Phase>
      <Phase title="Score the card holder">
        <Do>
          <li><strong>Stamped front facing up.</strong> Start in the middle of one short end. This is also where you will start punching and stitching.</li>
          <li><strong>Guide against the edge, blade on the leather, press lightly,</strong> and pull steadily all the way round. Ease it round the corners, keeping the guide against the curve. When you get back to where you started, lift off.</li>
          <li><strong>Look along the line:</strong> it should be continuous and the same distance from the edge everywhere.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              One arm rides the edge, the other scores the line.
            </b>
            {' '}Set the gap to 4 mm on an offcut first, keep the guide pressed against the edge and move in one steady pass.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 150" role="img" aria-label="Animation, top view: an adjustable groover is pulled along the leather with one arm riding the edge while the blade scores a line 4 millimetres in">
            <rect className={c("lf")} x="20" y="20" width="340" height="114" />
            <line className={c("ln")} x1="20" y1="20" x2="360" y2="20" />
            <line className={c("dash")} x1="60" y1="68" x2="344" y2="68" />
            <path className={c("gl a7line")} pathLength="1" d="M60 68 H344" />
            <g className={c("a7tool")}>
              <rect className={c("steel")} x="204" y="20" width="8" height="34" />
              <rect className={c("steel")} x="204" y="44" width="54" height="10" />
              <rect className={c("steel")} x="250" y="44" width="8" height="24" />
            </g>
            <path className={c("thin")} d="M34 22 V66" markerStart="url(#m-mu)" markerEnd="url(#m-mu)" />
            <text x="40" y="48" className={c("sub")}>
              4 mm
            </text>
            <text x="222" y="12" className={c("sub")}>
              guide rides the edge
            </text>
            <text x="266" y="88" className={c("sub")}>
              blade, 4 mm in
            </text>
            <line className={c("gl")} x1="272" y1="116" x2="340" y2="116" markerEnd="url(#m-ok)" />
            <text x="272" y="108" className={c("sub")}>
              travel
            </text>
            <text x="30" y="124" className={c("sub")}>
              leather, face up
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="The front with a dashed groove line 4 mm in from the edge">
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
          <rect className={c("dash")} x="17.2" y="33.2" width="137.8" height="179.4" rx="8.5" />
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          <clipPath id="clip7">
            <rect x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          </clipPath>
          <g clipPath="url(#clip7)">
            <rect className={c("lf2")} x="213.5" y="18.9" width="165.2" height="66.3" rx="0" />
            <rect className={c("lf2")} x="213.5" y="160.6" width="165.2" height="66.3" rx="0" />
          </g>
          <line className={c("gl")} x1="222" y1="85.2" x2="370.2" y2="85.2" />
          <line className={c("gl")} x1="222" y1="160.6" x2="370.2" y2="160.6" />
          <line className={c("foldl")} x1="222" y1="122.9" x2="370.2" y2="122.9" />
        </svg>
        <figcaption>
          The front has a faint groove line all the way round, 4 mm in from the edge. It is only on the front.
        </figcaption>
      </figure>
      <Photos step={7} />
    </Step>
  );
}
