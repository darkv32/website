import siteData from '../data/site-data.json';
import blogData from '../data/blog-data.json';
import { SITE_CONFIG } from './config';

export interface Role {
  title: string;
  company: string;
  period: string;
  current: boolean;
  kind: string;
  summary: string;
  details: string[];
  tools: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    social: {
      twitter: string;
      linkedin: string;
      github: string;
    };
  };
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export const getExperienceData = (): { timeline: Role[] } => siteData.experience;

const author: BlogPost['author'] = {
  name: SITE_CONFIG.site.author,
  avatar: SITE_CONFIG.site.avatar,
  bio: SITE_CONFIG.site.bio,
  social: {
    twitter: SITE_CONFIG.social.twitter,
    linkedin: SITE_CONFIG.social.linkedin,
    github: SITE_CONFIG.social.github,
  },
};

const published = (blogData.posts as Array<Omit<BlogPost, 'author'>>)
  .filter((post) => post.status === 'published')
  .map((post): BlogPost => ({ ...post, author }))
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const getAllBlogPosts = (): BlogPost[] => published;

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  published.find((post) => post.slug === slug);

export const getRelatedBlogPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] =>
  published
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        (post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag))),
    )
    .slice(0, limit);

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const formatReadTime = (minutes: number): string => `${minutes} min read`;
