'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface BackgroundIcon {
  Icon: LucideIcon;
  className: string;
  style?: React.CSSProperties;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
  badge?: string;
  className?: string;
  backgroundIcons?: BackgroundIcon[];
}

const PageLayoutComponent = ({
  children,
  title,
  description,
  showBackButton = false,
  backHref = '/',
  backText = 'Back to Home',
  badge,
  className = '',
  backgroundIcons = []
}: PageLayoutProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

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
      {/* High-Tech Background Gradients (Same as Hero) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Ambient Glow */}
        <div 
          className="absolute -left-20 -top-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50 animate-pulse" 
          style={{ animationDuration: '8s' }}
        />
        {/* Bottom-Right Ambient Glow */}
        <div 
          className="absolute -right-20 -bottom-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-40" 
        />
        
        {/* Precision Radial Mask (Landing Page Style) */}
        <div 
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,rgba(0,0,0,0.5)_70%,transparent_100%)] opacity-20 pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%)',
            backgroundSize: '100% 100%'
          }}
        />
      </div>

      {/* Contextual Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20 dark:opacity-10">
        {backgroundIcons.map(({ Icon, className: iconClass, style }, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-1000 ${iconClass}`}
            style={style}
          >
            <Icon size={120} strokeWidth={0.5} className="text-primary animate-float" style={{ animationDelay: `${index * 1.5}s` }} />
          </div>
        ))}
      </div>

      {/* Mouse-following spotlight effect */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.05), transparent 40%)`
        }}
      />
      
      <div className="relative z-10 pt-20">
        <div className="container-width px-6">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            
            {/* Page Header */}
            <div className="mb-16 text-center lg:text-left">
              {showBackButton && (
                <Link 
                  href={backHref}
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  {backText}
                </Link>
              )}
              
              <div className="space-y-4">
                {badge && (
                  <Badge variant="outline" className="px-3 py-1 border-primary/30 text-primary bg-primary/5 tracking-widest uppercase text-[10px] font-bold">
                    {badge}
                  </Badge>
                )}
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-gradient-primary">
                  {title}
                </h1>
                {description && (
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* Page Content */}
            <div ref={sectionRef} className="pb-20">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageLayout = React.memo(PageLayoutComponent);
 