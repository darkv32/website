import { Hero } from '@/components/field/hero';
import { ExperienceBand } from '@/components/field/experience-band';
import { BlogBand } from '@/components/field/blog-band';
import { OffClockBand } from '@/components/field/off-clock-band';
import { ContactBand } from '@/components/field/contact-band';
import { getBlogSummaries, getExperienceData } from '@/lib/data';

/* The front page is the whole site: five bands that the tabs scroll between. */
export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceBand roles={getExperienceData().timeline} />
      <BlogBand posts={getBlogSummaries()} limit={6} />
      <OffClockBand />
      <ContactBand />
    </>
  );
}
