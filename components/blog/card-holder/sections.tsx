import { c } from './cls';
import { PiecesDiagram } from './pieces-diagram';

/* Generated from the artifact, then edited by hand. */

export function CutList() {
  return (
    <PiecesDiagram
      table={
        <div className={c("table-scroll")}>
            <table className={c("cuts")}>
              <thead>
                <tr>
                  <th>
                    Piece
                  </th>
                  <th>
                    Qty
                  </th>
                  <th>
                    Size
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Body
                  </td>
                  <td className={c("num")}>
                    1
                  </td>
                  <td className={c("num")}>
                    114 × 146 mm
                    <br />
                    <span className={c("meta")}>
                      4½ × 5¾ in
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Pocket strip
                  </td>
                  <td className={c("num")}>
                    2
                  </td>
                  <td className={c("num")}>
                    51 × 127 mm
                    <br />
                    <span className={c("meta")}>
                      2 × 5 in
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      }
    />
  );
}

export function Recessed() {
  return (
    <>
      <p className={c("note")}>
        An optional upgrade to step 7. You use the same groover and the same 4 mm distance. The difference is that you cut a shallow channel first, then punch the holes along it, so the thread sits in the channel and not on top of the leather. The leather on either side then looks slightly raised, which is the fuller look you see on many wallets.
      </p>
      <div className={c("split")}>
        <div className={c("box")}>
          <h3>
            Flat (step 7 as written)
          </h3>
          <ul>
            <li>
              Easiest, with nothing to get wrong
            </li>
            <li>
              Keeps the full 1.5 mm of leather
            </li>
            <li>
              The thread takes all the rubbing, so it wears sooner
            </li>
            <li>
              A plainer look
            </li>
          </ul>
        </div>
        <div className={c("box")}>
          <h3>
            Recessed (this section)
          </h3>
          <ul>
            <li>
              The thread is protected and wears slower
            </li>
            <li>
              A neater, more finished look
            </li>
            <li>
              The channel helps keep the chisel on a straight line
            </li>
            <li>
              The cut can&apos;t be undone, and it takes a little strength out of thin leather
            </li>
          </ul>
        </div>
      </div>
      <figure className={c("fig")}>
        <svg className={c("d")} viewBox="0 0 380 150" role="img" aria-label="Cross-section of two stitch lines. Left, flat: the thread sits on top of the leather and takes the rubbing. Right, recessed: the thread sits in a shallow channel, level with the surface, and the leather takes the rubbing.">
          <text className={c("mid h sub")} x="94" y="14">
            FLAT
          </text>
          <text className={c("mid h sub")} x="286" y="14">
            RECESSED
          </text>
          <rect className={c("lf")} x="14" y="60" width="160" height="36" />
          <circle className={c("tooth")} cx="94" cy="55" r="5" />
          <path className={c("bd")} d="M94 24 V42" markerEnd="url(#m-no)" />
          <text className={c("sub mid")} x="94" y="84">
            leather, 1.5 mm
          </text>
          <text className={c("sub mid no")} x="94" y="116">
            thread sits on top
          </text>
          <text className={c("sub mid no")} x="94" y="132">
            and takes the rubbing
          </text>
          <path className={c("lf")} d="M206 60 H279.5 V70 H292.5 V60 H366 V96 H206 Z" />
          <circle className={c("tooth")} cx="286" cy="65" r="5" />
          <path className={c("bd")} d="M246 24 V48" markerEnd="url(#m-no)" />
          <path className={c("bd")} d="M326 24 V48" markerEnd="url(#m-no)" />
          <text className={c("sub mid")} x="286" y="84">
            leather, 1.5 mm
          </text>
          <text className={c("sub mid ok")} x="286" y="116">
            thread sits level, in the channel
          </text>
          <text className={c("sub mid ok")} x="286" y="132">
            the leather takes the rubbing
          </text>
        </svg>
        <figcaption>
          <b>
            Cross-section across the stitch line.
          </b>
          {' '}Not to scale. For recessed stitching, the channel only needs to be about as deep as the thread is thick, roughly 0.4 mm.
        </figcaption>
      </figure>
      <div className={c("callout warn")}>
        <strong>
          Go shallow: your leather is thin.
        </strong>
        {' '}One experienced maker on the leatherworker.net forum says 8–9 oz leather (about 3.2–3.6 mm) is the thinnest she would cut a recessed channel in. Yours is 1.5 mm. So here the channel is shallow, about as deep as your thread is thick, roughly 0.4 mm, and never more than about a third of the leather (0.5 mm). That limit is my own cautious reading for 1.5 mm leather, not an official figure. If the offcut test makes you nervous, the faint line from step 7 is a perfectly good finish.
      </div>
      <div className={c("rcard")}>
        <h3>
          <span className={c("n")}>
            A
          </span>
          Put the groover together
        </h3>
        <p>
          Yours comes loose in a little bag, with a handle, a metal collar and some small parts. These are the usual steps for this style of tool. Yours may differ a little, so don&apos;t force anything. The blade is sharp: handle it by the stem and keep your fingers out of its path.
        </p>
        <ol>
          <li>
            Tip everything onto the cutting mat so small parts can&apos;t roll off. The thin loose rod in the bag may be a spare blade, or a small key or screwdriver for the screws.
          </li>
          <li>
            Work out which piece is which. The{' '}
            <strong>
              blade
            </strong>
            {' '}is the cutting piece: a thin metal tip with a sharp edge. The{' '}
            <strong>
              guide
            </strong>
            {' '}is the plain bent rod or bar with no sharp edge. It rests against the edge of the leather.
          </li>
          <li>
            Fit the blade into the slot or hole in the stem, with the cutting tip pointing down towards the leather. Tighten its screw or collar. Give it a gentle tug: it must not move.
          </li>
          <li>
            Slide the guide through the stem&apos;s cross-hole so it points the same way as the blade. Leave its screw loose for now.
          </li>
          <li>
            Set the gap between the guide and the blade to{' '}
            <strong>
              4 mm
            </strong>
            , measured against the steel ruler, then tighten the guide&apos;s screw.
          </li>
          <li>
            Give the whole tool a gentle shake. Nothing should rattle or shift. If it does, tighten the loose part.
          </li>
        </ol>
        <p className={c("src")}>
          If the parts don&apos;t go together like this, check the seller&apos;s listing photos. The tool kit&apos;s listing has no assembly sheet that I could find.
        </p>
      </div>
      <div className={c("rcard")}>
        <h3>
          <span className={c("n")}>
            B
          </span>
          Find the right depth on an offcut
        </h3>
        <p>
          The blade doesn&apos;t change depth. You control it with pressure and the number of passes. Use a veg-tan offcut.
        </p>
        <ol>
          <li>
            Hold the groover like a pencil. Press the guide against the offcut&apos;s edge and put the blade on the leather.
          </li>
          <li>
            <strong>
              First pass, light.
            </strong>
            {' '}Pull it towards you in one smooth stroke and don&apos;t stop halfway, because stopping makes the depth uneven. You should get a faint line.
          </li>
          <li>
            <strong>
              Second pass
            </strong>
            {' '}along the same line, a little firmer. The blade finds the first line by itself. Do a{' '}
            <strong>
              third pass
            </strong>
            {' '}only if you still don&apos;t have a clear channel. Three passes is the most.
          </li>
          <li>
            Test it with thread: lay a short piece of your waxed thread in the channel. The thread should sit down in it with its top about level with the surface. If it sits on top, add one more light pass. If it disappears below the surface, it&apos;s too deep: stop and don&apos;t groove the real piece that hard.
          </li>
          <li>
            If the leather looks fuzzy or torn along the line, ease off the pressure. A dull blade tears fibres instead of cutting them.
          </li>
        </ol>
      </div>
      <div className={c("rcard")}>
        <h3>
          <span className={c("n")}>
            C
          </span>
          Cut the channel on the real piece
        </h3>
        <p>
          Do this in place of &quot;press lightly&quot; in{' '}
          <a href="#step-7">
            step 7
          </a>
          .
        </p>
        <ol>
          <li>
            Put the card holder with the stamped front facing up. Start in the middle of one short end, the same place you&apos;ll start punching.
          </li>
          <li>
            <strong>
              Pass 1, light:
            </strong>
            {' '}keep the guide pressed against the edge and go all the way round, easing round the corners with the guide on the curve. Lift off where you started.
          </li>
          <li>
            <strong>
              Pass 2
            </strong>
            {' '}(and pass 3 if your offcut needed it): go all the way round again, along the same line, with the same pressure. Don&apos;t go deeper in just one spot.
          </li>
          <li>
            Look along the line. The channel should be the same width and depth all the way round and the same distance from the edge. Turn the piece over: the back should be smooth, with no ridge or bulge.
          </li>
        </ol>
      </div>
      <div className={c("rcard")}>
        <h3>
          <span className={c("n")}>
            D
          </span>
          Punch and stitch inside the channel
        </h3>
        <ol>
          <li>
            In{' '}
            <a href="#step-9">
              step 9
            </a>
            , put the chisel&apos;s teeth in the floor of the channel and hold it straight up. The channel keeps your row straight. The holes are still 4 mm apart.
          </li>
          <li>
            In{' '}
            <a href="#step-10">
              step 10
            </a>
            , saddle stitch as normal. Pull each stitch snug so the thread sinks into the channel, but not so hard that the leather puckers.
          </li>
          <li>
            The back has no channel, so its stitches sit on the surface. That&apos;s normal.
          </li>
        </ol>
      </div>
      <div className={c("rcard")}>
        <h3>
          <span className={c("n")}>
            E
          </span>
          Close it over the thread
        </h3>
        <p>
          When all the stitching is done, lay a scrap of leather over the stitch line and tap along it gently with the nylon mallet. The scrap stops the mallet from marking the leather. This is the &quot;tap the stitches flat&quot; in step 10. It settles the thread into the channel and nudges the channel&apos;s edges slightly over it, which gives the fuller look.
        </p>
      </div>
      <p className={c("done")}>
        <strong>
          Done when:
        </strong>
        {' '}the thread lies in a continuous channel, level with the surface or just under it, with the leather either side looking slightly raised. Nothing is frayed or torn, and nothing shows through on the back.
      </p>
      <p className={c("src")}>
        Based on{' '}
        <a href="https://www.weaverleathersupply.com/pages/how-to-use-a-stitch-groover-a-leathercraft-essential-explained" target="_blank" rel="noopener">
          Weaver Leather: How to Use a Stitch Groover
        </a>
        {' '}(a light, even channel; several light passes; groove before marking holes) and the{' '}
        <a href="https://leatherworker.net/forum/topic/7945-stitching-groovers-weaken-seam/page/2" target="_blank" rel="noopener">
          leatherworker.net thread on grooves and seam strength
        </a>
        {' '}(depth, thin leather, closing the groove over the stitches). The depth figures for 1.5 mm leather are my own cautious limit.
      </p>
    </>
  );
}

