import { Hero } from '@/components/sections/hero';
import { AboutBody } from '@/components/field/about-body';
import { generateMetadata } from '@/lib/seo';
import { getExperienceData } from '@/lib/data';

export const metadata = generateMetadata({
  title: 'About - Tang Yetong',
  description: 'Tang Yetong is a full stack developer in Singapore who dabbles in data analytics. Software engineer at RFCOM, previously at Fivetran, GovTech and the Bitcoin Dev Kit.',
  url: '/about',
});

export default function AboutPage() {
  return (
    <>
      <Hero page />
      <AboutBody roles={getExperienceData().timeline} />
    </>
  );
}
