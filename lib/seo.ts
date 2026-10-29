import type { Metadata } from 'next';
import { getAllBlogPosts, getExperienceData, type BlogPost } from './data';
import { SITE_CONFIG, getFullUrl } from './config';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /** Article only: the category and tags, which become `article:section` and `article:tag`. */
  section?: string;
  tags?: string[];
}

const { site, social, blog } = SITE_CONFIG;
const sameAs = [social.github, social.linkedin, social.twitter];

/* Pages with no `openGraph.images` pick up the `opengraph-image` file that sits next to them, so none is set here. */
export function createMetadata(config: SEOConfig): Metadata {
  const fullUrl = config.url ? getFullUrl(config.url) : SITE_CONFIG.baseUrl;
  const isArticle = config.type === 'article';

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords ?? [...SITE_CONFIG.seo.defaultKeywords],
    applicationName: site.name,
    authors: [{ name: site.author, url: SITE_CONFIG.baseUrl }],
    creator: site.author,
    publisher: site.author,
    category: 'technology',
    formatDetection: { telephone: false, date: false, address: false, email: false },
    metadataBase: new URL(SITE_CONFIG.baseUrl),
    alternates: {
      canonical: fullUrl,
      types: { 'application/rss+xml': [{ url: getFullUrl('/feed.xml'), title: `${site.name} - RSS feed` }] },
    },
    openGraph: {
      type: config.type ?? 'website',
      locale: 'en_US',
      url: fullUrl,
      title: config.title,
      description: config.description,
      siteName: site.name,
      ...(isArticle && {
        publishedTime: config.publishedTime,
        modifiedTime: config.modifiedTime,
        authors: [SITE_CONFIG.baseUrl],
        section: config.section,
        tags: config.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      site: social.twitterHandle,
      creator: social.twitterHandle,
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
  };
}

/* Structured data. Every page ships one JSON-LD graph whose nodes point at each other by @id, so the site, its owner and the page
   are described once and a search engine can join them up. */
const PERSON_ID = `${SITE_CONFIG.baseUrl}/#person`;
const WEBSITE_ID = `${SITE_CONFIG.baseUrl}/#website`;
const BLOG_ID = `${getFullUrl('/blog')}#blog`;

type Node = Record<string, unknown>;

const graph = (...nodes: Node[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

const websiteNode = (): Node => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_CONFIG.baseUrl,
  name: site.name,
  description: site.description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
});

function personNode(): Node {
  const { timeline } = getExperienceData();
  const role = timeline.find((r) => r.current);

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.author,
    url: SITE_CONFIG.baseUrl,
    email: site.email,
    image: getFullUrl(site.avatar),
    description: site.bio,
    address: { '@type': 'PostalAddress', addressLocality: site.location, addressCountry: 'SG' },
    jobTitle: role?.title,
    worksFor: role && { '@type': 'Organization', name: role.company },
    alumniOf: timeline
      .filter((r) => r.kind === 'Education')
      .map((r) => ({ '@type': 'EducationalOrganization', name: r.company })),
    sameAs,
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

const breadcrumbNode = (trail: Array<{ name: string; path: string }>): Node => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: getFullUrl(crumb.path),
  })),
});

interface PageInfo {
  type: 'WebPage' | 'ProfilePage' | 'ContactPage';
  /** The page's path, '/' for the front page. */
  path: string;
  /** Short name, used in the breadcrumb trail and the page's name. */
  name: string;
  description: string;
}

/** A plain page: the site, its owner, the page itself and its breadcrumb trail. */
export function generatePageData({ type, path, name, description }: PageInfo) {
  const url = getFullUrl(path);
  const isHome = path === '/';

  return graph(
    {
      '@type': type,
      '@id': `${url}#webpage`,
      url,
      name: isHome ? site.title : `${name} - ${site.name}`,
      description,
      inLanguage: 'en',
      isPartOf: { '@id': WEBSITE_ID },
      ...(type === 'ProfilePage' ? { mainEntity: { '@id': PERSON_ID } } : { about: { '@id': PERSON_ID } }),
    },
    ...(isHome ? [] : [breadcrumbNode([{ name: 'Home', path: '/' }, { name, path }])]),
    websiteNode(),
    personNode(),
  );
}

/** The blog's front page, with the list of posts. */
export function generateBlogData() {
  return graph(
    {
      '@type': 'Blog',
      '@id': BLOG_ID,
      url: getFullUrl('/blog'),
      name: blog.title,
      description: blog.description,
      inLanguage: 'en',
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      blogPost: getAllBlogPosts().map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: getFullUrl(`/blog/${post.slug}`),
        datePublished: post.publishedAt,
      })),
    },
    breadcrumbNode([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
    websiteNode(),
    personNode(),
  );
}

export function generateArticleData(post: BlogPost) {
  const url = getFullUrl(`/blog/${post.slug}`);
  const author = { '@id': PERSON_ID, '@type': 'Person', name: site.author, url: SITE_CONFIG.baseUrl };

  return graph(
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      image: getFullUrl(`/blog/${post.slug}/opengraph-image`),
      author,
      publisher: author,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': BLOG_ID },
      inLanguage: 'en',
      keywords: post.tags.join(', '),
      articleSection: post.category,
      wordCount: post.content.split(/\s+/).length,
      timeRequired: `PT${post.readTime}M`,
    },
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    websiteNode(),
    personNode(),
  );
}
