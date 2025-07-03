'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost, searchBlogPosts, formatDate } from '@/lib/blog';
import Link from 'next/link';

interface BlogSearchProps {
  onSearchResults?: (results: BlogPost[]) => void;
}

export function BlogSearch({ onSearchResults }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        const searchResults = searchBlogPosts(query);
        setResults(searchResults);
        setIsSearching(false);
        setShowResults(true);
        onSearchResults?.(searchResults);
      } else {
        setResults([]);
        setShowResults(false);
        onSearchResults?.([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, onSearchResults]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    onSearchResults?.([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles, tags, or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-4">
            {isSearching ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Search Results</h3>
                  <Badge variant="secondary" className="text-xs">
                    {results.length} found
                  </Badge>
                </div>
                <div className="space-y-3">
                  {results.slice(0, 5).map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                      onClick={() => setShowResults(false)}
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-1">{post.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(post.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {results.length > 5 && (
                  <div className="text-center pt-2 border-t">
                    <Button variant="ghost" size="sm" onClick={clearSearch}>
                      View all {results.length} results
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  No articles found for &quot;{query}&quot;
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try different keywords or browse by category
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}