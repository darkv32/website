import { Hero } from '@/components/field/hero';
import { AboutBody } from '@/components/field/about-body';
import { StructuredData } from '@/components/seo/structured-data';
import { createMetadata, generatePageData } from '@/lib/seo';
import { getExperienceData } from '@/lib/data';

const description = 'Tang Yetong is a full stack developer in Singapore who dabbles in data analytics. Senior engineer at RFCOM, previously at Fivetran, GovTech and the Bitcoin Dev Kit.';

export const metadata = createMetadata({ title: 'About - Tang Yetong', description, url: '/about' });

export default function AboutPage() {
  return (
    <>
      <StructuredData data={generatePageData({ type: 'ProfilePage', path: '/about', name: 'About', description })} />
      <Hero page />
      <AboutBody roles={getExperienceData().timeline} />
    </>
  );
}