export function Guides() {
  return (
    <>
      <div className={c("guides")}>
        <a className={c("guide")} href="https://www.weaverleathersupply.com/pages/how-to-make-your-own-minimal-card-wallet" target="_blank" rel="noopener">
          <span className={c("g-name")}>
            Weaver Leather: How to Make Your Own Minimal Card Wallet
          </span>
          {' '}
          <span className={c("g-use")}>
            The main project, with photos. Use for cutting, beveling, chiseling and edge slicking (steps 1, 4, 6, 8, 9, 11). Skip its dye, spots and English point punch.
          </span>
        </a>
        {' '}
        <a className={c("guide")} href="https://tandyleather.com/blogs/projects/tandy-skills-saddle-stitching" target="_blank" rel="noopener">
          <span className={c("g-name")}>
            Tandy Leather: Saddle Stitching
          </span>
          {' '}
          <span className={c("g-use")}>
            The stitch itself, with photos. Use for steps 7, 9 and 10.
          </span>
        </a>
        {' '}
        <a className={c("guide")} href="https://tandyleather.com/blogs/tandy-blog/how-to-stamp-leather-a-beginner-s-guide" target="_blank" rel="noopener">
          <span className={c("g-name")}>
            Tandy Leather: How to Stamp Leather
          </span>
          {' '}
          <span className={c("g-use")}>
            Dampening the leather and striking cleanly. Use for steps 2 and 3.
          </span>
        </a>
        {' '}
        <a className={c("guide")} href="https://www.weaverleathersupply.com/pages/how-to-hand-sew-leather" target="_blank" rel="noopener">
          <span className={c("g-name")}>
            Weaver Leather: How to Hand Sew Leather
          </span>
          {' '}
          <span className={c("g-use")}>
            A second explanation of the saddle stitch with diagrams, if the Tandy one doesn&apos;t click.
          </span>
        </a>
        {' '}
        <a className={c("guide")} href="https://www.weaverleathersupply.com/pages/how-to-use-a-stitch-groover-a-leathercraft-essential-explained" target="_blank" rel="noopener">
          <span className={c("g-name")}>
            Weaver Leather: How to Use a Stitch Groover
          </span>
          {' '}
          <span className={c("g-use")}>
            How a groover works and how to use it. Use for the recessed stitching section and step 7.
          </span>
        </a>
      </div>
    </>
  );
}

