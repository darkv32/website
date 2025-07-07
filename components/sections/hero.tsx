'use client';

import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Download, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHeroData } from '@/lib/data';

export function Hero() {
  // Parallax scroll for subtle tilt
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const { roles, description, socialLinks } = getHeroData();

  useEffect(() => window.scrollTo(0, 0), []);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Theme-aware background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900" />
      {/* Semi-transparent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-600/20 to-blue-500/20 dark:bg-gradient-to-br dark:from-transparent dark:via-purple-600/30 dark:to-indigo-600/30" />

      {/* Soft Parallax Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-24 -left-32 w-96 h-96 bg-indigo-400/50 dark:bg-purple-500/40 rounded-full opacity-50 dark:opacity-40 blur-2xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-32 -right-20 w-96 h-96 bg-purple-400/50 dark:bg-indigo-500/40 rounded-full opacity-50 dark:opacity-40 blur-2xl"
      />
      {/* Additional soft orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/40 dark:bg-emerald-500/35 rounded-full opacity-40 dark:opacity-35 blur-2xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-purple-300/45 dark:bg-teal-500/30 rounded-full opacity-45 dark:opacity-30 blur-2xl"
      />
      {/* Extra soft floating orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/3 w-48 h-48 bg-indigo-300/35 dark:bg-purple-400/30 rounded-full opacity-35 dark:opacity-30 blur-2xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-blue-300/35 dark:bg-indigo-400/30 rounded-full opacity-35 dark:opacity-30 blur-2xl"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-32">
        {/* Name with Theme-aware Gradient */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-relaxed overflow-visible bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200 mb-6 pb-2">
          Tang Yetong
        </h1>

        {/* Dynamic Role */}
        <div className="text-xl sm:text-2xl lg:text-3xl text-gray-800 dark:text-white mb-8 h-10 bg-transparent">
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
        <p className="max-w-2xl text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-10">
          {description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-emerald-500 dark:to-teal-600 dark:hover:from-emerald-600 dark:hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-500/40 dark:border-emerald-400/50 px-8 py-3 text-lg font-semibold dark:shadow-emerald-500/25 dark:hover:shadow-emerald-500/40"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
          <div className="flex space-x-3 justify-center">
            {socialLinks.map(({ href, icon, label }) => {
              const IconComponent = icon === 'Github' ? Github : icon === 'Linkedin' ? Linkedin : Mail;
              return (
                <Button
                  key={label}
                  variant="outline"
                  size="lg"
                  className="text-gray-800 border-gray-800 hover:bg-gray-800/10 dark:text-white dark:border-white dark:hover:bg-white/20 transform hover:scale-110 transition-colors"
                  asChild
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <IconComponent className="h-6 w-6" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Scroll Down */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <Button
            variant="ghost"
            onClick={scrollToNext}
            className="text-gray-800 hover:text-blue-600 dark:text-white dark:hover:text-yellow-300 transition-all duration-300 hover:scale-110"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom Fade-out Overlay - creates smooth transition to about section */}
      <div className="absolute bottom-0 left-0 w-full h-24 z-10 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />
    </section>
  );
}
