# Tang Yetong - Personal Portfolio

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first approach with optimized layouts for all devices
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Performance Optimized**: Built with Next.js for optimal performance
- **SEO Friendly**: Comprehensive SEO optimization and meta tags
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels
- **Interactive**: Smooth scroll navigation with active section highlighting
- **Contact Form**: Functional contact form with validation

## 🛠 Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── ui/              # Reusable UI components
│   ├── navigation.tsx   # Main navigation
│   ├── footer.tsx       # Footer component
│   └── theme-provider.tsx
├── lib/                  # Utility functions
│   └── utils.ts
└── hooks/               # Custom React hooks
    └── use-toast.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tangyetong/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Personal Information

Update the following files with your personal information:

- `components/sections/hero.tsx` - Hero section content
- `components/sections/about.tsx` - About section biography
- `components/sections/experience.tsx` - Work experience and achievements
- `components/sections/projects.tsx` - Project showcase
- `components/sections/skills.tsx` - Skills and technologies
- `components/sections/contact.tsx` - Contact information
- `app/layout.tsx` - SEO metadata

### Styling

The design system uses CSS variables defined in `app/globals.css`. Customize colors, spacing, and animations by modifying these variables.

### Components

All components are built with TypeScript and use Tailwind CSS for styling. UI components are based on Radix UI primitives for accessibility.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `out` folder to Netlify

### Environment Variables

For contact form functionality, you may need to set up:

- `NEXT_PUBLIC_CONTACT_EMAIL` - Your contact email
- `EMAILJS_SERVICE_ID` - EmailJS service ID (if using EmailJS)
- `EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `EMAILJS_PUBLIC_KEY` - EmailJS public key

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component for optimal loading
- **Code Splitting**: Automatic code splitting with Next.js

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal portfolio, but if you find bugs or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 📞 Contact

- **Email**: ytyt0792@gmail.com
- **LinkedIn**: [linkedin.com/in/tangyetong](https://linkedin.com/in/tang-yetong)
- **GitHub**: [github.com/tangyetong](https://github.com/fivetran-tangyetong)

---

Built with ❤️ by Tang Yetong