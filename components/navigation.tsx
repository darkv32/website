'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SITE_CONFIG } from '@/lib/config';
import { SECTIONS, SectionLink } from '@/components/field/section-link';
import s from '@/components/field/field.module.css';

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: SITE_CONFIG.site.timezone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

function subscribeClock(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const clockNow = () => clockFormat.format(new Date());
const clockServer = () => '--:--:--';

/** Its own component, so the once-a-second tick re-renders only the clock and not the whole bar. */
function Clock() {
  const clock = useSyncExternalStore(subscribeClock, clockNow, clockServer);
  return <span className={s.clock}>SGT <b suppressHydrationWarning>{clock}</b></span>;
}

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [flashKey, setFlashKey] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const inkRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  /* One underline slides to the active tab. Until it has been placed, the tab draws its own so nothing flashes on load. */
  useEffect(() => {
    const nav = navRef.current;
    const ink = inkRef.current;
    if (!nav || !ink) return;
    const place = () => {
      const on = nav.querySelector<HTMLElement>('a[aria-current="true"]');
      ink.style.setProperty('--w', `${on?.offsetWidth ?? 0}px`);
      ink.style.setProperty('--x', `${on?.offsetLeft ?? 0}px`);
      ink.style.opacity = on ? '1' : '0';
      nav.dataset.ink = 'on';
    };
    place();
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => { ink.dataset.ready = 'true'; }));
    document.fonts?.ready.then(place);
    addEventListener('resize', place);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', place);
    };
  }, [pathname]);

  /* Reading progress along the bar's lower edge. */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--p', String(max > 4 ? Math.min(1, scrollY / max) : 0));
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, [pathname]);

  /* Each tab also answers to a single key. */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable)) return;
      const k = e.key.toLowerCase();
      const sec = SECTIONS.find((x) => x.key === k);
      if (!sec) return;
      router.push(sec.href);
      setFlashKey(k);
      clearTimeout(timer);
      timer = setTimeout(() => setFlashKey(''), 260);
    };
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      clearTimeout(timer);
    };
  }, [router]);

  const isOn = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={s.hud}>
      <div className={s.in}>
        <SectionLink id="hero" href="/" className={s.logo}>TYT</SectionLink>
        <nav ref={navRef} aria-label="Sections">
          {SECTIONS.map((sec, i) => {
            const on = isOn(sec.href);
            return (
              <Link
                key={sec.id}
                href={sec.href}
                style={{ '--i': i } as CSSProperties}
                className={[on ? s.on : '', flashKey === sec.key ? s.flash : ''].filter(Boolean).join(' ')}
                aria-current={on ? 'true' : undefined}
              >
                <kbd>{sec.key.toUpperCase()}</kbd>
                {sec.name}
              </Link>
            );
          })}
          <span ref={inkRef} className={s.ink} aria-hidden="true" />
        </nav>
        <div className={s.status}>
          <Clock />
          <button type="button" aria-label="Toggle light or dark theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
            Theme
          </button>
        </div>
      </div>
      <div ref={barRef} className={s.progress} aria-hidden="true" />
    </header>
  );
}
