import { ExperienceBand } from '@/components/field/experience-band';
import { StructuredData } from '@/components/seo/structured-data';
import { createMetadata, generatePageData } from '@/lib/seo';
import { getExperienceData } from '@/lib/data';

const description = 'Where Tang Yetong has worked and studied: RFCOM, Fivetran, GovTech, Bitcoin Dev Kit and NUS, on a timeline you can filter by tool.';

export const metadata = createMetadata({
  title: 'Experience - Tang Yetong',
  description,
  keywords: ['Tang Yetong', 'Experience', 'Software Engineer', 'Fivetran', 'GovTech', 'Bitcoin Dev Kit', 'RFCOM', 'NUS'],
  url: '/experience',
});

export default function ExperiencePage() {
  return (
    <>
      <StructuredData data={generatePageData({ type: 'WebPage', path: '/experience', name: 'Experience', description })} />
      <ExperienceBand roles={getExperienceData().timeline} asPage />
    </>
  );
}
