import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Providers } from '@/components/providers';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'Creative Direction Hub | Premium Brand & Web Design Studio',
    template: '%s | Creative Direction Hub',
  },
  description: 'Strategic branding and web design for businesses ready to be taken seriously. We create brands that convert visitors into customers.',
  keywords: ['branding agency', 'web design', 'brand strategy', 'website development', 'creative agency'],
  authors: [{ name: 'Creative Direction Hub' }],
  creator: 'Creative Direction Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Creative Direction Hub',
    title: 'Creative Direction Hub | Premium Brand & Web Design Studio',
    description: 'Strategic branding and web design for businesses ready to be taken seriously.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Creative Direction Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Direction Hub | Premium Brand & Web Design Studio',
    description: 'Strategic branding and web design for businesses ready to be taken seriously.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F9F9FB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" defer />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
