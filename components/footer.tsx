'use client';

import { SECTIONS, SectionLink } from '@/components/field/section-link';
import s from '@/components/field/field.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.foot}>
      <div className={s.in}>
        <span>&copy; {currentYear} Tang Yetong &middot; Singapore</span>
        <nav aria-label="Footer">
          {SECTIONS.map((sec) => (
            <SectionLink key={sec.id} id={sec.id}>{sec.name}</SectionLink>
          ))}
        </nav>
        <SectionLink id="hero" className={s.top}>
          Back to top <span aria-hidden="true">&uarr;</span>
        </SectionLink>
      </div>
    </footer>
  );
}
