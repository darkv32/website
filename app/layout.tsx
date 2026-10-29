import './globals.css';
import type { Viewport } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { StructuredData } from '@/components/seo/structured-data';
import { createMetadata, generateOrganizationData, generatePersonData, generateWebsiteData } from '@/lib/seo';
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

export const metadata = createMetadata({
  title: SITE_CONFIG.site.title,
  description: SITE_CONFIG.site.description,
  type: 'website',
});

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.seo.themeColor,
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
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
        </ThemeProvider>

        <StructuredData data={generateWebsiteData()} />
        <StructuredData data={generatePersonData()} />
        <StructuredData data={generateOrganizationData()} />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
