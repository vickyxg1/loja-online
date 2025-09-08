import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Sua Loja Online - Ofertas Imperdíveis',
    template: '%s | Sua Loja Online',
  },
  description: 'Encontre os melhores produtos com preços incríveis em nossa loja online. Eletrônicos, roupas, joias e muito mais com entrega rápida e segura.',
  keywords: 'loja online, e-commerce, ofertas, promoções, eletrônicos, roupas, joias, compras online',
  authors: [{ name: 'Sua Loja Online' }],
  creator: 'Sua Loja Online',
  publisher: 'Sua Loja Online',
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
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://sua-loja-online.vercel.app',
    title: 'Sua Loja Online - Ofertas Imperdíveis',
    description: 'Encontre os melhores produtos com preços incríveis em nossa loja online.',
    siteName: 'Sua Loja Online',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@sualoja',
    site: '@sualoja',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}