export function Fixes() {
  return (
    <>
      <dl className={c("fixes")}>
        <div>
          <dt>
            A letter stamped faint
          </dt>
          <dd>
            Leave it. Re-striking almost never lines up exactly and makes a double image. A slightly faint letter looks handmade in a good way.
          </dd>
        </div>
        <div>
          <dt>
            Stitches look uneven or slanted differently
          </dt>
          <dd>
            Always put the same needle through first and pull both threads with the same tension. Practise more on offcuts before the real piece.
          </dd>
        </div>
        <div>
          <dt>
            Glue squeezed out at the edge
          </dt>
          <dd>
            Let it dry, then file it off when you sand the edges in step 11.
          </dd>
        </div>
        <div>
          <dt>
            Edges stay fuzzy after burnishing
          </dt>
          <dd>
            File again, use less Tokonole, and rub faster. It&apos;s the heat from friction that makes the shine.
          </dd>
        </div>
        <div>
          <dt>
            A chisel hole lands off the groove
          </dt>
          <dd>
            Keep going. Stitching hides small misses. If it&apos;s big, the next set can be angled back on line.
          </dd>
        </div>
        <div>
          <dt>
            The channel came out too deep or wandered
          </dt>
          <dd>
            It can&apos;t be filled back in, which is why the offcut test comes first. A small wobble disappears once the thread is in. If it&apos;s clearly too deep, don&apos;t cut a second line: punch along the channel you have and tap the stitches flat gently.
          </dd>
        </div>
        <div>
          <dt>
            The leather got a water spot
          </dt>
          <dd>
            Dampen the whole face evenly with the sponge and let it dry; the spot blends in.
          </dd>
        </div>
      </dl>
    </>
  );
}

