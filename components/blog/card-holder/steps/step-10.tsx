import { c } from '../cls';
import { Step } from '../step';
import { AnimFigure } from '../anim-figure';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step10() {
  return (
    <Step n={10} title="Saddle stitch all the way round">
      <div className={c("tags")}>
        <a className={c("tag")} href="https://tandyleather.com/blogs/projects/tandy-skills-saddle-stitching" target="_blank" rel="noopener">
          Tandy saddle stitch, steps 3–8
        </a>
        <span className={c("tag tools")}>
          2 needles + waxed thread (tool kit) · thread scissors · lighter · nylon mallet
        </span>
      </div>
      <p className={c("goal")}>
        Sew with one length of thread and a needle on{' '}
        <em>
          each end
        </em>
        . Both needles go through every hole, in opposite directions, so the stitches look the same on both sides and can&apos;t unravel.
      </p>
      <Facts items={[['Thread','about 2.6 m'],['The rule','A first, B second'],['Backstitch','2 or 3 holes']]} />
      <Phase title="Prepare the thread">
        <Do>
          <li><strong>Cut about 2.6 m</strong> of waxed thread (the stitch line is about 50 cm round, and you need roughly 5 times that). Thread a needle onto each end and pull about 5 cm through each eye. Call one needle <strong>A</strong> and the other <strong>B</strong>.</li>
          <li><strong>Start</strong> in the middle of one short end, at the hole where you started punching. Push needle A through the first hole, then pull the thread through until the two halves hang out of the hole, front and back, the same length.</li>
        </Do>
      </Phase>
      <Phase title="Stitch every hole">
        <Do>
          <li><strong>A goes first:</strong> A is on the back, so push it through the next hole from back to front. The animation below shows each move.</li>
          <li><strong>B goes second:</strong> B is on the front, so push it through the <strong>same hole</strong> from front to back. Make sure the needle goes <em>beside</em> the thread already in the hole, not through it.</li>
          <li><strong>Pull both ends snug and even.</strong> The stitch should sit flat in the leather, not dig in or buckle it.</li>
          <li><strong>Repeat for every hole.</strong> A always goes first and B second, through the same hole in opposite directions. After each stitch the needles have swapped sides, so at the next hole A goes from front to back and B from back to front.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              Side view, thickness exaggerated.
            </b>
            {' '}It is one length of thread with a needle on each end. At every hole{' '}
            <b>
              A goes in first
            </b>
            {' '}and{' '}
            <b>
              B goes in second
            </b>
            , through the same hole in the opposite direction. After each pair, pull both ends snug. The needles swap sides each time, so at the next hole A goes the other way. Each side ends up with a row of equal stitches.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 206" role="img" aria-label="Animation, side view of a saddle stitch through three holes: needle A goes through hole 2 from the back to the front, then needle B goes through the same hole from the front to the back, both are pulled snug, and then the same happens at hole 3 with A going first again but this time from the front to the back">
            <rect className={c("lf")} x="40" y="84" width="300" height="32" />
            <rect className={c("gap")} x="84" y="84" width="12" height="32" />
            <path className={c("gapl")} d="M84 84 V116 M96 84 V116" />
            <rect className={c("gap")} x="184" y="84" width="12" height="32" />
            <path className={c("gapl")} d="M184 84 V116 M196 84 V116" />
            <rect className={c("gap")} x="284" y="84" width="12" height="32" />
            <path className={c("gapl")} d="M284 84 V116 M296 84 V116" />
            <path className={c("tm")} d="M90 82 V118" />
            <path className={c("tl a10B")} pathLength="1" d="M92 82 H192 V118 H292 V82" />
            <path className={c("gl a10A")} pathLength="1" d="M88 118 H188 V82 H288 V118" />
            <g className={c("a10nA")}>
              <line className={c("needle")} x1="0" y1="0" x2="34" y2="0" />
              <circle cx="0" cy="0" r="3" style={{ fill: "var(--accent)", stroke: "var(--bg)", strokeWidth: "1" }} />
            </g>
            <g className={c("a10nB")}>
              <line className={c("needle")} x1="0" y1="0" x2="34" y2="0" />
              <circle cx="0" cy="0" r="3" style={{ fill: "var(--tan)", stroke: "var(--bg)", strokeWidth: "1" }} />
            </g>
            <g className={c("a10p1")}>
              <path className={c("gl")} d="M188 76 V54" markerEnd="url(#m-ok)" />
              <path className={c("tl")} d="M192 124 V146" markerEnd="url(#m-mu)" />
            </g>
            <g className={c("a10p2")}>
              <path className={c("gl")} d="M288 124 V146" markerEnd="url(#m-ok)" />
              <path className={c("tl")} d="M292 76 V54" markerEnd="url(#m-mu)" />
            </g>
            <text x="348" y="88" className={c("sub")}>
              front
            </text>
            <text x="348" y="120" className={c("sub")}>
              back
            </text>
            <text x="90" y="176" className={c("mid sub")}>
              hole 1
            </text>
            <text x="190" y="176" className={c("mid sub")}>
              hole 2
            </text>
            <text x="290" y="176" className={c("mid sub")}>
              hole 3
            </text>
            <text x="190" y="198" className={c("mid sub")}>
              green = end A, brown = end B. A always goes first.
            </text>
            <text className={c("mid cap on a10c5")} x="190" y="18">
              5. same stitches on front and back
            </text>
            <text className={c("mid cap a10c1")} x="190" y="18">
              1. A first: back to front through hole 2
            </text>
            <text className={c("mid cap a10c2")} x="190" y="18">
              2. B second: same hole, front to back
            </text>
            <text className={c("mid cap a10c3")} x="190" y="18">
              3. pull both snug and even
            </text>
            <text className={c("mid cap a10c4")} x="190" y="18">
              4. hole 3: A first again, now front to back
            </text>
          </svg>
        </AnimFigure>
        <div className={c("callout")}>
          <strong>If it goes wrong</strong>
          <Do>
            <li>Every few stitches, pull the thread straight. Waxed thread tangles easily: if it does, stop and untangle it before pulling.</li>
            <li>If one stitch slants a different way from the others, you swapped the order there. Unpick it and redo it.</li>
          </Do>
        </div>
      </Phase>
      <Phase title="Pocket openings (optional lock)">
        <Do>
          <li>At each pocket opening, an extra lock stitch is <strong>optional</strong>. The glue and the saddle stitch already hold the pocket, so you can stitch straight past.</li>
          <li><strong>To add the lock:</strong> stitch the hole beside the opening as normal with both needles. Then take <strong>only the needle that is on the front</strong>, go back one hole (front to back), and come forward through the hole beside the opening again (back to front). Carry on with both needles.</li>
          <li><strong>Too tight?</strong> Push the awl through the hole beside the thread, not through it, and wiggle gently to open the hole. If the needle still won&apos;t go, leave the lock out. Never force the needle or pull it with pliers. Don&apos;t double back with <em>both</em> needles either: that puts six threads in one hole, and they won&apos;t fit.</li>
        </Do>
        <AnimFigure
          caption={
            <>
            <b>
              Optional: lock the pocket opening.
            </b>
            {' '}Top view of the last holes before the opening edge, where cards pull on the stitching. Stitch hole 1 as normal with both needles. Then, with the front needle only, come back to hole 2 and go forward through hole 1 again. If it is still too tight after opening the hole with the awl, leave the lock out; never force it. Schematic, not to scale.
            </>
          }
        >
          <svg className={c("d")} viewBox="0 0 380 190" role="img" aria-label="Animation, top view of the last four stitch holes beside a pocket opening: the last hole is stitched as normal, then one needle comes back one hole and goes forward again, adding one extra loop over the last two holes">
            <rect className={c("lf")} x="14" y="64" width="310" height="72" />
            <line className={c("dash")} x1="324" y1="56" x2="324" y2="144" />
            <text className={c("end sub")} x="320" y="54">
              pocket opening edge
            </text>
            <ellipse className={c("hole")} cx="110" cy="100" rx="5" ry="18" />
            <ellipse className={c("hole")} cx="170" cy="100" rx="5" ry="18" />
            <ellipse className={c("hole")} cx="230" cy="100" rx="5" ry="18" />
            <ellipse className={c("hole")} cx="290" cy="100" rx="5" ry="18" />
            <path d="M110 100 H230" style={{ fill: "none", stroke: "var(--muted)", strokeWidth: "2.2", strokeLinecap: "round" }} />
            <path className={c("gl a13A")} pathLength="1" d="M230 90 H290" />
            <path className={c("tl a13B")} pathLength="1" d="M290 100 H230" />
            <path className={c("gl a13C")} pathLength="1" d="M230 110 H290" />
            <g className={c("a13h1")}>
              <polygon points="290,90 281,85 281,95" style={{ fill: "var(--accent)" }} />
              <text className={c("a13n ok")} x="214" y="93">
                1
              </text>
            </g>
            <g className={c("a13h2")}>
              <polygon points="230,100 239,95 239,105" style={{ fill: "var(--tan)" }} />
              <text className={c("a13n tn")} x="214" y="103">
                2
              </text>
            </g>
            <g className={c("a13h3")}>
              <polygon points="290,110 281,105 281,115" style={{ fill: "var(--accent)" }} />
              <text className={c("a13n ok")} x="214" y="113">
                3
              </text>
            </g>
            <text className={c("mid sub")} x="110" y="156">
              hole 4
            </text>
            <text className={c("mid sub")} x="170" y="156">
              hole 3
            </text>
            <text className={c("mid sub")} x="230" y="156">
              hole 2
            </text>
            <text className={c("mid sub")} x="290" y="156">
              hole 1
            </text>
            <text className={c("mid sub")} x="190" y="178">
              drawn apart for clarity; pass 3 runs along the back
            </text>
            <text className={c("mid cap on a13c4")} x="190" y="18">
              one extra loop with one needle = locked
            </text>
            <text className={c("mid cap a13c1")} x="190" y="18">
              1. stitch the last hole as normal
            </text>
            <text className={c("mid cap a13c2")} x="190" y="18">
              2. front needle only: back one hole
            </text>
            <text className={c("mid cap a13c3")} x="190" y="18">
              3. same needle: forward again
            </text>
          </svg>
        </AnimFigure>
      </Phase>
      <Phase title="Finish">
        <Do>
          <li><strong>Backstitch at the first hole:</strong> when you reach the last hole next to where you started, sew back over the last 2 or 3 holes, as if stitching in reverse. Two holes is enough. If a hole is tight, open it first by pushing the awl through beside the thread.</li>
          <li><strong>Trim and melt:</strong> trim both thread ends close to the leather with the thread scissors, then touch each cut end to the lighter&apos;s flame for a second, so it shrinks into a small blob. Keep the flame away from the leather and from the cement. Press the blob flat with the slicker once it cools. (No melt? Use a tiny dab of the Fiebing&apos;s cement instead.)</li>
          <li><strong>Flatten the stitches:</strong> lay the card holder on the stone surface and tap along the stitches with the nylon mallet, working round the edge.</li>
        </Do>
      </Phase>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="Both sides with a row of stitches all the way round">
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
          <rect className={c("lf")} x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          <clipPath id="clip10">
            <rect x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          </clipPath>
          <g clipPath="url(#clip10)">
            <rect className={c("lf2")} x="213.5" y="18.9" width="165.2" height="66.3" rx="0" />
            <rect className={c("lf2")} x="213.5" y="160.6" width="165.2" height="66.3" rx="0" />
          </g>
          <line className={c("gl")} x1="222" y1="85.2" x2="370.2" y2="85.2" />
          <line className={c("gl")} x1="222" y1="160.6" x2="370.2" y2="160.6" />
          <line className={c("foldl")} x1="222" y1="122.9" x2="370.2" y2="122.9" />
          <rect className={c("stitch")} x="227.2" y="33.2" width="137.8" height="179.4" rx="8.5" />
          <rect className={c("bev")} x="223" y="29" width="146.2" height="187.8" rx="12.7" />
        </svg>
        <figcaption>
          The stitching runs all the way round and looks the same from the front and the back. The gap between the pockets is stitched along its sides too, but nothing is sewn across the middle.
        </figcaption>
      </figure>
      <Photos step={10} />
    </Step>
  );
}
