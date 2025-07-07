'use client';

import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ThemeAwareProps {
  children: React.ReactNode;
  className?: string;
  lightClassName?: string;
  darkClassName?: string;
}

export function ThemeAware({ 
  children, 
  className, 
  lightClassName, 
  darkClassName 
}: ThemeAwareProps) {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      className,
      theme === 'light' ? lightClassName : darkClassName
    )}>
      {children}
    </div>
  );
}

// Utility function for theme-aware class names
export function getThemeAwareClasses(
  baseClasses: string,
  lightClasses: string,
  darkClasses: string
) {
  return `${baseClasses} ${lightClasses} dark:${darkClasses}`;
}

// Predefined theme-aware component classes
export const themeAwareClasses = {
  card: getThemeAwareClasses(
    'card-enhanced',
    'card-enhanced-light',
    'card-enhanced'
  ),
  button: getThemeAwareClasses(
    'btn-primary-enhanced',
    'btn-primary-enhanced-light',
    'btn-primary-enhanced'
  ),
  badge: getThemeAwareClasses(
    'badge-enhanced',
    'badge-enhanced-light',
    'badge-enhanced'
  ),
  input: getThemeAwareClasses(
    'input-enhanced',
    'input-enhanced-light',
    'input-enhanced'
  ),
  textarea: getThemeAwareClasses(
    'textarea-enhanced',
    'textarea-enhanced-light',
    'textarea-enhanced'
  ),
  section: getThemeAwareClasses(
    'page-section',
    'section-separator-light',
    'page-section'
  ),
  spacer: getThemeAwareClasses(
    'space-y-6',
    'component-spacer-light',
    'space-y-6'
  ),
  group: getThemeAwareClasses(
    'space-y-4',
    'card-group-light',
    'space-y-4'
  )
}; 