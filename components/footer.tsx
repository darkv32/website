'use client';

import Link from 'next/link';
import s from '@/components/field/field.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.foot}>
      <div className={s.in}>
        <span>&copy; {currentYear} Tang Yetong &middot; Singapore</span>
        <nav aria-label="Footer">
          <Link href="/">About</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/hobbies">Hobbies</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <button type="button" className={s.top} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <span aria-hidden="true">&uarr;</span>
        </button>
      </div>
    </footer>
  );
}
