// Centralized color configuration for the application
export const COLORS = {
  // Hero section colors
  hero: {
    // Background overlay colors
    overlay: {
      light: 'rgba(0, 0, 0, 0.25)',
      dark: 'rgba(0, 0, 0, 0.25)',
    },
    
    // Splash mark colors
    splashPrimary: {
      light: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.35) 0%, rgba(99, 102, 241, 0.28) 30%, rgba(147, 51, 234, 0.20) 60%, rgba(59, 130, 246, 0.08) 100%)',
      dark: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.45) 0%, rgba(147, 51, 234, 0.38) 30%, rgba(126, 34, 206, 0.30) 60%, rgba(168, 85, 247, 0.15) 100%)',
    },
    splashSecondary: {
      light: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.30) 0%, rgba(59, 130, 246, 0.22) 40%, rgba(99, 102, 241, 0.15) 70%, rgba(147, 51, 234, 0.05) 100%)',
      dark: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.40) 0%, rgba(168, 85, 247, 0.32) 40%, rgba(126, 34, 206, 0.25) 70%, rgba(147, 51, 234, 0.12) 100%)',
    },
    splashTertiary: {
      light: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, rgba(147, 51, 234, 0.18) 50%, rgba(59, 130, 246, 0.12) 80%, rgba(99, 102, 241, 0.04) 100%)',
      dark: 'radial-gradient(ellipse at center, rgba(126, 34, 206, 0.35) 0%, rgba(147, 51, 234, 0.28) 50%, rgba(168, 85, 247, 0.22) 80%, rgba(126, 34, 206, 0.10) 100%)',
    },
    
    // Parallax orb colors
    orbsPrimary: {
      light: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.35) 0%, rgba(99, 102, 241, 0.28) 30%, rgba(147, 51, 234, 0.20) 60%, rgba(59, 130, 246, 0.08) 100%)',
      dark: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.35) 0%, rgba(99, 102, 241, 0.28) 30%, rgba(59, 130, 246, 0.20) 60%, rgba(147, 51, 234, 0.08) 100%)',
    },
    orbsSecondary: {
      light: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.35) 0%, rgba(99, 102, 241, 0.28) 30%, rgba(59, 130, 246, 0.20) 60%, rgba(147, 51, 234, 0.08) 100%)',
      dark: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.35) 0%, rgba(99, 102, 241, 0.28) 30%, rgba(59, 130, 246, 0.20) 60%, rgba(147, 51, 234, 0.08) 100%)',
    },
    
    // Floating orb colors
    floatingBlue: {
      light: 'rgba(59, 130, 246, 0.4)',
      dark: 'rgba(34, 197, 94, 0.6)',
    },
    floatingIndigo: {
      light: 'rgba(99, 102, 241, 0.45)',
      dark: 'rgba(20, 184, 166, 0.55)',
    },
    floatingPurple: {
      light: 'rgba(147, 51, 234, 0.35)',
      dark: 'rgba(168, 85, 247, 0.5)',
    },
    floatingTeal: {
      light: 'rgba(20, 184, 166, 0.35)',
      dark: 'rgba(99, 102, 241, 0.55)',
    },
    
    // Text colors
    textName: {
      light: 'bg-gradient-to-r from-white via-white to-gray-100',
      dark: 'bg-gradient-to-r from-white via-white to-gray-100',
    },
    textRole: {
      light: 'text-white',
      dark: 'text-white',
    },
    textDescription: {
      light: 'text-gray-200',
      dark: 'text-gray-200',
    },
    
    // Button colors
    buttonPrimary: {
      light: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
      dark: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700',
    },
    buttonSecondary: {
      light: 'text-gray-900 border-gray-900 hover:bg-gray-900/10',
      dark: 'text-white border-white hover:bg-white/20',
    },
    buttonScroll: {
      light: 'text-gray-900 hover:text-blue-600',
      dark: 'text-white dark:hover:text-yellow-300',
    },
    
    // Border colors
    borderPrimary: {
      light: 'border-blue-500/40',
      dark: 'border-emerald-400/50',
    },
    
    // Shadow colors
    shadowPrimary: {
      light: 'shadow-xl hover:shadow-2xl',
      dark: 'shadow-emerald-500/25 hover:shadow-emerald-500/40',
    },
  },
  
  // Theme-aware color utilities
  theme: {
    // Background colors
    background: {
      primary: 'bg-background',
      secondary: 'bg-secondary',
      card: 'bg-card',
    },
    
    // Text colors
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      accent: 'text-primary',
    },
    
    // Border colors
    border: {
      primary: 'border-border',
      secondary: 'border-muted',
    },
  },
  
  // Gradient utilities
  gradients: {
    primary: {
      light: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      dark: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    },
    secondary: {
      light: 'bg-gradient-to-r from-purple-600 to-pink-600',
      dark: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
  },
} as const;

// Type for hero color keys
type HeroColorKey = keyof typeof COLORS.hero;

// Helper function to get theme-aware colors
export function getThemeColor(
  colorKey: HeroColorKey,
  theme: 'light' | 'dark' = 'light'
): string {
  const colorGroup = COLORS.hero[colorKey];
  if (typeof colorGroup === 'object' && 'light' in colorGroup && 'dark' in colorGroup) {
    return colorGroup[theme as keyof typeof colorGroup] as string;
  }
  return colorGroup as string;
}

// Helper function to get CSS variable colors
export function getCSSVariableColor(variable: string): string {
  return `hsl(var(--${variable}))`;
} 