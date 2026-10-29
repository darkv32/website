'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
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

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const clock = useSyncExternalStore(subscribeClock, clockNow, clockServer);
  const [flashKey, setFlashKey] = useState('');

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
        <nav aria-label="Sections">
          {SECTIONS.map((sec) => {
            const on = isOn(sec.href);
            return (
              <Link
                key={sec.id}
                href={sec.href}
                className={[on ? s.on : '', flashKey === sec.key ? s.flash : ''].filter(Boolean).join(' ')}
                aria-current={on ? 'true' : undefined}
              >
                <kbd>{sec.key.toUpperCase()}</kbd>
                {sec.name}
              </Link>
            );
          })}
        </nav>
        <div className={s.status}>
          <span className={s.clock}>SGT <b suppressHydrationWarning>{clock}</b></span>
          <button type="button" aria-label="Toggle light or dark theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
            Theme
          </button>
        </div>
      </div>
    </header>
  );
}
