'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
  badge?: string;
  className?: string;
}

const PageLayoutComponent = ({
  children,
  title,
  description,
  showBackButton = false,
  backHref = '/',
  backText = 'Back to Home',
  badge,
  className = ''
}: PageLayoutProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Optimize mouse move handler with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className={`min-h-screen bg-background relative overflow-hidden ${className}`}>
      {/* Enhanced gradient overlay with animation */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
      
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-green-500/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-orange-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '4s' }} />
      </div>

      {/* Enhanced floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/15 rounded-full animate-float"
            style={{
              left: `${15 + i * 8}%`,
              top: `${8 + i * 12}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 1.5}s`
            }}
          />
        ))}
      </div>

      {/* Additional geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-8 h-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-md rotate-45 transition-transform duration-3000 hover:scale-110"></div>
        <div className="absolute bottom-1/4 right-1/6 w-6 h-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full transition-transform duration-3000 hover:scale-110"></div>
        <div className="absolute top-3/4 left-1/3 w-4 h-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-sm rotate-12 transition-transform duration-3000 hover:scale-110"></div>
        <div className="absolute bottom-3/4 right-1/4 w-5 h-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg transition-transform duration-3000 hover:scale-110"></div>
      </div>

      {/* Subtle gradient lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-0.5 h-24 bg-gradient-to-b from-transparent via-blue-500/15 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-0 w-0.5 h-24 bg-gradient-to-b from-transparent via-purple-500/15 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-transparent via-green-500/15 to-transparent animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Mouse-following gradient */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.1), transparent 40%)`
        }}
      />
      
      {/* Main background */}
      <div className="pt-8 bg-gradient-to-br from-background via-background to-background relative">
        {/* Enhanced grid pattern for light mode */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:bg-grid-pattern bg-grid-pattern-light" />
        
        <div className="container-width section-padding relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            {/* Page Header */}
            <div className="mb-16">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center space-x-2 mb-3 pt-16" />
                <h1 className="text-4xl sm:text-5xl font-bold text-gradient-primary text-center leading-tight pb-2 drop-shadow-2xl filter brightness-110">
                  {title}
                </h1>
                {description && (
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in text-center" style={{ animationDelay: '0.5s' }}>
                    {description}
                  </p>
                )}
              </div>
            </div>
            {/* Page Content */}
            <div ref={sectionRef}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export with React.memo for performance optimization
export const PageLayout = React.memo(PageLayoutComponent); 