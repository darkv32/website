'use client';

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Link as LinkIcon, Facebook, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BlogPost } from '@/lib/blog';

interface BlogSocialShareProps {
  post: BlogPost;
}

export function BlogSocialShare({ post }: BlogSocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${post.title} by ${post.author.name}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-500'
    }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Share this article</h4>
          
          {/* Social Media Links */}
          <div className="space-y-2">
            {shareLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="sm"
                className={`w-full justify-start ${link.color} transition-colors`}
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <link.icon className="h-4 w-4 mr-3" />
                  Share on {link.name}
                </a>
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-3 text-green-500" />
                  Link copied!
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4 mr-3" />
                  Copy link
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}