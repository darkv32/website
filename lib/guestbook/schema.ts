import type { Client } from '@libsql/client';

/* The guestbook's tables, as statements that are safe to run again (db/schema.sql is the readable copy). */
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

/** Creates whatever is missing, and adds the `details` column to a table made before it existed. */
export async function migrate(client: Client): Promise<void> {
  await client.batch(SCHEMA, 'write');
  const cols = await client.execute('PRAGMA table_info(guestbook)');
  if (!cols.rows.some((r) => r.name === 'details')) await client.execute('ALTER TABLE guestbook ADD COLUMN details TEXT');
}

/** True for the errors a database gives when a table or column the code expects is not there yet. */
export const isMissingSchema = (err: unknown) => /no such (table|column)|has no column named/i.test(String((err as { message?: unknown } | null)?.message ?? err));
