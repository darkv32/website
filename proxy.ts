import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { bucketPath, classify } from '@/lib/guestbook/agents';
import { isLive, recordVisit } from '@/lib/guestbook/db';
import { getAllBlogPosts } from '@/lib/data';

/* Notes which AI crawlers and agents read the site, by what they call themselves. It touches nothing else: an ordinary visitor's request is classified, found to be a browser, and passed straight through.
   The write happens after the response is sent. Only a day, an agent name, a page and a count are kept; no address and no cookie. */

const slugs = new Set(getAllBlogPosts().map((post) => post.slug));

/* A stranger can send any User-Agent, so a flood claiming to be a crawler could turn into a flood of writes. Each server instance writes at most this many a minute and skips the rest, which undercounts a flood and nothing else. */
const BUDGET = 300;
let windowStart = 0;
let used = 0;
function allowed() {
  const now = Date.now();
  if (now - windowStart > 60_000) {
    windowStart = now;
    used = 0;
  }
  return ++used <= BUDGET;
}

/* Next runs the proxy a second time, a few milliseconds later, for the same request when it renders a 404 (crawlers hit missing pages all the time).
   An identical request from the same agent within this long counts once. Reading the same page twice in half a second is the price. */
const REPEAT_MS = 500;
const recent = new Map<string, number>();
function repeat(key: string) {
  const now = Date.now();
  const last = recent.get(key);
  recent.set(key, now);
  if (recent.size > 500) for (const [k, at] of recent) if (now - at > REPEAT_MS) recent.delete(k);
  return last !== undefined && now - last < REPEAT_MS;
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { method, headers } = request;
  if (method === 'GET' || method === 'HEAD') {
    const who = classify(headers.get('user-agent'));
    if (who && isLive() && !repeat(`${method} ${request.nextUrl.pathname} ${headers.get('user-agent')}`) && allowed()) {
      event.waitUntil(
        recordVisit({
          day: new Date().toISOString().slice(0, 10),
          agent: who.name,
          kind: who.kind,
          path: bucketPath(request.nextUrl.pathname, slugs),
          userAgent: headers.get('user-agent') ?? '',
        }).catch((err) => console.error('guestbook: could not record a visit', err)),
      );
    }
  }
  return NextResponse.next();
}

/* Pages, the feeds and the machine-readable files; not the build output, images or icons, which would only add noise */
export const config = {
  matcher: ['/((?!_next/|favicon|icon|apple-icon|pwa-icon|manifest|.*opengraph-image|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|css|js|map|woff2?|ttf)$).*)'],
};
