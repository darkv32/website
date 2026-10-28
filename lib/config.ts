// Site configuration constants
export const SITE_CONFIG = {
  // Base URL for the site
  baseUrl: 'https://personalwebsite-theta-sand.vercel.app',
  
  // Site metadata
  site: {
    name: 'Tang Yetong',
    title: 'Tang Yetong - Full Stack Developer | Technical Blog & Portfolio',
    description: 'Full Stack Developer with a background in data analytics at Fivetran, plus expertise in Android development and blockchain technology.',
    author: 'Tang Yetong',
    email: 'ytyt0792@gmail.com',
    location: 'Singapore',
    timezone: 'Asia/Singapore',
  },
  
  // Social media URLs
  social: {
    github: 'https://github.com/darkv32',
    linkedin: 'https://www.linkedin.com/in/tangyetong/',
    twitter: 'https://twitter.com/tangyetong',
  },
  
  // SEO configuration
  seo: {
    defaultKeywords: [
      'Tang Yetong', 'Data Analyst', 'Fivetran', 'Data Engineering',
      'Android Developer', 'Blockchain', 'Singapore', 'GovTech',
      'Python', 'Kotlin', 'SQL', 'Mobile Development', 'Bitcoin',
      'BDK-Kotlin', 'Technical Blog', 'Software Engineering'
    ],
    // Paste the Google Search Console verification code here; the meta tag is omitted while empty
    googleVerification: '' as string,
    themeColor: '#0b0e0f',
  },
  
  // Performance configuration
  performance: {
    preloadImages: [],
    preloadFonts: [],
  },
} as const;

// Helper functions for URL generation
export const getFullUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${cleanPath}`;
};

export const getCanonicalUrl = (path: string = ''): string => {
  return getFullUrl(path);
};

export const getSitemapUrl = (): string => {
  return getFullUrl('/sitemap.xml');
};

export const getRssFeedUrl = (): string => {
  return getFullUrl('/feed.xml');
};
