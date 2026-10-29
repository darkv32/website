import { BlogBand } from '@/components/field/blog-band';
import { StructuredData } from '@/components/seo/structured-data';
import { createMetadata, generateBlogData } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/config';
import { getBlogSummaries } from '@/lib/data';

export const metadata = createMetadata({
  title: SITE_CONFIG.blog.title,
  description: SITE_CONFIG.blog.description,
  keywords: [
    'Technical Blog', 'Software Engineering', 'Blockchain Development',
    'Mobile Development', 'Data Engineering', 'Python', 'Kotlin',
    'Bitcoin Development', 'Android Development', 'Programming Tutorials'
  ],
  url: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <StructuredData data={generateBlogData()} />
      <BlogBand posts={getBlogSummaries()} asPage />
    </>
  );
}
