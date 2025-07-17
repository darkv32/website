'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Typewriter } from 'react-simple-typewriter';
import { Download, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHeroData } from '@/lib/data';
import { COLORS, getThemeColor } from '@/lib/colors';
import { useTheme } from 'next-themes';

// Dynamically import social icons to reduce initial bundle
const Github = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Github })), { ssr: false });
const Linkedin = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Linkedin })), { ssr: false });
const Mail = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Mail })), { ssr: false });

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();
  const currentTheme = theme as 'light' | 'dark' || 'dark';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple transform calculations
  const y1 = Math.max(-50, Math.min(50, (scrollY / 300) * -50));
  const y2 = Math.max(-50, Math.min(50, (scrollY / 300) * 50));

  const { roles, description, socialLinks } = getHeroData();

  useEffect(() => window.scrollTo(0, 0), []);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero_background/hero-background-1.jpg)' }}
      />
      
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: getThemeColor('overlay', currentTheme) }}
      />
      
      {/* Main splash mark blob behind text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[900px] h-[700px] opacity-95 dark:opacity-90"
          style={{
            background: getThemeColor('splashPrimary', currentTheme),
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
            filter: 'blur(60px)',
            transform: 'rotate(15deg) scale(1.1)',
            mixBlendMode: 'multiply',
          }}
        />
      </div>
      
      {/* Secondary splash mark for depth */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[800px] h-[600px] opacity-85 dark:opacity-80"
          style={{
            background: getThemeColor('splashSecondary', currentTheme),
            clipPath: 'polygon(25% 5%, 75% 5%, 95% 25%, 95% 75%, 75% 95%, 25% 95%, 5% 75%, 5% 25%)',
            filter: 'blur(50px)',
            transform: 'rotate(-10deg) scale(1.0) translateX(20px) translateY(-15px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
      
      {/* Tertiary splash mark for texture */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[600px] h-[500px] opacity-75 dark:opacity-70"
          style={{
            background: getThemeColor('splashTertiary', currentTheme),
            clipPath: 'polygon(35% 15%, 65% 15%, 85% 35%, 85% 65%, 65% 85%, 35% 85%, 15% 65%, 15% 35%)',
            filter: 'blur(45px)',
            transform: 'rotate(25deg) scale(0.85) translateX(-20px) translateY(10px)',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Soft Parallax Orbs */}
      <div
        style={{ 
          transform: `translateY(${y1}px)`,
          background: getThemeColor('floatingIndigo', currentTheme),
          clipPath: 'polygon(15% 5%, 85% 5%, 95% 25%, 95% 75%, 85% 95%, 15% 95%, 5% 75%, 5% 25%)',
          filter: 'blur(40px)',
          mixBlendMode: 'multiply'
        }}
        className="absolute -top-24 -left-32 w-96 h-96 opacity-60 dark:opacity-50"
      />
      <div
        style={{ 
          transform: `translateY(${y2}px)`,
          background: getThemeColor('floatingTeal', currentTheme),
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          filter: 'blur(45px)',
          mixBlendMode: 'screen'
        }}
        className="absolute -bottom-32 -right-20 w-96 h-96 opacity-55 dark:opacity-45"
      />
      
      {/* Additional soft orbs */}
      <div
        style={{ 
          transform: `translateY(${y1}px)`,
          backgroundColor: getThemeColor('floatingBlue', currentTheme)
        }}
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-40 dark:opacity-35 blur-2xl"
      />
      <div
        style={{ 
          transform: `translateY(${y2}px)`,
          backgroundColor: getThemeColor('floatingIndigo', currentTheme)
        }}
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-45 dark:opacity-30 blur-2xl"
      />
      
      {/* Extra soft floating orbs */}
      <div
        style={{ 
          transform: `translateY(${y1}px)`,
          backgroundColor: getThemeColor('floatingPurple', currentTheme)
        }}
        className="absolute top-1/4 left-1/3 w-48 h-48 rounded-full opacity-35 dark:opacity-30 blur-2xl"
      />
      <div
        style={{ 
          transform: `translateY(${y2}px)`,
          backgroundColor: getThemeColor('floatingTeal', currentTheme)
        }}
        className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full opacity-35 dark:opacity-30 blur-2xl"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-32 [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_2px_rgba(255,255,255,0.1)]">
        {/* Name with Theme-aware Gradient */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight sm:leading-relaxed overflow-visible bg-clip-text text-transparent ${getThemeColor('textName', currentTheme)} mb-4 sm:mb-6 pb-2 drop-shadow-lg`}>
          Tang Yetong
        </h1>

        {/* Dynamic Role */}
        <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl ${getThemeColor('textRole', currentTheme)} mb-6 sm:mb-8 h-8 sm:h-10 bg-transparent font-semibold drop-shadow-md`}>
          <Typewriter
            words={roles}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={90}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </div>

        {/* Description */}
        <p className={`max-w-2xl text-base sm:text-lg md:text-xl ${getThemeColor('textDescription', currentTheme)} mb-8 sm:mb-10 px-4 sm:px-0 transition-colors duration-300 font-medium drop-shadow-sm`}>
          {description}
        </p>

        {/* CTAs */}
        <div className="cta-container mb-10 sm:mb-12">
          <Button
            size="lg"
            className={`${getThemeColor('buttonPrimary', currentTheme)} text-white ${getThemeColor('shadowPrimary', currentTheme)} transform hover:scale-105 transition-all duration-300 ${getThemeColor('borderPrimary', currentTheme)} cta-button-primary`}
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Download Resume
          </Button>
          <div className="flex space-x-2 sm:space-x-3 justify-center w-full sm:w-auto">
            {socialLinks.map(({ href, icon, label }) => {
              const IconComponent = icon === 'Github' ? Github : icon === 'Linkedin' ? Linkedin : Mail;
              return (
                <Button
                  key={label}
                  variant="outline"
                  size="lg"
                  className={`${getThemeColor('buttonSecondary', currentTheme)} transform hover:scale-110 transition-colors p-3 sm:p-4 cta-button-secondary drop-shadow-sm`}
                  asChild
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Scroll Down */}
        <div className="mt-16 animate-bounce">
          <Button
            variant="ghost"
            onClick={scrollToNext}
            className={`${getThemeColor('buttonScroll', currentTheme)} transition-all duration-300 hover:scale-110 drop-shadow-sm`}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Fade-out Overlay - creates smooth transition to about section */}
      <div className="absolute bottom-0 left-0 w-full h-24 z-10 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />
    </section>
  );
}
