import './globals.css';
import type { Viewport } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { createMetadata } from '@/lib/seo';
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SITE_CONFIG.seo.themeColorLight },
    { media: '(prefers-color-scheme: dark)', color: SITE_CONFIG.seo.themeColor },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`}>
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

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
