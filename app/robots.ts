import type { MetadataRoute } from 'next';
import { getFullUrl } from '@/lib/config';

/* The AI crawlers and assistants that read pages to answer questions or to build search indexes. A crawler obeys the most specific group that names it, so
   they are listed on purpose: anyone reading this file can see they are welcome, and a later "disallow" for one product would be a one-line change. */
const AI_CRAWLERS = [
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
  'DuckAssistBot', 'MistralAI-User', 'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: getFullUrl('/sitemap.xml'),
  };
}
