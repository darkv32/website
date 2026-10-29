import { HobbiesPage } from '@/components/field/hobbies-page';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Hobbies - Tang Yetong',
  description: 'Away from the keyboard: anime, and StarCraft II as Terran. Rank the posters, pop a bubble, train a marine.',
  keywords: ['Tang Yetong', 'Hobbies', 'Anime', 'StarCraft II', 'Terran'],
  url: '/hobbies',
});

export default function Hobbies() {
  return <HobbiesPage />;
}
