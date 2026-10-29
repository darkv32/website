/* Moderate the guestbook from your own machine:  bun run guestbook <command>

   Bun reads TURSO_DATABASE_URL and TURSO_AUTH_TOKEN from .env.local, so there is no login and nothing on the web to protect.
   Changes reach the public page within about a minute, when it next refreshes.

     (no command)          what is held for review, then the latest published messages
     list [status] [n]     status is held, pending, approved, rejected or all (default all), n is how many (default 20)
     hide <id...>          take a message out of public view (it is kept, as "rejected")
     approve <id...>       publish a held message, or bring a hidden one back
     delete <id...>        erase a hidden message for good (hide it first)
     hide-from <who>       hide everything sent from one address, using the #tag shown beside each message
     stats                 how many messages are in each state
     visits [days]         which crawlers and agents read the site over the last days (default 7), by what they call themselves

   An <id> is the short code shown at the start of each line; the first 6 or more characters are enough. */

import { createClient, type Client, type Row } from '@libsql/client';

const STATUSES = ['pending', 'held', 'approved', 'rejected'] as const;
type Status = (typeof STATUSES)[number];

const when = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Singapore', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false });

/** Message text comes from strangers, so nothing that could drive the terminal (escape codes, for one) is printed. */
const safe = (v: unknown) => String(v ?? '').replace(/[\u0000-\u001F\u007F-\u009F‪-‮⁦-⁩]/g, ' ');

function connect(): Client {
  const url = process.env.TURSO_DATABASE_URL?.trim();
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
  if (!url || (!url.startsWith('file:') && !authToken)) {
    console.error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are not set. Put them in .env.local and run this from the project folder.');
    process.exit(1);
  }
  return createClient({ url, authToken: authToken || undefined });
}

/** The poster's own claims and the few headers kept with a message, as one short line. */
function detailsLine(raw: unknown) {
  if (!raw) return '';
  try {
    const d = JSON.parse(String(raw)) as Record<string, unknown>;
    return Object.entries(d).map(([k, v]) => `${safe(k)}=${safe(v)}`).join('  ');
  } catch {
    return '';
  }
}

function line(r: Row) {
  const head = [
    `#${safe(r.id).slice(0, 8)}`,
    safe(r.status).padEnd(8),
    safe(r.kind).padEnd(5),
    `${safe(r.name)}${r.kind === 'agent' ? ` (${safe(r.agent)})` : ''}`,
  ].join('  ');
  const meta = `${when.format(new Date(Number(r.created_at)))} SGT  from #${safe(r.ip_hash).slice(0, 8)}${r.reply_to ? `  reply to #${safe(r.reply_to).slice(0, 8)}` : ''}`;
  const out = [head, `        ${meta}`];
  if (r.flag_reason) out.push(`        held: ${safe(r.flag_reason)}`);
  if (r.user_agent) out.push(`        user-agent: ${safe(r.user_agent)}`);
  const extra = detailsLine(r.details);
  if (extra) out.push(`        ${extra}`);
  out.push(`        > ${safe(r.message)}`, '');
  return out.join('\n');
}

async function show(c: Client, title: string, where: string, args: Array<string | number>, limit: number) {
  const res = await c.execute({ sql: `SELECT * FROM guestbook ${where} ORDER BY created_at DESC LIMIT ?`, args: [...args, limit] });
  console.log(`\n${title} (${res.rows.length})\n`);
  console.log(res.rows.length ? res.rows.map(line).join('\n') : '        nothing\n');
}

/** Turns the short code shown on each line into one message id. It must match exactly one. */
async function resolve(c: Client, code: string): Promise<{ id: string; status: Status } | null> {
  if (!/^#?[0-9a-f-]{6,36}$/i.test(code)) {
    console.error(`"${code}" is not a message code. Use the first 6 or more characters shown at the start of a line.`);
    return null;
  }
  const res = await c.execute({ sql: "SELECT id, status FROM guestbook WHERE id LIKE ? || '%' LIMIT 3", args: [code.replace('#', '').toLowerCase()] });
  if (res.rows.length === 0) console.error(`No message starts with "${code}".`);
  else if (res.rows.length > 1) console.error(`"${code}" matches more than one message. Use more characters.`);
  else return { id: String(res.rows[0].id), status: String(res.rows[0].status) as Status };
  return null;
}

async function setStatus(c: Client, codes: string[], status: Status, verb: string) {
  if (!codes.length) return console.error(`Usage: bun run guestbook ${verb} <id...>`);
  for (const code of codes) {
    const m = await resolve(c, code);
    if (!m) continue;
    await c.execute({ sql: 'UPDATE guestbook SET status = ? WHERE id = ?', args: [status, m.id] });
    console.log(`#${m.id.slice(0, 8)}  ${m.status} -> ${status}`);
  }
}

