import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { generateMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/seo/structured-data';
import { BreadcrumbData } from '@/components/seo/structured-data';
import { SITE_CONFIG, getFullUrl } from '@/lib/config';

// Dynamic import with loading fallback
const ExperienceDetail = dynamic(() => import('@/components/pages/experience-detail').then(mod => ({ default: mod.ExperienceDetail })), {
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading experience...</p>
      </div>
    </div>
  ),
  ssr: false // Disable SSR for better performance with heavy animations
});

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
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading experience...</p>
          </div>
        </div>
      }>
        <ExperienceDetail />
      </Suspense>
      
      {/* Structured Data */}
      <StructuredData data={experienceData} />
      <BreadcrumbData items={breadcrumbItems} />
    </>
  );
}