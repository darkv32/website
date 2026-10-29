import 'server-only';
import { createHash, createHmac, randomUUID } from 'node:crypto';
import { createClient, type Client, type Row } from '@libsql/client';
import { LIMITS, type GuestbookEntry, type Kind } from './types';

/* The guestbook's only door to the database. Every query is parameterised, and nothing here returns a row to a visitor that is not approved. */

const url = () => process.env.TURSO_DATABASE_URL?.trim() ?? '';
const token = () => process.env.TURSO_AUTH_TOKEN?.trim() ?? '';

/** True once there is somewhere to store messages: a Turso URL with its token, or a local `file:` database for development. */
export function isLive(): boolean {
  const u = url();
  return !!u && (u.startsWith('file:') || !!token());
}

/** Keys the hash of visitors' addresses. Set GUESTBOOK_SECRET to choose it; otherwise it is derived from the database token. */
export function secret(): string {
  const s = process.env.GUESTBOOK_SECRET?.trim();
  if (s) return s;
  return createHash('sha256').update(`guestbook:${token() || 'local-development'}`).digest('hex');
}

/** Visitors are told apart by a keyed hash of their address, never the address itself. */
export const hashIp = (ip: string) => createHmac('sha256', secret()).update(`ip:${ip}`).digest('hex').slice(0, 32);

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS guestbook (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    agent       TEXT NOT NULL,
    kind        TEXT NOT NULL CHECK (kind IN ('human', 'agent')),
    message     TEXT NOT NULL,
    reply_to    TEXT,
    status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'held', 'rejected')),
    flag_reason TEXT,
    ip_hash     TEXT NOT NULL,
    user_agent  TEXT,
    details     TEXT,
    created_at  INTEGER NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS guestbook_status_time ON guestbook (status, created_at)',
  'CREATE INDEX IF NOT EXISTS guestbook_ip_time ON guestbook (ip_hash, created_at)',
  /* Crawlers and agents that read the site and said who they were, counted per day, per agent and per page. No addresses. */
  `CREATE TABLE IF NOT EXISTS agent_visits (
    day        TEXT NOT NULL,
    agent      TEXT NOT NULL,
    kind       TEXT NOT NULL,
    path       TEXT NOT NULL,
    hits       INTEGER NOT NULL,
    last_seen  INTEGER NOT NULL,
    user_agent TEXT,
    PRIMARY KEY (day, agent, path)
  )`,
];

/* One client and one schema check per server instance. They live on globalThis so a dev reload does not open a second connection. */
const g = globalThis as typeof globalThis & { __gbClient?: Client; __gbReady?: Promise<void> };

async function db(): Promise<Client> {
  g.__gbClient ??= createClient({ url: url(), authToken: token() || undefined });
  const client = g.__gbClient;
  g.__gbReady ??= (async () => {
    await client.batch(SCHEMA, 'write');
    /* a table made before `details` existed gets the column added */
    const cols = await client.execute('PRAGMA table_info(guestbook)');
    if (!cols.rows.some((r) => r.name === 'details')) await client.execute('ALTER TABLE guestbook ADD COLUMN details TEXT');
  })().catch((err) => {
    g.__gbReady = undefined; // try again on the next request instead of failing for good
    throw err;
  });
  await g.__gbReady;
  return client;
}

const num = (v: unknown) => Number(v ?? 0);
const text = (v: unknown) => (v == null ? '' : String(v));

function toEntry(r: Row): GuestbookEntry {
  return {
    id: text(r.id),
    name: text(r.name),
    agent: text(r.agent),
    kind: text(r.kind) as Kind,
    message: text(r.message),
    replyTo: r.reply_to == null ? null : text(r.reply_to),
    createdAt: num(r.created_at),
  };
}

/* ---------- public ---------- */

