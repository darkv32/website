'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { SITE_CONFIG } from '@/lib/config';

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-secondary/30 border-t-2 border-gray-300 dark:border-border/50">
      <div className="container-width section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Bio */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <Image
                src={!mounted || theme === 'light' ? '/logo-black.png' : '/logo-white.png'}
                alt="Tang Yetong Logo"
                width={28}
                height={28}
                className="h-8 w-auto bg-transparent"
                style={{ paddingBottom: '5px' }}
              />
              <h3 className="text-lg font-semibold">Tang Yetong</h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md transition-colors duration-300 dark:hover:text-primary/80 dark:hover:drop-shadow-lg">
              Full Stack Developer passionate about creating exceptional digital experiences. 
              Based in Singapore, building the future one line of code at a time.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={`mailto:${SITE_CONFIG.site.email}`}>
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Singapore</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${SITE_CONFIG.site.email}`} className="hover:text-primary transition-colors">
                {SITE_CONFIG.site.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Tang Yetong. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}