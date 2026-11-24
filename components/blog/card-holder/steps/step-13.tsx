import { c } from '../cls';
import { Step } from '../step';
import { Photos } from '../photos';
import { Do, Facts, Phase } from '../step-parts';

/* Rewritten by hand as phases of single-line actions. The diagrams are the generated ones. */
export function Step13() {
  return (
    <Step n={13} title="Oil and buff">
      <div className={c("tags")}>
        <span className={c("tag tools")}>
          mink oil (30 g) · soft cloth · offcut
        </span>
      </div>
      <p className={c("goal")}>
        Condition the leather and even out its colour. Do it after the fold has dried, because damp leather doesn&apos;t take oil.
      </p>
      <Facts items={[['Oil','a pea-sized dab'],['Wait','30 to 60 minutes'],['Then','overnight']]} />
      <Phase title="Oil">
        <Do>
          <li><strong>Test it on an offcut first.</strong> Mink oil darkens natural veg-tan to a warm tan, so check you like the colour.</li>
          <li><strong>Put a pea-sized dab</strong> of mink oil on the cloth.</li>
          <li><strong>Rub a thin, even layer</strong> over the outside, in small circles. Don&apos;t let it pool, and keep it off the burnished edges as far as you can. Then open it and do the inside and the pockets the same way.</li>
        </Do>
      </Phase>
      <Phase title="Buff and rest">
        <Do>
          <li><strong>Leave it 30 to 60 minutes,</strong> then buff with a clean part of the cloth, outside and inside.</li>
          <li><strong>Leave it overnight:</strong> the colour keeps evening out. Give it a last buff, and it is ready to wrap.</li>
        </Do>
      </Phase>
      <div className={c("callout")}>
        <strong>After oiling</strong>
        <Do>
          <li>The rough side soaks up oil unevenly, so the inside can look blotchy at first. It usually evens out over a few days: don&apos;t add more oil to fix it.</li>
          <li>Don&apos;t sand a scratch once the leather is oiled, because it leaves a pale patch.</li>
          <li>Only plain, unprinted paper should touch freshly oiled leather, since it can pick up ink.</li>
          <li>Natural veg-tan darkens to a honey brown with light and handling, and it should be kept dry.</li>
        </Do>
      </div>
      <figure className={c("fig state")}>
        <svg className={c("d")} viewBox="0 0 380 252" role="img" aria-label="The card holder closed, seen from the front, and opened out flat showing a card in each pocket">
          <text className={c("mid h sub")} x="86.1" y="14">
            CLOSED, front
          </text>
          <text className={c("mid h sub")} x="296.1" y="14">
            OPEN, inside
          </text>
          <path className={c("lf oil")} d="M12 82 H160.2 V163.2 A13.7 13.7 0 0 1 146.5 176.9 H25.7 A13.7 13.7 0 0 1 12 163.2 Z" />
          <path className={c("stitch")} d="M17.2 82 V163.2 A8.5 8.5 0 0 0 25.7 171.7 H146.5 A8.5 8.5 0 0 0 155 163.2 V82" />
          <path className={c("bev")} d="M13 82 V163.2 A12.7 12.7 0 0 0 25.7 175.9 H146.5 A12.7 12.7 0 0 0 159.2 163.2 V82" />
          <path className={c("glossl")} d="M14.6 82 V163.2 A11.1 11.1 0 0 0 25.7 174.3 H146.5 A11.1 11.1 0 0 0 157.6 163.2 V82" />
          <line className={c("foldl")} x1="12" y1="82" x2="160.2" y2="82" />
          <text className={c("mid sub")} x="86.1" y="76">
            fold (the spine)
          </text>
          <text className={c("zy")} x="86.1" y="134.1">
            Z · Y
          </text>
          <text className={c("mid sub")} x="86.1" y="194.9">
            114 × 73 mm
          </text>
          <rect className={c("lf oil")} x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          <rect className={c("cardr")} x="240.2" y="30.6" width="111.8" height="70.2" rx="3" />
          <rect className={c("cardr")} x="240.2" y="145" width="111.8" height="70.2" rx="3" />
          <clipPath id="clip13">
            <rect x="222" y="28" width="148.2" height="189.8" rx="13.7" />
          </clipPath>
          <g clipPath="url(#clip13)">
            <rect className={c("lf2")} x="213.5" y="18.9" width="165.2" height="66.3" rx="0" />
            <rect className={c("oil")} x="213.5" y="18.9" width="165.2" height="66.3" style={{ stroke: "none" }} />
            <rect className={c("lf2")} x="213.5" y="160.6" width="165.2" height="66.3" rx="0" />
            <rect className={c("oil")} x="213.5" y="160.6" width="165.2" height="66.3" style={{ stroke: "none" }} />
          </g>
          <line className={c("gl")} x1="222" y1="85.2" x2="370.2" y2="85.2" />
          <line className={c("gl")} x1="222" y1="160.6" x2="370.2" y2="160.6" />
          <line className={c("foldl")} x1="222" y1="122.9" x2="370.2" y2="122.9" />
          <rect className={c("stitch")} x="227.2" y="33.2" width="137.8" height="179.4" rx="8.5" />
          <rect className={c("bev")} x="223" y="29" width="146.2" height="187.8" rx="12.7" />
          <rect className={c("glossl")} x="224.6" y="30.6" width="143" height="184.6" rx="11.1" />
        </svg>
        <figcaption>
          Same shape, now oiled: the leather is a little darker and softer, and even in colour. Ready to wrap.
        </figcaption>
      </figure>
      <Photos step={13} />
    </Step>
  );
}
