'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/dom';
import p from './pages.module.css';

/** Counts up from zero the first time it shows, and glides to the new value whenever it changes. */
export function Counter({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    const start = from.current;
    const t0 = performance.now();
    const ms = prefersReducedMotion() ? 0 : 700;
    let raf = 0;
    const tick = (now: number) => {
      const k = ms ? Math.min(1, (now - t0) / ms) : 1;
      from.current = Math.round(start + (value - start) * (1 - (1 - k) ** 3));
      setShown(from.current);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{shown}</>;
}

const GREETINGS = ['hi.', 'hello.', '你好.', 'beep boop.', 'halo.', 'こんにちは.', 'greetings, human.'];

/** A small robot by the title. Its eyes follow the cursor; click it and it waves and offers a greeting you can send. */
export function GuestBot({ onUse }: { onUse: (text: string) => void }) {
  const botRef = useRef<HTMLButtonElement>(null);
  const [greet, setGreet] = useState(-1);
  const [wave, setWave] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const bot = botRef.current;
    if (!bot || matchMedia('(hover: none)').matches || prefersReducedMotion()) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = bot.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 240) * 1.7;
        bot.style.setProperty('--ex', `${((dx / d) * k).toFixed(2)}px`);
        bot.style.setProperty('--ey', `${((dy / d) * k).toFixed(2)}px`);
      });
    };
    addEventListener('pointermove', onMove);
    return () => {
      removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const poke = () => {
    setWave((n) => n + 1);
    setGreet((g) => (g + 1) % GREETINGS.length);
    setOpen(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 7000);
  };

  return (
    <div className={p.gbBotWrap}>
      {open && greet >= 0 && (
        <div className={p.gbBubble} role="status">
          <span>{GREETINGS[greet]}</span>
          <button type="button" onClick={() => { onUse(GREETINGS[greet]); setOpen(false); }}>Use it ↓</button>
        </div>
      )}
      <button ref={botRef} type="button" className={p.gbBot} aria-label="A small robot. Click it for a greeting." onClick={poke}>
        <svg className={wave ? (wave % 2 ? p.botA : p.botB) : undefined} viewBox="0 0 40 46" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
          <rect className={p.gbAnt} x="19" y="3" width="2" height="6" />
          <rect className={p.gbDot} x="17.5" y="0" width="5" height="4" />
          <rect className={p.gbBotHead} x="6" y="9" width="28" height="20" />
          <g className={p.gbEye}>
            <rect className={p.gbSock} x="10" y="15" width="8" height="8" />
            <rect className={p.gbPupil} x="12.5" y="17.5" width="3" height="3" />
          </g>
          <g className={p.gbEye}>
            <rect className={p.gbSock} x="22" y="15" width="8" height="8" />
            <rect className={p.gbPupil} x="24.5" y="17.5" width="3" height="3" />
          </g>
          <rect className={p.gbMouth} x="15" y="25" width="10" height="2" />
          <rect className={p.gbBotHead} x="10" y="31" width="20" height="12" />
          <rect className={p.gbArm} x="31" y="33" width="7" height="3" />
          <rect className={p.gbArmL} x="2" y="33" width="7" height="3" />
        </svg>
      </button>
    </div>
  );
}
