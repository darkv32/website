'use client';

import { useEffect, useRef, useState , useMemo } from 'react';
import { Calendar, Clock, ExternalLink, Tag, Search, Filter, Grid, List, BookOpen, TrendingUp, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogSearch } from '@/components/blog/blog-search';
import { BlogPagination } from '@/components/blog/blog-pagination';
import { BlogLoading } from '@/components/blog/blog-loading';
import { getAllBlogPosts, getFeaturedBlogPosts, getBlogCategories, BlogPost, formatDate, formatReadTime } from '@/lib/data';
import { PageLayout } from '@/components/ui/page-layout';
import Link from 'next/link';
import { BlogPostCard } from '@/components/blog/blog-post-card';
import { BlogArticle } from '@/components/blog/blog-article';

export function BlogDetail() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const postsPerPage = 6;
  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const featuredPosts = useMemo(() => getFeaturedBlogPosts(), []);
  const blogCategories = useMemo(() => getBlogCategories(), []);

  const blogCategoriesWithValues = blogCategories.map(cat => ({ value: cat.slug, label: cat.name }));

  useEffect(() => {
    setIsVisible(true);
    setIsLoading(false);
  }, []);

  // Handle data loading
  useEffect(() => {
    let posts = searchResults.length > 0 ? searchResults : allPosts;
    
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(posts);
  }, [selectedCategory, searchResults, allPosts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearchResults = (results: BlogPost[]) => {
    setSearchResults(results);
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    setSearchResults(allPosts.filter(post => post.tags.includes(tag)));
    setSelectedCategory('all');
  };

  const totalViews = allPosts.reduce((sum, post) => sum + post.views, 0);

  if (isLoading) {
    return <BlogLoading />;
  }

  return (
    <PageLayout
      title="Technical Blog"
      description="Insights, tutorials, and experiences in blockchain development, mobile applications, and software engineering from my journey in tech."
      badge="Blog"
      showBackButton
      className="overflow-visible"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg rotate-45 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-60 right-1/3 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full animate-float" style={{ animationDelay: '5s' }}></div>
        
        {/* Gradient Lines */}
        <div className="absolute top-1/3 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Text Elements */}
        <div className="absolute top-1/4 right-1/4 text-xs text-muted-foreground/30 font-mono animate-float" style={{ animationDelay: '1s' }}>Blog</div>
        <div className="absolute bottom-1/4 left-1/4 text-xs text-muted-foreground/30 font-mono animate-float" style={{ animationDelay: '3s' }}>Insights</div>
        <div className="absolute top-1/2 left-1/2 text-xs text-muted-foreground/30 font-mono animate-float" style={{ animationDelay: '5s' }}>Knowledge</div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="page-section relative z-10" style={{ marginTop: '-6rem' }}>
          <div className="page-section-content">
            <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogPostCard
                  key={String(post.slug || post.id)}
                  post={{ ...post, id: String(post.id ?? post.slug ?? index), readTime: String(post.readTime ?? '') }}
                  categories={blogCategoriesWithValues}
                  animationDelay={`${index * 200}ms`}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="page-section-alt relative z-10" style={{ marginTop: '-6rem' }}>
        <div className="page-section-content">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96 relative z-20">
              <BlogSearch onSearchResults={handleSearchResults} onCategoryClick={setSelectedCategory} query={searchTerm} setQuery={setSearchTerm} />
            </div>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary input-enhanced"
                >
                  <option value="all">All Categories</option>
                  {blogCategories.map((category: any) => (
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

          {/* Category Pills - Moved here under search bar */}
          <div className="mt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  console.log('All button clicked');
                  setSelectedCategory('all');
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border hover:bg-accent hover:text-accent-foreground ${
                  selectedCategory === 'all' 
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                    : 'bg-background text-foreground border-border hover:border-border/80'
                }`}
                style={{ pointerEvents: 'auto' }}
              >
                All ({allPosts.length})
              </button>
              {blogCategories.map((category: any, index: any) => (
                <button
                  key={category.slug}
                  onClick={() => {
                    setSelectedCategory(category.slug);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border hover:bg-accent hover:text-accent-foreground ${
                    selectedCategory === category.slug 
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                      : 'bg-background text-foreground border-border hover:border-border/80'
                  }`}
                  style={{ 
                    pointerEvents: 'auto', 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.5s ease-out forwards'
                  }}
                >
                  {category.name} ({category.postCount})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Posts */}
      <div className="relative z-10" style={{ marginTop: '-2rem', paddingBottom: '2rem' }}>
        <div className="page-section-content">
          {/* Posts Grid/List */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-6'
          }>
            {currentPosts.map((post, index) => (
              <BlogPostCard
                key={String(post.slug || post.id)}
                post={{ ...post, id: String(post.id ?? post.slug ?? index), readTime: String(post.readTime ?? '') }}
                categories={blogCategoriesWithValues}
                animationDelay={`${index * 100}ms`}
                viewMode={viewMode}
                showImage={true}
                showButton={true}
                onTagClick={handleTagClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <BlogPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchResults([]);
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}