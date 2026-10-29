# Tang Yetong - Personal Portfolio

A responsive personal portfolio and technical blog built with Next.js, TypeScript, and Tailwind CSS.

Live site: https://personalwebsite-theta-sand.vercel.app

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React, React Icons
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

The front page is the whole site: hero, experience, blog, hobbies and contact are bands on `/`, and the nav tabs scroll between them. `/blog` is the full post list and `/blog/[slug]` the articles.

- `lib/config.ts` - Base URL, author details, social links, SEO keywords
- `data/site-data.json` - Experience timeline
- `data/blog-data.json` - Blog posts (Markdown content)
- `components/sections/hero.tsx` - Hero copy and photos
- `components/field/off-clock-band.tsx` - Hobbies band

### Styling

The front page is styled by `components/field/field.module.css`. Blog articles use Tailwind with the CSS variables in `app/globals.css` (configured in `tailwind.config.ts`); the rendered Markdown is styled by `.article-content` there.

### Components

- `components/field/` - The front page bands and their shared section links
- `components/sections/` - Hero
- `components/blog/` - Article, table of contents and related-post card
- `components/ui/` - Radix-based primitives

## 🚀 Deployment

The site is deployed on Vercel. Pushing to `main` triggers a deploy once the repository is connected to a Vercel project.

If you change the domain, update `baseUrl` in `lib/config.ts` and the `Sitemap:` line in `public/robots.txt`.

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
