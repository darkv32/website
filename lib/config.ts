// Site configuration constants
export const SITE_CONFIG = {
  // Base URL for the site
  baseUrl: 'https://tangyeto.ng',
  
  // Site metadata
  site: {
    name: 'Tang Yetong',
    title: 'Tang Yetong - Data Analyst at Fivetran | Technical Blog & Portfolio',
    description: 'Data Analyst at Fivetran with expertise in data engineering, Android development, and blockchain technology.',
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
    googleVerification: 'your-google-verification-code',
    themeColor: '#6366f1',
  },
  
  // Performance configuration
  performance: {
    preloadImages: ['/og-image.jpg'],
    preloadFonts: ['https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'],
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

// Helper function to get site data with centralized URLs
export const getSiteDataWithConfig = () => {
  const siteData = require('../data/site-data.json');
  
  // Replace hardcoded URLs with centralized ones
  if (siteData.projects?.featured) {
    siteData.projects.featured.forEach((project: any) => {
      if (project.live === 'https://tangyetong.dev') {
        project.live = SITE_CONFIG.baseUrl;
      }
    });
  }
  
  return siteData;
}; 