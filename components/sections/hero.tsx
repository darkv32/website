'use client';

import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Download, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  // Parallax scroll for subtle tilt
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const roles = [
    'Data Analyst @ Fivetran',
    'Full Stack Developer',
    'Android Engineer',
    'Blockchain Developer',
  ];

  const socialLinks = [
    { href: 'https://github.com/fivetran-tangyetong', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/tang-yetong',    icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:ytyt0792@gmail.com',               icon: Mail,     label: 'Email' },
  ];

  useEffect(() => window.scrollTo(0, 0), []);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Dark Base + Gradient Overlay */}
      <div className="absolute inset-0 bg-gray-900" />
      {/* Semi-transparent gradient to blend dark into accent colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-600 to-blue-500 opacity-40" />

      {/* Parallax Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-24 -left-32 w-96 h-96 bg-indigo-400 rounded-full opacity-30 blur-2xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-32 -right-20 w-96 h-96 bg-purple-400 rounded-full opacity-30 blur-2xl"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Name with Slightly Darker Grey Gradient, fix descender cropping */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-relaxed overflow-visible bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 mb-6 pb-2">
          Tang Yetong
        </h1>

        {/* Dynamic Role */}
        <div className="text-xl sm:text-2xl lg:text-3xl text-white mb-8 h-10 bg-transparent">
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
        <p className="max-w-2xl text-lg sm:text-xl text-gray-200 mb-10">
          Data Analyst at <span className="font-semibold text-white">Fivetran</span> passionate about
          building scalable pipelines, mobile apps, and full-stack solutions.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-red-500 text-black hover:from-red-500 hover:to-yellow-400 transform hover:scale-105 transition"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <Download className="mr-2" />
            Download Resume
          </Button>
          <div className="flex space-x-3 justify-center">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/20 transform hover:scale-110 transition"
                asChild
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-6 w-6" />
                </a>
              </Button>
            ))}
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
            className="text-white hover:text-yellow-300 transition-all duration-300 hover:scale-110"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom Fade-out Overlay - creates smooth transition to about section */}
      <div className="absolute bottom-0 left-0 w-full h-48 z-10 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />
    </section>
  );
}
