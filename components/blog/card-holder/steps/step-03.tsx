import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step3() {
  return (
    <Step n={3} title="Stamp Z·Y on the front cover">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://tandyleather.com/blogs/tandy-blog/how-to-stamp-leather-a-beginner-s-guide" target="_blank" rel="noopener">
          Tandy stamping
        </a>
        <span className={c("tag tools")}>
          6 mm letter stamps · nylon mallet · masking tape · sponge · stone surface · ruler · pencil · awl
        </span>
      </div>
      <p className={c("goal")}>
        The body folds in half across the middle, so the stamp goes on{' '}
        <strong>
          one half
        </strong>
        {' '}(the front cover), centred in that half. Centred on the whole body, the letters would sit on the fold. A stamp can&apos;t be undone, so take your time on the setup and only strike once per letter.
      </p>
      <Facts items={[['Centre','57 mm across, 36 mm up'],['Letters','6 mm tall'],['Gap','9 mm either side of the dot']]} />
      <p className={c("prac")}><strong>New to this move? Practise it first:</strong> stamping on offcuts, in <a href="#step-2a">step 2, part A</a>. Get three clean Z · Y marks in a row there first.</p>
      <Phase title="Set up">
        <Do>
          <li><strong>Choose the front cover.</strong> Lay the body on the stone surface, smooth side up, with a short (114 mm) edge nearest you. With the ruler and pencil, draw a very light line across the middle, 73 mm from the near edge: the fold line. The half nearest you is the front cover. The far half is the back cover, which you leave plain.</li>
          <li><strong>Mark the centre</strong> of the front cover: a small pencil cross <strong>57 mm</strong> in from the left edge and <strong>36 mm</strong> up from the near edge. This is where the dot goes. No letter will be closer than 12 mm to an edge or to the fold line, so at this spot they are well clear.</li>
          <li><strong>Do a dry run:</strong> set the Z, awl and Y on the leather without hitting them, with the Z centred 9 mm left of the cross and the Y 9 mm right of it. Check the spacing, then put them down.</li>
          <li><strong>Stick the tape baseline.</strong> The letters are 6 mm tall and centred on the cross, so their bottoms sit about 3 mm below it. Stick a strip of masking tape across the front cover with its <strong>top edge 33 mm up from the near edge</strong>, parallel to the near edge. Check it with the ruler, then press it on lightly.</li>
        </Do>
      </Phase>
      <Phase title="Stamp">
        <Do>
          <li><strong>Dampen</strong> the smooth face of the <strong>front cover half only</strong>, going around the tape, with a well-squeezed sponge. It should look darker, with no pooling. Wait 10 to 20 minutes, until the colour starts coming back.</li>
          <li><strong>Dot first:</strong> press the awl point lightly into the cross by hand.</li>
          <li><strong>Then the Z:</strong> put its bottom on the tape&apos;s edge, 9 mm left of the dot. Stand the stamp straight up, hit it once firmly with the nylon mallet and lift it straight up. <strong>Then the Y</strong> the same way, 9 mm right of the dot.</li>
          <li><strong>Peel the tape off slowly.</strong> If a letter is faint, <strong>leave it</strong>: hitting it again almost always makes a double image.</li>
          <li><strong>Leave the body flat overnight</strong> to dry, away from sun and heat. Don&apos;t oil it yet.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              Stamp the front cover half only.
            </b>
            {' '}The body folds in half along the dashed fold line, so the Z·Y goes in the middle of the half nearest you (57 mm across, 36 mm up), inside the dotted line. Stick tape where the bottoms of the letters will sit, stamp the dot first, then the Z on its left and the Y on its right. Letters are 6 mm tall. Schematic, not to scale.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 240" role="img" aria-label="Animation: the Z dot Y is stamped in order on a masking tape baseline. The card holder body is shown on the left with a fold line across the middle, a dashed stitch line and a dotted keep-clear line, and the stamp sits in the lower half, the front cover. The stamped area is enlarged on the right">
            <rect className={c("lf")} x="14" y="14" width="160" height="204" />
            <rect className={c("dash")} x="19.6" y="19.6" width="148.8" height="192.8" />
            <rect className={c("dots")} x="30.8" y="30.8" width="126.4" height="170.4" />
            <line className={c("foldl")} x1="14" y1="116" x2="174" y2="116" />
            <text x="94" y="66" className={c("mid sub")}>
              back cover
            </text>
            <text x="94" y="79" className={c("mid sub")}>
              (leave plain)
            </text>
            <text x="94" y="110" className={c("mid sub")}>
              fold line
            </text>
            <text x="94" y="134" className={c("mid sub")}>
              front cover
            </text>
            <path className={c("thin")} d="M14 152 H94" markerStart="url(#m-mu)" markerEnd="url(#m-mu)" />
            <text x="54" y="148" className={c("mid sub")}>
              57 mm
            </text>
            <path className={c("thin")} d="M94 152 V160" />
            <path className={c("thin")} d="M66 218 V168" markerStart="url(#m-mu)" markerEnd="url(#m-mu)" />
            <path className={c("thin")} d="M66 168 H77" />
            <text x="62" y="196" className={c("end sub")}>
              36 mm
            </text>
            <rect className={c("lf2")} x="77" y="161" width="34" height="14" />
            <text x="94" y="172" className={c("mid sub")}>
              Z · Y
            </text>
            <path className={c("thin")} d="M111 161 L206 100 M111 175 L206 200" />
            <text x="94" y="236" className={c("mid sub")}>
              front, smooth side up
            </text>
            <line className={c("dash")} x1="200" y1="26" x2="228" y2="26" />
            <text x="236" y="30" className={c("sub")}>
              stitch line, 4 mm in
            </text>
            <line className={c("dots")} x1="200" y1="48" x2="228" y2="48" />
            <text x="236" y="52" className={c("sub")}>
              keep stamps inside
            </text>
            <text x="236" y="65" className={c("sub")}>
              this line, 12 mm in
            </text>
            <line className={c("foldl")} x1="200" y1="84" x2="228" y2="84" />
            <text x="236" y="88" className={c("sub")}>
              fold line, 73 mm
            </text>
            <rect className={c("lf2")} x="206" y="100" width="160" height="100" />
            <text x="286" y="118" className={c("mid sub")}>
              equal gaps
            </text>
            <path className={c("thin")} d="M254 124 H274" markerStart="url(#m-mu)" markerEnd="url(#m-mu)" />
            <path className={c("thin")} d="M298 124 H318" markerStart="url(#m-mu)" markerEnd="url(#m-mu)" />
            <text x="240" y="170" className={c("mid big a3z")}>
              Z
            </text>
            <text x="286" y="170" className={c("mid big a3dot")}>
              ·
            </text>
            <text x="332" y="170" className={c("mid big a3y")}>
              Y
            </text>
            <g className={c("a3tape")}>
              <rect className={c("tape")} x="214" y="172" width="144" height="20" />
              <text x="286" y="186" className={c("mid sub")}>
                masking tape baseline
              </text>
            </g>
            <text className={c("mid cap a3c1")} x="286" y="218">
              1. stick the tape on
            </text>
            <text className={c("mid cap a3c2")} x="286" y="218">
              2. strike the dot
            </text>
            <text className={c("mid cap a3c3")} x="286" y="218">
              3. strike the Z
            </text>
            <text className={c("mid cap a3c4")} x="286" y="218">
              4. strike the Y
            </text>
            <text className={c("mid cap a3c5")} x="286" y="218">
              5. peel tape, let it dry
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="The body from the front with Z dot Y stamped in the middle of the lower half, the front cover, and from the back, plain">
          <text className={c("mid h sub")} x="86.1" y="14">
            FRONT, smooth side up
          </text>
          <text className={c("mid h sub")} x="296.1" y="14">
            BACK, rough side up
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
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="0" />
        </svg>
        <figcaption>
          The Z·Y is on the{' '}
          <b>
            front cover half
          </b>
          , the half below the fold line. The back is untouched. The fold line is only a faint pencil mark, and it is drawn here so you can see where the fold will go.
        </figcaption>
      </figure>
      <Photos step={3} />
    </Step>
  );
}