async function main() {
  const [cmd = 'overview', ...rest] = process.argv.slice(2);
  const c = connect();

  switch (cmd) {
    case 'overview':
      await show(c, 'Held for review', "WHERE status IN ('held', 'pending')", [], 50);
      await show(c, 'Latest published', "WHERE status = 'approved'", [], 10);
      break;

    case 'list': {
      const status = rest[0] && (STATUSES as readonly string[]).includes(rest[0]) ? rest[0] : 'all';
      const n = Number(rest.find((x) => /^\d+$/.test(x)) ?? 20);
      if (rest[0] && status === 'all' && rest[0] !== 'all' && !/^\d+$/.test(rest[0])) return console.error(`Unknown status "${rest[0]}". Use held, pending, approved, rejected or all.`);
      await show(c, status === 'all' ? 'All messages' : `Messages: ${status}`, status === 'all' ? '' : 'WHERE status = ?', status === 'all' ? [] : [status], Math.min(n, 200));
      break;
    }

    case 'hide':
      await setStatus(c, rest, 'rejected', 'hide');
      break;

    case 'approve':
      await setStatus(c, rest, 'approved', 'approve');
      break;

    case 'delete':
      if (!rest.length) return console.error('Usage: bun run guestbook delete <id...>');
      for (const code of rest) {
        const m = await resolve(c, code);
        if (!m) continue;
        if (m.status !== 'rejected') {
          console.error(`#${m.id.slice(0, 8)} is ${m.status}. Hide it first, then delete it.`);
          continue;
        }
        await c.batch(
          [
            { sql: 'DELETE FROM guestbook WHERE id = ?', args: [m.id] },
            /* a reply whose parent is gone becomes a message of its own */
            { sql: 'UPDATE guestbook SET reply_to = NULL WHERE reply_to = ?', args: [m.id] },
          ],
          'write',
        );
        console.log(`#${m.id.slice(0, 8)}  deleted`);
      }
      break;

    case 'hide-from': {
      const who = (rest[0] ?? '').replace('#', '').toLowerCase();
      if (!/^[0-9a-f]{6,32}$/.test(who)) return console.error('Usage: bun run guestbook hide-from <who>   (the 6 or more characters after "from #" on a line)');
      const res = await c.execute({ sql: "UPDATE guestbook SET status = 'rejected' WHERE ip_hash LIKE ? || '%' AND status != 'rejected'", args: [who] });
      console.log(`Hid ${res.rowsAffected} message${res.rowsAffected === 1 ? '' : 's'} from #${who}.`);
      break;
    }

    case 'stats': {
      const res = await c.execute('SELECT status, COUNT(*) AS n FROM guestbook GROUP BY status');
      const n = Object.fromEntries(res.rows.map((r) => [String(r.status), Number(r.n)]));
      for (const s of STATUSES) console.log(`${s.padEnd(9)} ${n[s] ?? 0}`);
      break;
    }

    case 'visits': {
      const days = Math.min(Math.max(Number(rest[0] ?? 7) || 7, 1), 90);
      const since = new Date(Date.now() - (days - 1) * 86_400_000).toISOString().slice(0, 10);
      const rows = (await c.execute({ sql: 'SELECT day, agent, kind, path, hits, last_seen, user_agent FROM agent_visits WHERE day >= ?', args: [since] })).rows;
      if (!rows.length) return console.log(`\nNo crawlers or agents identified themselves in the last ${days} day${days === 1 ? '' : 's'}.\nOnly visitors that say who they are show up here. One driving an ordinary browser looks like a person.\n`);

      const KINDS: Array<[string, string]> = [
        ['ai-assistant', 'AI assistants (fetching a page because someone asked)'],
        ['ai-search', 'AI search indexers'],
        ['ai-training', 'AI training crawlers'],
        ['search', 'Search engines (for comparison)'],
        ['automation', 'Scripts and headless browsers (could be anyone)'],
      ];
      console.log(`\nVisits by self-identified crawlers and agents, last ${days} day${days === 1 ? '' : 's'} (UTC)\n`);
      for (const [kind, title] of KINDS) {
        const mine = rows.filter((r) => r.kind === kind);
        if (!mine.length) continue;
        const total = mine.reduce((n, r) => n + Number(r.hits), 0);
        console.log(`${title}: ${total}`);
        const byAgent = new Map<string, { hits: number; last: number; pages: Map<string, number>; ua: string }>();
        for (const r of mine) {
          const a = byAgent.get(String(r.agent)) ?? { hits: 0, last: 0, pages: new Map(), ua: '' };
          a.hits += Number(r.hits);
          if (Number(r.last_seen) >= a.last) { a.last = Number(r.last_seen); a.ua = safe(r.user_agent); }
          a.pages.set(String(r.path), (a.pages.get(String(r.path)) ?? 0) + Number(r.hits));
          byAgent.set(String(r.agent), a);
        }
        for (const [name, a] of [...byAgent].sort((x, y) => y[1].hits - x[1].hits)) {
          const top = [...a.pages].sort((x, y) => y[1] - x[1]).slice(0, 3).map(([p, n]) => `${safe(p)} x${n}`).join(', ');
          console.log(`  ${safe(name).padEnd(22)} ${String(a.hits).padStart(5)}   last ${when.format(new Date(a.last))} SGT   ${top}`);
        }
        console.log('');
      }
      break;
    }

    default:
      console.error(`Unknown command "${cmd}". Commands: list, hide, approve, delete, hide-from, stats, visits. See the top of scripts/guestbook.ts.`);
      process.exit(1);
  }
}

main().then(
  () => process.exit(0),
  (err: unknown) => {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(/no such table/i.test(msg) ? 'There is no guestbook table yet. Load the guestbook page once so the site creates it.' : `Failed: ${msg}`);
    process.exit(1);
  },
);
