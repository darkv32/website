import { notFound } from 'next/navigation';
import { OG_SIZE, OG_TYPE, renderCard } from '@/lib/brand-image';
import { formatDate, getAllBlogPosts, getBlogPostBySlug } from '@/lib/data';

export const alt = 'Blog post by Tang Yetong';
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/* Each post gets its own card with its title, so shared links no longer all show the same stock photo. */
export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return renderCard({
    eyebrow: `Blog · ${post.category}`,
    title: post.title,
    subtitle: `${formatDate(post.publishedAt)} · ${post.readTime} min read`,
  });
}
