'use client';

import { useEffect } from 'react';

/* True once the first page has been on screen. The server never runs effects, so it always renders the first-load version. */
let hydrated = false;

/**
 * Re-mounts on every navigation, so each page fades in instead of snapping into place.
 * The first load skips the fade: a page that starts out transparent is not counted as painted until it is visible,
 * which would push the largest-contentful-paint time back by the length of the fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hydrated = true;
  }, []);

  return <div className={hydrated ? 'page-enter flex flex-1 flex-col' : 'flex flex-1 flex-col'}>{children}</div>;
}
