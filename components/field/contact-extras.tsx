'use client';

import { useState, useSyncExternalStore } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { SITE_CONFIG } from '@/lib/config';
import { Reveal } from './reveal';
import s from './field.module.css';
import p from './pages.module.css';

const EMAIL = SITE_CONFIG.site.email;

/* ---------- Singapore clock and the 24-hour strip ---------- */
const sgFormat = new Intl.DateTimeFormat('en-GB', { timeZone: SITE_CONFIG.site.timezone, hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short' });
const pad = (n: number) => String(n).padStart(2, '0');

/* One string holds everything the strip needs, so the snapshot is stable between ticks: SGT hour|minute|weekday|your hour|your minute|hours you are behind SGT. */
function clockSnapshot() {
  const d = new Date();
  const parts = Object.fromEntries(sgFormat.formatToParts(d).map((x) => [x.type, x.value]));
  return [parts.hour, parts.minute, parts.weekday, d.getHours(), d.getMinutes(), Math.round((d.getTimezoneOffset() + 480) / 60)].join('|');
}
function subscribeClock(cb: () => void) {
  const id = setInterval(cb, 15000);
  return () => clearInterval(id);
}

export function TimeStrip() {
  const snap = useSyncExternalStore(subscribeClock, clockSnapshot, () => '');
  const [hh, mm, weekday, yh, ym, diff] = snap ? snap.split('|') : ['--', '--', '', '', '', '0'];
  const sgHour = snap ? Number(hh) % 24 : -1;
  const behind = Number(diff);
  const youHour = snap ? (((Number(yh) + behind) % 24) + 24) % 24 : -1;
  const weekend = weekday === 'Sat' || weekday === 'Sun';
  const note = !snap
    ? ''
    : sgHour >= 9 && sgHour < 18 && !weekend
      ? 'Working hours in Singapore. Good time to send something.'
      : sgHour >= 23 || sgHour < 7
        ? 'Late in Singapore. Email is patient, so go ahead and send it anyway.'
        : 'Outside office hours in Singapore. It will be there when I am.';

  return (
    <Reveal className={p.tz}>
      <div>
        <span className={s.label}>Singapore right now</span>
        <div className={p.tzBig} suppressHydrationWarning>
          {hh}:{mm}
          <small>SGT{weekday ? ` · ${weekday.toUpperCase()}` : ''}</small>
        </div>
        <p>{note}</p>
      </div>
      <div>
        <div className={p.hours} aria-hidden="true">
          {Array.from({ length: 24 }, (_, h) => (
            <i
              key={h}
              data-t={`${pad(h)}:00 SGT`}
              className={[h >= 9 && h < 18 && p.day, h === sgHour && p.now, h === youHour && behind !== 0 && p.you].filter(Boolean).join(' ')}
            />
          ))}
        </div>
        <div className={p.hrLab} aria-hidden="true"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div>
        <div className={p.hrKey}>
          <span className={p.kNow}>Now in SGT</span>
          <span className={p.kDay}>09:00 – 18:00 SGT</span>
          <span className={p.kYou}>
            {!snap ? 'You' : behind === 0 ? 'You are in SGT' : `You, ${pad(Number(yh))}:${pad(Number(ym))} your time (${behind > 0 ? '+' : '−'}${Math.abs(behind)} h)`}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- composer ---------- */
const TOPICS = [
  { k: 'hi', label: 'Just saying hi', subject: 'Hi Yetong', open: 'Hi Yetong,' },
  { k: 'work', label: 'A role or project', subject: 'A role / project', open: 'Hi Yetong, I have a role or project you might be interested in.' },
  { k: 'blog', label: 'A blog post', subject: 'About your blog', open: 'Hi Yetong, I read one of your posts and wanted to say something about it.' },
  { k: 'code', label: 'A code question', subject: 'A question about your code', open: 'Hi Yetong, I have a question about something you built.' },
] as const;

const MAX = 600;

/** Builds an email in the visitor's own mail app. Nothing is sent from the page. */
export function Composer() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]['k']>('hi');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const t = TOPICS.find((x) => x.k === topic) ?? TOPICS[0];
  const empty = !msg.trim();
  const who = name.trim();
  const subject = t.subject + (who ? ` (from ${who})` : '');
  const body = t.open + (empty ? '' : `\n\n${msg.trim()}`) + (who ? `\n\nThanks,\n${who}` : '');

  const send = () => {
    if (empty) return;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast({ title: 'Opening your mail app' });
  };
  const copyDraft = () => {
    const text = `To: ${EMAIL}\nSubject: ${subject}\n\n${body}`;
    if (!navigator.clipboard) return toast({ title: 'Could not copy' });
    navigator.clipboard.writeText(text).then(() => toast({ title: 'Draft copied' }), () => toast({ title: 'Could not copy' }));
  };

  return (
    <Reveal className={p.compose}>
      <div>
        <h2>Or write it here</h2>
        <p className={p.intro}>This builds an email in your own mail app. Nothing is sent from this page, and nothing leaves your browser until you press send there.</p>
        <form className={p.form} autoComplete="off" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <div className={p.cfld}>
            <span className={p.lab}>What is it about?</span>
            <div className={p.topics} role="group" aria-label="Topic">
              {TOPICS.map((x) => (
                <button key={x.k} type="button" className={p.topic} aria-pressed={topic === x.k} onClick={() => setTopic(x.k)}>
                  {x.label}
                </button>
              ))}
            </div>
          </div>
          <div className={p.cfld}>
            <label htmlFor="c-name">Your name</label>
            <input id="c-name" type="text" placeholder="Jamie Lim" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={p.cfld}>
            <label htmlFor="c-msg">Message <span className={p.chars}>{msg.length} / {MAX}</span></label>
            <textarea id="c-msg" maxLength={MAX} placeholder="Write a line or two." value={msg} onChange={(e) => setMsg(e.target.value)} />
          </div>
          <div className={p.actions}>
            <button type="submit" className={`${s.b} ${s.primary}`} disabled={empty}>
              Open in mail app
              <ArrowRight className={s.arrR} aria-hidden="true" />
            </button>
            <button type="button" className={s.b} onClick={copyDraft}>Copy draft</button>
            <span className={p.note}>{empty ? 'Write a line first.' : ''}</span>
          </div>
        </form>
      </div>
      <aside className={p.draft} aria-label="Live draft preview">
        <div className={p.dh}>
          <div><span>To</span><span>{SITE_CONFIG.site.name} &lt;{EMAIL}&gt;</span></div>
          <div><span>Subject</span><span>{subject}</span></div>
        </div>
        <div className={p.db}>
          {body}
          {empty && <><br /><br /><span className={p.ph}>(your message goes here)</span></>}
          <span className={p.caret} />
        </div>
        <div className={p.df}><span>Draft</span><span>{body.length} chars</span></div>
      </aside>
    </Reveal>
  );
}
