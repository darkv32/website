'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Dices } from 'lucide-react';
import s from './field.module.css';
import p from './pages.module.css';

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
  /** The page's own h1 when this is the whole page; an h2 when it sits inside the front page. Also adds search, sort and an archive view. */
  asPage?: boolean;
}

/** Wraps the first match of `q` in a highlight. */
function highlight(text: string, q: string): ReactNode {
  const needle = q.trim().toLowerCase();
  const at = needle ? text.toLowerCase().indexOf(needle) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className={p.mk}>{text.slice(at, at + needle.length)}</mark>
      {text.slice(at + needle.length)}
    </>
  );
}

const stamp = (iso: string) => Date.parse(iso);
const pickOne = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];
/** Dots closer than this share of the axis go on the next row up. */
const DOT_GAP = 1.5;

/** Where each post sits on the time axis (0-100) and which row it stacks on, plus the year ticks. Pure, so server and client agree. */
function layoutTimeline(posts: BlogBandPost[]) {
  const years = posts.map((post) => +post.publishedAt.slice(0, 4));
  const firstYear = Math.min(...years);
  const lastYear = Math.max(...years);
  const start = stamp(`${firstYear}-01-01`);
  const span = stamp(`${lastYear + 1}-01-01`) - start;
  const dots: Array<{ slug: string; x: number; row: number }> = [];
  [...posts].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt)).forEach((post) => {
    const x = ((stamp(post.publishedAt) - start) / span) * 100;
    let row = 0;
    while (dots.some((d) => d.row === row && Math.abs(d.x - x) < DOT_GAP)) row++;
    dots.push({ slug: post.slug, x, row });
  });
  const ticks = Array.from({ length: lastYear - firstYear + 2 }, (_, i) => ({ year: firstYear + i, x: ((stamp(`${firstYear + i}-01-01`) - start) / span) * 100 }));
  return { dots, rows: Math.max(...dots.map((d) => d.row)) + 1, ticks };
}

