'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import s from './field.module.css';
import p from './pages.module.css';

const ANIME = [
  { name: 'Made in Abyss', src: '/field/a1.jpg' },
  { name: 'Quan Zhi Gao Shou', src: '/field/a2.jpg' },
  { name: 'Bleach', src: '/field/a3.jpg' },
  { name: 'Grand Blue Dreaming', src: '/field/a4.jpg' },
  { name: 'Call of the Night', src: '/field/a5.jpg' },
];
const DEFAULT_ORDER = ANIME.map((a) => a.name);
const BY_NAME = Object.fromEntries(ANIME.map((a) => [a.name, a]));

/* ---------- the shelf order lives in localStorage, read through a tiny external store so the server render stays the default order ---------- */
const STORE_KEY = 'animeOrder';
const listeners = new Set<() => void>();
let memory = '';

function subscribeOrder(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => { if (e.key === STORE_KEY) cb(); };
  addEventListener('storage', onStorage);
  return () => { listeners.delete(cb); removeEventListener('storage', onStorage); };
}
function readOrder() {
  try { return memory || localStorage.getItem(STORE_KEY) || ''; } catch { return memory; }
}
function writeOrder(order: string[]) {
  memory = JSON.stringify(order);
  try { localStorage.setItem(STORE_KEY, memory); } catch { /* private window: the order lasts until the page closes */ }
  listeners.forEach((f) => f());
}
function parseOrder(raw: string): string[] {
  try {
    const v: unknown = JSON.parse(raw);
    if (Array.isArray(v) && v.length === ANIME.length && v.every((n) => typeof n === 'string' && n in BY_NAME)) return v as string[];
  } catch { /* fall through */ }
  return DEFAULT_ORDER;
}

/* ---------- bubbles ---------- */
/* Seeded so server and client render the same first bubbles. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
interface Bubble { id: number; style: CSSProperties }
function makeBubble(id: number, rnd: () => number): Bubble {
  const size = 8 + rnd() * 30;
  return {
    id,
    style: {
      left: `${(rnd() * 100).toFixed(1)}%`,
      width: `${size.toFixed(0)}px`,
      height: `${size.toFixed(0)}px`,
      '--d': `${(16 + rnd() * 18).toFixed(1)}s`,
      '--dl': `-${(rnd() * 30).toFixed(1)}s`,
      '--sw': `${((rnd() - 0.5) * 70).toFixed(0)}px`,
      '--y': `${(rnd() * 90).toFixed(0)}%`,
    } as CSSProperties,
  };
}
const FIRST_BUBBLES = (() => {
  const rnd = mulberry32(2026);
  return Array.from({ length: 24 }, (_, i) => makeBubble(i, rnd));
})();

/** A shuffled copy of the list (Fisher-Yates). */
function shuffled<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface Burst { id: number; x: number; y: number; r: number; drops: Array<{ style: CSSProperties }> }

/* ---------- barracks ---------- */
const MAX_MARINES = 40;
const START = { minerals: 50, cap: 8, supply: 0 };
interface Log { lead: string; rest?: string; blocked?: boolean }

