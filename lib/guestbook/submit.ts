import 'server-only';
import { checkSubmission } from './sanitize';
import { approvedExists, hashIp, insertMessage, isDuplicate, publishedSince, queueSize, recentPosts } from './db';
import { DAY, HOUR, LIMITS, type GuestbookEntry } from './types';

/* What happens to a posted message, in order: clean it, check this visitor's rate, check the queue, refuse repeats, then decide whether it goes live.
   A clean message is published at once. One the screen caught is held for the owner, and so is everything while the guestbook is in review mode or in a rush.
   The route handler only turns the outcome into an HTTP response. */

export type Outcome =
  | { ok: true; id: string; status: 'published'; entry: GuestbookEntry }
  | { ok: true; id: string; status: 'held' }
  | { ok: false; status: 409 | 422 | 429 | 503; error: string; field?: string; retryAfter?: number };

/** Set GUESTBOOK_REVIEW_ALL=1 to stop publishing automatically and hold every message, for instance while spam is coming in. */
const reviewAll = () => /^(1|true|yes|on)$/i.test(process.env.GUESTBOOK_REVIEW_ALL?.trim() ?? '');

export async function submit(body: unknown, ip: string, userAgent: string, headerDetails: Record<string, string> = {}): Promise<Outcome> {
  const checked = checkSubmission(body);
  if (!checked.ok) return { ok: false, status: 422, error: checked.error, field: checked.field };
  const m = checked.value;

  const ipHash = hashIp(ip);
  const now = Date.now();

  /* None of these reads depends on another, so they go out together instead of one round trip after the other.
     The answers are still weighed in the same order as before: the rate limit first, then the queue, repeats, the reply target, and last the rush breaker. */
  const needsRush = !m.flag && !reviewAll();
  const [posts, queued, duplicate, replyOk, published] = await Promise.all([
    recentPosts(ipHash, now - DAY),
    queueSize(),
    isDuplicate(ipHash, m.message, now - DAY),
    m.replyTo ? approvedExists(m.replyTo) : true,
    needsRush ? publishedSince(now - HOUR) : 0,
  ]);

  const lastHour = posts.filter((t) => t > now - HOUR);
  if (lastHour.length >= LIMITS.perHour) {
    return { ok: false, status: 429, error: 'You are posting too fast. Try again later.', retryAfter: Math.ceil((lastHour[0] + HOUR - now) / 1000) };
  }
  if (posts.length >= LIMITS.perDay) {
    return { ok: false, status: 429, error: 'That is the limit for today. Try again tomorrow.', retryAfter: Math.ceil((posts[0] + DAY - now) / 1000) };
  }

  if (queued >= LIMITS.queue) {
    return { ok: false, status: 503, error: 'The guestbook has a lot waiting for review right now. Try again later.', retryAfter: 3600 };
  }

  if (duplicate) {
    return { ok: false, status: 409, error: 'You already sent that message.' };
  }

  if (!replyOk) {
    return { ok: false, status: 422, error: 'That message does not exist, or it is not public.', field: 'replyTo' };
  }

  let status: 'approved' | 'pending' | 'held' = 'approved';
  let flagReason = m.flag;
  if (m.flag) status = 'held';
  else if (reviewAll()) status = 'pending';
  else if (published >= LIMITS.autoPerHour) {
    status = 'held';
    flagReason = 'arrived while auto-publishing was paused for a busy hour';
  }

  const { id, createdAt } = await insertMessage({
    name: m.name,
    agent: m.agent,
    kind: m.kind,
    message: m.message,
    replyTo: m.replyTo,
    status,
    flagReason,
    ipHash,
    userAgent,
    /* what the sender said about itself comes last, so a header can never overwrite it */
    details: { ...headerDetails, ...m.extra },
  });

  if (status !== 'approved') return { ok: true, id, status: 'held' };
  return { ok: true, id, status: 'published', entry: { id, name: m.name, agent: m.agent, kind: m.kind, message: m.message, replyTo: m.replyTo, createdAt } };
}
