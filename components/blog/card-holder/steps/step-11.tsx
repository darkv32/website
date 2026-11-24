import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step11() {
  return (
    <Step n={11} title="Burnish the outside edges">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://www.weaverleathersupply.com/pages/how-to-make-your-own-minimal-card-wallet" target="_blank" rel="noopener">
          Weaver guide, edge slicking
        </a>
        <span className={c("tag tools")}>
          nail file · Seiwa Tokonole · wooden slicker
        </span>
      </div>
      <p className={c("goal")}>
        Turn the sanded edges into a smooth, glossy finish. Do this{' '}
        <strong>
          before oiling
        </strong>
        {' '}(oiled edges don&apos;t burnish well) and before folding.
      </p>
      <Facts items={[['Per section','5 cm'],['Passes','2'],['Slicker groove','wider for 3 mm, narrower for 1.5 mm']]} />
      <p className={c("prac")}><strong>New to this move? Practise it first:</strong> burnishing the practice strip, in <a href="#step-2b">step 2, part B</a>.</p>
      <Phase title="Sand and burnish, first pass">
        <Do>
          <li><strong>Sand the edges smooth:</strong> run the finer side of the nail file lightly along each outer edge. Keep the file moving so you don&apos;t wear a flat spot, and stop when the layers look and feel like a single smooth surface.</li>
          <li><strong>Dab</strong> a thin film of Seiwa Tokonole on a 5 cm section with a fingertip.</li>
          <li><strong>Pick the groove</strong> that fits. Where a pocket is glued on, the edge is two layers (about 3 mm), so use a wider groove. Elsewhere it is one layer (1.5 mm), so use a narrower groove.</li>
          <li><strong>Rub quickly</strong> back and forth along the section until the edge feels warm and looks glossy. Then move on to the next 5 cm and repeat, all the way round.</li>
        </Do>
        <figure className={c("fig")}>
          <svg className={c("d")} viewBox="0 0 380 196" role="img" aria-label="Left: end-on view of a wooden slicker with three grooves of different sizes and a leather edge sitting in the middle one. Right: the edge before burnishing, dull and fuzzy, and after, smooth and glossy">
            <path className={c("wood")} d="M30 20 H170 V90 H146 A10 10 0 0 0 126 90 H108 A7 7 0 0 0 94 90 H74 A12 12 0 0 0 50 90 H30 Z" />
            <text x="100" y="52" className={c("mid sub")}>
              wooden slicker
            </text>
            <path className={c("lf")} d="M128 172 V92 Q128 78 136 78 Q144 78 144 92 V172 Z" />
            <text x="14" y="124" className={c("sub")}>
              edge sits in
            </text>
            <text x="14" y="137" className={c("sub")}>
              the groove
            </text>
            <text x="14" y="150" className={c("sub")}>
              that fits it
            </text>
            <path className={c("lf")} d="M219 150 V84 L225 74 H239 L245 84 V150 Z" />
            <path className={c("thin")} d="M225 74 L222 66 M230 74 L231 65 M235 74 L237 66 M239 74 L243 68" />
            <text x="232" y="48" className={c("mid h")}>
              BEFORE
            </text>
            <text x="232" y="168" className={c("mid sub")}>
              dull,
            </text>
            <text x="232" y="181" className={c("mid sub")}>
              fuzzy
            </text>
            <path className={c("lf")} d="M309 150 V86 Q309 72 322 72 Q335 72 335 86 V150 Z" />
            <path className={c("hl")} d="M314 86 Q315 79 322 78" />
            <text x="322" y="48" className={c("mid h ok")}>
              AFTER
            </text>
            <text x="322" y="168" className={c("mid sub")}>
              smooth,
            </text>
            <text x="322" y="181" className={c("mid sub")}>
              glossy
            </text>
          </svg>
          <figcaption>
            <b>
              Rub back and forth along the edge.
            </b>
            {' '}Wet it with a little Tokonole, then rub quickly in the groove that fits. The friction heat is what turns the sanded edge glossy. The edge is 3 mm thick where a pocket is glued on and 1.5 mm elsewhere, so use the matching groove for each.
          </figcaption>
        </figure>
        <AnimFigure
          caption={
            <>
            <b>
              Short sections, fast rubbing.
            </b>
            {' '}Work about 5 cm at a time. The friction heat sets the Tokonole and makes the edge shine. Rub in the groove that fits the edge, as in the drawing above.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 170" role="img" aria-label="Animation: Tokonole is dabbed on an edge, then a wooden slicker is rubbed quickly back and forth along it while it moves along, and the edge turns from dull to glossy behind it">
            <rect className={c("lf")} x="30" y="96" width="320" height="26" />
            <rect className={c("a11gloss")} x="30" y="100" width="320" height="4" rx="2" />
            <rect className={c("a11dull")} x="30" y="96" width="320" height="26" />
            <ellipse className={c("a11dab a11d1")} cx="80" cy="109" rx="12" ry="5" />
            <ellipse className={c("a11dab a11d2")} cx="190" cy="109" rx="12" ry="5" />
            <ellipse className={c("a11dab a11d3")} cx="300" cy="109" rx="12" ry="5" />
            <text className={c("sub")} x="30" y="142">
              edge close-up
            </text>
            <text className={c("sub end")} x="350" y="142">
              shiny behind the slicker
            </text>
            <g transform="translate(30 0)">
              <g className={c("a11slide")}>
                <g className={c("a11rub")}>
                  <rect className={c("wood")} x="-40" y="58" width="80" height="38" rx="7" />
                  <text className={c("mid sub")} x="0" y="82">
                    slicker
                  </text>
                </g>
              </g>
            </g>
            <text className={c("mid cap a11c1")} x="190" y="26">
              1. dab a thin film of Tokonole
            </text>
            <text className={c("mid cap a11c2")} x="190" y="26">
              2. rub fast back and forth along the edge
            </text>
            <text className={c("mid cap a11c3")} x="190" y="26">
              3. warm and glossy: do a second pass
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <Phase title="Second pass">
        <Do>
          <li><strong>Let the first pass dry</strong> for a few minutes, until the edge no longer feels damp or tacky. Touch up any fuzzy spots with the finer side of the nail file.</li>
          <li><strong>Tokonole again, thinner than the first time,</strong> and burnish each 5 cm section as before. Too much dries white.</li>
          <li><strong>Finish with cloth:</strong> rub the edge briskly with a scrap of denim or canvas. It also reaches the rounded corners. Two passes are enough.</li>
        </Do>
        <div className={c("callout")}>
          <strong>Edges still fuzzy?</strong>
          <Do>
            <li>File again, use less Tokonole and rub faster. The heat from friction is what makes the shine.</li>
          </Do>
        </div>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="Both sides with burnished, glossy edges">
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
          <rect className={c("stitch")} x="17.2" y="33.2" width="137.8" height="179.4" rx="8.5" />
          <rect className={c("bev")} x="13" y="29" width="146.2" height="187.8" rx="12.7" />
          <rect className={c("glossl")} x="14.6" y="30.6" width="143" height="184.6" rx="11.1" />
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          <clipPath id="clip11">
            <rect x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          </clipPath>
          <g clipPath="url(#clip11)">
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
          The edges are smooth and shiny (the pale line inside the tan edge). It is still flat, with no fold yet.
        </figcaption>
      </figure>
      <Photos step={11} />
    </Step>
  );
}
