/* Which visitors count as an AI crawler or agent, from what they call themselves. Pure, so the proxy and the tests can both use it.

   This can only see visitors that identify themselves. A crawler or an agent driving an ordinary browser sends an ordinary browser's User-Agent and looks like a person. */

export type VisitorKind =
  /** Collects pages to train models. */
  | 'ai-training'
  /** Fetches a page because someone just asked an assistant about it. */
  | 'ai-assistant'
  /** Builds the index an AI search product answers from. */
  | 'ai-search'
  /** An ordinary search engine, listed for comparison. */
  | 'search'
  /** A script or headless browser: how many agents and scrapers show up, but it could be anyone. */
  | 'automation';

export interface Visitor {
  name: string;
  kind: VisitorKind;
}

/* Order matters: the first match wins, so specific tokens come before general ones. */
const KNOWN: Array<Visitor & { match: RegExp }> = [
  { name: 'ChatGPT-User', kind: 'ai-assistant', match: /ChatGPT-User/i },
  { name: 'Claude-User', kind: 'ai-assistant', match: /Claude-User/i },
  { name: 'Perplexity-User', kind: 'ai-assistant', match: /Perplexity-User/i },
  { name: 'MistralAI-User', kind: 'ai-assistant', match: /MistralAI-User/i },
  { name: 'Meta-ExternalFetcher', kind: 'ai-assistant', match: /meta-externalfetcher/i },
  { name: 'DuckAssistBot', kind: 'ai-assistant', match: /DuckAssistBot/i },

  { name: 'OAI-SearchBot', kind: 'ai-search', match: /OAI-SearchBot/i },
  { name: 'Claude-SearchBot', kind: 'ai-search', match: /Claude-SearchBot/i },
  { name: 'PerplexityBot', kind: 'ai-search', match: /PerplexityBot/i },
  { name: 'YouBot', kind: 'ai-search', match: /YouBot/i },

  { name: 'GPTBot', kind: 'ai-training', match: /GPTBot/i },
  { name: 'ClaudeBot', kind: 'ai-training', match: /ClaudeBot/i },
  { name: 'Claude-Web', kind: 'ai-training', match: /Claude-Web/i },
  { name: 'anthropic-ai', kind: 'ai-training', match: /anthropic-ai/i },
  { name: 'CCBot', kind: 'ai-training', match: /CCBot/i },
  { name: 'Bytespider', kind: 'ai-training', match: /Bytespider/i },
  { name: 'Amazonbot', kind: 'ai-training', match: /Amazonbot/i },
  { name: 'Meta-ExternalAgent', kind: 'ai-training', match: /meta-externalagent/i },
  { name: 'cohere-ai', kind: 'ai-training', match: /cohere-ai/i },
  { name: 'Diffbot', kind: 'ai-training', match: /Diffbot/i },
  { name: 'ImagesiftBot', kind: 'ai-training', match: /ImagesiftBot/i },
  { name: 'Timpibot', kind: 'ai-training', match: /Timpibot/i },
  { name: 'GoogleOther', kind: 'ai-training', match: /GoogleOther/i },

  { name: 'Googlebot', kind: 'search', match: /Googlebot/i },
  { name: 'Bingbot', kind: 'search', match: /bingbot/i },
  { name: 'Applebot', kind: 'search', match: /Applebot/i },
  { name: 'DuckDuckBot', kind: 'search', match: /DuckDuckBot/i },
  { name: 'YandexBot', kind: 'search', match: /YandexBot/i },
  { name: 'Baiduspider', kind: 'search', match: /Baiduspider/i },

  { name: 'HeadlessChrome', kind: 'automation', match: /HeadlessChrome/i },
  { name: 'Playwright', kind: 'automation', match: /Playwright/i },
  { name: 'Puppeteer', kind: 'automation', match: /Puppeteer/i },
  { name: 'Scrapy', kind: 'automation', match: /Scrapy/i },
  { name: 'python-requests', kind: 'automation', match: /python-requests/i },
  { name: 'python-httpx', kind: 'automation', match: /python-httpx/i },
  { name: 'aiohttp', kind: 'automation', match: /aiohttp/i },
  { name: 'curl', kind: 'automation', match: /^curl\//i },
  { name: 'wget', kind: 'automation', match: /^wget\//i },
  { name: 'Go-http-client', kind: 'automation', match: /^Go-http-client/i },
  { name: 'node-fetch', kind: 'automation', match: /^(?:node-fetch|undici)/i },
  { name: 'axios', kind: 'automation', match: /^axios\//i },
  { name: 'okhttp', kind: 'automation', match: /^okhttp/i },
  { name: 'Java', kind: 'automation', match: /^Java\//i },
  { name: 'libwww-perl', kind: 'automation', match: /^libwww-perl/i },
  { name: 'Bun', kind: 'automation', match: /^Bun\//i },
];

/** The crawler or agent behind a User-Agent header, or null for anything that looks like an ordinary browser. */
export function classify(userAgent: string | null | undefined): Visitor | null {
  if (!userAgent) return null;
  for (const k of KNOWN) if (k.match.test(userAgent)) return { name: k.name, kind: k.kind };
  return null;
}

const STATIC_PATHS = new Set(['/', '/about', '/experience', '/blog', '/hobbies', '/contact', '/guestbook', '/api/guestbook', '/llms.txt', '/robots.txt', '/sitemap.xml', '/feed.xml', '/resume.pdf']);

/** The path to count a visit under. Only the site's real pages and posts get a row of their own; everything else shares "(other)", so a flood of made-up URLs cannot grow the log. */
export function bucketPath(pathname: string, postSlugs: ReadonlySet<string>): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (STATIC_PATHS.has(path)) return path;
  const post = /^\/blog\/([a-z0-9-]+)$/.exec(path);
  if (post && postSlugs.has(post[1])) return path;
  return '(other)';
}
