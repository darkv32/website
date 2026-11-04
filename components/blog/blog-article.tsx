import { Children, createElement, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Github, Linkedin, Twitter } from 'lucide-react';
import ReactMarkdown, { type Components, type ExtraProps } from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin';
import tomorrow from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/config';
import { BlogPost, getRelatedBlogPosts, formatDate, formatReadTime } from '@/lib/data';
import { extractHeadings, slugify } from '@/lib/headings';
import { BlogTableOfContents } from './blog-table-of-contents';
import { BlogPostCard } from './blog-post-card';
import { ReadingProgress } from './reading-progress';
import { INTERACTIVE_BODIES } from './interactive-bodies';
import styles from './blog-article.module.css';

/* Only the languages the posts use are registered. */
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);

const ARTICLE_ID = 'article';
/** One width and gutter for every section of the page, so the hero, body and related posts line up and the gutters shrink on small screens. */
const WRAP = 'mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10';

const { site, social } = SITE_CONFIG;
const socialLinks = [
  { href: social.twitter, label: 'Twitter', Icon: Twitter },
  { href: social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: social.github, label: 'GitHub', Icon: Github },
];

const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      return isValidElement<{ children?: ReactNode }>(child) ? textOf(child.props.children) : '';
    })
    .join('');

/* Every heading gets the id the table of contents links to. */
const headingComponents = Object.fromEntries(
  (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((tag) => [
    tag,
    ({ children }: ComponentPropsWithoutRef<typeof tag> & ExtraProps) =>
      createElement(tag, { id: slugify(textOf(children)) }, children),
  ]),
) as Components;

const markdownComponents: Components = {
  ...headingComponents,
  code: ({ className, children }: ComponentPropsWithoutRef<'code'> & ExtraProps) => {
    const match = /language-(\w+)/.exec(className ?? '');
    if (!match) return <code className={className}>{children}</code>;
    return (
      <SyntaxHighlighter style={tomorrow as { [key: string]: React.CSSProperties }} language={match[1]} PreTag="div">
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
};

function Author({ size }: { size: number }) {
  return (
    <Image
      src={site.avatar}
      alt={site.author}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover object-top"
      style={{ width: size, height: size }}
    />
  );
}

/** A blog post, rendered on the server: the markdown and its syntax highlighting never reach the browser. */
export function BlogArticle({ post }: { post: BlogPost }) {
  const relatedPosts = getRelatedBlogPosts(post);
  const interactive = INTERACTIVE_BODIES[post.slug];

  return (
    <div className={`min-h-screen ${styles.page}`}>
      <div className={styles.bg} aria-hidden="true" />
      <ReadingProgress targetId={ARTICLE_ID} />
      {/* The nav is sticky, not fixed, so the page needs no top offset of its own. */}
      <header className={`${WRAP} pt-8 pb-10 sm:pt-12 sm:pb-14`}>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Back to Blog
        </Link>
        <div className="mt-8 max-w-3xl sm:mt-10">
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <Badge variant="default">{post.category}</Badge>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {formatReadTime(post.readTime)}
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {post.excerpt}
          </p>
          <div className="mt-8 flex items-center gap-4 border-t pt-6">
            <Author size={48} />
            <div className="min-w-0">
              <div className="font-semibold">{site.author}</div>
              <div className="text-sm text-muted-foreground">{site.bio}</div>
            </div>
          </div>
        </div>
      </header>
      <section className="pb-16 sm:pb-24">
        <div className={`${WRAP} grid grid-cols-1 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14`}>
          <aside>
            <div className="sticky top-24">
              <BlogTableOfContents headings={interactive?.headings ?? extractHeadings(post.content)} />
            </div>
          </aside>
          <div className="min-w-0">
            <article id={ARTICLE_ID} className="article-content">
              {interactive ? <interactive.Body /> : <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>}
            </article>
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-lg font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            <Card className="mt-12 border-2 border-primary/30 shadow-md">
              <CardContent className="p-5 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <Author size={80} />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{site.author}</h2>
                    <p className="text-muted-foreground mb-4">{site.bio}</p>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map(({ href, label, Icon }) => (
                        <Button key={label} variant="outline" size="sm" asChild>
                          <a href={href} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-4 w-4 mr-2" />
                            {label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {relatedPosts.length > 0 && (
        <section className="border-t bg-secondary/40 py-14 backdrop-blur-sm sm:py-20">
          <div className={WRAP}>
            <h2 className="mb-8 text-2xl font-bold sm:mb-12 sm:text-3xl">Related Articles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
