import { BlogBand } from '@/components/field/blog-band';
import { createMetadata } from '@/lib/seo';
import { getBlogSummaries } from '@/lib/data';

export const metadata = createMetadata({
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
  return <BlogBand posts={getBlogSummaries()} asPage />;
}
