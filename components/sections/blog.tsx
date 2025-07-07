'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ExternalLink, Tag, Search, Filter, Grid, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllBlogPosts, getBlogCategories } from '@/lib/data';

export function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

  const blogPosts = getAllBlogPosts();
  const categories = getBlogCategories();

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Add value and label properties to categories for compatibility
  const categoriesWithValues = [
    { value: 'all', label: 'All Posts' },
    ...categories.map(cat => ({ value: cat.slug, label: cat.name }))
  ];

  return (
    <section id="blog" ref={sectionRef} className="py-20 page-blog-light">
      <div className="container-width section-padding">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Blog</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights and tutorials on blockchain development, mobile apps, and software engineering
            </p>
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-secondary/20 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">{blogPosts.length}</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">{featuredPosts.length}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">2022-2024</div>
              <div className="text-sm text-muted-foreground">Years Active</div>
            </div>
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">Featured Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <Card key={post.id} className={`group hover:shadow-xl transition-all duration-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 200}ms` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-primary/10 text-primary">Featured</Badge>
                      <Badge variant="outline" className="text-xs">
                        {categories.find(cat => cat.slug === post.category)?.name}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                    
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
                    
                    <Button size="sm" variant="outline" className="w-full btn-read-more" asChild>
                      <a href={`https://darkvoid32.github.io/`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2 btn-icon" />
                        <span className="btn-text">Read More</span>
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Posts */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h3 className="text-2xl font-semibold">All Posts</h3>
              
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categoriesWithValues.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex rounded-md border border-border overflow-hidden">
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Posts Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {filteredPosts.map((post, index) => (
                <Card key={post.id} className={`card-enhanced-light card-blog-light group ${
                  viewMode === 'list' ? 'md:flex md:items-center' : ''
                } ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                  <div className={viewMode === 'list' ? 'md:w-2/3 p-6' : ''}>
                    <CardHeader className={viewMode === 'list' ? 'p-0 pb-4' : ''}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(cat => cat.slug === post.category)?.name}
                        </Badge>
                        {post.featured && (
                          <Badge className="bg-primary/10 text-primary text-xs">Featured</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className={`space-y-3 ${viewMode === 'list' ? 'p-0' : ''}`}>
                      <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                      
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
                      
                      <Button size="sm" variant="outline" className="w-full btn-read-more" asChild>
                        <a href={`https://darkvoid32.github.io/`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2 btn-icon" />
                          <span className="btn-text">Read More</span>
                        </a>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Blog CTA */}
            <div className="mt-16 cta-container-center">
              <Card className="card-enhanced-light card-blog-light max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-4">Want to read more?</h4>
                  <p className="text-muted-foreground mb-6">
                    Visit my personal blog for the complete articles and more technical insights.
                  </p>
                  <Button className="btn-cta-secondary cta-button-primary btn-read-article" asChild>
                    <a href="https://darkvoid32.github.io/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 btn-icon" />
                      <span className="btn-text">Visit My Blog</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}