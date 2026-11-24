import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step8() {
  return (
    <Step n={8} title="Bevel the outside edges">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://www.weaverleathersupply.com/pages/how-to-make-your-own-minimal-card-wallet" target="_blank" rel="noopener">
          Weaver guide
        </a>
        <span className={c("tag tools")}>
          4# beveler
        </span>
      </div>
      <p className={c("goal")}>
        Round off the sharp outer corners, the same way as in step 4, all the way round the piece. The pocket opening edges are already done, so skip those. The edge is{' '}
        <strong>
          one layer
        </strong>
        {' '}(1.5 mm) between the pockets and{' '}
        <strong>
          two layers
        </strong>
        {' '}(3 mm) along each pocket. You bevel it the same way in both places (second diagram).
      </p>
      <Facts items={[['Angle','45°'],['Edge','1.5 mm between pockets, 3 mm along them']]} />
      <p className={c("prac")}><strong>New to this move? Practise it first:</strong> bevelling on the practice strip, in <a href="#step-2b">step 2, part B</a>.</p>
      <Phase title="Bevel the front">
        <Do>
          <li><strong>Edge by edge:</strong> turn the card holder so the edge you are working on <strong>points straight away from you</strong>. Set the beveler on the corner at the near end, tilted to about <strong>45°</strong>, light pressure, and push it away from you along the edge in one smooth stroke.</li>
          <li><strong>Work in short sections,</strong> joining each stroke to the last. Go round the corners in short strokes that follow the curve. Turn the piece for the next edge and repeat, until you are back where you started.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              Front first, then flip.
            </b>
            {' '}Use the same 45° tilt as in step 4, with the edge you&apos;re working on pointing away from you. Go round the corners in short strokes, following the curve. Arrows show one way round; the direction doesn&apos;t matter.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 200" role="img" aria-label="Animation: arrows go all the way round the edge of the front, then all the way round the back, including the pocket edges">
            <rect className={c("lf")} x="40" y="20" width="100" height="128" rx="9" />
            <line className={c("gl a8f1")} x1="58" y1="28" x2="122" y2="28" markerEnd="url(#m-ok)" />
            <line className={c("gl a8f2")} x1="132" y1="42" x2="132" y2="126" markerEnd="url(#m-ok)" />
            <line className={c("gl a8f3")} x1="122" y1="140" x2="58" y2="140" markerEnd="url(#m-ok)" />
            <line className={c("gl a8f4")} x1="48" y1="126" x2="48" y2="42" markerEnd="url(#m-ok)" />
            <line className={c("foldl")} x1="40" y1="84" x2="140" y2="84" />
            <text x="90" y="79" className={c("mid sub")}>
              fold line
            </text>
            <text x="90" y="118" className={c("mid sub")}>
              Z · Y
            </text>
            <g className={c("a8lf")}>
              <text x="90" y="172" className={c("mid h")}>
                1 FRONT
              </text>
              <text x="90" y="187" className={c("mid sub")}>
                all the way round
              </text>
            </g>
            <rect className={c("lf")} x="240" y="20" width="100" height="128" rx="9" />
            <line className={c("dash")} x1="240" y1="59" x2="340" y2="59" />
            <line className={c("dash")} x1="240" y1="109" x2="340" y2="109" />
            <line className={c("foldl")} x1="240" y1="84" x2="340" y2="84" />
            <text x="290" y="79" className={c("mid sub")}>
              fold line
            </text>
            <text x="290" y="43" className={c("mid sub")}>
              pocket
            </text>
            <text x="290" y="132" className={c("mid sub")}>
              pocket
            </text>
            <line className={c("gl a8b1")} x1="258" y1="28" x2="322" y2="28" markerEnd="url(#m-ok)" />
            <line className={c("gl a8b2")} x1="332" y1="42" x2="332" y2="126" markerEnd="url(#m-ok)" />
            <line className={c("gl a8b3")} x1="322" y1="140" x2="258" y2="140" markerEnd="url(#m-ok)" />
            <line className={c("gl a8b4")} x1="248" y1="126" x2="248" y2="42" markerEnd="url(#m-ok)" />
            <g className={c("a8lb")}>
              <text x="290" y="172" className={c("mid h")}>
                2 BACK
              </text>
              <text x="290" y="187" className={c("mid sub")}>
                include the pocket edges
              </text>
            </g>
          </svg>
        </AnimFigure>
        <div className={c("callout")}>
          <strong>Crossing from one layer to two</strong>
          <Do>
            <li>On the front you are always bevelling the body&apos;s own top corner, so the stroke doesn&apos;t change.</li>
            <li>Where a pocket&apos;s opening edge meets the side edge, the edge steps from 3 mm to 1.5 mm. Stop the stroke just before the step and lift the tool, then put it down again just past the step and carry on. Don&apos;t try to push through the step in one stroke.</li>
          </Do>
        </div>
      </Phase>
      <Phase title="Flip and bevel the back">
        <Do>
          <li>The back face is the <strong>pocket&apos;s smooth side</strong> along each pocket, and the body&apos;s <strong>rough side</strong> in the gap between them. Bevel whichever one is there.</li>
          <li>Along a pocket you bevel the pocket&apos;s outer corner. Leave the glue seam between the body and the pocket alone. Use the same 45° tilt and the same light, single stroke, and stop and restart at the step as before.</li>
        </Do>
      </Phase>
      <Phase title="Blend and check">
        <Do>
          <li><strong>Blend the steps:</strong> at each place where the edge changes from 1 layer to 2, make 2 or 3 light strokes with the finer side of the nail file to blend the two bevels.</li>
          <li><strong>Check by touch:</strong> run a fingertip along each edge. The sharp corner should feel gone on both faces, but you should still feel a clear edge. If it digs in or only skims, compare it with the drawings in <a href="#step-4">step 4</a>.</li>
        </Do>
        <figure className={c("fig")}>
          <div className={c("fig-row")}>
            <svg className={c("d")} viewBox="0 0 200 200" role="img" aria-label="End-on view of an edge with one layer of leather, with both the top and the bottom corner bevelled">
              <text x="100" y="18" className={c("mid h")}>
                1 LAYER
              </text>
              <text x="100" y="32" className={c("mid sub")}>
                between the pockets
              </text>
              <polygon className={c("lf")} points="20,66 150,66 162,78 162,92 150,104 20,104" />
              <polyline className={c("gl")} points="150,66 162,78" />
              <polyline className={c("gl")} points="150,104 162,92" />
              <text x="20" y="58" className={c("sub")}>
                front face
              </text>
              <text x="20" y="122" className={c("sub")}>
                back face (rough)
              </text>
              <text x="100" y="160" className={c("mid sub")}>
                2 bevels:
              </text>
              <text x="100" y="173" className={c("mid sub")}>
                top corner and
              </text>
              <text x="100" y="186" className={c("mid sub")}>
                bottom corner
              </text>
            </svg>
            <svg className={c("d")} viewBox="0 0 200 200" role="img" aria-label="End-on view of an edge with two glued layers of leather, with the top corner of the body and the bottom corner of the pocket bevelled and the glue seam between them left alone">
              <text x="100" y="18" className={c("mid h")}>
                2 LAYERS
              </text>
              <text x="100" y="32" className={c("mid sub")}>
                along each pocket
              </text>
              <polygon className={c("lf")} points="20,50 150,50 162,62 162,114 150,126 20,126" />
              <line className={c("dash")} x1="20" y1="88" x2="162" y2="88" />
              <polyline className={c("gl")} points="150,50 162,62" />
              <polyline className={c("gl")} points="150,126 162,114" />
              <text x="28" y="72" className={c("sub")}>
                body
              </text>
              <text x="28" y="110" className={c("sub")}>
                pocket
              </text>
              <text x="20" y="44" className={c("sub")}>
                front face
              </text>
              <text x="20" y="142" className={c("sub")}>
                back face
              </text>
              <text x="100" y="160" className={c("mid sub")}>
                still 2 bevels. The dashed
              </text>
              <text x="100" y="173" className={c("mid sub")}>
                line is the glue seam:
              </text>
              <text x="100" y="186" className={c("mid sub")}>
                leave it alone
              </text>
            </svg>
          </div>
          <figcaption>
            <b>
              Same tool, same 45° tilt, same two strokes in both places.
            </b>
            {' '}The 4# beveler only takes off about 0.7 mm per face, so it doesn&apos;t matter how thick the edge is. You always bevel the{' '}
            <b>
              top corner
            </b>
            {' '}and the{' '}
            <b>
              bottom corner
            </b>
            {' '}of the edge. Where there are two layers you don&apos;t bevel the glue seam between them. The burnishing in step 11 blends it in.
          </figcaption>
        </figure>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="Both sides with bevelled outer edges">
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
          <rect className={c("bev")} x="13" y="29" width="146.2" height="187.8" rx="12.7" />
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          <clipPath id="clip8">
            <rect x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          </clipPath>
          <g clipPath="url(#clip8)">
            <rect className={c("lf2")} x="213.5" y="18.9" width="165.2" height="66.3" rx="0" />
            <rect className={c("lf2")} x="213.5" y="160.6" width="165.2" height="66.3" rx="0" />
          </g>
          <line className={c("gl")} x1="222" y1="85.2" x2="370.2" y2="85.2" />
          <line className={c("gl")} x1="222" y1="160.6" x2="370.2" y2="160.6" />
          <line className={c("foldl")} x1="222" y1="122.9" x2="370.2" y2="122.9" />
          <rect className={c("bev")} x="223" y="29" width="146.2" height="187.8" rx="12.7" />
        </svg>
        <figcaption>
          Every outer edge has a small bevel (the tan line), on the front and on the back. The pocket opening edges were already done in step 4.
        </figcaption>
      </figure>
      <Photos step={8} />
    </Step>
  );
}
