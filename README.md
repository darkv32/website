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

Most site content lives in data files rather than components:

- `data/site-data.json` - Site metadata, hero, about, skills, projects and contact info
- `data/blog-data.json` - Blog posts
- `lib/config.ts` - Base URL, contact details, SEO keywords and social links

Some pages still hold their content inline:

- `components/pages/experience-detail.tsx` - Full work experience list
- `components/pages/about-detail.tsx` and `components/sections/about.tsx` - About copy
- `components/sections/featured-experience.tsx` - Landing page experience highlights
- `app/layout.tsx` - Default SEO metadata

### Styling

The design system uses CSS variables defined in `app/globals.css`, with Tailwind configured in `tailwind.config.ts`.

### Components

- `components/ui/` - Radix-based primitives
- `components/sections/` - Landing page sections
- `components/pages/` - Page-level content for About, Experience, Contact and Blog
- `components/blog/` - Blog and card components

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
