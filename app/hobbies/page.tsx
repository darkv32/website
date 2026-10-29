import { HobbiesPage } from '@/components/field/hobbies-page';
import { StructuredData } from '@/components/seo/structured-data';
import { createMetadata, generatePageData } from '@/lib/seo';

const description = 'Away from the keyboard: anime, and StarCraft II as Terran. Rank the posters, pop a bubble, train a marine.';

export const metadata = createMetadata({
  title: 'Hobbies - Tang Yetong',
  description,
  keywords: ['Tang Yetong', 'Hobbies', 'Anime', 'StarCraft II', 'Terran'],
  url: '/hobbies',
});

export default function Hobbies() {
  return (
    <>
      <StructuredData data={generatePageData({ type: 'WebPage', path: '/hobbies', name: 'Hobbies', description })} />
      <HobbiesPage />
    </>
  );
}
