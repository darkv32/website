'use client';

import { useEffect, useRef, useState } from 'react';

import { Calendar, Clock, ExternalLink, Tag, BookOpen, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BlogPostCard } from '@/components/blog/blog-post-card';
import { getFeaturedBlogPosts, getBlogCategories } from '@/lib/data';

export function FeaturedBlog() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Use real featured posts and categories
  const featuredPosts = getFeaturedBlogPosts();
  const categories = getBlogCategories().map(cat => ({ value: cat.slug, label: cat.name, count: cat.postCount }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" ref={sectionRef} className="relative py-20 bg-secondary/10">
      {/* Top gradient overlay to blend with skills section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
      

      
      {/* Interactive background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles that respond to card hover */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${
              hoveredCard ? 'opacity-35 scale-130' : 'opacity-20 scale-100'
            }`}
            style={{
              left: `${20 + i * 18}%`,
              top: `${25 + i * 15}%`,
              background: `radial-gradient(circle, rgba(168, 85, 247, ${hoveredCard ? 0.5 : 0.25}), transparent 65%)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.4}s`,
            }}
          />
        ))}
        
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-purple-500/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }} />
        
        {/* Additional creative orbs */}
        <div className="absolute top-1/6 left-1/6 w-40 h-40 bg-violet-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/6 right-1/6 w-48 h-48 bg-rose-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/6 w-32 h-32 bg-fuchsia-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '0.5s' }} />
      </div>

      {/* Creative grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3 animate-grid-flow" />

      {/* Creative lines and shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/15 to-transparent animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/12 to-transparent animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }} />
        
        {/* Creative geometric elements */}
        <div className="absolute top-1/5 right-1/5 w-10 h-10 border border-purple-500/15 rotate-45 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/5 left-1/5 w-16 h-16 border border-pink-500/15 rounded-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '1.5s' }} />
        <div className="absolute top-3/4 left-1/3 w-8 h-8 border border-violet-500/15 rotate-12 animate-pulse" style={{ animationDuration: '7s', animationDelay: '2.5s' }} />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-rose-500/15 rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }} />
      </div>

      {/* Floating text elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/6 right-1/4 text-xs text-purple-500/10 font-mono animate-pulse" style={{ animationDuration: '8s' }}>code</div>
        <div className="absolute bottom-1/6 left-1/4 text-xs text-pink-500/10 font-mono animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>blog</div>
        <div className="absolute top-2/3 right-1/6 text-xs text-violet-500/10 font-mono animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}>dev</div>
      </div>

      {/* Mouse-following gradient */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.04), transparent 55%)`
        }}
      />
      
      <div className="container-width section-padding relative z-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Blog</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights and tutorials on blockchain development, mobile apps, and software engineering
            </p>
          </div>

          {/* Featured Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {featuredPosts.map((post, index) => (
              <BlogPostCard
                key={String(post.id)}
                post={{ ...post, id: String(post.id), readTime: String(post.readTime ?? '') }}
                categories={categories}
                animationDelay={`${index * 200}ms`}
                showImage={true}
                showButton={true}
              />
            ))}
          </div>

          {/* Categories Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((category, index) => (
              <Card 
                key={category.value} 
                className={`text-center hover:shadow-3xl hover:scale-110 transition-all duration-300 hover:border-primary/50 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} 
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                onMouseEnter={() => setHoveredCard(`category-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-4">
                  <div className="font-medium text-sm">{category.label}</div>
                  <div className="text-2xl font-bold text-primary">{category.count}</div>
                  <div className="text-xs text-muted-foreground">article{category.count !== 1 ? 's' : ''}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="cta-container-center">
            <p className="text-muted-foreground mb-6">
              Explore all technical articles, tutorials, and insights from my development journey
            </p>
            <div className="cta-container">
              <Link href="/blog">
                <Button size="lg" className="cta-button-primary btn-read-article">
                  <span className="btn-text">View All Articles</span>
                  <ExternalLink className="h-4 w-4 ml-2 btn-icon" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}