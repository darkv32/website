'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import s from './field.module.css';

export interface BlogBandPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTime: number;
}

/** Filterable post list. Hovering a post shows its excerpt in a card that follows the cursor. */
export function BlogBand({ posts }: { posts: BlogBandPost[] }) {
  const [filter, setFilter] = useState('all');
  const [animate, setAnimate] = useState(false);
  const [peek, setPeek] = useState<BlogBandPost | null>(null);
  const [peekOn, setPeekOn] = useState(false);
  const peekRef = useRef<HTMLDivElement>(null);

  const categories = Object.entries(
    posts.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }), {}),
  ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const visible = filter === 'all' ? posts : posts.filter((p) => p.category === filter);
  const noun = (filter === 'all' ? '' : filter + ' ') + (visible.length === 1 ? 'post' : 'posts');

  const movePeek = (e: React.MouseEvent) => {
    const el = peekRef.current;
    if (!el) return;
    const x = Math.min(e.clientX + 20, innerWidth - 300);
    let y = e.clientY + 20;
    if (y > innerHeight - 140) y = e.clientY - 120;
    el.style.transform = `translate3d(${x}px,${y}px,0)`;
  };

  const canPeek = () => !matchMedia('(hover: none)').matches;

  return (
    <section className={`${s.band} ${s.bandBlog} ${s.sec}`}>
      <div className={s.in}>
        <div className={`${s.secHead} ${s.big}`}>
          <h1 className={s.h2}>Blogs</h1>
          <p>Writing on Bitcoin wallets, Android and what an internship is actually like.</p>
        </div>
        <div className={s.chips} role="group" aria-label="Filter posts">
          {[['all', posts.length] as const, ...categories].map(([cat, n]) => (
            <button
              key={cat}
              type="button"
              className={s.chip}
              aria-pressed={filter === cat}
              onClick={() => { setFilter(cat); setAnimate(true); setPeekOn(false); }}
            >
              {cat}
              <span>{n}</span>
            </button>
          ))}
        </div>
        <div className={s.posts}>
          {visible.map((p) => (
            <Link
              key={`${filter}-${p.slug}`}
              href={`/blog/${p.slug}`}
              className={`${s.post} ${animate ? s.pop : ''}`}
              onMouseEnter={(e) => { if (canPeek()) { setPeek(p); setPeekOn(true); movePeek(e); } }}
              onMouseMove={(e) => { if (canPeek()) movePeek(e); }}
              onMouseLeave={() => setPeekOn(false)}
            >
              <span className={s.d}>{p.publishedAt}</span>
              <span className={s.t}>{p.title}</span>
              <span className={s.c}>{p.category}</span>
              <span className={s.m}>{p.readTime} min</span>
              <span className={s.arr}><ArrowRight aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
        <div ref={peekRef} className={`${s.peek} ${peekOn ? s.on : ''}`} aria-hidden="true">
          {peek && (
            <>
              <span className={s.pkMeta}>{peek.category} &middot; {peek.readTime} min</span>
              <p>{peek.excerpt}</p>
            </>
          )}
        </div>
        <div className={s.more}>
          <p className={s.count}>Showing all <b>{visible.length}</b> {noun}</p>
        </div>
      </div>
    </section>
  );
}
