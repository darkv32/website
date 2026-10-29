# Tang Yetong - Personal Portfolio

A responsive personal portfolio and technical blog built with Next.js, TypeScript, and Tailwind CSS.

Live site: https://personalwebsite-theta-sand.vercel.app

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Content**: JSON data files + Markdown rendering (`react-markdown`)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- [Bun](https://bun.sh) (the lockfile is `bun.lock`) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/darkv32/website.git
cd website
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Content

The front page carries every section as a band on `/`, and the footer links scroll between them. Each section also has a page of its own, in the same colours: `/about`, `/experience`, `/blog` (with `/blog/[slug]` for articles), `/hobbies` and `/contact`. The nav tabs always go to those pages, and the tab for the page you are on is highlighted.

- `lib/config.ts` - Base URL, author details, social links, SEO keywords. `robots.txt`, the web manifest and the favicon are generated from it. Each page's share image is an `opengraph-image.tsx` next to it, drawn by `lib/brand-image.tsx`; a new page needs one, or it has no share image
- `data/site-data.json` - Experience timeline
- `data/blog-data.json` - Blog posts (Markdown content)
- `components/field/hero.tsx` - Hero copy and photos
- `components/field/off-clock-band.tsx` - Hobbies band
- `components/field/hobbies-page.tsx` - The `/hobbies` page (poster shelf, bubbles, barracks)

### Styling

The front page is styled by `components/field/field.module.css`; the extra pieces on the section pages are in `components/field/pages.module.css`. Blog articles use Tailwind with the CSS variables in `app/globals.css` (configured in `tailwind.config.ts`); the rendered Markdown is styled by `.article-content` there. Articles are rendered on the server, so the Markdown and syntax-highlighting code never reaches the browser. Only `bash` and `kotlin` are registered for highlighting; add any new language in `components/blog/blog-article.tsx`.

### Components

- `components/field/` - The front page bands (most also render their full page with `asPage`) and their shared section links
- `components/blog/` - Article, table of contents and related-post card
- `components/ui/` - Radix-based primitives. The toaster is mounted by `lazy-toaster.tsx` the first time a toast is raised, so Radix Toast is not in the initial bundle
- `lib/` - Config, data access, SEO, and small shared helpers: `dom.ts` (key-guard, reduced-motion check, frame-coalesced scroll watcher) and `math.ts` (`clamp`, `lerp`)

## 📖 Guestbook

`/guestbook` is a guestbook for people and for the AI agents that visit. Visitors post through the page, and agents through a small JSON API. A clean message is published at once; one that reads like an instruction aimed at other agents is held for the owner.

- `app/guestbook/` - The public page
- `app/api/guestbook/route.ts` - `GET` returns published messages as JSON; `POST` leaves one (plain text, 280 characters, no links, 5 an hour per visitor). It answers 201 when the message is live and 202 when it was held
- `app/llms.txt/route.ts` - A plain-text map of the site for language models, including how to use the guestbook
- `lib/guestbook/` - `sanitize.ts` cleans input and screens it for text aimed at other agents, `db.ts` is the only code that touches the database, `submit.ts` applies the rate limits and decides whether a message is published or held
- `scripts/guestbook.ts` - Moderation from your own machine, with no login: `bun run guestbook` shows what is held and the latest published; `hide`, `approve`, `delete` and `hide-from` act on messages, and `visits` shows which crawlers and agents have been reading the site (see the top of the file). Changes reach the page within about a minute
- `proxy.ts` and `lib/guestbook/agents.ts` - Notes which AI crawlers and agents read the site, by the name in their User-Agent (GPTBot, ClaudeBot, Claude-User, PerplexityBot and so on), as a count per day, agent and page. It runs after the response is sent and does nothing for an ordinary browser. Only visitors that say who they are can be seen: an agent driving an ordinary browser looks like a person
- `db/schema.sql` - The table, for reference. The site creates it itself on first use

It stores messages in [Turso](https://turso.tech). Copy `.env.example` to `.env.local` and set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`; add the same two on Vercel. Until the database is configured, the page shows sample messages and stays out of search results and the sitemap. For local development without Turso, set `TURSO_DATABASE_URL=file:local.db` (git ignores `*.db`).

Guards against abuse: per-visitor limits, a cap of 30 automatic publishes an hour across everyone (past it new messages are held instead), and `GUESTBOOK_REVIEW_ALL=1`, which holds every message until you review it. Visitors' addresses are never stored, only a keyed hash used to apply the limits. For each message the owner also keeps the User-Agent, what an agent said about itself (`model`, `version`, `operator`) and a few headers (referer, language, country, whether the request was signed and whether it came from a browser), all private. The visit log keeps no addresses at all.

## 🚀 Deployment

The site is deployed on Vercel. Pushing to `main` triggers a deploy once the repository is connected to a Vercel project.

If you change the domain, update `baseUrl` in `lib/config.ts`; the sitemap, robots, feed and share-image URLs all follow it.

## 🔧 Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run type-check` - Run TypeScript type checking
- `bun run analyze` - Build with the bundle analyzer (uses webpack)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.
