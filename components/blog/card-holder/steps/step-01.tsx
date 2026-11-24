import { c } from '../cls';
import { Step } from '../step';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Generated from the artifact, then rewritten by hand as phases of single-line actions. The diagram at the end is the generated one. */
export function Step1() {
  return (
    <Step n={1} title="Mark and cut the pieces">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://www.weaverleathersupply.com/pages/how-to-make-your-own-minimal-card-wallet" target="_blank" rel="noopener">
          Weaver guide
        </a>
        <span className={c("tag tools")}>
          veg-tan leather · steel ruler · cutting mat · craft knife · pencil
        </span>
      </div>
      <p className={c("goal")}>
        Three flat, square pieces: one body and two pocket strips.
      </p>
      <Facts items={[['Body', '114 × 146 mm'], ['Pocket strips', '2 × 51 × 127 mm'], ['Each cut', '3 to 5 light passes']]} />

      <Phase title="Mark">
        <Do>
          <li>
            Lay the veg-tan on the cutting mat <strong>smooth side up</strong>. It looks finished; the other side looks fuzzy, like suede.
          </li>
          <li>
            Mark the <strong>body, 114 × 146 mm</strong>, using the <a href="#cutlist">cut list layout</a>. Line the steel ruler up with one straight edge of the sheet (it becomes the first side), make two pencil ticks 114 mm apart along it, do the same 146 mm away along the sheet&apos;s other straight edge, then join the ticks.
          </li>
          <li>
            Mark the <strong>two pocket strips, 51 × 127 mm each</strong>, the same way in the leftover leather.
          </li>
          <li>
            Measure every side a second time before you cut. Within 1 mm is fine.
          </li>
        </Do>
      </Phase>

      <Phase title="Cut">
        <Do>
          <li>
            Fit a <strong>fresh blade</strong> in the craft knife. The tool kit comes with 5 spares.
          </li>
          <li>
            Cut the <strong>body first</strong>, then the two strips, following the rules below.
          </li>
          <li>
            Leave the corners <strong>square</strong>. You round them later, in <a href="#step-6">step 6</a>.
          </li>
        </Do>
        <div className={c("callout")}>
          <strong>For every cut</strong>
          <Do>
            <li>
              Lay the ruler on the piece you are <em>keeping</em>, not on the offcut. If the knife slips it then cuts waste.
            </li>
            <li>
              Press the ruler down hard with a flat hand, fingers well back from its edge.
            </li>
            <li>
              Hold the knife upright, not leaning. Make a light first pass to score the line.
            </li>
            <li>
              Cut with <strong>3 to 5 light passes</strong> in total. Don&apos;t try to cut through in one go.
            </li>
          </Do>
        </div>
      </Phase>

      <Phase title="Check and store">
        <Do>
          <li>
            Check each piece against the ruler.
          </li>
          <li>
            Store the pieces <strong>flat</strong> between two sheets of cardboard, out of the sun and away from damp. <strong>Keep the offcuts</strong>: you need them for practising the letters.
          </li>
        </Do>
      </Phase>

      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="Three flat pieces of leather: one large body and two narrow pocket strips">
          <text className={c("mid h sub")} x="86.1" y="14">
            BODY, smooth side up
          </text>
          <text className={c("mid h sub")} x="270" y="14">
            TWO POCKET STRIPS
          </text>
          <rect className={c("lf")} x="12" y="28" width="148.2" height="189.8" rx="0" />
          <text className={c("mid sub")} x="86.1" y="118.9">
            body
          </text>
          <text className={c("mid sub")} x="86.1" y="131.9">
            114 × 146 mm
          </text>
          <rect className={c("lf2")} x="206" y="28" width="66.3" height="165.1" rx="0" />
          <text className={c("mid sub")} x="239.15" y="108.55">
            pocket
          </text>
          <text className={c("mid sub")} x="239.15" y="121.55">
            strip
          </text>
          <text className={c("mid sub")} x="239.15" y="207.1">
            51 × 127
          </text>
          <rect className={c("lf2")} x="290" y="28" width="66.3" height="165.1" rx="0" />
          <text className={c("mid sub")} x="323.15" y="108.55">
            pocket
          </text>
          <text className={c("mid sub")} x="323.15" y="121.55">
            strip
          </text>
          <text className={c("mid sub")} x="323.15" y="207.1">
            51 × 127
          </text>
        </svg>
        <figcaption>
          Three flat pieces with straight edges and square corners. Nothing is stamped, glued or finished yet.
        </figcaption>
      </figure>
      <Photos step={1} />
    </Step>
  );
}
