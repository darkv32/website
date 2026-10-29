/* Browser-only helpers. Call them from effects and event handlers, never while rendering. */

/** True when the event target is something the visitor types into, so single-key shortcuts should stay out of the way. */
export function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
}

let reducedMotion: MediaQueryList | undefined;

/** Whether the visitor asked for less motion. The query is created once and stays live, so this is cheap inside pointer handlers. */
export function prefersReducedMotion() {
  reducedMotion ??= matchMedia('(prefers-reduced-motion: reduce)');
  return reducedMotion.matches;
}

/**
 * Runs `fn` on the next frame and then at most once per frame while the page scrolls or resizes.
 * `queue` asks for a run from any other trigger (an observer, say); `stop` removes the listeners and any pending frame.
 */
export function watchScroll(fn: () => void) {
  let raf = 0;
  let stopped = false;
  const queue = () => {
    if (raf || stopped) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      fn();
    });
  };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  queue();
  return {
    queue,
    stop() {
      stopped = true;
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
      cancelAnimationFrame(raf);
    },
  };
}
