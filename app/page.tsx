import { Hero } from '@/components/sections/hero';
import { ExperienceBand } from '@/components/field/experience-band';
import { BlogBand } from '@/components/field/blog-band';
import { OffClockBand } from '@/components/field/off-clock-band';
import { ContactBand } from '@/components/field/contact-band';
import { getAllBlogPosts, getExperienceData } from '@/lib/data';

/* The front page is the whole site: five bands that the tabs scroll between. */
export default function Home() {
  const posts = getAllBlogPosts().map(({ slug, title, excerpt, publishedAt, category, readTime }) => ({
    slug,
    title,
    excerpt,
    publishedAt: publishedAt.slice(0, 10),
    category,
    readTime,
  }));

  return (
    <>
      <Hero />
      <ExperienceBand roles={getExperienceData().timeline} />
      <BlogBand posts={posts} limit={6} />
      <OffClockBand />
      <ContactBand />
    </>
  );
}
