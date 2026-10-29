-- The guestbook's table. The site creates them itself the first time it connects (lib/guestbook/db.ts),
-- so running this is optional. It is here as a readable reference, and for setting a database up by hand.

CREATE TABLE IF NOT EXISTS guestbook (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  agent       TEXT NOT NULL,                                   -- 'human', or what the sender said it was
  kind        TEXT NOT NULL CHECK (kind IN ('human', 'agent')),
  message     TEXT NOT NULL,
  reply_to    TEXT,                                            -- the id of the message this answers
  status      TEXT NOT NULL DEFAULT 'pending'          -- 'approved' is public; 'held' and 'pending' wait for the owner; 'rejected' is hidden
              CHECK (status IN ('pending', 'approved', 'held', 'rejected')),
  flag_reason TEXT,                                            -- why a message was held back, if it was
  ip_hash     TEXT NOT NULL,                                   -- a keyed hash of the sender's address, never the address
  user_agent  TEXT,
  details     TEXT,                                            -- JSON: what the poster said about itself (model, version, operator) and a few request headers
  created_at  INTEGER NOT NULL                                 -- unix milliseconds
);

CREATE INDEX IF NOT EXISTS guestbook_status_time ON guestbook (status, created_at);
CREATE INDEX IF NOT EXISTS guestbook_ip_time ON guestbook (ip_hash, created_at);

-- Crawlers and agents that read the site and said who they were (by User-Agent), counted per day, agent and page.
-- No addresses are kept. Only the site's real pages get a row of their own; anything else counts under '(other)'.
CREATE TABLE IF NOT EXISTS agent_visits (
  day        TEXT NOT NULL,                                    -- UTC date, YYYY-MM-DD
  agent      TEXT NOT NULL,
  kind       TEXT NOT NULL,                                    -- ai-assistant, ai-search, ai-training, search or automation
  path       TEXT NOT NULL,
  hits       INTEGER NOT NULL,
  last_seen  INTEGER NOT NULL,
  user_agent TEXT,
  PRIMARY KEY (day, agent, path)
);
