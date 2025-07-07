// This file is deprecated. Use lib/data.ts instead.
// Re-exporting for backward compatibility
export { 
  getAllBlogPosts, 
  getFeaturedBlogPosts, 
  getBlogPostBySlug, 
  getBlogCategories, 
  getBlogPostsByCategory, 
  getRelatedBlogPosts, 
  searchBlogPosts,
  type BlogPost,
  type BlogCategory
} from './data';

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  parentId?: string;
  replies?: BlogComment[];
} 