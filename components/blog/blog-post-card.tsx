import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, type BlogPost } from '@/lib/data';

/** Card for a related post at the foot of an article. */
export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-75 border-2 border-primary/30 shadow-md overflow-hidden flex flex-col">
      <div className="aspect-video overflow-hidden relative">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {post.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary">Featured</Badge>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-4 text-white text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} mins</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <CardHeader className="min-h-[88px] flex flex-col justify-start">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors min-h-[48px]">
            {post.title}
          </CardTitle>
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">{post.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
          <div className="flex-1" />
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">+{post.tags.length - 3}</Badge>
            )}
          </div>
          <Button size="sm" className="w-full mt-auto" asChild>
            <Link href={`/blog/${post.slug}`}>
              <BookOpen className="h-4 w-4 mr-2" />
              Read Article
            </Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
