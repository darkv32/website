import { BlogDetail } from '@/components/pages/blog-detail';
import { generateMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/seo/structured-data';
import { BreadcrumbData } from '@/components/seo/structured-data';
import { generateStructuredData } from '@/lib/seo';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

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
  const blogListData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Technical Blog Posts',
    description: 'Technical articles and insights on blockchain development, mobile apps, and software engineering.',
    url: getFullUrl('/blog'),
  };

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ];

  return (
    <>
      <BlogDetail />
      <StructuredData data={blogListData} />
      <BreadcrumbData items={breadcrumbItems} />
    </>
  );
}