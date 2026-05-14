'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHeroData } from '@/lib/data';

const portraits = [
  '/portrait/portrait-1.jpg',
  '/portrait/portrait-2.jpg',
  '/portrait/portrait-3.jpg',
  '/portrait/portrait-4.jpg',
  '/portrait/portrait-5.jpg',
  '/portrait/portrait-6.jpg',
  '/hero_background/hero-background-1.jpg',
];

export function Hero() {
  const { description, socialLinks } = getHeroData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % portraits.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-6 pt-20 pb-10 overflow-hidden">
      <div className="container-width w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column - Text Content (lg:col-7) */}
        <div className="lg:col-span-7 space-y-10 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base font-medium tracking-widest uppercase text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-700">
              Hi, I'm Tang Yetong
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Full Stack Developer & <br className="hidden md:block" />
              Data Analyst.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
              {description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </Button>
            
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, icon, label }) => {
                const IconComponent = icon === 'Github' ? Github : icon === 'Linkedin' ? Linkedin : Mail;
                return (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-full hover:bg-accent transition-all hover:scale-110"
                    asChild
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <IconComponent className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Floating Portrait Card (lg:col-5) */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-background animate-in fade-in zoom-in duration-1000">
            {portraits.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={src}
                  alt={`Portrait ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                />
              </div>
            ))}
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-20 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 -z-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-60" />
    </section>
  );
}
