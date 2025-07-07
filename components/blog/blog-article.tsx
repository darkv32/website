"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BlogPost, getRelatedBlogPosts, formatDate, formatReadTime } from '@/lib/data';
import { BlogTableOfContents } from './blog-table-of-contents';
import Link from 'next/link';
import ReactMarkdown, { type ExtraProps } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BlogArticleProps {
  post: BlogPost;
}

export function BlogArticle({ post }: BlogArticleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const relatedPosts = getRelatedBlogPosts(post);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const article = document.querySelector('.article-content');
      if (article) {
        const rect = article.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const articleHeight = article.scrollHeight;
        const scrolled = Math.max(0, windowHeight - rect.top);
        const progress = Math.min(100, (scrolled / articleHeight) * 100);
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      <section className="relative pt-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container-width section-padding relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
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
              <div className="flex items-center justify-center space-x-4 mb-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-muted-foreground text-sm">{post.author.bio}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-12">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video overflow-hidden rounded-xl shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}
      <section className="py-4">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BlogTableOfContents content={post.content} />
              </div>
            </div>
            <div className="lg:col-span-3">
              <article className="article-content prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    code: (props: JSX.IntrinsicElements['code'] & ExtraProps) => {
                      const { className, children } = props;
                      const match = /language-(\w+)/.exec(className || '');
                      if (match) {
                        return (
                          <SyntaxHighlighter
                            style={tomorrow as any}
                            language={match[1]}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        );
                      }
                      return (
                        <code className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </article>
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Card className="mt-12">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{post.author.name}</h3>
                      <p className="text-muted-foreground mb-4">{post.author.bio}</p>
                      <div className="flex space-x-4">
                        {post.author.social.twitter && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={post.author.social.twitter} target="_blank" rel="noopener noreferrer">
                              <Twitter className="h-4 w-4 mr-2" />
                              Twitter
                            </a>
                          </Button>
                        )}
                        {post.author.social.linkedin && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={post.author.social.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4 mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                        {post.author.social.github && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={post.author.social.github} target="_blank" rel="noopener noreferrer">
                              <LinkIcon className="h-4 w-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        )}
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
          <div className="container-width section-padding">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{relatedPost.category}</Badge>
                        <span className="text-xs text-muted-foreground">{formatReadTime(relatedPost.readTime)}</span>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}