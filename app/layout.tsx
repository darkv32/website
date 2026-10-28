import './globals.css';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/seo/structured-data';
import { generateMetadata, generateStructuredData, generateOrganizationData } from '@/lib/seo';
import { PerformanceOptimizer } from '@/components/seo/performance-optimizer';
import { SITE_CONFIG } from '@/lib/config';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const body = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = generateMetadata({
  title: 'Tang Yetong - Full Stack Developer | Technical Blog & Portfolio',
  description: 'Full Stack Developer with a background in data analytics at Fivetran, plus expertise in Android development and blockchain technology. Technical blog covering Bitcoin development, mobile apps, and software engineering insights.',
  keywords: [
    'Tang Yetong', 'Data Analyst', 'Fivetran', 'Data Engineering',
    'Android Developer', 'Blockchain', 'Singapore', 'GovTech',
    'Python', 'Kotlin', 'SQL', 'Mobile Development', 'Bitcoin',
    'BDK-Kotlin', 'Technical Blog', 'Software Engineering'
  ],
  type: 'website',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteData = generateStructuredData('website', {});
  const personData = generateStructuredData('person', {});
  const organizationData = generateOrganizationData();

  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme || theme === 'system') {
                    localStorage.setItem('theme', 'dark');
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
        <meta name="theme-color" content="#0b0e0f" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Navigation />
            <main className="relative flex flex-1 flex-col">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        
        {/* Structured Data */}
        <StructuredData data={websiteData} />
        <StructuredData data={personData} />
        <StructuredData data={organizationData} />
        
        {/* Performance Optimizer */}
        <PerformanceOptimizer 
          preloadImages={[...SITE_CONFIG.performance.preloadImages]}
          preloadFonts={[...SITE_CONFIG.performance.preloadFonts]}
        />
        
        {/* Vercel Speed Insights and Analytics */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}