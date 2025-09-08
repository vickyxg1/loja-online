import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ofertas da Semana | Sua Loja Online',
  description: 'Descubra as melhores ofertas da semana com descontos de até 70% em produtos selecionados. Aproveite preços promocionais em eletrônicos, roupas, joias e muito mais. Filtros por preço, avaliação e categoria.',
  keywords: 'ofertas, promoções, descontos, loja online, eletrônicos, roupas, joias, desconto, liquidação, black friday',
  openGraph: {
    title: 'Ofertas da Semana | Sua Loja Online',
    description: 'Descubra as melhores ofertas da semana com descontos de até 70% em produtos selecionados.',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
        width: 1200,
        height: 630,
        alt: 'Ofertas da Semana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ofertas da Semana | Sua Loja Online',
    description: 'Descubra as melhores ofertas da semana com descontos de até 70%.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OfertasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}