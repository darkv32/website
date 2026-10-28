import { OffClockBand } from '@/components/field/off-clock-band';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Hobbies - Tang Yetong',
  description: 'What Tang Yetong enjoys away from the keyboard: StarCraft II as Terran and a top five anime list.',
  keywords: ['Hobbies', 'StarCraft II', 'Terran', 'Anime', 'Tang Yetong'],
  url: '/hobbies',
});

export default function HobbiesPage() {
  return <OffClockBand />;
}
