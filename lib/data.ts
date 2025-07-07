import siteData from '../data/site-data.json';
import blogData from '../data/blog-data.json';

// Site data types
export interface SiteData {
  site: {
    title: string;
    description: string;
    author: {
      name: string;
      avatar: string;
      bio: string;
      location: string;
      email: string;
      timezone: string;
      social: {
        github: string;
        linkedin: string;
        twitter: string;
      };
    };
    navigation: Array<{
      name: string;
      href: string;
    }>;
  };
  hero: {
    roles: string[];
    description: string;
    socialLinks: Array<{
      href: string;
      icon: string;
      label: string;
    }>;
  };
  about: {
    description: string;
    values: Array<{
      icon: string;
      title: string;
      description: string;
      color: string;
    }>;
    expertise: Array<{
      icon: string;
      title: string;
      description: string;
      technologies: string[];
      color: string;
      bgColor: string;
    }>;
  };
  experience: {
    highlights: Array<{
      title: string;
      company: string;
      period: string;
      description: string;
      technologies: string[];
      achievements: string[];
    }>;
    organizations: string[];
    achievements: Array<{
      title: string;
      organization: string;
      year: string;
      description: string;
    }>;
  };
  projects: {
    featured: Array<{
      id: string;
      title: string;
      description: string;
      technologies: string[];
      github: string;
      live: string;
      featured: boolean;
    }>;
    categories: Array<{
      value: string;
      label: string;
    }>;
  };
  skills: {
    categories: Array<{
      id: string;
      name: string;
      icon: string;
      skills: Array<{
        name: string;
        level: number;
      }>;
    }>;
    highlights: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    info: Array<{
      title: string;
      value: string;
      description: string;
      href: string;
      icon: string;
    }>;
    socialLinks: Array<{
      name: string;
      href: string;
      description: string;
      icon: string;
      color: string;
    }>;
  };
}

// Blog data types
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
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  views: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
}

export interface BlogData {
  posts: BlogPost[];
  categories: BlogCategory[];
}

// Load site data
export const getSiteData = (): SiteData => {
  return siteData as SiteData;
};

// Load blog data
export const getBlogData = (): BlogData => {
  return blogData as BlogData;
};

// Get all blog posts
export const getAllBlogPosts = (): BlogPost[] => {
  const { posts } = getBlogData();
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Get featured blog posts
export const getFeaturedBlogPosts = (): BlogPost[] => {
  return getAllBlogPosts().filter(post => post.featured);
};

// Get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  const { posts } = getBlogData();
  return posts.find(post => post.slug === slug && post.status === 'published');
};

// Get blog categories
export const getBlogCategories = (): BlogCategory[] => {
  const { categories } = getBlogData();
  return categories;
};

// Get blog posts by category
export const getBlogPostsByCategory = (categorySlug: string): BlogPost[] => {
  return getAllBlogPosts().filter(post => post.category === categorySlug);
};

// Get related blog posts
export const getRelatedBlogPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const allPosts = getAllBlogPosts();
  return allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};

// Search blog posts
export const searchBlogPosts = (query: string): BlogPost[] => {
  const allPosts = getAllBlogPosts();
  const searchTerm = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Get site metadata
export const getSiteMetadata = () => {
  const { site } = getSiteData();
  return {
    title: site.title,
    description: site.description,
    author: site.author,
    navigation: site.navigation
  };
};

// Get hero data
export const getHeroData = () => {
  const { hero } = getSiteData();
  return hero;
};

// Get about data
export const getAboutData = () => {
  const { about } = getSiteData();
  return about;
};

// Get experience data
export const getExperienceData = () => {
  const { experience } = getSiteData();
  return experience;
};

// Get projects data
export const getProjectsData = () => {
  const { projects } = getSiteData();
  return projects;
};

// Get skills data
export const getSkillsData = () => {
  const { skills } = getSiteData();
  return skills;
};

// Get contact data
export const getContactData = () => {
  const { contact } = getSiteData();
  return contact;
};

// Utility functions for formatting
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatReadTime = (minutes: number): string => {
  return `${minutes} min read`;
}; 