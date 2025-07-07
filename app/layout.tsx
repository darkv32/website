import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = generateMetadata({
  title: 'Tang Yetong - Data Analyst at Fivetran | Technical Blog & Portfolio',
  description: 'Data Analyst at Fivetran with expertise in data engineering, Android development, and blockchain technology. Technical blog covering Bitcoin development, mobile apps, and software engineering insights.',
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo-white.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="relative">
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