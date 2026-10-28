'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SITE_CONFIG } from '@/lib/config';
import s from '@/components/field/field.module.css';

/* About is the home page; the other tabs are separate pages. Each tab also answers to a single key. */
const TABS = [
  { name: 'About', href: '/', key: 'a', match: ['/', '/about'] },
  { name: 'Experience', href: '/experience', key: 'e', match: ['/experience'] },
  { name: 'Blog', href: '/blog', key: 'b', match: ['/blog'] },
  { name: 'Hobbies', href: '/hobbies', key: 'h', match: ['/hobbies'] },
  { name: 'Contact', href: '/contact', key: 'c', match: ['/contact'] },
];

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

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable)) return;
      const k = e.key.toLowerCase();
      const tab = TABS.find((x) => x.key === k);
      if (!tab) return;
      router.push(tab.href);
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

  const isOn = (match: string[]) => match.some((m) => (m === '/' ? pathname === '/' : pathname === m || pathname.startsWith(m + '/')));

  return (
    <header className={s.hud}>
      <div className={s.in}>
        <Link className={s.logo} href="/">TYT</Link>
        <nav aria-label="Sections">
          {TABS.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={[isOn(tab.match) ? s.on : '', flashKey === tab.key ? s.flash : ''].filter(Boolean).join(' ')}
              aria-current={isOn(tab.match) ? 'page' : undefined}
            >
              <kbd>{tab.key.toUpperCase()}</kbd>
              {tab.name}
            </Link>
          ))}
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