export function NextTime() {
  return (
    <>
      <p className={c("note")}>
        Notes from this first build, written down after burnishing. The stamp came out clean and two burnishing passes gave a glossy edge. These are the things to do differently on the next piece.
      </p>
      <div className={c("phase")}>
        Leather and cutting
      </div>
      <dl className={c("fixes")}>
        <div>
          <dt>
            Check both sides of the leather before marking
          </dt>
          <dd>
            Look over the smooth side and the rough side for scratches, etched lines and fuzzy or thin patches, and lay the pieces out so those land in the offcuts. The rough side matters too: it is what you see inside the card holder, between the pockets.
          </dd>
        </div>
        <div>
          <dt>
            Put the inner edge of the pencil line on the measurement
          </dt>
          <dd>
            A pencil line has width. Mark so the edge of the line nearest the piece sits exactly on the measurement, and cut along that edge. The whole line then ends up on the offcut, not on the piece you keep. A sharp pencil gives a thinner line.
          </dd>
        </div>
        <div>
          <dt>
            Cut precisely, and don&apos;t let it drag on
          </dt>
          <dd>
            The cuts got less even the longer the cutting took. Set each cut up carefully, with the ruler checked at both ends and a fresh blade, then make it in a few steady passes. Take a short break between pieces instead of pushing on when your attention drops.
          </dd>
        </div>
      </dl>
      <div className={c("phase")}>
        Corners
      </div>
      <dl className={c("fixes")}>
        <div>
          <dt>
            Use more, shorter cuts on each corner
          </dt>
          <dd>
            Three cuts left points that filing did not even out, so the corners came out different from each other. Mark more points along the coin&apos;s curve and make five or six short cuts, so each one takes off only a sliver and the file only has to smooth. Check each corner against the coin before moving to the next.
          </dd>
        </div>
      </dl>
      <div className={c("phase")}>
        Punching
      </div>
      <dl className={c("fixes")}>
        <div>
          <dt>
            Use fewer prongs where there are two layers
          </dt>
          <dd>
            The 4- and 6-prong chisels would not go through the 3 mm along the pockets, and punching took a lot of time and effort. Every extra tooth needs more force. There, tap the 6-prong lightly just to mark the spacing, then punch through with the 2-prong, overlapping by one hole. Keep the 6-prong for the single layer.
          </dd>
        </div>
        <div>
          <dt>
            Make each strike count
          </dt>
          <dd>
            Put the punch board on the floor or over a table leg, so nothing bounces. Give two or three firm hits with the chisel held still. Rubbing the teeth on a candle or beeswax helps them go in and pull out.
          </dd>
        </div>
        <div>
          <dt>
            Finish stubborn holes with the awl
          </dt>
          <dd>
            If a hole has not gone through the back layer, push the awl (the pointed spike with a handle) through it from the front, held straight up, so it comes out in line on the back. Check that every hole is through on the back before you thread a needle.
          </dd>
        </div>
        <div>
          <dt>
            Follow the curve at the corners
          </dt>
          <dd>
            Punch each corner hole by hole with the 1- or 2-prong chisel, so the stitch line follows the curve. This time it cut straight across the corners.
          </dd>
        </div>
        <div>
          <dt>
            Keep the row on the line
          </dt>
          <dd>
            The stitch line wandered a little. Seat every tooth in the groove and hold the chisel upright before each strike, overlapping by one hole.
          </dd>
        </div>
      </dl>
      <div className={c("phase")}>
        Stitching
      </div>
      <dl className={c("fixes")}>
        <div>
          <dt>
            Use thinner thread
          </dt>
          <dd>
            Small holes and thick thread made every stitch hard to pull through, and the stitches came out ropey. The kit thread is too thick for 4 mm chisel holes. Thread around 0.55 mm goes through easily, sits flatter and slants neatly. Running the awl through the holes on the two-layer parts before you start also helps.
          </dd>
        </div>
        <div>
          <dt>
            Check for skipped holes as you go
          </dt>
          <dd>
            Every few stitches, and again before the final backstitch, look along both sides. Each hole should have thread in it and every stitch should be the same length. A stitch twice as long as its neighbours means a skipped hole. Unpick back to it straight away, because it is much harder to fix once the row is finished.
          </dd>
        </div>
        <div>
          <dt>
            Don&apos;t double back with both needles at the pocket openings
          </dt>
          <dd>
            Three passes with two needles puts six threads in one hole, and they won&apos;t fit. Stitch straight past, or use the one-needle lock now in{' '}
            <a href="#step-10">
              step 10
            </a>
            . Open a tight hole with the awl, and never force a needle or use pliers.
          </dd>
        </div>
        <div>
          <dt>
            Cover the leather when tapping the stitches flat
          </dt>
          <dd>
            A sheet of paper or a scrap of leather under the mallet stops it marking the face.
          </dd>
        </div>
      </dl>
      <div className={c("phase")}>
        Edges
      </div>
      <dl className={c("fixes")}>
        <div>
          <dt>
            Sand the glued edges before burnishing
          </dt>
          <dd>
            After trimming, sand each two-layer edge until the layers read as one flat surface, then work through finer paper (400, 600, then 1000 grit) before any Tokonole. This is the biggest single upgrade. This time a seam line stayed visible between the body and the pockets.
          </dd>
        </div>
        <div>
          <dt>
            Glue right to the edge
          </dt>
          <dd>
            Take the cement all the way out to the edge on both layers, so no gap can show in the finished edge.
          </dd>
        </div>
        <div>
          <dt>
            Use less Tokonole
          </dt>
          <dd>
            A film you can barely see is enough. Thick dabs dried white in the seam and at the step where each pocket starts. Wipe any excess off straight away with a barely damp cloth, or a toothpick in the seam.
          </dd>
        </div>
        <div>
          <dt>
            Second pass: let it dry, then go thinner
          </dt>
          <dd>
            Wait a few minutes after the first pass, file any fuzzy spots, then use only a trace of Tokonole. Two passes are enough; a third adds very little.
          </dd>
        </div>
        <div>
          <dt>
            Finish the edges with cloth
          </dt>
          <dd>
            After the slicker, rub briskly with a scrap of denim or canvas. It evens out patchy gloss and reaches the rounded corners, where the slicker groove can&apos;t.
          </dd>
        </div>
      </dl>
      <div className={c("phase")}>
        The face
      </div>
      <dl className={c("fixes")}>
        <div>
          <dt>
            Keep the face clean while burnishing
          </dt>
          <dd>
            Wipe your fingers before touching the face. Tokonole left a darker rim along the edges and a few faint smudges. The oil in step 13 blends them in. Don&apos;t spot-clean with water, which leaves its own mark.
          </dd>
        </div>
      </dl>
      <div className={c("phase")}>
        Folding and oiling
      </div>
      <dl className={c("fixes")}>
        <div>
          <dt>
            Fold first, oil second
          </dt>
          <dd>
            Dampen, fold and leave it clipped overnight before any oil goes on, as in steps 12 and 13. This time the holder was only held closed after oiling, so the fold set softer and it sprang open about a centimetre. If the oil is already on, don&apos;t add water: it can spot.
          </dd>
        </div>
        <div>
          <dt>
            Have a large clip ready
          </dt>
          <dd>
            The 15–19 mm binder clips were too small to go over the folded holder. Get one that is 41 mm or wider. Paper and a rubber band, or a heavy book, did the job this time.
          </dd>
        </div>
        <div>
          <dt>
            Oil the rough side very lightly
          </dt>
          <dd>
            The rough side soaks up oil unevenly and the inside came out blotchy. Use only a trace there, or oil just the smooth sides.
          </dd>
        </div>
        <div>
          <dt>
            Fix scratches before oiling, not after
          </dt>
          <dd>
            A scratch in the strip between the pockets could not be sanded out once the leather was oiled. Check the inside before step 13.
          </dd>
        </div>
        <div>
          <dt>
            Keep a spare day at the end
          </dt>
          <dd>
            The fold needs one night and the oil needs another. Both ended up on the last night this time.
          </dd>
        </div>
      </dl>
    </>
  );
}

