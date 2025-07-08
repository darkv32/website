import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface BlogPostCardProps {
  post: {
    id?: string;
    slug?: string;
    title: string;
    excerpt: string;
    featuredImage?: string;
    publishedAt?: string;
    date?: string;
    readTime?: string;
    category: string;
    tags: string[];
    featured?: boolean;
  };
  categories?: { value: string; label: string }[];
  animationDelay?: string;
  viewMode?: 'grid' | 'list';
  showImage?: boolean;
  showButton?: boolean;
  buttonHref?: string;
  buttonText?: string;
  className?: string;
  onTagClick?: (tag: string) => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  categories = [],
  animationDelay = '0ms',
  viewMode = 'grid',
  showImage = true,
  showButton = true,
  buttonHref,
  buttonText = 'Read Article',
  className = '',
  onTagClick,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const href = buttonHref || (post.slug ? `/blog/${post.slug}` : '#');
  return (
    <Card
      className={`group hover:shadow-2xl hover:scale-[1.02] transition-all duration-75 border-2 border-primary/30 shadow-md overflow-hidden flex flex-col ${className}`}
      style={{ animationDelay }}
    >
      {showImage && post.featuredImage && (
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={animationDelay === '0ms'}
            loading={animationDelay === '0ms' ? undefined : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {post.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary">Featured</Badge>
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-4 text-white text-sm">
              {post.publishedAt || post.date ? (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt || post.date)}</span>
                </div>
              ) : null}
              {post.readTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} mins</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1">
        <CardHeader className="min-h-[88px] flex flex-col justify-start">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors min-h-[48px]">
            {post.title}
          </CardTitle>
          <div className="mt-2">
            {categories.length > 0 ? (
              <Badge variant="outline" className="text-xs">
                {categories.find((cat) => cat.value === post.category)?.label || post.category}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                {post.category}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
          <div className="flex-1" />
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="badge-enhanced text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={onTagClick ? (e) => { e.stopPropagation(); onTagClick(tag); } : undefined}
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="badge-enhanced text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
          {showButton && (
            <Button size="sm" className="w-full btn-read-article mt-auto" asChild>
              <Link href={href}>
                <BookOpen className="h-4 w-4 mr-2 btn-icon" />
                <span className="btn-text">{buttonText}</span>
              </Link>
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(BlogPostCard); 