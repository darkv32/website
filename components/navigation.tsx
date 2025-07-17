'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteMetadata } from '@/lib/data';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { navigation } = getSiteMetadata();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionObserver = () => {
      const sections = ['home', 'about', 'contact'];
      const observers = sections.map(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId);
              }
            },
            { threshold: 0.3, rootMargin: '-20% 0px -80% 0px' }
          );
          observer.observe(element);
          return observer;
        }
        return null;
      });

      return () => {
        observers.forEach(observer => observer?.disconnect());
      };
    };

    window.addEventListener('scroll', handleScroll);
    const cleanup = handleSectionObserver();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanup?.();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isHomePage = typeof window !== 'undefined' && window.location.pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-lg border-b-2 border-border/60'
          : 'bg-background/40 backdrop-blur-sm shadow-sm'
      )}
    >
      <div className="container-width section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button - Left side */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Logo - Center on mobile, left on desktop */}
          <div className="flex-shrink-0 md:flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-1 hover:opacity-80 transition-opacity"
            >
              <Image
                src={!mounted || theme === 'light' ? '/logo-black.png' : '/logo-white.png'}
                alt="Tang Yetong Logo"
                width={28}
                height={28}
                className="h-8 w-auto bg-transparent"
                style={{ paddingBottom: '5px' }}
              />
              <span className="text-xl font-bold text-foreground font-semibold">Tang Yetong</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const isActive = isHomePage && item.href.startsWith('/#') 
                  ? activeSection === item.href.slice(2)
                  : false;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('/#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors relative',
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-foreground hover:text-primary'
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Theme Toggle - Right side */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(mounted && theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 p-2 relative"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Left Side Drawer */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Side Drawer */}
            <div className="md:hidden fixed top-0 left-0 h-full w-64 bg-background/95 backdrop-blur-md shadow-xl border-r border-border/40 z-50 transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/40">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src={!mounted || theme === 'light' ? '/logo-black.png' : '/logo-white.png'}
                      alt="Tang Yetong Logo"
                      width={24}
                      height={24}
                      className="h-6 w-auto bg-transparent"
                      style={{ paddingBottom: '3px' }}
                    />
                    <span className="text-lg font-bold text-foreground font-semibold">Tang Yetong</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Navigation Links */}
                <div className="flex-1 p-4 space-y-3">
                  {navigation.map((item) => {
                    const isActive = isHomePage && item.href.startsWith('/#') 
                      ? activeSection === item.href.slice(2)
                      : false;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          if (item.href.startsWith('/#')) {
                            e.preventDefault();
                            handleNavClick(item.href);
                          } else {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className={cn(
                          'block px-4 py-4 rounded-lg text-base font-medium transition-colors min-h-[48px] flex items-center',
                          isActive
                            ? 'text-primary bg-primary/10 border-l-4 border-primary font-semibold'
                            : 'text-foreground hover:text-primary hover:bg-accent/50'
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                
                {/* Footer with Theme Toggle */}
                <div className="p-4 border-t border-border/40">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-full relative"
                  >
                    <Sun className="absolute h-4 w-4 left-3 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span>Toggle Theme</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}