import siteData from '../data/site-data.json';
import blogData from '../data/blog-data.json';

export interface Role {
  title: string;
  company: string;
  period: string;
  current: boolean;
  kind: string;
  /** Short label on the timeline. */
  short: string;
  /** Stretches of the role as [start, end] in decimal years (2022.5 is mid 2022); a null end means still going. */
  spans: Array<[number, number | null]>;
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
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

/** What a list of posts needs; keeps the article text out of client components. */
export type BlogSummary = Pick<BlogPost, 'slug' | 'title' | 'excerpt' | 'publishedAt' | 'category' | 'readTime'>;

export const getExperienceData = (): { timeline: Role[] } => siteData.experience as { timeline: Role[] };

const published = (blogData.posts as BlogPost[])
  .filter((post) => post.status === 'published')
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const getAllBlogPosts = (): BlogPost[] => published;

/** Every published post as a summary, newest first. Dates are cut to YYYY-MM-DD. */
export const getBlogSummaries = (): BlogSummary[] =>
  published.map(({ slug, title, excerpt, publishedAt, category, readTime }) => ({
    slug,
    title,
    excerpt,
    publishedAt: publishedAt.slice(0, 10),
    category,
    readTime,
  }));

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
