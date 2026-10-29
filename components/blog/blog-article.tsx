import { Children, createElement, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Github, Linkedin, Twitter } from 'lucide-react';
import ReactMarkdown, { type Components, type ExtraProps } from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/config';
import { BlogPost, getRelatedBlogPosts, formatDate, formatReadTime } from '@/lib/data';
import { extractHeadings, slugify } from '@/lib/headings';
import { BlogTableOfContents } from './blog-table-of-contents';
import { BlogPostCard } from './blog-post-card';
import { ReadingProgress } from './reading-progress';

/* Only the languages the posts use are registered. */
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);

const ARTICLE_ID = 'article';

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

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress targetId={ARTICLE_ID} />
      <section className="relative pt-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="container-width px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatReadTime(post.readTime)}</span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Author size={48} />
              <div className="text-left">
                <div className="font-semibold">{site.author}</div>
                <div className="text-muted-foreground text-sm">{site.bio}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BlogTableOfContents headings={extractHeadings(post.content)} />
              </div>
            </div>
            <div className="lg:col-span-3">
              <article id={ARTICLE_ID} className="article-content">
                <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
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
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Author size={80} />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">{site.author}</h2>
                      <p className="text-muted-foreground mb-4">{site.bio}</p>
                      <div className="flex flex-wrap gap-4">
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
        </div>
      </section>
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-secondary/20">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
