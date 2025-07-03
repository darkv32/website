'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Calendar, Clock, ExternalLink, Tag, Search, Filter, Grid, List, BookOpen, TrendingUp, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogSearch } from '@/components/blog/blog-search';
import { BlogPagination } from '@/components/blog/blog-pagination';
import { BlogLoading } from '@/components/blog/blog-loading';
import { getAllBlogPosts, getFeaturedBlogPosts, blogCategories, BlogPost, formatDate, formatReadTime } from '@/lib/blog';
import Link from 'next/link';

export function BlogDetail() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const postsPerPage = 6;
  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();

  useEffect(() => {
    setIsVisible(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let posts = searchResults.length > 0 ? searchResults : allPosts;
    
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(posts);
    setCurrentPage(1);
  }, [selectedCategory, searchResults, allPosts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearchResults = (results: BlogPost[]) => {
    setSearchResults(results);
  };

  const totalViews = allPosts.reduce((sum, post) => sum + post.views, 0);

  const blogStats = [
    {
      title: "Technical Expertise",
      description: "Deep dive into blockchain development, mobile apps, and software engineering",
      icon: BookOpen,
      color: "text-blue-500"
    },
    {
      title: "Community Impact",
      description: "Sharing knowledge and contributing to developer education",
      icon: Users,
      color: "text-green-500"
    },
    {
      title: "Industry Recognition",
      description: "Featured in Summer of Bitcoin and open-source communities",
      icon: Award,
      color: "text-purple-500"
    }
  ];

  if (isLoading) {
    return <BlogLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container-width section-padding relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            <Link href="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Technical Blog
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Insights, tutorials, and experiences in blockchain development, mobile applications, 
                and software engineering from my journey in tech.
              </p>
            </div>

            {/* Blog Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{allPosts.length}</div>
                  <div className="text-muted-foreground">Total Articles</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{totalViews.toLocaleString()}</div>
                  <div className="text-muted-foreground">Total Views</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{featuredPosts.length}</div>
                  <div className="text-muted-foreground">Featured Posts</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{Math.round(allPosts.reduce((sum, post) => sum + post.readTime, 0) / allPosts.length)}</div>
                  <div className="text-muted-foreground">Avg Read Time</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Impact */}
      <section className="py-20">
        <div className="container-width section-padding">
          <h2 className="text-3xl font-bold text-center mb-12">Blog Impact & Focus</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {blogStats.map((stat, index) => (
              <Card key={stat.title} className="hover:shadow-xl transition-all duration-300 group text-center">
                <CardContent className="p-8">
                  <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${stat.color} bg-secondary/50 group-hover:bg-secondary transition-colors`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-3">{stat.title}</h4>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-secondary/20">
        <div className="container-width section-padding">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
            {/* Search */}
            <div className="w-full lg:w-96">
              <BlogSearch onSearchResults={handleSearchResults} />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  {blogCategories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name} ({category.postCount})
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

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All ({allPosts.length})
            </Button>
            {blogCategories.map((category) => (
              <Button
                key={category.slug}
                variant={selectedCategory === category.slug ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name} ({category.postCount})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {searchResults.length === 0 && selectedCategory === 'all' && (
        <section className="py-20">
          <div className="container-width section-padding">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-background to-secondary/20">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <Badge className="bg-primary">Featured</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-4 text-white text-sm">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{post.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="h-4 w-4" />
                          <span>{post.tags.length} tags</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
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
                      <Link href={`/blog/${post.slug}`}>
                        Read Full Article
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-secondary/20">
        <div className="container-width section-padding">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold">
              {searchResults.length > 0 ? 'Search Results' : 
               selectedCategory !== 'all' ? `${blogCategories.find(cat => cat.slug === selectedCategory)?.name} Articles` : 
               'All Articles'}
            </h2>
            
            <div className="text-muted-foreground text-sm">
              Showing {currentPosts.length} of {filteredPosts.length} articles
            </div>
          </div>

          {/* Posts Grid/List */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12' 
            : 'space-y-6 mb-12'
          }>
            {currentPosts.map((post, index) => (
              <Card key={post.id} className={`group hover:shadow-xl transition-all duration-300 ${
                viewMode === 'list' ? 'md:flex md:items-center' : ''
              }`}>
                <div className={`${viewMode === 'list' ? 'md:w-1/3' : ''} aspect-video overflow-hidden relative ${viewMode === 'grid' ? 'rounded-t-lg' : 'md:rounded-l-lg md:rounded-t-none'}`}>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 flex items-center space-x-1">
                    <Badge variant="outline" className="bg-background/80 text-xs">
                      {blogCategories.find(cat => cat.slug === post.category)?.name}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-primary text-xs">Featured</Badge>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center space-x-3 text-white text-xs">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="h-3 w-3" />
                        <span>{post.tags.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={viewMode === 'list' ? 'md:w-2/3 p-6' : ''}>
                  <CardHeader className={viewMode === 'list' ? 'p-0 pb-4' : ''}>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
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
                    
                    <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read Article
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchResults([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter/Subscribe Section */}
      <section className="py-20">
        <div className="container-width section-padding">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Follow my technical journey and get notified about new articles on blockchain development, 
                mobile apps, and software engineering insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="https://darkvoid32.github.io/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit My Blog
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://github.com/fivetran-tangyetong" target="_blank" rel="noopener noreferrer">
                    Follow on GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}