/** The newest approved messages, oldest first, which is the order the page reads in. */
export async function listApproved(limit: number = LIMITS.feed): Promise<GuestbookEntry[]> {
  const c = await db();
  const res = await c.execute({
    sql: `SELECT id, name, agent, kind, message, reply_to, created_at FROM (
            SELECT * FROM guestbook WHERE status = 'approved' ORDER BY created_at DESC LIMIT ?
          ) ORDER BY created_at ASC`,
    args: [limit],
  });
  return res.rows.map(toEntry);
}

export interface NewMessage {
  name: string;
  agent: string;
  kind: Kind;
  message: string;
  replyTo: string | null;
  status: 'approved' | 'pending' | 'held';
  flagReason: string | null;
  ipHash: string;
  userAgent: string;
  /** What the poster said about itself, and the few request headers worth keeping. */
  details: Record<string, string>;
}

export async function insertMessage(m: NewMessage): Promise<{ id: string; createdAt: number }> {
  const c = await db();
  const id = randomUUID();
  const createdAt = Date.now();
  await c.execute({
    sql: `INSERT INTO guestbook (id, name, agent, kind, message, reply_to, status, flag_reason, ip_hash, user_agent, details, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [id, m.name, m.agent, m.kind, m.message, m.replyTo, m.status, m.flagReason, m.ipHash, m.userAgent.slice(0, 200), Object.keys(m.details).length ? JSON.stringify(m.details) : null, createdAt],
  });
  return { id, createdAt };
}

/** When this visitor posted over the last day, oldest first. Every attempt counts, whatever became of it. */
export async function recentPosts(ipHash: string, since: number): Promise<number[]> {
  const c = await db();
  const res = await c.execute({ sql: 'SELECT created_at FROM guestbook WHERE ip_hash = ? AND created_at > ? ORDER BY created_at ASC LIMIT 100', args: [ipHash, since] });
  return res.rows.map((r) => num(r.created_at));
}

/** Messages published without review in the last while, across everyone: the rush breaker counts these. */
export async function publishedSince(since: number): Promise<number> {
  const c = await db();
  const res = await c.execute({ sql: "SELECT COUNT(*) AS n FROM guestbook WHERE status = 'approved' AND created_at > ?", args: [since] });
  return num(res.rows[0]?.n);
}

/** Messages waiting for a person, across everyone. */
export async function queueSize(): Promise<number> {
  const c = await db();
  const res = await c.execute("SELECT COUNT(*) AS n FROM guestbook WHERE status IN ('pending', 'held')");
  return num(res.rows[0]?.n);
}

export async function isDuplicate(ipHash: string, message: string, since: number): Promise<boolean> {
  const c = await db();
  const res = await c.execute({ sql: 'SELECT 1 FROM guestbook WHERE ip_hash = ? AND message = ? AND created_at > ? LIMIT 1', args: [ipHash, message, since] });
  return res.rows.length > 0;
}

/** A reply may only point at a message the public can already see. */
export async function approvedExists(id: string): Promise<boolean> {
  const c = await db();
  const res = await c.execute({ sql: "SELECT 1 FROM guestbook WHERE id = ? AND status = 'approved' LIMIT 1", args: [id] });
  return res.rows.length > 0;
}

/* ---------- agent visits ---------- */

export interface Visit {
  day: string;
  agent: string;
  kind: string;
  path: string;
  userAgent: string;
}

/** Adds one visit to that day's count for the agent and page. The first visit of the day creates the row. */
export async function recordVisit(v: Visit): Promise<void> {
  const c = await db();
  await c.execute({
    sql: `INSERT INTO agent_visits (day, agent, kind, path, hits, last_seen, user_agent) VALUES (?, ?, ?, ?, 1, ?, ?)
          ON CONFLICT (day, agent, path) DO UPDATE SET hits = hits + 1, last_seen = excluded.last_seen, user_agent = excluded.user_agent`,
    args: [v.day, v.agent, v.kind, v.path, Date.now(), v.userAgent.slice(0, 200)],
  });
}
