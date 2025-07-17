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
      light: 'radial-gradient(ellipse at center, rgba(173, 216, 230, 0.18) 0%, rgba(173, 216, 230, 0.12) 30%, rgba(173, 216, 230, 0.08) 60%, rgba(173, 216, 230, 0.04) 100%)',
      dark: 'radial-gradient(ellipse at center, rgba(128, 128, 128, 0.22) 0%, rgba(160, 160, 160, 0.18) 30%, rgba(192, 192, 192, 0.14) 60%, rgba(220, 220, 220, 0.08) 100%)',
    },
    splashSecondary: {
      light: 'radial-gradient(ellipse at center, rgba(173, 216, 230, 0.14) 0%, rgba(173, 216, 230, 0.10) 40%, rgba(173, 216, 230, 0.07) 70%, rgba(173, 216, 230, 0.02) 100%)',
      dark: 'radial-gradient(ellipse at center, rgba(160, 160, 160, 0.16) 0%, rgba(192, 192, 192, 0.12) 40%, rgba(220, 220, 220, 0.09) 70%, rgba(240, 240, 240, 0.04) 100%)',
    },
    splashTertiary: {
      light: 'radial-gradient(ellipse at center, rgba(173, 216, 230, 0.10) 0%, rgba(173, 216, 230, 0.07) 50%, rgba(173, 216, 230, 0.05) 80%, rgba(173, 216, 230, 0.01) 100%)',
      dark: 'radial-gradient(ellipse at center, rgba(192, 192, 192, 0.13) 0%, rgba(220, 220, 220, 0.10) 50%, rgba(240, 240, 240, 0.08) 80%, rgba(255, 255, 255, 0.03) 100%)',
    },
    
    // Parallax orb colors
    orbsPrimary: {
      light: 'rgba(99, 102, 241, 0.25)',
      dark: 'rgba(20, 184, 166, 0.25)',
    },
    orbsSecondary: {
      light: 'rgba(20, 184, 166, 0.25)',
      dark: 'rgba(99, 102, 241, 0.25)',
    },
    
    // Text colors
    textName: {
      light: 'text-white',
      dark: 'text-white',
    },
    textRole: {
      light: 'text-white',
      dark: 'text-white',
    },
    textDescription: {
      light: 'text-white',
      dark: 'text-white',
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