/** Filterable grid of post cards. The count and the "view all" button speak about every post and follow the filter. */
export function BlogBand({ posts, limit, asPage = false }: BlogBandProps) {
  const [filter, setFilter] = useState('all');
  const [animate, setAnimate] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'new' | 'short'>('new');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [flash, setFlash] = useState('');
  const [tlHover, setTlHover] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  /* "/" jumps to the search box, Escape leaves it */
  useEffect(() => {
    if (!asPage) return;
    const onKey = (e: KeyboardEvent) => {
      const el = searchRef.current;
      if (!el || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === '/' && document.activeElement !== el) {
        const t = e.target as HTMLElement | null;
        if (t && (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable)) return;
        e.preventDefault();
        el.focus();
      } else if (e.key === 'Escape' && document.activeElement === el) {
        el.blur();
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [asPage]);

  const categories = Object.entries(
    posts.reduce<Record<string, number>>((acc, post) => ({ ...acc, [post.category]: (acc[post.category] ?? 0) + 1 }), {}),
  ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const q = asPage ? query.trim().toLowerCase() : '';
  const matching = posts
    .filter((post) => filter === 'all' || post.category === filter)
    .filter((post) => !q || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(q));
  const ordered = sort === 'short' ? [...matching].sort((a, b) => a.readTime - b.readTime || b.publishedAt.localeCompare(a.publishedAt)) : matching;
  const visible = limit ? ordered.slice(0, limit) : ordered;
  const noun = (filter === 'all' ? '' : filter + ' ') + (matching.length === 1 ? 'post' : 'posts');
  const Heading = asPage ? 'h1' : 'h2';
  const asList = asPage && view === 'list';
  const minutes = visible.reduce((sum, post) => sum + post.readTime, 0);

  const clearAll = () => { setFilter('all'); setQuery(''); setAnimate(true); };

  /* scroll to a card and flash it; if filters are hiding it, clear them first */
  const jumpTo = (slug: string) => {
    const go = () => {
      document.getElementById(`post-${slug}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      setFlash('');
      requestAnimationFrame(() => setFlash(slug));
    };
    if (visible.some((post) => post.slug === slug)) go();
    else { clearAll(); setTimeout(go, 80); }
  };

  /* surprise me: a random visible card */
  const surprise = () => {
    if (!visible.length) return clearAll();
    jumpTo(pickOne(visible).slug);
  };

  const timeline = asPage && posts.length ? layoutTimeline(posts) : null;
  const tlPost = posts.find((post) => post.slug === tlHover);

  return (
    <section id="blogs" className={`${s.band} ${s.bandBlog} ${s.sec} ${s.blogBand}`}>
      <div className={s.in}>
        <div className={s.blHead}>
          <div className={`${s.secHead} ${s.big}`}>
            <Heading className={s.h2}>Blog</Heading>
            <p>Writing on Bitcoin wallets, Android and what an internship is actually like.</p>
          </div>
          {timeline && (
            <div className={p.tl}>
              <div className={p.tlHead}>
                <span>Every post, by date</span>
                <span className={p.tlRead} aria-live="polite">
                  {tlPost ? <><b>{tlPost.title}</b> · {tlPost.publishedAt} · {tlPost.category}</> : 'Hover a square, click to jump to the post'}
                </span>
              </div>
              <div className={p.tlTrack} style={{ '--rows': timeline.rows } as CSSProperties}>
                {timeline.dots.map((d) => {
                  const post = posts.find((x) => x.slug === d.slug);
                  if (!post) return null;
                  return (
                    <button
                      key={d.slug}
                      type="button"
                      className={`${p.tlDot} ${visible.some((v) => v.slug === d.slug) ? '' : p.off}`}
                      style={{ '--x': `${d.x.toFixed(2)}%`, '--row': d.row } as CSSProperties}
                      aria-label={`${post.title}, ${post.publishedAt}`}
                      onMouseEnter={() => setTlHover(d.slug)}
                      onMouseLeave={() => setTlHover('')}
                      onFocus={() => setTlHover(d.slug)}
                      onBlur={() => setTlHover('')}
                      onClick={() => jumpTo(d.slug)}
                    />
                  );
                })}
              </div>
              <div className={p.tlAxis} aria-hidden="true">
                {timeline.ticks.map((t) => <span key={t.year} style={{ left: `${t.x.toFixed(2)}%` }}>{t.year}</span>)}
              </div>
            </div>
          )}
          {!asPage && (
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
          )}
        </div>

        {asPage && (
          <>
            <div className={p.bar}>
              <div className={p.bfld}>
                <label htmlFor="blog-search">Search</label>
                <div className={p.srch}>
                  <input
                    id="blog-search"
                    ref={searchRef}
                    type="search"
                    value={query}
                    placeholder="rbf, electrum, internship…"
                    autoComplete="off"
                    spellCheck={false}
                    onChange={(e) => { setQuery(e.target.value); setAnimate(false); }}
                  />
                  <kbd>/</kbd>
                </div>
              </div>
              <div className={p.ctrls}>
                <div className={p.bfld}>
                  <span className={p.lab}>Sort</span>
                  <span className={p.seg2} role="group" aria-label="Sort posts">
                    <button type="button" aria-pressed={sort === 'new'} onClick={() => { setSort('new'); setAnimate(true); }}>Newest</button>
                    <button type="button" aria-pressed={sort === 'short'} onClick={() => { setSort('short'); setAnimate(true); }}>Shortest</button>
                  </span>
                </div>
                <div className={p.bfld}>
                  <span className={p.lab}>View</span>
                  <span className={p.seg2} role="group" aria-label="Layout">
                    <button type="button" aria-pressed={view === 'grid'} onClick={() => { setView('grid'); setAnimate(true); }}>Cards</button>
                    <button type="button" aria-pressed={view === 'list'} onClick={() => { setView('list'); setAnimate(true); }}>Archive</button>
                  </span>
                </div>
                <button type="button" className={p.dice} onClick={surprise} title="Jump to a random post">
                  <Dices aria-hidden="true" />
                  Surprise me
                </button>
              </div>
            </div>
            <div className={`${s.chips} ${s.chipsWide}`} role="group" aria-label="Filter posts">
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
          </>
        )}

        {asPage && matching.length === 0 ? (
          <div className={p.bEmpty}>
            <b>Nothing here.</b>
            <p>{query.trim() ? `No post matches "${query.trim()}" in this category.` : 'No posts in this category.'}</p>
            <button type="button" className={s.b} onClick={clearAll}>Clear filters</button>
          </div>
        ) : (
          <div className={`${s.posts} ${asList ? s.listView : ''}`}>
            {visible.map((post, i) => {
              const year = post.publishedAt.slice(0, 4);
              const header = asList && sort === 'new' && (i === 0 || visible[i - 1].publishedAt.slice(0, 4) !== year);
              const inYear = header ? visible.filter((v) => v.publishedAt.startsWith(year)).length : 0;
              return (
                <Fragment key={`${filter}-${post.slug}`}>
                  {header && (
                    <div className={p.yr}>
                      {year}
                      <small>{inYear} {inYear === 1 ? 'post' : 'posts'}</small>
                    </div>
                  )}
                  <Link
                    id={asPage ? `post-${post.slug}` : undefined}
                    href={`/blog/${post.slug}`}
                    className={[s.post, animate && s.pop, flash === post.slug && s.flash].filter(Boolean).join(' ')}
                    style={animate && asPage ? { animationDelay: `${Math.min(i, 8) * 30}ms` } : undefined}
                  >
                    <span className={s.top}>
                      <span className={s.c}>{post.category}</span>
                      <span className={s.m}>{post.readTime} min</span>
                    </span>
                    <span className={s.t}>{asPage ? highlight(post.title, query) : post.title}</span>
                    <span className={s.x}>{asPage ? highlight(post.excerpt, query) : post.excerpt}</span>
                    <span className={s.bot}>
                      <span className={s.d}>{post.publishedAt}</span>
                      <span className={s.arr} aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                </Fragment>
              );
            })}
          </div>
        )}

        <div className={s.more}>
          {visible.length >= matching.length ? (
            <p className={s.count}>
              Showing all <b>{matching.length}</b> {noun}
              {asPage && matching.length > 0 && <> · {minutes} min of reading in total</>}
            </p>
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
