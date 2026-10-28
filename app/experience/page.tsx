import { generateMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/seo/structured-data';
import { BreadcrumbData } from '@/components/seo/structured-data';
import { getFullUrl } from '@/lib/config';
import { getExperienceData } from '@/lib/data';
import { ExperienceBand } from '@/components/field/experience-band';

export const metadata = generateMetadata({
  title: 'Professional Experience - Tang Yetong',
  description: 'Explore my professional journey including roles at Fivetran, GovTech Singapore, and other technology companies. Discover my contributions to data engineering, mobile development, and government digital transformation.',
  keywords: [
    'Professional Experience', 'Work History', 'Fivetran', 'GovTech Singapore',
    'Data Analyst', 'Software Engineer', 'Mobile Developer', 'Career Journey',
    'Technology Experience', 'Singapore Tech', 'Data Engineering'
  ],
  url: '/experience',
});

export default function ExperiencePage() {
  const experienceData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Professional Experience',
    description: 'Professional experience and work history of Tang Yetong',
    url: getFullUrl('/experience'),
  };

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Experience', url: '/experience' },
  ];

  return (
    <>
      <ExperienceBand roles={getExperienceData().timeline} />

      {/* Structured Data */}
      <StructuredData data={experienceData} />
      <BreadcrumbData items={breadcrumbItems} />
    </>
  );
}
