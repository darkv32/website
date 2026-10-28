import { BlogBand } from '@/components/field/blog-band';
import { generateMetadata } from '@/lib/seo';
import { getAllBlogPosts } from '@/lib/data';

export const metadata = generateMetadata({
  title: 'Technical Blog - Tang Yetong',
  description: 'Technical articles and insights on blockchain development, mobile apps, and software engineering. Explore in-depth tutorials, industry insights, and practical guides.',
  keywords: [
    'Technical Blog', 'Software Engineering', 'Blockchain Development',
    'Mobile Development', 'Data Engineering', 'Python', 'Kotlin',
    'Bitcoin Development', 'Android Development', 'Programming Tutorials'
  ],
  url: '/blog',
});

export default function BlogPage() {
  const posts = getAllBlogPosts().map(({ slug, title, excerpt, publishedAt, category, readTime }) => ({
    slug,
    title,
    excerpt,
    publishedAt: publishedAt.slice(0, 10),
    category,
    readTime,
  }));

  return <BlogBand posts={posts} />;
}
