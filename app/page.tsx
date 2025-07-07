import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { FeaturedExperience } from '@/components/sections/featured-experience';
import { FeaturedBlog } from '@/components/sections/featured-blog';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="relative">
      <Hero />  
      <About />
      <FeaturedExperience />
      <FeaturedBlog />
      <Contact />
    </div>
  );
}