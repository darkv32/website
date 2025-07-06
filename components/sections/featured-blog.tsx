'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ExternalLink, Tag, BookOpen, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturedBlog() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const featuredPosts = [
    {
      id: 2,
      title: "Render Error: Cannot read property 'createClient' of null",
      excerpt: "Troubleshooting React Native BLE library issues and finding solutions for Expo Go compatibility problems.",
      date: "2023-11-05",
      readTime: "3 min read",
      category: "mobile",
      tags: ["React Native", "BLE", "Expo", "Debugging"],
    },
    {
      id: 3,
      title: "How to contribute to Padawan Wallet",
      excerpt: "A comprehensive guide to contributing to the Padawan Wallet project and understanding the BDK-Kotlin ecosystem.",
      date: "2022-08-30",
      readTime: "5 min read",
      category: "blockchain",
      tags: ["Bitcoin", "Open Source", "BDK-Kotlin", "Android"],
    },
    {
      id: 5,
      title: "Everything about my Internship at GovTech 2022 Summer",
      excerpt: "Complete breakdown of my 3-month internship experience at GovTech Singapore, including projects and learnings.",
      date: "2022-08-02",
      readTime: "10 min read",
      category: "career",
      tags: ["GovTech", "Internship", "AWS", "CloudWatch", "React"],
    }
  ];

  const categories = [
    { value: 'blockchain', label: 'Blockchain', count: 7 },
    { value: 'mobile', label: 'Mobile Development', count: 1 },
    { value: 'career', label: 'Career', count: 1 },
    { value: 'academic', label: 'Academic', count: 1 }
  ];

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
              <Card key={post.id} className={`group hover:shadow-xl transition-all duration-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 200}ms` }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-primary/10 text-primary">Featured</Badge>
                    <Badge variant="outline" className="text-xs">
                      {categories.find(cat => cat.value === post.category)?.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <span>{post.tags.length} tags</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <a href={`https://darkvoid32.github.io/`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read More
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Categories Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((category, index) => (
              <Card key={category.value} className={`text-center hover:shadow-lg transition-all duration-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                <CardContent className="p-4">
                  <div className="font-medium text-sm">{category.label}</div>
                  <div className="text-2xl font-bold text-primary">{category.count}</div>
                  <div className="text-xs text-muted-foreground">article{category.count !== 1 ? 's' : ''}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Explore all technical articles, tutorials, and insights from my development journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg">
                  View All Articles
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" asChild>
                <a href="https://darkvoid32.github.io/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit My Blog
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}