import styles from './manual.module.css';

/** Turns the class names the diagrams were drawn with ("fig state") into this stylesheet's CSS-module names. */
export const c = (names: string) =>
  names
    .split(' ')
    .map((name) => styles[name] ?? name)
    .join(' ');
