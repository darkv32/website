import { Metadata } from 'next';
import { getSiteData } from './data';
import { SITE_CONFIG, getFullUrl } from './config';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const { site } = getSiteData();
  const fullUrl = config.url ? getFullUrl(config.url) : SITE_CONFIG.baseUrl;
  const imageUrl = config.image ? getFullUrl(config.image) : getFullUrl('/og-image.jpg');

  return {
    title: {
      default: config.title,
      template: '%s | Tang Yetong'
    },
    description: config.description,
    keywords: config.keywords || [...SITE_CONFIG.seo.defaultKeywords],
    authors: [{ name: config.author || site.author.name }],
    creator: site.author.name,
    publisher: site.author.name,
    metadataBase: new URL(SITE_CONFIG.baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: config.type || 'website',
      locale: 'en_US',
      url: fullUrl,
      title: config.title,
      description: config.description,
      siteName: site.title,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      creator: '@tangyetong',
      images: [imageUrl],
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
    verification: {
      google: SITE_CONFIG.seo.googleVerification,
    },
    other: {
      'theme-color': SITE_CONFIG.seo.themeColor,
      'color-scheme': 'light dark',
    },
  };
}

export function generateStructuredData(type: 'website' | 'person' | 'article', data: any) {
  const { site } = getSiteData();

  switch (type) {
    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.title,
        description: site.description,
        url: SITE_CONFIG.baseUrl,
        author: {
          '@type': 'Person',
          name: site.author.name,
          email: site.author.email,
          url: SITE_CONFIG.baseUrl,
          sameAs: [
            site.author.social.github,
            site.author.social.linkedin,
            site.author.social.twitter,
          ],
        },
        publisher: {
          '@type': 'Person',
          name: site.author.name,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_CONFIG.baseUrl}/blog?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

    case 'person':
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.author.name,
        email: site.author.email,
        url: SITE_CONFIG.baseUrl,
        image: site.author.avatar,
        description: site.author.bio,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.author.location,
        },
        sameAs: [
          site.author.social.github,
          site.author.social.linkedin,
          site.author.social.twitter,
        ],
        jobTitle: 'Data Analyst',
        worksFor: {
          '@type': 'Organization',
          name: 'Fivetran',
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

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.excerpt,
        image: data.featuredImage,
        author: {
          '@type': 'Person',
          name: data.author.name,
          url: SITE_CONFIG.baseUrl,
        },
        publisher: {
          '@type': 'Person',
          name: site.author.name,
          url: SITE_CONFIG.baseUrl,
        },
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_CONFIG.baseUrl}/blog/${data.slug}`,
        },
        keywords: data.tags.join(', '),
        articleSection: data.category,
        wordCount: data.content.split(' ').length,
      };

    default:
      return null;
  }
}

export function generateBreadcrumbData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getFullUrl(item.url),
    })),
  };
}

export function generateOrganizationData() {
  const { site } = getSiteData();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.title,
    url: SITE_CONFIG.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: getFullUrl('/logo.png'),
    },
    sameAs: [
      site.author.social.github,
      site.author.social.linkedin,
      site.author.social.twitter,
    ],
  };
} 