import Image from 'next/image';
import { c } from './cls';

/** The photos of the real build, by file name in /public/blog/card-holder. Captions only say what the photo shows or what the "Next time" notes say about it. */
const PHOTOS = {
  'finished-outside': {
    alt: 'The finished leather card holder held in one hand, with Z Y stamped on the front and brown stitching around the edge',
    caption: 'Oiled and buffed: Z Y on the front, brown stitching, and a glossy edge all the way round.',
  },
  'finished-inside': {
    alt: 'The finished card holder held open in one hand, showing two empty pockets with brown stitching',
    caption: 'The inside. The curved mark between the pockets is the scratch from the Next time notes, and the rough side took the oil unevenly.',
  },
  'outside-holes-punched': {
    alt: 'The outside of the leather card holder flat on a cutting mat, with Z Y stamped near the bottom and a row of punched stitching holes along the edge',
    caption: 'The outside, with Z Y already stamped and the holes punched all the way round.',
  },
  'inside-holes-punched': {
    alt: 'The inside of the leather card holder flat on a cutting mat, with a pocket at the top, a pocket at the bottom and punched stitching holes along the sides',
    caption: 'The inside. Both pockets are glued on, and the holes go through both layers.',
  },
  'outside-stitched': {
    alt: 'The outside of the leather card holder held in one hand, with brown thread stitched around the edge and Z Y stamped near the bottom',
    caption: 'Stitched, outside. The edges are still raw and a little fuzzy.',
  },
  'inside-stitched': {
    alt: 'The inside of the stitched leather card holder held in one hand, showing the two pockets and the brown stitching along the sides',
    caption: 'Stitched, inside. The kit thread was thick for these holes, so the stitches came out ropey.',
  },
  'inside-on-the-mat': {
    alt: 'The stitched inside of the card holder on a cutting mat, next to a jar of finishing gum, a spool of brown thread and a sanding stick',
    caption: 'Ready for the edges, with the Tokonole, a nail file and the thread within reach.',
  },
  'outside-on-the-mat': {
    alt: 'The outside of the card holder on a cutting mat, with its edges starting to darken and a wooden slicker beside it',
    caption: 'After the first pass the edges are darkening. The wooden slicker is on the left.',
  },
  'edge-side-view': {
    alt: 'A side view of the card holder held between two fingers, showing a smooth tan edge where the layers of leather meet',
    caption: 'Side on, the body and the pocket start to read as one edge.',
  },
  'edge-glossy': {
    alt: 'A close side view of the card holder edge with a glossy sheen along the stitched seam',
    caption: 'After the second pass the edge is glossy.',
  },
  'edge-step': {
    alt: 'A side view of the card holder edge showing a small step in the edge where the pocket layer ends',
    caption: 'Not perfect. A seam line stayed visible, and dried white Tokonole sits at the step where the pocket starts.',
  },
  'folded-with-pencil': {
    alt: 'The folded card holder on a strip of white paper with Z Y stamped on the front and a pencil beside it',
    caption: 'Folded around a pencil spacer, so the fold is a soft curve and not a sharp crease.',
  },
  'folded-on-paper': {
    alt: 'The folded card holder on a strip of white paper with Z Y stamped on the front, next to a pencil and some bank cards',
    caption: 'Held closed with paper while the fold sets.',
  },
} as const;

type PhotoName = keyof typeof PHOTOS;

/** Which photos belong at the end of which step. */
const BY_STEP: Record<number, PhotoName[]> = {
  9: ['outside-holes-punched', 'inside-holes-punched'],
  10: ['outside-stitched', 'inside-stitched'],
  11: ['inside-on-the-mat', 'outside-on-the-mat', 'edge-side-view', 'edge-glossy', 'edge-step'],
  12: ['folded-with-pencil', 'folded-on-paper'],
  13: ['finished-outside', 'finished-inside'],
};

const SIZES = '(max-width: 640px) 90vw, 260px';

function Photo({ name, sizes = SIZES, priority = false }: { name: PhotoName; sizes?: string; priority?: boolean }) {
  const { alt, caption } = PHOTOS[name];
  return (
    <figure className={c('photo')}>
      <div className={c('photo-frame')}>
        <Image src={`/blog/card-holder/${name}.jpg`} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** The photos of my own piece at the end of a step, under the diagram of what it should look like. */
export function Photos({ step }: { step: number }) {
  const names = BY_STEP[step];
  if (!names) return null;
  return (
    <div className={c('photos')}>
      <div className={c('photos-label')}>Mine at this point</div>
      <div className={c('photos-grid')}>
        {names.map((name) => (
          <Photo key={name} name={name} />
        ))}
      </div>
    </div>
  );
}

/** The big picture at the top of the post. */
export function HeroPhoto() {
  return <Photo name="finished-outside" sizes="(max-width: 640px) 90vw, 320px" priority />;
}
