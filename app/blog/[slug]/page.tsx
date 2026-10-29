import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticle } from '@/components/blog/blog-article';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/data';
import { createMetadata, generateArticleData } from '@/lib/seo';
import { StructuredData, BreadcrumbData } from '@/components/seo/structured-data';

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
    image: post.featuredImage,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const post = await loadPost(props);

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <>
      <BlogArticle post={post} />
      <StructuredData data={generateArticleData(post)} />
      <BreadcrumbData items={breadcrumbItems} />
    </>
  );
}
