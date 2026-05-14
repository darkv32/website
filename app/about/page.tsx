import { AboutDetail } from '@/components/pages/about-detail';
import { generateMetadata, generateStructuredData } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'About Tang Yetong - Data Analyst & Developer',
  description: 'Learn about Tang Yetong, a Data Analyst at Fivetran with expertise in data engineering, Android development, and blockchain technology. Discover my journey, skills, and contributions to the tech community.',
  keywords: [
    'About Tang Yetong', 'Data Analyst', 'Fivetran', 'Data Engineering',
    'Android Developer', 'Blockchain', 'Singapore', 'GovTech',
    'NUS Hackers', 'Computer Science', 'Technical Background'
  ],
  url: '/about',
});

export default function AboutPage() {
  const personData = generateStructuredData('person', {});
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ];

  return <AboutDetail personData={personData} breadcrumbItems={breadcrumbItems} />;
}
