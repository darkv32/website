'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogPost, searchBlogPosts } from '@/lib/data';

interface BlogSearchProps {
  onSearchResults?: (results: BlogPost[]) => void;
  onCategoryClick?: (category: string) => void;
  query?: string;
  setQuery?: (query: string) => void;
}

export function BlogSearch({ onSearchResults, onCategoryClick, query: controlledQuery, setQuery: setControlledQuery }: BlogSearchProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const query = controlledQuery !== undefined ? controlledQuery : internalQuery;
  const setQuery = setControlledQuery !== undefined ? setControlledQuery : setInternalQuery;

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        const searchResults = searchBlogPosts(query);
        onSearchResults?.(searchResults);
      } else {
        onSearchResults?.([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, onSearchResults]);

  const clearSearch = () => {
    setQuery('');
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
    </div>
  );
}