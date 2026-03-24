import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://tenant-letter.com'),
  title: {
    default: 'TenantShield — Force Your Landlord to Fix It. Legally.',
    template: '%s | TenantShield',
  },
  description:
    'Generate a legally-worded landlord demand letter in minutes. Cites your actual tenant protection laws. Available for Ontario, Quebec, California, New York, and more.',
  keywords: [
    'landlord complaint letter',
    'tenant rights',
    'housing code violation',
    'demand letter landlord',
    'tenant demand letter',
    'mold complaint letter',
    'no heat complaint',
    'pest infestation landlord',
    'ontario tenant rights',
    'california tenant rights',
  ],
  authors: [{ name: 'TenantShield' }],
  creator: 'TenantShield',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://tenant-letter.com',
    siteName: 'TenantShield',
    title: 'TenantShield — Force Your Landlord to Fix It. Legally.',
    description:
      'Generate a professionally worded landlord demand letter citing your actual tenant rights laws. Ontario, Quebec, California, New York, and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TenantShield — Landlord Violation Letter Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TenantShield — Force Your Landlord to Fix It. Legally.',
    description:
      'Generate a legally-worded landlord demand letter in minutes. Cites your actual tenant protection laws.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white antialiased`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
