import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Tang Yetong - Data Analyst at Fivetran | Technical Blog & Portfolio',
    template: '%s | Tang Yetong'
  },
  description: 'Data Analyst at Fivetran with expertise in data engineering, Android development, and blockchain technology. Technical blog covering Bitcoin development, mobile apps, and software engineering insights.',
  keywords: [
    'Tang Yetong', 'Data Analyst', 'Fivetran', 'Data Engineering',
    'Android Developer', 'Blockchain', 'Singapore', 'GovTech',
    'Python', 'Kotlin', 'SQL', 'Mobile Development', 'Bitcoin',
    'BDK-Kotlin', 'Technical Blog', 'Software Engineering'
  ],
  authors: [{ name: 'Tang Yetong' }],
  creator: 'Tang Yetong',
  publisher: 'Tang Yetong',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tangyetong.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tangyetong.dev',
    title: 'Tang Yetong - Data Engineering & Mobile Development Expert',
    description: 'Professional portfolio and technical blog showcasing data engineering, mobile development, and blockchain expertise.',
    siteName: 'Tang Yetong Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tang Yetong - Data Analyst & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tang Yetong - Data Analyst at Fivetran | Technical Blog',
    description: 'Data engineering expert sharing insights on blockchain development, mobile apps, and software engineering.',
    creator: '@tangyetong',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'theme-color': '#6366f1',
    'color-scheme': 'light dark',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
      </body>
    </html>
  );
}