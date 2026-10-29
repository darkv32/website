import { ExperienceBand } from '@/components/field/experience-band';
import { generateMetadata } from '@/lib/seo';
import { getExperienceData } from '@/lib/data';

export const metadata = generateMetadata({
  title: 'Experience - Tang Yetong',
  description: 'Where Tang Yetong has worked and studied: RFCOM, Fivetran, GovTech, Bitcoin Dev Kit and NUS, on a timeline you can filter by tool.',
  keywords: ['Tang Yetong', 'Experience', 'Software Engineer', 'Fivetran', 'GovTech', 'Bitcoin Dev Kit', 'RFCOM', 'NUS'],
  url: '/experience',
});

export default function ExperiencePage() {
  return <ExperienceBand roles={getExperienceData().timeline} asPage />;
}
