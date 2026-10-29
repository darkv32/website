import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticle } from '@/components/blog/blog-article';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/data';
import { createMetadata, generateArticleData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/structured-data';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* Every post is prerendered at build time; any other slug is a 404 without rendering anything. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

async function loadPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return post;
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const post = await loadPost(props);

  return createMetadata({
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    section: post.category,
    tags: post.tags,
  });
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const post = await loadPost(props);

  return (
    <>
      <BlogArticle post={post} />
      <StructuredData data={generateArticleData(post)} />
    </>
  );
}
