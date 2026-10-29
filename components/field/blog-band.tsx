'use client';

import { useState } from 'react';
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

interface BlogBandProps {
  posts: BlogBandPost[];
  /** Show only the latest N posts and link to the full list. Omit to show everything. */
  limit?: number;
  /** The page's own h1 when this is the whole page; an h2 when it sits inside the front page. */
  asPage?: boolean;
}

/** Filterable grid of post cards. The count and the "view all" button speak about every post and follow the filter. */
export function BlogBand({ posts, limit, asPage = false }: BlogBandProps) {
  const [filter, setFilter] = useState('all');
  const [animate, setAnimate] = useState(false);

  const categories = Object.entries(
    posts.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }), {}),
  ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const matching = filter === 'all' ? posts : posts.filter((p) => p.category === filter);
  const visible = limit ? matching.slice(0, limit) : matching;
  const noun = (filter === 'all' ? '' : filter + ' ') + (matching.length === 1 ? 'post' : 'posts');
  const Heading = asPage ? 'h1' : 'h2';

  return (
    <section id="blogs" className={`${s.band} ${s.bandBlog} ${s.sec} ${s.blogBand}`}>
      <div className={s.in}>
        <div className={s.blHead}>
          <div className={`${s.secHead} ${s.big}`}>
            <Heading className={s.h2}>Blog</Heading>
            <p>Writing on Bitcoin wallets, Android and what an internship is actually like.</p>
          </div>
          <div className={s.chips} role="group" aria-label="Filter posts">
            {[['all', posts.length] as const, ...categories].map(([cat, n]) => (
              <button
                key={cat}
                type="button"
                className={s.chip}
                aria-pressed={filter === cat}
                onClick={() => { setFilter(cat); setAnimate(true); }}
              >
                {cat}
                <span>{n}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={s.posts}>
          {visible.map((p) => (
            <Link key={`${filter}-${p.slug}`} href={`/blog/${p.slug}`} className={`${s.post} ${animate ? s.pop : ''}`}>
              <span className={s.top}>
                <span className={s.c}>{p.category}</span>
                <span className={s.m}>{p.readTime} min</span>
              </span>
              <span className={s.t}>{p.title}</span>
              <span className={s.x}>{p.excerpt}</span>
              <span className={s.bot}>
                <span className={s.d}>{p.publishedAt}</span>
                <span className={s.arr} aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
        <div className={s.more}>
          {visible.length >= matching.length ? (
            <p className={s.count}>Showing all <b>{matching.length}</b> {noun}</p>
          ) : (
            <>
              <p className={s.count}>Showing <b>{visible.length}</b> of {matching.length} {noun}</p>
              <Link className={`${s.b} ${s.primary}`} href="/blog">
                View all {matching.length} {noun}
                <ArrowRight className={s.arrR} aria-hidden="true" />
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
