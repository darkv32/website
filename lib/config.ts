// Site configuration constants
export const SITE_CONFIG = {
  // Base URL for the site
  baseUrl: 'https://personalwebsite-theta-sand.vercel.app',

  // Site metadata
  site: {
    name: 'Tang Yetong',
    title: 'Tang Yetong - Full Stack Developer in Singapore',
    description: 'Tang Yetong is a full stack developer in Singapore with a background in data analytics, Android and Bitcoin development. Read the technical blog.',
    author: 'Tang Yetong',
    avatar: '/portrait/portrait-1.jpg',
    bio: 'Full Stack Developer and former Data Analyst Intern at Fivetran with a background in government digital services and blockchain technology.',
    email: 'ytyt0792@gmail.com',
    location: 'Singapore',
    timezone: 'Asia/Singapore',
  },

  // The blog's own title and description, used by its page, its feed and its structured data
  blog: {
    title: 'Technical Blog - Tang Yetong',
    description: 'Writing on Bitcoin wallets, Android and what an internship is actually like: BDK-Kotlin tutorials, React Native fixes and internship write-ups.',
  },

  // Social media URLs
  social: {
    github: 'https://github.com/darkv32',
    linkedin: 'https://www.linkedin.com/in/tangyetong/',
    twitter: 'https://twitter.com/tangyetong',
    twitterHandle: '@tangyetong',
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
    themeColorLight: '#eef2f2',
  },
} as const;

export const getFullUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${cleanPath}`;
};
