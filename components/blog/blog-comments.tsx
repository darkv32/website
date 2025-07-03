'use client';

import { useState } from 'react';
import { MessageCircle, Reply, Heart, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BlogComment } from '@/lib/blog';

interface BlogCommentsProps {
  postId: string;
}

export function BlogComments({ postId }: BlogCommentsProps) {
  const [comments, setComments] = useState<BlogComment[]>([
    {
      id: '1',
      postId,
      author: {
        name: 'Alex Chen',
        email: 'alex@example.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100'
      },
      content: 'Great article! The explanation of BDK-Kotlin integration was really helpful. I\'ve been working on a similar project and this gave me some new ideas.',
      createdAt: '2024-01-15T10:30:00Z',
      replies: [
        {
          id: '2',
          postId,
          author: {
            name: 'Tang Yetong',
            email: 'tang.yetong@gmail.com',
            avatar: '/avatar.jpg'
          },
          content: 'Thanks Alex! I\'m glad you found it useful. Feel free to reach out if you have any questions about the implementation.',
          createdAt: '2024-01-15T14:20:00Z',
          parentId: '1'
        }
      ]
    },
    {
      id: '3',
      postId,
      author: {
        name: 'Sarah Kim',
        email: 'sarah@example.com',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100'
      },
      content: 'This is exactly what I needed for my blockchain project. The step-by-step breakdown makes it so much easier to understand.',
      createdAt: '2024-01-14T16:45:00Z'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: BlogComment = {
      id: Date.now().toString(),
      postId,
      author: {
        name: 'Anonymous User',
        email: 'user@example.com'
      },
      content: newComment,
      createdAt: new Date().toISOString()
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: BlogComment = {
      id: Date.now().toString(),
      postId,
      author: {
        name: 'Anonymous User',
        email: 'user@example.com'
      },
      content: replyContent,
      createdAt: new Date().toISOString(),
      parentId
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyContent('');
    setReplyingTo(null);
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Comments ({comments.length + comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0)})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <div className="space-y-4">
          <Textarea
            placeholder="Share your thoughts about this article..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Comments are moderated and will appear after approval.
            </p>
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              {/* Main Comment */}
              <div className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{comment.author.name}</span>
                    {comment.author.name === 'Tang Yetong' && (
                      <Badge variant="secondary" className="text-xs">Author</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatCommentDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Heart className="h-3 w-3 mr-1" />
                      <span className="text-xs">Like</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 space-y-3">
                      <Textarea
                        placeholder={`Reply to ${comment.author.name}...`}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!replyContent.trim()}
                        >
                          Reply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-14 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                        <AvatarFallback className="text-xs">
                          {reply.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{reply.author.name}</span>
                          {reply.author.name === 'Tang Yetong' && (
                            <Badge variant="secondary" className="text-xs">Author</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatCommentDate(reply.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{reply.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Heart className="h-3 w-3 mr-1" />
                            <span className="text-xs">Like</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More Comments */}
        {comments.length > 0 && (
          <div className="text-center pt-4">
            <Button variant="outline" size="sm">
              Load More Comments
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}