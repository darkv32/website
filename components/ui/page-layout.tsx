'use client';

import { useEffect, useRef, useState } from 'react';
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

export function PageLayout({
  children,
  title,
  description,
  showBackButton = false,
  backHref = '/',
  backText = 'Back to Home',
  badge,
  className = ''
}: PageLayoutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen bg-background relative overflow-hidden ${className}`}>
      {/* Enhanced gradient overlay with animation */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/0 via-background/50 to-background z-10 animate-pulse" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      {/* Mouse-following gradient */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.1), transparent 40%)`
        }}
      />
      
      {/* Main background with enhanced gradient transition */}
      <div className="pt-8 pb-24 bg-gradient-to-br from-background via-background to-background relative">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-grid-flow" />
        
        <div className="container-width section-padding relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            {/* Enhanced Page Header */}
            <div className="text-center mb-20">
              {showBackButton && (
                <Link 
                  href={backHref} 
                  className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8 animate-slide-in-left"
                  style={{ animationDelay: '0.2s' }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{backText}</span>
                </Link>
              )}
              
              <div className="inline-flex items-center space-x-2 mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
                <Sparkles className="h-6 w-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                {badge && (
                  <Badge variant="outline" className="text-sm backdrop-blur-sm border border-border/50">
                    {badge}
                  </Badge>
                )}
                <Sparkles className="h-6 w-6 text-primary animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gradient-primary animate-gradient-x">
                {title}
              </h1>
              
              {description && (
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  {description}
                </p>
              )}
            </div>

            {/* Page Content */}
            <div ref={sectionRef}>
              {children}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
} 