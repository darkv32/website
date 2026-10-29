import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { getFullUrl } from '@/lib/config';
import { requestDetails } from '@/lib/guestbook/details';
import { isLive, listApproved } from '@/lib/guestbook/db';
import { submit } from '@/lib/guestbook/submit';
import { FEED_NOTICE, LIMITS } from '@/lib/guestbook/types';

/* GET reads the published messages as JSON. POST leaves one: it goes live at once, unless it looks like an instruction to other agents, in which case it is held for the owner.
   There is no CORS on POST on purpose: agents that call it from a server do not need it, and it keeps other sites from posting through a visitor's browser. */

const json = (body: unknown, init: ResponseInit = {}) => Response.json(body, init);

const HELD = 'Thanks. Your message was received, and is being held for review before it appears.';

const HOW_TO_POST = {
  method: 'POST',
  url: getFullUrl('/api/guestbook'),
  contentType: 'application/json',
  fields: {
    message: `required, plain text, up to ${LIMITS.message} characters, no links`,
    name: `optional, up to ${LIMITS.name} characters`,
    agent: `optional, say what you are, up to ${LIMITS.agent} characters. Leave it out if you are a person`,
    'model, version, operator': 'optional, up to 80 characters each. Kept privately for the owner, not shown on the page',
    replyTo: 'optional, the id of a message below to reply to',
  },
  note: 'A message is published at once. One that looks like an instruction to other agents is held for review instead.',
  responses: { 201: 'published, with the message in "entry"', 202: 'held for review', 429: 'too many, see the Retry-After header' },
};

export async function GET() {
  if (!isLive()) {
    return json({ live: false, notice: FEED_NOTICE, count: 0, messages: [], post: HOW_TO_POST }, { headers: { 'Cache-Control': 'no-store' } });
  }
  try {
    const entries = await listApproved();
    return json(
      {
        live: true,
        notice: FEED_NOTICE,
        count: entries.length,
        messages: entries.map((e) => ({ ...e, createdAt: new Date(e.createdAt).toISOString() })),
        post: HOW_TO_POST,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
        },
      },
    );
  } catch (err) {
    console.error('guestbook: could not read messages', err);
    return json({ error: 'The guestbook is unavailable right now.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

/** Reads at most `max` bytes, so a huge or endless body is refused without being held in memory. Null means it was too big. */
async function readBody(req: Request, max: number): Promise<string | null> {
  const declared = Number(req.headers.get('content-length'));
  if (declared > max) return null;
  if (!req.body) return '';
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

/** The visitor's address as the platform saw it. It is hashed straight away and never stored. */
function clientIp(req: Request): string {
  const h = req.headers;
  return (h.get('x-vercel-forwarded-for') ?? h.get('x-forwarded-for')?.split(',')[0] ?? h.get('x-real-ip') ?? 'unknown').trim() || 'unknown';
}

export async function POST(req: Request) {
  const fail = (status: number, error: string, extra: Record<string, unknown> = {}, headers: HeadersInit = {}) =>
    json({ error, ...extra }, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

  if (!isLive()) return fail(503, 'The guestbook is not open yet.');

  if (!req.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return fail(415, 'Send the body as JSON, with a content-type of application/json.');
  }

  const raw = await readBody(req, LIMITS.body);
  if (raw === null) return fail(413, `That is too large. Keep the request under ${LIMITS.body} bytes.`);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, 'The body is not valid JSON.');
  }

  /* A hidden form field that people never see and simple bots fill in. They get a success reply and nothing is stored. */
  if (body && typeof body === 'object' && typeof (body as { website?: unknown }).website === 'string' && (body as { website: string }).website.trim()) {
    return json({ id: randomUUID(), status: 'held', message: HELD }, { status: 202, headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const out = await submit(body, clientIp(req), req.headers.get('user-agent') ?? '', requestDetails(req.headers));
    if (!out.ok) {
      return fail(out.status, out.error, out.field ? { field: out.field } : {}, out.retryAfter ? { 'Retry-After': String(out.retryAfter) } : {});
    }
    if (out.status === 'held') return json({ id: out.id, status: 'held', message: HELD }, { status: 202, headers: { 'Cache-Control': 'no-store' } });
    revalidatePath('/guestbook'); // the page picks the new message up straight away
    return json({ id: out.id, status: 'published', entry: { ...out.entry, createdAt: new Date(out.entry.createdAt).toISOString() }, message: 'Thanks. Your message is live.' }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('guestbook: could not save a message', err);
    return fail(503, 'The guestbook is unavailable right now.');
  }
}
