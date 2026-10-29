'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SITE_CONFIG } from '@/lib/config';
import { SECTIONS, SectionLink, scrollToSection } from '@/components/field/section-link';
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
  const [spy, setSpy] = useState(0);
  const onHome = pathname === '/';

  /* On the front page the tab for the band you are reading is highlighted. */
  useEffect(() => {
    if (!onHome) return;
    let queued = false;
    const update = () => {
      queued = false;
      const y = scrollY + innerHeight * 0.4;
      let idx = 0;
      SECTIONS.forEach((sec, k) => {
        const el = document.getElementById(sec.id);
        if (el && y >= el.getBoundingClientRect().top + scrollY) idx = k;
      });
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) idx = SECTIONS.length - 1;
      setSpy(idx);
    };
    const queue = () => {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    queue();
    return () => {
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
    };
  }, [onHome]);

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
      if (location.pathname === '/') scrollToSection(sec.id);
      else router.push(`/#${sec.id}`);
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

  const isOn = (id: string, k: number) => (onHome ? spy === k : id === 'blogs' && pathname.startsWith('/blog'));

  return (
    <header className={s.hud}>
      <div className={s.in}>
        <SectionLink id="hero" className={s.logo}>TYT</SectionLink>
        <nav aria-label="Sections">
          {SECTIONS.map((sec, k) => {
            const on = isOn(sec.id, k);
            return (
              <SectionLink
                key={sec.id}
                id={sec.id}
                className={[on ? s.on : '', flashKey === sec.key ? s.flash : ''].filter(Boolean).join(' ')}
                aria-current={on ? 'true' : undefined}
              >
                <kbd>{sec.key.toUpperCase()}</kbd>
                {sec.name}
              </SectionLink>
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
