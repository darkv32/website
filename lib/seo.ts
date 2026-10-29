import type { Metadata } from 'next';
import { getExperienceData, type BlogPost } from './data';
import { SITE_CONFIG, getFullUrl } from './config';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  /** Absolute URL. Pages without one use the site's generated `opengraph-image`. */
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

const { site, social } = SITE_CONFIG;
const sameAs = [social.github, social.linkedin, social.twitter];

export function createMetadata(config: SEOConfig): Metadata {
  const fullUrl = config.url ? getFullUrl(config.url) : SITE_CONFIG.baseUrl;
  const images = config.image ? [{ url: config.image, width: 1200, height: 630, alt: config.title }] : undefined;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords ?? [...SITE_CONFIG.seo.defaultKeywords],
    authors: [{ name: site.author }],
    creator: site.author,
    publisher: site.author,
    metadataBase: new URL(SITE_CONFIG.baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: config.type ?? 'website',
      locale: 'en_US',
      url: fullUrl,
      title: config.title,
      description: config.description,
      siteName: site.title,
      images,
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      creator: social.twitterHandle,
      images: config.image ? [config.image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: SITE_CONFIG.seo.googleVerification
      ? { google: SITE_CONFIG.seo.googleVerification }
      : undefined,
    icons: {
      icon: '/logo-white.png',
      apple: '/logo-white.png',
    },
  };
}

export function generateWebsiteData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.title,
    description: site.description,
    url: SITE_CONFIG.baseUrl,
    author: {
      '@type': 'Person',
      name: site.author,
      email: site.email,
      url: SITE_CONFIG.baseUrl,
      sameAs,
    },
    publisher: {
      '@type': 'Person',
      name: site.author,
    },
  };
}

export function generatePersonData() {
  const role = getExperienceData().timeline.find((r) => r.current);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.author,
    email: site.email,
    url: SITE_CONFIG.baseUrl,
    image: getFullUrl(site.avatar),
    description: site.bio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location,
    },
    sameAs,
    jobTitle: role?.title,
    worksFor: role && {
      '@type': 'Organization',
      name: role.company,
    },
    knowsAbout: [
      'Data Engineering',
      'Android Development',
      'Blockchain Technology',
      'Python',
      'Kotlin',
      'SQL',
      'Bitcoin Development',
    ],
  };
}

export function generateArticleData(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    author: {
      '@type': 'Person',
      name: site.author,
      url: SITE_CONFIG.baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: site.author,
      url: SITE_CONFIG.baseUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getFullUrl(`/blog/${post.slug}`),
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };
}

export function generateOrganizationData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.title,
    url: SITE_CONFIG.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: getFullUrl('/logo-white.png'),
    },
    sameAs,
  };
}