export function HobbiesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(FIRST_BUBBLES.length);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const [bubbles, setBubbles] = useState(FIRST_BUBBLES);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [popped, setPopped] = useState(0);
  const [jelly, setJelly] = useState(0);

  const raw = useSyncExternalStore(subscribeOrder, readOrder, () => '');
  const order = parseOrder(raw);
  const [dragName, setDragName] = useState('');
  const [caption, setCaption] = useState('');
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const focusName = useRef('');

  const [game, setGame] = useState(START);
  const [log, setLog] = useState<Log>({ lead: 'Barracks idle.', rest: ' Mine some minerals.' });

  const later = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => { timers.current.delete(id); fn(); }, ms);
    timers.current.add(id);
  }, []);

  /* Bubbles rise the full height of the band, and pause while it is off screen. */
  useEffect(() => {
    const sec = sectionRef.current;
    const bub = bubblesRef.current;
    if (!sec || !bub) return;
    const ro = new ResizeObserver(() => bub.style.setProperty('--rise', sec.offsetHeight + 80 + 'px'));
    ro.observe(sec);
    const io = new IntersectionObserver((en) => bub.classList.toggle(s.paused, !en[0].isIntersecting));
    io.observe(sec);
    const pending = timers.current;
    return () => {
      ro.disconnect();
      io.disconnect();
      pending.forEach(clearTimeout);
    };
  }, []);

  /* a trickle of income, so the barracks is playable without a lot of clicking */
  useEffect(() => {
    const id = setInterval(() => { if (!document.hidden) setGame((g) => ({ ...g, minerals: g.minerals + 2 })); }, 2000);
    return () => clearInterval(id);
  }, []);

  /* keep keyboard focus on a poster after it moves */
  useEffect(() => {
    if (focusName.current) {
      cardRefs.current[focusName.current]?.focus();
      focusName.current = '';
    }
  }, [raw]);

  const pop = (e: ReactPointerEvent<HTMLElement>, b: Bubble) => {
    e.stopPropagation();
    const host = bubblesRef.current;
    if (!host) return;
    const r = e.currentTarget.getBoundingClientRect();
    const h = host.getBoundingClientRect();
    const rad = r.width / 2;
    setBubbles((prev) => prev.filter((x) => x.id !== b.id));
    setPopped((n) => n + 1);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = nextId.current++;
      const n = 8 + Math.round(rad / 4);
      const drops = Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.6;
        const d = rad * 1.5 + 14 + Math.random() * 30;
        return {
          style: {
            '--s': `${(2 + Math.random() * 3).toFixed(1)}px`,
            '--dx': `${(Math.cos(a) * d).toFixed(0)}px`,
            '--dy': `${(Math.sin(a) * d + 8 + Math.random() * 14).toFixed(0)}px`,
            '--t': `${(0.45 + Math.random() * 0.25).toFixed(2)}s`,
          } as CSSProperties,
        };
      });
      setBursts((prev) => [...prev, { id, x: r.left + rad - h.left, y: r.top + rad - h.top, r: Math.max(8, rad), drops }]);
      later(() => setBursts((prev) => prev.filter((x) => x.id !== id)), 900);
    }
    /* a fresh bubble starts its climb from the bottom */
    later(() => setBubbles((prev) => [...prev, makeBubble(nextId.current++, Math.random)]), 600);
  };

  /* ---------- shelf ---------- */
  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length || from === to) return;
    const next = [...order];
    const [n] = next.splice(from, 1);
    next.splice(to, 0, n);
    focusName.current = n;
    writeOrder(next);
  };
  const shuffle = () => writeOrder(shuffled(order));
  const isDefault = order.join('|') === DEFAULT_ORDER.join('|');

  /* ---------- barracks ---------- */
  const blocked = game.supply >= game.cap;
  const train = () => {
    if (game.minerals < 50 || blocked || game.supply >= MAX_MARINES) return;
    const supply = game.supply + 1;
    setGame({ ...game, minerals: game.minerals - 50, supply });
    setLog(supply >= game.cap ? { lead: 'Supply blocked.', rest: ' Build a supply depot.', blocked: true } : { lead: 'Marine ready.', rest: ` ${supply} on the field.` });
  };
  const depot = () => {
    if (game.minerals < 100) return;
    setGame({ ...game, minerals: game.minerals - 100, cap: game.cap + 8 });
    setLog({ lead: 'Supply depot complete.', rest: ` Cap is now ${game.cap + 8}.` });
  };

  return (
    <section ref={sectionRef} id="off" className={`${s.band} ${s.bandDeep} ${s.sec} ${p.bandPage}`}>
      <div ref={bubblesRef} className={`${s.bubbles} ${p.popBubbles}`} aria-hidden="true">
        {bubbles.map((b) => <i key={b.id} style={b.style} onPointerDown={(e) => pop(e, b)} />)}
        {bursts.map((b) => (
          <div key={b.id} className={p.burst} style={{ left: b.x, top: b.y, '--r': `${b.r.toFixed(0)}px` } as CSSProperties}>
            <span className={p.ring} />
            <span className={`${p.ring} ${p.two}`} />
            {b.drops.map((d, i) => <span key={i} className={p.dr} style={d.style} />)}
          </div>
        ))}
      </div>
      <button type="button" className={p.jelly} aria-label="Jellyfish. Click to make it pulse." onClick={() => setJelly((n) => n + 1)}>
        <svg className={jelly ? (jelly % 2 ? p.jetA : p.jetB) : undefined} viewBox="0 0 90 130" aria-hidden="true" focusable="false">
          <path className={p.jTent} d="M26 62 C20 82 32 92 24 116" />
          <path className={p.jTent} d="M45 64 C41 84 51 96 45 124" />
          <path className={p.jTent} d="M64 62 C70 82 58 92 66 114" />
          <path className={p.jBell} d="M8 56 C8 22 28 6 45 6 C62 6 82 22 82 56 C82 63 70 66 45 66 C20 66 8 63 8 56Z" />
          <path className={p.jGlint} d="M22 50 C24 30 34 18 45 16" />
        </svg>
      </button>
      <div className={s.in}>
        <div className={`${s.secHead} ${s.big}`}>
          <h1 className={s.h2}>Off the clock</h1>
          <p>A few things I enjoy away from the keyboard. Everything below is meant to be poked.</p>
          <span className={p.popCount}>Pop a bubble. <b>{popped}</b> so far{popped >= 10 ? '. Easy there.' : '.'}</span>
        </div>

        <div className={p.hpart} id="anime">
          <div className={p.subHead}>
            <h2>Top five anime</h2>
            <p>Drag a poster, or focus one and use the arrow keys, to rearrange. It remembers your order in this browser.</p>
          </div>
          <div className={p.shelf}>
            {order.map((name, i) => {
              const a = BY_NAME[name];
              return (
                <div key={name} className={p.slot} onDragOver={(e) => {
                  if (!dragName || dragName === name) return;
                  e.preventDefault();
                  move(order.indexOf(dragName), i);
                }}>
                  <span className={p.num} aria-hidden="true">{i + 1}</span>
                  <div
                    ref={(el) => { cardRefs.current[name] = el; }}
                    className={`${p.poster} ${dragName === name ? p.dragging : ''}`}
                    tabIndex={0}
                    role="button"
                    draggable
                    aria-label={`${name}, number ${i + 1}. Arrow keys move it.`}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') { e.preventDefault(); move(i, i - 1); }
                      if (e.key === 'ArrowRight') { e.preventDefault(); move(i, i + 1); }
                    }}
                    onDragStart={(e) => { setDragName(name); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', name); }}
                    onDragEnd={() => setDragName('')}
                    onPointerMove={(e) => {
                      if (e.pointerType === 'touch' || dragName || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                      const el = e.currentTarget;
                      const r = el.getBoundingClientRect();
                      const x = (e.clientX - r.left) / r.width;
                      const y = (e.clientY - r.top) / r.height;
                      el.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(1) + 'deg');
                      el.style.setProperty('--rx', ((0.5 - y) * 14).toFixed(1) + 'deg');
                      el.style.setProperty('--gx', (120 - x * 140).toFixed(0) + '%');
                    }}
                    onPointerLeave={(e) => { ['--ry', '--rx', '--gx'].forEach((v) => e.currentTarget.style.removeProperty(v)); }}
                    onMouseEnter={() => setCaption(`#${i + 1} ${name}`)}
                    onMouseLeave={() => setCaption('')}
                    onFocus={() => setCaption(`#${i + 1} ${name}`)}
                    onBlur={() => setCaption('')}
                  >
                    <Image src={a.src} alt={`${name} poster`} width={320} height={456} draggable={false} />
                    <span className={p.mv}>
                      <button type="button" aria-label="Move earlier" disabled={i === 0} onClick={() => move(i, i - 1)}>←</button>
                      <button type="button" aria-label="Move later" disabled={i === order.length - 1} onClick={() => move(i, i + 1)}>→</button>
                    </span>
                  </div>
                  <span className={p.nm}>{name}</span>
                </div>
              );
            })}
          </div>
          <div className={p.shelfBar}>
            <span className={p.hint} aria-live="polite">{caption ? <b>{caption}</b> : 'Hover a poster.'}</span>
            <button type="button" className={p.mini} onClick={shuffle}>Shuffle</button>
            <button type="button" className={p.mini} disabled={isDefault} onClick={() => writeOrder(DEFAULT_ORDER)}>Back to my order</button>
          </div>
        </div>

        <div className={p.hpart} id="sc2">
          <div className={p.subHead}>
            <h2>StarCraft II</h2>
            <p>Main race: Terran. Here is a very small barracks.</p>
          </div>
          <div className={p.scGrid}>
            <div className={s.race}>
              <span className={s.ic} role="img" aria-label="Terran logo" />
              <div>
                <span className={s.label}>Main race</span>
                <h3>Terran</h3>
                <span className={s.sc2}>StarCraft II</span>
              </div>
            </div>
            <div className={p.rax}>
              <div className={p.hud2}>
                <div><span className={s.label}>Minerals</span><span className={p.v}>{game.minerals}</span></div>
                <div><span className={s.label}>Supply</span><span className={`${p.v} ${blocked ? p.blocked : ''}`}>{game.supply} / {game.cap}</span></div>
                <div><span className={s.label}>Marines</span><span className={p.v}>{game.supply}</span></div>
              </div>
              <div className={p.acts}>
                <button type="button" className={s.b} onClick={() => { setGame({ ...game, minerals: game.minerals + 10 }); setLog({ lead: '+10 minerals.', rest: ' The workers are doing the real work.' }); }}>
                  Mine <small>+10</small>
                </button>
                <button type="button" className={s.b} disabled={game.minerals < 50 || blocked || game.supply >= MAX_MARINES} onClick={train}>
                  Train marine <small>50 · 1 supply</small>
                </button>
                <button type="button" className={s.b} disabled={game.minerals < 100 || game.cap >= MAX_MARINES} onClick={depot}>
                  Supply depot <small>100 · +8 cap</small>
                </button>
                <button type="button" className={p.mini} onClick={() => { setGame(START); setLog({ lead: 'Barracks idle.', rest: ' Mine some minerals.' }); }}>Reset</button>
              </div>
              <div className={p.ground}>
                {game.supply === 0 && <span className={p.groundEmpty}>No marines yet.</span>}
                {Array.from({ length: game.supply }, (_, i) => (
                  <Image key={i} src="/field/marine.png" alt="A marine" width={56} height={58} />
                ))}
              </div>
              <div className={p.log} aria-live="polite">
                <b className={log.blocked ? p.blocked : undefined}>{log.lead}</b>{log.rest}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
