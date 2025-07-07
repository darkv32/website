'use client';

import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  preloadImages?: string[];
  preloadFonts?: string[];
}

export function PerformanceOptimizer({ 
  preloadImages = [], 
  preloadFonts = [] 
}: PerformanceOptimizerProps) {
  useEffect(() => {
    // Preload critical images
    preloadImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload critical fonts
    preloadFonts.forEach((font) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = font;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Add resource hints for external domains
    const resourceHints = [
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    ];

    resourceHints.forEach(({ rel, href }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      // Remove preload links on unmount
      document.querySelectorAll('link[rel="preload"]').forEach((link) => {
        link.remove();
      });
    };
  }, [preloadImages, preloadFonts]);

  return null;
}

// SEO-friendly image component
interface SEOImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function SEOImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false, 
  className = '' 
}: SEOImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      decoding="async"
    />
  );
}

// SEO-friendly link component
interface SEOLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function SEOLink({ 
  href, 
  children, 
  className = '', 
  external = false 
}: SEOLinkProps) {
  const isExternal = external || href.startsWith('http');
  
  return (
    <a
      href={href}
      className={className}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
} 