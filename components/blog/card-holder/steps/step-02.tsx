import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step2() {
  return (
    <Step n={2} title="Practise the letters, the edge and the fold">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://tandyleather.com/blogs/tandy-blog/how-to-stamp-leather-a-beginner-s-guide" target="_blank" rel="noopener">
          Tandy stamping
        </a>
        <span className={c("tag tools")}>
          6 mm letter stamps · nylon mallet · sponge · stone surface · 4# beveler · Seiwa Tokonole · wooden slicker · veg-tan offcuts
        </span>
      </div>
      <p className={c("goal")}>
        A trial run of the three things you can&apos;t undo on the real piece: stamping, finishing an edge, and folding. Use veg-tan offcuts for the letters and the fold, and two offcuts glued flat together, rough sides facing, for the edge.
      </p>
      <Phase title="The letters" id="step-2a">
        <p className={c("prac fwd")}><strong>Then do it for real:</strong> <a href="#step-3">step 3</a>.</p>
        <Do>
          <li>Work on a <strong>stone surface</strong> (a granite or marble counter, or a tile). It gives crisp letters. The plastic punch board is too springy.</li>
          <li><strong>Dampen</strong> a veg-tan offcut: wipe both sides once or twice with a well-squeezed sponge until it looks darker and feels cool, with no pooling or dripping. Wait 10 to 20 minutes, until the colour starts coming back a little.</li>
          <li><strong>Check which way up each stamp reads:</strong> press the Z, then the Y, onto a bit of paper by hand. The mark is how the letter will appear on the leather.</li>
          <li><strong>Strike one letter:</strong> offcut smooth side up on the stone, stamp upright (90° to the leather) and held near the top with your fingertips. Hit the top <strong>once, firmly</strong>, with the nylon mallet and lift it straight up. Don&apos;t rock it, and don&apos;t hit it twice.</li>
          <li><strong>Read the mark.</strong> Blurry: the leather was too wet, so wait longer next time. Faint: it was too dry or the hit was too soft. Try again on a fresh spot.</li>
        </Do>
        <div className={c("callout")}>
          <strong>Make a whole Z · Y</strong>
          <Do>
            <li>Draw a pencil line across the offcut and stick masking tape with its top edge on the line. This is the baseline.</li>
            <li>Press the awl point lightly into the leather by hand to make the dot (don&apos;t hit it).</li>
            <li>Strike the Z with its centre 9 mm to the left of the dot and the Y with its centre 9 mm to the right. The bottoms of the letters sit on the tape&apos;s edge.</li>
            <li>Peel the tape off. The letters should be level, with equal gaps.</li>
          </Do>
        </div>
        <Do>
          <li>Repeat until <strong>three tries in a row</strong> look clean.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              One firm hit, then lift straight up.
            </b>
            {' '}The stamp stays upright (90° to the leather) so the letter is pressed in evenly. Don&apos;t rock or wiggle it, and don&apos;t hit it twice.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 170" role="img" aria-label="Animation, side view: a mallet comes down once on a letter stamp standing upright on damp leather, then the stamp lifts straight up and leaves a mark">
            <rect className={c("stone")} x="20" y="142" width="340" height="24" />
            <text x="30" y="158" className={c("sub")}>
              stone surface
            </text>
            <rect className={c("lf")} x="90" y="130" width="200" height="12" />
            <rect className={c("a2imp")} x="173" y="129" width="34" height="4" rx="1" />
            <g className={c("a2stamp")}>
              <rect className={c("steel")} x="175" y="68" width="30" height="62" />
              <rect className={c("steel")} x="168" y="58" width="44" height="10" rx="2" />
            </g>
            <g className={c("a2mallet")}>
              <rect className={c("wood")} x="152" y="6" width="76" height="26" rx="3" />
              <rect className={c("wood")} x="228" y="13" width="108" height="12" rx="2" />
            </g>
            <path className={c("thin")} d="M205 120 H215 V130" />
            <text x="222" y="122">
              90°
            </text>
            <text className={c("end cap on a2l1")} x="140" y="24">
              1. one firm hit
            </text>
            <text className={c("end cap a2l2")} x="140" y="24">
              2. lift straight up
            </text>
            <text x="218" y="88">
              stamp held
            </text>
            <text x="218" y="102">
              straight up
            </text>
            <path className={c("thin")} d="M66 112 L106 134" />
            <text x="20" y="108">
              damp leather
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <Phase title="The edge" id="step-2b">
        <p className={c("prac fwd")}><strong>Then do it for real:</strong> <a href="#step-4">step 4</a>, <a href="#step-8">step 8</a> and <a href="#step-11">step 11</a>.</p>
        <Do>
          <li><strong>Gather:</strong> the glued offcut strip, the 4# (0.7 mm) beveler, the Seiwa Tokonole and the nail file. Keep the beveler&apos;s cap on until you use it: the tip is very sharp.</li>
          <li><strong>Position the strip</strong> flat on the cutting mat, with the edge you are bevelling <strong>pointing straight away from you</strong>. Hold it down with your other hand, fingers to the side and well clear of the edge.</li>
          <li><strong>Bevel:</strong> set the beveler on the corner at the near end, tilted to about <strong>45°</strong> (<a href="#step-4">step 4</a> has the drawings). Light pressure, and push it away from you along the whole edge in one smooth stroke. A thin ribbon of leather should curl off. Turn the strip over and bevel the other face of the same edge the same way.</li>
          <li><strong>Compare</strong> it with the RIGHT, TOO STEEP and TOO FLAT drawings in <a href="#step-4">step 4</a> and adjust your tilt. Try again on the other long edge.</li>
          <li><strong>Smooth the bevel</strong> with the finer side of the nail file, held flat against the slope at the same 45° (not against the faces). Make 3 or 4 light strokes along the edge, all in the same direction, then run a fingertip along it. It should feel smooth, with no fuzz or ridges. If not, do a few more strokes.</li>
          <li><strong>Burnish:</strong> dab a thin film of Tokonole on a 5 cm section of the edge with a fingertip. Pick the groove on the wooden slicker (from the tool kit) that fits the edge snugly, and rub quickly back and forth until it feels warm and looks glossy. Fast rubbing makes the heat. Do the next 5 cm, until the edge is finished, then do a second pass.</li>
        </Do>
      </Phase>
      <Phase title="The fold" id="step-2c">
        <p className={c("prac fwd")}><strong>Then do it for real:</strong> <a href="#step-12">step 12</a>.</p>
        <Do>
          <li><strong>Cut an offcut</strong> about <strong>4 cm × 15 cm</strong> to stand in for the body, and pencil a line across the middle of its rough side. This is the fold line.</li>
          <li><strong>Dampen the fold zone:</strong> with a well-squeezed sponge, wipe a band about 6 cm wide, centred on the fold line, on the <strong>rough side only</strong>. Wait about 2 minutes, until the leather looks darker and bends easily.</li>
          <li><strong>Fold it round a spacer:</strong> lay a pencil (or a marker about 8 mm thick) across the fold line on the rough side. Bring the two ends together around it, rough sides facing in and the smooth side outside, and press gently along the fold from the middle outwards. The spacer keeps it a soft curve instead of a sharp crease. The outside of the fold should be a smooth round curve, with no cracks.</li>
          <li><strong>Clip</strong> the two ends together with a binder clip, with folded paper under the jaws. Leave it somewhere dry and out of the sun overnight.</li>
          <li><strong>Next day,</strong> remove the clip and the pencil. It should stay folded by itself and not spring flat.</li>
        </Do>
      </Phase>
      <Photos step={2} />
    </Step>
  );
}