export function Glossary() {
  return (
    <>
      <details className={c("gloss")}>
        <summary>
          Words used in this guide
        </summary>
        <dl>
          <div>
            <dt>
              Smooth side (grain)
            </dt>
            <dd>
              The finished side of the leather. It is the outside of the card holder.
            </dd>
          </div>
          <div>
            <dt>
              Rough side (flesh)
            </dt>
            <dd>
              The fuzzy, suede-like side. It faces inwards, and it is where the cement goes.
            </dd>
          </div>
          <div>
            <dt>
              Offcut
            </dt>
            <dd>
              A leftover scrap of leather, used for practice.
            </dd>
          </div>
          <div>
            <dt>
              Front cover and back cover
            </dt>
            <dd>
              The two halves of the body once it is folded. The front cover is the half you stamp. The back cover stays plain.
            </dd>
          </div>
          <div>
            <dt>
              Fold line
            </dt>
            <dd>
              The line across the middle of the body, 73 mm from each end, where it folds in half.
            </dd>
          </div>
          <div>
            <dt>
              Opening edge
            </dt>
            <dd>
              The long edge of a pocket strip that cards slide in past. It is the one edge that doesn&apos;t get cemented.
            </dd>
          </div>
          <div>
            <dt>
              Tacky
            </dt>
            <dd>
              Cement that feels sticky but doesn&apos;t wet your finger or form strings. Press the pieces together at this point.
            </dd>
          </div>
          <div>
            <dt>
              Groover
            </dt>
            <dd>
              The tool that cuts a line 4 mm from the edge. One light pass leaves a faint guide line. A few light passes make a shallow channel (see{' '}
              <a href="#recessed">
                Recessed stitching
              </a>
              ). Neither is the same thing as the grooves in the slicker.
            </dd>
          </div>
          <div>
            <dt>
              Channel (recessed stitching)
            </dt>
            <dd>
              A shallow groove cut along the stitch line so the thread sits level with the surface, or just under it, instead of on top.
            </dd>
          </div>
          <div>
            <dt>
              Chisel and prongs
            </dt>
            <dd>
              The punching tool for stitching holes. The number of prongs (teeth) is how many holes it makes in one hit.
            </dd>
          </div>
          <div>
            <dt>
              Bevel
            </dt>
            <dd>
              Shaving the sharp square corner off an edge so it becomes a small slope.
            </dd>
          </div>
          <div>
            <dt>
              Slicker
            </dt>
            <dd>
              The wooden tool with curved grooves along its sides. You rub an edge in a groove to burnish it.
            </dd>
          </div>
          <div>
            <dt>
              Burnish
            </dt>
            <dd>
              Rubbing an edge hard and fast with Tokonole until friction makes it smooth and glossy.
            </dd>
          </div>
          <div>
            <dt>
              Saddle stitch
            </dt>
            <dd>
              Sewing with one thread and a needle on each end, so each hole gets two passes. It holds even if one stitch breaks.
            </dd>
          </div>
          <div>
            <dt>
              Backstitch
            </dt>
            <dd>
              Sewing back over a few stitches you have just made, to lock the thread.
            </dd>
          </div>
          <div>
            <dt>
              Spacer
            </dt>
            <dd>
              A pencil or marker laid across the fold line, so the leather folds round it in a soft curve instead of a sharp crease.
            </dd>
          </div>
        </dl>
      </details>
    </>
  );
}

export function WhichSide() {
  return (
    <>
      <div className={c("callout")}>
        <strong>
          Which side is which.
        </strong>
        {' '}Veg-tan has a smooth{' '}
        <em>
          grain
        </em>
        {' '}side and a rough, suede-like{' '}
        <em>
          flesh
        </em>
        {' '}side. The smooth side is the outside of the finished card holder. The pockets are glued to the rough side, which becomes the inside once the body is folded in half. The Z·Y goes on the smooth side of the{' '}
        <em>
          front cover
        </em>
        {' '}half, the half that faces you when it is closed. The back cover half stays plain.
      </div>
    </>
  );
}
