# Centralized Configuration System

This document explains the centralized configuration system implemented for the website to manage all site-wide constants and URLs in one location.

## 📁 Configuration Files

### `lib/config.ts` - Main Configuration File

This is the central configuration file that contains all site-wide constants and helper functions.

#### Structure

```typescript
export const SITE_CONFIG = {
  // Base URL for the site
  baseUrl: 'https://tangyetong.dev',
  
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
    github: 'https://github.com/fivetran-tangyetong',
    linkedin: 'https://www.linkedin.com/in/tang-yetong/',
    twitter: 'https://twitter.com/tangyetong',
  },
  
  // SEO configuration
  seo: {
    defaultKeywords: [...],
    googleVerification: 'your-google-verification-code',
    themeColor: '#6366f1',
  },
  
  // Performance configuration
  performance: {
    preloadImages: ['/og-image.jpg'],
    preloadFonts: ['https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'],
  },
} as const;
```

## 🔧 Helper Functions

### URL Generation Functions

```typescript
// Generate full URL with base URL
getFullUrl(path: string): string

// Generate canonical URL
getCanonicalUrl(path: string): string

// Get sitemap URL
getSitemapUrl(): string

// Get RSS feed URL
getRssFeedUrl(): string
```

### Usage Examples

```typescript
import { SITE_CONFIG, getFullUrl, getCanonicalUrl } from '@/lib/config';

// Get full URL for a page
const aboutUrl = getFullUrl('/about'); // https://tangyetong.dev/about

// Get canonical URL
const canonicalUrl = getCanonicalUrl('/blog/post-1'); // https://tangyetong.dev/blog/post-1

// Access site configuration
const siteName = SITE_CONFIG.site.name; // "Tang Yetong"
const baseUrl = SITE_CONFIG.baseUrl; // "https://tangyetong.dev"
```

## 📍 Files Updated

The following files have been updated to use the centralized configuration:

### Core Files
- `lib/config.ts` - New centralized configuration file
- `lib/seo.ts` - Updated to use centralized URLs and constants
- `app/sitemap.ts` - Updated to use centralized base URL
- `app/feed.xml/route.ts` - Updated to use centralized base URL

### Components
- `components/seo/structured-data.tsx` - Updated to use centralized URL generation
- `app/layout.tsx` - Updated to use centralized performance configuration

### Pages
- `app/blog/page.tsx` - Updated structured data URLs
- `app/experience/page.tsx` - Updated structured data URLs
- `app/contact/page.tsx` - Updated structured data URLs

### Static Files
- `public/robots.txt` - Already contains correct sitemap URL

## 🚀 Benefits

### 1. **Single Source of Truth**
- All URLs and constants are defined in one place
- Easy to update domain or configuration
- Consistent across the entire application

### 2. **Type Safety**
- TypeScript ensures all configuration values are properly typed
- Prevents typos and runtime errors
- Better IDE support with autocomplete

### 3. **Maintainability**
- Easy to change domain name or configuration
- No need to search and replace across multiple files
- Clear separation of concerns

### 4. **Scalability**
- Easy to add new configuration options
- Helper functions for common operations
- Consistent patterns across the application

## 🔄 Migration Guide

### Before (Hardcoded URLs)
```typescript
const baseUrl = 'https://tangyetong.dev';
const fullUrl = `${baseUrl}/blog/${slug}`;
const sitemapUrl = `${baseUrl}/sitemap.xml`;
```

### After (Centralized Configuration)
```typescript
import { SITE_CONFIG, getFullUrl, getSitemapUrl } from '@/lib/config';

const fullUrl = getFullUrl(`/blog/${slug}`);
const sitemapUrl = getSitemapUrl();
```

## 📋 Configuration Categories

### 1. **Site Information**
- Base URL
- Site name, title, description
- Author information
- Contact details

### 2. **Social Media**
- GitHub, LinkedIn, Twitter URLs
- Consistent social media presence

### 3. **SEO Configuration**
- Default keywords
- Google verification code
- Theme color
- Meta information

### 4. **Performance**
- Preload images
- Preload fonts
- Resource optimization

## 🛠️ Adding New Configuration

To add new configuration options:

1. **Add to SITE_CONFIG**
```typescript
export const SITE_CONFIG = {
  // ... existing config
  newCategory: {
    option1: 'value1',
    option2: 'value2',
  },
} as const;
```

2. **Create helper functions if needed**
```typescript
export const getNewOption = (): string => {
  return SITE_CONFIG.newCategory.option1;
};
```

3. **Update documentation**
- Add to this file
- Update relevant component documentation

## 🔍 Best Practices

### 1. **Use Helper Functions**
- Prefer `getFullUrl()` over string concatenation
- Use specific helper functions for common operations
- Maintain consistency across the application

### 2. **Type Safety**
- Always use `as const` for configuration objects
- Define proper TypeScript interfaces when needed
- Use strict typing for configuration values

### 3. **Documentation**
- Keep this file updated with new configuration options
- Document helper functions and their usage
- Provide examples for common use cases

### 4. **Testing**
- Test configuration changes thoroughly
- Verify all URLs are correctly generated
- Check that SEO metadata is properly applied

## 🚨 Important Notes

1. **Environment Variables**: For production deployments, consider moving sensitive configuration to environment variables
2. **Caching**: Configuration is loaded at build time, so changes require a rebuild
3. **Validation**: Consider adding validation for configuration values
4. **Backwards Compatibility**: When changing configuration, ensure existing code continues to work

This centralized configuration system provides a robust foundation for managing all site-wide constants and ensures consistency across the entire application. 