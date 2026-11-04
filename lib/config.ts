// Site configuration constants
/* The site's public address. Set NEXT_PUBLIC_SITE_URL (on Vercel, or in .env.local) to move to a custom domain without touching code;
   the sitemap, robots, feed, canonical links, share images and structured data all follow it. */
const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://personalwebsite-theta-sand.vercel.app').replace(/\/+$/, '');

export const SITE_CONFIG = {
  // Base URL for the site
  baseUrl,

  // Site metadata
  site: {
    name: 'Tang Yetong',
    title: 'Tang Yetong - Full Stack Developer in Singapore',
    description: 'Tang Yetong is a full stack developer in Singapore working in data analytics, Android and Bitcoin. Blog on a Raspberry Pi arr stack, BDK-Kotlin and more.',
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
    description: 'Writing on homelabs, Bitcoin wallets and Android: a Raspberry Pi arr stack with Jellyfin, BDK-Kotlin tutorials, React Native fixes and internship write-ups.',
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
      'BDK-Kotlin', 'Technical Blog', 'Software Engineering',
      'Arr Stack', 'Jellyfin', 'Raspberry Pi', 'Homelab', 'Self-hosted'
    ],
    // Paste the Google Search Console verification code here (the content value of the meta tag, not the whole tag); the meta tag is omitted while empty
    googleVerification: '' as string,
    // Same for Bing Webmaster Tools (the msvalidate.01 value). Bing's index also feeds ChatGPT search, Copilot and DuckDuckGo
    bingVerification: '' as string,
    // Key for IndexNow, which tells Bing and others the moment a page changes. Must match the file public/<key>.txt, see scripts/indexnow.ts
    indexNowKey: 'b7e41c9d0a5f4e28a6d3c1f08e92b457',
    themeColor: '#0b0e0f',
    themeColorLight: '#eef2f2',
  },
} as const;

export const getFullUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${cleanPath}`;
};
