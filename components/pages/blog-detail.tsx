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

  const backgroundIcons = [
    { Icon: BookOpen, className: "top-20 right-10 opacity-20" },
    { Icon: Tag, className: "bottom-40 left-10 opacity-15" },
    { Icon: TrendingUp, className: "top-1/3 left-1/4 opacity-10" },
    { Icon: Users, className: "bottom-20 right-1/4 opacity-15" },
  ];

  if (isLoading) {
    return <BlogLoading />;
  }

  return (
    <PageLayout
      title="My Blog"
      description="Anything under the sun, from insights, to tutorials, to experiences in blockchain development, mobile applications, and software engineering from my life."
      badge="Blog"
      showBackButton
      backgroundIcons={backgroundIcons}
    >
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="relative z-10 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Featured Articles</h2>
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
      )}

      {/* Search and Filters */}
      <div className="relative z-10 mb-12">
        <Card className="bg-card/40 backdrop-blur-md border-primary/10 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <BlogSearch onSearchResults={handleSearchResults} onCategoryClick={setSelectedCategory} query={searchTerm} setQuery={setSearchTerm} />
            </div>
            
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-3 bg-primary/5 border border-primary/10 rounded-xl px-4 py-2">
                <Filter className="h-4 w-4 text-primary" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {blogCategories.map((category: any) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex bg-primary/5 border border-primary/10 rounded-xl p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg px-3 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground'}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg px-3 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground'}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-8 pt-6 border-t border-primary/5">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === 'all' 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-primary/5 border-primary/10 text-muted-foreground hover:border-primary/30 hover:text-primary'
                }`}
              >
                All ({allPosts.length})
              </button>
              {blogCategories.map((category: any) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                    selectedCategory === category.slug 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-primary/5 border-primary/10 text-muted-foreground hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {category.name} ({category.postCount})
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Posts Section */}
      <div className="relative z-10">
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
          : 'space-y-8'
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
          <div className="mt-16">
            <BlogPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-card/20 backdrop-blur-sm rounded-3xl border border-primary/10">
            <p className="text-muted-foreground mb-6 font-medium">No articles found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="rounded-full px-8 border-primary/20 text-primary hover:bg-primary/5"
              onClick={() => {
                setSearchResults([]);
                setSelectedCategory('all');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}