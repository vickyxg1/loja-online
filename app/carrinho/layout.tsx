import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrinho de Compras | Sua Loja Online',
  description: 'Revise seus produtos selecionados e finalize sua compra com segurança. Carrinho de compras da Sua Loja Online.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CarrinhoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}